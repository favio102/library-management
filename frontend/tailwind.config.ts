import type { Config } from "tailwindcss";

/* Hallmark · theme: Almanac · design-system: design.md
 * Tailwind reads from the same tokens as tokens.css. Utilities never carry
 * raw colour or font values — only token references. */
const config: Config = {
  darkMode: "class",
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        display: ["var(--font-display)"],
        sans: ["var(--font-body)"],
        data: ["var(--font-data)"],
      },
      colors: {
        paper: {
          DEFAULT: "var(--color-paper)",
          2: "var(--color-paper-2)",
          3: "var(--color-paper-3)",
        },
        rule: {
          DEFAULT: "var(--color-rule)",
          2: "var(--color-rule-2)",
        },
        ink: {
          DEFAULT: "var(--color-ink)",
          2: "var(--color-ink-2)",
        },
        neutral: "var(--color-neutral)",
        muted: "var(--color-muted)",
        accent: {
          DEFAULT: "var(--color-accent)",
          2: "var(--color-accent-2)",
          ink: "var(--color-accent-ink)",
        },
        danger: "var(--color-danger)",
        success: "var(--color-success)",
        focus: "var(--color-focus)",
      },
      spacing: {
        "3xs": "var(--space-3xs)",
        "2xs": "var(--space-2xs)",
        xs: "var(--space-xs)",
        sm: "var(--space-sm)",
        md: "var(--space-md)",
        lg: "var(--space-lg)",
        xl: "var(--space-xl)",
        "2xl": "var(--space-2xl)",
        "3xl": "var(--space-3xl)",
        "4xl": "var(--space-4xl)",
      },
      borderRadius: {
        card: "var(--radius-card)",
        input: "var(--radius-input)",
        chip: "var(--radius-chip)",
      },
      /* Overrides Tailwind's defaults so `ease-out` / `ease-in` / `ease-in-out`
         utilities resolve to the tokened curves, not the browser ones. */
      transitionTimingFunction: {
        out: "var(--ease-out)",
        in: "var(--ease-in)",
        "in-out": "var(--ease-in-out)",
      },
      transitionDuration: {
        micro: "var(--dur-micro)",
        short: "var(--dur-short)",
        long: "var(--dur-long)",
      },
      zIndex: {
        raised: "var(--z-raised)",
        dropdown: "var(--z-dropdown)",
        sticky: "var(--z-sticky)",
        modal: "var(--z-modal)",
        toast: "var(--z-toast)",
      },
    },
  },
  plugins: [],
};

export default config;
