import { describe, expect, it } from "vitest";
import { gtmSnippet } from "@/lib/gtm";

describe("gtmSnippet", () => {
  it("loads the container passed to it", () => {
    const snippet = gtmSnippet("GTM-ABC1234");

    expect(snippet).toContain("'GTM-ABC1234'");
    expect(snippet).toContain("https://www.googletagmanager.com/gtm.js?id=");
  });

  it("initialises the dataLayer GTM and track() both rely on", () => {
    const snippet = gtmSnippet("GTM-ABC1234");

    expect(snippet).toContain("w[l]=w[l]||[]");
    expect(snippet).toContain("'dataLayer'");
    expect(snippet).toContain("event:'gtm.js'");
  });

  it("loads asynchronously so the tag never blocks first paint", () => {
    expect(gtmSnippet("GTM-ABC1234")).toContain("j.async=true");
  });

  it("actually creates the dataLayer when executed", () => {
    const scope = { dataLayer: undefined } as {
      dataLayer?: Record<string, unknown>[];
    };
    const doc = {
      getElementsByTagName: () => [{ parentNode: { insertBefore: () => {} } }],
      createElement: () => ({}),
    };

    new Function("window", "document", gtmSnippet("GTM-ABC1234"))(scope, doc);

    expect(scope.dataLayer).toHaveLength(1);
    expect(scope.dataLayer?.[0]).toMatchObject({ event: "gtm.js" });
  });
});
