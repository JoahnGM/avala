import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { SiteFooter } from "@/components/site-footer";

describe("SiteFooter", () => {
  it("renders the legal disclaimer", () => {
    render(<SiteFooter />);

    expect(
      screen.getByText(/avala no sustituye asesoría contable o legal\./i),
    ).toBeInTheDocument();
  });

  it("renders the contact email as a mailto link", () => {
    render(<SiteFooter />);

    const link = screen.getByRole("link", { name: /contacto@avala\.co/i });
    expect(link).toHaveAttribute("href", "mailto:contacto@avala.co");
  });
});
