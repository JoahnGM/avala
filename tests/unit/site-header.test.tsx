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

  it("renders the demo CTA linking to the contact anchor", () => {
    render(<SiteHeader />);

    const link = screen.getByRole("link", { name: /agenda una demo/i });
    expect(link).toHaveAttribute("href", "#contacto");
  });

  it("uses a semantic banner header with a labeled nav", () => {
    render(<SiteHeader />);

    expect(screen.getByRole("banner")).toBeInTheDocument();
    expect(
      screen.getByRole("navigation", { name: /acciones principales/i }),
    ).toBeInTheDocument();
  });
});
