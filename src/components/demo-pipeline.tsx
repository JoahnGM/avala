"use client";

import { useState } from "react";
import { SectionLabel } from "@/components/ui/section-label";
import { Stamp } from "@/components/ui/stamp";

// §02 "La demo viva" — interactive, simulated validation (no backend). The
// visitor picks a case and watches AVALA validate it against the official
// sources: idle → validating → APROBADO or REVISAR. The REVISAR branch points
// to §04 (the WhatsApp correction). This is the live demonstration CLAUDE.md
// asks for; validation is simulated, not a real compliance engine.

type CaseId = "aprobado" | "revisar";
type Phase = "idle" | "validating" | "done";
type Check = { ok: boolean; text: string };

type Case = {
  label: string;
  supplier: string;
  file: string;
  nit: string;
  amount: string;
  stamp: "approved" | "revisar";
  checks: Check[];
};

const CASES: Record<CaseId, Case> = {
  aprobado: {
    label: "Cuenta al día",
    supplier: "Talleres Bacatá S.A.S.",
    file: "cuenta_0043_bacata.pdf",
    nit: "NIT 901.334.208-1",
    amount: "$4.850.000",
    stamp: "approved",
    checks: [
      { ok: true, text: "PILA feb-2026 · al día" },
      { ok: true, text: "RUT vigente" },
      { ok: true, text: "DIAN sin obligaciones" },
      { ok: true, text: "Sin indicios de nómina" },
    ],
  },
  revisar: {
    label: "RUT vencido",
    supplier: "Distribuidora Andes S.A.S.",
    file: "cuenta_0002_andes.pdf",
    nit: "NIT 900.512.774-3",
    amount: "$2.100.000",
    stamp: "revisar",
    checks: [
      { ok: true, text: "PILA feb-2026 · al día" },
      { ok: false, text: "RUT desactualizado (última: 2023)" },
      { ok: true, text: "DIAN sin obligaciones" },
      { ok: true, text: "Sin indicios de nómina" },
    ],
  },
};

const VALIDATION_MS = 1400;

export function DemoPipeline() {
  const [caseId, setCaseId] = useState<CaseId>("aprobado");
  const [phase, setPhase] = useState<Phase>("idle");
  const active = CASES[caseId];

  function selectCase(id: CaseId) {
    setCaseId(id);
    setPhase("idle");
  }

  function validate() {
    setPhase("validating");
    setTimeout(() => setPhase("done"), VALIDATION_MS);
  }

  return (
    <section className="border-t border-hairline">
      <div className="mx-auto max-w-5xl px-6 py-16 md:py-20">
        <div className="flex items-center gap-4">
          <SectionLabel as="p">02 · Cómo funciona</SectionLabel>
          <span className="h-px flex-1 bg-hairline" aria-hidden="true" />
        </div>

        <h2 className="mt-8 max-w-3xl font-display text-display-md uppercase md:text-display-lg">
          Míralo validar una cuenta de cobro.
        </h2>

        <p className="mt-8 max-w-2xl text-body-lg text-graphite">
          Elige un caso y observa cómo AVALA revisa los documentos contra la
          DIAN, la UGPP y PILA — en segundos.
        </p>

        <div className="mt-10 border border-hairline">
          {/* Case picker */}
          <div className="flex flex-wrap gap-2 border-b border-hairline p-3">
            {(Object.keys(CASES) as CaseId[]).map((id) => {
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
                  {CASES[id].label}
                </button>
              );
            })}
          </div>

          <div className="grid md:grid-cols-2">
            {/* Document */}
            <div className="border-b border-hairline p-6 md:border-b-0 md:border-r">
              <p className="font-mono text-caption uppercase tracking-widest text-graphite">
                Documento
              </p>
              <div className="mt-3 font-mono text-data">
                <p className="text-ink">{active.file}</p>
                <p className="mt-1 text-graphite">{active.supplier}</p>
                <p className="mt-1 text-graphite">
                  {active.nit} · {active.amount}
                </p>
              </div>

              <div className="mt-6">
                {phase === "done" ? (
                  <button
                    type="button"
                    onClick={() => setPhase("idle")}
                    className="border border-hairline px-4 py-2 font-mono text-caption uppercase tracking-widest text-graphite hover:text-ink focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink"
                  >
                    Probar de nuevo
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={validate}
                    disabled={phase === "validating"}
                    className="bg-stamp px-5 py-2.5 font-mono text-data uppercase tracking-widest text-paper disabled:opacity-60 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink"
                  >
                    {phase === "validating"
                      ? "Validando…"
                      : "Validar documentos →"}
                  </button>
                )}
              </div>
            </div>

            {/* Result */}
            <div className="min-h-52 p-6" aria-live="polite">
              {phase === "idle" ? (
                <p className="text-body text-graphite">
                  Pulsa <span className="text-ink">Validar</span> y AVALA revisa
                  el documento contra la fuente oficial.
                </p>
              ) : null}

              {phase === "validating" ? (
                <p className="font-mono text-data text-graphite">
                  Validando contra DIAN, UGPP y PILA…
                </p>
              ) : null}

              {phase === "done" ? (
                <div>
                  <ul className="space-y-2 font-mono text-data">
                    {active.checks.map((check) => (
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

                  <div className="mt-5">
                    <Stamp variant={active.stamp} size="lg" animate />
                  </div>

                  <p className="mt-4 text-body text-graphite">
                    {active.stamp === "approved" ? (
                      "Todo al día. La cuenta entra a pago."
                    ) : (
                      <>
                        Falta un documento.{" "}
                        <a
                          href="#correccion"
                          className="text-ink underline underline-offset-4 hover:text-stamp focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink"
                        >
                          AVALA ya le escribió al proveedor ↓
                        </a>
                      </>
                    )}
                  </p>
                </div>
              ) : null}
            </div>
          </div>
        </div>

        <p className="mt-10 text-body-lg font-medium">
          Tu equipo no escribe un solo mensaje.
        </p>
      </div>
    </section>
  );
}
