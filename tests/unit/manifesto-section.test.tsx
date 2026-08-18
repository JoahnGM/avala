import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { ManifestoSection } from "@/components/manifesto-section";

describe("ManifestoSection", () => {
  it("renders the section heading", () => {
    render(<ManifestoSection />);

    expect(
      screen.getByRole("heading", { name: /no es un tablero más/i }),
    ).toBeInTheDocument();
  });

  it("lists what AVALA does not ask of the team", () => {
    render(<ManifestoSection />);

    expect(screen.getByText("Un dashboard nuevo")).toBeInTheDocument();
    expect(screen.getByText("Otro login para tu equipo")).toBeInTheDocument();
    expect(screen.getByText("Migrar tu ERP")).toBeInTheDocument();
  });

  // design/normative-review.md R2-06 — this section replaced the risk block,
  // which led with a disguised-employment verdict that agents/legal-brain.md
  // §0 and V-REC-01 forbid AVALA from making. It must not come back here.
  it("does not sell against a risk AVALA is forbidden to assess", () => {
    render(<ManifestoSection />);

    expect(screen.queryByText(/nómina disfrazada/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/empleado encubierto/i)).not.toBeInTheDocument();
  });

  // The one consequence that survives is the sourced one: the deduction turns
  // on the client's own documented verification (N-009/N-010), not on a
  // sanction percentage that agents/legal-brain.md §7 still marks ⚠ verificar.
  it("states the deduction consequence with its norm, and no unverified figure", () => {
    render(<ManifestoSection />);

    expect(
      screen.getByText(/tu empresa puede demostrar que verificó/i),
    ).toBeInTheDocument();
    expect(
      screen.getByText(/ley 1393\/2010 arts\. 26-27/i),
    ).toBeInTheDocument();
    expect(screen.queryByText("100%")).not.toBeInTheDocument();
  });
});
