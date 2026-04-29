import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/app/**/*.{ts,tsx}",
    "./src/components/**/*.{ts,tsx}",
    "./src/lib/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        display: ["var(--font-jakarta)", "var(--font-inter)", "system-ui", "sans-serif"],
      },
      colors: {
        // Brand: deep emerald — trust, growth, subtle nod to Cote d'Ivoire identity
        brand: {
          50: "#ecfdf5",
          100: "#d1fae5",
          200: "#a7f3d0",
          500: "#0f8b5c",
          600: "#0a6f49",
          700: "#085639",
          900: "#063b27",
        },
        // Accent: warm amber — energy, opportunity, live indicator
        accent: {
          50: "#fff8eb",
          100: "#fef0c7",
          500: "#f59e0b",
          600: "#d97706",
          700: "#b45309",
        },
        // Ink: warm neutrals
        ink: {
          50: "#faf9f7",
          100: "#eeece6",
          200: "#dcd8cd",
          300: "#bcb6a6",
          400: "#8a8473",
          500: "#5b5547",
          600: "#3f3a30",
          700: "#2c2922",
          800: "#1d1b16",
          900: "#13110d",
        },
        success: {
          100: "#d1fae5",
          700: "#0a6f49",
        },
        warn: {
          100: "#fef0c7",
          700: "#b45309",
        },
        cream: "#faf7f2",
      },
      boxShadow: {
        soft: "0 4px 20px -4px rgba(19, 17, 13, 0.06), 0 2px 6px -2px rgba(19, 17, 13, 0.04)",
        elevated:
          "0 16px 40px -12px rgba(19, 17, 13, 0.12), 0 4px 12px -4px rgba(19, 17, 13, 0.06)",
        glow: "0 0 0 4px rgba(15, 139, 92, 0.12)",
      },
      backgroundImage: {
        "grid-pattern":
          "radial-gradient(circle at 1px 1px, rgba(19, 17, 13, 0.06) 1px, transparent 0)",
      },
    },
  },
  plugins: [],
};

export default config;
