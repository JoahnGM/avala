// Site footer — dossier-style closing block. Copy is user-facing (Spanish);
// flag any change to the legal disclaimer explicitly in the PR.
//
// The disclaimer used to name UGPP as one of the "fuentes públicas" the
// validations rest on — the same error design/claims-audit.md finding 2 fixed
// in trust-section.tsx and left standing here. UGPP fiscalizes and exposes no
// service to query a third party, and a planilla is not public: it reaches
// AVALA through the authorised operador. design/normative-review.md R2-03.

export function SiteFooter() {
  return (
    <footer className="border-t border-hairline bg-paper">
      <div className="mx-auto max-w-5xl px-6 py-12">
        <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-4">
          <p className="font-display text-display-sm uppercase">AVALA</p>
          <p className="font-mono text-caption text-graphite">
            Bogotá · Colombia ·{" "}
            <a
              href="mailto:hola@avala.co"
              className="underline underline-offset-4 hover:text-ink focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink"
            >
              hola@avala.co
            </a>
          </p>
        </div>

        <p className="mt-8 max-w-2xl text-caption text-evidence">
          AVALA no sustituye asesoría tributaria ni contable. Las validaciones
          se apoyan en la planilla del operador PILA autorizado y en la consulta
          del RUT en la DIAN. Los criterios de fiscalización los fija la UGPP.
          La aprobación final de cada pago la realiza el cliente.
        </p>

        <p className="mt-8 font-mono text-micro text-graphite">
          © 2026 AVALA S.A.S.
        </p>
      </div>
    </footer>
  );
}
