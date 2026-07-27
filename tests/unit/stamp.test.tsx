import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Stamp } from "@/components/ui/stamp";

describe("Stamp", () => {
  it("renders APROBADO in the approved (green) variant", () => {
    render(<Stamp variant="approved" />);

    const stamp = screen.getByText("APROBADO");
    expect(stamp).toHaveClass("text-approved");
    expect(stamp).toHaveClass("border-approved");
  });

  it("renders REVISAR in the stamp-red variant", () => {
    render(<Stamp variant="revisar" />);

    const stamp = screen.getByText("REVISAR");
    expect(stamp).toHaveClass("text-stamp");
    expect(stamp).toHaveClass("border-stamp");
  });

  it("plays the landing animation only when animate is set", () => {
    const { rerender } = render(<Stamp variant="approved" animate />);
    expect(screen.getByText("APROBADO")).toHaveClass(
      "motion-safe:animate-stamp-land",
    );

    rerender(<Stamp variant="approved" />);
    expect(screen.getByText("APROBADO")).not.toHaveClass(
      "motion-safe:animate-stamp-land",
    );
  });
});
