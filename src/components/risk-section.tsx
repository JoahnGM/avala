// Copy note: risk copy was validated with Joahn (2026-07) — flag any change
// here explicitly in the PR, same as the hero messaging.
export function RiskSection() {
  return (
    <section className="border-t border-hairline">
      <div className="mx-auto grid max-w-5xl gap-10 px-6 py-16 md:grid-cols-[10rem_1fr] md:gap-16 md:py-24">
        <h2 className="font-mono text-caption uppercase tracking-widest text-graphite">
          El riesgo
        </h2>
        <p className="max-w-2xl text-body">
          Pagar sin verificar tiene un costo que no se ve hasta que ya es
          tarde. Si el proveedor no está al día con PILA, la DIAN puede
          desconocerte ese pago como gasto deducible. Y si la relación se
          parece más a una nómina disfrazada que a un servicio independiente,
          el problema deja de ser del proveedor y pasa a ser tuyo —{" "}
          <strong className="font-semibold">
            te pueden cobrar directamente a ti
          </strong>
          .
        </p>
      </div>
    </section>
  );
}
