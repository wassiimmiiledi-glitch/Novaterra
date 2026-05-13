"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

export default function CTA() {
  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage:
            "url('/images/cta.jpg'), url('https://images.unsplash.com/photo-1453614512568-c4024d13c247?auto=format&fit=crop&w=1800&q=80'), linear-gradient(135deg,#2F3720,#5F6E3F 60%,#A88660)"
        }}
      />
      <div className="absolute inset-0 bg-ink/55" />

      <div className="relative container-x py-32 md:py-44 text-center text-cream-50">
        <motion.p
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="eyebrow !text-amber-warm"
        >
          Reserve your moment
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.1 }}
          className="display mt-6 text-5xl md:text-7xl max-w-[18ch] mx-auto"
        >
          A table beneath the olive tree is waiting.
        </motion.h2>
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, delay: 0.25 }}
          className="mt-12"
        >
          <Link
            href="/reservations"
            className="btn-primary !bg-cream-50 !text-ink hover:!bg-amber-warm"
          >
            Book your table <ArrowRight className="w-4 h-4" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
