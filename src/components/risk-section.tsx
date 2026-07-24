import { SectionLabel } from "@/components/ui/section-label";

// Copy note: risk copy was validated with Joahn (2026-07) and expanded at his
// request (2026-07-23) into three explicit risks — UGPP, DIAN and stalled
// supplier payments. Flag any further change here explicitly in the PR, same
// as the hero messaging.

type Risk = {
  /** Source of the sanction / who acts — mono eyebrow (user-facing). */
  authority: string;
  headline: string;
  body: React.ReactNode;
};

const RISKS: Risk[] = [
  {
    authority: "UGPP",
    headline: "Te pueden cobrar a ti",
    body: (
      <>
        Si la relación se parece más a una nómina disfrazada que a un servicio
        independiente, el problema deja de ser del proveedor:{" "}
        <strong className="font-semibold text-ink">
          la UGPP puede cobrarte a ti
        </strong>{" "}
        los aportes, con intereses y sanción.
      </>
    ),
  },
  {
    authority: "DIAN",
    headline: "Pierdes la deducción",
    body: (
      <>
        Si el proveedor no está al día con PILA, la DIAN puede{" "}
        <strong className="font-semibold text-ink">
          desconocerte ese pago como gasto deducible
        </strong>{" "}
        — pagas el servicio y además pagas más impuesto.
      </>
    ),
  },
  {
    authority: "Proveedores",
    headline: "Se frena el pago",
    body: (
      <>
        Cada documento que falta detiene una cuenta de cobro. El proveedor
        espera semanas y tu equipo{" "}
        <strong className="font-semibold text-ink">
          persigue papeles en vez de operar
        </strong>
        .
      </>
    ),
  },
];

export function RiskSection() {
  return (
    <section className="border-t border-hairline">
      <div className="mx-auto grid max-w-5xl gap-10 px-6 py-16 md:grid-cols-[10rem_1fr] md:gap-16 md:py-24">
        <SectionLabel as="h2">El riesgo</SectionLabel>

        <div>
          <p className="max-w-2xl text-body text-graphite">
            Pagar una cuenta de cobro sin verificar los documentos tiene un
            costo que no se ve hasta que ya es tarde. Y son tres, no uno.
          </p>

          <ul className="mt-10 border-t border-hairline">
            {RISKS.map((risk) => (
              <li
                key={risk.authority}
                className="grid gap-2 border-b border-hairline py-6 md:grid-cols-[8rem_1fr] md:gap-8"
              >
                <p className="font-mono text-caption uppercase tracking-widest text-stamp">
                  {risk.authority}
                </p>
                <div>
                  <h3 className="font-display text-display-sm uppercase">
                    {risk.headline}
                  </h3>
                  <p className="mt-2 max-w-xl text-body text-graphite">
                    {risk.body}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
