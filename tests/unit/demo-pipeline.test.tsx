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

  it("shows the APPROVED stamp as the animated climax", () => {
    render(<DemoPipeline />);

    const stamps = screen.getAllByText("APROBADO");
    expect(
      stamps.some((el) => el.className.includes("animate-stamp-land")),
    ).toBe(true);
  });

  it("shows both validation outcomes (APROBADO and REVISAR)", () => {
    render(<DemoPipeline />);

    expect(screen.getByText("REVISAR")).toBeInTheDocument();
    expect(screen.getByText(/dos resultados posibles/i)).toBeInTheDocument();
  });

  it("closes with the no-work-for-your-team line", () => {
    render(<DemoPipeline />);

    expect(
      screen.getByText("Tu equipo no escribe un solo mensaje."),
    ).toBeInTheDocument();
  });

  it("renders the CORRIGE bubble through the shared ChatBubble", () => {
    render(<DemoPipeline />);

    // ChatBubble emits an sr-only "<label>:" node — evidence the shared
    // component is used instead of an inline bubble (heuristics.md #1).
    expect(screen.getByText("Avala:")).toBeInTheDocument();
    expect(
      screen.getByText(/tu rut venció el 15 de mayo/i),
    ).toBeInTheDocument();
  });
});
