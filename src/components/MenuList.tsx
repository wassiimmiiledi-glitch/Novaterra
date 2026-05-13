"use client";

import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { formatPrice } from "@/lib/utils";

type Item = {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  image?: string | null;
};

export default function MenuList({ items }: { items: Item[] }) {
  const categories = useMemo(() => {
    const set = new Set(items.map((i) => i.category));
    return ["All", ...Array.from(set)];
  }, [items]);

  const [active, setActive] = useState<string>("All");
  const filtered = active === "All" ? items : items.filter((i) => i.category === active);

  return (
    <section className="bg-cream-50 pb-32">
      <div className="container-x">
        <div className="flex flex-wrap justify-center gap-3 md:gap-4 sticky top-20 z-30 py-6 bg-cream-50/85 backdrop-blur-md -mx-4 px-4 rounded-full">
          {categories.map((c) => {
            const isActive = c === active;
            return (
              <button
                key={c}
                onClick={() => setActive(c)}
                className={`relative text-[11px] tracking-[0.28em] uppercase px-5 py-2.5 rounded-full transition-colors duration-300 ${
                  isActive ? "text-cream-50" : "text-ink/65 hover:text-ink"
                }`}
              >
                {isActive && (
                  <motion.span
                    layoutId="cat-pill"
                    className="absolute inset-0 rounded-full bg-olive-700 -z-10"
                    transition={{ type: "spring", bounce: 0.18, duration: 0.6 }}
                  />
                )}
                {c}
              </button>
            );
          })}
        </div>

        <AnimatePresence mode="popLayout">
          <motion.div
            key={active}
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.55 }}
            className="mt-14 grid md:grid-cols-2 gap-x-16 gap-y-10"
          >
            {filtered.map((item) => (
              <motion.article
                key={item.id}
                layout
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="group flex gap-5 items-start pb-8 border-b border-ink/10"
              >
                {item.image ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-24 h-24 md:w-28 md:h-28 object-cover rounded-sm shrink-0 transition-transform duration-700 group-hover:scale-105"
                  />
                ) : (
                  <div className="w-24 h-24 md:w-28 md:h-28 bg-olive-100 rounded-sm shrink-0" />
                )}
                <div className="flex-1 min-w-0">
                  <div className="flex items-baseline gap-3">
                    <h3 className="font-display text-2xl text-ink truncate">{item.name}</h3>
                    <span className="flex-1 h-px bg-ink/15 translate-y-[-4px]" />
                    <span className="font-display text-xl text-olive-700 shrink-0">
                      {formatPrice(item.price)}
                    </span>
                  </div>
                  <p className="mt-2 text-ink/65 font-light leading-relaxed text-[15px]">
                    {item.description}
                  </p>
                  <p className="mt-3 text-[10px] tracking-[0.3em] uppercase text-olive-600">
                    {item.category}
                  </p>
                </div>
              </motion.article>
            ))}
          </motion.div>
        </AnimatePresence>

        {filtered.length === 0 && (
          <p className="mt-20 text-center text-ink/50 italic font-display text-2xl">
            Nothing here yet — check back soon.
          </p>
        )}
      </div>
    </section>
  );
}
