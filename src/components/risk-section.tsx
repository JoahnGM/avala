import { SectionLabel } from "@/components/ui/section-label";
import { SourceNote } from "@/components/ui/source-note";

// §03 "Lo que está en juego" — the risk section. Copy adapted from the Lovable
// reference at Joahn's direction (2026-07-23), then corrected 2026-07-28
// against design/claims-audit.md (findings 6, 7, 8, 9). Every figure now
// carries its own provenance per design/heuristics.md #2: a norm ID from
// agents/legal-brain.md §1, or an in-place illustrative marker. Flag any copy
// change here explicitly in the PR.
//
// The UGPP front no longer leads with `100%`: agents/legal-brain.md §7 marks
// every sanction percentage ⚠ verificar (secondary sources only), and §2/§6
// treat such a value as unavailable. What is sourced is who the UGPP charges —
// the client, not the supplier (N-012, arts. 178-180) — so that is what the
// front states. design/normative-review.md R2-04.

type Frente = {
  /** Who acts / the front — mono eyebrow (user-facing). */
  frente: string;
  /**
   * Headline figure — or, where no verified figure exists, the claim itself.
   * Either way it must be sourced or marked illustrative via `source`.
   */
  stat: string;
  /** Provenance of `stat`, rendered directly beneath it (user-facing). */
  source: string;
  title: string;
  body: string;
};

const FRENTES: Frente[] = [
  {
    frente: "UGPP",
    stat: "A ti",
    source: "Ley 1607/2012 · arts. 178-180",
    title: "Nómina disfrazada",
    body: "Si la UGPP considera que tu proveedor es un empleado encubierto, te reclama a ti los aportes que no se liquidaron, más la sanción que fije el régimen. El costo lo asumes tú, no él.",
  },
  {
    frente: "DIAN",
    stat: "35%",
    source: "Est. Tributario · art. 240",
    title: "Deducción en riesgo",
    body: "Deducir el pago depende de que tu empresa verifique los aportes del proveedor y pueda probarlo. Sin ese soporte la DIAN puede rechazar el gasto, y perder la deducción te cuesta la tarifa de renta.",
  },
  {
    frente: "Proveedores",
    stat: "14 d",
    source: "Cifra ilustrativa",
    title: "Pagos frenados",
    body: "Cada documento faltante bloquea un pago. El proveedor llama, se enfría la relación, y la próxima urgencia te va a costar más caro.",
  },
];

export function RiskSection() {
  return (
    <section className="border-t border-hairline">
      <div className="mx-auto max-w-5xl px-6 py-16 md:py-20">
        <div className="flex items-center gap-4">
          <SectionLabel as="p">03 · Lo que está en juego</SectionLabel>
          <span className="h-px flex-1 bg-hairline" aria-hidden="true" />
        </div>

        <h2 className="mt-8 max-w-3xl font-display text-display-md uppercase md:text-display-lg">
          Cada pago mal validado te pone la firma en un problema ajeno.
        </h2>

        <ul className="mt-16 grid gap-x-8 gap-y-12 md:grid-cols-3">
          {FRENTES.map((f) => (
            <li key={f.frente} className="border-t border-hairline pt-6">
              <p className="font-mono text-caption uppercase tracking-widest text-graphite">
                Frente · {f.frente}
              </p>
              <p className="mt-6 font-display text-display-lg leading-none text-ink">
                {f.stat}
              </p>
              <SourceNote>{f.source}</SourceNote>
              <h3 className="mt-3 font-display text-display-sm uppercase">
                {f.title}
              </h3>
              <p className="mt-4 text-body-lg text-graphite">{f.body}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
