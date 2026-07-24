import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { SiteFooter } from "@/components/site-footer";

describe("SiteFooter", () => {
  it("renders the AVALA wordmark", () => {
    render(<SiteFooter />);

    expect(screen.getByText("AVALA")).toBeInTheDocument();
  });

  it("renders the legal disclaimer", () => {
    render(<SiteFooter />);

    expect(
      screen.getByText(/avala no sustituye asesoría tributaria ni contable/i),
    ).toBeInTheDocument();
  });

  it("renders the contact email as a mailto link", () => {
    render(<SiteFooter />);

    const link = screen.getByRole("link", { name: /hola@avala\.co/i });
    expect(link).toHaveAttribute("href", "mailto:hola@avala.co");
  });

  it("renders the copyright line", () => {
    render(<SiteFooter />);

    expect(screen.getByText(/© 2026 AVALA S\.A\.S\./i)).toBeInTheDocument();
  });
});
