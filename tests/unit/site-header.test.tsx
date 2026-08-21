import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { SiteHeader } from "@/components/site-header";

describe("SiteHeader", () => {
  it("renders the AVALA wordmark", () => {
    render(<SiteHeader />);

    expect(screen.getByText("AVALA")).toBeInTheDocument();
  });

  it("renders the positioning tag", () => {
    render(<SiteHeader />);

    expect(screen.getByText(/proveedores · colombia/i)).toBeInTheDocument();
  });

  it("renders the demo CTA going straight to WhatsApp", () => {
    render(<SiteHeader />);

    const link = screen.getByRole("link", { name: /agenda una demo/i });
    expect(link.getAttribute("href")).toContain("https://wa.me/");
    // It used to scroll to a form at the bottom of the page, which 3 of 20
    // sessions reached and none filled in.
    expect(link.getAttribute("href")).not.toBe("#contacto");
  });

  it("uses a semantic banner header with a labeled nav", () => {
    render(<SiteHeader />);

    expect(screen.getByRole("banner")).toBeInTheDocument();
    expect(
      screen.getByRole("navigation", { name: /acciones principales/i }),
    ).toBeInTheDocument();
  });
});
