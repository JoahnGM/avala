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
  `page_view`, `scroll`, `section_view`, `cta_click`, `contact_email_click`.
  Tweak these in the GTM UI; don't add code for them.
- **Code-side (`src/lib/analytics.ts`)** — anything only React knows: the intake
  funnel and demo progress. GTM cannot observe component state.

Code events go through `track()`, which pushes to `dataLayer`. A single GTM tag
(`GA4 — eventos de la app`, triggered on `^(intake_|demo_|whatsapp_)`)
forwards them, so **adding a new `track()` call needs no GTM change.**

## Events

| Event | Fires when | Params | Defined in |
| --- | --- | --- | --- |
| `page_view` | automatic | — | GA4 enhanced measurement |
| `scroll` | 90% depth | — | GA4 enhanced measurement |
| `section_view` | section enters viewport | `section_id` | GTM (Element Visibility) |
| `cta_click` | "Agenda una demo" clicked | `cta_location`, `cta_text` | GTM (Click) |
| `contact_email_click` | `mailto:` clicked | — | GTM (Click) |
| `demo_start` | a console run begins (on screen) | `case_id` | `demo-pipeline.tsx` |
| `demo_completed` | the run reaches its outcome | `case_id` | `demo-pipeline.tsx` |
| `demo_replay` | "Ver de nuevo", same case | `case_id` | `demo-pipeline.tsx` |
| `demo_case_select` | switches to the other case | `case_id` | `demo-pipeline.tsx` |
| `intake_start` | first answer submitted | — | `contact-intake.tsx` |
| `intake_step` | each answer submitted | `step_index`, `question_key` | `contact-intake.tsx` |
| **`intake_complete`** | 4th answer submitted | — | `contact-intake.tsx` → key event |
| **`intake_handoff`** | hand-off window opens | `channel` (`whatsapp`/`email`) | `contact-intake.tsx` → key event |

`section_id` values come from the `id` on each `<section>`: `problema`, `demo`,
`alcance`, `confianza`, `contacto`. Renaming one breaks the funnel report — the
ids are an analytics contract, not just anchors.

## No personal data in events — non-negotiable

The intake collects free-text answers and a WhatsApp number. **None of it may
reach `dataLayer`.** It would breach Google's no-PII policy (grounds for account
deletion) and the Ley 1581 de 2012 authorization the intake itself states, in a
product that sells compliance rigour.

Track the *shape* of the funnel — `question_key`, `step_index` — never its
content. `tests/unit/tracking.test.tsx` asserts this and will fail if an answer
ever leaks into a push.

## Rates to watch

| Rate | Formula | A low number means |
| --- | --- | --- |
| Demo engagement | `demo_start` sessions ÷ sessions | visitors never reach the console |
| Demo completion | `demo_completed` ÷ `demo_start` | the run is too long or loses them |
| Intake start | `intake_start` ÷ sessions | a copy/CTA problem, not a product problem |
| Intake completion | `intake_complete` ÷ `intake_start` | too many questions — check `question_key` |

Funnel exploration in GA4: `page_view` → `section_view` (`demo`) →
`demo_start` → `cta_click` → `intake_start` → `intake_complete`.

**Below ~300–500 sessions/month these ratios swing on 2–3 people.** Read counts
and direction, not percentages. Don't A/B test on them yet.

## GA4 admin one-offs

Custom params are discarded from reports unless registered, and registration is
**not retroactive**:

- **Key events**: mark `intake_complete` and `intake_handoff`.
- **Custom dimensions** (event-scoped, name = param name): `cta_location`,
  `case_id`, `question_key`, `step_index`, `section_id`, `channel`.
- **Data retention**: 14 months (the 2-month default discards early history).
- **Internal traffic filter**: set to Active, not Testing, or team visits will
  be a large share of the first few hundred sessions.

## Verifying

GTM **Preview** (Tag Assistant) plus GA4 **DebugView** show events within
seconds. Standard reports lag 24–48h. GA4's "tag not detected" check is
unreliable for GTM-loaded tags — ignore it and trust DebugView.

## Gap

The critical flow has unit coverage but no Playwright e2e (CLAUDE.md rule 5);
Playwright isn't set up in this repo yet. Tracked separately.
