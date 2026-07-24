import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { RiskSection } from "@/components/risk-section";

describe("RiskSection", () => {
  it("renders the section heading", () => {
    render(<RiskSection />);

    expect(
      screen.getByRole("heading", { name: /cada pago mal validado/i }),
    ).toBeInTheDocument();
  });

  it("renders the three fronts with their stat and title", () => {
    render(<RiskSection />);

    expect(screen.getByText("Nómina disfrazada")).toBeInTheDocument();
    expect(screen.getByText("Deducción perdida")).toBeInTheDocument();
    expect(screen.getByText("Pagos frenados")).toBeInTheDocument();

    expect(screen.getByText("60%")).toBeInTheDocument();
    expect(screen.getByText("0%")).toBeInTheDocument();
    expect(screen.getByText("14 d")).toBeInTheDocument();
  });

  it("states the UGPP and DIAN consequences", () => {
    render(<RiskSection />);

    expect(
      screen.getByText(/te reclama los aportes y te aplica sanción/i),
    ).toBeInTheDocument();
    expect(screen.getByText(/la dian rechaza el gasto/i)).toBeInTheDocument();
  });

  it("marks the figures as illustrative", () => {
    render(<RiskSection />);

    expect(screen.getByText(/cifras ilustrativas/i)).toBeInTheDocument();
  });
});
