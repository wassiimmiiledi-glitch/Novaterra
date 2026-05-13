"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, ChevronDown } from "lucide-react";

export default function Hero() {
  return (
    // h-[100svh] keeps mobile correct (avoids URL-bar jumps).
    // max-h-[1100px] prevents the bottom-anchored content from drifting too low
    // on very tall desktop monitors. min-h-[640px] keeps small laptops sane.
    <section className="relative h-[100svh] min-h-[640px] max-h-[1100px] w-full overflow-hidden">
      {/*
        Hero image — drop your café photo at /public/images/hero.jpg.
        The CSS filter is a subtle, professional color-grade pass:
          • contrast 1.08   → restores depth in concrete + foliage
          • saturate 1.06   → revives olive greens without going neon
          • brightness 0.95 → lifts the heavy whites slightly toward cream
        Together these counter the pale/washed-out look without ever
        reading "edited". Adjust the values to taste.
      */}
      <div
        className="absolute inset-0 bg-cover bg-center [filter:contrast(1.08)_saturate(1.06)_brightness(0.95)]"
        style={{
          backgroundImage:
            "url('/images/hero.jpg'), linear-gradient(135deg, #2F3720 0%, #5F6E3F 60%, #B7A37E 100%)"
        }}
      />

      {/*
        Cinematic color-grade stack — six lightweight overlays that, layered,
        produce the kind of warm "golden hour" treatment usually baked into a
        photo. Each is intentional; remove any to dial the look back.
      */}

      {/* 1. Warm sepia tint — subtle amber wash across the whole frame */}
      <div className="absolute inset-0 bg-[#D4A574] mix-blend-overlay opacity-[0.10] pointer-events-none" />

      {/* 2. Olive teal in the shadows — adds depth (orange/teal grading) */}
      <div className="absolute inset-0 bg-[#1F2415] mix-blend-soft-light opacity-25 pointer-events-none" />

      {/* 3. Vertical legibility veil — protects the bottom-anchored copy */}
      <div className="absolute inset-0 bg-gradient-to-b from-ink/30 via-ink/15 to-ink/70 pointer-events-none" />

      {/* 4. Top-right amber bloom — mimics natural rattan-lamp glow */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(232,185,122,0.28),transparent_55%)] pointer-events-none" />

      {/* 5. Cinematic vignette — concentrates focus toward the centre */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_45%,rgba(15,18,10,0.55)_115%)] pointer-events-none" />

      {/* 6. Almost-imperceptible film grain — kills banding, adds texture */}
      <div className="absolute inset-0 opacity-[0.06] mix-blend-overlay pointer-events-none [background-image:url('data:image/svg+xml;utf8,<svg xmlns=%22http://www.w3.org/2000/svg%22 width=%22220%22 height=%22220%22><filter id=%22n%22><feTurbulence type=%22fractalNoise%22 baseFrequency=%220.85%22 numOctaves=%222%22 stitchTiles=%22stitch%22/></filter><rect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23n)%22/></svg>')]" />

      {/*
        pt-28/sm:pt-32 reserves room for the fixed navbar so the headline can
        never collide with it. justify-end keeps the design's bottom anchor.
      */}
      <div className="relative h-full container-x flex flex-col justify-end pt-28 sm:pt-32 pb-20 md:pb-24 lg:pb-28">
        {/*
          Inner column: caps the line length on wide screens so the layout
          stays balanced and left-anchored instead of stretching edge to edge.
        */}
        <div className="w-full max-w-[36rem] md:max-w-[44rem] lg:max-w-[52rem] xl:max-w-[58rem]">
          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.9 }}
            className="eyebrow !text-amber-warm"
          >
            Beneath the olive tree · Nouvelle Médina, Tunis
          </motion.p>

          {/*
            Breakpoint-driven type scale (no vw clamp). Caps at ~6.25rem on
            2xl so the headline never dominates the viewport.
          */}
          <motion.h1
            initial={{ opacity: 0, y: 36 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.55, duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
            className="display text-cream-50 mt-5 sm:mt-6 leading-[1.04] text-[2.75rem] sm:text-[3.5rem] md:text-[4.25rem] lg:text-[4.75rem] xl:text-[5.5rem] 2xl:text-[6.25rem]"
          >
            A coffee{" "}
            <em className="italic font-light text-amber-warm">sanctuary</em>,
            rooted in stillness.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.95, duration: 0.9 }}
            className="mt-6 md:mt-8 max-w-[34rem] text-cream-100/90 text-base md:text-lg leading-relaxed font-light"
          >
            Slow coffee. Mediterranean light. A living olive tree at the heart of the room.
            Novaterra is not a café — it's an atmosphere you'll want to live inside.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.15, duration: 0.9 }}
            className="mt-8 md:mt-10 flex flex-wrap items-center gap-3 md:gap-4"
          >
            <Link
              href="/reservations"
              className="btn-primary !bg-cream-50 !text-ink hover:!bg-amber-warm hover:!text-ink"
            >
              Reserve a table <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/menu"
              className="btn-ghost !border-cream-50/40 !text-cream-50 hover:!bg-cream-50 hover:!text-ink"
            >
              Explore the menu
            </Link>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.4, duration: 1 }}
          className="absolute bottom-6 sm:bottom-8 right-6 md:right-10 lg:right-16 flex items-center gap-3 text-cream-100/70 text-[10px] sm:text-[11px] tracking-[0.3em] uppercase"
        >
          <span>Scroll</span>
          <ChevronDown className="w-4 h-4 animate-scroll-hint" />
        </motion.div>
      </div>
    </section>
  );
}
