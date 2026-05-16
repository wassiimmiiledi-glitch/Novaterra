import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageHeader from "@/components/PageHeader";
import QRMenu from "@/components/QRMenu";
import { Mail, MapPin, Phone, Clock, Instagram, Facebook } from "lucide-react";

export const metadata = {
  title: "Contact",
  description:
    "Find Novaterra Coffee & Kitchen at P7R3+69F, Ben Arous, Tunisia — directions, hours, WhatsApp, and ways to reach us."
};

export default function ContactPage() {
  return (
    <>
      <Navbar />
      <PageHeader
        eyebrow="Contact"
        title="Come find us <em>beneath the tree.</em>"
        description="Walk in, write to us, or send a message. We'll answer within the day."
      />

      <section className="bg-cream-50 pb-24">
        <div className="container-x grid md:grid-cols-12 gap-12">
          <div className="md:col-span-5 space-y-10">
            <Info
              icon={<MapPin />}
              label="Visit"
              lines={["Novaterra · P7R3+69F", "Ben Arous, Tunisia"]}
              href="https://www.google.com/maps/place/P7R3%2B69F+Ben+Arous"
            />
            <Info icon={<Phone />} label="Call / WhatsApp" lines={["+216 56 783 708"]} />
            <Info icon={<Mail />} label="Write" lines={["hello@novaterra.cafe", "events@novaterra.cafe"]} />
            <Info
              icon={<Clock />}
              label="Hours"
              lines={["Mon — Fri · 7:30 → 23:00", "Sat — Sun · 9:00 → 24:00"]}
            />
            <div>
              <p className="eyebrow mb-4">Follow</p>
              <div className="flex gap-3">
                <a href="https://www.instagram.com/novaterra_coffee?igsh=MTl4bTNtMjBkYWtpdA==" target="_blank" rel="noreferrer" className="w-11 h-11 rounded-full border border-ink/15 flex items-center justify-center hover:bg-olive-700 hover:text-cream-50 hover:border-olive-700 transition-colors" aria-label="Instagram @novaterra_coffee"><Instagram className="w-4 h-4" /></a>
                <a href="https://facebook.com" className="w-11 h-11 rounded-full border border-ink/15 flex items-center justify-center hover:bg-olive-700 hover:text-cream-50 hover:border-olive-700 transition-colors" aria-label="Facebook"><Facebook className="w-4 h-4" /></a>
              </div>
            </div>
          </div>

          <div className="md:col-span-7">
            <div className="aspect-[4/3] w-full rounded-sm overflow-hidden shadow-soft border border-ink/10">
              <iframe
                title="Novaterra · P7R3+69F · Ben Arous"
                src="https://maps.google.com/maps?q=NOVATERRA%20P7R3%2B69F%20Ben%20Arous&t=m&z=16&output=embed&iwloc=near"
                className="w-full h-full border-0"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                allowFullScreen
              />
            </div>
            <p className="mt-4 text-[11px] tracking-[0.28em] uppercase text-ink/50 flex flex-wrap items-center gap-x-2 gap-y-1">
              <span>Novaterra · P7R3+69F · Ben Arous, Tunisia</span>
              <span aria-hidden>·</span>
              <a
                className="link-underline hover:text-olive-700"
                href="https://www.google.com/maps/place/P7R3%2B69F+Ben+Arous"
                target="_blank"
                rel="noreferrer"
              >
                Open in Google Maps →
              </a>
            </p>
          </div>
        </div>
      </section>

      {/* Premium QR menu band — between the contact info and the footer */}
      <section className="bg-cream-100 py-24 md:py-32 border-y border-ink/[0.06]">
        <div className="container-x grid md:grid-cols-12 gap-12 md:gap-16 items-center">
          <div className="md:col-span-7">
            <p className="eyebrow">Digital menu</p>
            <h2 className="display text-4xl md:text-5xl mt-5 max-w-[18ch] leading-tight">
              Skip the printed card. <em className="italic text-olive-700">Scan from your table.</em>
            </h2>
            <p className="mt-6 max-w-md text-ink/70 font-light leading-relaxed">
              Our menu lives online — always up to date, never out of stock. Lift your phone,
              scan, and the full Novaterra selection unfolds in your browser.
            </p>
            <div className="mt-10 flex flex-wrap gap-x-10 gap-y-5 text-[11px] tracking-[0.28em] uppercase text-ink/55">
              <span className="flex items-center gap-2"><span className="w-1 h-1 rounded-full bg-olive-700" />Always current</span>
              <span className="flex items-center gap-2"><span className="w-1 h-1 rounded-full bg-olive-700" />No app required</span>
              <span className="flex items-center gap-2"><span className="w-1 h-1 rounded-full bg-olive-700" />Mobile optimized</span>
            </div>
          </div>
          <div className="md:col-span-5 flex justify-center md:justify-end">
            <QRMenu size="lg" caption="Scan · view the menu" showLink />
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}

function Info({
  icon,
  label,
  lines,
  href
}: {
  icon: React.ReactNode;
  label: string;
  lines: string[];
  href?: string;
}) {
  const inner = (
    <>
      <div className="w-11 h-11 rounded-full bg-olive-700 text-cream-50 flex items-center justify-center shrink-0 [&>svg]:w-4 [&>svg]:h-4 transition-colors group-hover:bg-olive-900">
        {icon}
      </div>
      <div>
        <p className="eyebrow mb-2">{label}</p>
        {lines.map((l) => (
          <p key={l} className="text-ink/80 font-light">{l}</p>
        ))}
      </div>
    </>
  );
  return href ? (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className="group flex gap-5 items-start hover:text-olive-700 transition-colors"
    >
      {inner}
    </a>
  ) : (
    <div className="flex gap-5 items-start">{inner}</div>
  );
}
