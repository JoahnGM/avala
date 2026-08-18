import type { Config } from "tailwindcss";

// Token source of truth: design/tokens.md. Do not add colors, type styles or
// animation values in components — extend this file first.
const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        paper: "#EEEAE0",
        // The product's own surface: a white document sitting on the paper
        // ground. Added 2026-08-18 with Joahn's approval — the live console and
        // the expediente preview are artifacts, and they read as artifacts only
        // when they are lighter than the page they sit on.
        surface: "#FFFFFF",
        ink: "#211F1B",
        stamp: "#B23A2E",
        approved: "#3F5D3A",
        graphite: "#6B6759",
        // P1-5 — the mono face carries two different jobs at the same small
        // size: decorative labels, and the legal/normative evidence the whole
        // trust argument rests on. `graphite` clears AA at 4.71:1, which is too
        // thin a margin for 11-12px citations, so evidence gets its own token
        // at 6.11:1 on paper / 7.34:1 on surface. Rule IDs, norms and the
        // disclaimer use this; eyebrows and captions stay `graphite`.
        evidence: "#5A5648",
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
        // Enlarged reading size for lead paragraphs — the landing leans on this
        // over 16px to keep body text generous (fewer, bigger words on screen).
        "body-lg": ["18px", { lineHeight: "1.6" }],
        // Hero lead paragraph — one step above body-lg so the subhead holds its
        // own next to the display headline.
        "body-xl": ["20px", { lineHeight: "1.55" }],
        data: ["14px", { lineHeight: "1.5" }],
        caption: ["12px", { lineHeight: "1.5" }],
        // iOS status-bar / timestamp scale — smaller than caption on purpose,
        // used only inside the phone mockup chrome, never for reading copy.
        micro: ["11px", { lineHeight: "1.4" }],
      },
      // Device-frame geometry for the iOS phone mockup (PhoneFrame). These are
      // hardware radii/sizes, not general UI tokens — hence the explicit names.
      borderRadius: {
        phone: "2.75rem",
        "phone-screen": "2.25rem",
        bubble: "1.25rem",
      },
      maxWidth: {
        phone: "20rem",
        bubble: "15rem",
      },
      keyframes: {
        // P3-2 — the scope panel redraws when another item opens. Without a
        // transition the content swaps in place on the same ground and the
        // cause (the click) reads as unrelated to the effect (new content).
        "panel-in": {
          from: { opacity: "0", transform: "translateY(6px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        // Signature element (design/tokens.md): the stamp lands on the
        // document — fast scale-down with a slight overshoot, no fade-in tail.
        "stamp-land": {
          "0%": { opacity: "0", transform: "scale(2.1)" },
          "65%": { opacity: "1", transform: "scale(0.94)" },
          "100%": { opacity: "1", transform: "scale(1)" },
        },
      },
      animation: {
        "panel-in": "panel-in 180ms cubic-bezier(0.2, 0, 0, 1) both",
        "stamp-land": "stamp-land 240ms cubic-bezier(0.16, 1.1, 0.3, 1) both",
      },
    },
  },
  plugins: [],
};

export default config;
