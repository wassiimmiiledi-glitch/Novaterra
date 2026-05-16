"use client";

import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

/**
 * Premium WhatsApp floating action button.
 *
 *  • Fixed bottom-right, respects iOS safe-area inset.
 *  • Tinted with the Novaterra olive palette (not WhatsApp green) so it
 *    sits inside the brand instead of looking like a vendor widget.
 *  • Two stacked halos: a subtle olive blur for ambient glow + a slow
 *    pulse ring to gently signal interactivity without ever screaming.
 *  • Recognisable WhatsApp glyph (inline SVG) so users still see "this is
 *    WhatsApp" at a glance.
 *  • Hover: scale + halo shift to amber-warm; tooltip slides in on desktop.
 *  • Deep links via wa.me which Android, iOS, web and desktop all honour.
 */

const PHONE = "21656783708"; // Tunisia +216 56 783 708 — country code + number, no plus.
const GREETING =
  "Bonjour Novaterra ☕  — j'aimerais avoir des informations / réserver une table.";

export default function WhatsAppFab({
  className,
  message = GREETING
}: {
  className?: string;
  message?: string;
}) {
  // Customer CTA — hide on the admin owner panel.
  const pathname = usePathname();
  if (pathname?.startsWith("/admin")) return null;

  const href = `https://wa.me/${PHONE}?text=${encodeURIComponent(message)}`;

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with Novaterra on WhatsApp"
      className={cn(
        "fixed z-40 group select-none",
        // Position: respect iOS home indicator + add a few extra px on small screens.
        "right-4 sm:right-6 md:right-8",
        "bottom-[calc(env(safe-area-inset-bottom,0px)+1rem)] sm:bottom-6 md:bottom-8",
        className
      )}
    >
      {/* Ambient halo — softens into the background, intensifies on hover. */}
      <span
        aria-hidden
        className="absolute inset-0 rounded-full bg-olive-700/35 blur-xl scale-[1.35] transition-all duration-700 group-hover:bg-amber-warm/55 group-hover:scale-150"
      />

      {/* Slow ping ring — barely visible, just enough to read as alive. */}
      <span
        aria-hidden
        className="absolute inset-0 rounded-full bg-olive-700/25 animate-ping motion-reduce:hidden"
        style={{ animationDuration: "3.2s" }}
      />

      {/* The button itself. */}
      <span
        className={cn(
          "relative flex items-center justify-center rounded-full",
          "w-14 h-14 md:w-16 md:h-16",
          "bg-olive-700 text-cream-50",
          "shadow-[0_18px_40px_-12px_rgba(31,36,21,0.55)]",
          "transition-all duration-500 ease-out",
          "group-hover:scale-[1.06] group-hover:bg-olive-800",
          "group-hover:shadow-[0_22px_55px_-10px_rgba(95,110,63,0.6)]",
          // Hairline ring for definition on light backgrounds.
          "ring-1 ring-cream-50/30"
        )}
      >
        {/* WhatsApp logomark (path from the official brand SVG, simplified). */}
        <svg
          viewBox="0 0 24 24"
          fill="currentColor"
          className="w-6 h-6 md:w-7 md:h-7 translate-y-[1px] transition-transform duration-500 group-hover:rotate-[-6deg]"
          aria-hidden
        >
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347M12.05 22.85h-.005a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.884 9.884m8.412-18.297A11.815 11.815 0 0012.05 1.05C5.495 1.05.16 6.385.157 12.942c0 2.096.547 4.142 1.588 5.945L.057 25l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
        </svg>
      </span>

      {/* Desktop hover tooltip — non-intrusive, never shown on touch. */}
      <span
        aria-hidden
        className={cn(
          "absolute right-[calc(100%+0.75rem)] top-1/2 -translate-y-1/2",
          "hidden md:flex items-center gap-2 whitespace-nowrap",
          "px-3.5 py-2 rounded-full bg-ink text-cream-50",
          "text-[10px] tracking-[0.3em] uppercase",
          "shadow-soft opacity-0 translate-x-2",
          "transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0",
          "pointer-events-none"
        )}
      >
        <span className="w-1.5 h-1.5 rounded-full bg-amber-warm" />
        Chat on WhatsApp
      </span>
    </a>
  );
}
