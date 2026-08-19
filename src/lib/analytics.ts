// Single entry point for measurement.
//
// Events are pushed to GTM's dataLayer; GTM decides what reaches GA4, so
// renaming or dropping an event is a Tag Manager change, not a redeploy. When
// no GTM container is configured the pushes simply accumulate in an array
// nobody reads — harmless, and it keeps the call sites free of guards.
//
// NEVER pass what the visitor typed. The intake collects a WhatsApp number and
// free-text answers; sending those to GA4 would breach Google's no-PII policy
// and the Ley 1581 de 2012 authorization the intake itself states. Measure the
// SHAPE of the funnel (which step, which case), never its content.
type EventParams = Record<string, string | number | boolean>;

declare global {
  interface Window {
    dataLayer?: Record<string, unknown>[];
  }
}

export function track(event: string, params: EventParams = {}): void {
  if (typeof window === "undefined") return;
  window.dataLayer = window.dataLayer ?? [];
  window.dataLayer.push({ event, ...params });
}
