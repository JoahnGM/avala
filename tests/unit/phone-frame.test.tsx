import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { PhoneFrame } from "@/components/ui/phone-frame";

describe("PhoneFrame", () => {
  it("renders its children as the screen content", () => {
    render(
      <PhoneFrame>
        <p>contenido de pantalla</p>
      </PhoneFrame>,
    );

    expect(screen.getByText("contenido de pantalla")).toBeInTheDocument();
  });

  it("shows the default status-bar time", () => {
    render(
      <PhoneFrame>
        <span>x</span>
      </PhoneFrame>,
    );

    expect(screen.getByText("9:41")).toBeInTheDocument();
  });

  it("shows a custom status-bar time when provided", () => {
    render(
      <PhoneFrame time="10:15">
        <span>x</span>
      </PhoneFrame>,
    );

    expect(screen.getByText("10:15")).toBeInTheDocument();
  });
});
