// Google Tag Manager loader plumbing.
//
// The container ID is read from the environment rather than committed, so a
// build without it (local dev, PR previews) ships no analytics at all and
// cannot pollute production data. Because the site is a static export, this is
// inlined at BUILD time — changing the Vercel env var requires a redeploy.
export const GTM_ID = process.env.NEXT_PUBLIC_GTM_ID ?? "";

// Google's official async loader, minus the noscript iframe: the landing's
// demo and intake are React-driven, so a no-JS visitor has nothing to measure.
export function gtmSnippet(containerId: string): string {
  return `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});
var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';
j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;
f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','${containerId}');`;
}
