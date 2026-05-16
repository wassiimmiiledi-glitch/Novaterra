import Hero from "@/components/Hero";
import StoryBlock from "@/components/StoryBlock";
import MenuShowcase, { type Group } from "@/components/MenuShowcase";
import Atmosphere from "@/components/Atmosphere";
import Testimonials from "@/components/Testimonials";
import CTA from "@/components/CTA";
import Loader from "@/components/Loader";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { prisma } from "@/lib/prisma";

export const revalidate = 60;

/**
 * The homepage's menu-showcase groups the 21 categories into 7 readable
 * sections — same taxonomy used by /menu's scroll-spy nav. Counts are
 * derived live from Supabase so the section always reflects the real menu.
 */
const GROUP_PLAN: Array<{
  key: string;
  heading: string;
  subtitle: string;
  categories: { key: string; label: string }[];
}> = [
  {
    key: "Coffee",
    heading: "Coffee",
    subtitle: "Hot · iced · spécial",
    categories: [
      { key: "Coffee", label: "Café" },
      { key: "Iced Coffee", label: "Iced Coffee" },
      { key: "Café Spécial", label: "Café Spécial" },
      { key: "Hot Chocolate", label: "Hot Chocolate" }
    ]
  },
  {
    key: "Drinks",
    heading: "Drinks & Sips",
    subtitle: "Tea · juice · cold",
    categories: [
      { key: "Tea", label: "Tea" },
      { key: "Fresh Juices", label: "Fresh Juices" },
      { key: "Smoothies", label: "Smoothies" },
      { key: "Frappuccino", label: "Frappuccino" },
      { key: "Milkshake", label: "Milkshake" },
      { key: "Soda", label: "Soda · Water" }
    ]
  },
  {
    key: "Mixes",
    heading: "Signature Mixes",
    subtitle: "Cocktails · mojito",
    categories: [
      { key: "Cocktails", label: "Novaterra Cocktails" },
      { key: "Mojito", label: "Mojito" }
    ]
  },
  {
    key: "Kitchen",
    heading: "Kitchen",
    subtitle: "Crêpes · omelette",
    categories: [
      { key: "Sweet Crêpes", label: "Sweet Crêpes & Gaufres" },
      { key: "Savory Crêpes", label: "Savory Crêpes" },
      { key: "Omelette", label: "Omelette Gourmet" }
    ]
  },
  {
    key: "Breakfast",
    heading: "Breakfast",
    subtitle: "Solo · duo · family",
    categories: [
      { key: "Breakfast Solo", label: "Solo" },
      { key: "Breakfast Duo", label: "Duo" },
      { key: "Breakfast Family", label: "Family" },
      { key: "Kids", label: "Kids" }
    ]
  },
  {
    key: "Sweet",
    heading: "Sweet",
    subtitle: "Desserts",
    categories: [{ key: "Desserts", label: "Desserts" }]
  },
  {
    key: "Chicha",
    heading: "Chicha",
    subtitle: "Fakher · Adalya · ice",
    categories: [{ key: "Chicha", label: "Chicha" }]
  }
];

async function loadShowcase(): Promise<{ groups: Group[]; total: number }> {
  try {
    const counts = await prisma.menuItem.groupBy({
      by: ["category"],
      where: { available: true },
      _count: { _all: true }
    });
    const map = new Map(counts.map((c) => [c.category, c._count._all]));
    const total = counts.reduce((n, c) => n + c._count._all, 0);

    const groups: Group[] = GROUP_PLAN.map((g) => ({
      key: g.key,
      heading: g.heading,
      subtitle: g.subtitle,
      categories: g.categories
        .map((c) => ({ ...c, count: map.get(c.key) ?? 0 }))
        .filter((c) => c.count > 0)
    })).filter((g) => g.categories.length > 0);

    return { groups, total };
  } catch {
    return { groups: [], total: 0 };
  }
}

export default async function HomePage() {
  const showcase = await loadShowcase();

  return (
    <>
      <Loader />
      <Navbar />
      <main>
        <Hero />
        <StoryBlock />
        <MenuShowcase groups={showcase.groups} total={showcase.total} />
        <Atmosphere />
        <Testimonials />
        <CTA />
      </main>
      <Footer />
    </>
  );
}
