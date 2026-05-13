"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

export default function Loader() {
  const [show, setShow] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => setShow(false), 1500);
    return () => clearTimeout(t);
  }, []);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } }}
          className="fixed inset-0 z-[100] bg-cream-50 flex items-center justify-center"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <motion.svg
              viewBox="0 0 60 60"
              className="w-16 h-16 mx-auto text-olive-700"
              fill="none"
              initial={{ rotate: -15 }}
              animate={{ rotate: 15 }}
              transition={{ repeat: Infinity, repeatType: "reverse", duration: 1.6, ease: "easeInOut" }}
            >
              <path
                d="M30 6 C 18 14, 12 26, 18 38 C 21 44, 27 47, 30 47 C 33 47, 39 44, 42 38 C 48 26, 42 14, 30 6 Z"
                fill="currentColor"
                opacity="0.95"
              />
              <path d="M30 47 L 30 56" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            </motion.svg>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="mt-6 font-display text-2xl text-ink"
            >
              novaterra
            </motion.p>
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 1.2, ease: "easeInOut" }}
              className="mt-4 h-px w-32 mx-auto bg-olive-700/60 origin-left"
            />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
