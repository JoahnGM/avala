import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { RiskSection } from "@/components/risk-section";

describe("RiskSection", () => {
  it("renders the risk heading and copy", () => {
    render(<RiskSection />);

    expect(
      screen.getByRole("heading", { name: /el riesgo/i }),
    ).toBeInTheDocument();
    expect(
      screen.getByText(/la dian puede\s+desconocerte ese pago/i),
    ).toBeInTheDocument();
    expect(
      screen.getByText(/te pueden cobrar directamente a ti/i),
    ).toBeInTheDocument();
  });
});
