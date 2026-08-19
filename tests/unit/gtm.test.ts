import { describe, expect, it } from "vitest";
import { GTM_ID, MEASURED_HOSTS, gtmSnippet } from "@/lib/gtm";

// Executes the snippet against a stubbed window/document and reports what it
// did: the dataLayer it created and the script src it requested.
function run(hostname: string, snippet: string) {
  const created: { src?: string; async?: boolean } = {};
  const win = { dataLayer: undefined, location: { hostname } } as unknown as {
    dataLayer?: Record<string, unknown>[];
  };
  const doc = {
    getElementsByTagName: () => [{ parentNode: { insertBefore: () => {} } }],
    createElement: () => created,
  };
  new Function("window", "document", snippet)(win, doc);
  return { dataLayer: win.dataLayer, created };
}

describe("GTM_ID", () => {
  it("defaults to AVALA's container without any environment setup", () => {
    expect(GTM_ID).toBe("GTM-K5TWMVBC");
  });
});

describe("gtmSnippet", () => {
  it("loads the container passed to it", () => {
    const snippet = gtmSnippet("GTM-ABC1234");

    expect(snippet).toContain("'GTM-ABC1234'");
    expect(snippet).toContain("https://www.googletagmanager.com/gtm.js?id=");
  });

  it("loads asynchronously so the tag never blocks first paint", () => {
    expect(gtmSnippet("GTM-ABC1234")).toContain("j.async=true");
  });

  it("measures the live site", () => {
    const { dataLayer, created } = run(
      "www.avala.lat",
      gtmSnippet("GTM-ABC1234"),
    );

    expect(dataLayer).toHaveLength(1);
    expect(dataLayer?.[0]).toMatchObject({ event: "gtm.js" });
    expect(created.src).toContain("id=GTM-ABC1234");
  });

  it("measures the apex domain too", () => {
    expect(run("avala.lat", gtmSnippet("GTM-ABC1234")).dataLayer).toHaveLength(
      1,
    );
  });

  // The whole point of the guard: our own preview traffic must not land in the
  // production property, where at MVP volumes it would distort every rate.
  it("stays silent on preview deployments and on localhost", () => {
    for (const host of ["avala-git-feat-x.vercel.app", "localhost"]) {
      const { dataLayer, created } = run(host, gtmSnippet("GTM-ABC1234"));

      expect(dataLayer).toBeUndefined();
      expect(created.src).toBeUndefined();
    }
  });

  it("guards against every host it is given", () => {
    expect(MEASURED_HOSTS).toEqual(["avala.lat", "www.avala.lat"]);
    for (const host of MEASURED_HOSTS) {
      expect(run(host, gtmSnippet("GTM-ABC1234")).dataLayer).toHaveLength(1);
    }
  });
});
