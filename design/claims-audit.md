# design/claims-audit.md — AVALA claims audit

Every factual, regulatory or numeric claim the landing page makes, checked
against `agents/legal-brain.md`. Dated **2026-07-28**, against the copy at
commit `a3476a7`.

**Every copy finding was applied on 2026-07-28** at the user's explicit
instruction. Each entry below carries an `Applied` note recording what changed
and why that wording.

**Findings 11, 12 and 13 remain open, and copy cannot close them.** They are
validations the product does not perform — the contribution base, ARL, and the
`documento soporte`. Writing copy that claims them would create three new false
claims rather than fix anything, so they stay recorded as product gaps.

Note for review: this touched hero and value-proposition copy, which `CLAUDE.md`
puts under active validation. Flagging it explicitly here as that rule requires.

**Method.** The claims inventory came from a sweep of `src/`. Each claim was
checked against the normative index in `agents/legal-brain.md` §1 and the
validation rules in §4. Where the page states a number, the check was whether a
sourced figure exists; where it states a mechanism, the check was whether the
mechanism is possible as described.

**Verdicts.**

| Verdict | Meaning |
|---|---|
| `Inaccurate` | States something the law or the mechanism does not support |
| `Imprecise` | Directionally right, wrong as written — wrong actor, wrong certainty, or wrong period |
| `Unsupported` | May be true; no source exists in the repo |
| `Prohibited` | Asserts something `agents/legal-brain.md` §0 forbids an agent from asserting |
| `Contradiction` | Conflicts with another claim on the same page |
| `Gap` | Not a false claim — a validation the product sells but does not perform |

---

## Summary

| # | Claim | Location | Verdict | Status |
|---|---|---|---|---|
| 1 | `PILA feb-2026` · "no está al día con PILA cuando le pagas" | `hero.tsx:21`, `risk-section.tsx:28` | **Inaccurate** | **Applied** |
| 2 | `DIAN, UGPP y PILA` as `Fuentes oficiales` | `trust-section.tsx:39-47` | **Inaccurate** | **Applied** |
| 3 | "RUT vigente confirmado con la DIAN" | `demo-pipeline.tsx:207`, `trust-section.tsx:18` | **Inaccurate** | **Applied** |
| 4 | `DIAN sin obligaciones` | `hero.tsx:23`, `demo-pipeline.tsx:48` | **Inaccurate** | **Applied** |
| 5 | `Sin indicios de nómina` | `hero.tsx:24`, `demo-pipeline.tsx:49` | **Prohibited** | **Applied** |
| 6 | "la DIAN rechaza el gasto" | `risk-section.tsx:28` | **Imprecise** | **Applied** |
| 7 | `60%` under `Frente · UGPP` | `risk-section.tsx:20` | **Unsupported** | **Applied** |
| 8 | `0%` under `Frente · DIAN` | `risk-section.tsx:26` | **Unsupported** | **Applied** |
| 9 | `14 d`, `72%`, `1.400+` | `risk-section.tsx:32`, `hero.tsx:15-16` | **Unsupported** | **Applied** (marked in place) |
| 10 | `Sanciones UGPP · $0 · en clientes activos` | `hero.tsx:17` | **Unsupported** | **Applied** |
| 11 | No contribution-base validation anywhere | product-wide | **Gap** | **Open — product** |
| 12 | No ARL validation | product-wide | **Gap** | **Open — product** |
| 13 | No `documento soporte` | product-wide | **Gap** | **Open — product** |
| 14 | "Sin que muevas un dedo" vs "Nada sale sin tu aprobación" | `demo-pipeline.tsx:92,246` / `trust-section.tsx:85` | **Contradiction** | **Applied** |
| 15 | "de cada proveedor", "cada cuenta de cobro", "Cada validación" | `hero.tsx:90-91`, `trust-section.tsx:45` | **Unsupported** | **Applied** |
| 16 | No `tratamiento de datos` notice | `contact-intake.tsx` | **Gap** | **Applied** |
| 17 | Unmarked fictional suppliers with `APROBADO` stamp | `hero.tsx:36-42`, `demo-pipeline.tsx` | **Imprecise** | **Applied** (NITs still to verify) |

Line references are as audited at commit `a3476a7`. The applied corrections have
shifted lines throughout `src/`, so treat the column as a pointer to the claim,
not a current address.

**What is left.** Findings 11, 12 and 13 — the product validates document
presence while UGPP fiscalizes the correctness of the contribution base. That was
the deepest finding of the audit and it is the one copy could not touch. Finding
11 is the one to act on next.

---

## 1 — The planilla period cannot be the current month

> `PILA feb-2026` — `src/components/hero.tsx:21`
>
> "Si el proveedor no está al día con PILA cuando le pagas, la DIAN rechaza el
> gasto." — `src/components/risk-section.tsx:28`

**Verdict: Inaccurate.** Under `N-004` (Decreto 1273 de 2018) independent
contractors pay **mes vencido**: the planilla for period `M` is filed and paid
during `M+1`. So at the moment an invoice for service month `M` arrives, the
planilla for `M` does not exist and cannot. The latest verifiable period is
`M-1`.

Worked through (`agents/legal-brain.md` §8, example C): for a February 2026
invoice, February's planilla is paid in March. The check that can actually be
performed is **January's**. A check rendered as `PILA feb-2026 ✓` beside a
February invoice is either mislabelled or describes something impossible.

The `risk-section.tsx` sentence has the same defect in prose: "al día con PILA
cuando le pagas" is not a state a compliant contractor can be in for the current
period. As written, the page promises a validation that can never pass — which
is worse than an unsourced statistic, because a client could build a payment
policy on it and block every invoice they receive.

**Proposed correction.** Label the period explicitly as the last closed one
(`PILA ene-2026` for a February invoice, or a relative label such as `PILA ·
último período cerrado`), and rewrite the risk sentence around the verification
duty rather than the payment moment — see finding 6. Rule: `V-PILA-01`.

**Applied 2026-07-28.** The check label is now `PILA · último período` in
`hero.tsx` and in both `demo-pipeline.tsx` cases — a relative label rather than
a month, so it cannot go stale and it states the rule correctly. In
`risk-section.tsx` the phrase "cuando le pagas" became "del último período
cerrado", which removes the impossible condition.

The rest of that sentence was corrected under finding 6 in the same pass, so it
is now right about both the period and who bears the risk.

---

## 2 — UGPP is not a source you can query

> `Fuentes oficiales` / "DIAN, UGPP y PILA" / "Cada validación se apoya en la
> fuente autorizada, no en una copia intermediada."
> — `src/components/trust-section.tsx:39-47`

**Verdict: Inaccurate.** UGPP is the **fiscalizing authority** (`N-012`). It
determines contributions and imposes sanctions; it does not expose a public
service through which a contratante can query whether a given supplier paid.
Naming it as a per-validation "fuente autorizada" describes a data source that
does not exist.

What does exist, and is genuinely authoritative: the **planilla issued by an
authorised `operador de información`** (Aportes en Línea, SOI, Simple, and
others under `N-022`), and **DIAN's public RUT consultation** (`N-021`).

The page's own footer gets this right — "las fuentes públicas de la DIAN, la
UGPP y los operadores PILA autorizados" is defensible as a description of the
regime AVALA works within. The trust section escalates it into a claim about
every individual validation, which is where it breaks.

This is the highest-credibility-risk finding of the set, because it appears
under the heading `Por qué puedes confiar` and would be immediately recognised
as wrong by any Colombian payroll auditor — the exact reader the section is
written for.

**Proposed correction.** Name the operador PILA and DIAN as the sources, and
keep UGPP as the authority whose criteria AVALA validates against. Drop the
universal "cada validación" per finding 15.

**Applied 2026-07-28.** Heading is now `DIAN y operadores PILA`. Body: "Validamos
contra la planilla del operador autorizado y el RUT en la DIAN, no contra una
copia intermediada. Los criterios los pone la UGPP; cuando la norma cambia,
AVALA cambia contigo." UGPP keeps its real role, the two queryable sources are
named, and "cada validación" is gone. "Si la DIAN cambia" also became "cuando la
norma cambia" — the 2026 changes that matter here came from MinSalud and UGPP
(`N-006`, `N-007`), not DIAN.

---

## 3 — Receiving a document is not confirmation by an authority

> "Recibido. RUT vigente confirmado con la DIAN." —
> `src/components/demo-pipeline.tsx:207`
>
> `verificó DIAN · act 7410` — `src/components/trust-section.tsx:18`

**Verdict: Inaccurate.** In the demo the immediately preceding turn is the
supplier attaching `rut_actualizado.pdf`. A PDF arriving in a chat is a
document, not a confirmation by DIAN. The line collapses the two, and it does so
in the exact beat where the demo is meant to prove AVALA verifies against source
rather than taking the supplier's word for it — so the copy undercuts the claim
it is there to make.

The distinction is worth preserving in the product, not just the copy: `S-COR-08`
(receipt) and `S-COR-09` (DIAN portal actually queried) exist in
`agents/verbatim.es.md` precisely so an agent cannot blur them.

**Proposed correction.** Either "Recibido. Lo reviso y te confirmo." if the demo
depicts receipt, or "Consulté el estado de tu RUT en el portal de la DIAN:
aparece activo." if it depicts a real lookup. `act 7410` should either be
expanded (it reads as a CIIU code — 7410 is `Actividades especializadas de
diseño`) or dropped; an unexplained code in an audit log meant to demonstrate
auditability is decoration.

**Applied 2026-07-28.** The chat line is now the lookup version, taken verbatim
from `S-COR-09` in `agents/verbatim.es.md` — which also makes the demo the first
place in `src/` whose wording comes from the agent layer rather than being
invented inline. The audit log line became `verificó RUT en DIAN · activo`,
dropping the unexplained code and naming the same check the chat now describes.
A regression test asserts the old phrasing is absent
(`demo-pipeline.test.tsx`, `trust-section.test.tsx`).

---

## 4 — There is no DIAN status called "sin obligaciones"

> `DIAN sin obligaciones` — `src/components/hero.tsx:23`,
> `src/components/demo-pipeline.tsx:48`

**Verdict: Inaccurate.** No such status exists. What DIAN actually exposes about
a natural person, and what a validation can therefore assert, is: the **estado
del RUT** (activo / suspendido / cancelado), the **`responsabilidades`** codes,
and whether the person is among those **not obligated to invoice** under `N-014`
art. 8. "Sin obligaciones" sounds like a clean bill of tax health, which is not
something a RUT lookup can give.

**Proposed correction.** Replace with the check actually performed — `RUT
activo`, or `Responsabilidades verificadas`. Rules: `V-RUT-01`, `V-RUT-02`.

**Applied 2026-07-28.** Now `Responsabilidades verificadas` in `hero.tsx` and in
both `demo-pipeline.tsx` cases. `Responsabilidades` rather than `RUT activo`
because the adjacent item already reads `RUT vigente`; this way the two checks
name two distinct validations (`V-RUT-03` and `V-RUT-02`) instead of restating
one.

---

## 5 — AVALA cannot assess disguised employment

> `Sin indicios de nómina` — `src/components/hero.tsx:24`,
> `src/components/demo-pipeline.tsx:49`

**Verdict: Prohibited.** This is the highest-liability claim on the page. Shown
as a green ✓ beside PILA and RUT, it presents a disguised-employment assessment
as one more document check.

Under `N-015` an employment relationship requires personal service, **continuing
subordination**, and remuneration. Subordination is not observable in a planilla,
a RUT, or an invoice — it is about schedules, exclusivity, supervision, whose
premises and tools. No document set AVALA validates can establish or exclude it,
and the determination belongs to UGPP in a fiscalization or to a labor judge
under `primacía de la realidad`.

Two further problems. First, the claim is stated in the negative, which is the
harder direction: "no indications found" reads as a clearance, and a client who
relies on it has been told the one thing AVALA is least able to tell them.
Second, it contradicts the site's own footer — "AVALA no sustituye asesoría
tributaria ni contable" — since an employment-classification opinion is squarely
advisory.

**Proposed correction.** Remove the check. If the reclassification risk should
still be addressed, the honest version is that AVALA records the objective facts
and surfaces them for a human — `V-REC-01` and `L-ESC-01`. Note this cuts the
hero's check list from four to three, which is a design change, not just a copy
edit.

**Applied 2026-07-28.** Removed from the hero and from both `demo-pipeline`
cases; the check lists are now three items and describe only what the documents
can actually evidence. Regression tests assert `/indicios de nómina/i` is absent
from both components — this is the claim most likely to be re-added by someone
who reads a three-item list as looking thin.

---

## 6 — The deduction risk is the client's omission, not the supplier's

> "Si el proveedor no está al día con PILA cuando le pagas, la DIAN rechaza el
> gasto. Adiós beneficio tributario, hola reproceso contable."
> — `src/components/risk-section.tsx:28`

**Verdict: Imprecise.** The risk is real and the panel is worth keeping, but two
things are wrong.

**The actor.** Under `N-009` (Ley 1393 de 2010, arts. 26 y 27) and `N-010`
(art. 108 ET, parágrafo 2), the deduction is conditioned on **the contratante
verifying** the contractor's affiliation and payment. The consequential failure
is therefore the client's own — not having verified, or not being able to show
it. The sentence puts the supplier in the subject position, which points the
reader at the wrong remedy: chasing suppliers harder does not help if the
verification is never recorded.

**The certainty.** "la DIAN rechaza el gasto" states a determination as
automatic. Whether a deduction is challenged is DIAN's to decide in a review,
and `agents/legal-brain.md` §0 forbids an agent from asserting it. Copy is held
to the same line.

Also see finding 1 for the period defect in the same sentence.

**Proposed correction.** Reframe around the verification duty and the record:
the deduction depends on your company verifying and being able to prove it. That
is both accurate and a better argument for AVALA, since producing the auditable
record is something the product actually does.

**Applied 2026-07-28.** Body is now: "Deducir el pago depende de que tu empresa
verifique los aportes del proveedor y pueda probarlo. Sin ese soporte la DIAN
puede rechazar el gasto, y perder la deducción te cuesta la tarifa de renta."
The client is the subject, "rechaza" became "puede rechazar", and the title
changed from `Deducción perdida` to `Deducción en riesgo` to match. A regression
test asserts the old absolute phrasing is absent.

---

## 7 — `60%` has no subject, and a real 60% exists elsewhere

> `Frente · UGPP` / `60%` / `Nómina disfrazada` —
> `src/components/risk-section.tsx:19-22`

**Verdict: Unsupported.** Rendered at `display-lg` with no unit and no subject,
under a `UGPP` eyebrow and above the words `Nómina disfrazada`, it reads as a
reclassification prevalence statistic. Nothing in the repo sources it.

What makes this more than a placeholder problem: **there is a real 60% in the
UGPP sanction regime.** Under `N-012`/`N-013`, `inexactitud` determined
officially carries a sanction of **60% of the difference** between the amount
determined and the amount declared. So the figure is plausible enough to survive
review while being attached to entirely the wrong concept — the worst failure
mode for a number in a compliance product. A reader who knows the regime will
assume the label is what's wrong; a reader who doesn't will remember a
prevalence statistic that was never measured.

The sourced figures available (`agents/legal-brain.md` §7) are: `5%` per month
capped at `100%` for omission or late payment; `10%` per month capped at `200%`
after a `requerimiento`; `35%` of the difference for `inexactitud` corrected in
time; `60%` if determined officially.

**Proposed correction.** Either state a sourced legal figure with its label
("hasta 100% de los aportes omitidos", citing `N-013`) or keep the panel
qualitative and drop the number. `agents/legal-brain.md` §7 carries a
`⚠ verificar` on the exact percentages — confirm against the primary text of
`N-012`/`N-013` before publishing any of them.

**Applied 2026-07-28.** The stat is now `100%` with `Ley 1607/2012 · art. 179`
rendered directly beneath it, and the body states the basis: "te sanciona hasta
por el 100% de lo que no se liquidó". The `Frente` type gained a required
`source` field, so a figure cannot be added to this section without declaring
where it comes from. `100%` was chosen over the other three because it is the
omission/mora ceiling — the best-corroborated of the four figures. The
`⚠ verificar` in `agents/legal-brain.md` §7 still stands for all of them.

---

## 8 — `0%` states nothing

> `Frente · DIAN` / `0%` / `Deducción perdida` —
> `src/components/risk-section.tsx:25-28`

**Verdict: Unsupported.** As a headline statistic `0%` is semantically empty —
there is no quantity of which zero percent is the value. Presumably it gestures
at "you deduct 0% of the expense", but the body text already says that, and a
deduction is not partially disallowed by a percentage.

**Proposed correction.** Replace with a real quantity or drop the number and let
the panel run on its title and body. Whatever replaces it should not imply
automatic rejection — see finding 6.

**Applied 2026-07-28.** Replaced with `35%` sourced to `Est. Tributario · art.
240` — the general corporate income tax rate (art. 240 ET as modified by art. 10
of Ley 2277 de 2022, added to the brain as `N-024`). That is what losing a
deduction actually costs, so the card now carries a real quantity instead of an
empty one. Verified against current sources before publishing rather than
assumed.

---

## 9 — `14 d`, `72%`, `1.400+`

> `14 d` / `Pagos frenados` — `src/components/risk-section.tsx:32`
> `72%` / `del tiempo de CxP` — `src/components/hero.tsx:15`
> `1.400+` / `validadas por AVALA` — `src/components/hero.tsx:16`

**Verdict: Unsupported.** Ordinary pre-launch placeholders, correctly flagged
`Cifras ilustrativas` and correctly noted as illustrative in the source comments
at `hero.tsx:9` and `risk-section.tsx:4-6`. Recorded here for completeness
rather than as a defect.

Two notes. `1.400+ validadas por AVALA` is an operating-history claim, not a
benchmark — if AVALA has not validated 1.400 invoices a month, the illustrative
label does not make it safe, since a reader cannot tell an illustrative
benchmark from an overstated track record. And `closing-section.tsx:19`
("la semana que se le va revisando PDFs") implies a larger saving than 72%; if
one is calibrated the other should match.

**Proposed correction.** Replace with measured figures before launch. The unit
tests assert these strings exactly (`hero.test.tsx:33-36`,
`risk-section.test.tsx:21-23`), so each swap touches component and test
together — a deliberate gate, but note that no test currently marks them as
placeholders.

**Applied 2026-07-28 — marked, not replaced.** The figures themselves are
unchanged, because inventing measurements would be a worse defect than an
unsourced placeholder. What changed is that `Cifra ilustrativa` now renders
directly beneath each of `72%`, `1.400+` and `14 d`, and the distant
section-level `Cifras ilustrativas` captions were removed from both `hero.tsx`
and `risk-section.tsx`. That satisfies `design/heuristics.md` #2, which requires
the marking to sit next to the claim. `closing-section.tsx` also lost its
competing time claim: "la semana" became "las horas".

**Still needs you:** real measured figures for `72%`, `1.400+` and `14 d`.

---

## 10 — `$0` sanctions is unfalsifiable on a five-year clock

> `Sanciones UGPP` / `$0` / `en clientes activos` — `src/components/hero.tsx:17`

**Verdict: Unsupported.** Unlike its two neighbours this is not a benchmark but
a **verifiable regulatory-outcome claim about named clients**, and it carries
the most weight of anything in the hero for a reader who fears UGPP.

Two problems beyond sourcing. **Placement:** the only mitigation is `Cifras
ilustrativas` at `hero.tsx:124` — 12px, after all three stats, visually separated
from the figure it qualifies. A disclaimer that distant does not attach to this
specific claim. **Logic:** UGPP's fiscalization window runs years (`N-012`;
commonly stated as five, `⚠ verificar`), so a young client base showing zero
sanctions is the expected observation whether or not AVALA works. Absence of
sanction is not evidence of compliance — it is mostly evidence of elapsed time.

**Proposed correction.** Remove the stat, or replace it with something AVALA can
stand behind. The strong true statement is available and better:
**declaring or correcting before UGPP notifies a `requerimiento` removes the
omission and inexactitud sanctions altogether** (`N-012`). That is a sourced
mechanism, it is what AVALA actually accelerates, and it does not require a
claim about outcomes AVALA does not control.

**Applied 2026-07-28.** The stat is now `Sanción evitable · 100% · si corriges
antes del requerimiento`, sourced to `Ley 1607/2012 · art. 179`. It is the same
mechanism the audit recommended: correcting before UGPP notifies a
`requerimiento` removes the omission and inexactitud sanctions entirely. Sourced,
within AVALA's control, and a stronger claim than the one it replaced. A
regression test asserts both `$0` and `Sanciones UGPP` are gone.

---

## 11 — The product validates document presence; UGPP fiscalizes the base

**Verdict: Gap.** The deepest finding, and not a copy problem.

Everything the page shows AVALA checking is **presence and currency of
documents**: PILA exists for a period, RUT is current, DIAN shows nothing
outstanding. But what UGPP actually fiscalizes is whether the contribution was
liquidated on the **correct base** (`N-003`, `N-012`): 40% of the monthly
contract value net of IVA, floored at 1 SMMLV and capped at 25.

A supplier can hold a valid, fully paid, on-time planilla and still leave the
client exposed, because the planilla was liquidated on a base below 40% of the
contract. That is the single most common `inexactitud` in this population, and
the page's green `PILA feb-2026 ✓` would show it as compliant.

The demo's own numbers make this concrete (`agents/legal-brain.md` §8):

| Case | Invoice | 40% | vs. floor `$1.750.905` | Required IBC |
|---|---|---|---|---|
| Talleres Bacatá `#0043`, IVA excluded | `$4.850.000` | `$1.940.000` | above | `$1.940.000` |
| Talleres Bacatá `#0043`, IVA included at 19% | `$4.850.000` | `$1.630.252` | **below** | `$1.750.905` |
| Distribuidora Andes `#0002` | `$2.100.000` | `$840.000` | **below** | `$1.750.905` |

Three observations. The same invoice yields two different correct bases
depending on one unasked question — whether the amount includes IVA. For the
`$2.100.000` invoice the floor more than doubles the base, putting contributions
at roughly 24% of the invoice. And `Distribuidora Andes` is very likely a
different contributor type (`T-3`) from `Talleres Bacatá` (`T-1`), with a
different formula and different cost treatment — yet the demo runs both through
an identical check list.

**Proposed correction.** Add base validation to the product (`V-IBC-01` through
`V-IBC-05`) and show it in the demo. It is also the strongest available
differentiator: anyone can check whether a PDF exists.

**One related commitment.** `closing-section.tsx:23-24` offers "Traes una cuenta
de cobro real y la validamos frente a ti." That is the moment this gap becomes
visible: a real cuenta de cobro brings a real contract value, a real IVA
question and a real period, so a live validation that checks only document
presence will either surface findings 1 and 11 in front of the prospect or
quietly skip them. Worth closing the gap before the offer scales, and worth
briefing whoever runs those sessions in the meantime.

---

## 12 — ARL is missing, and part of it is the client's own obligation

**Verdict: Gap.** The check list is PILA, RUT, DIAN. ARL never appears.

Under `N-011` (Decreto 723 de 2013), for `prestación de servicios` contracts
longer than one month, affiliation to `riesgos laborales` is required, and **for
risk classes IV and V the contribution is paid by the contratante**, not the
contractor. That is a direct obligation of AVALA's client. A validation that
reports "supplier compliant" without resolving the risk class has omitted the
one contribution the client itself owes.

**Proposed correction.** Add `V-ARL-01` through `V-ARL-03`. `R-FAIL-ARL-02`
exists in `agents/verbatim.es.md` for the class IV–V case; a product that tells
a finance team about an obligation they did not know they had earns trust in a
way another green check does not.

---

## 13 — A `cuenta de cobro` is not sufficient tax support

**Verdict: Gap.** The whole product is framed on the `cuenta de cobro` — page
title, hero, demo, closing section. But under `N-014` (Resolución DIAN 000165 de
2023), when the supplier is **not obligated to invoice**, the buyer must
generate the electronic `Documento Soporte en Adquisiciones efectuadas a no
obligados a facturar`. The cuenta de cobro alone does not support the cost or
deduction.

This bears directly on the `Deducción perdida` panel: the page names a deduction
risk while omitting one of the requirements that actually conditions it, for
exactly the supplier profile — natural persons invoicing for services — that
AVALA is built around.

**Proposed correction.** Add `V-DSNO-01`. Worth considering whether AVALA should
generate the DSNO rather than merely flag it; it is adjacent to what the product
already does and it is a concrete obligation the client currently has to
remember on their own.

---

## 14 — Full automation contradicts the human-approval guarantee

> "De la cuenta de cobro al pago. Sin que muevas un dedo." —
> `demo-pipeline.tsx:92`
> "Tu equipo no escribe un solo mensaje." — `demo-pipeline.tsx:246`
> "Te avisamos: la cuenta quedó lista para pagar. Tú solo pagas." —
> `demo-pipeline.tsx:217`
>
> vs.
>
> "El botón de pagar sigue siendo tuyo, siempre. Nada sale sin tu aprobación."
> — `trust-section.tsx:84-85`
> "La aprobación final de cada pago la realiza el cliente." —
> `site-footer.tsx:24-25`

**Verdict: Contradiction.** §02 sells hands-off automation through to payment;
§04 and the footer promise the client approves everything. For a compliance
buyer these are not two framings of one idea — human sign-off is a control, and
"sin que muevas un dedo" describes its absence. Whichever the reader believes,
the other reads as marketing.

The strict reading reconciles them (no *review* work, but you still approve),
but "de la cuenta de cobro al pago" spans the approval step explicitly, so the
strict reading is not available.

**Proposed correction.** Make §02 about removing the *review* work rather than
the *decision*. The approval step is a feature in this category — the demo
already ends on an `APROBADO` stamp, so showing the client's approval as the
final beat would strengthen §02 rather than weaken it.

**Applied 2026-07-28.** The §02 heading became "De la cuenta de cobro al pago.
Sin revisar un solo PDF." — the removed work is now the *review*, not the
decision. The closing beat became "Te avisamos: la cuenta quedó lista. La
aprobación la das tú.", which agrees with `trust-section.tsx` and the footer.
"Tu equipo no escribe un solo mensaje" was left alone: it describes the
correspondence AVALA genuinely handles, and standing next to a heading that no
longer overclaims, it is accurate.

---

## 15 — Unqualified universals

> "AVALA revisa PILA, RUT y DIAN de **cada** proveedor … y te entrega **cada**
> cuenta de cobro lista para pagar." — `hero.tsx:90-91`
> "**Cada** validación se apoya en la fuente autorizada" —
> `trust-section.tsx:45`
> "… para que **cada** cuenta de cobro llegue lista para pagar." —
> `src/app/layout.tsx:37` (page metadata / search description)

**Verdict: Unsupported.** Each is a universal quantifier over an open set. Given
finding 2 (UGPP is not queryable per validation) and finding 5 (one of the
advertised checks cannot be performed at all), "cada" is not currently
supportable in either sentence.

**Proposed correction.** Qualify the scope. This is core messaging under
`CLAUDE.md`, so it needs explicit sign-off rather than a quiet edit.

**Applied 2026-07-28.** Hero subhead: "de cada proveedor" → "de tus
proveedores", "cada cuenta de cobro lista" → "las cuentas de cobro listas". The
page metadata in `src/app/layout.tsx` had the same universal and got the same
treatment. "Cada validación" went with finding 2. Applied under the explicit
instruction to fix all copy findings, which is the sign-off this rule asks
for.

---

## 16 — No data-processing notice on the intake form

**Verdict: Gap.** `src/components/contact-intake.tsx` collects four free-text
answers and a WhatsApp number, then hands them to `wa.me` (`:48-54`, `:89`).
There is no `tratamiento de datos` notice, no authorization checkbox, and no
privacy policy link anywhere on the page — the footer carries only the advisory
disclaimer and a copyright line.

`N-019` (Ley 1581 de 2012) requires authorization from the data subject and a
`política de tratamiento`. Beyond the obligation, this is a positioning problem:
a product whose pitch is "we keep you compliant" that collects personal data
without a notice invites exactly the scrutiny it is selling protection from.

Also in this area, and worth fixing before launch for a different reason:
`AVALA_WHATSAPP = "57XXXXXXXXXX"` (`contact-intake.tsx:13`) is still a
placeholder, so final submit opens `https://wa.me/57XXXXXXXXXX`. The test only
asserts the URL contains `wa.me` (`contact-intake.test.tsx:48`), so nothing
blocks it from shipping. That is a broken conversion path, not a claims defect,
but it sits in the same file.

**Proposed correction.** Add the notice and authorization, and a privacy policy
link. `© 2026 AVALA S.A.S.` (`site-footer.tsx:29`) also asserts a legal entity
with no NIT and no terms — cheap to complete and consistent with the positioning.

**Applied 2026-07-28.** A notice now sits directly beneath the intake box: "Al
enviar autorizas a AVALA a contactarte por WhatsApp o correo para agendar la
demo. Usamos tus datos solo para eso y los eliminamos cuando nos lo pidas en
hola@avala.co (Ley 1581 de 2012)." It carries authorization, purpose limitation,
and a deletion channel. No policy link, because no policy page exists — a link
to a missing page would be worse than none.

**Still needs you:** a `política de tratamiento de datos` page to link, AVALA's
NIT in the footer, and the real WhatsApp number (`AVALA_WHATSAPP` is still
`57XXXXXXXXXX`).

---

## 17 — Fictional suppliers presented as validated records

**Verdict: Imprecise.** The hero shows `Talleres Bacatá S.A.S.`, `NIT
901.334.208-1`, a `$4.850.000` invoice and an `APROBADO` stamp
(`hero.tsx:36-42`) with no marker that it is an example. The demo does the same
with `Distribuidora Andes S.A.S.`, `NIT 900.512.774-3`. No user-facing string
anywhere says the demo is simulated — the source comment at `demo-pipeline.tsx:12`
says so, but users don't read source.

Two aggravating details. `design/tokens.md:20-22` reserves `approved` green for
things that actually passed validation — "if it shows up, something was
approved" — and here it appears on fabricated records. And `SectionLabel`
already has an unused `secondary` slot whose own test uses the string
`"Conversación simulada"` (`section-label.test.tsx:23`), so the affordance for
labelling this was built and never wired up.

Both NITs appear well-formed. If either belongs to a real company, an unmarked
`APROBADO` stamp against its name is a concrete problem rather than a
presentational one.

**Proposed correction.** Mark the demo as simulated using the existing
`SectionLabel` `secondary` slot, and confirm the NITs are not assigned to real
entities.

**Applied 2026-07-28.** §02's label now reads `02 · Cómo funciona` with
`Demo simulada` on the second line, using the `SectionLabel` `secondary` slot
that already existed and had never been wired up — so this satisfies
`design/heuristics.md` #1 too, rather than adding parallel markup. The hero's
expediente eyebrow became `Proveedor · ejemplo`.

**Still needs you:** confirm `NIT 901.334.208-1` and `NIT 900.512.774-3` are not
assigned to real companies. The simulation labels reduce the risk but do not
remove it — those digits are still printed next to an `APROBADO` stamp.

---

## Not flagged

Stated so the audit is legible as a check rather than a list of complaints.
These claims were examined and hold up:

- **The footer disclaimer** (`site-footer.tsx:22-25`) is the most accurate
  regulatory sentence on the page. "Las fuentes públicas de la DIAN, la UGPP y
  los operadores PILA autorizados" correctly names the operadores and correctly
  places UGPP as part of the regime rather than a queryable service — the trust
  section should be brought down to this level, not the reverse.
- **"Nada sale sin tu aprobación"** (`trust-section.tsx:85`) is accurate and
  worth protecting; it is finding 14's other side that needs to change.
- **The mechanism claim** — that AVALA resolves document corrections with
  suppliers over WhatsApp and returns the invoice ready to pay — is coherent and
  is what the demo shows.
- **`Sin instalar nada · Piloto sin costo`** (`hero.tsx:102`) is a commercial
  claim, outside this audit's scope.
- **Voice and register** are consistent with `design/tokens.md` §Voice and tone
  throughout: `tú`, direct, no corporate filler.

---

## What this adds up to

The unsourced statistics were the visible problem and the least important one.
Three of them now carry a norm from `agents/legal-brain.md` §1; the three that
need a real measurement carry an illustrative marker next to the figure instead
of a caption two screens away.

The findings that mattered were the three where the page described a mechanism
that does not match the regime — a check that could never pass because
contributions are paid in arrears (1), a data source that does not exist (2), and
an assessment no document set can support (5). All three sat in the copy meant to
establish competence, and all three were the kind a Colombian payroll auditor
spots immediately. All three are fixed.

**What is left is finding 11, and it is still the deepest one.** The page sells
protection from UGPP exposure and demonstrates a validation of document presence,
while UGPP fiscalizes the correctness of the contribution base. Copy could not
close that — claiming a base check the product does not perform would just have
been a new false claim. So the page is now accurate about what AVALA does, and
what AVALA does is still narrower than the risk it sells against. The rules are
written and waiting (`V-IBC-01` through `V-IBC-05`); the product has to catch up
to them.

Two smaller things need a human rather than a decision: real figures for `72%`,
`1.400+` and `14 d`, and confirmation that the two demo NITs are not assigned to
real companies.
