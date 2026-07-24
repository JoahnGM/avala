import { SectionLabel } from "@/components/ui/section-label";
import { Stamp } from "@/components/ui/stamp";

// §01 hero. Headline iterated 2026-07-23 with Joahn's explicit approval:
// leads with the concrete manual-review pain (UX-review P1) while keeping the
// broad "proveedores" positioning and the UGPP hook (red accent) in the second
// beat. Two-column layout (copy + a compact expediente preview) so the hero
// fills the width instead of floating as a narrow text column; tighter vertical
// padding. Stat figures are ILLUSTRATIVE and flagged in the UI. Flag any
// further copy change here explicitly in the PR.

type Stat = { label: string; value: string; note: string };

const STATS: Stat[] = [
  { label: "Ahorro típico", value: "72%", note: "del tiempo de CxP" },
  { label: "Cuentas / mes", value: "1.400+", note: "validadas por AVALA" },
  { label: "Sanciones UGPP", value: "$0", note: "en clientes activos" },
];

const CHECKS = [
  "PILA feb-2026",
  "RUT vigente",
  "DIAN sin obligaciones",
  "Sin indicios de nómina",
];

function ExpedientePreview() {
  return (
    <div className="border border-hairline bg-paper p-6">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="font-mono text-caption uppercase tracking-widest text-graphite">
            Proveedor
          </p>
          <p className="mt-1 font-display text-display-sm uppercase">
            Talleres Bacatá S.A.S.
          </p>
          <p className="mt-1 font-mono text-data text-graphite">
            NIT 901.334.208-1
          </p>
        </div>
        <Stamp variant="approved" size="sm" />
      </div>

      <p className="mt-5 text-body text-graphite">
        Envió su cuenta de cobro{" "}
        <span className="font-mono text-ink">#0043</span> por{" "}
        <span className="font-mono text-ink">$4.850.000</span>. AVALA revisó sus
        documentos contra la fuente oficial y la dejó lista para pagar.
      </p>

      <p className="mt-6 font-mono text-caption uppercase tracking-widest text-graphite">
        Lo que AVALA revisó
      </p>
      <ul className="mt-3 space-y-2 font-mono text-data text-graphite">
        {CHECKS.map((check) => (
          <li key={check} className="flex gap-2">
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
          <SectionLabel as="p">§ 01 · Expediente</SectionLabel>
          <span className="h-px flex-1 bg-hairline" aria-hidden="true" />
        </div>

        <div className="mt-10 grid gap-10 md:grid-cols-[1.1fr_0.9fr] md:items-center md:gap-14">
          <div>
            <h1 className="font-display uppercase">
              <span className="block text-display-md md:text-display-lg">
                Deja de revisar proveedores a mano
              </span>
              <span className="mt-2 block text-display-sm md:text-display-md">
                y de temerle a la <span className="text-stamp">UGPP</span>.
              </span>
            </h1>

            <p className="mt-6 max-w-xl text-body-xl text-graphite">
              AVALA revisa PILA, RUT y DIAN de cada proveedor, corrige lo que
              falta por chat y te entrega cada cuenta de cobro lista para pagar.
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

        <div className="mt-14 grid gap-8 border-t border-hairline pt-8 sm:grid-cols-3">
          {STATS.map((s) => (
            <div key={s.label}>
              <p className="font-mono text-caption uppercase tracking-widest text-graphite">
                {s.label}
              </p>
              <p className="mt-3 font-mono text-display-md font-medium leading-none">
                {s.value}
              </p>
              <p className="mt-2 text-body text-graphite">{s.note}</p>
            </div>
          ))}
        </div>
        <p className="mt-6 font-mono text-caption uppercase tracking-widest text-graphite">
          Cifras ilustrativas
        </p>
      </div>
    </section>
  );
}
