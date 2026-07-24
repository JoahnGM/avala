import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Hero } from "@/components/hero";

describe("Hero", () => {
  it("renders the two-beat headline with the UGPP hook", () => {
    render(<Hero />);

    const heading = screen.getByRole("heading", { level: 1 });
    expect(heading).toHaveTextContent(/deja de revisar proveedores a mano/i);
    expect(heading).toHaveTextContent(/temerle a la ugpp/i);
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

  it("renders a named supplier story in the preview", () => {
    render(<Hero />);

    expect(screen.getByText("Talleres Bacatá S.A.S.")).toBeInTheDocument();
    expect(
      screen.getByText(/avala revisó sus documentos.*lista para pagar/i),
    ).toBeInTheDocument();
    expect(screen.getByText("APROBADO")).toBeInTheDocument();
  });
});
