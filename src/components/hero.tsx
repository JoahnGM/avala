import { CaseFile } from "@/components/case-file";

// Copy note: hero headline and value proposition are still under active
// validation (see CLAUDE.md) — flag any change here explicitly in the PR.
export function Hero() {
  return (
    <section className="mx-auto max-w-5xl px-6 py-16 md:py-24">
      <div className="grid gap-10 md:grid-cols-[10rem_1fr] md:gap-16">
        <p className="font-mono text-caption uppercase tracking-widest text-graphite">
          Avala
          <span className="mt-1 block">Validación de cuentas de cobro</span>
        </p>

        <div>
          <h1 className="font-display text-display-md uppercase md:text-display-lg">
            Deja de revisar PILA y RUT a mano.
          </h1>
          <p className="mt-6 max-w-xl text-body text-graphite">
            AVALA valida los documentos de tus proveedores, resuelve las
            correcciones por WhatsApp y te entrega cada cuenta de cobro lista
            para pagar.
          </p>
          <a
            href="#contacto"
            className="mt-8 inline-block bg-stamp px-6 py-3 font-mono text-data uppercase tracking-widest text-paper focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink"
          >
            Agenda una demo
          </a>
        </div>
      </div>

      <hr className="my-12 border-hairline" />

      <CaseFile />
    </section>
  );
}
