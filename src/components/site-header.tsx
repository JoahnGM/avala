import { WhatsAppCta } from "@/components/ui/whatsapp-cta";

// The bar floats: the page is five sections long, so the ask has to survive the
// scroll. `paper` stays opaque — a translucent bar over the inverted §04 would
// put graphite text on ink.
//
// The CTA used to scroll to a form at the bottom of the page. It now opens
// WhatsApp directly (src/lib/handoff.ts): from the sticky bar the conversion is
// one tap from any scroll position, instead of a 7.6-screen trip to a form
// nobody filled in.
export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-hairline bg-paper">
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
          <WhatsAppCta location="header" variant="outline" note={false} />
        </nav>
      </div>
    </header>
  );
}
