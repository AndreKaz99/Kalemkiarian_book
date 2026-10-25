import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ivory: "#FAF6EE",
        cream: "#F2EADB",
        sand: "#E4D7C1",
        beige: "#CDBA9C",
        ink: "#1F1B18",
        charcoal: "#2B2622",
        smoke: "#5E554D",
        burgundy: { DEFAULT: "#7A2E35", deep: "#5C1F26", soft: "#A5525A" },
        terracotta: { DEFAULT: "#B4583A", soft: "#D08A6C" },
      },
      fontFamily: {
        display: ["var(--font-display)", "Georgia", "serif"],
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
        press: ["var(--font-press)", "Georgia", "serif"],
      },
      letterSpacing: { eyebrow: "0.32em" },
      maxWidth: { page: "88rem" },
      transitionTimingFunction: { silk: "cubic-bezier(0.22, 1, 0.36, 1)" },
    },
  },
  plugins: [],
};
export default config;
