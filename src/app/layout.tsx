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
    default: "Novaterra Coffee & Kitchen — Ben Arous, Tunisia",
    template: "%s · Novaterra Coffee & Kitchen"
  },
  description:
    "Novaterra Coffee & Kitchen — slow coffee, Mediterranean brunch, signature cocktails, family breakfast tables and chicha, served beneath a living olive tree at P7R3+69F, Ben Arous.",
  keywords: [
    "Novaterra",
    "coffee shop Ben Arous",
    "café Ben Arous",
    "specialty coffee Tunisia",
    "Ben Arous café",
    "Tunisia café",
    "olive tree café",
    "Mediterranean brunch",
    "luxury café Tunisia",
    "P7R3+69F"
  ],
  openGraph: {
    title: "Novaterra Coffee & Kitchen — Ben Arous",
    description:
      "Slow coffee, Mediterranean brunch, and quiet luxury beneath a living olive tree — at P7R3+69F, Ben Arous, Tunisia.",
    type: "website",
    locale: "en_US",
    siteName: "Novaterra Coffee & Kitchen",
    countryName: "Tunisia"
  },
  other: {
    "geo.region": "TN-13",
    "geo.placename": "Ben Arous, Tunisia",
    "geo.position": "36.7494;10.2295",
    ICBM: "36.7494, 10.2295"
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
