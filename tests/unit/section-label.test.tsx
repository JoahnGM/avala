import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { SectionLabel } from "@/components/ui/section-label";

describe("SectionLabel", () => {
  it("renders a paragraph label by default", () => {
    render(<SectionLabel>Caso #0001</SectionLabel>);

    const label = screen.getByText("Caso #0001");
    expect(label.tagName).toBe("P");
  });

  it("renders as a heading when requested", () => {
    render(<SectionLabel as="h2">El riesgo</SectionLabel>);

    expect(
      screen.getByRole("heading", { level: 2, name: "El riesgo" }),
    ).toBeInTheDocument();
  });

  it("renders the title variant with the larger data size", () => {
    render(
      <SectionLabel as="h2" variant="title">
        Caso #0001
      </SectionLabel>,
    );

    const title = screen.getByRole("heading", { level: 2, name: "Caso #0001" });
    expect(title).toHaveClass("text-data");
    expect(title).not.toHaveClass("text-caption");
  });

  it("renders the optional secondary line", () => {
    render(
      <SectionLabel secondary="Conversación simulada">Caso #0044</SectionLabel>,
    );

    expect(screen.getByText("Conversación simulada")).toBeInTheDocument();
  });
});
