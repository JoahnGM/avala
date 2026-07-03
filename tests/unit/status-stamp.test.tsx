import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { StatusStamp } from "@/components/ui/status-stamp";

describe("StatusStamp", () => {
  it("renders the aprobado variant with the approved color", () => {
    render(<StatusStamp state="aprobado" />);

    const stamp = screen.getByText("APROBADO");
    expect(stamp).toHaveClass("border-approved");
    expect(stamp).toHaveClass("text-approved");
    expect(stamp).not.toHaveClass("text-stamp");
  });

  it("renders the revisar variant with the stamp color", () => {
    render(<StatusStamp state="revisar" />);

    const stamp = screen.getByText("REVISAR");
    expect(stamp).toHaveClass("border-stamp");
    expect(stamp).toHaveClass("text-stamp");
    expect(stamp).not.toHaveClass("text-approved");
  });
});
