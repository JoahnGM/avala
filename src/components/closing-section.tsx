import { ContactIntake } from "@/components/contact-intake";
import { SectionLabel } from "@/components/ui/section-label";

// §06 "Cierre" — the closing conversion. The page CTAs point to #contacto, so
// this <section> owns that id; the conversion itself is the conversational
// ContactIntake. Copy is user-facing (Spanish, "tú" voice); flag any change to
// it explicitly in the PR.

export function ClosingSection() {
  return (
    <section id="contacto" className="border-t border-hairline">
      <div className="mx-auto max-w-5xl px-6 py-16 md:py-20">
        <div className="flex items-center gap-4">
          <SectionLabel as="p">05 · Hablemos</SectionLabel>
          <span className="h-px flex-1 bg-hairline" aria-hidden="true" />
        </div>

        <h2 className="mt-8 max-w-3xl font-display text-display-md uppercase md:text-display-lg">
          Devuélvele a tu equipo la semana que se le va revisando PDFs.
        </h2>

        <p className="mt-8 max-w-2xl text-body-lg text-graphite">
          20 minutos. Traes una cuenta de cobro real y la validamos frente a ti.
          Sin instalar nada, sin compromiso.
        </p>

        <div className="mt-10">
          <ContactIntake />
        </div>
      </div>
    </section>
  );
}
