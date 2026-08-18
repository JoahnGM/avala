import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import { ScopeSection } from "@/components/scope-section";

describe("ScopeSection", () => {
  it("states the promise as two clauses, machine and human", () => {
    render(<ScopeSection />);

    expect(
      screen.getByRole("heading", {
        name: /avala hace la revisión\. la firma sigue siendo tuya/i,
      }),
    ).toBeInTheDocument();
  });

  // One open, the rest titles only: the whole point of the pattern. Showing
  // every body at once is what made the old sections read as dense.
  it("opens exactly one item at a time", () => {
    render(<ScopeSection />);

    const expanded = screen
      .getAllByRole("button")
      .filter((b) => b.getAttribute("aria-expanded") === "true");
    expect(expanded).toHaveLength(1);
    expect(expanded[0]).toHaveTextContent(/llega la cuenta de cobro/i);
  });

  it("lists every step as a title even when closed", () => {
    render(<ScopeSection />);

    expect(screen.getByText(/se revisa contra la fuente/i)).toBeInTheDocument();
    expect(screen.getByText(/avala corrige con el proveedor/i)).toBeInTheDocument();
    expect(screen.getByText(/te queda el soporte/i)).toBeInTheDocument();
    expect(screen.getByText(/lo que no hace/i)).toBeInTheDocument();
  });

  it("redraws the panel for the item the visitor opens", async () => {
    const user = userEvent.setup();
    render(<ScopeSection />);

    expect(screen.getByText("Entrada")).toBeInTheDocument();

    await user.click(
      screen.getByRole("button", { name: /se revisa contra la fuente/i }),
    );

    expect(screen.getByText("Fuentes")).toBeInTheDocument();
    expect(screen.getByText(/V-PILA-01/)).toBeInTheDocument();
    expect(screen.queryByText("Entrada")).not.toBeInTheDocument();
  });

  // design/normative-review.md R2-07, R2-08, R2-09 — the three validations the
  // product does not perform. Copy cannot close the gaps, but leaving them
  // unsaid lets a reader take "PILA ✓" for "UGPP-safe", which is the one
  // misreading that costs the client money.
  it("states the boundary: base, ARL and documento soporte", async () => {
    const user = userEvent.setup();
    render(<ScopeSection />);

    await user.click(screen.getByRole("button", { name: /lo que no hace/i }));

    expect(screen.getByText(/no recalcula el ibc/i)).toBeInTheDocument();
    expect(screen.getByText(/ese aporte lo paga tu empresa/i)).toBeInTheDocument();
    expect(
      screen.getByText(/si el proveedor no factura, lo genera tu empresa/i),
    ).toBeInTheDocument();
  });

  it("keeps the anti-dashboard positioning inside the closing item", async () => {
    const user = userEvent.setup();
    render(<ScopeSection />);

    await user.click(screen.getByRole("button", { name: /lo que no hace/i }));

    expect(screen.getByText("Un dashboard nuevo")).toBeInTheDocument();
    expect(screen.getByText("Otro login para tu equipo")).toBeInTheDocument();
  });

  // agents/legal-brain.md §0 and V-REC-01: AVALA never renders a
  // disguised-employment verdict, so the section that defines its scope is the
  // last place that claim may reappear.
  it("claims no disguised-employment assessment", () => {
    render(<ScopeSection />);

    expect(screen.queryByText(/nómina disfrazada/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/empleado encubierto/i)).not.toBeInTheDocument();
  });
});
