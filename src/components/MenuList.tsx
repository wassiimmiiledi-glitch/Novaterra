"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { motion } from "framer-motion";
import { cn, formatPrice } from "@/lib/utils";

type Item = {
  id: string;
  name: string;
  description: string | null;
  price: number;
  category: string;
  image?: string | null;
};

/**
 * Display order matches the printed PDF (left page → right page, top → bottom).
 * Categories declare:
 *   • label    — short label used in the sticky nav (kept compact for mobile)
 *   • heading  — full display heading at the top of the section
 *   • style    — "list" (default) or "feature" (dark olive panel, used for
 *                Hot Chocolate / Cocktails / Savory Crêpes / Breakfast Family)
 *   • packages — true for breakfast packs (long descriptions, card layout)
 */
type CategoryDef = {
  key: string;
  label: string;
  heading: string;
  sub?: string;
  style?: "list" | "feature";
  packages?: boolean;
  group: "Coffee" | "Drinks" | "Mixes" | "Kitchen" | "Breakfast" | "Sweet" | "Chicha";
};

const CATEGORIES: CategoryDef[] = [
  { key: "Coffee",          label: "Coffee",       heading: "Café",                  sub: "(Coffee)",  group: "Coffee" },
  { key: "Iced Coffee",     label: "Iced",         heading: "Iced Coffee",                              group: "Coffee" },
  { key: "Café Spécial",    label: "Spécial",      heading: "Café Spécial",                             group: "Coffee" },
  { key: "Hot Chocolate",   label: "Hot Choc",     heading: "Hot Chocolate",      style: "feature",     group: "Coffee" },

  { key: "Tea",             label: "Tea",          heading: "Tea",                                      group: "Drinks" },
  { key: "Soda",            label: "Soda",         heading: "Soda · Water",                             group: "Drinks" },
  { key: "Fresh Juices",    label: "Juices",       heading: "Fresh Juices",                             group: "Drinks" },
  { key: "Smoothies",       label: "Smoothies",    heading: "Smoothies",                                group: "Drinks" },
  { key: "Frappuccino",     label: "Frappuccino",  heading: "Frappuccino Collection",                   group: "Drinks" },
  { key: "Milkshake",       label: "Milkshake",    heading: "Milkshake Signature",                      group: "Drinks" },

  { key: "Cocktails",       label: "Cocktails",    heading: "Novaterra Original Cocktails", style: "feature", group: "Mixes" },
  { key: "Mojito",          label: "Mojito",       heading: "Mojito",                                   group: "Mixes" },

  { key: "Sweet Crêpes",    label: "Sweet Crêpes", heading: "Sweet Crêpes & Gaufres",                   group: "Kitchen" },
  { key: "Omelette",        label: "Omelette",     heading: "Omelette Gourmet",                         group: "Kitchen" },
  { key: "Savory Crêpes",   label: "Savory Crêpes",heading: "Savory Crêpes",      style: "feature",     group: "Kitchen" },

  { key: "Breakfast Solo",  label: "Solo",         heading: "Novaterra Solo",     packages: true,       group: "Breakfast" },
  { key: "Breakfast Duo",   label: "Duo",          heading: "Novaterra Duo",      packages: true,       group: "Breakfast" },
  { key: "Breakfast Family",label: "Family",       heading: "Novaterra Family",   packages: true, style: "feature", group: "Breakfast" },
  { key: "Kids",            label: "Kids",         heading: "Kids",               packages: true,       group: "Breakfast" },

  { key: "Desserts",        label: "Desserts",     heading: "Desserts",                                 group: "Sweet" },

  { key: "Chicha",          label: "Chicha",       heading: "Chicha",                                   group: "Chicha" }
];

const GROUP_ORDER: CategoryDef["group"][] = [
  "Coffee", "Drinks", "Mixes", "Kitchen", "Breakfast", "Sweet", "Chicha"
];

function slug(key: string) {
  return key
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export default function MenuList({ items }: { items: Item[] }) {
  // Bucket items by category, preserving DB insertion order for sub-ordering.
  const byCategory = useMemo(() => {
    const m = new Map<string, Item[]>();
    for (const item of items) {
      const arr = m.get(item.category) ?? [];
      arr.push(item);
      m.set(item.category, arr);
    }
    return m;
  }, [items]);

  // Active section tracking for scroll-spy nav.
  const [active, setActive] = useState<string>(CATEGORIES[0]?.key ?? "");
  const [activeGroup, setActiveGroup] = useState<CategoryDef["group"]>("Coffee");

  // Refs for each section so scroll-spy can observe them.
  const sectionRefs = useRef<Record<string, HTMLElement | null>>({});
  // Ref for the sticky nav so we can auto-scroll the active chip into view on mobile.
  const navRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        // Pick the section closest to the top of the viewport.
        const top = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)[0];
        if (top?.target.id) {
          const key = top.target.getAttribute("data-cat");
          if (key) {
            setActive(key);
            const def = CATEGORIES.find((c) => c.key === key);
            if (def) setActiveGroup(def.group);
          }
        }
      },
      // Trigger as a section's top approaches ~25% of viewport from the top.
      { rootMargin: "-30% 0px -55% 0px", threshold: 0 }
    );
    Object.values(sectionRefs.current).forEach((el) => el && observer.observe(el));
    return () => observer.disconnect();
  }, [items]);

  // Keep the active chip visible inside the horizontal scroll nav on mobile.
  useEffect(() => {
    const nav = navRef.current;
    if (!nav) return;
    const chip = nav.querySelector<HTMLAnchorElement>(`[data-chip="${active}"]`);
    if (!chip) return;
    const navBox = nav.getBoundingClientRect();
    const chipBox = chip.getBoundingClientRect();
    if (chipBox.left < navBox.left + 24 || chipBox.right > navBox.right - 24) {
      const target =
        chip.offsetLeft - nav.clientWidth / 2 + chip.clientWidth / 2;
      nav.scrollTo({ left: target, behavior: "smooth" });
    }
  }, [active]);

  // Group the categories for the header chip-row.
  const groupedCategories = useMemo(() => {
    return GROUP_ORDER.map((g) => ({
      group: g,
      cats: CATEGORIES.filter((c) => c.group === g && byCategory.has(c.key))
    })).filter((g) => g.cats.length > 0);
  }, [byCategory]);

  return (
    <section className="bg-cream-50 pb-32">
      {/*
        Sticky scroll-spy nav — pinned just below the (collapsed) navbar.
        Notes for mobile:
          • Fully opaque background — no backdrop-blur, which causes
            "see-through" rendering glitches on iOS Safari and creates the
            illusion that the menu items are leaking through the bar.
          • Top offset matches the collapsed navbar height exactly so there's
            no gap or jump when the navbar shrinks during scroll.
          • will-change + translateZ(0) promote the nav to its own compositor
            layer, killing the judder some Android browsers showed.
          • A soft bottom shadow gives crisp separation from menu content.
      */}
      <nav
        className="sticky top-[56px] md:top-[72px] z-30 bg-cream-50 border-b border-ink/[0.08] shadow-[0_8px_24px_-18px_rgba(31,36,21,0.22)] [transform:translateZ(0)] [will-change:transform]"
      >
        <div className="container-x py-2.5 md:py-3.5">
          <div
            ref={navRef}
            className="flex gap-1.5 md:gap-2 overflow-x-auto scrollbar-none -mx-2 px-2 snap-x snap-mandatory scroll-px-4"
            style={{ scrollbarWidth: "none", WebkitOverflowScrolling: "touch" }}
          >
            {groupedCategories.flatMap(({ group, cats }, gi) => [
              gi > 0 && (
                <span
                  key={`sep-${group}`}
                  className="self-center text-ink/15 px-1 select-none"
                  aria-hidden
                >
                  /
                </span>
              ),
              ...cats.map((cat) => {
                const isActive = active === cat.key;
                return (
                  <a
                    key={cat.key}
                    data-chip={cat.key}
                    href={`#${slug(cat.key)}`}
                    onClick={(e) => {
                      e.preventDefault();
                      const el = sectionRefs.current[cat.key];
                      if (el) {
                        // Land sections below the (collapsed) navbar + sticky bar.
                        const offset = window.innerWidth < 768 ? 116 : 144;
                        const y = el.getBoundingClientRect().top + window.scrollY - offset;
                        window.scrollTo({ top: y, behavior: "smooth" });
                      }
                    }}
                    className={cn(
                      "relative shrink-0 snap-start text-[10.5px] md:text-[11px] tracking-[0.22em] uppercase px-3.5 md:px-4 py-2 rounded-full transition-colors duration-300",
                      isActive
                        ? "text-cream-50"
                        : "text-ink/65 hover:text-ink"
                    )}
                  >
                    {isActive && (
                      <motion.span
                        layoutId="menu-chip"
                        className="absolute inset-0 rounded-full bg-olive-700 -z-10"
                        transition={{ type: "spring", bounce: 0.18, duration: 0.55 }}
                      />
                    )}
                    {cat.label}
                  </a>
                );
              })
            ])}
          </div>
        </div>
      </nav>

      <div className="container-x">
        {/* ── Group breadcrumb (very subtle, mobile-friendly) ─────── */}
        <div className="mt-12 md:mt-16 flex items-center gap-3 text-[11px] tracking-[0.3em] uppercase text-olive-700">
          <span className="h-px w-10 bg-olive-700/40" />
          {activeGroup}
        </div>

        {/* ── Sections ─────────────────────────────────────────────── */}
        <div className="mt-3 space-y-24 md:space-y-32">
          {CATEGORIES.filter((c) => byCategory.has(c.key)).map((cat) => {
            const list = byCategory.get(cat.key) ?? [];
            return (
              <section
                key={cat.key}
                id={slug(cat.key)}
                data-cat={cat.key}
                ref={(el) => {
                  sectionRefs.current[cat.key] = el;
                }}
                // scroll-mt matches nav height (navbar 56 + sticky 50ish + breathing room)
                className="scroll-mt-[124px] md:scroll-mt-[160px]"
              >
                {cat.style === "feature" ? (
                  <FeatureSection cat={cat} items={list} />
                ) : cat.packages ? (
                  <PackageSection cat={cat} items={list} />
                ) : (
                  <ListSection cat={cat} items={list} />
                )}
              </section>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ───────────────────────────────────────────────────────────────────── */
/*  Section renderers                                                   */
/* ───────────────────────────────────────────────────────────────────── */

function SectionHeading({ cat }: { cat: CategoryDef }) {
  return (
    <header className="mb-12 md:mb-16">
      <h2 className="display text-5xl md:text-6xl lg:text-7xl leading-[1.02]">
        {cat.heading}
        {cat.sub && (
          <span className="block mt-1 text-xl md:text-2xl text-ink/45 italic font-light">
            {cat.sub}
          </span>
        )}
      </h2>
      <div className="mt-6 h-px w-20 bg-olive-700/40" />
    </header>
  );
}

function ListSection({ cat, items }: { cat: CategoryDef; items: Item[] }) {
  return (
    <>
      <SectionHeading cat={cat} />
      <div className="grid md:grid-cols-2 gap-x-14 lg:gap-x-20 gap-y-7 md:gap-y-9">
        {items.map((item, i) => (
          <ItemLine key={item.id} item={item} index={i} />
        ))}
      </div>
    </>
  );
}

function FeatureSection({ cat, items }: { cat: CategoryDef; items: Item[] }) {
  return (
    <div className="relative -mx-6 md:-mx-10 lg:-mx-16 rounded-sm overflow-hidden">
      <div className="relative bg-olive-900 text-cream-100 px-6 md:px-10 lg:px-20 py-16 md:py-24">
        {/* warm grain */}
        <div className="absolute inset-0 opacity-[0.05] pointer-events-none bg-grain bg-[length:3px_3px]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(212,165,116,0.12),transparent_60%)] pointer-events-none" />

        <div className="relative">
          <p className="eyebrow !text-amber-warm">Signature</p>
          <h2 className="display mt-4 text-5xl md:text-6xl lg:text-7xl leading-[1.02] text-cream-50">
            {cat.heading}
            {cat.sub && (
              <span className="block mt-1 text-xl md:text-2xl text-cream-100/50 italic font-light">
                {cat.sub}
              </span>
            )}
          </h2>
          <div className="mt-6 h-px w-20 bg-amber-warm/50" />

          {cat.packages ? (
            <div className="mt-12 md:mt-14 grid lg:grid-cols-2 gap-6 md:gap-8">
              {items.map((it) => (
                <PackageCard key={it.id} item={it} variant="dark" />
              ))}
            </div>
          ) : (
            <div className="mt-12 md:mt-14 grid md:grid-cols-2 gap-x-14 lg:gap-x-20 gap-y-7 md:gap-y-9">
              {items.map((it, i) => (
                <ItemLine key={it.id} item={it} index={i} variant="dark" />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function PackageSection({ cat, items }: { cat: CategoryDef; items: Item[] }) {
  return (
    <>
      <SectionHeading cat={cat} />
      <div className="grid lg:grid-cols-2 gap-6 md:gap-8">
        {items.map((it) => (
          <PackageCard key={it.id} item={it} />
        ))}
      </div>
    </>
  );
}

/* ───────────────────────────────────────────────────────────────────── */
/*  Item renderers                                                      */
/* ───────────────────────────────────────────────────────────────────── */

function ItemLine({
  item,
  index,
  variant = "light"
}: {
  item: Item;
  index: number;
  variant?: "light" | "dark";
}) {
  const dark = variant === "dark";
  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.55, delay: Math.min(index, 6) * 0.04 }}
      className="group"
    >
      <div className="flex items-baseline gap-3">
        <h3
          className={cn(
            "font-display text-[22px] md:text-2xl leading-tight transition-colors",
            dark ? "text-cream-50 group-hover:text-amber-warm" : "text-ink group-hover:text-olive-700"
          )}
        >
          {item.name}
        </h3>
        <span
          aria-hidden
          className={cn(
            "flex-1 mx-1 translate-y-[-3px] border-b border-dotted",
            dark ? "border-cream-100/20" : "border-ink/15"
          )}
        />
        <span
          className={cn(
            "font-display text-lg md:text-xl shrink-0 tabular-nums",
            dark ? "text-amber-warm" : "text-olive-700"
          )}
        >
          {formatPrice(item.price)}
        </span>
      </div>
      {item.description && (
        <p
          className={cn(
            "mt-1.5 text-[13px] md:text-sm italic font-light max-w-[42ch]",
            dark ? "text-cream-100/60" : "text-ink/55"
          )}
        >
          {item.description}
        </p>
      )}
    </motion.div>
  );
}

function PackageCard({
  item,
  variant = "light"
}: {
  item: Item;
  variant?: "light" | "dark";
}) {
  const dark = variant === "dark";
  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.7 }}
      className={cn(
        "relative p-7 md:p-9 rounded-sm transition-all duration-500 group",
        dark
          ? "bg-cream-50/[0.04] border border-cream-100/15 hover:border-amber-warm/40"
          : "bg-cream-100/60 border border-ink/[0.07] hover:border-olive-700/40 hover:shadow-soft"
      )}
    >
      {/* corner brackets */}
      <Bracket position="tl" dark={dark} />
      <Bracket position="br" dark={dark} />

      <div className="flex items-start justify-between gap-6">
        <h3
          className={cn(
            "font-display text-2xl md:text-[28px] leading-tight max-w-[18ch]",
            dark ? "text-cream-50 group-hover:text-amber-warm" : "text-ink group-hover:text-olive-700"
          )}
        >
          {item.name}
        </h3>
        <span
          className={cn(
            "font-display text-2xl md:text-3xl shrink-0 tabular-nums",
            dark ? "text-amber-warm" : "text-olive-700"
          )}
        >
          {formatPrice(item.price)}
        </span>
      </div>
      {item.description && (
        <p
          className={cn(
            "mt-5 text-[14px] md:text-[15px] leading-relaxed font-light",
            dark ? "text-cream-100/70" : "text-ink/70"
          )}
        >
          {item.description}
        </p>
      )}
    </motion.article>
  );
}

function Bracket({
  position,
  dark
}: {
  position: "tl" | "tr" | "bl" | "br";
  dark: boolean;
}) {
  const tone = dark ? "border-amber-warm/35" : "border-olive-700/30";
  const map = {
    tl: "top-3 left-3 border-t border-l",
    tr: "top-3 right-3 border-t border-r",
    bl: "bottom-3 left-3 border-b border-l",
    br: "bottom-3 right-3 border-b border-r"
  } as const;
  return <span aria-hidden className={cn("absolute w-3 h-3 pointer-events-none", tone, map[position])} />;
}
