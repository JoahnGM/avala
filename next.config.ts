import type { NextConfig } from "next";

// Static export: the landing has no server features (all client/static), so we
// emit a plain static site to `out/` that can be hosted anywhere — Netlify
// Drop, Cloudflare Pages, GitHub Pages, etc. Served from a domain root, so no
// basePath needed. Remove `output: "export"` if a server runtime is added later.
const nextConfig: NextConfig = {
  output: "export",
};

export default nextConfig;
