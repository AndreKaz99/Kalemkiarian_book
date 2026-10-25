import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        midnight: "#180E29",
        aubergine: "#341B50",
        plum: "#4A2A6E",
        violet: { DEFAULT: "#8254DC", bright: "#9B74E8", deep: "#6A3EC6" }, // deep: small text on light paper
        lavender: "#C8ACEF",
        lilac: "#F0E8FA",
        ivory: "#FAF7F2",
        paper: "#F3EDE3",
        ink: "#15121A",
        dusk: "#5E588E", // the book cover's own indigo
        smoke: "#6B6375",
      },
      fontFamily: {
        display: ["var(--font-display)", "Georgia", "serif"],
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
        press: ["var(--font-press)", "Georgia", "serif"],
      },
      letterSpacing: { eyebrow: "0.28em" },
      maxWidth: { page: "96rem" },
      transitionTimingFunction: { silk: "cubic-bezier(0.22, 1, 0.36, 1)" },
    },
  },
  plugins: [],
};
export default config;
