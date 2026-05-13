import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageHeader from "@/components/PageHeader";
import MenuList from "@/components/MenuList";
import { prisma } from "@/lib/prisma";

export const metadata = {
  title: "Menu",
  description:
    "The Novaterra menu — slow coffee, Mediterranean brunch, signature drinks and seasonal desserts."
};

export const revalidate = 30;

export default async function MenuPage() {
  const items = await prisma.menuItem
    .findMany({ where: { available: true }, orderBy: [{ category: "asc" }, { name: "asc" }] })
    .catch(() => []);

  return (
    <>
      <Navbar />
      <PageHeader
        eyebrow="The menu"
        title="Tasted slowly,<br/>made <em>by hand.</em>"
        description="Single-origin coffee, Mediterranean brunch, and seasonal pastries — pulled from a small kitchen, served beneath the olive tree."
      />
      <MenuList items={items} />
      <Footer />
    </>
  );
}
