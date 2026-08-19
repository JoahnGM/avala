import { beforeEach, describe, expect, it } from "vitest";
import { track } from "@/lib/analytics";

describe("track", () => {
  beforeEach(() => {
    window.dataLayer = undefined;
  });

  it("creates the dataLayer on first use", () => {
    track("intake_start");

    expect(window.dataLayer).toEqual([{ event: "intake_start" }]);
  });

  it("appends to an existing dataLayer instead of replacing it", () => {
    window.dataLayer = [{ event: "gtm.js" }];

    track("demo_step", { case_id: "correccion", step_index: 2 });

    expect(window.dataLayer).toHaveLength(2);
    expect(window.dataLayer[1]).toEqual({
      event: "demo_step",
      case_id: "correccion",
      step_index: 2,
    });
  });

  it("flattens params alongside the event name, as GTM expects", () => {
    track("cta_click", { cta_location: "hero" });

    expect(window.dataLayer?.[0]).toEqual({
      event: "cta_click",
      cta_location: "hero",
    });
  });
});
