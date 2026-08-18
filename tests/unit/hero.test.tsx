import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Hero } from "@/components/hero";

describe("Hero", () => {
  it("renders the two-beat headline", () => {
    render(<Hero />);

    const heading = screen.getByRole("heading", { level: 1 });
    expect(heading).toHaveTextContent(/deja de revisar cuentas de cobro a mano/i);
    expect(heading).toHaveTextContent(/sin soporte/i);
  });

  // P1-1 — the old second beat promised "deja de temerle a la UGPP", which §03
  // contradicts: AVALA does not recalculate the IBC, and the base is what UGPP
  // fiscalizes. The promise is now the one the product keeps, and the red
  // accent moved off "UGPP" with it.
  it("does not promise protection from fiscalization", () => {
    render(<Hero />);

    const heading = screen.getByRole("heading", { level: 1 });
    expect(heading).not.toHaveTextContent(/ugpp/i);
    expect(heading.querySelector(".text-stamp")).not.toHaveTextContent(/ugpp/i);
  });

  it("frames the promise as the support the payment needs", () => {
    render(<Hero />);

    expect(
      screen.getByText(/de lo que depende que puedas deducir el pago/i),
    ).toBeInTheDocument();
    // R2-10 — DIAN is the authority the RUT is consulted at, not a document.
    expect(screen.queryByText(/pila, rut y dian/i)).not.toBeInTheDocument();
  });

  // P2-3 — without naming the incumbent, AVALA has no budget line to sit in.
  it("names the alternative the buyer already pays for", () => {
    render(<Hero />);

    expect(
      screen.getByText(/auxiliar contable revisando pdfs/i),
    ).toBeInTheDocument();
  });

  it("renders the demo CTA", () => {
    render(<Hero />);

    expect(
      screen.getByRole("link", { name: /agenda una demo/i }),
    ).toBeInTheDocument();
  });

  // The stat row was removed 2026-08-18: two of its three figures carried a
  // "Cifra ilustrativa" marker directly beneath them, and an invented number
  // labelled as invented reads worse than no number at all.
  it("publishes no unsourced or illustrative figures", () => {
    render(<Hero />);

    expect(screen.queryByText(/cifra ilustrativa/i)).not.toBeInTheDocument();
    expect(screen.queryByText("72%")).not.toBeInTheDocument();
    expect(screen.queryByText("1.400+")).not.toBeInTheDocument();
    expect(screen.queryByText("100%")).not.toBeInTheDocument();
  });

  // P3-5 — the expediente card was a white box with no elevation and no stamp,
  // competing with the H1 while demonstrating less than the console below.
  it("gives the headline the full width, with no competing card", () => {
    render(<Hero />);

    expect(screen.queryByText(/proveedor · ejemplo/i)).not.toBeInTheDocument();
    expect(screen.queryByText("APROBADO")).not.toBeInTheDocument();
    expect(screen.queryByText(/S\.A\.S\./)).not.toBeInTheDocument();
  });

  // design/claims-audit.md finding 5 — disguised employment turns on
  // subordinación, which no document AVALA validates can evidence.
  it("does not claim a disguised-employment assessment", () => {
    render(<Hero />);

    expect(screen.queryByText(/indicios de nómina/i)).not.toBeInTheDocument();
  });
});
