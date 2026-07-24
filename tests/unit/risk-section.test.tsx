import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { RiskSection } from "@/components/risk-section";

describe("RiskSection", () => {
  it("renders the risk heading", () => {
    render(<RiskSection />);

    expect(
      screen.getByRole("heading", { name: /el riesgo/i }),
    ).toBeInTheDocument();
  });

  it("names the three authorities behind the risk", () => {
    render(<RiskSection />);

    expect(screen.getByText("UGPP")).toBeInTheDocument();
    expect(screen.getByText("DIAN")).toBeInTheDocument();
    expect(screen.getByText("Proveedores")).toBeInTheDocument();
  });

  it("states the three consequences clearly", () => {
    render(<RiskSection />);

    expect(
      screen.getByText(/la ugpp puede cobrarte a ti/i),
    ).toBeInTheDocument();
    expect(
      screen.getByText(/desconocerte ese pago como gasto deducible/i),
    ).toBeInTheDocument();
    expect(
      screen.getByText(/persigue papeles en vez de operar/i),
    ).toBeInTheDocument();
  });
});
