import Hero from "@/components/Hero";
import StoryBlock from "@/components/StoryBlock";
import FeaturedMenu from "@/components/FeaturedMenu";
import Atmosphere from "@/components/Atmosphere";
import Testimonials from "@/components/Testimonials";
import CTA from "@/components/CTA";
import Loader from "@/components/Loader";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { prisma } from "@/lib/prisma";

export const revalidate = 60;

export default async function HomePage() {
  const featured = await prisma.menuItem
    .findMany({ where: { featured: true, available: true }, take: 3, orderBy: { createdAt: "desc" } })
    .catch(() => []);

  return (
    <>
      <Loader />
      <Navbar />
      <main>
        <Hero />
        <StoryBlock />
        <FeaturedMenu items={featured} />
        <Atmosphere />
        <Testimonials />
        <CTA />
      </main>
      <Footer />
    </>
  );
}
