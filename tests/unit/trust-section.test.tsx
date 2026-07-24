import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { TrustSection } from "@/components/trust-section";

describe("TrustSection", () => {
  it("renders the three trust block titles as level-3 headings", () => {
    render(<TrustSection />);

    expect(
      screen.getByRole("heading", { level: 3, name: "DIAN, UGPP y PILA" }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { level: 3, name: "Cada acción, con firma" }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { level: 3, name: "Tú firmas al final" }),
    ).toBeInTheDocument();
  });

  it("exposes a level-2 section heading for assistive tech", () => {
    render(<TrustSection />);

    expect(
      screen.getByRole("heading", { level: 2, name: "Por qué puedes confiar" }),
    ).toBeInTheDocument();
  });

  it("keeps the human-in-the-loop guarantee in the copy", () => {
    render(<TrustSection />);

    expect(
      screen.getByText(/Nada sale sin tu aprobación/i),
    ).toBeInTheDocument();
  });

  it("renders every line of the auditable record log", () => {
    render(<TrustSection />);

    expect(
      screen.getByText(/contactó al proveedor #0002/i),
    ).toBeInTheDocument();
    expect(
      screen.getByText(/entregó rut_actualizado\.pdf/i),
    ).toBeInTheDocument();
    expect(screen.getByText(/verificó DIAN · act 7410/i)).toBeInTheDocument();
    expect(
      screen.getByText(/aprobó pago · \$2\.100\.000/i),
    ).toBeInTheDocument();
  });
});
