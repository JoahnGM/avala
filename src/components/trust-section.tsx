// §04 "Por qué puedes confiar" — the trust section.
//
// P3-4 — this is the page's one act break. Every section lived on the same
// paper with 1px dividers, so the scroll read flat and §03 and §04 blurred
// together. Inverting to `ink` uses no new colour: paper on ink is 13.69:1, and
// secondary text moves to `hairline` (10.7:1) because `graphite` on ink is
// 3.08:1 and would fail AA.
// P3-6 — the third column carried three lines against six; it is the most
// important claim on the page and it read unfinished. It now holds its weight
// and carries the norm that makes it true.
// P1-5 — norm citations render in `hairline`, the light-ground equivalent of
// `evidence` on this inverted panel.

/** A single audit-log line, split into columns so it renders tabular. */
type LogLine = {
  time: string;
  actor: string;
  detail: string;
};

const AUDIT_LOG: LogLine[] = [
  { time: "10:14", actor: "AVALA", detail: "contactó al proveedor #0002" },
  { time: "10:17", actor: "PROV", detail: "entregó planilla_2026-07.pdf" },
  { time: "10:17", actor: "AVALA", detail: "verificó RUT en DIAN · activo" },
  { time: "10:18", actor: "USER", detail: "aprobó pago · $2.100.000" },
];

export function TrustSection() {
  return (
    <section id="confianza" className="border-t border-hairline bg-ink text-paper">
      <div className="mx-auto max-w-5xl px-6 py-16 md:py-24">
        <div className="flex items-center gap-4">
          <p className="font-mono text-caption uppercase tracking-widest text-hairline">
            04 · Por qué puedes confiar
          </p>
          <span className="h-px flex-1 bg-paper/25" aria-hidden="true" />
        </div>

        {/* Visible eyebrow above carries the section number; this h2 gives the
            section a proper level-2 heading for assistive tech. */}
        <h2 className="sr-only">Por qué puedes confiar</h2>

        <div className="mt-16 grid gap-x-8 gap-y-16 md:grid-cols-3">
          {/* Block 1 — official sources */}
          <div className="border-t border-paper/25 pt-6">
            <p className="font-mono text-caption uppercase tracking-widest text-hairline">
              Fuentes oficiales
            </p>
            {/* claims-audit.md finding 2: UGPP is the authority that
                fiscalizes, not a service you can query about a third party. */}
            <h3 className="mt-6 font-display text-display-sm uppercase">
              DIAN y operadores PILA
            </h3>
            <p className="mt-4 text-body-lg text-hairline">
              Validamos contra la planilla del operador autorizado y el RUT en
              la DIAN, no contra una copia intermediada. Los criterios los pone
              la UGPP; cuando la norma cambia, AVALA cambia contigo.
            </p>
          </div>

          {/* Block 2 — auditable record, with a mini audit log below the copy */}
          <div className="border-t border-paper/25 pt-6">
            <p className="font-mono text-caption uppercase tracking-widest text-hairline">
              Registro auditable
            </p>
            <h3 className="mt-6 font-display text-display-sm uppercase">
              Cada acción, con firma
            </h3>
            <p className="mt-4 text-body-lg text-hairline">
              Todo lo que AVALA hace queda registrado. Ese registro es tu
              soporte: la ley condiciona la deducción del pago a que tu empresa
              verifique los aportes del proveedor y pueda probarlo.
            </p>
            <ol className="mt-6 space-y-1 font-mono text-caption text-hairline">
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
          <div className="border-t border-paper/25 pt-6">
            <p className="font-mono text-caption uppercase tracking-widest text-hairline">
              Humano en el loop
            </p>
            <h3 className="mt-6 font-display text-display-sm uppercase">
              Tú firmas al final
            </h3>
            <p className="mt-4 text-body-lg text-hairline">
              AVALA prepara la cuenta y explica cada decisión con la regla que
              aplicó. El botón de pagar sigue siendo tuyo, siempre: nada sale
              sin tu aprobación.
            </p>
            <p className="mt-4 text-body-lg text-hairline">
              No es una preferencia de producto. La verificación de los aportes
              es una obligación de tu empresa, y ninguna herramienta puede
              asumirla por ti — lo que sí puede es dejarte con qué probarla.
            </p>
            <p className="mt-4 font-mono text-caption text-hairline">
              Ley 1393/2010 arts. 26-27 · E.T. art. 108 par. 2
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
