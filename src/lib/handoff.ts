// Where the landing's only conversion goes.
//
// Until 2026-08-21 the conversion was a four-question conversational intake at
// the bottom of the page. GA4 measured the result: of 20 sessions, 3 ever saw
// it and 0 submitted a first answer. It asked for an essay ("¿qué quieres
// resolver con tus proveedores?") before it offered a channel, 7.6 phone
// screens down. The ask is now the channel itself — one tap into WhatsApp with
// the message already written, from every section of the page.
//
// AVALA's WhatsApp: country code + number, digits only.
export const AVALA_WHATSAPP = "573012441488";
export const AVALA_EMAIL = "hola@avala.co";

/**
 * Whether AVALA_WHATSAPP is a usable number rather than a placeholder. This
 * used to hold `57XXXXXXXXXX`, and every conversion opened a dead wa.me link
 * (design/claims-audit.md finding 16). Now that the number IS the conversion,
 * a mistyped one takes the whole page down with it — hence the guard and the
 * email fallback below.
 */
export const whatsappReady = /^\d{10,15}$/.test(AVALA_WHATSAPP);

/** Which channel the CTA actually opens — measured, never assumed. */
export const handoffChannel: "whatsapp" | "email" = whatsappReady
  ? "whatsapp"
  : "email";

// Prefilled so the visitor never faces an empty message box, and so the lead
// arrives self-describing. User-facing copy: Spanish (CLAUDE.md).
const MESSAGE =
  "Hola AVALA, quiero una demo de 20 minutos para validar mis cuentas de cobro.";
const SUBJECT = "Quiero una demo de AVALA";

/** WhatsApp when the number is configured, email otherwise — never a dead link. */
export function handoffUrl(): string {
  if (whatsappReady) {
    return `https://wa.me/${AVALA_WHATSAPP}?text=${encodeURIComponent(MESSAGE)}`;
  }
  return `mailto:${AVALA_EMAIL}?subject=${encodeURIComponent(
    SUBJECT,
  )}&body=${encodeURIComponent(MESSAGE)}`;
}
