import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { ContactIntake } from "@/components/contact-intake";

describe("ContactIntake", () => {
  it("opens with AVALA's first question", () => {
    render(<ContactIntake />);

    expect(
      screen.getByText(/¿qué quieres resolver con tus proveedores\?/i),
    ).toBeInTheDocument();
  });

  it("advances to the next question after an answer", async () => {
    const user = userEvent.setup();
    render(<ContactIntake />);

    await user.type(
      screen.getByRole("textbox"),
      "validar cuentas a mano es lento",
    );
    await user.click(screen.getByRole("button", { name: /siguiente/i }));

    expect(
      screen.getByText(/¿cuántas cuentas de cobro procesas al mes/i),
    ).toBeInTheDocument();
    // the answer is echoed back as the visitor's message
    expect(
      screen.getByText("validar cuentas a mano es lento"),
    ).toBeInTheDocument();
  });

  // design/normative-review.md R2-15 — the hand-off must reach AVALA with the
  // answers attached. It used to open wa.me/57XXXXXXXXXX, losing the lead after
  // four answered questions, so the placeholder is asserted against directly.
  it("hands the lead to WhatsApp after the last question, never to a dead link", async () => {
    const openSpy = vi.spyOn(window, "open").mockImplementation(() => null);
    const user = userEvent.setup();
    render(<ContactIntake />);

    const answers = ["proceso lento", "unas 200", "finanzas", "300 123 4567"];
    for (const answer of answers) {
      await user.type(screen.getByRole("textbox"), answer);
      await user.click(
        screen.getByRole("button", { name: /siguiente|enviar/i }),
      );
    }

    expect(openSpy).toHaveBeenCalledOnce();
    const url = String(openSpy.mock.calls[0][0]);
    expect(url).not.toContain("XXXXXXXXXX");
    expect(url).toContain("wa.me/573012441488");
    expect(url).toContain(encodeURIComponent("300 123 4567"));
    expect(screen.getByText(/te escribo por whatsapp/i)).toBeInTheDocument();

    openSpy.mockRestore();
  });

  // design/claims-audit.md finding 16 — Ley 1581 de 2012 requires
  // authorization and a stated purpose before personal data is processed.
  it("states the data-processing authorization and purpose", () => {
    render(<ContactIntake />);

    expect(
      screen.getByText(/al enviar autorizas a avala a contactarte/i),
    ).toBeInTheDocument();
    expect(screen.getByText(/ley 1581 de 2012/i)).toBeInTheDocument();
  });
});
