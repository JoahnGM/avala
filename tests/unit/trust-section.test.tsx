import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { TrustSection } from "@/components/trust-section";

describe("TrustSection", () => {
  it("renders the three trust block titles as level-3 headings", () => {
    render(<TrustSection />);

    expect(
      screen.getByRole("heading", { level: 3, name: "DIAN y operadores PILA" }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { level: 3, name: "Cada acción, con firma" }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { level: 3, name: "Tú firmas al final" }),
    ).toBeInTheDocument();
  });

  it("exposes a level-2 section heading for assistive tech", () => {
    render(<TrustSection />);

    expect(
      screen.getByRole("heading", { level: 2, name: "Por qué puedes confiar" }),
    ).toBeInTheDocument();
  });

  it("keeps the human-in-the-loop guarantee in the copy", () => {
    render(<TrustSection />);

    expect(
      screen.getByText(/Nada sale sin tu aprobación/i),
    ).toBeInTheDocument();
  });

  it("renders every line of the auditable record log", () => {
    render(<TrustSection />);

    expect(
      screen.getByText(/contactó al proveedor #0002/i),
    ).toBeInTheDocument();
    expect(
      screen.getByText(/entregó planilla_2026-07\.pdf/i),
    ).toBeInTheDocument();
    expect(
      screen.getByText(/verificó RUT en DIAN · activo/i),
    ).toBeInTheDocument();
    expect(
      screen.getByText(/aprobó pago · \$2\.100\.000/i),
    ).toBeInTheDocument();
  });

  // design/claims-audit.md finding 3 — the log must record a check AVALA
  // actually performed, not an unexplained code.
  it("does not log an unexplained activity code", () => {
    render(<TrustSection />);

    expect(screen.queryByText(/act 7410/i)).not.toBeInTheDocument();
  });

  // design/normative-review.md R2-12 — under N-009/N-010 the deduction is
  // conditioned on the client's own documented verification, so the audit log
  // is not generic diligence: it is the evidence. Saying so is the difference
  // between a trust badge and a reason to buy.
  it("names what the audit record is for", () => {
    render(<TrustSection />);

    expect(
      screen.getByText(/condiciona la deducción del pago/i),
    ).toBeInTheDocument();
  });

  // design/claims-audit.md finding 2 — UGPP fiscalizes; it is not a service you
  // can query about a third party. Name the sources that actually exist.
  it("names the real sources and does not present UGPP as one", () => {
    render(<TrustSection />);

    expect(
      screen.getByText(
        /la planilla del operador autorizado y el rut en la dian/i,
      ),
    ).toBeInTheDocument();
    expect(
      screen.queryByText(/cada validación se apoya/i),
    ).not.toBeInTheDocument();
  });
});
