import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { ClosingSection } from "@/components/closing-section";

describe("ClosingSection", () => {
  it("renders the closing heading", () => {
    render(<ClosingSection />);

    expect(
      screen.getByRole("heading", { name: /devuélvele a tu equipo/i }),
    ).toBeInTheDocument();
  });

  it("anchors the section at #contacto", () => {
    const { container } = render(<ClosingSection />);

    expect(container.querySelector("#contacto")).toBeInTheDocument();
  });

  it("hosts the conversational contact intake as the conversion", () => {
    render(<ClosingSection />);

    expect(
      screen.getByText(/¿qué quieres resolver con tus proveedores\?/i),
    ).toBeInTheDocument();
  });
});
