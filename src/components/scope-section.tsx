"use client";

import { useEffect, useState } from "react";
import { SectionLabel } from "@/components/ui/section-label";

// §03 "Alcance" — replaces manifesto-section.tsx (2026-08-18, Joahn's
// direction after the Cifrato reference).
//
// What was worth taking from that page is not its palette — near-black with an
// acid-green accent is one of the AI-landing defaults design/tokens.md exists
// to avoid — but how it communicates: FIVE items, ONE open. Four are titles
// only; the open one carries a sentence and redraws the panel beside it. Our
// sections show everything at once, which is why they read as dense even when
// the copy is short.
//
// Folding the old manifesto in as the last item is the same principle applied
// once more: one section instead of two, and the list ends on the boundary
// rather than on the sales pitch. That last item is also the landing-level
// answer to design/normative-review.md R2-07, R2-08 and R2-09 — the three
// validations the product does not perform, said out loud instead of left for
// the reader to assume.

type PanelLine = { label: string; value: string };

type Item = {
  id: string;
  marker: string;
  title: string;
  body: string;
  panelTitle: string;
  lines: PanelLine[];
  /** Only the closing item carries these — what AVALA is not. */
  strikes?: string[];
};

const ITEMS: Item[] = [
  {
    id: "llega",
    marker: "01",
    title: "Llega la cuenta de cobro",
    body: "La sube tu equipo o la manda el proveedor. No hay formulario que llenar ni portal nuevo que aprender.",
    panelTitle: "Entrada",
    lines: [
      { label: "Documento", value: "cuenta_0002.pdf · $2.100.000" },
      { label: "Proveedor", value: "Persona natural · prestación de servicios" },
    ],
  },
  {
    id: "revisa",
    marker: "02",
    title: "Se revisa contra la fuente",
    body: "No contra una copia que el proveedor mandó: contra la planilla del operador autorizado y el RUT en la DIAN.",
    panelTitle: "Fuentes",
    lines: [
      { label: "Operador PILA", value: "Planilla del último período cerrado · V-PILA-01" },
      { label: "DIAN", value: "Estado del RUT y responsabilidades · V-RUT-01 · V-RUT-02" },
    ],
  },
  {
    id: "corrige",
    marker: "03",
    title: "AVALA corrige con el proveedor",
    body: "Lo que falte se pide por WhatsApp y se persigue hasta que llegue. Tu equipo no escribe un solo mensaje.",
    panelTitle: "Corrección",
    lines: [
      { label: "Canal", value: "WhatsApp · AVALA ↔ proveedor" },
      { label: "Ejemplo", value: "«Me falta tu planilla del último período. ¿Me la envías?»" },
    ],
  },
  {
    id: "entrega",
    marker: "04",
    title: "Te queda el soporte",
    body: "El reporte y el registro de cada acción, con hora y actor. De eso depende que puedas deducir el pago.",
    panelTitle: "Salida",
    lines: [
      { label: "Reporte", value: "reporte_cuenta_0002.pdf · 3 anexos" },
      { label: "Registro", value: "Ley 1393/2010 arts. 26-27 · E.T. art. 108 par. 2" },
    ],
  },
  {
    id: "limite",
    marker: "05",
    title: "Lo que no hace",
    body: "AVALA verifica que los documentos existan, estén vigentes y correspondan al período verificable. Hasta ahí llega, y conviene que lo sepas antes y no después.",
    panelTitle: "Fuera de alcance",
    lines: [
      {
        label: "Base de aportes",
        value: "No recalcula el IBC — que es lo que la UGPP fiscaliza",
      },
      {
        label: "ARL clases IV y V",
        value: "En contratos de más de un mes ese aporte lo paga tu empresa",
      },
      {
        label: "Documento soporte",
        value: "Si el proveedor no factura, lo genera tu empresa · Res. DIAN 000165/2023",
      },
    ],
    strikes: [
      "Un dashboard nuevo",
      "Migrar tu ERP",
      "Otro login para tu equipo",
    ],
  },
];

/** How long each item holds before the list advances itself. */
const HOLD_MS = 5200;

export function ScopeSection() {
  const [active, setActive] = useState(0);
  // Advancing stops for good once the visitor picks an item: at that point they
  // are reading, and a list that moves under a reader is a bug, not a feature.
  const [autoplay, setAutoplay] = useState(true);

  useEffect(() => {
    if (!autoplay || active >= ITEMS.length - 1) return;
    const timer = window.setTimeout(
      () => setActive((i) => i + 1),
      HOLD_MS,
    );
    return () => window.clearTimeout(timer);
  }, [active, autoplay]);

  const item = ITEMS[active];

  return (
    <section className="border-t border-hairline">
      <div className="mx-auto max-w-5xl px-6 py-16 md:py-20">
        <div className="flex items-center gap-4">
          <SectionLabel as="p">03 · Alcance</SectionLabel>
          <span className="h-px flex-1 bg-hairline" aria-hidden="true" />
        </div>

        {/* Two clauses, one machine and one human — the shape the promise has
            to take, because the verification duty is legally the client's. */}
        <h2 className="mt-8 max-w-3xl font-display text-display-md uppercase md:text-display-lg">
          AVALA hace la revisión. La firma sigue siendo tuya.
        </h2>

        <div className="mt-12 grid gap-10 md:grid-cols-[1fr_0.85fr] md:gap-14">
          <ul>
            {ITEMS.map((entry, i) => {
              const open = i === active;
              return (
                <li key={entry.id} className="border-t border-hairline last:border-b">
                  <button
                    type="button"
                    aria-expanded={open}
                    aria-controls={`scope-panel-${entry.id}`}
                    onClick={() => {
                      setActive(i);
                      setAutoplay(false);
                    }}
                    className="flex w-full items-baseline gap-4 py-4 text-left focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink"
                  >
                    <span className="font-mono text-caption tracking-widest text-graphite">
                      {entry.marker}
                    </span>
                    <span
                      className={`font-display text-display-sm uppercase ${
                        open ? "text-ink" : "text-graphite"
                      }`}
                    >
                      {entry.title}
                    </span>
                  </button>

                  {open ? (
                    <div id={`scope-panel-${entry.id}`}>
                      <p className="max-w-prose pb-4 pl-10 text-body-lg text-graphite">
                        {entry.body}
                      </p>
                      {autoplay && i < ITEMS.length - 1 ? (
                        <span
                          key={active}
                          aria-hidden="true"
                          className="block h-px origin-left bg-stamp motion-safe:animate-scope-progress motion-reduce:hidden"
                        />
                      ) : null}
                    </div>
                  ) : null}
                </li>
              );
            })}
          </ul>

          {/* The panel redraws for the open item — same idea as the reference's
              illustration, in our material: a document, not a 3D render. */}
          <div className="border border-hairline bg-surface p-6">
            <p className="font-mono text-caption uppercase tracking-widest text-graphite">
              {item.panelTitle}
            </p>
            <dl className="mt-5 space-y-5">
              {item.lines.map((line) => (
                <div key={line.label}>
                  <dt className="font-mono text-caption uppercase tracking-widest text-graphite">
                    {line.label}
                  </dt>
                  <dd className="mt-1 font-mono text-data text-ink">
                    {line.value}
                  </dd>
                </div>
              ))}
            </dl>

            {item.strikes ? (
              <ul className="mt-6 flex flex-wrap gap-2 border-t border-hairline pt-5">
                {item.strikes.map((strike) => (
                  <li
                    key={strike}
                    className="border border-hairline px-3 py-1.5 font-mono text-caption text-graphite line-through decoration-stamp decoration-2"
                  >
                    {strike}
                  </li>
                ))}
              </ul>
            ) : null}
          </div>
        </div>
      </div>
    </section>
  );
}
