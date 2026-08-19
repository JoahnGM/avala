import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { FlowDiagram } from "@/components/ui/flow-diagram";

describe("FlowDiagram", () => {
  it("exposes the claim of each step to assistive tech", () => {
    render(<FlowDiagram variant="fuentes" />);

    expect(
      screen.getByRole("img", { name: /consulta las dos fuentes/i }),
    ).toBeInTheDocument();
  });

  it("draws the two real sources, not UGPP", () => {
    render(<FlowDiagram variant="fuentes" />);

    expect(screen.getByText("Operador PILA")).toBeInTheDocument();
    expect(screen.getByText("DIAN")).toBeInTheDocument();
    expect(screen.queryByText("UGPP")).not.toBeInTheDocument();
  });

  // An unlabelled arrow says "related somehow"; the label is the information.
  it("labels the direction of the correction, both ways", () => {
    render(<FlowDiagram variant="correccion" />);

    expect(screen.getByText(/pide lo que falta/i)).toBeInTheDocument();
    expect(screen.getByText(/envía el soporte/i)).toBeInTheDocument();
    expect(screen.getByText("WhatsApp")).toBeInTheDocument();
  });

  // The accent marks the node where a human acts — the client approving — and
  // nothing else. `approved` green never appears here: nothing was validated by
  // drawing a box.
  it("puts the accent on the client's action, and only there", () => {
    const { container } = render(<FlowDiagram variant="salida" />);

    const accented = container.querySelectorAll(".stroke-stamp");
    expect(accented).toHaveLength(1);
    expect(screen.getByText(/tú apruebas el pago/i)).toBeInTheDocument();
  });

  // Dashed = leaves AVALA's hands. The handoff is the one place that is true.
  it("draws the handoff as dashed, toward the client's own side", () => {
    const { container } = render(<FlowDiagram variant="handoff" />);

    expect(container.querySelectorAll("[stroke-dasharray]")).toHaveLength(2);
    expect(screen.getByText("Tu contador")).toBeInTheDocument();
    expect(screen.getByText("Tu empresa")).toBeInTheDocument();
  });

  it("keeps one viewBox across variants so the panel never jumps", () => {
    const a = render(<FlowDiagram variant="entrada" />).container.querySelector("svg");
    const b = render(<FlowDiagram variant="handoff" />).container.querySelector("svg");

    expect(a?.getAttribute("viewBox")).toBe("0 0 320 150");
    expect(b?.getAttribute("viewBox")).toBe(a?.getAttribute("viewBox"));
  });
});
