import { SectionLabel } from "@/components/ui/section-label";
import { WhatsAppCta } from "@/components/ui/whatsapp-cta";
import { AVALA_EMAIL, handoffChannel } from "@/lib/handoff";

// §05 "Cierre" — the closing conversion.
//
// The conversation used to happen here, before the demo: a four-question
// conversational intake that asked for a pain, a volume and a name before it
// asked for a number. GA4 over 22 visitors: 3 sessions ever saw this section
// and 0 submitted a first answer. Removed 2026-08-21 — the conversation now
// happens where it actually belongs, on WhatsApp, with AVALA answering. The
// page's job is to open it, not to rehearse it.
//
// The `#contacto` id stays: it is an analytics contract, not just an anchor
// (design/analytics.md). Nothing links to it now — every CTA leaves for
// WhatsApp — but renaming it would break the section funnel.
//
// Copy is user-facing (Spanish, "tú" voice); flag any change in the PR.

const NEXT_STEPS = [
  {
    step: "01",
    title: "Nos escribes por WhatsApp",
    body: "El mensaje va escrito: solo lo envías. Sin formularios y sin llamada en frío.",
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
          <div>
            <p className="max-w-xl text-body-lg text-ink">
              Escríbenos y coordinamos la demo por ahí mismo. Es el canal por el
              que AVALA trabaja con tus proveedores, así que ya lo estás viendo
              funcionar.
            </p>

            <div className="mt-8">
              <WhatsAppCta location="cierre" label="Agenda una demo · 20 min" />
            </div>

            {/* The number is a placeholder-guarded constant: if it is ever
                blanked the CTA degrades to email, and this line has to say
                which one the visitor is about to open. */}
            <p className="mt-8 font-mono text-caption text-graphite">
              {handoffChannel === "whatsapp"
                ? "¿No se abre WhatsApp? Escríbenos a "
                : "¿No se abre tu correo? Escríbenos a "}
              <a
                href={`mailto:${AVALA_EMAIL}`}
                className="underline underline-offset-4 hover:text-ink focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink"
              >
                {AVALA_EMAIL}
              </a>
            </p>

            {/* claims-audit.md finding 16 — Ley 1581 de 2012 (agents/legal-brain.md
                N-019) requires authorization and a stated purpose. The landing no
                longer collects anything: the visitor hands over a number by
                writing to us. The notice stays, scoped to that act, because the
                purpose limitation and the deletion channel are still owed. */}
            <p className="mt-3 text-caption text-evidence">
              Al escribirnos autorizas a AVALA a contactarte por WhatsApp o
              correo para agendar la demo. Usamos tus datos solo para eso y los
              eliminamos cuando nos lo pidas en{" "}
              <a
                href={`mailto:${AVALA_EMAIL}`}
                className="underline underline-offset-4 hover:text-ink focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink"
              >
                {AVALA_EMAIL}
              </a>{" "}
              (Ley 1581 de 2012).
            </p>
          </div>

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
