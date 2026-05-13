"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut, useSession } from "next-auth/react";
import { LayoutDashboard, Coffee, CalendarRange, LogOut, ExternalLink } from "lucide-react";
import Logo from "@/components/Logo";
import { cn } from "@/lib/utils";

const nav = [
  { href: "/admin", label: "Overview", icon: LayoutDashboard },
  { href: "/admin/menu", label: "Menu", icon: Coffee },
  { href: "/admin/reservations", label: "Reservations", icon: CalendarRange }
];

export default function AdminShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { data } = useSession();

  return (
    <div className="min-h-screen bg-cream-100 flex">
      <aside className="w-72 shrink-0 bg-olive-900 text-cream-100 px-7 py-9 flex flex-col sticky top-0 h-screen">
        <Logo variant="light" />

        <p className="mt-12 eyebrow !text-cream-200/55">Manage</p>
        <nav className="mt-5 flex flex-col gap-1">
          {nav.map((n) => {
            const Icon = n.icon;
            const active = pathname === n.href;
            return (
              <Link
                key={n.href}
                href={n.href}
                className={cn(
                  "flex items-center gap-3 px-4 py-3 rounded-sm text-[13px] tracking-[0.18em] uppercase transition-colors",
                  active
                    ? "bg-cream-50 text-olive-900"
                    : "text-cream-200/75 hover:bg-cream-100/5 hover:text-cream-50"
                )}
              >
                <Icon className="w-4 h-4" />
                {n.label}
              </Link>
            );
          })}
        </nav>

        <div className="mt-auto pt-8 border-t border-cream-100/10">
          <Link
            href="/"
            target="_blank"
            className="flex items-center gap-2 text-[11px] tracking-[0.3em] uppercase text-cream-200/65 hover:text-cream-50 transition-colors mb-5"
          >
            View site <ExternalLink className="w-3.5 h-3.5" />
          </Link>
          <p className="text-[11px] tracking-[0.2em] uppercase text-cream-200/55 truncate">
            {data?.user?.email ?? "Signed in"}
          </p>
          <button
            onClick={() => signOut({ callbackUrl: "/" })}
            className="mt-4 inline-flex items-center gap-2 text-[12px] tracking-[0.22em] uppercase text-amber-warm hover:text-cream-50 transition-colors"
          >
            <LogOut className="w-4 h-4" /> Sign out
          </button>
        </div>
      </aside>

      <main className="flex-1 min-w-0">{children}</main>
    </div>
  );
}
