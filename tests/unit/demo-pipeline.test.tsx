import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import { DemoPipeline } from "@/components/demo-pipeline";

// `speed={0}` collapses every pause so the console resolves immediately; the
// sequence and its content are what these assert, not the cadence.
const runs = () => render(<DemoPipeline speed={0} />);

describe("DemoPipeline", () => {
  // P2-6 — the marker moved out of the section eyebrow to a caption under the
  // frame: announcing the simulation before the payoff disarmed the strongest
  // piece on the page. It still has to be stated (claims-audit finding 17).
  it("marks the walkthrough as simulated, below the frame", () => {
    runs();

    expect(
      screen.getByText(/ejemplo con datos anonimizados/i),
    ).toBeInTheDocument();
  });

  // P1-2 — the biggest adoption objection: who writes to my supplier, from
  // what number, and what happens when they answer something else.
  it("answers who writes to the supplier, from where, and the human fallback", () => {
    runs();

    expect(screen.getByText(/nunca dice ser una persona/i)).toBeInTheDocument();
    expect(screen.getByText("+57 301 244 1488")).toBeInTheDocument();
    expect(
      screen.getByText(/pasa a una persona de tu equipo/i),
    ).toBeInTheDocument();
  });

  // design/normative-review.md R2-01 — the regime AVALA validates (aportes de
  // independientes) applies to personas naturales. A S.A.S. is outside
  // agents/legal-brain.md §0 entirely, and cannot invoice by cuenta de cobro.
  it("uses a persona natural, never a S.A.S., and states the contributor type", () => {
    runs();

    expect(screen.getByText("Julián Pardo Meneses")).toBeInTheDocument();
    expect(screen.queryByText(/S\.A\.S\./)).not.toBeInTheDocument();
    expect(
      screen.getByText(/prestación de servicios personales/i),
    ).toBeInTheDocument();
  });

  it("names the rule behind every check", () => {
    runs();

    expect(screen.getByText("V-PILA-01")).toBeInTheDocument();
    expect(screen.getByText("V-RUT-01")).toBeInTheDocument();
    expect(screen.getByText("V-RUT-02")).toBeInTheDocument();
  });

  // The console runs itself — no click advances it. That is the point of the
  // rewrite: the visitor watches the product work.
  it("resolves on its own and lands the report the client receives", async () => {
    runs();

    expect(
      await screen.findByText("reporte_cuenta_0002.pdf"),
    ).toBeInTheDocument();
    expect(screen.getByText("APROBADO")).toBeInTheDocument();
    expect(
      screen.getByText(/planilla del último período cerrado, pagada/i),
    ).toBeInTheDocument();
  });

  it("opens the WhatsApp correction inside the same console", async () => {
    runs();

    const chat = await screen.findByRole("list", {
      name: /conversación entre avala y el proveedor/i,
    });
    expect(
      await within(chat).findByText(/me falta tu planilla de aportes/i),
    ).toBeInTheDocument();
    // the supplier's reply lands later in the same thread, not in a new one
    expect(
      await within(chat).findByText("planilla_2026-07.pdf"),
    ).toBeInTheDocument();
  });

  // claims-audit.md finding 14 — the approval is the client's, so the demo
  // cannot end on "we paid it for you".
  it("leaves the approval with the client", async () => {
    runs();

    expect(await screen.findByText(/la aprobación la das tú/i)).toBeInTheDocument();
  });

  // The UX review requires every fork to have a defined end state. The branch
  // is still reachable — it just no longer asks the visitor to choose before
  // the demo has shown them anything.
  it("reaches the unresolved ending, which stamps REVISAR and hands it over", async () => {
    const user = userEvent.setup();
    runs();

    await user.click(
      screen.getByRole("button", { name: /el proveedor no responde/i }),
    );

    expect(await screen.findByText("REVISAR")).toBeInTheDocument();
    expect(screen.getByText("Marcela Ríos Gaitán")).toBeInTheDocument();
    expect(
      screen.getByText(/la decisión de insistir, devolverla o pagarla es tuya/i),
    ).toBeInTheDocument();
    expect(screen.queryByText("reporte_cuenta_0002.pdf")).not.toBeInTheDocument();
  });

  // design/claims-audit.md findings 1 and 5 — the period label can never name
  // the current month (mes vencido), and no disguised-employment check exists.
  it("does not reintroduce an impossible period or a nómina assessment", () => {
    runs();

    expect(screen.getByText(/último período cerrado/i)).toBeInTheDocument();
    expect(screen.queryByText(/PILA \w{3}-\d{4}/)).not.toBeInTheDocument();
    expect(screen.queryByText(/indicios de nómina/i)).not.toBeInTheDocument();
  });
});
