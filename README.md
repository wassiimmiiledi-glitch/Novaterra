# Novaterra · A Coffee Sanctuary Beneath the Olive Tree

A premium, production-ready website + admin dashboard for **Novaterra**, an
elegant coffee shop built around a living olive tree.

> Designed as a digital extension of the physical space — concrete, cream,
> rattan amber, olive green, and soft Mediterranean light.

## ✨ What's inside

- **Public site**
  - Cinematic landing page (hero, story, featured menu, atmosphere, testimonials, CTA)
  - Menu page with sticky category filter and animated transitions
  - Reservations page with validated form + toast feedback
  - About / Our Story (chaptered storytelling)
  - Contact page with map + info
  - 404 + branded loader
  - Custom Cormorant Garamond × Inter typography pair
  - Framer Motion micro-interactions throughout
  - SEO metadata, Open Graph, sitemap-ready
  - Fully responsive, mobile-first, accessible
- **Admin dashboard** (protected by NextAuth credentials)
  - Overview with KPIs, upcoming reservations, recently updated menu
  - Menu CRUD (create, edit, delete, feature/unfeature, toggle availability)
  - Reservations management (search, filter, confirm/cancel, delete)
  - Same premium design language as the public site
- **Backend**
  - Next.js 14 App Router API routes
  - Prisma ORM with SQLite (zero-config) — switchable to Postgres in 1 line
  - NextAuth.js (JWT credentials, bcrypt hashing)
  - Zod validation on every endpoint
- **QR Menu system** (server-rendered, zero JS payload)
  - Inline SVG QR code generated at request time via `qrcode`
  - Three sizes (sm / md / lg), light + dark variants
  - Premium framed card with olive corner brackets
  - Placed in the Footer, on the Contact page (large), and as a sidebar card
    on the Reservations page — owner can drop the `<QRMenu />` component anywhere
  - Encodes `${NEXT_PUBLIC_SITE_URL}/menu` so phones can scan from any table

## 🛠️ Stack

| Layer        | Choice                                              |
|--------------|-----------------------------------------------------|
| Framework    | Next.js 14 (App Router)                             |
| Language     | TypeScript                                          |
| Styling      | Tailwind CSS (custom Novaterra design tokens)       |
| Animations   | Framer Motion                                       |
| Icons        | lucide-react                                        |
| Forms        | Native + Zod validation                             |
| Toasts       | react-hot-toast                                     |
| Database     | Prisma ORM + SQLite (Postgres-ready)                |
| Auth         | NextAuth.js (Credentials + JWT)                     |
| Passwords    | bcryptjs                                            |

## 📁 Folder structure

```
novaterra/
├── prisma/
│   ├── schema.prisma          # Admin, MenuItem, Reservation models
│   └── seed.ts                # Seeds admin + 12 menu items + sample reservations
├── public/
│   └── images/                # Drop your café photos here (see README inside)
├── src/
│   ├── app/
│   │   ├── layout.tsx         # Root layout, fonts, Toaster, providers
│   │   ├── globals.css        # Design tokens, components, animations
│   │   ├── page.tsx           # Landing page (Hero → Story → Featured → CTA)
│   │   ├── menu/page.tsx
│   │   ├── reservations/page.tsx
│   │   ├── about/page.tsx
│   │   ├── contact/page.tsx
│   │   ├── not-found.tsx
│   │   ├── admin/
│   │   │   ├── layout.tsx
│   │   │   ├── login/page.tsx
│   │   │   └── (panel)/       # Protected route group
│   │   │       ├── layout.tsx          # AdminShell sidebar
│   │   │       ├── page.tsx            # Overview / KPIs
│   │   │       ├── menu/               # Menu manager
│   │   │       └── reservations/       # Reservations manager
│   │   └── api/
│   │       ├── auth/[...nextauth]/route.ts
│   │       ├── menu/route.ts            # GET (public), POST (admin)
│   │       ├── menu/[id]/route.ts       # GET, PUT, DELETE
│   │       ├── reservations/route.ts    # POST (public), GET (admin)
│   │       └── reservations/[id]/route.ts  # PATCH, DELETE
│   ├── components/
│   │   ├── Hero.tsx, StoryBlock.tsx, FeaturedMenu.tsx, Atmosphere.tsx,
│   │   ├── Testimonials.tsx, CTA.tsx, Navbar.tsx, Footer.tsx,
│   │   ├── Loader.tsx, Logo.tsx, ReservationForm.tsx, MenuList.tsx,
│   │   ├── PageHeader.tsx, PageShell.tsx, Providers.tsx
│   │   └── admin/AdminShell.tsx
│   ├── lib/
│   │   ├── prisma.ts          # PrismaClient singleton
│   │   ├── auth.ts            # NextAuth options
│   │   ├── utils.ts           # cn(), formatPrice(), formatDate()
│   │   └── validators.ts      # Zod schemas
│   ├── types/next-auth.d.ts
│   └── middleware.ts          # Protects /admin/* (except /admin/login)
├── .env.example
├── tailwind.config.ts
├── tsconfig.json
├── next.config.js
└── package.json
```

## 🚀 Getting started

### 1. Install

```bash
npm install
```

### 2. Configure environment

Copy `.env.example` → `.env` (already provided with safe local defaults):

```env
DATABASE_URL="file:./dev.db"
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="..." # generate with: openssl rand -base64 32
ADMIN_EMAIL="admin@novaterra.com"
ADMIN_PASSWORD="novaterra2026"
# Public origin used by share links + QR codes — set this to your deploy URL.
NEXT_PUBLIC_SITE_URL="http://localhost:3000"
```

> **Generate a real secret** before deploying:
> `openssl rand -base64 32`

### 3. Initialize the database

```bash
npm run setup
# → prisma generate + prisma db push + tsx prisma/seed.ts
```

This creates `prisma/dev.db`, seeds your admin user, 12 menu items, and a couple
of sample reservations.

### 4. Add your photos

Drop your café photos into `public/images/` using the filenames listed in
`public/images/README.txt`. (The site renders gracefully without them — warm
gradient fallbacks are in place — but real photos make the site sing.)

### 5. Run the dev server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### 6. Sign into the admin

- URL: [http://localhost:3000/admin/login](http://localhost:3000/admin/login)
- Email: `admin@novaterra.com`
- Password: `novaterra2026`

> Change these in `.env` *before* running `npm run setup`. To change the
> password later, update `.env` and re-run `npm run db:seed`.

## 🧰 Useful commands

```bash
npm run dev         # start dev server
npm run build       # production build
npm run start       # production server
npm run db:push     # sync schema → database (no migrations file)
npm run db:seed     # reseed admin + menu + reservations
npm run db:studio   # Prisma Studio GUI
```

## 🎨 Design system (extracted from the café)

| Token         | Value      | Used for                          |
|---------------|------------|-----------------------------------|
| `cream-50`    | `#FBF8F2`  | Page background                   |
| `cream-100`   | `#F5EFE3`  | Soft section background           |
| `olive-700`   | `#3F4A29`  | Primary brand · CTAs · accents    |
| `olive-900`   | `#1F2415`  | Dark sections (footer, featured)  |
| `amber-warm`  | `#D4A574`  | Rattan-light accent · highlights  |
| `ink`         | `#1A1A1A`  | Text                              |

Typography:
- **Display / serif:** Cormorant Garamond
- **Sans:** Inter
- Display-italic is used as a soft accent across all H1/H2 ("a coffee *sanctuary*")

## 🚢 Deploy to Vercel

1. Push to GitHub.
2. Create a new Vercel project from the repo.
3. **For SQLite + Vercel:** SQLite is read-only on Vercel's serverless filesystem.
   You have two production-grade choices:
   - **Postgres (recommended).** In `prisma/schema.prisma` change
     `provider = "sqlite"` to `provider = "postgresql"`, set
     `DATABASE_URL` to a Vercel Postgres / Neon / Supabase URL,
     then run `npx prisma db push && npm run db:seed` once.
   - **SQLite via Turso (libSQL)** if you'd rather stay in SQLite — see
     [turso.tech docs](https://docs.turso.tech).
4. Add these environment variables in Vercel:
   - `DATABASE_URL`
   - `NEXTAUTH_URL` (your production URL, e.g. `https://novaterra.vercel.app`)
   - `NEXTAUTH_SECRET` (generate with `openssl rand -base64 32`)
   - `ADMIN_EMAIL`, `ADMIN_PASSWORD`
5. Deploy. After the first deploy, run the seed once from a local terminal
   pointed at the production DB:
   ```bash
   DATABASE_URL="<prod url>" npm run db:seed
   ```

## 🔒 Security notes

- Admin passwords are bcrypt-hashed (cost 12).
- All admin API routes (`POST/PUT/DELETE /api/menu/*`, `GET/PATCH/DELETE /api/reservations/*`)
  require an authenticated session.
- The middleware protects every `/admin/*` route except `/admin/login`.
- NextAuth uses JWT sessions (8h max) with the secret from `NEXTAUTH_SECRET`.
- All form input is validated server-side with Zod.
- Always rotate `NEXTAUTH_SECRET` in production.

## 📜 License

Private — built for the Novaterra brand.
#   N o v a t e r r a  
 