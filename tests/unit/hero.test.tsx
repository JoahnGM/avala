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

    expect(
      screen.getByText(/revisa pila, rut y dian de tus proveedores/i),
    ).toBeInTheDocument();
  });

  it("renders the demo CTA", () => {
    render(<Hero />);

    expect(
      screen.getByRole("link", { name: /agenda una demo/i }),
    ).toBeInTheDocument();
  });

  it("renders the stats, each with its provenance in place", () => {
    render(<Hero />);

    expect(screen.getByText("72%")).toBeInTheDocument();
    expect(screen.getByText("1.400+")).toBeInTheDocument();
    expect(screen.getByText("Se elimina")).toBeInTheDocument();

    // design/heuristics.md #2 — provenance sits next to the figure it
    // qualifies, so there are two illustrative markers, not one caption.
    expect(screen.getAllByText("Cifra ilustrativa")).toHaveLength(2);
    expect(
      screen.getByText("Ley 1607/2012 art. 179 · mod. Ley 1819/2016 art. 314"),
    ).toBeInTheDocument();
  });

  // design/normative-review.md R2-04 — every sanction percentage in
  // agents/legal-brain.md §7 is ⚠ verificar, and §2/§6 treat such a value as
  // unavailable. The structural claim needs no figure, and the citation has to
  // carry the article's rewrite (N-013) or it points at superseded text.
  it("does not publish an unverified sanction percentage", () => {
    render(<Hero />);

    expect(screen.queryByText("100%")).not.toBeInTheDocument();
    expect(
      screen.queryByText("Ley 1607/2012 · art. 179"),
    ).not.toBeInTheDocument();
  });

  // design/claims-audit.md finding 10 — "$0 sanciones UGPP" was an
  // unfalsifiable outcome claim on a multi-year fiscalization window. Replaced
  // with the sourced mechanism AVALA actually accelerates.
  it("does not claim a zero-sanction track record", () => {
    render(<Hero />);

    expect(screen.queryByText("$0")).not.toBeInTheDocument();
    expect(screen.queryByText(/sanciones ugpp/i)).not.toBeInTheDocument();
    expect(
      screen.getByText(/si corriges antes del requerimiento/i),
    ).toBeInTheDocument();
  });

  it("renders a named supplier story in the preview", () => {
    render(<Hero />);

    expect(screen.getByText("Talleres Bacatá S.A.S.")).toBeInTheDocument();
    expect(
      screen.getByText(/avala revisó su planilla.*lista para pagar/i),
    ).toBeInTheDocument();
    expect(screen.getByText("APROBADO")).toBeInTheDocument();
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
