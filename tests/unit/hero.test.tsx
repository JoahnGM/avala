import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Hero } from "@/components/hero";

describe("Hero", () => {
  it("renders the two-beat headline with the UGPP hook", () => {
    render(<Hero />);

    const heading = screen.getByRole("heading", { level: 1 });
    expect(heading).toHaveTextContent(/valida y gestiona a tus proveedores/i);
    expect(heading).toHaveTextContent(/sin riesgo ante la ugpp/i);
  });

  it("renders the supporting subheadline in Spanish", () => {
    render(<Hero />);

    expect(
      screen.getByText(/revisa pila, rut y dian de cada proveedor/i),
    ).toBeInTheDocument();
  });

  it("renders the demo CTA", () => {
    render(<Hero />);

    expect(
      screen.getByRole("link", { name: /agenda una demo/i }),
    ).toBeInTheDocument();
  });

  it("renders the illustrative stats", () => {
    render(<Hero />);

    expect(screen.getByText("72%")).toBeInTheDocument();
    expect(screen.getByText("1.400+")).toBeInTheDocument();
    expect(screen.getByText("$0")).toBeInTheDocument();
    expect(screen.getByText(/cifras ilustrativas/i)).toBeInTheDocument();
  });

  it("renders the CASO #0001 case file block", () => {
    render(<Hero />);

    expect(
      screen.getByRole("heading", { name: /caso #0001/i }),
    ).toBeInTheDocument();
  });
});
