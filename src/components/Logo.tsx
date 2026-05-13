import Link from "next/link";
import { cn } from "@/lib/utils";

export default function Logo({
  className,
  variant = "dark"
}: {
  className?: string;
  variant?: "dark" | "light";
}) {
  const tone = variant === "light" ? "text-cream-50" : "text-ink";
  return (
    <Link href="/" className={cn("flex items-center gap-2 group", tone, className)}>
      <svg
        viewBox="0 0 40 40"
        className="w-8 h-8 transition-transform duration-700 group-hover:rotate-[18deg]"
        fill="none"
        aria-hidden
      >
        <path
          d="M20 4 C 12 10, 8 18, 12 26 C 14 30, 18 32, 20 32 C 22 32, 26 30, 28 26 C 32 18, 28 10, 20 4 Z"
          fill="currentColor"
          opacity="0.92"
        />
        <path
          d="M20 32 L 20 38"
          stroke="currentColor"
          strokeWidth="1.3"
          strokeLinecap="round"
        />
        <circle cx="14" cy="20" r="1.4" fill="#D4A574" />
        <circle cx="26" cy="22" r="1.2" fill="#D4A574" />
      </svg>
      <span className="flex flex-col items-start leading-none">
        <span className="font-display text-2xl tracking-tight">novaterra</span>
        <span className="text-[8.5px] tracking-[0.36em] uppercase mt-0.5 opacity-60">
          Coffee &amp; Kitchen
        </span>
      </span>
    </Link>
  );
}
