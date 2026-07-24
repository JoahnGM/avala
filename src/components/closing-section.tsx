import { SectionLabel } from "@/components/ui/section-label";

// §06 "Cierre" — the closing CTA section. The page CTAs point to #contacto,
// so this <section> owns that id. Copy is user-facing (Spanish, "tú" voice);
// flag any change to it explicitly in the PR.

export function ClosingSection() {
  return (
    <section id="contacto" className="border-t border-hairline">
      <div className="mx-auto max-w-5xl px-6 py-24 md:py-32">
        <div className="flex items-center gap-4">
          <SectionLabel as="p">§ 06 · Cierre</SectionLabel>
          <span className="h-px flex-1 bg-hairline" aria-hidden="true" />
        </div>

        <h2 className="mt-8 max-w-3xl font-display text-display-md uppercase md:text-display-lg">
          Devuélvele a tu equipo la semana que se le va revisando PDFs.
        </h2>

        <p className="mt-8 max-w-2xl text-body-lg text-graphite">
          20 minutos. Traes una cuenta de cobro real y la validamos frente a ti.
          Sin instalar nada, sin compromiso.
        </p>

        <a
          href="mailto:hola@avala.co"
          className="mt-10 inline-block bg-stamp px-6 py-3 font-mono uppercase tracking-widest text-paper focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink"
        >
          Agenda una demo →
        </a>
      </div>
    </section>
  );
}
