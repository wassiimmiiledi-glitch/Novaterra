/**
 * Generate print-quality QR codes for the Novaterra menu.
 *
 *   • 5 outputs are written to /public/qr — the owner can hand any of these
 *     to a print shop:
 *       1. novaterra-menu-qr.svg              — vector, scales to any size
 *       2. novaterra-menu-qr.png              — 1024 px, black-on-white,
 *                                                universal print fallback
 *       3. novaterra-menu-qr-large.png        — 2048 px, black-on-white,
 *                                                large-format posters / signage
 *       4. novaterra-menu-qr-brand.png        — 1024 px, brand colours
 *                                                (olive-900 on cream-50)
 *       5. novaterra-menu-qr-brand-large.png  — 2048 px, brand colours
 *
 *   • Every export uses error-correction level H (30 % redundancy) so a
 *     coffee splash, sticker or small dent on a printed sticker still
 *     scans cleanly. The site's on-screen QR uses level M; switching to
 *     H for print is the recommended hygiene step.
 *
 *   • A 4-module quiet zone is baked in (twice the 2-module minimum) so
 *     designers don't have to worry about hugging the QR with logos.
 *
 *   • Solid colours, no transparency on the PNGs — eliminates the
 *     "transparent halo on white paper but ink on dark menus" surprise.
 *
 * Run:
 *   npx tsx scripts/generate-print-qr.ts
 */

import { promises as fs } from "node:fs";
import path from "node:path";
import QRCode from "qrcode";

const TARGET =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ??
  "https://novaterracafe.netlify.app";
const URL = `${TARGET}/menu`;

const OUT = path.resolve(process.cwd(), "public", "qr");

// Brand palette pulled from tailwind.config.ts / globals.css
const INK = "#1F2415"; // olive-900 — looks like a sophisticated near-black
const CREAM = "#FBF8F2"; // cream-50

type PngOpts = {
  filename: string;
  width: number;
  dark: string;
  light: string;
};

async function writePng({ filename, width, dark, light }: PngOpts) {
  const target = path.join(OUT, filename);
  await QRCode.toFile(target, URL, {
    type: "png",
    width,
    margin: 4, // 4 quiet-zone modules — double the spec minimum
    errorCorrectionLevel: "H", // 30 % recovery — print-safe
    color: { dark, light },
    rendererOpts: { quality: 1 } // PNG is lossless, but ensure no compression
  });
  const { size } = await fs.stat(target);
  return { target, size };
}

async function writeSvg() {
  const target = path.join(OUT, "novaterra-menu-qr.svg");
  const svg = await QRCode.toString(URL, {
    type: "svg",
    margin: 4,
    errorCorrectionLevel: "H",
    color: { dark: INK, light: CREAM }
  });
  await fs.writeFile(target, svg, "utf8");
  const { size } = await fs.stat(target);
  return { target, size };
}

async function main() {
  await fs.mkdir(OUT, { recursive: true });

  console.log(`Encoding URL: ${URL}\n`);

  const outputs = [
    await writeSvg(),
    await writePng({
      filename: "novaterra-menu-qr.png",
      width: 1024,
      dark: "#000000",
      light: "#FFFFFF"
    }),
    await writePng({
      filename: "novaterra-menu-qr-large.png",
      width: 2048,
      dark: "#000000",
      light: "#FFFFFF"
    }),
    await writePng({
      filename: "novaterra-menu-qr-brand.png",
      width: 1024,
      dark: INK,
      light: CREAM
    }),
    await writePng({
      filename: "novaterra-menu-qr-brand-large.png",
      width: 2048,
      dark: INK,
      light: CREAM
    })
  ];

  for (const o of outputs) {
    const rel = path.relative(process.cwd(), o.target);
    const kb = (o.size / 1024).toFixed(1);
    console.log(`  ✓  ${rel.padEnd(46)} ${kb.padStart(8)} KB`);
  }
  console.log("\nAll 5 print-quality QR exports written to /public/qr.");
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
