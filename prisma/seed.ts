import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

// ────────────────────────────────────────────────────────────────────────
//  Real Novaterra menu (from the owner's PDF). 100+ items across 21 cats.
//  Prices are in Tunisian dinar (TND). Descriptions stay null unless the
//  PDF explicitly listed ingredients or a package description — the menu
//  page is typography-first, so empty descriptions render gracefully.
// ────────────────────────────────────────────────────────────────────────

type Seed = {
  id: string;
  name: string;
  description?: string | null;
  price: number;
  category: string;
  featured?: boolean;
  image?: string | null;
};

const MENU: Seed[] = [
  // ── COFFEE ────────────────────────────────────────────────────────────
  { id: "nv_c01", name: "Café Espresso",   price: 4,   category: "Coffee" },
  { id: "nv_c02", name: "Café Americano",  price: 4.5, category: "Coffee" },
  { id: "nv_c03", name: "Café Macchiato",  price: 4.5, category: "Coffee" },
  { id: "nv_c04", name: "Café Latté",      price: 5,   category: "Coffee" },
  { id: "nv_c05", name: "Cappuccino",      price: 6.5, category: "Coffee" },
  { id: "nv_c06", name: "Café Turc",       price: 7,   category: "Coffee" },
  { id: "nv_c07", name: "Café Liégeois",   price: 8.5, category: "Coffee", featured: true,
    image: "https://images.unsplash.com/photo-1517244683847-7456b63c5969?auto=format&fit=crop&w=1200&q=80" },
  { id: "nv_c08", name: "Café Viennois",   price: 8.5, category: "Coffee" },
  { id: "nv_c09", name: "Nescafé",         price: 5,   category: "Coffee" },

  // ── ICED COFFEE ───────────────────────────────────────────────────────
  { id: "nv_i01", name: "Iced Latté",             price: 7,  category: "Iced Coffee" },
  { id: "nv_i02", name: "Iced Caramel Macchiato", price: 8,  category: "Iced Coffee" },
  { id: "nv_i03", name: "Iced Vanilla Latté",     price: 9,  category: "Iced Coffee" },
  { id: "nv_i04", name: "Iced Hazelnut Latté",    price: 9,  category: "Iced Coffee" },
  { id: "nv_i05", name: "Iced Moka Latté",        price: 9,  category: "Iced Coffee" },
  { id: "nv_i06", name: "Iced Pistachio Latté",   price: 10, category: "Iced Coffee" },
  { id: "nv_i07", name: "Iced Blanco Latté",      price: 10, category: "Iced Coffee" },
  { id: "nv_i08", name: "Affogato",               price: 11, category: "Iced Coffee" },

  // ── CAFÉ SPÉCIAL ──────────────────────────────────────────────────────
  { id: "nv_s01", name: "Caramel Macchiato", price: 7, category: "Café Spécial" },
  { id: "nv_s02", name: "Pistachio Latté",   price: 8, category: "Café Spécial" },
  { id: "nv_s03", name: "Moka Latté",        price: 7, category: "Café Spécial" },
  { id: "nv_s04", name: "Blanco Latté",      price: 8, category: "Café Spécial" },

  // ── HOT CHOCOLATE ─────────────────────────────────────────────────────
  { id: "nv_h01", name: "Classic",   price: 7,   category: "Hot Chocolate" },
  { id: "nv_h02", name: "Hazelnut",  price: 7.5, category: "Hot Chocolate", description: "Chocolat, noisette" },
  { id: "nv_h03", name: "Pistachio", price: 9,   category: "Hot Chocolate", description: "Chocolat, pistache" },
  { id: "nv_h04", name: "Blanka",    price: 9,   category: "Hot Chocolate", description: "Chocolat noir, chocolat blanc" },

  // ── TEA ───────────────────────────────────────────────────────────────
  { id: "nv_t01", name: "Simple Tea",     price: 4,   category: "Tea" },
  { id: "nv_t02", name: "Almond Tea",     price: 6.5, category: "Tea" },
  { id: "nv_t03", name: "Pine Nut Tea",   price: 9,   category: "Tea" },
  { id: "nv_t04", name: "Sweet Fruit Tea",price: 12,  category: "Tea" },

  // ── SODA ──────────────────────────────────────────────────────────────
  { id: "nv_d01", name: "Boisson",    price: 4,  category: "Soda" },
  { id: "nv_d02", name: "Red Bull",   price: 11, category: "Soda" },
  { id: "nv_d03", name: "Monster",    price: 15, category: "Soda" },
  { id: "nv_d04", name: "Water 1L",   price: 4,  category: "Soda" },
  { id: "nv_d05", name: "Water 0.5L", price: 2,  category: "Soda" },

  // ── FRESH JUICES ──────────────────────────────────────────────────────
  { id: "nv_j01", name: "Lemon",      price: 6.5, category: "Fresh Juices" },
  { id: "nv_j02", name: "Strawberry", price: 8,   category: "Fresh Juices" },
  { id: "nv_j03", name: "Orange",     price: 6,   category: "Fresh Juices" },
  { id: "nv_j04", name: "Banane",     price: 8,   category: "Fresh Juices" },
  { id: "nv_j05", name: "Melon",      price: 8,   category: "Fresh Juices" },
  { id: "nv_j06", name: "Kiwi",       price: 8,   category: "Fresh Juices" },
  { id: "nv_j07", name: "Apple",      price: 8,   category: "Fresh Juices" },
  { id: "nv_j08", name: "Pineapple",  price: 10,  category: "Fresh Juices" },
  { id: "nv_j09", name: "Peach",      price: 8,   category: "Fresh Juices" },

  // ── SMOOTHIES ─────────────────────────────────────────────────────────
  { id: "nv_sm01", name: "Fruits rouges",          price: 9,  category: "Smoothies", description: "Fraise · Framboise · Fruits rouges" },
  { id: "nv_sm02", name: "Tropical",               price: 9,  category: "Smoothies", description: "Ananas · Orange · Banane" },
  { id: "nv_sm03", name: "Detox",                  price: 7,  category: "Smoothies", description: "Citron · Pomme · Menthe" },
  { id: "nv_sm04", name: "Green Essence",          price: 8,  category: "Smoothies", description: "Pomme · Menthe · Ananas" },
  { id: "nv_sm05", name: "Exotic",                 price: 10, category: "Smoothies", description: "Mangue · Ananas · Kiwi · Menthe" },
  { id: "nv_sm06", name: "Novaterra Special Chef", price: 13, category: "Smoothies", featured: true,
    image: "https://images.unsplash.com/photo-1623065422902-30a2d299bbe4?auto=format&fit=crop&w=1200&q=80" },

  // ── NOVATERRA ORIGINAL COCKTAILS ──────────────────────────────────────
  { id: "nv_co01", name: "Colombia",               price: 9,  category: "Cocktails", description: "Banane, kiwi, ananas" },
  { id: "nv_co02", name: "Energy",                 price: 12, category: "Cocktails", description: "Banane, datte, fruits secs, miel" },
  { id: "nv_co03", name: "Hawaii",                 price: 10, category: "Cocktails", description: "Ananas, mangue, noix de coco" },
  { id: "nv_co04", name: "Kiss",                   price: 11, category: "Cocktails", description: "Fruits rouges, glace à la vanille, ananas" },
  { id: "nv_co05", name: "Piña Colada",            price: 10, category: "Cocktails", description: "Ananas, noix de coco" },
  { id: "nv_co06", name: "La Rosa",                price: 9,  category: "Cocktails", description: "Banane, ananas, framboise" },
  { id: "nv_co07", name: "Waka Waka",              price: 11, category: "Cocktails", description: "Ananas, kiwi, citron" },
  { id: "nv_co08", name: "Novaterra Special Chef", price: 13, category: "Cocktails" },

  // ── MOJITO ────────────────────────────────────────────────────────────
  { id: "nv_mj01", name: "Classic",                  price: 7,   category: "Mojito" },
  { id: "nv_mj02", name: "Red Fruits",               price: 8,   category: "Mojito" },
  { id: "nv_mj03", name: "Blueberry",                price: 8,   category: "Mojito" },
  { id: "nv_mj04", name: "Raspberry",                price: 8,   category: "Mojito" },
  { id: "nv_mj05", name: "Pineapple",                price: 9,   category: "Mojito" },
  { id: "nv_mj06", name: "Kiwi",                     price: 8.5, category: "Mojito" },
  { id: "nv_mj07", name: "Piña Colada",              price: 9,   category: "Mojito" },
  { id: "nv_mj08", name: "Mango",                    price: 9.5, category: "Mojito" },
  { id: "nv_mj09", name: "Novaterra Chef's Special", price: 13,  category: "Mojito" },

  // ── FRAPPUCCINO ───────────────────────────────────────────────────────
  { id: "nv_fr01", name: "Espresso",  price: 7,  category: "Frappuccino" },
  { id: "nv_fr02", name: "Caramel",   price: 9,  category: "Frappuccino" },
  { id: "nv_fr03", name: "Vanilla",   price: 9,  category: "Frappuccino" },
  { id: "nv_fr04", name: "Hazelnut",  price: 9,  category: "Frappuccino" },
  { id: "nv_fr05", name: "Chocolate", price: 9,  category: "Frappuccino" },
  { id: "nv_fr06", name: "Nutella",   price: 10, category: "Frappuccino" },

  // ── MILKSHAKE SIGNATURE ───────────────────────────────────────────────
  { id: "nv_mk01", name: "Strawberry",                price: 9,   category: "Milkshake" },
  { id: "nv_mk02", name: "Red Berries",               price: 9,   category: "Milkshake" },
  { id: "nv_mk03", name: "Banana",                    price: 8.5, category: "Milkshake" },
  { id: "nv_mk04", name: "Nutella",                   price: 10,  category: "Milkshake" },
  { id: "nv_mk05", name: "Caramel",                   price: 9,   category: "Milkshake" },
  { id: "nv_mk06", name: "Vanilla",                   price: 8,   category: "Milkshake" },
  { id: "nv_mk07", name: "Hazelnut",                  price: 8,   category: "Milkshake" },
  { id: "nv_mk08", name: "Pistachio",                 price: 11,  category: "Milkshake" },
  { id: "nv_mk09", name: "White Chocolate",           price: 10,  category: "Milkshake" },
  { id: "nv_mk10", name: "Lotus",                     price: 9,   category: "Milkshake" },
  { id: "nv_mk11", name: "Oreo",                      price: 9,   category: "Milkshake" },
  { id: "nv_mk12", name: "Ferrero Rocher",            price: 10,  category: "Milkshake" },
  { id: "nv_mk13", name: "Kinder",                    price: 11,  category: "Milkshake" },
  { id: "nv_mk14", name: "Raffaello",                 price: 11,  category: "Milkshake" },
  { id: "nv_mk15", name: "Novaterra Chef's Special",  price: 13,  category: "Milkshake" },

  // ── SWEET CRÊPES & GAUFRES ────────────────────────────────────────────
  { id: "nv_sc01", name: "Nutella",                   price: 10, category: "Sweet Crêpes" },
  { id: "nv_sc02", name: "Nutella & Banana",          price: 12, category: "Sweet Crêpes" },
  { id: "nv_sc03", name: "Nutella & Mixed Nuts",      price: 13, category: "Sweet Crêpes" },
  { id: "nv_sc04", name: "Nutella & Speculoos",       price: 11, category: "Sweet Crêpes" },
  { id: "nv_sc05", name: "Speculoos",                 price: 9,  category: "Sweet Crêpes" },
  { id: "nv_sc06", name: "Pistachio",                 price: 11, category: "Sweet Crêpes" },
  { id: "nv_sc07", name: "Oreo",                      price: 9,  category: "Sweet Crêpes" },
  { id: "nv_sc08", name: "Kinder",                    price: 11, category: "Sweet Crêpes" },
  { id: "nv_sc09", name: "Ferrero Rocher",            price: 11, category: "Sweet Crêpes" },
  { id: "nv_sc10", name: "Raffaello",                 price: 11, category: "Sweet Crêpes" },
  { id: "nv_sc11", name: "Seasonal Fruits",           price: 12, category: "Sweet Crêpes" },
  { id: "nv_sc12", name: "Morjen",                    price: 9,  category: "Sweet Crêpes" },
  { id: "nv_sc13", name: "White Chocolate",           price: 10, category: "Sweet Crêpes" },
  { id: "nv_sc14", name: "Novaterra Chef's Special",  price: 20, category: "Sweet Crêpes" },

  // ── OMELETTE GOURMET ──────────────────────────────────────────────────
  { id: "nv_om01", name: "Tuna & Mozzarella",   price: 9,   category: "Omelette" },
  { id: "nv_om02", name: "Jambon & Mozzarella", price: 8.5, category: "Omelette" },
  { id: "nv_om03", name: "Vegetarian",          price: 7.5, category: "Omelette" },
  { id: "nv_om04", name: "4 Cheeses",           price: 10,  category: "Omelette" },

  // ── SAVORY CRÊPES ─────────────────────────────────────────────────────
  { id: "nv_sa01", name: "Tuna & Mozzarella",         price: 12, category: "Savory Crêpes" },
  { id: "nv_sa02", name: "Jambon & Mozzarella",       price: 11, category: "Savory Crêpes" },
  { id: "nv_sa03", name: "Tunisian",                  price: 13, category: "Savory Crêpes", description: "Thon, mozzarella et œuf" },
  { id: "nv_sa04", name: "Mexican",                   price: 13, category: "Savory Crêpes", description: "Bœuf haché, mozzarella et sauce mexicaine" },
  { id: "nv_sa05", name: "White Chicken",             price: 14, category: "Savory Crêpes", description: "Escalope de poulet, mozzarella et champignons" },
  { id: "nv_sa06", name: "Red Chicken",               price: 14, category: "Savory Crêpes", description: "Escalope de poulet, mozzarella et sauce tomate" },
  { id: "nv_sa07", name: "4 Cheeses",                 price: 13, category: "Savory Crêpes" },
  { id: "nv_sa08", name: "Novaterra Chef's Special",  price: 15, category: "Savory Crêpes" },

  // ── BREAKFAST · SOLO ──────────────────────────────────────────────────
  { id: "nv_bs01", name: "Fast — jusqu'à 10h", price: 9,
    category: "Breakfast Solo",
    description: "Café de votre choix · croissant ou gâteau · eau 0,5 L." },
  { id: "nv_bs02", name: "Slow", price: 11,
    category: "Breakfast Solo",
    description: "Café de votre choix · croissant ou gâteau · jus · eau 0,5 L · mini omelette ou crêpe salée · salade de fruits." },
  { id: "nv_bs03", name: "Happy", price: 11,
    category: "Breakfast Solo",
    description: "Café de votre choix · croissant ou gâteau · jus · eau 0,5 L · gaufre ou crêpe sucrée · salade de fruits." },
  { id: "nv_bs04", name: "Healthy", price: 12.5,
    category: "Breakfast Solo",
    description: "Café de votre choix · jus · omelette · charcuterie · salade de fruits · yaourt · granola · eau 0,5 L." },

  // ── BREAKFAST · DUO ───────────────────────────────────────────────────
  { id: "nv_bd01", name: "Big One", price: 25,
    category: "Breakfast Duo",
    description: "Café de votre choix · croissant · jus · eau 1 L · omelette · crêpe · charcuterie · gâteau ou gaufre · salade de fruits · yaourt · beurre / miel / chamia." },
  { id: "nv_bd02", name: "Big Two", price: 34,
    category: "Breakfast Duo",
    description: "Café de votre choix · croissant · jus · eau 1 L · omelette · crêpe · charcuterie · frites · nuggets · mini sandwich · gaufre ou gâteau · salade de fruits · beurre / miel / chamia / chocolat." },

  // ── BREAKFAST · FAMILY ────────────────────────────────────────────────
  { id: "nv_bf01", name: "Big Family — 4 personnes", price: 55,
    category: "Breakfast Family",
    description: "Café de votre choix · croissant · jus · eau 1 L · omelette · crêpe · charcuterie · frites · nuggets · mini sandwich · gaufre ou gâteau · confiture · beurre · chocolat · chamia · salade de fruits · ojja · mlewi · œufs · makroud · gâteaux." },

  // ── KIDS ──────────────────────────────────────────────────────────────
  { id: "nv_k01", name: "Happy Kid", price: 10,
    category: "Kids",
    description: "Chocolat au lait · mini pancakes · jus · une petite surprise." },

  // ── DESSERTS ──────────────────────────────────────────────────────────
  { id: "nv_de01", name: "Tiramisu",          price: 11,  category: "Desserts" },
  { id: "nv_de02", name: "Cheesecake",        price: 12,  category: "Desserts" },
  { id: "nv_de03", name: "Chocolate Fondant", price: 11,  category: "Desserts" },
  { id: "nv_de04", name: "Jwejem",            price: 13,  category: "Desserts" },
  { id: "nv_de05", name: "Banana Split",      price: 12,  category: "Desserts" },
  { id: "nv_de06", name: "Ice Cream", price: 3.5, category: "Desserts", description: "1 scoop" },
  { id: "nv_de07", name: "Ice Cream", price: 6,   category: "Desserts", description: "2 scoops" },
  { id: "nv_de08", name: "Ice Cream", price: 9,   category: "Desserts", description: "3 scoops" },
  { id: "nv_de09", name: "Fresh Fruit Platter", price: 8,  category: "Desserts", description: "For 1 person" },
  { id: "nv_de10", name: "Fresh Fruit Platter", price: 14, category: "Desserts", description: "For 2 persons" },
  { id: "nv_de11", name: "Fresh Fruit Platter", price: 20, category: "Desserts", description: "For 4 persons" },

  // ── CHICHA ────────────────────────────────────────────────────────────
  { id: "nv_ch01", name: "Chicha — Fakher",            price: 9,  category: "Chicha" },
  { id: "nv_ch02", name: "Chicha — Adalya",            price: 11, category: "Chicha" },
  { id: "nv_ch03", name: "Ice Chicha",                 price: 14, category: "Chicha" },
  { id: "nv_ch04", name: "Nova Terra Signature Chicha", price: 28, category: "Chicha", featured: true,
    description: "Chicha glacée · baklawa · salade de fruits frais · eau 1 L.",
    image: "https://images.unsplash.com/photo-1582142306909-195724d33c14?auto=format&fit=crop&w=1200&q=80" }
];

async function main() {
  // ── Admin ────────────────────────────────────────────────────────────
  const email = process.env.ADMIN_EMAIL ?? "admin@novaterra.com";
  const password = process.env.ADMIN_PASSWORD ?? "novaterra2026";
  const hash = await bcrypt.hash(password, 12);
  await prisma.admin.upsert({
    where: { email },
    update: { password: hash },
    create: { email, password: hash, name: "Novaterra Owner" }
  });
  console.log(`✓ Admin ready: ${email}`);

  // ── Menu (replace) ───────────────────────────────────────────────────
  await prisma.menuItem.deleteMany();
  for (const item of MENU) {
    await prisma.menuItem.create({
      data: {
        id: item.id,
        name: item.name,
        description: item.description ?? null,
        price: item.price,
        category: item.category,
        featured: item.featured ?? false,
        available: true,
        image: item.image ?? null
      }
    });
  }
  console.log(`✓ Seeded ${MENU.length} menu items`);

  // ── Sample reservations ──────────────────────────────────────────────
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
