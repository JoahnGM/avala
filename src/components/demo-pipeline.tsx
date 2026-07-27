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

type CaseId = "limpio" | "correccion";
type StageKey = "llega" | "revisa" | "corrige" | "lista";

type Check = { ok: boolean; text: string };
type Flow = {
  label: string;
  origin: string;
  file: string;
  supplier: string;
  nit: string;
  amount: string;
  checks: Check[];
  stages: StageKey[];
};

const STAGE_LABEL: Record<StageKey, string> = {
  llega: "Llega la cuenta",
  revisa: "AVALA revisa",
  corrige: "AVALA corrige con el proveedor",
  lista: "Lista para pagar",
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
      { ok: true, text: "PILA feb-2026" },
      { ok: true, text: "RUT vigente" },
      { ok: true, text: "DIAN sin obligaciones" },
      { ok: true, text: "Sin indicios de nómina" },
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
      { ok: true, text: "PILA feb-2026" },
      { ok: false, text: "RUT desactualizado (2023)" },
      { ok: true, text: "DIAN sin obligaciones" },
      { ok: true, text: "Sin indicios de nómina" },
    ],
    stages: ["llega", "revisa", "corrige", "lista"],
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
          <SectionLabel as="p">02 · Cómo funciona</SectionLabel>
          <span className="h-px flex-1 bg-hairline" aria-hidden="true" />
        </div>

        <h2 className="mt-8 max-w-3xl font-display text-display-md uppercase md:text-display-lg">
          De la cuenta de cobro al pago. Sin que muevas un dedo.
        </h2>

        <p className="mt-8 max-w-2xl text-body-lg text-graphite">
          Elige un caso y míralo completo: AVALA recibe, revisa, corrige con el
          proveedor y te avisa cuando queda lista.
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
                  className={`flex items-center gap-2 font-mono text-caption uppercase tracking-widest ${
                    state === "current"
                      ? "text-ink"
                      : state === "done"
                        ? "text-graphite"
                        : "text-hairline"
                  }`}
                >
                  <span aria-hidden="true">{state === "done" ? "✓" : `0${i + 1}`}</span>
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
                  Falta el RUT vigente. AVALA le escribe al proveedor y lo
                  resuelve — tu equipo no toca nada.
                </p>
                <ol
                  aria-label="Conversación entre AVALA y el proveedor"
                  className="mt-4 max-w-md space-y-3"
                >
                  <ChatBubble sender="avala" label="Avala">
                    Hola Julián, soy AVALA. Tu RUT está desactualizado; envíame
                    el vigente para procesar la cuenta #0002.
                  </ChatBubble>
                  <ChatBubble
                    sender="proveedor"
                    label="Proveedor"
                    variant="attachment"
                  >
                    rut_actualizado.pdf
                  </ChatBubble>
                  <ChatBubble sender="avala" label="Avala">
                    Recibido. RUT vigente confirmado con la DIAN.
                  </ChatBubble>
                </ol>
              </div>
            ) : null}

            {stage === "lista" ? (
              <div>
                <Stamp variant="approved" size="lg" animate />
                <p className="mt-4 text-body-lg text-ink">
                  Te avisamos: la cuenta quedó lista para pagar. Tú solo pagas.
                </p>
              </div>
            ) : null}
          </div>

          {/* Control */}
          <div className="border-t border-hairline p-4">
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
