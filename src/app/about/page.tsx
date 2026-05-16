import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageHeader from "@/components/PageHeader";
import CTA from "@/components/CTA";

export const metadata = {
  title: "Our Story",
  description:
    "Novaterra is a coffee sanctuary built around a living olive tree — a tribute to slow living, Mediterranean light, and quiet luxury."
};

export default function AboutPage() {
  return (
    <>
      <Navbar />
      <PageHeader
        eyebrow="Our story"
        title="The space came <em>after</em> the tree."
        description="A short story of how Novaterra came to be — and why a single olive tree changed everything."
      />

      <section className="bg-cream-50 pb-32">
        <div className="container-x grid md:grid-cols-12 gap-16 items-start">
          <div className="md:col-span-5 md:sticky md:top-32">
            <div className="aspect-[3/4] relative overflow-hidden rounded-sm shadow-soft">
              <div
                className="absolute inset-0 bg-cover bg-center"
                style={{
                  backgroundImage:
                    "url('/images/about.jpg'), url('https://images.unsplash.com/photo-1559925393-8be0ec4767c8?auto=format&fit=crop&w=1200&q=80'), linear-gradient(160deg,#3F4A29,#B7A37E)"
                }}
              />
            </div>
          </div>

          <article className="md:col-span-7 space-y-10 text-ink/80 leading-relaxed font-light text-[17px]">
            <Block eyebrow="Chapter I" title="A single tree, transplanted">
              In late 2023 we found an olive tree, more than a century old, on a small hill outside
              Sidi Bou Saïd. The grove had been sold; the tree was scheduled to be removed. We
              brought it with us instead — into the heart of Ben Arous. Architecture
              came after. Walls, ceilings, beams — every line of the building was drawn to make
              room for it.
            </Block>

            <Block eyebrow="Chapter II" title="The materials of stillness">
              Concrete, oak, linen, hand-woven rattan. Natural materials chosen for the way they age,
              soften, and quiet a room. The pendant lamps were woven by hand in Nabeul. The chairs are
              upholstered in cream linen. Nothing in Novaterra is loud — by design.
            </Block>

            <Block eyebrow="Chapter III" title="Coffee, slowly">
              We work with one micro-roaster, weekly. Beans rotate by season and origin —
              Ethiopia for spring, Yemen and Brazil through autumn. Each cup is poured slowly,
              without rush. Coffee is the ritual; the tree is the reason.
            </Block>

            <Block eyebrow="Chapter IV" title="Hospitality as atmosphere">
              We don't measure success in tables turned. We measure it in lingering. In the quiet
              guest who reads for two hours. The friends who order another pour. The light moving
              across the wall. Novaterra is yours, for as long as you want to stay.
            </Block>
          </article>
        </div>
      </section>

      <CTA />
      <Footer />
    </>
  );
}

function Block({
  eyebrow,
  title,
  children
}: {
  eyebrow: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <p className="eyebrow">{eyebrow}</p>
      <h2 className="display text-3xl md:text-4xl mt-4 mb-6 text-ink">{title}</h2>
      <p>{children}</p>
    </div>
  );
}
