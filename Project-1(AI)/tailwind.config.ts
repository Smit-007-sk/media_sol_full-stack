import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Shared legacy tokens
        emperor: {
          ivory: "#F5F1E8",
          "white-warm": "#FFFDF8",
          emerald: "#075C45",
          "emerald-dark": "#063C30",
          gold: "#C9A45C",
          "gold-soft": "#D9BD7A",
          charcoal: "#18201C",
          noir: "#121614",
          sand: "#E5DDD0",
          border: "#E2D9C8",
          "border-dark": "#2A3630",
        },

        // Template 1 Theme: Classic Emerald & Ivory Corporate
        t1: {
          bg: "#FBF8F1",
          card: "#FFFFFF",
          emerald: "#075C45",
          "emerald-dark": "#042F24",
          gold: "#C9A45C",
          charcoal: "#1F2937",
          border: "#E5DEC9",
          muted: "#6B7280",
        },

        // Template 2 Theme: Warm Terracotta & Sand Linen Editorial
        t2: {
          bg: "#F5EFE6",
          linen: "#EBDCCB",
          card: "#FAF6F0",
          terracotta: "#B85B35",
          "terracotta-dark": "#8C3B1A",
          espresso: "#231B18",
          sand: "#D4C3B3",
          border: "#DBC8B5",
          muted: "#6E5B54",
        },

        // Template 3 Theme: Pitch Black & Electric Ochre Creative Studio
        t3: {
          bg: "#0A0A0A",
          card: "#141416",
          concrete: "#1F1F24",
          ochre: "#E5B842",
          "ochre-bright": "#F5C953",
          noir: "#050505",
          white: "#FFFFFF",
          border: "#2A2A30",
          muted: "#9CA3AF",
        },

        // Template 4 Theme: Executive Slate Blue & Steel Ice Corporate
        t4: {
          bg: "#F8FAFC",
          card: "#FFFFFF",
          navy: "#0F172A",
          slate: "#1E293B",
          blue: "#1D4ED8",
          "blue-light": "#3B82F6",
          ice: "#E2E8F0",
          border: "#CBD5E1",
          text: "#0F172A",
          muted: "#475569",
        },

        // Template 5 Theme: Pure Alabaster & Platinum Gold Minimal Luxury
        t5: {
          bg: "#FAFAFA",
          card: "#FFFFFF",
          cream: "#F4F1EA",
          gold: "#C5A059",
          "gold-bright": "#D4AF37",
          noir: "#111111",
          border: "#EAE3D2",
          muted: "#737373",
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "Inter", "sans-serif"],
        serif: ["var(--font-garamond)", "Cormorant Garamond", "serif"],
        display: ["var(--font-playfair)", "Playfair Display", "serif"],
        mono: ["var(--font-manrope)", "Manrope", "sans-serif"],
      },
      boxShadow: {
        subtle: "0 4px 20px -2px rgba(0, 0, 0, 0.05)",
        card: "0 10px 30px -5px rgba(0, 0, 0, 0.08)",
        t1: "0 10px 30px -5px rgba(7, 92, 69, 0.2)",
        t2: "0 10px 30px -5px rgba(184, 91, 53, 0.18)",
        t3: "0 10px 30px -5px rgba(229, 184, 66, 0.15)",
        t4: "0 10px 30px -5px rgba(30, 41, 59, 0.15)",
        t5: "0 10px 30px -5px rgba(197, 160, 89, 0.12)",
      },
    },
  },
  plugins: [],
};

export default config;
