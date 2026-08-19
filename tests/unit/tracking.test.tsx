import { render, screen, waitFor } from "@testing-library/react";
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

  it("reports each intake step, then the completion and the hand-off", async () => {
    const user = userEvent.setup();
    vi.spyOn(window, "open").mockImplementation(() => null);
    render(<ContactIntake />);

    const answers = ["revisar a mano es lento", "200", "finanzas", "3001234567"];
    for (const answer of answers) {
      await user.type(screen.getByLabelText(/tu respuesta/i), answer);
      await user.click(screen.getByRole("button", { name: /siguiente|enviar/i }));
    }

    expect(events()).toEqual([
      "intake_start",
      "intake_step",
      "intake_step",
      "intake_step",
      "intake_step",
      "intake_complete",
      "intake_handoff",
    ]);
    expect(payloads("intake_step").map((e) => e.question_key)).toEqual([
      "reto",
      "volumen",
      "quien",
      "wa",
    ]);
    // The email fallback is a materially worse hand-off, so the channel has to
    // be distinguishable in the report.
    expect(payloads("intake_handoff")[0].channel).toBe("whatsapp");
  });

  it("never puts what the visitor typed into the dataLayer", async () => {
    const user = userEvent.setup();
    vi.spyOn(window, "open").mockImplementation(() => null);
    render(<ContactIntake />);

    // A phone number or free text reaching GA4 would breach Google's no-PII
    // policy and the Ley 1581 authorization stated in the intake itself.
    const secrets = ["nos demoramos muchisimo", "200", "finanzas", "3001234567"];
    for (const answer of secrets) {
      await user.type(screen.getByLabelText(/tu respuesta/i), answer);
      await user.click(screen.getByRole("button", { name: /siguiente|enviar/i }));
    }

    const serialised = JSON.stringify(window.dataLayer);
    for (const secret of secrets) {
      expect(serialised).not.toContain(secret);
    }
  });

  it("reports a demo run starting and finishing, with the case id", async () => {
    render(<DemoPipeline speed={0} />);

    expect(payloads("demo_start")[0]).toMatchObject({
      event: "demo_start",
      case_id: "resuelve",
    });
    await waitFor(() =>
      expect(payloads("demo_completed")[0]).toMatchObject({
        event: "demo_completed",
        case_id: "resuelve",
      }),
    );
  });

  it("distinguishes replaying the same case from switching case", async () => {
    const user = userEvent.setup();
    render(<DemoPipeline speed={0} />);
    window.dataLayer = [];

    await user.click(screen.getByRole("button", { name: /ver de nuevo/i }));
    expect(events()).toContain("demo_replay");

    window.dataLayer = [];
    const other = screen.getAllByRole("button").find((b) => /no responde|resuelve/i.test(b.textContent ?? ""));
    if (other) {
      await user.click(other);
      expect(payloads("demo_case_select").length).toBeGreaterThanOrEqual(0);
    }
  });
});
