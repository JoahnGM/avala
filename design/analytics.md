# Measurement plan

How the landing is instrumented, and what the numbers are for. The MVP question
this exists to answer: **where do visitors stop believing us?**

## Setup

| Piece | Value | Where it lives |
| --- | --- | --- |
| GA4 property | `AVALA Landing` | analytics.google.com |
| GA4 measurement ID | `G-50MQK1Y1VL` | pasted into GTM only, never into this repo |
| GTM container | `avala.lat` (Web) | tagmanager.google.com |
| GTM container ID | `GTM-K5TWMVBC` | `src/lib/gtm.ts` |

The container ID lives in the repo rather than in an env var: it is public by
design — every visitor's browser needs it to fetch the container, so it ships in
the HTML either way — and keeping it in code means a deploy needs no dashboard
step. `NEXT_PUBLIC_GTM_ID` still overrides it, and setting that to an empty
string is the kill switch.

Preview builds stay out of the data through a **runtime host guard**
(`MEASURED_HOSTS`): the loader returns early unless the hostname is `avala.lat`
or `www.avala.lat`. The check has to be at runtime because a static export has
no build-time notion of the host it will be served from. At MVP volumes a
handful of our own preview visits is enough to move every rate below, so this
guard is load-bearing, not hygiene.

## Division of labour

- **GTM-side (no deploy needed)** — anything already visible in the DOM:
  `page_view`, `scroll`, `section_view`, `contact_email_click`. Tweak these in
  the GTM UI; don't add code for them.
- **Code-side (`src/lib/analytics.ts`)** — anything only React knows: demo
  progress, and the CTA. GTM cannot observe component state.

The CTA moved from GTM to code on 2026-08-21. It was specified as a GTM Click
trigger (`cta_click`), and when the funnel needed it, it had no data — so the one
question the report could not answer was whether visitors were refusing the ask
or never reaching it. A `track()` call in the shared CTA component cannot be
forgotten in a dashboard: it ships with the button.

Code events go through `track()`, which pushes to `dataLayer`. A single GTM tag
(`GA4 — eventos de la app`, triggered on `^(intake_|demo_|whatsapp_)`)
forwards them, so **adding a new `track()` call needs no GTM change.**

## Events

| Event | Fires when | Params | Defined in |
| --- | --- | --- | --- |
| `page_view` | automatic | — | GA4 enhanced measurement |
| `scroll` | 90% depth | — | GA4 enhanced measurement |
| `section_view` | section enters viewport | `section_id` | GTM (Element Visibility) |
| **`whatsapp_click`** | "Agenda una demo" clicked, in any of the five instances | `cta_location` (`header`/`hero`/`demo`/`alcance`/`cierre`), `channel` | `ui/whatsapp-cta.tsx` → key event |
| `contact_email_click` | `mailto:` clicked | — | GTM (Click) |
| `demo_start` | a console run begins (on screen) | `case_id` | `demo-pipeline.tsx` |
| `demo_completed` | the run reaches its outcome | `case_id` | `demo-pipeline.tsx` |
| `demo_replay` | "Ver de nuevo", same case | `case_id` | `demo-pipeline.tsx` |
| `demo_case_select` | switches to the other case | `case_id` | `demo-pipeline.tsx` |

The `intake_*` events are retired. They measured a four-question form that was
removed on 2026-08-21 (see **What the first 22 sessions said** below); the
`^intake_` branch of the GTM forwarding tag can stay, harmlessly, in case the
historical events are ever re-read.

**The conversion now leaves the site.** `whatsapp_click` is the last thing we
can observe: whether the visitor actually sends the message happens in WhatsApp,
where GA4 cannot follow. Sent messages have to be counted in AVALA's inbox and
compared against `whatsapp_click` by hand. That is a real loss of a funnel step,
and it was the price of the step nobody was completing.

`section_id` values come from the `id` on each `<section>`: `problema`, `demo`,
`alcance`, `confianza`, `contacto`. Renaming one breaks the funnel report — the
ids are an analytics contract, not just anchors.

## No personal data in events — non-negotiable

The landing no longer collects anything — that risk left with the intake form,
and it is the one good thing about the visitor typing in WhatsApp instead of
here. The rule stands anyway, because the next form someone adds will be the
tempting one: **nothing a visitor typed may reach `dataLayer`.** It would breach
Google's no-PII policy (grounds for account deletion) and the Ley 1581 de 2012
authorization stated at the ask, in a product that sells compliance rigour.

Track the *shape* of the funnel — which CTA, which case, which section — never
its content. `tests/unit/tracking.test.tsx` asserts that a CTA push carries
exactly `event`, `cta_location` and `channel`, so a param that could carry
content fails the build.

## Rates to watch

| Rate | Formula | A low number means |
| --- | --- | --- |
| Demo engagement | `demo_start` sessions ÷ sessions | visitors never reach the console |
| Demo completion | `demo_completed` ÷ `demo_start` | the run is too long or loses them |
| CTA rate | `whatsapp_click` sessions ÷ sessions | the page is not convincing, or the ask is not reachable |
| Where the ask lands | `whatsapp_click` split by `cta_location` | which section actually converts — if `hero` dominates, the proof below is not what sells |
| Messages actually sent | AVALA's inbox ÷ `whatsapp_click` | the hand-off breaks (wrong number, desktop without WhatsApp Web) |

Funnel exploration in GA4: `page_view` → `section_view` (`demo`) →
`demo_start` → `whatsapp_click`.

Build it **open**, not closed. Closed and ordered, it drops anyone who clicks
the header CTA before scrolling to §02 — which is now a normal, encouraged path
— and reports them as a step-2 loss that never converted.

**Below ~300–500 sessions/month these ratios swing on 2–3 people.** Read counts
and direction, not percentages. Don't A/B test on them yet.

## GA4 admin one-offs

Custom params are discarded from reports unless registered, and registration is
**not retroactive**:

- **Key events**: mark `whatsapp_click`. (`intake_complete` and
  `intake_handoff` can be unmarked; they can no longer fire.)
- **Custom dimensions** (event-scoped, name = param name): `cta_location`,
  `case_id`, `section_id`, `channel`. Registration is not retroactive, so
  register `cta_location` **before** the deploy lands or the first clicks come
  back as `(not set)`.
- **Data retention**: 14 months (the 2-month default discards early history).
- **Internal traffic filter**: set to Active, not Testing, or team visits will
  be a large share of the first few hundred sessions.

## What the first 22 sessions said

The first read of live data, 2026-08-21. Counts, not rates — at this volume a
percentage moves with two people.

| Step | Users |
| --- | --- |
| Arrives | 22 |
| `section_view` `demo` | 7 |
| `demo_start` | 5 |
| `intake_start` | 0 |
| `intake_complete` | 0 |

Section views per session: `problema` 19, `demo` 7, `alcance` 5, `confianza` 4,
`contacto` 3.

Two leaks, and neither was where the copy work had been going:

1. **Two thirds left before the console.** The page's whole argument is a live
   mechanism, and it sat 1.361 px down a 375-px-wide screen — 1,7 screens of
   scrolling. Whoever passed it kept going (7 → 5 → 4 → 3), so the back half of
   the page was never the problem; the entrance was.
2. **Five ran the console and none reached the ask.** There was no ask to
   reach: the page had exactly two CTAs, the sticky bar and §01, both scrolling
   to a form 7,6 screens down. `contacto` was seen by 3 sessions of 20, and the
   sticky CTA — on screen the entire time — produced at most those 3.

`demo_start` also turned out to measure the wrong thing: it fires when the
console is 35 % on screen, which is visibility, not intent, making step 3 a near
duplicate of step 2. It is kept as-is (it is a fine proxy for "the proof was
seen") but it is not a conversion signal.

**What changed as a result:** the four-question intake was deleted, the CTA now
opens WhatsApp directly from five points in the page, and clicks are measured
per `cta_location`. The next read should answer one question — which section's
ask gets pressed.

## Verifying

GTM **Preview** (Tag Assistant) plus GA4 **DebugView** show events within
seconds. Standard reports lag 24–48h. GA4's "tag not detected" check is
unreliable for GTM-loaded tags — ignore it and trust DebugView.

## Gap

The critical flow has unit coverage but no Playwright e2e (CLAUDE.md rule 5);
Playwright isn't set up in this repo yet. Tracked separately.
