"use client";

import { useState } from "react";
import { ChatBubble } from "@/components/ui/chat-bubble";
import { SectionLabel } from "@/components/ui/section-label";
import { Stamp } from "@/components/ui/stamp";

// §02 "Cómo funciona" — the full arc, step by step (client feedback 2026-07-24:
// the demo must show the whole journey, not just validation). The visitor picks
// a case and steps through: la cuenta llega → AVALA revisa los documentos → (si
// falta algo) AVALA corrige con el proveedor por chat → lista para pagar, te
// avisamos. Simulated, no backend. The correction chat (formerly §04) now lives
// inside the "corrige" step. Reuses ChatBubble + Stamp.
//
// The chat lines live in the FLOWS data, not inline JSX, so a case can end
// unresolved — see the "sinRespuesta" branch, added by the UX review 2026-07-28
// (P5). Wording is sourced from agents/verbatim.es.md; when a line changes there
// it must change here too, until the two are wired together for real.

type CaseId = "limpio" | "correccion" | "sinRespuesta";
type StageKey = "llega" | "revisa" | "corrige" | "lista" | "detenida";

type Check = { ok: boolean; text: string };
/** One turn of the AVALA↔proveedor chat. Lines come from agents/verbatim.es.md. */
type Turn = {
  sender: "avala" | "proveedor";
  variant?: "text" | "attachment";
  text: string;
};
type Flow = {
  label: string;
  origin: string;
  file: string;
  supplier: string;
  nit: string;
  amount: string;
  checks: Check[];
  stages: StageKey[];
  /** Intro line above the chat in the "corrige" stage. */
  correccionIntro?: string;
  /** The chat itself — data, not inline JSX, so each case can differ. */
  turns?: Turn[];
  /** Copy for a terminal outcome that is NOT approved. */
  detenida?: { body: string; next: string };
};

const STAGE_LABEL: Record<StageKey, string> = {
  llega: "Llega la cuenta",
  revisa: "AVALA revisa",
  corrige: "AVALA corrige con el proveedor",
  lista: "Lista para pagar",
  detenida: "Detenida · pasa a tu equipo",
};

const FLOWS: Record<CaseId, Flow> = {
  limpio: {
    label: "Cuenta al día",
    origin: "La subió tu proveedor.",
    file: "cuenta_0043.pdf",
    supplier: "Talleres Bacatá S.A.S.",
    nit: "NIT 901.334.208-1",
    amount: "$4.850.000",
    checks: [
      { ok: true, text: "PILA · último período" },
      { ok: true, text: "RUT vigente" },
      { ok: true, text: "Responsabilidades verificadas" },
    ],
    stages: ["llega", "revisa", "lista"],
  },
  correccion: {
    label: "Falta el RUT",
    origin: "La subió tu equipo.",
    file: "cuenta_0002.pdf",
    supplier: "Distribuidora Andes S.A.S.",
    nit: "NIT 900.512.774-3",
    amount: "$2.100.000",
    checks: [
      { ok: true, text: "PILA · último período" },
      { ok: false, text: "RUT desactualizado (2023)" },
      { ok: true, text: "Responsabilidades verificadas" },
    ],
    stages: ["llega", "revisa", "corrige", "lista"],
    correccionIntro:
      "Falta el RUT vigente. AVALA le escribe al proveedor y lo resuelve — tu equipo no toca nada.",
    turns: [
      {
        sender: "avala",
        text: "Hola Julián, soy AVALA. Tu RUT está desactualizado; envíame el vigente para procesar la cuenta #0002.",
      },
      {
        sender: "proveedor",
        variant: "attachment",
        text: "rut_actualizado.pdf",
      },
      // Verbatim S-COR-09 (agents/verbatim.es.md). Says what AVALA actually did
      // — queried DIAN's RUT service — instead of presenting the supplier's
      // attachment as a DIAN confirmation. See design/claims-audit.md finding 3.
      {
        sender: "avala",
        text: "Consulté el estado de tu RUT en el portal de la DIAN y aparece activo. Con eso ya puedo seguir.",
      },
    ],
  },
  // The branch the product exists to handle, and the only one with a terminal
  // outcome that is not APROBADO. Added by the UX review 2026-07-28 (P5): every
  // fork needs a defined end state and an explicit next action, and the page
  // previously showed no validation that stays unresolved.
  sinRespuesta: {
    label: "El proveedor no responde",
    origin: "La subió tu equipo.",
    file: "cuenta_0117.pdf",
    supplier: "Servicios Chía S.A.S.",
    nit: "NIT 901.702.455-6",
    amount: "$3.240.000",
    checks: [
      { ok: false, text: "PILA · último período sin pagar" },
      { ok: true, text: "RUT vigente" },
      { ok: true, text: "Responsabilidades verificadas" },
    ],
    stages: ["llega", "revisa", "corrige", "detenida"],
    correccionIntro:
      "El período no aparece pagado. AVALA le escribe al proveedor y le hace seguimiento.",
    turns: [
      // S-COR-01 + S-COR-06, then S-COR-10 as the follow-up.
      {
        sender: "avala",
        text: "Hola Marcela, soy AVALA. Me aparece el último período sin pagar. En cuanto lo pagues y me envíes el soporte, sigo con la cuenta #0117.",
      },
      {
        sender: "avala",
        text: "Marcela, quedo pendiente de tu planilla para poder cerrar la cuenta #0117.",
      },
    ],
    detenida: {
      body: "El proveedor no ha respondido, así que la cuenta no queda lista: pagarla sin el aporte al día es justo lo que la UGPP fiscaliza.",
      next: "AVALA te la pasa con el detalle de lo que falta y quién lo debe corregir. La decisión de insistir, devolverla o pagarla es tuya.",
    },
  },
};

export function DemoPipeline() {
  const [caseId, setCaseId] = useState<CaseId>("correccion");
  const [step, setStep] = useState(0);
  const flow = FLOWS[caseId];
  const stages = flow.stages;
  const stage = stages[step];
  const isLast = step === stages.length - 1;

  function selectCase(id: CaseId) {
    setCaseId(id);
    setStep(0);
  }

  return (
    <section className="border-t border-hairline">
      <div className="mx-auto max-w-5xl px-6 py-16 md:py-20">
        <div className="flex items-center gap-4">
          {/* claims-audit.md finding 17 — the walkthrough uses fabricated
              suppliers and lands an APROBADO stamp, so it has to say so. */}
          <SectionLabel as="p" secondary="Demo simulada">
            02 · Cómo funciona
          </SectionLabel>
          <span className="h-px flex-1 bg-hairline" aria-hidden="true" />
        </div>

        <h2 className="mt-8 max-w-3xl font-display text-display-md uppercase md:text-display-lg">
          De la cuenta de cobro al pago. Sin revisar un solo PDF.
        </h2>

        <p className="mt-8 max-w-2xl text-body-lg text-graphite">
          Elige un caso y míralo completo: AVALA recibe, revisa y corrige con el
          proveedor. Cuando queda lista te avisa; cuando no se puede resolver,
          te dice exactamente qué falta.
        </p>

        {/* Case picker */}
        <div className="mt-10 flex flex-wrap gap-2">
          {(Object.keys(FLOWS) as CaseId[]).map((id) => {
            const selected = id === caseId;
            return (
              <button
                key={id}
                type="button"
                aria-pressed={selected}
                onClick={() => selectCase(id)}
                className={`px-3 py-1.5 font-mono text-caption uppercase tracking-widest focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink ${
                  selected
                    ? "bg-ink text-paper"
                    : "border border-hairline text-graphite hover:text-ink"
                }`}
              >
                {FLOWS[id].label}
              </button>
            );
          })}
        </div>

        <div className="mt-6 border border-hairline">
          {/* Progress rail */}
          <ol className="flex flex-wrap gap-x-6 gap-y-2 border-b border-hairline p-4">
            {stages.map((key, i) => {
              const state =
                i < step ? "done" : i === step ? "current" : "upcoming";
              return (
                <li
                  key={key}
                  aria-current={state === "current" ? "step" : undefined}
                  // Upcoming steps used `text-hairline` (1.28:1 on paper) —
                  // an AA failure per CLAUDE.md rule 3. State is now carried by
                  // weight and by the ✓-vs-number marker instead of a third
                  // hue, so every step stays readable. UX review 2026-07-28, P4.
                  className={`flex items-center gap-2 font-mono text-caption uppercase tracking-widest ${
                    state === "current"
                      ? "font-medium text-ink"
                      : "text-graphite"
                  }`}
                >
                  <span aria-hidden="true">
                    {state === "done" ? "✓" : `0${i + 1}`}
                  </span>
                  {STAGE_LABEL[key]}
                </li>
              );
            })}
          </ol>

          {/* Stage content */}
          <div className="min-h-64 p-6" aria-live="polite">
            {stage === "llega" ? (
              <div>
                <p className="font-mono text-caption uppercase tracking-widest text-graphite">
                  {flow.origin}
                </p>
                <div className="mt-3 font-mono text-data">
                  <p className="text-ink">{flow.file}</p>
                  <p className="mt-1 text-graphite">{flow.supplier}</p>
                  <p className="mt-1 text-graphite">
                    {flow.nit} · {flow.amount}
                  </p>
                </div>
              </div>
            ) : null}

            {stage === "revisa" ? (
              <div>
                <p className="text-body text-graphite">
                  AVALA revisa los documentos: PILA, RUT y DIAN.
                </p>
                <ul className="mt-4 space-y-2 font-mono text-data">
                  {flow.checks.map((check) => (
                    <li key={check.text} className="flex items-start gap-2">
                      <span
                        aria-hidden="true"
                        className={check.ok ? "text-ink" : "text-stamp"}
                      >
                        {check.ok ? "✓" : "✗"}
                      </span>
                      <span className="text-graphite">{check.text}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}

            {stage === "corrige" ? (
              <div>
                <p className="text-body text-graphite">
                  {flow.correccionIntro}
                </p>
                <ol
                  aria-label="Conversación entre AVALA y el proveedor"
                  className="mt-4 max-w-md space-y-3"
                >
                  {flow.turns?.map((turn) => (
                    <ChatBubble
                      key={turn.text}
                      sender={turn.sender}
                      label={turn.sender === "avala" ? "Avala" : "Proveedor"}
                      variant={turn.variant}
                    >
                      {turn.text}
                    </ChatBubble>
                  ))}
                </ol>
                {flow.detenida ? (
                  <p className="mt-4 font-mono text-caption uppercase tracking-widest text-graphite">
                    Sin respuesta del proveedor
                  </p>
                ) : null}
              </div>
            ) : null}

            {stage === "lista" ? (
              <div>
                <Stamp variant="approved" size="lg" animate />
                {/* claims-audit.md finding 14 — the approval is the client's,
                    so the demo can't end on "tú solo pagas". */}
                <p className="mt-4 text-body-lg text-ink">
                  Te avisamos: la cuenta quedó lista. La aprobación la das tú.
                </p>
              </div>
            ) : null}

            {stage === "detenida" && flow.detenida ? (
              <div>
                <Stamp variant="revisar" size="lg" animate />
                <p className="mt-4 text-body-lg text-ink">
                  {flow.detenida.body}
                </p>
                <p className="mt-3 text-body text-graphite">
                  {flow.detenida.next}
                </p>
              </div>
            ) : null}
          </div>

          {/* Control */}
          <div className="flex flex-wrap items-center gap-3 border-t border-hairline p-4">
            {/* A back action so the walkthrough isn't one-way — UX review
                2026-07-28, P5 (no dead ends, a way back always available). */}
            {step > 0 ? (
              <button
                type="button"
                onClick={() => setStep((s) => s - 1)}
                className="border border-hairline px-4 py-2 font-mono text-caption uppercase tracking-widest text-graphite hover:text-ink focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink"
              >
                ← Paso anterior
              </button>
            ) : null}

            {isLast ? (
              <button
                type="button"
                onClick={() => setStep(0)}
                className="border border-hairline px-4 py-2 font-mono text-caption uppercase tracking-widest text-graphite hover:text-ink focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink"
              >
                Ver de nuevo
              </button>
            ) : (
              <button
                type="button"
                onClick={() => setStep((s) => s + 1)}
                className="bg-stamp px-5 py-2.5 font-mono text-data uppercase tracking-widest text-paper focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink"
              >
                Siguiente paso →
              </button>
            )}
          </div>
        </div>

        <p className="mt-10 text-body-lg font-medium">
          Tu equipo no escribe un solo mensaje.
        </p>
      </div>
    </section>
  );
}
