"use client";

import { motion } from "framer-motion";

const quotes = [
  {
    q: "The most beautiful café I've stepped into this year. Every corner feels intentional.",
    a: "Vogue Living"
  },
  {
    q: "It's not the coffee, it's the silence around it. A rare kind of space.",
    a: "Salma — regular guest"
  },
  {
    q: "Concrete, olive, rattan. Novaterra is what minimalism looks like when it has a soul.",
    a: "Architectural Digest MENA"
  }
];

export default function Testimonials() {
  return (
    <section className="bg-cream-50 py-32 md:py-40">
      <div className="container-x">
        <div className="divider-leaf max-w-md mx-auto">
          <span className="text-[11px] tracking-[0.32em] uppercase">Said about us</span>
        </div>

        <div className="mt-16 grid md:grid-cols-3 gap-10">
          {quotes.map((q, i) => (
            <motion.figure
              key={q.a}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.8, delay: i * 0.12 }}
              className="text-center px-4"
            >
              <p className="font-display text-2xl md:text-[28px] leading-snug text-ink">
                "{q.q}"
              </p>
              <figcaption className="mt-6 text-[11px] tracking-[0.3em] uppercase text-olive-700">
                — {q.a}
              </figcaption>
            </motion.figure>
          ))}
        </div>
      </div>
    </section>
  );
}
