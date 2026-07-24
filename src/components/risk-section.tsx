import { SectionLabel } from "@/components/ui/section-label";

// §03 "Lo que está en juego" — the risk section. Copy adapted from the Lovable
// reference at Joahn's direction (2026-07-23). The stat numbers are
// ILLUSTRATIVE for now and flagged as such in the UI — replace with real
// figures before launch. Flag any copy change here explicitly in the PR.

type Frente = {
  /** Who acts / the front — mono eyebrow (user-facing). */
  frente: string;
  /** Big headline number. Illustrative for now. */
  stat: string;
  title: string;
  body: string;
};

const FRENTES: Frente[] = [
  {
    frente: "UGPP",
    stat: "60%",
    title: "Nómina disfrazada",
    body: "Si la UGPP considera que tu proveedor es un empleado encubierto, te reclama los aportes y te aplica sanción. El costo lo asumes tú, no él.",
  },
  {
    frente: "DIAN",
    stat: "0%",
    title: "Deducción perdida",
    body: "Si el proveedor no está al día con PILA cuando le pagas, la DIAN rechaza el gasto. Adiós beneficio tributario, hola reproceso contable.",
  },
  {
    frente: "Proveedores",
    stat: "14 d",
    title: "Pagos frenados",
    body: "Cada documento faltante bloquea un pago. El proveedor llama, se enfría la relación, y la próxima urgencia te va a costar más caro.",
  },
];

export function RiskSection() {
  return (
    <section className="border-t border-hairline">
      <div className="mx-auto max-w-5xl px-6 py-24 md:py-32">
        <div className="flex items-center gap-4">
          <SectionLabel as="p">§ 03 · Lo que está en juego</SectionLabel>
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
              <h3 className="mt-3 font-display text-display-sm uppercase">
                {f.title}
              </h3>
              <p className="mt-4 text-body-lg text-graphite">{f.body}</p>
            </li>
          ))}
        </ul>

        <p className="mt-12 font-mono text-caption uppercase tracking-widest text-graphite">
          Cifras ilustrativas
        </p>
      </div>
    </section>
  );
}
