import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { ChatBubble } from "@/components/ui/chat-bubble";

function renderInList(bubble: React.ReactElement) {
  return render(<ol>{bubble}</ol>);
}

describe("ChatBubble", () => {
  it("exposes the sender label to screen readers and renders the message", () => {
    renderInList(
      <ChatBubble sender="avala" label="Avala">
        Hola, soy AVALA.
      </ChatBubble>,
    );

    const item = screen.getByRole("listitem");
    expect(item).toHaveTextContent("Avala");
    expect(item).toHaveTextContent("Hola, soy AVALA.");
  });

  it("styles sent (avala) and received (proveedor) bubbles differently", () => {
    renderInList(
      <>
        <ChatBubble sender="avala" label="Avala">
          mensaje enviado
        </ChatBubble>
        <ChatBubble sender="proveedor" label="Proveedor">
          mensaje recibido
        </ChatBubble>
      </>,
    );

    expect(screen.getByText("mensaje enviado")).toHaveClass("bg-ink");
    expect(screen.getByText("mensaje recibido")).toHaveClass("border-hairline");
  });

  it("renders an attachment as a mono document chip", () => {
    renderInList(
      <ChatBubble sender="proveedor" label="Proveedor" variant="attachment">
        rut_actualizado.pdf
      </ChatBubble>,
    );

    const filename = screen.getByText("rut_actualizado.pdf");
    expect(filename).toHaveClass("font-mono");
  });

  it("renders the timestamp and delivery status when provided", () => {
    renderInList(
      <ChatBubble sender="proveedor" label="Proveedor" time="9:40" status="Entregado">
        rut_actualizado.pdf
      </ChatBubble>,
    );

    expect(screen.getByText(/9:40/)).toBeInTheDocument();
    expect(screen.getByText(/entregado/i)).toBeInTheDocument();
  });
});
