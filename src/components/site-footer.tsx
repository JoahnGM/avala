// Site footer — dossier-style closing block. Copy is user-facing (Spanish);
// flag any change to the legal disclaimer explicitly in the PR.

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

        <p className="mt-8 max-w-2xl text-caption text-graphite">
          AVALA no sustituye asesoría tributaria ni contable. Las validaciones
          se apoyan en las fuentes públicas de la DIAN, la UGPP y los operadores
          PILA autorizados en Colombia. La aprobación final de cada pago la
          realiza el cliente.
        </p>

        <p className="mt-8 font-mono text-micro text-graphite">
          © 2026 AVALA S.A.S.
        </p>
      </div>
    </footer>
  );
}
