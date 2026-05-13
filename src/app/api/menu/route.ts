import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { menuItemSchema } from "@/lib/validators";

export async function GET() {
  const items = await prisma.menuItem.findMany({
    orderBy: [{ category: "asc" }, { name: "asc" }]
  });
  return NextResponse.json(items);
}

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const json = await req.json();
  const parsed = menuItemSchema.safeParse(json);
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
  }
  const item = await prisma.menuItem.create({
    data: { ...parsed.data, image: parsed.data.image || null }
  });
  return NextResponse.json(item, { status: 201 });
}
