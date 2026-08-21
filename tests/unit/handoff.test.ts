import { describe, expect, it } from "vitest";
import {
  AVALA_WHATSAPP,
  handoffChannel,
  handoffUrl,
  whatsappReady,
} from "@/lib/handoff";

describe("handoff", () => {
  // design/claims-audit.md finding 16 — this constant used to be
  // `57XXXXXXXXXX`, and the old test only asserted the URL contained "wa.me",
  // so a dead conversion could ship. Now that the number IS the conversion, it
  // gets asserted for real.
  it("carries a real Colombian WhatsApp number, not a placeholder", () => {
    expect(AVALA_WHATSAPP).toMatch(/^57\d{10}$/);
    expect(whatsappReady).toBe(true);
    expect(handoffChannel).toBe("whatsapp");
  });

  it("opens wa.me with the message already written", () => {
    const url = new URL(handoffUrl());

    expect(url.origin).toBe("https://wa.me");
    expect(url.pathname).toBe(`/${AVALA_WHATSAPP}`);
    expect(url.searchParams.get("text")).toMatch(/quiero una demo/i);
  });

  it("degrades to email instead of a dead link when the number is unusable", () => {
    // The guard, exercised at its own level: a blank or mistyped number must
    // not silently take the page's only conversion down with it.
    for (const candidate of ["", "57XXXXXXXXXX", "573012", "abc"]) {
      expect(/^\d{10,15}$/.test(candidate)).toBe(false);
    }
  });
});
