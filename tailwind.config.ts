import type { Config } from "tailwindcss";

// Token source of truth: design/tokens.md. Do not add colors, type styles or
// animation values in components — extend this file first.
const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        paper: "#EEEAE0",
        ink: "#211F1B",
        stamp: "#B23A2E",
        approved: "#3F5D3A",
        graphite: "#6B6759",
        hairline: "#D6D0C2",
      },
      fontFamily: {
        display: ["var(--font-archivo-black)", "sans-serif"],
        body: ["var(--font-plex-sans)", "sans-serif"],
        mono: ["var(--font-plex-mono)", "monospace"],
        stamp: ["var(--font-special-elite)", "monospace"],
      },
      fontSize: {
        "display-lg": ["48px", { lineHeight: "1.05" }],
        "display-md": ["32px", { lineHeight: "1.1" }],
        "display-sm": ["24px", { lineHeight: "1.2" }],
        body: ["16px", { lineHeight: "1.7" }],
        data: ["14px", { lineHeight: "1.5" }],
        caption: ["12px", { lineHeight: "1.5" }],
      },
      keyframes: {
        // Signature element (design/tokens.md): the stamp lands on the
        // document — fast scale-down with a slight overshoot, no fade-in tail.
        "stamp-land": {
          "0%": { opacity: "0", transform: "scale(2.1)" },
          "65%": { opacity: "1", transform: "scale(0.94)" },
          "100%": { opacity: "1", transform: "scale(1)" },
        },
      },
      animation: {
        "stamp-land": "stamp-land 240ms cubic-bezier(0.16, 1.1, 0.3, 1) both",
      },
    },
  },
  plugins: [],
};

export default config;
