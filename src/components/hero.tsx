import { CaseFile } from "@/components/case-file";
import { SectionLabel } from "@/components/ui/section-label";

// §01 hero. Positioning updated 2026-07-23 with Joahn's explicit approval:
// broadened from "cuentas de cobro" to managing suppliers, keeping the UGPP
// hook, as a two-beat headline. Stat figures are ILLUSTRATIVE and flagged in
// the UI. Flag any further copy change here explicitly in the PR.

type Stat = { label: string; value: string; note: string };

const STATS: Stat[] = [
  { label: "Ahorro típico", value: "72%", note: "del tiempo de CxP" },
  { label: "Cuentas / mes", value: "1.400+", note: "validadas por AVALA" },
  { label: "Sanciones UGPP", value: "$0", note: "en clientes activos" },
];

export function Hero() {
  return (
    <section>
      <div className="mx-auto max-w-5xl px-6 py-24 md:py-32">
        <div className="flex items-center gap-4">
          <SectionLabel as="p">§ 01 · Expediente</SectionLabel>
          <span className="h-px flex-1 bg-hairline" aria-hidden="true" />
        </div>

        <h1 className="mt-8 max-w-4xl font-display uppercase">
          <span className="block text-display-md md:text-display-lg">
            Valida y gestiona a tus proveedores
          </span>
          <span className="mt-2 block text-display-sm md:text-display-md">
            sin riesgo ante la <span className="text-stamp">UGPP</span>.
          </span>
        </h1>

        <p className="mt-8 max-w-2xl text-body-lg text-graphite">
          AVALA revisa PILA, RUT y DIAN de cada proveedor, corrige lo que falta
          por chat y te entrega cada cuenta de cobro lista para pagar.
        </p>

        <div className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-4">
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

        <div className="mt-16 grid gap-8 border-t border-hairline pt-8 sm:grid-cols-3">
          {STATS.map((s) => (
            <div key={s.label}>
              <p className="font-mono text-caption uppercase tracking-widest text-graphite">
                {s.label}
              </p>
              <p className="mt-3 font-display text-display-md leading-none">
                {s.value}
              </p>
              <p className="mt-2 text-body text-graphite">{s.note}</p>
            </div>
          ))}
        </div>
        <p className="mt-6 font-mono text-caption uppercase tracking-widest text-graphite">
          Cifras ilustrativas
        </p>

        <div className="mt-20">
          <CaseFile />
        </div>
      </div>
    </section>
  );
}
