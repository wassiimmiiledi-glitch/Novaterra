import { prisma } from "@/lib/prisma";
import MenuManager from "./MenuManager";

export const dynamic = "force-dynamic";

export default async function AdminMenuPage() {
  const items = await prisma.menuItem.findMany({
    orderBy: [{ category: "asc" }, { name: "asc" }]
  });
  return <MenuManager initial={items} />;
}
