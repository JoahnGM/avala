export function SiteHeader() {
  return (
    <header className="border-b border-hairline bg-paper">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
        <div className="flex items-center gap-3">
          <span className="font-display uppercase text-ink text-display-sm">
            AVALA
          </span>
          {/* P2-5 — "Proveedores · Colombia" read as a site FOR suppliers. */}
          <span className="hidden font-mono text-caption uppercase tracking-widest text-graphite sm:block">
            Pagos a proveedores · Colombia
          </span>
        </div>
        <nav aria-label="Acciones principales">
          <a
            href="#contacto"
            className="border border-stamp px-4 py-2 font-mono text-caption uppercase tracking-widest text-stamp hover:bg-stamp hover:text-paper focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink"
          >
            Agenda una demo
          </a>
        </nav>
      </div>
    </header>
  );
}
