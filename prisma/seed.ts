import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  const email = process.env.ADMIN_EMAIL ?? "admin@novaterra.com";
  const password = process.env.ADMIN_PASSWORD ?? "novaterra2026";
  const hash = await bcrypt.hash(password, 12);

  await prisma.admin.upsert({
    where: { email },
    update: { password: hash },
    create: { email, password: hash, name: "Novaterra Owner" }
  });
  console.log(`✓ Admin ready: ${email}`);

  const menu = [
    {
      name: "Olive Tree Latte",
      description:
        "Single-origin espresso, lightly sweetened oat milk and a whisper of olive leaf — our house signature.",
      price: 12,
      category: "Signature",
      featured: true,
      image:
        "https://images.unsplash.com/photo-1541167760496-1628856ab772?auto=format&fit=crop&w=1200&q=80"
    },
    {
      name: "Cortado Novaterra",
      description: "Rich espresso met with steamed milk in perfect ratio. Dense, warm, balanced.",
      price: 8.5,
      category: "Espresso",
      featured: true,
      image:
        "https://images.unsplash.com/photo-1517701550927-30cf4ba1dba5?auto=format&fit=crop&w=1200&q=80"
    },
    {
      name: "Pour Over of the Day",
      description: "A rotating slow-extraction pour over highlighting one micro-lot bean.",
      price: 14,
      category: "Filter",
      featured: true,
      image:
        "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=1200&q=80"
    },
    {
      name: "Iced Vanilla Bean Latte",
      description: "Cold extracted espresso, Madagascar vanilla, ice and silky milk.",
      price: 11,
      category: "Cold",
      image:
        "https://images.unsplash.com/photo-1461023058943-07fcbe16d735?auto=format&fit=crop&w=1200&q=80"
    },
    {
      name: "Matcha Olive Honey",
      description: "Ceremonial matcha layered with olive honey and steamed milk.",
      price: 13.5,
      category: "Signature",
      image:
        "https://images.unsplash.com/photo-1536013455792-95c63fb7d04f?auto=format&fit=crop&w=1200&q=80"
    },
    {
      name: "Affogato",
      description: "A scoop of vanilla bean gelato drowned in a fresh espresso shot.",
      price: 14,
      category: "Dessert",
      image:
        "https://images.unsplash.com/photo-1517244683847-7456b63c5969?auto=format&fit=crop&w=1200&q=80"
    },
    {
      name: "Mediterranean Toast",
      description: "Sourdough, labneh, heirloom tomato, olive oil, za'atar.",
      price: 18,
      category: "Brunch",
      image:
        "https://images.unsplash.com/photo-1525351484163-7529414344d8?auto=format&fit=crop&w=1200&q=80"
    },
    {
      name: "Olive Oil Cake",
      description: "Moist citrus and olive oil cake, dusted with powdered sugar.",
      price: 11,
      category: "Dessert",
      image:
        "https://images.unsplash.com/photo-1565958011703-44f9829ba187?auto=format&fit=crop&w=1200&q=80"
    },
    {
      name: "Avocado Sourdough",
      description: "Smashed avocado, lemon, chili flakes, microgreens, soft-poached egg.",
      price: 22,
      category: "Brunch",
      image:
        "https://images.unsplash.com/photo-1525351484163-7529414344d8?auto=format&fit=crop&w=1200&q=80"
    },
    {
      name: "Cold Brew Tonic",
      description: "12-hour cold brew, citrus tonic, rosemary sprig.",
      price: 12.5,
      category: "Cold",
      image:
        "https://images.unsplash.com/photo-1517701604599-bb29b565090c?auto=format&fit=crop&w=1200&q=80"
    },
    {
      name: "Espresso Martini",
      description: "After-hours classic — vodka, espresso, coffee liqueur. Served in coupe.",
      price: 28,
      category: "Bar",
      image:
        "https://images.unsplash.com/photo-1551751299-1b51cab2694c?auto=format&fit=crop&w=1200&q=80"
    },
    {
      name: "House Hot Chocolate",
      description: "70% dark chocolate, steamed milk, sea-salt flake.",
      price: 11,
      category: "Signature",
      image:
        "https://images.unsplash.com/photo-1542990253-0b8be9d97e8b?auto=format&fit=crop&w=1200&q=80"
    }
  ];

  await prisma.menuItem.deleteMany();
  for (const item of menu) {
    await prisma.menuItem.create({ data: item });
  }
  console.log(`✓ Seeded ${menu.length} menu items`);

  await prisma.reservation.deleteMany();
  await prisma.reservation.createMany({
    data: [
      {
        name: "Sara Bensaid",
        email: "sara@example.com",
        phone: "+216 22 000 001",
        date: new Date(Date.now() + 1000 * 60 * 60 * 24 * 2),
        time: "19:30",
        guests: 2,
        notes: "Window seat near the olive tree, please.",
        status: "CONFIRMED"
      },
      {
        name: "Yassine M.",
        email: "yassine@example.com",
        phone: "+216 22 000 002",
        date: new Date(Date.now() + 1000 * 60 * 60 * 24 * 4),
        time: "11:00",
        guests: 4,
        status: "PENDING"
      }
    ]
  });
  console.log("✓ Seeded reservations");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
