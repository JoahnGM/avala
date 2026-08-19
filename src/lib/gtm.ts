// Google Tag Manager loader plumbing.
//
// The container ID is public by design: every visitor's browser needs it to
// fetch the container, so it ships in the page either way. Keeping it here
// rather than in an env var means a deploy needs no dashboard step. Setting
// NEXT_PUBLIC_GTM_ID overrides it if the container ever changes, and setting it
// to an empty string is the kill switch.
export const GTM_ID = process.env.NEXT_PUBLIC_GTM_ID ?? "GTM-K5TWMVBC";

// Only the live site is measured. Preview builds and local dev serve the same
// HTML, and without this guard they would file their traffic as production —
// at MVP volumes a handful of our own visits is enough to move every rate we
// watch. The check is at runtime because a static export has no build-time
// notion of the host it will be served from.
export const MEASURED_HOSTS = ["avala.lat", "www.avala.lat"];

// Google's official async loader, minus the noscript iframe: the landing's
// console and intake are React-driven, so a no-JS visitor has nothing to
// measure.
export function gtmSnippet(
  containerId: string,
  hosts: string[] = MEASURED_HOSTS,
): string {
  return `(function(w,d,s,l,i,h){if(h.indexOf(w.location.hostname)<0)return;
w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});
var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';
j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;
f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','${containerId}',${JSON.stringify(hosts)});`;
}
