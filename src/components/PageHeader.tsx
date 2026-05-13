"use client";

import { motion } from "framer-motion";

export default function PageHeader({
  eyebrow,
  title,
  description
}: {
  eyebrow: string;
  title: string;
  description?: string;
}) {
  return (
    <section className="relative pt-40 pb-16 md:pt-48 md:pb-24 bg-cream-50 overflow-hidden">
      <div className="container-x text-center">
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="eyebrow"
        >
          {eyebrow}
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.1 }}
          className="display mt-6 text-5xl md:text-7xl max-w-[20ch] mx-auto"
          dangerouslySetInnerHTML={{ __html: title }}
        />
        {description && (
          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.2 }}
            className="mt-8 max-w-2xl mx-auto text-ink/70 leading-relaxed font-light text-lg"
          >
            {description}
          </motion.p>
        )}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 1, delay: 0.4 }}
          className="mt-14 h-px w-24 mx-auto bg-olive-700/50 origin-center"
        />
      </div>
    </section>
  );
}
