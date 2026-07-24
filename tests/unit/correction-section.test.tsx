import { render, screen, within } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { CorrectionSection } from "@/components/correction-section";

describe("CorrectionSection", () => {
  it("renders the section heading", () => {
    render(<CorrectionSection />);

    expect(
      screen.getByRole("heading", {
        name: /avala le escribe al proveedor/i,
      }),
    ).toBeInTheDocument();
  });

  it("renders the four correction steps", () => {
    render(<CorrectionSection />);

    for (const label of ["Detecta", "Redacta", "Recibe", "Reporta"]) {
      expect(screen.getByText(label)).toBeInTheDocument();
    }
  });

  it("renders the five simulated chat messages in order", () => {
    render(<CorrectionSection />);

    const conversation = screen.getByRole("list", {
      name: /conversación simulada entre avala y el proveedor/i,
    });
    const messages = within(conversation).getAllByRole("listitem");

    expect(messages).toHaveLength(5);
    expect(messages[0]).toHaveTextContent(/hola julián/i);
    expect(messages[2]).toHaveTextContent(/rut_actualizado\.pdf/i);
    expect(messages[3]).toHaveTextContent(/confirmada con la dian/i);
  });
});
