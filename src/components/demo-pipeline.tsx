"use client";

import { useState } from "react";
import { SectionLabel } from "@/components/ui/section-label";

// §02 "La demo viva" — narrated pipeline. Rationale (client feedback,
// 2026-07-23): the earlier demo led with the APPROVED stamp, so people saw
// the result without understanding the WORK behind it. This section narrates
// the work in 4 steps and lets the stamp be the climax of the last step.

type Step = {
  /** Mono label, e.g. "01 · RECIBE". */
  label: string;
  /** Short display title (uppercase). */
  title: string;
  /** One-line body copy. */
  body: string;
};

const STEPS: Step[] = [
  {
    label: "01 · RECIBE",
    title: "La cuenta",
    body: "La cuenta y sus documentos.",
  },
  {
    label: "02 · REVISA",
    title: "Contra la fuente",
    body: "PILA, RUT y DIAN contra la fuente oficial.",
  },
  {
    label: "03 · CORRIGE",
    title: "Por chat",
    body: "Si algo falta, le escribe al proveedor y lo resuelve.",
  },
  {
    label: "04 · ENTREGA",
    title: "Lista para pagar",
    body: "Cuenta lista para pagar.",
  },
];

// Checklist rows for step 02. The check mark stays in ink (NOT approved green):
// green is reserved for the final validated state (the stamp).
const CHECKS = [
  "PILA feb-2026",
  "RUT vigente",
  "DIAN sin obligaciones",
  "Sin indicios de nómina",
];

export function DemoPipeline() {
  // Bumping this key remounts the stamp <span>, replaying the CSS entrance
  // animation (motion-safe:animate-stamp-land) on demand.
  const [replayKey, setReplayKey] = useState(0);

  return (
    <section className="border-t border-hairline">
      <div className="mx-auto max-w-5xl px-6 py-24 md:py-32">
        <div className="flex items-center gap-4">
          <SectionLabel as="p">§ 02 · La demo viva</SectionLabel>
          <span className="h-px flex-1 bg-hairline" aria-hidden="true" />
        </div>

        <h2 className="mt-8 max-w-3xl font-display text-display-md uppercase md:text-display-lg">
          Esto es lo que AVALA hace por cada proveedor.
        </h2>

        <p className="mt-8 max-w-2xl text-body-lg text-graphite">
          El proveedor manda su cuenta de cobro. AVALA hace el resto.
        </p>

        <ol className="mt-16 grid gap-x-6 gap-y-12 lg:grid-cols-4">
          {STEPS.map((step, i) => (
            <li key={step.label} className="relative border-t border-hairline pt-6">
              {/* Connector arrow between steps (desktop only). */}
              {i > 0 ? (
                <span
                  aria-hidden="true"
                  className="absolute -left-4 top-8 hidden font-mono text-body-lg text-graphite lg:block"
                >
                  &rarr;
                </span>
              ) : null}

              <p className="font-mono text-caption uppercase tracking-widest text-graphite">
                {step.label}
              </p>
              <h3 className="mt-4 font-display text-display-sm uppercase">
                {step.title}
              </h3>
              <p className="mt-3 text-body text-graphite">{step.body}</p>

              <div className="mt-6">
                {/* 01 · RECIBE — mini document card. */}
                {i === 0 ? (
                  <div className="border border-hairline p-4 font-mono text-data">
                    <p>pila_febrero_2026.pdf</p>
                    <p className="mt-2 text-graphite">NIT 901.334.208-1</p>
                    <p className="mt-2 text-graphite">
                      Cuenta #0002 · $4.850.000
                    </p>
                  </div>
                ) : null}

                {/* 02 · REVISA — checklist (checks in ink, not green). */}
                {i === 1 ? (
                  <ul className="space-y-2 font-mono text-data">
                    {CHECKS.map((check) => (
                      <li key={check} className="flex items-start gap-2">
                        <span aria-hidden="true" className="text-ink">
                          &#10003;
                        </span>
                        <span className="text-graphite">{check}</span>
                      </li>
                    ))}
                  </ul>
                ) : null}

                {/* 03 · CORRIGE — chat bubble. */}
                {i === 2 ? (
                  <div className="max-w-bubble rounded-bubble bg-ink px-3 py-2 text-data text-paper">
                    Tu RUT venció el 15 de mayo. Envíame el actualizado 🙂
                  </div>
                ) : null}

                {/* 04 · ENTREGA — the stamp: the climax. Green is allowed here
                    because it is the validated state. */}
                {i === 3 ? (
                  <div className="flex items-center gap-4">
                    <span
                      key={replayKey}
                      className="inline-block -rotate-2 border-2 border-approved px-5 py-1 font-stamp text-display-sm uppercase tracking-widest text-approved motion-safe:animate-stamp-land"
                    >
                      APROBADO
                    </span>
                    <button
                      type="button"
                      onClick={() => setReplayKey((k) => k + 1)}
                      className="border border-hairline px-3 py-1 font-mono text-caption uppercase tracking-widest text-graphite focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink"
                    >
                      Reproducir
                    </button>
                  </div>
                ) : null}
              </div>
            </li>
          ))}
        </ol>

        <p className="mt-16 border-t border-hairline pt-8 text-body-lg font-medium">
          Tu equipo no escribe un solo mensaje.
        </p>
      </div>
    </section>
  );
}
