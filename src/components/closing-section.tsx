import { ContactIntake } from "@/components/contact-intake";
import { SectionLabel } from "@/components/ui/section-label";

// §05 "Cierre" — the closing conversion. The page CTAs point to #contacto, so
// this <section> owns that id; the conversion itself is the conversational
// ContactIntake.
//
// P1-3 — "qué pasa después" sits beside the form. The nav asks for a demo and
// the form asked for a pain, with no statement of what pressing send does; a
// visitor who cannot predict the consequence does not press. Written without a
// response-time promise: an SLA nobody has agreed to is a fabricated number.
//
// Copy is user-facing (Spanish, "tú" voice); flag any change in the PR.

const NEXT_STEPS = [
  {
    step: "01",
    title: "Te escribimos por WhatsApp",
    body: "Al número que dejes, para cuadrar la hora. Sin llamada en frío.",
  },
  {
    step: "02",
    title: "Demo de 20 minutos",
    body: "Traes una cuenta de cobro real y la validamos frente a ti, con tus documentos.",
  },
  {
    step: "03",
    title: "Si encaja, piloto sin costo",
    body: "Empezamos con un grupo de proveedores tuyos. Sin instalar nada.",
  },
];

export function ClosingSection() {
  return (
    <section id="contacto" className="border-t border-hairline">
      <div className="mx-auto max-w-5xl px-6 py-16 md:py-20">
        <div className="flex items-center gap-4">
          <SectionLabel as="p">05 · Hablemos</SectionLabel>
          <span className="h-px flex-1 bg-hairline" aria-hidden="true" />
        </div>

        <h2 className="mt-8 max-w-3xl font-display text-display-md uppercase md:text-display-lg">
          Devuélvele a tu equipo las horas que se le van revisando PDFs.
        </h2>

        <div className="mt-12 grid gap-12 md:grid-cols-[1fr_0.8fr] md:gap-16">
          <ContactIntake />

          <div>
            <p className="font-mono text-caption uppercase tracking-widest text-graphite">
              Qué pasa después
            </p>
            <ol className="mt-6 space-y-6">
              {NEXT_STEPS.map((item) => (
                <li key={item.step} className="flex gap-4">
                  <span className="font-mono text-caption tracking-widest text-graphite">
                    {item.step}
                  </span>
                  <span>
                    <span className="block font-display text-display-sm uppercase">
                      {item.title}
                    </span>
                    <span className="mt-2 block text-body text-graphite">
                      {item.body}
                    </span>
                  </span>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
}
