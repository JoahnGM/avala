import { SectionLabel } from "@/components/ui/section-label";

// §01 hero.
//
// P1-1 — the promise used to be "deja de temerle a la UGPP", which §03 then
// contradicted: AVALA does not recalculate the IBC, and the base is precisely
// what UGPP fiscalizes. An informed reader finds that hole in one scroll. The
// promise is now the one the product actually keeps — the payment leaves with
// its support, which is what conditions the deduction (N-009/N-010) — and the
// red accent moved off "UGPP" with it, because the claim is no longer about
// fiscalization.
//
// P3-5 — the expediente card was removed rather than rebuilt. It was a white
// box with no elevation and no stamp, competing with the H1 while demonstrating
// less than the console two sections below. The headline takes the full width;
// the artifact argument belongs to §02, where it actually runs.
//
// Copy here is under active validation (CLAUDE.md): flag any further change.

export function Hero() {
  return (
    <section>
      <div className="mx-auto max-w-5xl px-6 pt-8 pb-16 md:pt-12 md:pb-20">
        <div className="flex items-center gap-4">
          <SectionLabel as="p">01 · El problema</SectionLabel>
          <span className="h-px flex-1 bg-hairline" aria-hidden="true" />
        </div>

        <h1 className="mt-12 max-w-4xl font-display uppercase">
          <span className="block text-display-md md:text-display-lg">
            Deja de revisar cuentas de cobro a mano
          </span>
          <span className="mt-2 block text-display-md md:text-display-lg">
            y de pagarlas <span className="text-stamp">sin soporte</span>.
          </span>
        </h1>

        <p className="mt-8 max-w-2xl text-body-xl text-graphite">
          AVALA revisa la planilla y el RUT de cada proveedor, le pide por
          WhatsApp lo que falte y te entrega la cuenta de cobro con el expediente
          armado — que es de lo que depende que puedas deducir el pago.
        </p>

        <div className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-4">
          <a
            href="#contacto"
            className="bg-stamp px-6 py-3 font-mono text-data uppercase tracking-widest text-paper focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink"
          >
            Agenda una demo · 20 min
          </a>
          <span className="font-mono text-caption uppercase tracking-widest text-graphite">
            Sin instalar nada · Piloto sin costo
          </span>
        </div>

        {/* P2-3 — without naming the incumbent, AVALA has no budget line to sit
            in. This is the alternative every prospect already pays for. */}
        <p className="mt-8 max-w-2xl text-body text-graphite">
          Hoy ese trabajo lo hace un auxiliar contable revisando PDFs, o tu
          contador externo cuando le alcanza el mes.
        </p>
      </div>
    </section>
  );
}
