import { SectionLabel } from "@/components/ui/section-label";

// §03 "Lo que AVALA no es" — replaces the old risk section (2026-08-18, Joahn's
// direction, from the AVALA ENGINE reference).
//
// Why the risk section went: it led with `Nómina disfrazada`, the one
// assessment agents/legal-brain.md §0 and V-REC-01 forbid AVALA from making —
// so the page opened its risk argument with the exposure it had explicitly
// disclaimed the ability to address (design/normative-review.md R2-06). Its
// other two fronts carried one unverified figure and one illustrative one.
// Positioning by negation says something true instead, and it is what the ICP
// actually fears: another tool to learn.
//
// The one consequence worth stating survives at the bottom, and it is the
// sourced one — the deduction depends on the client's own documented
// verification (N-009/N-010), not on a sanction percentage that §7 still marks
// ⚠ verificar.

const NOT_THIS = [
  "Un dashboard nuevo",
  "Migrar tu ERP",
  "Workflows de diez pasos",
  "Otro login para tu equipo",
  "Cambiar cómo pagas",
];

export function ManifestoSection() {
  return (
    <section className="border-t border-hairline">
      <div className="mx-auto max-w-5xl px-6 py-16 md:py-20">
        <div className="flex items-center gap-4">
          <SectionLabel as="p">03 · Lo que AVALA no es</SectionLabel>
          <span className="h-px flex-1 bg-hairline" aria-hidden="true" />
        </div>

        <h2 className="mt-8 max-w-3xl font-display text-display-md uppercase md:text-display-lg">
          No es un tablero más para que alguien lo revise.
        </h2>

        <p className="mt-8 max-w-2xl text-body-lg text-graphite">
          AVALA aparece cuando hay una cuenta que validar y desaparece el resto
          del tiempo. Tu equipo sigue trabajando donde ya trabaja.
        </p>

        <ul className="mt-10 flex flex-wrap gap-3">
          {NOT_THIS.map((item) => (
            <li
              key={item}
              className="border border-hairline px-4 py-2 font-mono text-data text-graphite line-through decoration-stamp decoration-2"
            >
              {item}
            </li>
          ))}
        </ul>

        <p className="mt-12 max-w-2xl border-t border-hairline pt-8 text-body-lg text-ink">
          Lo único que cambia es que, cuando pagas, tu empresa puede demostrar
          que verificó — y de eso depende que puedas deducir el pago.
        </p>
        <p className="mt-2 font-mono text-caption text-graphite">
          Ley 1393/2010 arts. 26-27 · E.T. art. 108 par. 2
        </p>
      </div>
    </section>
  );
}
