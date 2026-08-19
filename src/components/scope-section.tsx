"use client";

import { useState } from "react";
import { FlowDiagram, type FlowVariant } from "@/components/ui/flow-diagram";
import { SectionLabel } from "@/components/ui/section-label";

// §03 "Alcance" — five items, one open, a panel that redraws for the open one.
//
// P3-1 — the list used to advance itself and come to rest on item 05, so a
// visitor who arrived late met the product at its limit instead of its value.
// Autoplay is gone: 01 is open, the marker shows state (+/–), and the open item
// carries a `stamp` rule down its left edge.
// P3-2 — the panel animates in on change (`panel-in`), so the click and the new
// content read as cause and effect rather than as a swap on the same ground.
// P1-1 — the closing item is a handoff, not a wall: the base of contributions
// is where the client's accountant takes over, and the expediente is built so
// they can. ARL IV-V and the documento soporte are stated as the client's own
// obligations, which is what they are (N-011, N-014).
//
// Norm citations and rule IDs render in `evidence`, not `graphite` (P1-5).

// What the panel says in words, under what it says in the drawing. The
// diagram carries the movement; these carry the proof — rule IDs and norms —
// which have to stay real text at AA, not 10px inside an SVG.
type PanelLine = { label: string; value: string; evidence?: boolean };

type Item = {
  id: string;
  marker: string;
  title: string;
  body: string;
  panelTitle: string;
  /** Which boxes-and-arrows drawing explains this step. */
  flow: FlowVariant;
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
    flow: "entrada",
    lines: [
      { label: "Proveedor", value: "Persona natural · prestación de servicios" },
    ],
  },
  {
    id: "revisa",
    marker: "02",
    title: "Se revisa contra la fuente",
    body: "No contra una copia que el proveedor mandó: contra la planilla del operador autorizado y el RUT en la DIAN.",
    panelTitle: "Fuentes",
    flow: "fuentes",
    lines: [
      {
        label: "Operador PILA",
        value: "Planilla del último período cerrado · V-PILA-01",
        evidence: true,
      },
      {
        label: "DIAN",
        value: "Estado del RUT y responsabilidades · V-RUT-01 · V-RUT-02",
        evidence: true,
      },
    ],
  },
  {
    id: "corrige",
    marker: "03",
    title: "AVALA corrige con el proveedor",
    body: "Lo que falte se pide por WhatsApp y se persigue hasta que llegue. Tu equipo no escribe un solo mensaje.",
    panelTitle: "Corrección",
    flow: "correccion",
    lines: [
      {
        label: "Ejemplo",
        value: "«Me falta tu planilla del último período. ¿Me la envías?»",
      },
    ],
  },
  {
    id: "entrega",
    marker: "04",
    title: "Te queda el expediente",
    body: "El reporte y el registro de cada acción, con hora y actor. De eso depende que tu empresa pueda deducir el pago.",
    panelTitle: "Salida",
    flow: "salida",
    lines: [
      {
        label: "Registro",
        value: "Ley 1393/2010 arts. 26-27 · E.T. art. 108 par. 2",
        evidence: true,
      },
    ],
  },
  {
    id: "handoff",
    marker: "05",
    title: "Dónde entra tu contador",
    body: "AVALA arma el expediente y lo deja listo para quien decide. Estas tres cosas son de tu empresa, y conviene saberlo antes y no después.",
    panelTitle: "Handoff",
    flow: "handoff",
    lines: [
      {
        label: "Base de aportes (IBC)",
        value:
          "Te dejamos planilla, período y valor del contrato en un solo lugar; el IBC lo define tu contador",
      },
      {
        label: "ARL clases IV y V",
        value:
          "En contratos de más de un mes ese aporte lo paga tu empresa, no el proveedor · Decreto 723/2013",
        evidence: true,
      },
      {
        label: "Documento soporte",
        value:
          "Si el proveedor no está obligado a facturar, lo genera tu empresa · Res. DIAN 000165/2023",
        evidence: true,
      },
    ],
    strikes: [
      "Un dashboard nuevo",
      "Migrar tu ERP",
      "Otro login para tu equipo",
    ],
  },
];

export function ScopeSection() {
  const [active, setActive] = useState(0);
  const item = ITEMS[active];

  return (
    <section id="alcance" className="border-t border-hairline">
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
                <li
                  key={entry.id}
                  className={`border-t border-hairline last:border-b ${
                    open ? "border-l-2 border-l-stamp pl-4" : "pl-0"
                  }`}
                >
                  <button
                    type="button"
                    aria-expanded={open}
                    aria-controls={`scope-panel-${entry.id}`}
                    onClick={() => setActive(i)}
                    className="flex w-full items-baseline gap-4 py-4 text-left focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink"
                  >
                    <span className="font-mono text-caption tracking-widest text-graphite">
                      {entry.marker}
                    </span>
                    <span
                      className={`flex-1 font-display text-display-sm uppercase ${
                        open ? "text-ink" : "text-graphite"
                      }`}
                    >
                      {entry.title}
                    </span>
                    {/* P3-1 — state affordance: the list has to look openable
                        before it is opened. */}
                    <span
                      aria-hidden="true"
                      className={`font-mono text-data ${
                        open ? "text-stamp" : "text-graphite"
                      }`}
                    >
                      {open ? "–" : "+"}
                    </span>
                  </button>

                  {open ? (
                    <p
                      id={`scope-panel-${entry.id}`}
                      className="max-w-prose pb-5 pl-10 text-body-lg text-graphite"
                    >
                      {entry.body}
                    </p>
                  ) : null}
                </li>
              );
            })}
          </ul>

          {/* The panel redraws for the open item — same idea as the reference's
              illustration, in our material: a document, not a 3D render. */}
          <div
            key={item.id}
            className="border border-hairline bg-surface p-6 motion-safe:animate-panel-in"
          >
            <p className="font-mono text-caption uppercase tracking-widest text-graphite">
              {item.panelTitle}
            </p>

            {/* Boxes and arrows instead of a label/value list: a list says what
                exists, a diagram says what moves where — which is the argument
                each step is actually making. */}
            <div className="mt-5">
              <FlowDiagram variant={item.flow} />
            </div>

            <dl className="mt-5 space-y-4 border-t border-hairline pt-5">
              {item.lines.map((line) => (
                <div key={line.label}>
                  <dt className="font-mono text-caption uppercase tracking-widest text-graphite">
                    {line.label}
                  </dt>
                  <dd
                    className={`mt-1 font-mono text-data ${
                      line.evidence ? "text-evidence" : "text-ink"
                    }`}
                  >
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
