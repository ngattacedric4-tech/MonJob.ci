import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/app/**/*.{ts,tsx}",
    "./src/components/**/*.{ts,tsx}",
    "./src/lib/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50: "#f3f7ff",
          100: "#dce8ff",
          500: "#2f6df6",
          600: "#2459d0",
          700: "#1b45a6",
        },
        ink: {
          50: "#f7f8fb",
          100: "#ebeef5",
          200: "#d9dfeb",
          500: "#5b6883",
          700: "#313d55",
          900: "#121926",
        },
        success: {
          100: "#dafbe6",
          700: "#0b7a37",
        },
        warn: {
          100: "#fff1cf",
          700: "#8a5b00",
        },
      },
      boxShadow: {
        soft: "0 12px 40px rgba(17, 24, 39, 0.08)",
      },
    },
  },
  plugins: [],
};

export default config;

