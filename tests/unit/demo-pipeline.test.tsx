import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { DemoPipeline } from "@/components/demo-pipeline";

describe("DemoPipeline", () => {
  it("renders the teaching heading", () => {
    render(<DemoPipeline />);

    expect(
      screen.getByRole("heading", {
        name: /esto es lo que avala hace por cada proveedor/i,
      }),
    ).toBeInTheDocument();
  });

  it("narrates the four steps in order", () => {
    render(<DemoPipeline />);

    expect(screen.getByText(/01 · RECIBE/i)).toBeInTheDocument();
    expect(screen.getByText(/02 · REVISA/i)).toBeInTheDocument();
    expect(screen.getByText(/03 · CORRIGE/i)).toBeInTheDocument();
    expect(screen.getByText(/04 · ENTREGA/i)).toBeInTheDocument();
  });

  it("shows the APPROVED stamp as the climax", () => {
    render(<DemoPipeline />);

    expect(screen.getByText("APROBADO")).toBeInTheDocument();
  });

  it("closes with the no-work-for-your-team line", () => {
    render(<DemoPipeline />);

    expect(
      screen.getByText("Tu equipo no escribe un solo mensaje."),
    ).toBeInTheDocument();
  });
});
