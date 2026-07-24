import { act, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { DemoPipeline } from "@/components/demo-pipeline";

describe("DemoPipeline (interactive validation)", () => {
  beforeEach(() => vi.useFakeTimers());
  afterEach(() => vi.useRealTimers());

  it("renders the teaching heading and starts idle with a validate action", () => {
    render(<DemoPipeline />);

    expect(
      screen.getByRole("heading", { name: /míralo validar una cuenta de cobro/i }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /validar documentos/i }),
    ).toBeInTheDocument();
  });

  it("goes idle → validating → APROBADO for the clean case", () => {
    render(<DemoPipeline />);

    fireEvent.click(
      screen.getByRole("button", { name: /validar documentos/i }),
    );
    expect(screen.getByText(/validando contra dian/i)).toBeInTheDocument();

    act(() => {
      vi.advanceTimersByTime(1400);
    });

    expect(screen.getByText("APROBADO")).toBeInTheDocument();
  });

  it("shows REVISAR and links to the correction for the RUT-vencido case", () => {
    render(<DemoPipeline />);

    fireEvent.click(screen.getByRole("button", { name: /rut vencido/i }));
    fireEvent.click(
      screen.getByRole("button", { name: /validar documentos/i }),
    );
    act(() => {
      vi.advanceTimersByTime(1400);
    });

    expect(screen.getByText("REVISAR")).toBeInTheDocument();
    expect(
      screen.getByText(/rut desactualizado/i),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: /le escribió al proveedor/i }),
    ).toHaveAttribute("href", "#correccion");
  });
});
