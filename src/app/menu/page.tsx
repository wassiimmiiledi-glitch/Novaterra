import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageHeader from "@/components/PageHeader";
import MenuList from "@/components/MenuList";
import { prisma } from "@/lib/prisma";

export const metadata = {
  title: "Menu",
  description:
    "The full Novaterra Coffee & Kitchen menu — coffee, signature cocktails, brunch, crêpes, breakfast packages, desserts, and chicha. Served at P7R3+69F, Ben Arous, Tunisia."
};

export const revalidate = 30;

export default async function MenuPage() {
  // Ordering by `id` preserves the PDF's section + intra-section order
  // (seed IDs are sequential per category: nv_c01..nv_c09, nv_i01..nv_i08, …).
  const items = await prisma.menuItem
    .findMany({ where: { available: true }, orderBy: { id: "asc" } })
    .catch(() => []);

  return (
    <>
      <Navbar />
      <PageHeader
        eyebrow="The menu"
        title="Coffee &amp; <em>Kitchen</em>"
        description="Slow coffee, signature cocktails, Mediterranean brunch, family breakfast tables and chicha — every line poured, plated and served beneath the olive tree."
      />
      <MenuList items={items} />
      <Footer />
    </>
  );
}
