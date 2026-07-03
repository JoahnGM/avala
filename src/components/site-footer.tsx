export function SiteFooter() {
  return (
    <footer className="border-t border-hairline">
      <div className="mx-auto flex max-w-5xl flex-wrap items-center gap-x-3 gap-y-2 px-6 py-8 font-mono text-caption text-graphite">
        <p>AVALA no sustituye asesoría contable o legal.</p>
        <span aria-hidden="true">·</span>
        <a
          href="mailto:contacto@avala.co"
          className="underline underline-offset-4 hover:text-ink focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink"
        >
          contacto@avala.co
        </a>
      </div>
    </footer>
  );
}
