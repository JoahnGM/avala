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

    // design/claims-audit.md finding 3 — receiving the supplier's attachment is
    // not a DIAN confirmation. The agent says what it actually did.
    expect(
      screen.getByText(/consulté el estado de tu rut en el portal de la dian/i),
    ).toBeInTheDocument();
    expect(
      screen.queryByText(/confirmado con la dian/i),
    ).not.toBeInTheDocument();

    // 04 lista → APROBADO + we-notify-you-for-payment
    next();
    expect(screen.getByText("APROBADO")).toBeInTheDocument();
    // design/claims-audit.md finding 14 — the approval stays with the client.
    expect(
      screen.getByText(/quedó lista\. la aprobación la das tú/i),
    ).toBeInTheDocument();
    expect(screen.queryByText(/tú solo pagas/i)).not.toBeInTheDocument();
  });

  // design/claims-audit.md finding 17 — fabricated suppliers and an APROBADO
  // stamp have to be labelled as a simulation.
  it("labels itself as a simulated demo", () => {
    render(<DemoPipeline />);

    expect(screen.getByText(/demo simulada/i)).toBeInTheDocument();
  });

  // design/claims-audit.md finding 5 — no disguised-employment check.
  it("does not claim a disguised-employment assessment", () => {
    render(<DemoPipeline />);

    next(); // revisa — the check list renders here

    expect(screen.queryByText(/indicios de nómina/i)).not.toBeInTheDocument();
  });

  // UX review 2026-07-28, P5 — every fork needs a defined end state and an
  // explicit next action. This is the only branch that does not end APROBADO.
  it("ends the no-response case in REVISAR with an explicit next action", () => {
    render(<DemoPipeline />);

    fireEvent.click(
      screen.getByRole("button", { name: /el proveedor no responde/i }),
    );
    next(); // revisa
    expect(
      screen.getByText(/pila · último período sin pagar/i),
    ).toBeInTheDocument();

    next(); // corrige — AVALA writes, supplier stays silent
    expect(
      screen.getByText(/sin respuesta del proveedor/i),
    ).toBeInTheDocument();

    next(); // detenida
    expect(screen.getByText("REVISAR")).toBeInTheDocument();
    expect(screen.queryByText("APROBADO")).not.toBeInTheDocument();
    expect(
      screen.getByText(
        /la decisión de insistir, devolverla o pagarla es tuya/i,
      ),
    ).toBeInTheDocument();
  });

  // UX review 2026-07-28, P5 — no one-way flows.
  it("offers a way back once past the first step", () => {
    render(<DemoPipeline />);

    expect(
      screen.queryByRole("button", { name: /paso anterior/i }),
    ).not.toBeInTheDocument();

    next();
    const back = screen.getByRole("button", { name: /paso anterior/i });
    fireEvent.click(back);

    expect(screen.getByText("cuenta_0002.pdf")).toBeInTheDocument();
    expect(
      screen.queryByRole("button", { name: /paso anterior/i }),
    ).not.toBeInTheDocument();
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
