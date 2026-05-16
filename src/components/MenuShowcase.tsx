"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

/**
 *  MENU SHOWCASE — the dark-olive homepage section that used to render three
 *  photo tiles. Now that the real 136-item menu is wired up, three random
 *  photos felt narrow — this typographic index honours the menu's breadth
 *  instead and acts as a navigational bridge into /menu.
 *
 *  Visual logic:
 *    • Same dark olive panel + amber-warm accent palette as before, so the
 *      home-page rhythm (cream → olive → cream) is preserved exactly.
 *    • Left column: pitch + 3 stats + CTA.  Sticky on lg+ so it stays on
 *      screen while the right column scrolls.
 *    • Right column: 7 group sections, each a dotted-leader list of its
 *      categories with item count.  Mirrors the menu page's typography so
 *      the transition into /menu feels seamless.
 *    • Each row links to /menu#<category-slug> for instant deep-jump.
 */

export type Group = {
  key: string;
  heading: string;
  subtitle: string;
  categories: { key: string; label: string; count: number }[];
};

export default function MenuShowcase({
  groups,
  total
}: {
  groups: Group[];
  total: number;
}) {
  const categoryCount = groups.reduce((n, g) => n + g.categories.length, 0);

  return (
    <section className="relative bg-olive-900 text-cream-100 py-28 md:py-40 overflow-hidden">
      <div className="absolute inset-0 opacity-[0.05] pointer-events-none bg-grain bg-[length:3px_3px]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(212,165,116,0.13),transparent_60%)] pointer-events-none" />

      <div className="container-x relative">
        <div className="grid lg:grid-cols-12 gap-14 lg:gap-20 items-start">
          {/* ── LEFT · pitch + stats + CTA ────────────────────────────── */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.9 }}
            className="lg:col-span-5 lg:sticky lg:top-32"
          >
            <p className="eyebrow !text-amber-warm">The menu, at a glance</p>
            <h2 className="display text-5xl md:text-6xl lg:text-7xl mt-5 leading-[1.04]">
              Slow rituals,
              <br />
              <em className="italic text-amber-warm">poured by hand.</em>
            </h2>
            <p className="mt-8 max-w-md text-cream-200/75 leading-relaxed font-light text-[17px]">
              Coffee, signature cocktails, Mediterranean brunch, family
              breakfast tables and chicha — every line of our printed menu
              lives here, served beneath the olive tree.
            </p>

            <div className="mt-10 flex items-end gap-10">
              <Stat n={total} label="items" />
              <span className="w-px h-10 bg-cream-100/15 mb-2" />
              <Stat n={categoryCount} label="categories" />
              <span className="w-px h-10 bg-cream-100/15 mb-2" />
              <Stat n={1} label="olive tree" />
            </div>

            <Link
              href="/menu"
              className="btn-primary mt-12 !bg-amber-warm !text-ink hover:!bg-cream-50"
            >
              Explore the full menu <ArrowUpRight className="w-4 h-4" />
            </Link>
          </motion.div>

          {/* ── RIGHT · typographic menu index ────────────────────────── */}
          <div className="lg:col-span-7 space-y-12 md:space-y-16">
            {groups.map((group, gi) => (
              <motion.section
                key={group.key}
                initial={{ opacity: 0, y: 22 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.7, delay: gi * 0.06 }}
              >
                <header className="flex items-baseline gap-4 mb-5">
                  <h3 className="font-display text-2xl md:text-[28px] text-amber-warm leading-none">
                    {group.heading}
                  </h3>
                  <span aria-hidden className="flex-1 h-px bg-cream-100/15" />
                  <span className="text-[10px] tracking-[0.3em] uppercase text-cream-200/55 whitespace-nowrap">
                    {group.subtitle}
                  </span>
                </header>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-10 gap-y-3.5">
                  {group.categories.map((c) => (
                    <li key={c.key}>
                      <Link
                        href={`/menu#${slug(c.key)}`}
                        className="group flex items-baseline gap-3 py-1.5 transition-colors duration-300"
                      >
                        <span className="font-display text-[20px] md:text-[21px] text-cream-50 group-hover:text-amber-warm transition-colors">
                          {c.label}
                        </span>
                        <span
                          aria-hidden
                          className="flex-1 translate-y-[-3px] border-b border-dotted border-cream-100/20 group-hover:border-amber-warm/45 transition-colors"
                        />
                        <span className="font-display text-sm text-cream-200/55 group-hover:text-amber-warm/85 tabular-nums transition-colors">
                          {c.count}
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </motion.section>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function Stat({ n, label }: { n: number; label: string }) {
  return (
    <div>
      <p className="font-display text-4xl md:text-[42px] text-amber-warm leading-none tabular-nums">
        {n}
      </p>
      <p className="mt-2 text-[10px] tracking-[0.3em] uppercase text-cream-200/55">
        {label}
      </p>
    </div>
  );
}

/** Slugify a category name (matches MenuList's anchor IDs). */
function slug(s: string) {
  return s
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}
