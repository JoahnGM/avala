import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { RiskSection } from "@/components/risk-section";

describe("RiskSection", () => {
  it("renders the section heading", () => {
    render(<RiskSection />);

    expect(
      screen.getByRole("heading", { name: /cada pago mal validado/i }),
    ).toBeInTheDocument();
  });

  it("renders the three fronts with their stat and title", () => {
    render(<RiskSection />);

    expect(screen.getByText("Nómina disfrazada")).toBeInTheDocument();
    expect(screen.getByText("Deducción en riesgo")).toBeInTheDocument();
    expect(screen.getByText("Pagos frenados")).toBeInTheDocument();

    expect(screen.getByText("100%")).toBeInTheDocument();
    expect(screen.getByText("35%")).toBeInTheDocument();
    expect(screen.getByText("14 d")).toBeInTheDocument();
  });

  it("states the UGPP and DIAN consequences", () => {
    render(<RiskSection />);

    expect(
      screen.getByText(/te reclama los aportes y te sanciona/i),
    ).toBeInTheDocument();
    expect(
      screen.getByText(/la dian puede rechazar el gasto/i),
    ).toBeInTheDocument();
  });

  // design/heuristics.md #2 — a figure carries its provenance next to itself,
  // not in a section-level caption. See design/claims-audit.md findings 7-9.
  it("gives every figure its provenance in place", () => {
    render(<RiskSection />);

    expect(screen.getByText("Ley 1607/2012 · art. 179")).toBeInTheDocument();
    expect(screen.getByText("Est. Tributario · art. 240")).toBeInTheDocument();
    expect(screen.getByText("Cifra ilustrativa")).toBeInTheDocument();
  });

  // design/claims-audit.md finding 6 — the deduction condition is the client's
  // own verification, and DIAN's rejection is never automatic.
  it("frames the deduction risk as the client's verification duty", () => {
    render(<RiskSection />);

    expect(
      screen.getByText(/tu empresa verifique los aportes/i),
    ).toBeInTheDocument();
    expect(
      screen.queryByText(/la dian rechaza el gasto/i),
    ).not.toBeInTheDocument();
  });

  it("does not render the stat numbers in the stamp accent (reserved for actions)", () => {
    render(<RiskSection />);

    const stat = screen.getByText("100%");
    expect(stat).not.toHaveClass("text-stamp");
    expect(stat).toHaveClass("text-ink");
  });
});
