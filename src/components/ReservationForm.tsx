"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import toast from "react-hot-toast";
import { ArrowRight, Loader2 } from "lucide-react";

const times = [
  "08:00", "09:00", "10:00", "11:00", "12:00", "13:00",
  "14:00", "15:00", "16:00", "17:00", "18:00", "19:00",
  "20:00", "21:00", "22:00"
];

export default function ReservationForm() {
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData(e.currentTarget);
    const payload = Object.fromEntries(formData.entries());

    try {
      const res = await fetch("/api/reservations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || "Could not submit reservation");
      }
      setDone(true);
      toast.success("Your table is reserved. See you soon.");
      (e.target as HTMLFormElement).reset();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  if (done) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center py-20"
      >
        <p className="eyebrow">Reservation received</p>
        <h3 className="display text-4xl md:text-5xl mt-5 max-w-[20ch] mx-auto">
          We're saving your seat <em className="italic text-olive-700">beneath the tree.</em>
        </h3>
        <p className="mt-6 text-ink/65 font-light max-w-md mx-auto">
          A short email confirmation will follow shortly. Thank you, and welcome to Novaterra.
        </p>
        <button
          onClick={() => setDone(false)}
          className="btn-ghost mt-10"
        >
          Make another reservation
        </button>
      </motion.div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <Field label="Full name" name="name" placeholder="Sara Bensaid" required />
      <Field label="Email" name="email" type="email" placeholder="you@email.com" required />
      <Field label="Phone" name="phone" placeholder="+216 22 000 000" required />
      <Field label="Guests" name="guests" type="number" defaultValue="2" min={1} max={20} required />
      <Field label="Date" name="date" type="date" required />
      <SelectField label="Time" name="time" options={times} required />
      <div className="md:col-span-2">
        <label className="block text-[11px] tracking-[0.3em] uppercase text-ink/60 mb-3">
          Special request <span className="opacity-50">(optional)</span>
        </label>
        <textarea
          name="notes"
          rows={4}
          placeholder="Window seat near the olive tree, dietary needs, occasion…"
          className="w-full bg-transparent border-b border-ink/20 focus:border-olive-700 outline-none py-3 text-[15px] resize-none placeholder:text-ink/35 transition-colors"
        />
      </div>

      <div className="md:col-span-2 mt-6 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
        <p className="text-[11px] tracking-[0.28em] uppercase text-ink/55">
          Required for parties of 5 or more
        </p>
        <button
          type="submit"
          disabled={loading}
          className="btn-primary disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {loading ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" /> Sending…
            </>
          ) : (
            <>
              Confirm reservation <ArrowRight className="w-4 h-4" />
            </>
          )}
        </button>
      </div>
    </form>
  );
}

function Field({
  label,
  ...props
}: React.InputHTMLAttributes<HTMLInputElement> & { label: string }) {
  return (
    <label className="block">
      <span className="block text-[11px] tracking-[0.3em] uppercase text-ink/60 mb-3">{label}</span>
      <input
        {...props}
        className="w-full bg-transparent border-b border-ink/20 focus:border-olive-700 outline-none py-3 text-[15px] placeholder:text-ink/35 transition-colors"
      />
    </label>
  );
}

function SelectField({
  label,
  options,
  ...props
}: React.SelectHTMLAttributes<HTMLSelectElement> & { label: string; options: string[] }) {
  return (
    <label className="block">
      <span className="block text-[11px] tracking-[0.3em] uppercase text-ink/60 mb-3">{label}</span>
      <select
        {...props}
        defaultValue=""
        className="w-full bg-transparent border-b border-ink/20 focus:border-olive-700 outline-none py-3 text-[15px] transition-colors appearance-none"
      >
        <option value="" disabled>Select a time</option>
        {options.map((o) => (
          <option key={o} value={o}>{o}</option>
        ))}
      </select>
    </label>
  );
}
