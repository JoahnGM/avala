# design/ux-review.md — AVALA UX review

A repeatable, self-iterating UX review for any AVALA flow. It scores a flow
**1–5** against six principles, gives evidence-based feedback, and then
**iterates until every principle is ≥ 4** (the quality gate) or escalates a
decision it can't make alone.

This is the source of truth for the review. Invoke it with:

> "Run the UX review (`design/ux-review.md`) on `<flow>`."

`<flow>` can be a route/page, a single component, a set of screenshots, or —
preferred — the running preview (`http://localhost:3000`) inspected with the
browser tools alongside the source in `src/`.

---

## How the reviewer must behave

1. **Cite evidence, not vibes.** Every score names the specific element,
   copy string, color, or behavior that justifies it. "Feels cluttered" is not
   a finding; "four different status hues in the results panel" is.
2. **Never inflate a score to pass the gate.** If a principle is a 3, it is a
   3. Iterate the design, don't iterate the grading.
3. **Flag trade-offs.** If a fix for one principle lowers another, say so
   instead of silently shipping it.
4. **Respect `CLAUDE.md` governance while fixing.** Don't hardcode tokens
   (extend the token set first), ship a test with every UI change, keep
   user-facing copy in Spanish, and treat hero/value-prop copy as protected —
   changing it requires explicit human approval (see Escalation).

---

## Scoring rubric (anchored)

Each principle has a one-sentence job, what to inspect, and anchors for 1 / 3 /
5. Scores 2 and 4 interpolate. **The gate is 4**: a 4 means "no blocking
issue, only polish left"; a 5 means "exemplary, use as reference."

### 1 — Problem-First Anchor
**Job:** Can a first-time user state, in one sentence, the job this flow does
for *them*?
**Inspect:** the dominant headline, the first paragraph, section labels.
- **1** — No discernible job. Copy is brand- or feature-centric ("Bienvenido a
  AVALA", "Plataforma de validación inteligente"). The user cannot say what
  it's for.
- **3** — The job is present but buried or must be assembled from several
  elements; the stakes for the user aren't explicit.
- **5** — One sentence, above the fold, in the user's language and stakes, and
  it is the most prominent copy on the screen (e.g. *"Deja de revisar PILA y
  RUT a mano."*).

### 2 — Simplicity Metric (1-2-3)
**Job:** Exactly one obvious primary action, at most two secondary actions, and
the page passes the 3-second squint test.
**Inspect:** count actions by visual weight; run the squint test (below).
- **1** — Multiple competing primary CTAs of equal weight; more than two
  secondary actions exposed; squint test yields no single dominant element (or
  the dominant element is decorative).
- **3** — One primary action exists but it doesn't win the visual hierarchy,
  **or** 3–4 secondary actions compete; squint yields 2–3 co-equal elements.
- **5** — One visually dominant primary action; ≤ 2 secondary actions, the rest
  behind a "más" menu; squint test → the primary action or the JTBD headline is
  the *only* thing identifiable in 3 seconds.

**Running the squint test with the tooling:** zoom the preview out to ~25–33%
(or apply a heavy blur) and screenshot. Name the one element that survives. It
must be the primary action or the problem-anchor headline — nothing else.

### 3 — Elegance (Information Density vs Clutter)
**Job:** Information is separated by the lightest means that still works.
**Inspect:** status colors, borders vs shading, repeated labels.
- **1** — Four or more hues used for status; a border around every box; labels
  repeated on every row.
- **3** — Mixed discipline: hairlines in some places but heavy boxes in others;
  2–3 status hues; some repeated labels.
- **5** — One accent hue with **intensity/weight** variations for state;
  separation by hairline or subtle shading, not boxes; labels hoisted into
  column/section headers.

> **AVALA-specific:** `approved` (green) is reserved **only** for a
> validated/APROBADO state (`tokens.md`). Any decorative use of it is an
> automatic clutter hit, because it destroys the signal.

### 4 — AVALA / Dataico Design Principles
**Job:** Does this look deliberately AVALA — simple, trustworthy, and *not*
generic AI SaaS — per `design/tokens.md` and `design/heuristics.md`?
**Inspect against:**
- `tokens.md`: palette, type roles (Archivo Black / Plex Sans / Plex Mono /
  Special Elite), dossier / asymmetric layout, the stamp signature element,
  voice & tone (close-professional "tú").
- `heuristics.md` #1: every repeated element renders through one shared
  `src/components/ui/` component — no per-section reimplementation.
- `CLAUDE.md`: no hardcoded colors/spacing/radii/type (tokens only), AA
  contrast + labels + keyboard nav, user-facing copy in Spanish.
- **1** — Generic template look (default gradients/violet, stock centered hero);
  hardcoded values; user-facing copy in English or corporate "usted" filler; a
  shared element reimplemented differently per section.
- **3** — On-brand palette/type, but drift: a hardcoded value, a shadowed card
  where a hairline belongs, an inconsistent component instance, or off-tone
  copy.
- **5** — Every choice maps to a token; dossier layout; `approved` discipline
  intact; all repeated elements come from `ui/`; copy in Spanish, "tú",
  concrete (PILA/RUT/DIAN/UGPP); passes AA.

### 5 — Logic Specification (state machine)
**Job:** For every state and branch, the user always knows exactly what to do
next — no dead ends, no under-specification.
**Inspect:** enumerate states and branches, then check each has a defined UI and
a defined next action (and a way back).
- **1** — Only the happy path exists. Loading / empty / error undefined. Dead
  ends: screens with no forward and no back action.
- **3** — Happy path plus some handling, but gaps: a missing loading state, an
  error with no recovery action, or an unhandled decision fork.
- **5** — Every state has a defined UI and next action; every branch is covered;
  no dead ends; back/exit always available; ambiguous outcomes (e.g. a
  "REVISAR" result) tell the user the exact next move.

**Coverage checklist (force each one):** initial · loading · empty · success ·
partial success · error / timeout · permission / denied · offline · and every
user decision fork. For AVALA, walk the real branches: document valid →
APROBADO; document invalid → REVISAR → WhatsApp correction → resubmit; supplier
never responds; wrong document type; expired RUT; PILA period mismatch.

### 6 — Storytelling / Concreteness
**Job:** Does the page make its mechanism tangible through a concrete, *named*
example — a supplier with a story — instead of abstract placeholders?
**Inspect:** hero/demo examples, case cards, any "sample" content.
**Origin:** added 2026-07-23 — the hero expediente preview listed "Caso #0001"
+ a filename + a checklist. It read like a form, not like *a supplier whose
invoice got cleared*. Concreteness is what makes the mechanism believable.
- **1** — Purely abstract: "Caso #0001", "documento", generic labels; no named
  actor, no narrative. Reads like a form or a spec.
- **3** — A concrete example exists but is thin: a filename / case number without
  a human subject or a before→after arc.
- **5** — A named, believable subject carries a mini-story — *who* it is, *what*
  AVALA reviewed, and the *outcome* — so the reader watches the mechanism happen
  to someone real (e.g. "Talleres Bacatá S.A.S. envió su cuenta #0043; AVALA
  revisó PILA/RUT/DIAN y la dejó lista para pagar"). Bonus: one coherent case
  threads across sections.

---

## Output format (exactly this shape)

Start with the summary table, then one section per principle, then the verdict.

```
## UX review — <flow name> — round <n>

| # | Principle              | Score | Gate (≥4) |
|---|------------------------|:-----:|:---------:|
| 1 | Problem-First Anchor   |  x/5  |  ✅/❌   |
| 2 | Simplicity (1-2-3)     |  x/5  |  ✅/❌   |
| 3 | Elegance               |  x/5  |  ✅/❌   |
| 4 | AVALA Principles       |  x/5  |  ✅/❌   |
| 5 | Logic Specification    |  x/5  |  ✅/❌   |
| 6 | Storytelling           |  x/5  |  ✅/❌   |

Overall: PASS (all ≥4) | FAIL (n principles below gate)
```

Then, per principle:

### `<n>. <Principle>` — `<score>`/5
- **Evidence:** the specific elements/behaviors observed.
- **Why this score:** mapped to the anchor above.
- **Fixes to reach ≥4:** concrete, ordered, each actionable in the codebase.

Close with a **Prioritized fix list** across all principles (highest score
impact first), and the **Escalations** (decisions a human must make).

---

## Iteration protocol (until every principle ≥ 4)

1. **Score** the flow and emit the report above (round 1).
2. If all principles are ≥ 4 → **PASS**, stop.
3. Otherwise, take the prioritized fix list and **apply the fixes** that don't
   require a human decision, honoring `CLAUDE.md` (tokens, tests, Spanish copy).
4. **Re-score only the changed principles** and emit round *n+1*, keeping a
   before→after column so the iteration is auditable.
5. Repeat from step 2. **Cap: 3 rounds.** If the gate still isn't met, stop and
   escalate — do not force the score.

**Escalate (don't fix silently) when a score needs:**
- A change to hero / value-proposition copy, or any copy flagged as protected.
- A change to the palette, typography, or base tokens.
- A product/scope decision (a missing state that implies new backend behavior,
  a new dependency, or a flow that doesn't exist yet).

Record each escalation as: *what's blocked, which principle, and the decision
needed.*

---

## Auditable score log (append one block per review)

```
### <date> — <flow> — <commit/PR>
Round 1:  P1 _ · P2 _ · P3 _ · P4 _ · P5 _ · P6 _
Round 2:  P1 _ · P2 _ · P3 _ · P4 _ · P5 _ · P6 _   (fixes: …)
Result:   PASS | escalated (<reason>)
```

### 2026-07-28 — full landing page — working tree on `a3476a7`

```
Round 1:  P1 5 · P2 4 · P3 4 · P4 3 · P5 3 · P6 5
Round 2:  P1 5 · P2 4 · P3 4 · P4 5 · P5 4 · P6 5
Result:   PASS
```

Run right after the `design/claims-audit.md` copy corrections landed, so this
round doubles as a check that fixing the claims didn't cost usability.

**P4 3 → 5.** Measured AA failure: the demo progress rail rendered upcoming
steps in `text-hairline` on `paper` — **1.28:1** at 12px against AA's 4.5:1, six
elements effectively invisible (`CLAUDE.md` rule 3). Fixed by carrying step state
in weight plus the existing ✓-vs-number marker instead of a third hue, so no new
token was needed. Also extracted `ui/source-note.tsx`: the figure-provenance
caption had been hand-repeated in `hero.tsx` and `risk-section.tsx`, a
`heuristics.md` #1 violation introduced by the claims fixes themselves. Verified
after: 99 text elements checked, **0 AA failures**; the 6 `SourceNote` instances
resolve to a single class string.

**P5 3 → 4.** Both cases ended `APROBADO`; `Stamp variant="revisar"` existed but
rendered nowhere on the page, and the "supplier never responds" branch — the one
the product exists for — was absent. Added a third case (`sinRespuesta`)
terminating in `REVISAR` with an explicit next action, moved the correction chat
out of inline JSX into per-case `FLOWS` data so a branch *can* end unresolved,
and added `← Paso anterior` so the stepper is no longer one-way. Not a 5: "wrong
document type" is still uncovered.

**Escalated, not invented:** how long AVALA waits before handing a silent
supplier back to the client, and what it offers then (insist / return / approve
at own risk). The UI state ships without an SLA number rather than fabricating
one.

**Left as polish:** every audit-log row in `trust-section.tsx` wraps to two lines
at both 820px and 1280px (measured 42px against a 21px line-height), which makes
a record meant to read as tabular look ragged. P3 is at gate, so not fixed here.
