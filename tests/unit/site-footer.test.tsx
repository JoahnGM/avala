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

  // design/normative-review.md R2-03 — the same claims-audit finding 2 that was
  // fixed in trust-section.tsx survived here: UGPP fiscalizes and exposes no
  // service to query a third party, and a planilla is not a public source.
  // Guarded in both places now, so the correction can't come back on one side.
  it("names the real sources and does not present UGPP as one", () => {
    render(<SiteFooter />);

    expect(
      screen.getByText(/planilla del operador pila autorizado/i),
    ).toBeInTheDocument();
    expect(
      screen.getByText(/consulta del rut en la dian/i),
    ).toBeInTheDocument();
    expect(screen.queryByText(/fuentes públicas/i)).not.toBeInTheDocument();
  });

  it("renders the copyright line", () => {
    render(<SiteFooter />);

    expect(screen.getByText(/© 2026 AVALA S\.A\.S\./i)).toBeInTheDocument();
  });
});
