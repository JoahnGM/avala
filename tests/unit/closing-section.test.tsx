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

  it("renders the demo CTA", () => {
    render(<ClosingSection />);

    const cta = screen.getByRole("link", { name: /agenda una demo/i });
    expect(cta).toHaveAttribute("href", "mailto:hola@avala.co");
  });

  it("anchors the section at #contacto", () => {
    const { container } = render(<ClosingSection />);

    expect(container.querySelector("#contacto")).toBeInTheDocument();
  });
});
