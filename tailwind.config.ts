import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx,js,jsx,mdx}"],
  theme: {
    extend: {
      colors: {
        // Palette extracted from the Novaterra interior — warm concrete,
        // olive-tree green, rattan amber, charcoal accents.
        cream: {
          50: "#FBF8F2",
          100: "#F5EFE3",
          200: "#EDE4D2",
          300: "#E0D3B8",
          400: "#CDBC9A",
          500: "#B7A37E"
        },
        olive: {
          50: "#F2F4EC",
          100: "#E1E6D2",
          200: "#C2CCA5",
          300: "#9CAB75",
          400: "#7B8C56",
          500: "#5F6E3F",
          600: "#4F5D33",
          700: "#3F4A29",
          800: "#2F3720",
          900: "#1F2415"
        },
        clay: {
          400: "#C4A57B",
          500: "#A88660",
          600: "#8B6B49"
        },
        amber: {
          warm: "#D4A574",
          glow: "#E8B97A"
        },
        ink: {
          DEFAULT: "#1A1A1A",
          soft: "#2C2C2C",
          mute: "#5A5A56"
        }
      },
      fontFamily: {
        serif: ["var(--font-serif)", "Cormorant Garamond", "Georgia", "serif"],
        sans: ["var(--font-sans)", "Inter", "system-ui", "sans-serif"],
        display: ["var(--font-display)", "Cormorant Garamond", "serif"]
      },
      letterSpacing: {
        widest: "0.3em"
      },
      animation: {
        "fade-up": "fadeUp 1.1s cubic-bezier(0.22, 1, 0.36, 1) forwards",
        "fade-in": "fadeIn 1.4s ease forwards",
        shimmer: "shimmer 2.4s linear infinite",
        sway: "sway 9s ease-in-out infinite",
        "scroll-hint": "scrollHint 2.2s ease-in-out infinite"
      },
      keyframes: {
        fadeUp: {
          "0%": { opacity: "0", transform: "translateY(28px)" },
          "100%": { opacity: "1", transform: "translateY(0)" }
        },
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" }
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" }
        },
        sway: {
          "0%, 100%": { transform: "rotate(-1.2deg)" },
          "50%": { transform: "rotate(1.2deg)" }
        },
        scrollHint: {
          "0%, 100%": { transform: "translateY(0)", opacity: "0.4" },
          "50%": { transform: "translateY(8px)", opacity: "1" }
        }
      },
      boxShadow: {
        soft: "0 30px 60px -30px rgba(31, 36, 21, 0.35)",
        ring: "0 0 0 1px rgba(95, 110, 63, 0.15)"
      },
      backgroundImage: {
        grain:
          "radial-gradient(rgba(0,0,0,0.06) 1px, transparent 1px), radial-gradient(rgba(255,255,255,0.04) 1px, transparent 1px)"
      }
    }
  },
  plugins: []
};

export default config;
