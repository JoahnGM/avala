import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Hero } from "@/components/hero";

describe("Hero", () => {
  it("renders the two-beat headline with the UGPP hook", () => {
    render(<Hero />);

    const heading = screen.getByRole("heading", { level: 1 });
    expect(heading).toHaveTextContent(/deja de revisar cuentas de cobro a mano/i);
    expect(heading).toHaveTextContent(/temerle a la ugpp/i);
  });

  it("renders the supporting subheadline in Spanish", () => {
    render(<Hero />);

    // design/normative-review.md R2-10 — DIAN is the authority the RUT is
    // consulted at, not a third document alongside PILA and RUT.
    expect(
      screen.getByText(/revisa la planilla y el rut de tus proveedores/i),
    ).toBeInTheDocument();
    expect(screen.queryByText(/pila, rut y dian/i)).not.toBeInTheDocument();
  });

  it("renders the demo CTA", () => {
    render(<Hero />);

    expect(
      screen.getByRole("link", { name: /agenda una demo/i }),
    ).toBeInTheDocument();
  });

  // The stat row was removed 2026-08-18: two of its three figures carried a
  // "Cifra ilustrativa" marker directly beneath them, and an invented number
  // labelled as invented reads worse than no number at all. It also means no
  // unverified sanction percentage can live in the hero (R2-04).
  it("publishes no unsourced or illustrative figures", () => {
    render(<Hero />);

    expect(screen.queryByText(/cifra ilustrativa/i)).not.toBeInTheDocument();
    expect(screen.queryByText("72%")).not.toBeInTheDocument();
    expect(screen.queryByText("1.400+")).not.toBeInTheDocument();
    expect(screen.queryByText("100%")).not.toBeInTheDocument();
    expect(screen.queryByText("$0")).not.toBeInTheDocument();
  });

  // design/normative-review.md R2-01 — a S.A.S. is a persona jurídica, outside
  // the scope of every rule this page depicts, and cannot invoice by cuenta de
  // cobro at all.
  it("renders a persona natural in the preview, not a S.A.S.", () => {
    render(<Hero />);

    expect(screen.getByText("Julián Pardo Meneses")).toBeInTheDocument();
    expect(screen.queryByText(/S\.A\.S\./)).not.toBeInTheDocument();
    expect(
      screen.getByText(/avala revisó su planilla.*lista para pagar/i),
    ).toBeInTheDocument();
  });

  // The stamp is the signature element and it lands once, as the demo's
  // payoff. Repeating it in the hero spent it before the page earned it.
  it("does not spend the stamp in the hero", () => {
    render(<Hero />);

    expect(screen.queryByText("APROBADO")).not.toBeInTheDocument();
  });

  // design/claims-audit.md finding 2 — "la fuente oficial" implied a single
  // authoritative service AVALA queries. Name the two that actually exist.
  it("names the real sources in the preview, not a singular official one", () => {
    render(<Hero />);

    expect(
      screen.getByText(/con el operador autorizado y su rut en la dian/i),
    ).toBeInTheDocument();
    expect(
      screen.queryByText(/contra la fuente oficial/i),
    ).not.toBeInTheDocument();
  });

  // design/claims-audit.md findings 1 and 4. Contributions are paid mes vencido
  // (agents/legal-brain.md N-004), so a current-month PILA label describes a
  // planilla that cannot exist yet; and DIAN exposes no "sin obligaciones"
  // status. Both are regressions if they come back.
  it("labels the PILA check by the last closed period, not the current month", () => {
    render(<Hero />);

    expect(screen.getByText("PILA · último período")).toBeInTheDocument();
    expect(screen.queryByText(/PILA \w{3}-\d{4}/)).not.toBeInTheDocument();
  });

  it("names the DIAN check as a real RUT status, not a made-up one", () => {
    render(<Hero />);

    expect(
      screen.getByText("Responsabilidades verificadas"),
    ).toBeInTheDocument();
    expect(screen.queryByText(/sin obligaciones/i)).not.toBeInTheDocument();
  });

  // design/claims-audit.md finding 5 — disguised employment turns on
  // subordinación, which no document AVALA validates can evidence. The check
  // must not come back.
  it("does not claim a disguised-employment assessment", () => {
    render(<Hero />);

    expect(screen.queryByText(/indicios de nómina/i)).not.toBeInTheDocument();
  });

  // design/claims-audit.md finding 17 — the preview is a fabricated supplier
  // carrying an APROBADO stamp, so it has to be marked as an example.
  it("marks the expediente preview as an example", () => {
    render(<Hero />);

    expect(screen.getByText(/proveedor · ejemplo/i)).toBeInTheDocument();
  });
});
