import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { ChatBubble } from "@/components/ui/chat-bubble";

function renderInList(bubble: React.ReactElement) {
  return render(<ol>{bubble}</ol>);
}

describe("ChatBubble", () => {
  it("renders the sender label and message as a list item", () => {
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

  it("renders action messages in italics within the same bubble", () => {
    renderInList(
      <ChatBubble sender="proveedor" label="Proveedor" variant="action">
        [envía PDF actualizado]
      </ChatBubble>,
    );

    const bubble = screen.getByText("[envía PDF actualizado]");
    expect(bubble).toHaveClass("italic");
    expect(bubble).toHaveClass("border-hairline");
  });
});
