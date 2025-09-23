import type { Config } from "tailwindcss";

export default {
  darkMode: "class",
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        // Harmonized dark theme colors
        youtube: {
          dark: {
            bg: "#1a1b23",
            surface: "#252731",
            surface2: "#2f3349",
            surface3: "#404354",
            text: "#e4e6ea",
            textSecondary: "#b8bcc8",
            textMuted: "#8b919e",
            red: "#ef4444",
            blue: "#3b82f6",
            hover: "#353849",
          }
        }
      },
    },
  },
  plugins: [],
} satisfies Config;
