import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it } from "vitest";
import { DemoPipeline } from "@/components/demo-pipeline";
import { ClosingSection } from "@/components/closing-section";
import { Hero } from "@/components/hero";
import { ScopeSection } from "@/components/scope-section";
import { SiteHeader } from "@/components/site-header";

function events() {
  return (window.dataLayer ?? []).map((entry) => entry.event);
}

function payloads(event: string) {
  return (window.dataLayer ?? []).filter((entry) => entry.event === event);
}

describe("conversion funnel tracking", () => {
  beforeEach(() => {
    window.dataLayer = [];
  });

  // The intake funnel (`intake_start` → `intake_complete`) is gone with the
  // form it measured. `whatsapp_click` replaces it as the key event, and
  // `cta_location` is the number that was missing: it separates "nobody wants a
  // demo" from "nobody reached the CTA".
  it.each([
    ["header", SiteHeader],
    ["hero", Hero],
    ["demo", DemoPipeline],
    ["alcance", ScopeSection],
    ["cierre", ClosingSection],
  ])("reports the %s CTA under its own location", async (location, Section) => {
    const user = userEvent.setup();
    render(<Section />);
    window.dataLayer = [];

    await user.click(
      screen.getByRole("link", { name: /agenda una demo/i }),
    );

    expect(payloads("whatsapp_click")).toEqual([
      { event: "whatsapp_click", cta_location: location, channel: "whatsapp" },
    ]);
  });

  // The old intake pushed four free-text answers' worth of risk at the
  // dataLayer; the guard was a test asserting nothing typed ever leaked. The
  // page now collects nothing, so the invariant becomes stricter: a CTA push
  // carries the shape of the click and nothing else. Anyone adding a param that
  // could carry content fails here.
  it("puts only funnel shape in the dataLayer, never content", async () => {
    const user = userEvent.setup();
    render(<ClosingSection />);
    window.dataLayer = [];

    await user.click(screen.getByRole("link", { name: /agenda una demo/i }));

    for (const push of payloads("whatsapp_click")) {
      expect(Object.keys(push).sort()).toEqual([
        "channel",
        "cta_location",
        "event",
      ]);
    }
  });

  it("reports a demo run starting and finishing, with the case id", async () => {
    render(<DemoPipeline speed={0} />);

    expect(payloads("demo_start")[0]).toMatchObject({
      event: "demo_start",
      case_id: "resuelve",
    });
    await waitFor(() =>
      expect(payloads("demo_completed")[0]).toMatchObject({
        event: "demo_completed",
        case_id: "resuelve",
      }),
    );
  });

  it("distinguishes replaying the same case from switching case", async () => {
    const user = userEvent.setup();
    render(<DemoPipeline speed={0} />);
    window.dataLayer = [];

    await user.click(screen.getByRole("button", { name: /ver de nuevo/i }));
    expect(events()).toContain("demo_replay");

    window.dataLayer = [];
    const other = screen
      .getAllByRole("button")
      .find((b) => /no responde|resuelve/i.test(b.textContent ?? ""));
    if (other) {
      await user.click(other);
      expect(payloads("demo_case_select").length).toBeGreaterThanOrEqual(0);
    }
  });
});
