import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { ContactIntake } from "@/components/contact-intake";
import { DemoPipeline } from "@/components/demo-pipeline";

function events() {
  return (window.dataLayer ?? []).map((entry) => entry.event);
}

function payloads(event: string) {
  return (window.dataLayer ?? []).filter((entry) => entry.event === event);
}

describe("conversion funnel tracking", () => {
  beforeEach(() => {
    window.dataLayer = [];
  });

  it("reports each intake step, then the completion and the WhatsApp hand-off", async () => {
    const user = userEvent.setup();
    vi.spyOn(window, "open").mockImplementation(() => null);
    render(<ContactIntake />);

    const answers = ["revisar a mano es lento", "200", "finanzas", "3001234567"];
    for (const answer of answers) {
      await user.type(screen.getByLabelText(/tu respuesta/i), answer);
      await user.click(screen.getByRole("button", { name: /enviar/i }));
    }

    expect(events()).toEqual([
      "intake_start",
      "intake_step",
      "intake_step",
      "intake_step",
      "intake_step",
      "intake_complete",
      "whatsapp_handoff",
    ]);
    expect(payloads("intake_step").map((e) => e.question_key)).toEqual([
      "reto",
      "volumen",
      "quien",
      "wa",
    ]);
  });

  it("never puts what the visitor typed into the dataLayer", async () => {
    const user = userEvent.setup();
    vi.spyOn(window, "open").mockImplementation(() => null);
    render(<ContactIntake />);

    // A phone number and free text reaching GA4 would breach Google's no-PII
    // policy and the Ley 1581 authorization stated in the intake itself.
    const secrets = ["nos demoramos muchísimo", "200", "finanzas", "3001234567"];
    for (const answer of secrets) {
      await user.type(screen.getByLabelText(/tu respuesta/i), answer);
      await user.click(screen.getByRole("button", { name: /enviar/i }));
    }

    const serialised = JSON.stringify(window.dataLayer);
    for (const secret of secrets) {
      expect(serialised).not.toContain(secret);
    }
  });

  it("reports demo case changes and step progress with the case id", async () => {
    const user = userEvent.setup();
    render(<DemoPipeline />);

    await user.click(screen.getByRole("button", { name: /siguiente paso/i }));

    expect(payloads("demo_step")[0]).toMatchObject({
      event: "demo_step",
      step_index: 1,
    });
    expect(payloads("demo_step")[0].case_id).toBeTruthy();
  });

  it("reports reaching the end of a demo walkthrough", async () => {
    const user = userEvent.setup();
    render(<DemoPipeline />);

    let next = screen.queryByRole("button", { name: /siguiente paso/i });
    while (next) {
      await user.click(next);
      next = screen.queryByRole("button", { name: /siguiente paso/i });
    }

    expect(events()).toContain("demo_completed");
  });
});
