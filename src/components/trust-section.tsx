import { SectionLabel } from "@/components/ui/section-label";

// §05 "Por qué puedes confiar" — the trust section. This is a compliance /
// finance product, so the goal here is credibility: official sources, an
// auditable trail, and a human who signs off at the end. Copy is user-facing
// and stays in Spanish, "tú" voice. Flag any copy change here in the PR.

/** A single audit-log line, split into columns so it renders tabular. */
type LogLine = {
  time: string;
  actor: string;
  detail: string;
};

const AUDIT_LOG: LogLine[] = [
  { time: "10:14", actor: "AVALA", detail: "contactó al proveedor #0002" },
  { time: "10:17", actor: "PROV", detail: "entregó rut_actualizado.pdf" },
  { time: "10:17", actor: "AVALA", detail: "verificó DIAN · act 7410" },
  { time: "10:18", actor: "USER", detail: "aprobó pago · $2.100.000" },
];

export function TrustSection() {
  return (
    <section className="border-t border-hairline">
      <div className="mx-auto max-w-5xl px-6 py-16 md:py-20">
        <div className="flex items-center gap-4">
          <SectionLabel as="p">04 · Por qué puedes confiar</SectionLabel>
          <span className="h-px flex-1 bg-hairline" aria-hidden="true" />
        </div>

        {/* Visible eyebrow above carries the section number; this h2 gives the
            section a proper level-2 heading for assistive tech. */}
        <h2 className="sr-only">Por qué puedes confiar</h2>

        <div className="mt-16 grid gap-x-8 gap-y-16 md:grid-cols-3">
          {/* Block 1 — official sources */}
          <div className="border-t border-hairline pt-6">
            <p className="font-mono text-caption uppercase tracking-widest text-graphite">
              Fuentes oficiales
            </p>
            <h3 className="mt-6 font-display text-display-sm uppercase">
              DIAN, UGPP y PILA
            </h3>
            <p className="mt-4 text-body-lg text-graphite">
              Cada validación se apoya en la fuente autorizada, no en una copia
              intermediada. Si la DIAN cambia, AVALA cambia contigo.
            </p>
          </div>

          {/* Block 2 — auditable record, with a mini audit log below the copy */}
          <div className="border-t border-hairline pt-6">
            <p className="font-mono text-caption uppercase tracking-widest text-graphite">
              Registro auditable
            </p>
            <h3 className="mt-6 font-display text-display-sm uppercase">
              Cada acción, con firma
            </h3>
            <p className="mt-4 text-body-lg text-graphite">
              Todo lo que AVALA hace queda registrado, listo para auditoría.
            </p>
            <ol className="mt-6 space-y-1 font-mono text-caption text-graphite">
              {AUDIT_LOG.map((line) => (
                <li
                  key={`${line.time}-${line.detail}`}
                  className="flex gap-3 text-data"
                >
                  <span className="tabular-nums">{line.time}</span>
                  <span className="w-12 shrink-0 uppercase">{line.actor}</span>
                  <span>{line.detail}</span>
                </li>
              ))}
            </ol>
          </div>

          {/* Block 3 — human in the loop */}
          <div className="border-t border-hairline pt-6">
            <p className="font-mono text-caption uppercase tracking-widest text-graphite">
              Humano en el loop
            </p>
            <h3 className="mt-6 font-display text-display-sm uppercase">
              Tú firmas al final
            </h3>
            <p className="mt-4 text-body-lg text-graphite">
              AVALA prepara la cuenta y explica cada decisión. El botón de pagar
              sigue siendo tuyo, siempre. Nada sale sin tu aprobación.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
