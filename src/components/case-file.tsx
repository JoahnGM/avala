"use client";

import { useState } from "react";

import { SectionLabel } from "@/components/ui/section-label";

// Static mock of the live validation demo — no real validation logic yet.
// The temporary trigger button exists only so the stamp animation can be
// reviewed on the Vercel preview; it will be removed when the real flow lands.

type StampState = "aprobado" | "revisar";

const STAMP_LABEL: Record<StampState, string> = {
  aprobado: "APROBADO",
  revisar: "REVISAR",
};

const AGENT_CHECKS: Record<StampState, { prefix: "OK" | "FALTA"; text: string }[]> = {
  aprobado: [
    { prefix: "OK", text: "RUT vigente (DIAN)" },
    { prefix: "OK", text: "PILA corresponde al período 2026-06" },
    { prefix: "OK", text: "Aportes coinciden con el valor cobrado" },
  ],
  revisar: [
    { prefix: "OK", text: "RUT vigente (DIAN)" },
    { prefix: "FALTA", text: "PILA es de un período distinto (2026-04)" },
    { prefix: "OK", text: "Se pidió la corrección por WhatsApp" },
  ],
};

export function CaseFile() {
  const [stampState, setStampState] = useState<StampState>("aprobado");
  // Changing the key remounts the stamp so the landing animation replays.
  const [stampKey, setStampKey] = useState(0);

  function toggleStamp() {
    setStampState((prev) => (prev === "aprobado" ? "revisar" : "aprobado"));
    setStampKey((key) => key + 1);
  }

  const approved = stampState === "aprobado";

  return (
    <div>
      <div className="flex flex-wrap items-baseline justify-between gap-2">
        <SectionLabel as="h2" variant="title">
          Caso #0001
        </SectionLabel>
        <SectionLabel>Simulación con datos de ejemplo</SectionLabel>
      </div>

      <ol className="mt-6 grid gap-px border border-hairline bg-hairline md:grid-cols-3">
        <li className="bg-paper p-6">
          <SectionLabel>01 — Documento enviado</SectionLabel>
          <div className="mt-4 border border-hairline p-4 font-mono text-data">
            <p className="font-medium">pila_junio_2026.pdf</p>
            <p className="mt-2 text-graphite">NIT 900.428.317-1</p>
            <p className="text-graphite">Cuenta de cobro #0043 — $2.450.000</p>
          </div>
        </li>

        <li className="bg-paper p-6">
          <SectionLabel>02 — El agente revisa</SectionLabel>
          <ul className="mt-4 space-y-2 font-mono text-data">
            {AGENT_CHECKS[stampState].map((check) => (
              <li key={check.text} className="flex gap-3">
                <span
                  className={
                    check.prefix === "FALTA"
                      ? "shrink-0 font-medium text-stamp"
                      : "shrink-0 font-medium"
                  }
                >
                  {check.prefix}
                </span>
                <span className="text-graphite">{check.text}</span>
              </li>
            ))}
          </ul>
        </li>

        <li className="bg-paper p-6">
          <SectionLabel>03 — Resultado</SectionLabel>
          <div className="relative mt-4 flex min-h-32 items-center justify-center border border-hairline p-4">
            <div aria-live="polite">
              {/* Rotation lives on the wrapper so the landing animation's
                  transform doesn't overwrite the off-axis stamp angle. */}
              <span
                className={`inline-block ${approved ? "-rotate-2" : "rotate-2"}`}
              >
                <span
                  key={stampKey}
                  className={`block border-2 px-5 py-1 font-stamp text-display-sm uppercase tracking-widest motion-safe:animate-stamp-land ${
                    approved
                      ? "border-approved text-approved"
                      : "border-stamp text-stamp"
                  }`}
                >
                  {STAMP_LABEL[stampState]}
                </span>
              </span>
            </div>
          </div>
        </li>
      </ol>

      <button
        type="button"
        onClick={toggleStamp}
        className="mt-4 border border-hairline px-4 py-2 font-mono text-caption uppercase tracking-widest text-graphite hover:border-graphite focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink"
      >
        Cambiar resultado (control temporal)
      </button>
    </div>
  );
}
