import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Hero } from "@/components/hero";

describe("Hero", () => {
  it("renders the headline and subheadline in Spanish", () => {
    render(<Hero />);

    expect(
      screen.getByRole("heading", {
        level: 1,
        name: /deja de revisar pila y rut a mano/i,
      }),
    ).toBeInTheDocument();
    expect(
      screen.getByText(/cada cuenta de cobro lista\s+para pagar/i),
    ).toBeInTheDocument();
  });

  it("renders the demo CTA", () => {
    render(<Hero />);

    expect(
      screen.getByRole("link", { name: /agenda una demo/i }),
    ).toBeInTheDocument();
  });

  it("renders the CASO #0001 case file block", () => {
    render(<Hero />);

    expect(
      screen.getByRole("heading", { name: /caso #0001/i }),
    ).toBeInTheDocument();
  });
});
