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
        // YouTube-inspired dark theme colors
        youtube: {
          dark: {
            bg: "#0f0f0f",
            surface: "#1f1f1f",
            surface2: "#272727",
            surface3: "#3d3d3d",
            text: "#ffffff",
            textSecondary: "#aaaaaa",
            textMuted: "#717171",
            red: "#ff0000",
            blue: "#3ea6ff",
            hover: "#373737",
          }
        }
      },
    },
  },
  plugins: [],
} satisfies Config;
