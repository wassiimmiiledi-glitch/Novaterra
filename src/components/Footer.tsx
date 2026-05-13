import Link from "next/link";
import Logo from "./Logo";
import QRMenu from "./QRMenu";
import { Instagram, Facebook, Mail, MapPin, Clock, Phone } from "lucide-react";

export default function Footer() {
  return (
    <footer className="relative bg-olive-900 text-cream-100 overflow-hidden">
      <div className="absolute inset-0 opacity-[0.06] pointer-events-none">
        <div className="w-full h-full bg-grain bg-[length:3px_3px]" />
      </div>

      <div className="container-x py-20 md:py-28 relative">
        {/* Top row — brand block + QR card */}
        <div className="grid lg:grid-cols-12 gap-14 lg:gap-10 items-start">
          <div className="lg:col-span-7">
            <Logo variant="light" />
            <p className="mt-6 max-w-md text-cream-200/80 leading-relaxed font-light">
              <span className="block text-[11px] tracking-[0.32em] uppercase text-amber-warm mb-3">
                Coffee &amp; Kitchen · Nouvelle Médina, Tunis
              </span>
              A coffee sanctuary built around a living olive tree —
              where slow mornings, Mediterranean light, and quiet luxury meet.
            </p>
            <div className="mt-8 flex items-center gap-3">
              <a
                href="https://instagram.com/novaterra_coffee"
                target="_blank"
                rel="noreferrer"
                className="w-10 h-10 rounded-full border border-cream-100/15 flex items-center justify-center hover:bg-cream-100 hover:text-olive-900 transition-colors"
                aria-label="Instagram @novaterra_coffee"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href="tel:+21629811559"
                className="w-10 h-10 rounded-full border border-cream-100/15 flex items-center justify-center hover:bg-cream-100 hover:text-olive-900 transition-colors"
                aria-label="Call +216 29 811 559"
              >
                <Phone className="w-4 h-4" />
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noreferrer"
                className="w-10 h-10 rounded-full border border-cream-100/15 flex items-center justify-center hover:bg-cream-100 hover:text-olive-900 transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="w-4 h-4" />
              </a>
              <a
                href="mailto:hello@novaterra.cafe"
                className="w-10 h-10 rounded-full border border-cream-100/15 flex items-center justify-center hover:bg-cream-100 hover:text-olive-900 transition-colors"
                aria-label="Email"
              >
                <Mail className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* QR menu — pinned to the right on lg+, centered on mobile */}
          <div className="lg:col-span-5 flex justify-center lg:justify-end">
            <QRMenu
              size="sm"
              variant="dark"
              caption="Scan · view the menu"
            />
          </div>
        </div>

        {/* Hairline divider */}
        <div className="my-14 lg:my-16 h-px bg-gradient-to-r from-transparent via-cream-100/15 to-transparent" />

        {/* Bottom row — info columns */}
        <div className="grid md:grid-cols-12 gap-12">
          <div className="md:col-span-4">
            <p className="eyebrow !text-cream-200/60 mb-5">Visit</p>
            <p className="flex items-start gap-3 text-cream-200/85 font-light">
              <MapPin className="w-4 h-4 mt-1 shrink-0 text-amber-warm" />
              <span>
                Nouvelle Médina
                <br />
                Tunis, Tunisia
              </span>
            </p>
            <p className="mt-5 flex items-start gap-3 text-cream-200/85 font-light">
              <Phone className="w-4 h-4 mt-1 shrink-0 text-amber-warm" />
              <a href="tel:+21629811559" className="link-underline">+216 29 811 559</a>
            </p>
            <p className="mt-5 flex items-start gap-3 text-cream-200/85 font-light">
              <Clock className="w-4 h-4 mt-1 shrink-0 text-amber-warm" />
              <span>
                Mon — Fri · 7:30 → 23:00
                <br />
                Sat — Sun · 9:00 → 24:00
              </span>
            </p>
          </div>

          <div className="md:col-span-4">
            <p className="eyebrow !text-cream-200/60 mb-5">Explore</p>
            <ul className="space-y-3 font-light text-cream-200/85">
              <li><Link className="link-underline" href="/menu">Menu</Link></li>
              <li><Link className="link-underline" href="/about">Our Story</Link></li>
              <li><Link className="link-underline" href="/reservations">Reserve</Link></li>
              <li><Link className="link-underline" href="/contact">Contact</Link></li>
            </ul>
          </div>

          <div className="md:col-span-4">
            <p className="eyebrow !text-cream-200/60 mb-5">For owners</p>
            <ul className="space-y-3 font-light text-cream-200/85">
              <li><Link className="link-underline" href="/admin/login">Admin</Link></li>
              <li><Link className="link-underline" href="/contact">Press &amp; Partnerships</Link></li>
            </ul>
          </div>
        </div>

        <div className="mt-20 pt-8 border-t border-cream-100/10 flex flex-col md:flex-row items-center justify-between gap-4 text-[11px] tracking-[0.28em] uppercase text-cream-200/55">
          <span>© {new Date().getFullYear()} Novaterra · All rights reserved</span>
          <span>Designed beneath the olive tree</span>
        </div>
      </div>
    </footer>
  );
}
