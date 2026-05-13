import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { reservationSchema } from "@/lib/validators";

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const reservations = await prisma.reservation.findMany({
    orderBy: { date: "asc" }
  });
  return NextResponse.json(reservations);
}

export async function POST(req: Request) {
  const json = await req.json();
  const parsed = reservationSchema.safeParse(json);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Please review the form fields." },
      { status: 400 }
    );
  }

  const date = new Date(parsed.data.date);
  if (Number.isNaN(date.valueOf())) {
    return NextResponse.json({ error: "Invalid date" }, { status: 400 });
  }

  const reservation = await prisma.reservation.create({
    data: {
      name: parsed.data.name,
      email: parsed.data.email.toLowerCase(),
      phone: parsed.data.phone,
      date,
      time: parsed.data.time,
      guests: parsed.data.guests,
      notes: parsed.data.notes ?? null,
      status: "PENDING"
    }
  });

  return NextResponse.json({ ok: true, id: reservation.id }, { status: 201 });
}
