import QRCode from "qrcode";
import { cn } from "@/lib/utils";
import { siteLink } from "@/lib/site";

type Size = "sm" | "md" | "lg";
type Variant = "light" | "dark";

const SIZES: Record<Size, number> = { sm: 132, md: 176, lg: 220 };

/**
 * Server component — generates the QR as inline SVG at request/build time.
 * Zero JS payload. Premium framing with corner brackets, eyebrow, and
 * a small caption. Olive on cream by default; cream on charcoal in dark mode.
 */
export default async function QRMenu({
  href = "/menu",
  size = "md",
  variant = "light",
  caption = "Scan to view the menu",
  showLink = false,
  className
}: {
  href?: string;
  size?: Size;
  variant?: Variant;
  caption?: string;
  showLink?: boolean;
  className?: string;
}) {
  const target = siteLink(href);
  const dark = variant === "dark";

  // Olive on cream / cream on olive — color matches the brand palette.
  const fg = dark ? "#F5EFE3" : "#1F2415";
  const px = SIZES[size];

  const svg = await QRCode.toString(target, {
    type: "svg",
    margin: 0,
    width: px,
    errorCorrectionLevel: "M",
    color: { dark: fg, light: "#0000" }
  });

  // Strip the SVG's hardcoded width/height so CSS sizing controls it cleanly.
  const cleanedSvg = svg
    .replace(/\swidth="[^"]+"/, "")
    .replace(/\sheight="[^"]+"/, "")
    .replace("<svg", '<svg class="w-full h-full"');

  return (
    <div className={cn("inline-flex flex-col items-center text-center", className)}>
      <div
        className={cn(
          "relative rounded-sm transition-shadow duration-500",
          dark
            ? "bg-cream-50/[0.04] border border-cream-100/15 hover:border-amber-warm/40"
            : "bg-cream-50 border border-ink/10 shadow-soft hover:shadow-[0_30px_60px_-30px_rgba(31,36,21,0.45)]"
        )}
        style={{
          padding: size === "sm" ? "1rem" : size === "lg" ? "1.5rem" : "1.25rem"
        }}
      >
        {/* Premium corner brackets — give the QR a framed-print feel */}
        <Bracket position="tl" dark={dark} />
        <Bracket position="tr" dark={dark} />
        <Bracket position="bl" dark={dark} />
        <Bracket position="br" dark={dark} />

        <div
          className="relative shrink-0"
          style={{ width: `${px}px`, height: `${px}px` }}
          aria-label={`QR code linking to ${target}`}
          dangerouslySetInnerHTML={{ __html: cleanedSvg }}
        />
      </div>

      {caption && (
        <p
          className={cn(
            "mt-4 text-[10px] tracking-[0.32em] uppercase",
            dark ? "text-amber-warm" : "text-olive-700"
          )}
        >
          {caption}
        </p>
      )}

      {showLink && (
        <p
          className={cn(
            "mt-1.5 text-[11px] font-light tracking-wide",
            dark ? "text-cream-200/55" : "text-ink/45"
          )}
        >
          {target.replace(/^https?:\/\//, "")}
        </p>
      )}
    </div>
  );
}

function Bracket({
  position,
  dark
}: {
  position: "tl" | "tr" | "bl" | "br";
  dark: boolean;
}) {
  const tone = dark ? "border-cream-200/45" : "border-olive-700/55";
  const map: Record<typeof position, string> = {
    tl: "top-2 left-2 border-t border-l",
    tr: "top-2 right-2 border-t border-r",
    bl: "bottom-2 left-2 border-b border-l",
    br: "bottom-2 right-2 border-b border-r"
  };
  return <span aria-hidden className={cn("absolute w-3 h-3 pointer-events-none", tone, map[position])} />;
}
