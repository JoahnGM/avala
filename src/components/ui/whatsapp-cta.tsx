"use client";

import { handoffChannel, handoffUrl } from "@/lib/handoff";
import { track } from "@/lib/analytics";

// The page's only conversion, as one shared component (design/heuristics.md
// rule 1). It appears in five places — header, §01, §02, §03, §05 — and every
// instance has to look, behave and measure identically; the previous layout had
// exactly two CTAs, both scrolling to a form at the bottom, so the moment of
// maximum persuasion (the console just finished proving the mechanism) had
// nothing to press.
//
// `cta_location` is what makes the five instances distinguishable in GA4, which
// is the number that was missing when we tried to tell "nobody wants a demo"
// from "nobody reached the CTA". `whatsapp_click` needs no GTM change: the app
// tag already forwards `^(intake_|demo_|whatsapp_)` (design/analytics.md).

type WhatsAppCtaProps = {
  /** Which instance was pressed. Reported as `cta_location`. */
  location: "header" | "hero" | "demo" | "alcance" | "cierre";
  /** Visible label. User-facing copy, so Spanish (CLAUDE.md). */
  label?: string;
  /** `solid` for the page's primary asks, `outline` for the sticky bar. */
  variant?: "solid" | "outline";
  /**
   * Whether to state what pressing it does. On by default: a link that leaves
   * for another app has to say so before it is pressed, not after. The header
   * bar has no room for a second line and passes `false`.
   */
  note?: boolean;
};

const VARIANT: Record<"solid" | "outline", string> = {
  solid:
    "bg-stamp px-6 py-3 text-data text-paper hover:bg-ink focus-visible:outline-ink",
  outline:
    "border border-stamp px-4 py-2 text-caption text-stamp hover:bg-stamp hover:text-paper focus-visible:outline-ink",
};

export function WhatsAppCta({
  location,
  label = "Agenda una demo",
  variant = "solid",
  note = true,
}: WhatsAppCtaProps) {
  const noteText =
    handoffChannel === "whatsapp"
      ? "Se abre WhatsApp con el mensaje escrito. Sin formularios."
      : "Se abre tu correo con el mensaje escrito. Sin formularios.";

  return (
    <div className="flex flex-col items-start gap-2">
      <a
        href={handoffUrl()}
        target="_blank"
        rel="noopener noreferrer"
        onClick={() =>
          track("whatsapp_click", {
            cta_location: location,
            channel: handoffChannel,
          })
        }
        className={`inline-block font-mono uppercase tracking-widest focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 ${VARIANT[variant]}`}
      >
        {label}
      </a>
      {note ? (
        <span className="font-mono text-caption text-graphite">{noteText}</span>
      ) : null}
    </div>
  );
}
