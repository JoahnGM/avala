import { render, screen, within } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { ConversationDemo } from "@/components/conversation-demo";

describe("ConversationDemo", () => {
  it("renders the section heading and lead", () => {
    render(<ConversationDemo />);

    expect(
      screen.getByRole("heading", { name: /¿y si el rut ya venció\?/i }),
    ).toBeInTheDocument();
    expect(
      screen.getByText(/avala ya está hablando\s+con el proveedor/i),
    ).toBeInTheDocument();
  });

  it("renders the chat header naming the contact", () => {
    render(<ConversationDemo />);

    expect(screen.getByText("AVALA")).toBeInTheDocument();
    expect(screen.getByText("en línea")).toBeInTheDocument();
  });

  it("renders the three simulated messages in order", () => {
    render(<ConversationDemo />);

    const conversation = screen.getByRole("list", {
      name: /conversación simulada entre avala y el proveedor/i,
    });
    const messages = within(conversation).getAllByRole("listitem");

    expect(messages).toHaveLength(3);
    expect(messages[0]).toHaveTextContent(
      /tu rut venció el 15 de mayo\. envíame el actualizado para liberar el pago de tu cuenta de cobro #0044\./i,
    );
    expect(messages[1]).toHaveTextContent(/rut_actualizado\.pdf/i);
    expect(messages[2]).toHaveTextContent(
      /listo\. tu cuenta de cobro #0044 quedó aprobada\./i,
    );
  });

  it("renders the closing line", () => {
    render(<ConversationDemo />);

    expect(
      screen.getByText(/cero mensajes de tu equipo\. cero whatsapp perdidos\./i),
    ).toBeInTheDocument();
  });
});
