import type { Metadata } from "next";
import { Cormorant_Garamond, Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "react-hot-toast";
import Providers from "@/components/Providers";
import WhatsAppFab from "@/components/WhatsAppFab";

const serif = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-display",
  display: "swap"
});

const sans = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-sans",
  display: "swap"
});

export const metadata: Metadata = {
  metadataBase: new URL("https://novaterra.cafe"),
  title: {
    default: "Novaterra Coffee & Kitchen — Nouvelle Médina, Tunis",
    template: "%s · Novaterra Coffee & Kitchen"
  },
  description:
    "Novaterra Coffee & Kitchen — slow coffee, Mediterranean brunch, signature cocktails, family breakfast tables and chicha, served beneath a living olive tree in Nouvelle Médina, Tunis.",
  keywords: [
    "Novaterra",
    "coffee shop Tunis",
    "café Tunis",
    "specialty coffee Tunisia",
    "Nouvelle Médina",
    "Tunis café",
    "olive tree café",
    "Mediterranean brunch",
    "luxury café Tunisia"
  ],
  openGraph: {
    title: "Novaterra — A Coffee Sanctuary Beneath the Olive Tree",
    description:
      "Slow coffee, Mediterranean brunch, and quiet luxury beneath a living olive tree — in Nouvelle Médina, Tunis.",
    type: "website",
    locale: "en_US",
    siteName: "Novaterra",
    countryName: "Tunisia"
  },
  other: {
    "geo.region": "TN-11",
    "geo.placename": "Nouvelle Médina, Tunis",
    "geo.position": "36.7985;10.1715",
    ICBM: "36.7985, 10.1715"
  },
  icons: { icon: "/favicon.ico" }
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${serif.variable} ${sans.variable}`}>
      <body className="bg-cream-50 text-ink antialiased selection:bg-olive-600 selection:text-cream-50">
        <Providers>
          {children}
          <WhatsAppFab />
          <Toaster
            position="bottom-center"
            toastOptions={{
              style: {
                background: "#1A1A1A",
                color: "#F5EFE3",
                fontSize: "13px",
                letterSpacing: "0.04em",
                borderRadius: "999px",
                padding: "12px 20px"
              }
            }}
          />
        </Providers>
      </body>
    </html>
  );
}
