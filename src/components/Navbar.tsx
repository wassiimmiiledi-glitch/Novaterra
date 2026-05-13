"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import Logo from "./Logo";
import { cn } from "@/lib/utils";

const links = [
  { href: "/", label: "Home" },
  { href: "/menu", label: "Menu" },
  { href: "/about", label: "Our Story" },
  { href: "/reservations", label: "Reserve" },
  { href: "/contact", label: "Contact" }
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <header
      className={cn(
        "fixed top-0 inset-x-0 z-50 transition-all duration-500",
        scrolled
          ? "bg-cream-50/85 backdrop-blur-xl border-b border-ink/5 py-3"
          : "bg-transparent py-6"
      )}
    >
      <div className="container-x flex items-center justify-between">
        <Logo />

        <nav className="hidden md:flex items-center gap-9">
          {links.map((l) => {
            const active = pathname === l.href;
            return (
              <Link
                key={l.href}
                href={l.href}
                className={cn(
                  "relative text-[12px] uppercase tracking-[0.28em] transition-colors duration-300",
                  active ? "text-olive-700" : "text-ink/70 hover:text-ink"
                )}
              >
                {l.label}
                {active && (
                  <motion.span
                    layoutId="nav-dot"
                    className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-olive-600"
                  />
                )}
              </Link>
            );
          })}
        </nav>

        <div className="hidden md:block">
          <Link href="/reservations" className="btn-primary !px-5 !py-2.5 text-[11px]">
            Book a Table
          </Link>
        </div>

        <button
          aria-label="Open menu"
          className="md:hidden p-2 -mr-2 text-ink"
          onClick={() => setOpen(true)}
        >
          <Menu className="w-6 h-6" />
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="fixed inset-0 z-[60] bg-cream-50 flex flex-col"
          >
            <div className="container-x flex items-center justify-between py-6">
              <Logo />
              <button
                aria-label="Close menu"
                onClick={() => setOpen(false)}
                className="p-2 -mr-2"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            <nav className="flex-1 flex flex-col items-center justify-center gap-7">
              {links.map((l, i) => (
                <motion.div
                  key={l.href}
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.08 * i, duration: 0.6 }}
                >
                  <Link
                    href={l.href}
                    className="font-display text-5xl text-ink hover:text-olive-700 transition-colors"
                  >
                    {l.label}
                  </Link>
                </motion.div>
              ))}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
                className="mt-6"
              >
                <Link href="/reservations" className="btn-primary">
                  Book a Table
                </Link>
              </motion.div>
            </nav>
            <div className="pb-10 text-center text-[11px] tracking-[0.3em] uppercase text-ink/50">
              Beneath the olive tree · Since 2024
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
