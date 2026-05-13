"use client";

import { motion } from "framer-motion";

// Each tile layers (in order, top → bottom):
//   1. local file the owner drops in /public/images/  (always wins)
//   2. curated Unsplash photo matching the Novaterra mood
//   3. warm gradient as a final fallback if both 404
const UNSPLASH = "https://images.unsplash.com/";
const Q = "?auto=format&fit=crop&w=1200&q=80";

const tiles = [
  {
    label: "The Olive Tree",
    text: "Centuries-old, transplanted at the heart of the room.",
    img: "/images/tile-tree.jpg",
    remote: `${UNSPLASH}photo-1572119003128-d110c07af847${Q}`,
    fallback: "linear-gradient(160deg,#3F4A29,#7B8C56)"
  },
  {
    label: "Rattan Light",
    text: "Hand-woven pendants pour soft amber light over every table.",
    img: "/images/tile-light.jpg",
    remote: `${UNSPLASH}photo-1513506003901-1e6a229e2d15${Q}`,
    fallback: "linear-gradient(160deg,#A0826D,#D4A574)"
  },
  {
    label: "Concrete & Cream",
    text: "Raw textures softened by linen, oak, and slow Mediterranean light.",
    img: "/images/tile-concrete.jpg",
    remote: `${UNSPLASH}photo-1554118811-1e0d58224f24${Q}`,
    fallback: "linear-gradient(160deg,#CDBC9A,#EDE4D2)"
  },
  {
    label: "Slow Coffee",
    text: "Single-origin beans, roasted weekly, brewed without rush.",
    img: "/images/tile-coffee.jpg",
    remote: `${UNSPLASH}photo-1495474472287-4d71bcdd2085${Q}`,
    fallback: "linear-gradient(160deg,#2C2C2C,#5A5A56)"
  }
];

export default function Atmosphere() {
  return (
    <section className="relative bg-cream-100 py-32 md:py-44">
      <div className="container-x">
        <div className="text-center max-w-2xl mx-auto">
          <p className="eyebrow">The atmosphere</p>
          <h2 className="display text-5xl md:text-7xl mt-5">
            A space designed to <em className="italic">slow you down.</em>
          </h2>
        </div>

        <div className="mt-20 grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {tiles.map((t, i) => (
            <motion.div
              key={t.label}
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.8, delay: i * 0.1 }}
              className="group relative aspect-[3/4] overflow-hidden rounded-sm"
            >
              <div
                className="absolute inset-0 bg-cover bg-center transition-transform duration-[1.6s] ease-out group-hover:scale-110"
                style={{
                  backgroundImage: `url('${t.img}'), url('${t.remote}'), ${t.fallback}`
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/30 to-transparent" />
              <div className="absolute bottom-0 inset-x-0 p-6 text-cream-50">
                <p className="text-[10px] tracking-[0.3em] uppercase text-amber-warm">
                  {t.label}
                </p>
                <p className="mt-3 font-display text-xl leading-snug">{t.text}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
