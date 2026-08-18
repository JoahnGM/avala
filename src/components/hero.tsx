import { SectionLabel } from "@/components/ui/section-label";

// §01 hero. Headline iterated 2026-07-23 with Joahn's explicit approval: leads
// with the concrete manual-review pain (UX-review P1) with the UGPP hook (red
// accent) in the second beat. Object corrected 2026-08-18 at Joahn's direction:
// what the team reviews by hand is the cuenta de cobro, not the proveedor.
//
// The stat row (`72%` · `1.400+` · the sanction claim) was removed 2026-08-18.
// Two of the three carried a "Cifra ilustrativa" marker directly under them:
// an invented figure labelled as invented is worse than no figure, and the space
// belongs to the live console instead. When real measurements exist, they come
// back with a source, not with a marker (design/claims-audit.md finding 9).
//
// The APROBADO stamp also left this preview: it is the signature element and it
// lands once, as the demo's payoff. Repeating it here spent it before the page
// had earned it.

// Each label must name a validation AVALA can actually perform. "PILA · último
// período" (not a current-month label) because contributions are paid mes
// vencido — the current month's planilla cannot exist yet. No
// disguised-employment check: that turns on subordinación, which no document
// here can evidence. See design/claims-audit.md findings 1, 4 and 5, and
// agents/legal-brain.md V-PILA-01 / V-RUT-02 / V-REC-01.
const CHECKS = [
  "PILA · último período",
  "RUT vigente",
  "Responsabilidades verificadas",
];

function ExpedientePreview() {
  return (
    <div className="border border-hairline bg-surface p-6">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="font-mono text-caption uppercase tracking-widest text-graphite">
            Proveedor · ejemplo
          </p>
          {/* A persona natural with a masked NIT: the regime AVALA validates —
              aportes de independientes — applies to natural persons, and a
              S.A.S. was outside agents/legal-brain.md §0 entirely.
              design/normative-review.md R2-01. */}
          <p className="mt-1 font-display text-display-sm uppercase">
            Julián Pardo Meneses
          </p>
          <p className="mt-1 font-mono text-data text-graphite">
            NIT 1.0XX.XXX.XXX-2
          </p>
        </div>
      </div>

      <p className="mt-5 text-body text-graphite">
        Envió su cuenta de cobro{" "}
        <span className="font-mono text-ink">#0002</span> por{" "}
        <span className="font-mono text-ink">$2.100.000</span>. AVALA revisó su
        planilla con el operador autorizado y su RUT en la DIAN, y la dejó lista
        para pagar.
      </p>

      <p className="mt-6 font-mono text-caption uppercase tracking-widest text-graphite">
        Lo que AVALA revisó
      </p>
      <ul className="mt-3 space-y-2 font-mono text-data text-graphite">
        {CHECKS.map((check) => (
          <li key={check} className="flex gap-2">
            {/* Not `approved` green: that token marks a validation that just
                resolved, and this is a static illustration. Keeping it out of
                the hero is what lets it mean something in the console. */}
            <span className="text-ink" aria-hidden="true">
              &#10003;
            </span>
            {check}
          </li>
        ))}
      </ul>
    </div>
  );
}

export function Hero() {
  return (
    <section>
      <div className="mx-auto max-w-5xl px-6 pt-8 pb-16 md:pt-10 md:pb-20">
        <div className="flex items-center gap-4">
          <SectionLabel as="p">01 · El problema</SectionLabel>
          <span className="h-px flex-1 bg-hairline" aria-hidden="true" />
        </div>

        <div className="mt-10 grid gap-10 md:grid-cols-[1.1fr_0.9fr] md:items-center md:gap-14">
          <div>
            <h1 className="font-display uppercase">
              <span className="block text-display-md md:text-display-lg">
                Deja de revisar cuentas de cobro a mano
              </span>
              <span className="mt-2 block text-display-sm md:text-display-md">
                y de temerle a la <span className="text-stamp">UGPP</span>.
              </span>
            </h1>

            <p className="mt-6 max-w-xl text-body-xl text-graphite">
              AVALA revisa la planilla y el RUT de tus proveedores, corrige por
              WhatsApp lo que falte y te entrega las cuentas de cobro listas
              para pagar.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-4">
              <a
                href="#contacto"
                className="bg-stamp px-6 py-3 font-mono text-data uppercase tracking-widest text-paper focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink"
              >
                Agenda una demo · 20 min
              </a>
              <span className="font-mono text-caption uppercase tracking-widest text-graphite">
                Sin instalar nada · Piloto sin costo
              </span>
            </div>
          </div>

          <ExpedientePreview />
        </div>
      </div>
    </section>
  );
}
