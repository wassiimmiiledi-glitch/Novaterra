"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export default function StoryBlock() {
  return (
    <section className="relative bg-cream-50 py-32 md:py-44 overflow-hidden">
      <div className="container-x grid md:grid-cols-12 gap-14 items-center">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 1 }}
          className="md:col-span-5 relative"
        >
          <div className="aspect-[3/4] relative rounded-sm overflow-hidden shadow-soft">
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{
                backgroundImage:
                  "url('/images/olive-tree.jpg'), linear-gradient(180deg, #4F5D33 0%, #B7A37E 100%)"
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-ink/40 via-transparent to-transparent" />
          </div>
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.3 }}
            className="absolute -bottom-8 -right-8 hidden md:block bg-cream-100 px-7 py-6 max-w-[230px] shadow-soft"
          >
            <p className="font-display text-2xl text-olive-700 leading-tight">
              "Some places are <em className="italic">grown</em>, not built."
            </p>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 1, delay: 0.15 }}
          className="md:col-span-6 md:col-start-7"
        >
          <p className="eyebrow">Our Story</p>
          <h2 className="display text-5xl md:text-7xl mt-6 max-w-[14ch]">
            Built around a living olive tree.
          </h2>
          <div className="mt-10 space-y-6 text-ink/75 leading-relaxed text-[17px] font-light max-w-[52ch]">
            <p>
              When we found the tree, the building wasn't even there yet.
              Centuries old, transplanted from a quiet Mediterranean grove —
              we designed every wall, every beam, every pendant lamp around it.
            </p>
            <p>
              That's the philosophy of Novaterra: a space where nature leads
              and architecture listens. Where the coffee is slow, the light
              is soft, and the hours stretch a little longer.
            </p>
          </div>
          <div className="mt-12 flex items-center gap-4">
            <Link href="/about" className="btn-ghost">Read our story</Link>
          </div>

          <div className="mt-16 grid grid-cols-3 gap-8 max-w-md">
            {[
              { k: "07:30", v: "Opens daily" },
              { k: "100%", v: "Single origin" },
              { k: "1", v: "Olive tree" }
            ].map((s) => (
              <div key={s.k}>
                <p className="font-display text-3xl text-olive-700">{s.k}</p>
                <p className="mt-1 text-[11px] tracking-[0.28em] uppercase text-ink/55">
                  {s.v}
                </p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
