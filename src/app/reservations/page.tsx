import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageHeader from "@/components/PageHeader";
import ReservationForm from "@/components/ReservationForm";
import QRMenu from "@/components/QRMenu";

export const metadata = {
  title: "Reservations",
  description:
    "Reserve a table at Novaterra — beneath the olive tree, in soft Mediterranean light."
};

export default function ReservationsPage() {
  return (
    <>
      <Navbar />
      <PageHeader
        eyebrow="Reservations"
        title="Save your seat <em>beneath the tree.</em>"
        description="Tell us when, how many, and what kind of moment you're looking for. We'll prepare the rest."
      />
      <section className="bg-cream-50 pb-32">
        <div className="container-x grid lg:grid-cols-12 gap-16">
          <div className="lg:col-span-5">
            <div className="sticky top-32">
              <p className="eyebrow">A few notes</p>
              <h2 className="display text-3xl md:text-4xl mt-5 leading-snug">
                Each reservation is held for <em className="italic text-olive-700">15 minutes.</em>
              </h2>
              <ul className="mt-10 space-y-5 text-ink/70 font-light">
                <li className="flex gap-3"><span className="text-amber-warm">·</span>Tables are 90 minutes during peak service.</li>
                <li className="flex gap-3"><span className="text-amber-warm">·</span>Walk-ins welcome — but reservations are loved.</li>
                <li className="flex gap-3"><span className="text-amber-warm">·</span>Private events: write to <a href="mailto:events@novaterra.cafe" className="link-underline">events@novaterra.cafe</a></li>
                <li className="flex gap-3"><span className="text-amber-warm">·</span>Questions? <a href="tel:+21656783708" className="link-underline">+216 56 783 708</a></li>
              </ul>
              <div className="mt-12 p-6 border border-ink/10 rounded-sm bg-cream-100/60">
                <p className="font-display text-xl text-olive-700">Hours</p>
                <p className="mt-2 text-ink/70 font-light text-sm leading-relaxed">
                  Mon — Fri · 7:30 → 23:00<br />
                  Sat — Sun · 9:00 → 24:00
                </p>
              </div>

              {/* While they wait — a quick scan to preview the menu */}
              <div className="mt-6 p-6 border border-ink/10 rounded-sm bg-cream-100/60 flex items-center gap-6">
                <QRMenu size="sm" caption="" />
                <div className="min-w-0">
                  <p className="font-display text-xl text-olive-700 leading-tight">
                    Preview the menu
                  </p>
                  <p className="mt-2 text-ink/65 font-light text-sm leading-relaxed">
                    Scan with your phone — the full Novaterra selection,
                    always current.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-7">
            <ReservationForm />
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}
