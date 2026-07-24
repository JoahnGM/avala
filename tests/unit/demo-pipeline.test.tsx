import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { DemoPipeline } from "@/components/demo-pipeline";

function next() {
  fireEvent.click(screen.getByRole("button", { name: /siguiente paso/i }));
}

describe("DemoPipeline (full-arc walkthrough)", () => {
  it("renders the teaching heading and starts when the invoice arrives", () => {
    render(<DemoPipeline />);

    expect(
      screen.getByRole("heading", {
        name: /de la cuenta de cobro al pago/i,
      }),
    ).toBeInTheDocument();
    expect(screen.getByText("cuenta_0002.pdf")).toBeInTheDocument();
  });

  it("walks receive → review → correction → ready for the RUT case", () => {
    render(<DemoPipeline />); // defaults to the "Falta el RUT" case

    // 01 llega → 02 revisa
    next();
    expect(
      screen.getByText(/avala revisa los documentos: pila, rut y dian/i),
    ).toBeInTheDocument();
    expect(screen.getByText(/rut desactualizado/i)).toBeInTheDocument();

    // 03 corrige — the chat with the supplier plays inside the demo
    next();
    const chat = screen.getByRole("list", {
      name: /conversación entre avala y el proveedor/i,
    });
    expect(chat).toBeInTheDocument();
    expect(screen.getByText("rut_actualizado.pdf")).toBeInTheDocument();

    // 04 lista → APROBADO + we-notify-you-for-payment
    next();
    expect(screen.getByText("APROBADO")).toBeInTheDocument();
    expect(
      screen.getByText(/quedó lista para pagar\. tú solo pagas/i),
    ).toBeInTheDocument();
  });

  it("skips the correction step for a clean invoice", () => {
    render(<DemoPipeline />);

    fireEvent.click(screen.getByRole("button", { name: /cuenta al día/i }));
    next(); // revisa
    next(); // lista (no corrige step)

    expect(screen.getByText("APROBADO")).toBeInTheDocument();
    expect(
      screen.queryByRole("list", {
        name: /conversación entre avala y el proveedor/i,
      }),
    ).not.toBeInTheDocument();
  });
});
