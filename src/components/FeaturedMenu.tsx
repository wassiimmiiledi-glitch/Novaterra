"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { formatPrice } from "@/lib/utils";

export type Featured = {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  image?: string | null;
};

export default function FeaturedMenu({ items }: { items: Featured[] }) {
  return (
    <section className="relative bg-olive-900 text-cream-100 py-32 md:py-44 overflow-hidden">
      <div className="absolute inset-0 opacity-[0.05] pointer-events-none bg-grain bg-[length:3px_3px]" />

      <div className="container-x relative">
        <div className="flex items-end justify-between flex-wrap gap-6">
          <div>
            <p className="eyebrow !text-amber-warm">The selection</p>
            <h2 className="display text-5xl md:text-7xl mt-5 max-w-[15ch]">
              Slow rituals,
              <br />
              <em className="italic text-amber-warm">poured by hand.</em>
            </h2>
          </div>
          <Link
            href="/menu"
            className="link-underline text-[12px] tracking-[0.32em] uppercase text-cream-200/85"
          >
            View full menu →
          </Link>
        </div>

        <div className="mt-20 grid md:grid-cols-3 gap-10">
          {items.map((item, i) => (
            <motion.article
              key={item.id}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.8, delay: i * 0.12 }}
              className="group relative"
            >
              <div className="relative aspect-[4/5] overflow-hidden bg-olive-800 rounded-sm">
                {item.image ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover transition-transform duration-[1.6s] ease-out group-hover:scale-110"
                  />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-olive-700 to-olive-900" />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-olive-900/80 via-transparent to-transparent" />
                <span className="absolute top-4 left-4 text-[10px] tracking-[0.3em] uppercase text-amber-warm">
                  {item.category}
                </span>
                <div className="absolute top-4 right-4 w-9 h-9 rounded-full bg-cream-50 text-ink flex items-center justify-center opacity-0 -translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500">
                  <ArrowUpRight className="w-4 h-4" />
                </div>
              </div>
              <div className="mt-6 flex items-start justify-between gap-6">
                <div>
                  <h3 className="font-display text-2xl">{item.name}</h3>
                  <p className="mt-2 text-cream-200/70 font-light leading-relaxed text-sm max-w-[40ch]">
                    {item.description}
                  </p>
                </div>
                <span className="font-display text-xl text-amber-warm shrink-0">
                  {formatPrice(item.price)}
                </span>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
