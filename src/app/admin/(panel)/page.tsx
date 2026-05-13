import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { formatDate, formatPrice } from "@/lib/utils";
import { ArrowUpRight } from "lucide-react";

export const dynamic = "force-dynamic";

export default async function AdminOverview() {
  const [menuCount, featuredCount, reservationsCount, pendingReservations, upcoming, recentMenu] =
    await Promise.all([
      prisma.menuItem.count(),
      prisma.menuItem.count({ where: { featured: true } }),
      prisma.reservation.count(),
      prisma.reservation.count({ where: { status: "PENDING" } }),
      prisma.reservation.findMany({
        where: { date: { gte: new Date() } },
        orderBy: { date: "asc" },
        take: 6
      }),
      prisma.menuItem.findMany({ orderBy: { updatedAt: "desc" }, take: 5 })
    ]);

  const stats = [
    { label: "Menu items", value: menuCount, hint: `${featuredCount} featured` },
    { label: "Reservations", value: reservationsCount, hint: `${pendingReservations} pending` },
    { label: "Avg. response", value: "<1h", hint: "this week" },
    { label: "Status", value: "Open", hint: "all systems calm" }
  ];

  return (
    <div className="px-10 py-12">
      <div className="flex items-end justify-between flex-wrap gap-6">
        <div>
          <p className="eyebrow">Overview</p>
          <h1 className="display text-5xl mt-4">A calm day at Novaterra.</h1>
          <p className="mt-3 text-ink/65 font-light max-w-xl">
            Quick read on the room — menu, bookings, the rhythm of the week.
          </p>
        </div>
        <div className="flex gap-3">
          <Link href="/admin/menu" className="btn-ghost text-[11px] !px-5 !py-2.5">+ Add menu item</Link>
          <Link href="/admin/reservations" className="btn-primary text-[11px] !px-5 !py-2.5">View reservations</Link>
        </div>
      </div>

      <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-5">
        {stats.map((s) => (
          <div key={s.label} className="bg-cream-50 rounded-sm p-7 border border-ink/5">
            <p className="text-[11px] tracking-[0.3em] uppercase text-ink/55">{s.label}</p>
            <p className="mt-4 font-display text-4xl text-olive-700">{s.value}</p>
            <p className="mt-2 text-[12px] text-ink/55">{s.hint}</p>
          </div>
        ))}
      </div>

      <div className="mt-14 grid lg:grid-cols-12 gap-8">
        <section className="lg:col-span-7 bg-cream-50 rounded-sm border border-ink/5 p-8">
          <header className="flex items-center justify-between">
            <h2 className="font-display text-2xl">Upcoming reservations</h2>
            <Link
              href="/admin/reservations"
              className="text-[11px] tracking-[0.28em] uppercase text-olive-700 inline-flex items-center gap-1 hover:gap-2 transition-all"
            >
              All <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
          </header>
          <div className="mt-6 divide-y divide-ink/10">
            {upcoming.length === 0 && (
              <p className="py-10 text-center text-ink/55 italic font-display text-xl">
                No upcoming reservations yet.
              </p>
            )}
            {upcoming.map((r) => (
              <div key={r.id} className="py-5 flex items-center gap-5">
                <div className="text-center w-16">
                  <p className="font-display text-2xl text-olive-700 leading-none">
                    {new Date(r.date).getDate()}
                  </p>
                  <p className="text-[10px] tracking-[0.3em] uppercase text-ink/55 mt-1">
                    {new Date(r.date).toLocaleDateString("en", { month: "short" })}
                  </p>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium truncate">{r.name}</p>
                  <p className="text-[13px] text-ink/60 truncate">
                    {r.guests} guest{r.guests > 1 ? "s" : ""} · {r.time} · {r.email}
                  </p>
                </div>
                <span
                  className={`text-[10px] tracking-[0.28em] uppercase px-3 py-1 rounded-full ${
                    r.status === "CONFIRMED"
                      ? "bg-olive-100 text-olive-700"
                      : r.status === "CANCELLED"
                      ? "bg-ink/10 text-ink/55"
                      : "bg-amber-warm/20 text-clay-600"
                  }`}
                >
                  {r.status.toLowerCase()}
                </span>
              </div>
            ))}
          </div>
        </section>

        <section className="lg:col-span-5 bg-cream-50 rounded-sm border border-ink/5 p-8">
          <header className="flex items-center justify-between">
            <h2 className="font-display text-2xl">Recently updated</h2>
            <Link
              href="/admin/menu"
              className="text-[11px] tracking-[0.28em] uppercase text-olive-700 inline-flex items-center gap-1 hover:gap-2 transition-all"
            >
              Menu <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
          </header>
          <ul className="mt-6 divide-y divide-ink/10">
            {recentMenu.map((m) => (
              <li key={m.id} className="py-4 flex items-center gap-4">
                {m.image ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={m.image} alt="" className="w-12 h-12 object-cover rounded-sm" />
                ) : (
                  <div className="w-12 h-12 bg-olive-100 rounded-sm" />
                )}
                <div className="flex-1 min-w-0">
                  <p className="font-medium truncate">{m.name}</p>
                  <p className="text-[12px] text-ink/55">{m.category} · {formatDate(m.updatedAt)}</p>
                </div>
                <span className="font-display text-olive-700">{formatPrice(m.price)}</span>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </div>
  );
}
