import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import { CaseFile } from "@/components/case-file";

describe("CaseFile", () => {
  it("renders the three simulated steps with the APROBADO stamp by default", () => {
    render(<CaseFile />);

    expect(screen.getByText(/01 — documento enviado/i)).toBeInTheDocument();
    expect(screen.queryByText(/documento subido/i)).not.toBeInTheDocument();
    expect(screen.getByText(/02 — el agente revisa/i)).toBeInTheDocument();
    expect(screen.getByText(/03 — resultado/i)).toBeInTheDocument();
    expect(screen.getByText("APROBADO")).toBeInTheDocument();
  });

  it("switches the stamp to REVISAR when the temporary trigger is clicked", async () => {
    const user = userEvent.setup();
    render(<CaseFile />);

    await user.click(
      screen.getByRole("button", { name: /cambiar resultado/i }),
    );

    expect(screen.getByText("REVISAR")).toBeInTheDocument();
    expect(screen.queryByText("APROBADO")).not.toBeInTheDocument();
    expect(
      screen.getByText(/pila es de un período distinto/i),
    ).toBeInTheDocument();
  });

  it("switches back to APROBADO on a second click", async () => {
    const user = userEvent.setup();
    render(<CaseFile />);

    const trigger = screen.getByRole("button", { name: /cambiar resultado/i });
    await user.click(trigger);
    await user.click(trigger);

    expect(screen.getByText("APROBADO")).toBeInTheDocument();
    expect(screen.queryByText("REVISAR")).not.toBeInTheDocument();
  });
});
