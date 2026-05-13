"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import toast from "react-hot-toast";
import { Check, X, Trash2, Search, Calendar, Clock, Users } from "lucide-react";
import { formatDate } from "@/lib/utils";

type Reservation = {
  id: string;
  name: string;
  email: string;
  phone: string;
  date: string;
  time: string;
  guests: number;
  notes: string | null;
  status: string;
  createdAt: string;
};

const FILTERS = ["All", "PENDING", "CONFIRMED", "CANCELLED"] as const;
type Filter = (typeof FILTERS)[number];

export default function ReservationsManager({ initial }: { initial: Reservation[] }) {
  const [items, setItems] = useState<Reservation[]>(initial);
  const [filter, setFilter] = useState<Filter>("All");
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    return items
      .filter((r) => (filter === "All" ? true : r.status === filter))
      .filter((r) =>
        (r.name + r.email + r.phone).toLowerCase().includes(query.toLowerCase())
      );
  }, [items, filter, query]);

  async function setStatus(id: string, status: string) {
    const res = await fetch(`/api/reservations/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status })
    });
    if (!res.ok) return toast.error("Could not update");
    const updated = await res.json();
    setItems((arr) => arr.map((i) => (i.id === id ? { ...i, ...updated, date: new Date(updated.date).toISOString() } : i)));
    toast.success(status === "CONFIRMED" ? "Confirmed" : status === "CANCELLED" ? "Cancelled" : "Updated");
  }

  async function remove(id: string) {
    if (!confirm("Delete this reservation?")) return;
    const res = await fetch(`/api/reservations/${id}`, { method: "DELETE" });
    if (!res.ok) return toast.error("Could not delete");
    setItems((arr) => arr.filter((i) => i.id !== id));
    toast.success("Reservation removed");
  }

  return (
    <div className="px-10 py-12">
      <div className="flex items-end justify-between flex-wrap gap-6">
        <div>
          <p className="eyebrow">Reservations</p>
          <h1 className="display text-5xl mt-4">Today's rhythm.</h1>
          <p className="mt-3 text-ink/65 font-light max-w-xl">
            Confirm, cancel, or take a closer look at every booking.
          </p>
        </div>
        <div className="flex items-center gap-2 flex-wrap">
          {FILTERS.map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`text-[11px] tracking-[0.28em] uppercase px-4 py-2 rounded-full transition-colors ${
                filter === f ? "bg-olive-700 text-cream-50" : "bg-cream-50 text-ink/65 hover:text-ink"
              }`}
            >
              {f === "All" ? "All" : f.toLowerCase()}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-10 max-w-md relative">
        <Search className="w-4 h-4 absolute left-4 top-1/2 -translate-y-1/2 text-ink/40" />
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search by name, email, phone…"
          className="w-full bg-cream-50 border border-ink/10 rounded-full pl-11 pr-5 py-3 text-sm outline-none focus:border-olive-700 transition-colors"
        />
      </div>

      <div className="mt-10 grid lg:grid-cols-2 gap-5">
        {filtered.map((r) => (
          <motion.article
            layout
            key={r.id}
            className="bg-cream-50 rounded-sm border border-ink/5 p-7 flex flex-col gap-5"
          >
            <div className="flex items-start justify-between gap-4">
              <div className="min-w-0">
                <h3 className="font-display text-2xl truncate">{r.name}</h3>
                <p className="text-[13px] text-ink/60 truncate">{r.email}</p>
                <p className="text-[13px] text-ink/60">{r.phone}</p>
              </div>
              <span className={`text-[10px] tracking-[0.28em] uppercase px-3 py-1 rounded-full whitespace-nowrap ${
                r.status === "CONFIRMED" ? "bg-olive-100 text-olive-700"
                  : r.status === "CANCELLED" ? "bg-ink/10 text-ink/55"
                  : "bg-amber-warm/20 text-clay-600"
              }`}>
                {r.status.toLowerCase()}
              </span>
            </div>

            <div className="grid grid-cols-3 gap-4 text-[13px] text-ink/75">
              <Stat icon={<Calendar className="w-3.5 h-3.5" />} label={formatDate(r.date)} />
              <Stat icon={<Clock className="w-3.5 h-3.5" />} label={r.time} />
              <Stat icon={<Users className="w-3.5 h-3.5" />} label={`${r.guests} guest${r.guests > 1 ? "s" : ""}`} />
            </div>

            {r.notes && (
              <p className="text-[13px] text-ink/65 italic border-l-2 border-olive-200 pl-3">
                "{r.notes}"
              </p>
            )}

            <div className="pt-2 flex items-center gap-2 border-t border-ink/10">
              {r.status !== "CONFIRMED" && (
                <button
                  onClick={() => setStatus(r.id, "CONFIRMED")}
                  className="inline-flex items-center gap-2 text-[11px] tracking-[0.24em] uppercase text-olive-700 hover:text-olive-900 px-3 py-2"
                >
                  <Check className="w-4 h-4" /> Confirm
                </button>
              )}
              {r.status !== "CANCELLED" && (
                <button
                  onClick={() => setStatus(r.id, "CANCELLED")}
                  className="inline-flex items-center gap-2 text-[11px] tracking-[0.24em] uppercase text-ink/65 hover:text-ink px-3 py-2"
                >
                  <X className="w-4 h-4" /> Cancel
                </button>
              )}
              <button
                onClick={() => remove(r.id)}
                className="ml-auto inline-flex items-center gap-2 text-[11px] tracking-[0.24em] uppercase text-ink/55 hover:text-red-600 px-3 py-2"
              >
                <Trash2 className="w-4 h-4" /> Delete
              </button>
            </div>
          </motion.article>
        ))}
        {filtered.length === 0 && (
          <p className="lg:col-span-2 py-20 text-center text-ink/50 italic font-display text-2xl">
            No reservations match this view.
          </p>
        )}
      </div>
    </div>
  );
}

function Stat({ icon, label }: { icon: React.ReactNode; label: string }) {
  return (
    <div className="flex items-center gap-2 text-ink/70">
      <span className="text-olive-700">{icon}</span>
      <span className="truncate">{label}</span>
    </div>
  );
}
