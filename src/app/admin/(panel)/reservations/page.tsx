import { prisma } from "@/lib/prisma";
import ReservationsManager from "./ReservationsManager";

export const dynamic = "force-dynamic";

export default async function AdminReservationsPage() {
  const items = await prisma.reservation.findMany({ orderBy: { date: "asc" } });
  // Serialize dates to plain strings for the client component.
  const serialized = items.map((r) => ({
    ...r,
    date: r.date.toISOString(),
    createdAt: r.createdAt.toISOString()
  }));
  return <ReservationsManager initial={serialized} />;
}
