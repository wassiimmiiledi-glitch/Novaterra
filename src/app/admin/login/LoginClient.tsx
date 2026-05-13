"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { signIn } from "next-auth/react";
import toast from "react-hot-toast";
import { motion } from "framer-motion";
import { Loader2 } from "lucide-react";
import Logo from "@/components/Logo";
import Link from "next/link";

export default function LoginClient() {
  const router = useRouter();
  const params = useSearchParams();
  const callbackUrl = params.get("callbackUrl") ?? "/admin";
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    const fd = new FormData(e.currentTarget);
    const res = await signIn("credentials", {
      email: fd.get("email"),
      password: fd.get("password"),
      redirect: false
    });
    setLoading(false);
    if (res?.error) {
      toast.error("Invalid credentials");
    } else {
      toast.success("Welcome back");
      router.push(callbackUrl);
      router.refresh();
    }
  }

  return (
    <div className="min-h-screen grid lg:grid-cols-2 bg-cream-50">
      <div className="relative hidden lg:block overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage:
              "url('/images/admin.jpg'), url('https://images.unsplash.com/photo-1497515114629-f71d768fd07c?auto=format&fit=crop&w=1400&q=80'), linear-gradient(160deg,#3F4A29,#5F6E3F,#A88660)"
          }}
        />
        <div className="absolute inset-0 bg-ink/35" />
        <div className="relative h-full flex flex-col justify-between p-12 text-cream-50">
          <Logo variant="light" />
          <div>
            <p className="eyebrow !text-amber-warm">Owner space</p>
            <h2 className="display text-5xl mt-5 max-w-[16ch]">
              The quiet command room of your café.
            </h2>
            <p className="mt-6 max-w-md text-cream-100/80 font-light">
              Manage menu, reservations, and the day-to-day rhythm of Novaterra —
              with the same calm as the room itself.
            </p>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-center p-8 lg:p-16">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="w-full max-w-sm"
        >
          <div className="lg:hidden mb-12">
            <Logo />
          </div>
          <p className="eyebrow">Sign in</p>
          <h1 className="display text-4xl mt-4">Welcome back.</h1>
          <p className="mt-3 text-ink/65 font-light">Enter the admin space to manage Novaterra.</p>

          <form onSubmit={onSubmit} className="mt-10 space-y-6">
            <label className="block">
              <span className="block text-[11px] tracking-[0.3em] uppercase text-ink/60 mb-3">Email</span>
              <input
                name="email"
                type="email"
                required
                placeholder="admin@novaterra.com"
                className="w-full bg-transparent border-b border-ink/20 focus:border-olive-700 outline-none py-3 text-[15px] placeholder:text-ink/35"
              />
            </label>
            <label className="block">
              <span className="block text-[11px] tracking-[0.3em] uppercase text-ink/60 mb-3">Password</span>
              <input
                name="password"
                type="password"
                required
                placeholder="••••••••"
                className="w-full bg-transparent border-b border-ink/20 focus:border-olive-700 outline-none py-3 text-[15px] placeholder:text-ink/35"
              />
            </label>
            <button type="submit" disabled={loading} className="btn-primary w-full justify-center disabled:opacity-60">
              {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : "Sign in"}
            </button>
          </form>

          <Link
            href="/"
            className="mt-12 inline-block text-[11px] tracking-[0.3em] uppercase text-ink/55 hover:text-olive-700"
          >
            ← Back to site
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
