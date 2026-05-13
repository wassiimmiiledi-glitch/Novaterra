"use client";

import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import toast from "react-hot-toast";
import { Plus, Pencil, Trash2, Star, X, Loader2, Search } from "lucide-react";
import { formatPrice } from "@/lib/utils";

type Item = {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  image: string | null;
  featured: boolean;
  available: boolean;
};

const empty: Omit<Item, "id"> = {
  name: "",
  description: "",
  price: 0,
  category: "Signature",
  image: "",
  featured: false,
  available: true
};

export default function MenuManager({ initial }: { initial: Item[] }) {
  const [items, setItems] = useState<Item[]>(initial);
  const [editing, setEditing] = useState<Item | null>(null);
  const [creating, setCreating] = useState(false);
  const [query, setQuery] = useState("");

  const filtered = useMemo(
    () =>
      items.filter((i) =>
        (i.name + i.category + i.description).toLowerCase().includes(query.toLowerCase())
      ),
    [items, query]
  );

  async function deleteItem(id: string) {
    if (!confirm("Delete this menu item? This cannot be undone.")) return;
    const res = await fetch(`/api/menu/${id}`, { method: "DELETE" });
    if (!res.ok) return toast.error("Could not delete");
    setItems((arr) => arr.filter((i) => i.id !== id));
    toast.success("Removed from menu");
  }

  async function toggleFeature(item: Item) {
    const res = await fetch(`/api/menu/${item.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ featured: !item.featured })
    });
    if (!res.ok) return toast.error("Could not update");
    const updated = await res.json();
    setItems((arr) => arr.map((i) => (i.id === item.id ? updated : i)));
  }

  return (
    <div className="px-10 py-12">
      <div className="flex items-end justify-between flex-wrap gap-6">
        <div>
          <p className="eyebrow">Menu</p>
          <h1 className="display text-5xl mt-4">Compose the menu.</h1>
          <p className="mt-3 text-ink/65 font-light max-w-xl">
            Add, edit, feature, or retire items. Changes are live within seconds.
          </p>
        </div>
        <button onClick={() => setCreating(true)} className="btn-primary">
          <Plus className="w-4 h-4" /> New item
        </button>
      </div>

      <div className="mt-10 max-w-md relative">
        <Search className="w-4 h-4 absolute left-4 top-1/2 -translate-y-1/2 text-ink/40" />
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search by name, category…"
          className="w-full bg-cream-50 border border-ink/10 rounded-full pl-11 pr-5 py-3 text-sm outline-none focus:border-olive-700 transition-colors"
        />
      </div>

      <div className="mt-10 grid md:grid-cols-2 xl:grid-cols-3 gap-5">
        {filtered.map((item) => (
          <motion.article
            key={item.id}
            layout
            className="bg-cream-50 rounded-sm border border-ink/5 overflow-hidden flex flex-col group"
          >
            <div className="aspect-[16/10] bg-olive-100 relative overflow-hidden">
              {item.image ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={item.image} alt="" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
              ) : (
                <div className="w-full h-full bg-gradient-to-br from-olive-200 to-cream-200" />
              )}
              <button
                onClick={() => toggleFeature(item)}
                title={item.featured ? "Unfeature" : "Feature"}
                className={`absolute top-3 right-3 w-9 h-9 rounded-full flex items-center justify-center transition-all ${
                  item.featured ? "bg-amber-warm text-ink" : "bg-cream-50/90 text-ink/55 hover:bg-amber-warm hover:text-ink"
                }`}
              >
                <Star className={`w-4 h-4 ${item.featured ? "fill-current" : ""}`} />
              </button>
              {!item.available && (
                <span className="absolute top-3 left-3 text-[10px] tracking-[0.28em] uppercase bg-ink text-cream-50 px-2 py-1 rounded-sm">
                  Hidden
                </span>
              )}
            </div>
            <div className="p-5 flex-1 flex flex-col">
              <p className="text-[10px] tracking-[0.3em] uppercase text-olive-600">{item.category}</p>
              <h3 className="font-display text-xl mt-1.5">{item.name}</h3>
              <p className="mt-2 text-sm text-ink/65 line-clamp-2">{item.description}</p>
              <div className="mt-auto pt-4 flex items-center justify-between">
                <span className="font-display text-lg text-olive-700">{formatPrice(item.price)}</span>
                <div className="flex gap-1">
                  <button
                    onClick={() => setEditing(item)}
                    className="w-9 h-9 rounded-full hover:bg-olive-100 text-ink/65 hover:text-olive-700 flex items-center justify-center transition-colors"
                    aria-label="Edit"
                  >
                    <Pencil className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => deleteItem(item.id)}
                    className="w-9 h-9 rounded-full hover:bg-red-100 text-ink/65 hover:text-red-600 flex items-center justify-center transition-colors"
                    aria-label="Delete"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </motion.article>
        ))}
        {filtered.length === 0 && (
          <p className="md:col-span-2 xl:col-span-3 py-20 text-center text-ink/50 italic font-display text-2xl">
            Nothing matches that search.
          </p>
        )}
      </div>

      <AnimatePresence>
        {(creating || editing) && (
          <Editor
            initial={editing ?? { ...empty, id: "new" }}
            isNew={creating}
            onClose={() => {
              setCreating(false);
              setEditing(null);
            }}
            onSaved={(saved) => {
              setItems((arr) => {
                const idx = arr.findIndex((i) => i.id === saved.id);
                if (idx === -1) return [saved, ...arr];
                const next = [...arr];
                next[idx] = saved;
                return next;
              });
              setCreating(false);
              setEditing(null);
            }}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

function Editor({
  initial,
  isNew,
  onClose,
  onSaved
}: {
  initial: Item;
  isNew: boolean;
  onClose: () => void;
  onSaved: (item: Item) => void;
}) {
  const [form, setForm] = useState({
    ...initial,
    image: initial.image ?? ""
  });
  const [saving, setSaving] = useState(false);

  async function save(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    const url = isNew ? "/api/menu" : `/api/menu/${initial.id}`;
    const res = await fetch(url, {
      method: isNew ? "POST" : "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form)
    });
    setSaving(false);
    if (!res.ok) {
      const data = await res.json().catch(() => ({}));
      toast.error(typeof data.error === "string" ? data.error : "Could not save");
      return;
    }
    const saved = await res.json();
    onSaved(saved);
    toast.success(isNew ? "Item added" : "Saved");
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 bg-ink/50 backdrop-blur-sm flex items-center justify-center p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, y: 24, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 16 }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        className="bg-cream-50 max-w-2xl w-full rounded-sm shadow-soft max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <header className="flex items-center justify-between p-7 border-b border-ink/10 sticky top-0 bg-cream-50">
          <div>
            <p className="eyebrow">{isNew ? "New item" : "Edit item"}</p>
            <h2 className="font-display text-2xl mt-1">
              {isNew ? "Add to the menu" : form.name || "Untitled"}
            </h2>
          </div>
          <button onClick={onClose} className="p-2 -mr-2 text-ink/55 hover:text-ink"><X className="w-5 h-5" /></button>
        </header>

        <form onSubmit={save} className="p-7 space-y-6">
          <Field label="Name" value={form.name} onChange={(v) => setForm({ ...form, name: v })} required />
          <div className="grid md:grid-cols-2 gap-6">
            <Field label="Category" value={form.category} onChange={(v) => setForm({ ...form, category: v })} required />
            <Field label="Price (TND)" type="number" step="0.5" value={String(form.price)} onChange={(v) => setForm({ ...form, price: Number(v) })} required />
          </div>
          <Field label="Image URL" value={form.image} onChange={(v) => setForm({ ...form, image: v })} placeholder="https://…" />
          <label className="block">
            <span className="block text-[11px] tracking-[0.3em] uppercase text-ink/60 mb-3">Description</span>
            <textarea
              rows={4}
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
              className="w-full bg-transparent border border-ink/15 rounded-sm focus:border-olive-700 outline-none p-4 text-[15px] resize-none"
              required
            />
          </label>

          <div className="flex flex-wrap gap-6">
            <Toggle label="Featured" value={form.featured} onChange={(v) => setForm({ ...form, featured: v })} />
            <Toggle label="Available" value={form.available} onChange={(v) => setForm({ ...form, available: v })} />
          </div>

          <div className="pt-4 flex items-center justify-end gap-3">
            <button type="button" onClick={onClose} className="btn-ghost text-[11px] !px-5 !py-2.5">Cancel</button>
            <button type="submit" disabled={saving} className="btn-primary text-[11px] !px-5 !py-2.5 disabled:opacity-60">
              {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : isNew ? "Add item" : "Save"}
            </button>
          </div>
        </form>
      </motion.div>
    </motion.div>
  );
}

function Field({
  label,
  value,
  onChange,
  ...props
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
} & Omit<React.InputHTMLAttributes<HTMLInputElement>, "value" | "onChange">) {
  return (
    <label className="block">
      <span className="block text-[11px] tracking-[0.3em] uppercase text-ink/60 mb-3">{label}</span>
      <input
        {...props}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full bg-transparent border-b border-ink/20 focus:border-olive-700 outline-none py-3 text-[15px] placeholder:text-ink/35 transition-colors"
      />
    </label>
  );
}

function Toggle({
  label,
  value,
  onChange
}: {
  label: string;
  value: boolean;
  onChange: (v: boolean) => void;
}) {
  return (
    <button
      type="button"
      onClick={() => onChange(!value)}
      className="flex items-center gap-3 group"
    >
      <span
        className={`w-11 h-6 rounded-full p-0.5 transition-colors ${
          value ? "bg-olive-700" : "bg-ink/20"
        }`}
      >
        <span
          className={`block w-5 h-5 bg-cream-50 rounded-full shadow-soft transition-transform ${
            value ? "translate-x-5" : "translate-x-0"
          }`}
        />
      </span>
      <span className="text-[12px] tracking-[0.22em] uppercase text-ink/70">{label}</span>
    </button>
  );
}
