# design/normative-review.md — AVALA

Second-pass review of the live site against `agents/legal-brain.md`, run after
the normative layer landed. `design/claims-audit.md` audited the copy that
existed **before** the legal brain (commit `a3476a7`); this file audits the
corrected page **against the brain itself**, plus the two files the brain is
made of, and asks a different question:

> Not "is this claim sourced?" — the audit settled that — but
> **"does the page describe the regime the brain describes, and does it
> describe the product the rules actually cover?"**

Round 1 · dated **2026-08-18**, against commit `4812b1c`.

**Status.** `R2-03`, `R2-04` and `R2-15` were applied on **2026-08-18** at the
user's instruction — the tranche that is blocking and needs no design work.
Everything else is proposal only. Each finding carries the files it touches and
the tests it moves, so the rest can be sized and approved before it is written. Findings that touch hero or value-proposition copy are marked
**`⚑ aprobación`** per `CLAUDE.md` ("What the agent must NOT do without asking
first").

**Verdicts.** Same vocabulary as `design/claims-audit.md`, plus one:

| Verdict | Meaning |
|---|---|
| `Out of scope` | The page depicts a case the brain does not cover — new in this round |
| `Inaccurate` | States something the law or the mechanism does not support |
| `Imprecise` | Directionally right, wrong as written |
| `Contradiction` | Conflicts with another claim, or with a rule in `§4` |
| `Omission` | True as far as it goes; what is missing is what misleads |
| `Opportunity` | Not a defect — a claim the page could make truthfully and does not |

---

## Summary

| # | Finding | Where | Verdict | Severity |
|---|---|---|---|---|
| `R2-01` | Every demo supplier is an `S.A.S.` — a persona jurídica, outside the brain's entire scope | `hero.tsx:64`, `demo-pipeline.tsx:58-120` | **Out of scope** | **Blocking** |
| `R2-02` | The "Falta el RUT" case resolves a different rule than the one it fails | `demo-pipeline.tsx:73-104` | **Contradiction** | **Blocking** |
| `R2-03` | The footer still lists UGPP as a source, and calls the planilla public | `site-footer.tsx:23` | **Inaccurate** | **Applied** |
| `R2-04` | `100%` is published twice from a `⚠ verificar` table, citing a superseded article | `hero.tsx:36`, `risk-section.tsx:25` | **Imprecise** | **Applied** |
| `R2-05` | `R-OK-01` tells the client the base was checked — the product cannot check it | `agents/verbatim.es.md:99` | **Inaccurate** | **Blocking** |
| `R2-06` | The lead risk is `nómina disfrazada`, the one assessment `§0` forbids | `risk-section.tsx:24-31` | **Omission** | High |
| `R2-07` | The page never says documents-exist ≠ base-correct | site-wide | **Omission** | High |
| `R2-08` | `Cuenta de cobro lista para pagar` without the `documento soporte` the buyer owes | site-wide framing | **Omission** | High |
| `R2-09` | ARL clase IV–V is the client's own contribution; the page never mentions it | site-wide | **Omission** | Medium |
| `R2-10` | `PILA, RUT y DIAN` lists an authority as a document, in four places | `hero.tsx:119`, `demo-pipeline.tsx:247`, `contact-intake.tsx:38`, `layout.tsx:37` | **Imprecise** | Medium |
| `R2-11` | `Responsabilidades verificadas` never says against what | `hero.tsx:52`, `demo-pipeline.tsx:66` | **Imprecise** | Low |
| `R2-12` | The audit log is never connected to the deduction it exists to support | `trust-section.tsx:64` | **Opportunity** | High |
| `R2-13` | `Mes vencido` is obeyed in the labels and never explained to the reader | `demo-pipeline.tsx:247` | **Opportunity** | Medium |
| `R2-14` | Chat copy is duplicated from `verbatim.es.md` by hand, with no link | `demo-pipeline.tsx:82-133` | **Opportunity** | Medium |
| `R2-15` | The primary conversion opens an invalid WhatsApp link | `contact-intake.tsx:13` | — | **Applied** |

---

## Blocking

### `R2-01` · Every demo supplier is a persona jurídica

**Where.** `hero.tsx:64` (`Talleres Bacatá S.A.S.`, `NIT 901.334.208-1`) and all
three cases in `demo-pipeline.tsx` (`Talleres Bacatá S.A.S.`,
`Distribuidora Andes S.A.S.` `900.512.774-3`, `Servicios Chía S.A.S.`
`901.702.455-6`).

**Rule.** `agents/legal-brain.md` `§0`: scope is **natural persons** who invoice
the client and are therefore responsible for their own contributions — the four
types in `§3`. Every rule the page depicts is built on that: the `40%` IBC
(`N-003`), the `tipo de cotizante` values `3/57/59` (`N-022`), `mes vencido` for
independientes (`N-004`). An `S.A.S.` contributes as an **employer** for its own
payroll; none of those rules apply to it, and the `T-1..T-4` taxonomy has no
row for it.

Three further contradictions follow from the same choice:

1. **The document is wrong for the entity.** A `cuenta de cobro` is what a
   supplier *not obligated to invoice* issues (`N-014` art. 8). An `S.A.S.` is
   obligated to issue factura electrónica. The page's central object and its
   example suppliers cannot coexist.
2. **The NIT prefix contradicts the person.** `900`/`901` prefixes belong to
   personas jurídicas; a natural person's NIT is their cédula. Any reader in a
   Colombian finance team reads the NIT before the copy.
3. **`§3` uses these exact names as the anti-pattern.** "A supplier called
   `Distribuidora …` is *likely* `T-3` and one called `Talleres …` may be `T-1`
   or `T-3`, but 'likely' is not a classification — ask." The page picked its
   examples from the brain's warning about inferring type from a trade name.

**Proposal.** Convert all four cases to personas naturales, and show the
classification instead of implying it:

| Case | Proposed supplier | Tipo |
|---|---|---|
| Hero preview | `Andrés Villamil Rojas` · `NIT 79.4XX.XXX-4` | `T-1` |
| `limpio` | same as hero | `T-1` |
| `correccion` | `Julián Pardo Meneses` · `NIT 1.0XX.XXX.XXX-2` | `T-1` |
| `sinRespuesta` | `Marcela Ríos Gaitán` · `NIT 52.6XX.XXX-7` | `T-1` |

Masking the middle digits closes the open item "confirm the two demo NITs are
not assigned to real companies" permanently, and reads as a deliberate privacy
choice rather than a placeholder — appropriate for a compliance product.

Add one line to the `llega` stage, sourced to `Q-CLS-05`:

> `Contrato de prestación de servicios personales · base 40% del valor mensual`

That states the classification the brain says must be *asked*, not inferred, and
it is the single most competence-signalling line available on the page.

**Also fixes.** `correccion` currently opens with "Hola Julián" addressed to a
company — a naming inconsistency that disappears with the same change.

**Touches.** `hero.tsx`, `demo-pipeline.tsx` · **Tests:** `hero.test.tsx:59`
asserts the supplier name; `demo-pipeline.test.tsx` asserts case content. Add
one test per file asserting no `S.A.S.` renders in a `cuenta de cobro` case.

---

### `R2-02` · The "Falta el RUT" case resolves a rule it did not fail

**Where.** `demo-pipeline.tsx:73-104`.

**Rule.** The failing check is `RUT desactualizado (2023)` → `V-RUT-03`, whose
supplier ask is `S-COR-04` and whose client line is `R-FAIL-RUT-03`. The demo
closes it with `S-COR-09` — "Consulté el estado de tu RUT en el portal de la
DIAN y **aparece activo**" — which answers `V-RUT-01` (*estado activo*), a
different rule. A RUT can be perfectly active and years out of date; that is
precisely why `§4` carries both rules.

`verbatim.es.md` §D already warns that `S-COR-08` and `S-COR-09` "are not
interchangeable". The demo picked the one that does not close its own finding.

**Proposal — option A (recommended).** Keep `V-RUT-03` as the failure (it is the
more common real case) and close it honestly. Needs one new verbatim line:

> `S-COR-12` — Recibí tu RUT actualizado y confirmé la fecha de actualización.
> Con eso ya puedo seguir con la cuenta {{numero_cuenta}}.

**Option B.** Change the failing check to `RUT no aparece activo`, which makes
the existing `S-COR-09` correct with no new line — but drops the more realistic
scenario.

**Touches.** `demo-pipeline.tsx`, `agents/verbatim.es.md` (§D + the mapping
table) · **Tests:** `demo-pipeline.test.tsx:40` asserts the current line.

---

### `R2-03` · The footer reintroduces a finding the trust section already fixed

**Where.** `site-footer.tsx:23`:

> "Las validaciones se apoyan en las **fuentes públicas** de la DIAN, **la
> UGPP** y los operadores PILA autorizados en Colombia."

**Rule.** Two errors in one sentence. UGPP is the authority that fiscalizes and
exposes no service to query a third party — this is `claims-audit` finding 2,
corrected in `trust-section.tsx` and left standing here. And a planilla is not a
public source: it reaches AVALA through the authorised operador, with the
supplier's involvement.

**Proposal.**

> "Las validaciones se apoyan en la planilla del operador PILA autorizado y en
> la consulta del RUT en la DIAN. Los criterios de fiscalización los fija la
> UGPP. AVALA no sustituye asesoría tributaria ni contable, y la aprobación
> final de cada pago la realiza el cliente."

**Touches.** `site-footer.tsx` · **Tests:** add one to `site-footer.test.tsx`
mirroring `trust-section.test.tsx:63`, so the corrected claim is guarded in both
places rather than one.

**Applied 2026-08-18.** Copy replaced as proposed; `site-footer.test.tsx` now
asserts both real sources and rejects `fuentes públicas`, so the claim is
guarded on both sides instead of one.

---

### `R2-04` · `100%` is published from a `⚠ verificar` table

**Where.** `hero.tsx:36` (`Sanción evitable · 100% · si corriges antes del
requerimiento`) and `risk-section.tsx:25` (`Frente · UGPP · 100%`). Both cite
`Ley 1607/2012 · art. 179`.

**Rule.** Two problems.

1. **The figure is not available yet.** `§7` marks every sanction percentage
   `⚠ verificar`: corroborated by two secondary sources, never read against the
   primary text. `§2` and `§6` are explicit that an agent "treats a `⚠ verificar`
   value as unavailable, not as true". The page publishes one at display size,
   twice. Whatever binds an agent binds the landing more, since the landing has
   no conversation in which to qualify it.
2. **The citation names a superseded text.** `§1` records art. 179 of `N-012`
   as rewritten by art. 314 of `N-013` (Ley 1819 de 2016). The current
   percentages come from the rewrite; citing only the 2012 article points a
   diligent reader at text that no longer says this.

There is also a reading problem specific to the hero: `100%` labelled
`Sanción evitable` suggests the cap is what you avoid. What `§7` supports is
structural and stronger — correcting **before** the `requerimiento` removes the
omisión and inexactitud sanctions **entirely**.

**Proposal.**

- **Before launch:** read `N-012`/`N-013` against the primary text and clear the
  `⚠ verificar`. Until then, neither `100%` should ship.
- **Meanwhile, hero `⚑ aprobación`:** replace the numeric stat with the
  structural claim, which needs no unverified figure:
  `Sanción · Se elimina · si corriges antes del requerimiento` ·
  `Ley 1607/2012 art. 179, mod. Ley 1819/2016 art. 314`.
- **Everywhere:** citations to art. 179 must carry `mod. Ley 1819/2016 art. 314`.

**Touches.** `hero.tsx`, `risk-section.tsx`, and `agents/legal-brain.md` `§7`
once verified · **Tests:** `hero.test.tsx:35`, `risk-section.test.tsx:21,63`.

**Applied 2026-08-18.** Both `100%` figures are gone.

- Hero stat: `Sanción por omisión · Se elimina · si corriges antes del
  requerimiento`, cited `Ley 1607/2012 art. 179 · mod. Ley 1819/2016 art. 314`.
- UGPP front: the stat now answers *who pays* rather than *how much* — `A ti`,
  cited `Ley 1607/2012 · arts. 178-180` (`N-012`, determination powers, which
  is sourced), and the body drops `hasta por el 100%`.
- Both components carry a regression test refusing an unverified percentage,
  and `hero.test.tsx` also refuses the un-modified citation.

**Still open:** `§7` remains `⚠ verificar`. Reading `N-012`/`N-013` against the
primary text is what would let a percentage back onto the page.
**`⚑ aprobación`:** hero and risk copy changed — flagged per `CLAUDE.md`.

---

### `R2-05` · `R-OK-01` asserts a base check the product does not perform

**Where.** `agents/verbatim.es.md:99`:

> "Planilla del período {{periodo_anterior}} pagada, **base de aportes conforme
> al 40% del contrato**, salud y pensión al día, RUT activo."

**Rule.** `claims-audit` findings 11–13 record that the product performs no
`V-IBC-*` validation. `R-OK-01` is the line an agent says on **every** approved
account, so today it would assert on every single case exactly the check the
audit says does not exist — the same class of error the audit removed from the
site, now living one layer down where no one is auditing copy.

**Proposal.** Split the line by what was actually verified:

> `R-OK-01` — La cuenta {{numero_cuenta}} quedó revisada. Planilla del período
> {{periodo_anterior}} pagada, con salud y pensión, y RUT activo. Queda lista
> para que la apruebes.
>
> `R-OK-01b` (only when `V-IBC-02` has run) — … y la base liquidada corresponde
> al 40% del contrato.

Same treatment for `R-OK-02`, which states an `IBC_MIN` result the product
cannot currently compute.

**Touches.** `agents/verbatim.es.md` §C · **Tests:** none today (the verbatim
file is not yet wired to code — see `R2-14`).

---

### `R2-15` · The primary conversion is broken

`contact-intake.tsx:13` still holds `AVALA_WHATSAPP = "57XXXXXXXXXX"`. Every
completed intake opens `wa.me/57XXXXXXXXXX` — an invalid link, after the visitor
has answered four questions. Not a normative finding, but it is the only defect
here that costs a lead per occurrence.

**Applied 2026-08-18.** The hand-off now checks whether the number is real
(`/^\d{10,15}$/`) and falls back to a prefilled `mailto:hola@avala.co` carrying
the same four answers, so the lead lands somewhere either way. The closing
bubble and the fallback note follow the channel actually used. The test asserts
the hand-off URL never contains the placeholder.

**Closed 2026-08-18.** `AVALA_WHATSAPP` now holds the real number
(`573012441488`), so the intake hands off on WhatsApp as designed. The email
fallback stays in place as a guard against the number being blanked or mistyped
again, and the test asserts the hand-off reaches `wa.me/573012441488` with the
answers attached.

---

## Substantial — what the omission implies

### `R2-06` · The lead risk is the one assessment `§0` forbids

`risk-section.tsx:24-31` leads with `Nómina disfrazada`. `V-REC-01` and `§0`
prohibit AVALA from stating, implying or scoring whether a contractor is a
disguised employee, "including softened forms such as 'no indications found'" —
which is why `claims-audit` finding 5 removed `Sin indicios de nómina` from the
checks. The page therefore opens its risk section with the one exposure it has
explicitly disclaimed the ability to assess. Nothing in the copy is false; the
implicature is, because a risk stated on a product page reads as a risk the
product addresses.

**Proposal.** Re-anchor the front to what AVALA does, and say the boundary out
loud rather than leaving it to inference:

- **Frente · UGPP** → `Aportes incompletos o en mora`. AVALA detects the missing
  or unpaid planilla and gets it corrected before the `requerimiento`, which is
  the moment `§7` says the sanction is still avoidable.
- **Add one line** under the three fronts: "AVALA no determina si un contratista
  es un empleado encubierto — eso lo define la UGPP o un juez laboral. Lo que
  hace es dejar registrados los hechos y pasártelos."

The disclaimer is a credibility asset with this ICP: a compliance vendor that
names the edge of its own competence is the one a finance team believes about
the rest.

**Touches.** `risk-section.tsx` `⚑ aprobación` · **Tests:**
`risk-section.test.tsx:26,48`.

---

### `R2-07` · Documents-exist is not base-correct, and the page never says so

The rule under `V-IBC-02` is the sharpest sentence in the brain: "UGPP does not
fiscalize whether a planilla exists — it fiscalizes whether the base was right."
A supplier can hold a valid, fully paid planilla and still leave the client
exposed, because it was liquidated on a base below 40% of the contract.

The page promises document review and lets the reader supply the conclusion.
`claims-audit` 11 stays open as a product gap; what closes on the **page** today
is the boundary, not the gap.

**Proposal.** A fourth block in `trust-section.tsx`, `Alcance`:

> **Lo que revisamos, y lo que no**
> AVALA verifica que los documentos existan, estén vigentes y correspondan al
> período que se puede verificar. No liquida ni recalcula la base de aportes
> (IBC), que es lo que la UGPP fiscaliza — si quieres esa revisión, dínoslo en
> la demo.

Stating it converts an open gap into a qualified promise, and the closing
clause turns it into demand signal.

**Touches.** `trust-section.tsx` · **Tests:** new `trust-section.test.tsx` case.

---

### `R2-08` · The `cuenta de cobro` framing invites the DSNO mistake

`V-DSNO-01`: for a supplier not obligated to invoice, the **buyer** must
generate the electronic `documento soporte` (`N-014`). The brain names this as
"the gap most likely to surprise a client who believes a validated cuenta de
cobro is all they need" — and the entire page is framed as
`cuentas de cobro listas para pagar`.

`R-FAIL-DSNO-01` already exists in `verbatim.es.md`, so the agent layer says it
and the page does not.

**Proposal.** One line in the `Alcance` block from `R2-07`:

> "Si tu proveedor no está obligado a facturar, la cuenta de cobro por sí sola
> no es soporte suficiente: el documento soporte electrónico lo debe generar tu
> empresa (Resolución DIAN 000165 de 2023). AVALA te lo señala."

Truthful today, costs one sentence, and it is the highest-expertise line the
page could carry — most competitors' copy does not know this.

**Touches.** `trust-section.tsx` · **Tests:** new case.

---

### `R2-09` · The one contribution the client itself owes is absent

`V-ARL-02` (`N-011`): on `prestación de servicios` contracts over one month in
risk classes IV–V, the **contratante** affiliates and pays the ARL. `§4` is
blunt about it: an agent that reports "supplier is compliant" without resolving
the risk class has not told the client about the contribution the client owes.
`R-FAIL-ARL-02` exists in verbatim; the page is silent.

**Proposal.** Needs a product decision before copy:

- **(a)** AVALA reports it → say so, and it becomes a differentiator.
- **(b)** AVALA does not → list it in the `Alcance` block as not covered.

Recommend (a): resolving the risk class needs one question (`Q-AUD-08`), not a
new data source.

**Touches.** `trust-section.tsx`, product scope · **Tests:** follows the choice.

---

## Precision

### `R2-10` · `PILA, RUT y DIAN` lists an authority as a document

Four places: `hero.tsx:119` ("revisa PILA, RUT y DIAN de tus proveedores"),
`demo-pipeline.tsx:247` ("revisa los documentos: PILA, RUT y DIAN"),
`contact-intake.tsx:38` ("¿quién revisa hoy los documentos (PILA, RUT, DIAN)?"),
`layout.tsx:37` ("PILA, RUT y los demás documentos").

DIAN is the authority where the RUT is consulted (`N-021`); it is not a third
document. This is the exact shape of `claims-audit` finding 2, one level milder.
`los demás documentos` in the metadata also overstates coverage — there are two.

**Proposal.** `PILA y RUT` where the list is the point; where the source is the
point, "la planilla del operador autorizado y el RUT en la DIAN" — the phrasing
`trust-section.tsx` already uses.

**Touches.** four files, one string each `⚑ aprobación` (hero) · **Tests:**
`hero.test.tsx`, `demo-pipeline.test.tsx`.

---

### `R2-11` · `Responsabilidades verificadas` never says against what

`V-RUT-02` asks whether the RUT's `responsabilidades` are consistent with **the
service actually invoiced** — the comparison is the whole check, and the label
drops it.

**Proposal.** `Responsabilidades del RUT vs. servicio facturado`.

**Touches.** `hero.tsx`, `demo-pipeline.tsx` · **Tests:** `hero.test.tsx:94`.

---

## Opportunities — true today, not yet said

### `R2-12` · The audit log is the deduction evidence, and never says so

`trust-section.tsx:64` presents the log as generic diligence ("Todo lo que AVALA
hace queda registrado, listo para auditoría"). Under `N-009`/`N-010` and
`V-DED-01` it is something much more specific: the deduction of the payment is
conditioned on the **client's own** verification of affiliation and payment, and
on being able to evidence it. The log is that evidence.

This also resolves the tension the audit flagged between "tu equipo no toca
nada" and a duty that is legally the client's: AVALA performs the check, the
record proves the client discharged it.

**Proposal.**

> "Ese registro es tu soporte: la ley condiciona la deducción del pago a que tu
> empresa verifique la afiliación y los aportes del proveedor **y pueda
> probarlo** (Ley 1393/2010 arts. 26–27; E.T. art. 108 par. 2). AVALA te deja la
> constancia armada."

`R-OK-03` already says this to the client in chat. The page should say it too.

**Touches.** `trust-section.tsx` · **Tests:** new case.

---

### `R2-13` · `Mes vencido` is obeyed and never explained

The labels correctly say `PILA · último período` (`V-PILA-01`), but a reader who
does not know `N-004` reads it as vagueness — the page pays the cost of the
correction without collecting its credibility.

**Proposal.** One line under the checks in the `revisa` stage:

> "El período verificable es el anterior: los aportes se pagan mes vencido, así
> que la planilla del mes en curso todavía no existe (Decreto 1273 de 2018)."

**Touches.** `demo-pipeline.tsx` · **Tests:** new case.

---

### `R2-14` · Chat copy is hand-copied from `verbatim.es.md`

`demo-pipeline.tsx:82-133` carries verbatim lines as string literals, with a
comment admitting the two must be changed together "until the two are wired
together for real". `R2-02` is what that drift produces, and `R2-05` shows the
verbatim file itself can go wrong unwatched.

**Proposal.** Extract the lines to `src/content/verbatim.ts` as
`{ id, text }` records, have the demo reference them by ID, and add one test
asserting every ID used in `src/` exists in `agents/verbatim.es.md`. That makes
`heuristics.md` #2's "a lint rule could grep the `src/` tree" real for the copy
that matters most, and it is the precondition for auditing the agent layer the
way the site is now audited.

**Touches.** new `src/content/verbatim.ts`, `demo-pipeline.tsx` · **Tests:** new
`verbatim-sync.test.ts`.

---

## Carried forward, unchanged

- `72%`, `1.400+`, `14 d` remain unmeasured (`claims-audit` finding 9). Marked
  illustrative in place, which is honest, but three illustrative figures in one
  stat row reads as a placeholder page.
- `claims-audit` findings 11–13 remain open as product gaps. `R2-07`, `R2-08`
  and `R2-09` are the landing-level treatment of them, not a substitute.
- `N-002` (reforma pensional suspendida) is a standing `⚠ verificar`. Nothing on
  the page depends on it today — keep it that way.

---

## Suggested order

1. ~~`R2-15` (broken conversion), `R2-03`, `R2-04`~~ — **applied 2026-08-18**.
2. `R2-01` + `R2-02` — one PR: the demo cases are rewritten once, coherently.
3. `R2-05` — agent layer, before any agent ships against it.
4. `R2-07`, `R2-08`, `R2-12`, `R2-09` — one `Alcance` block plus the trust-section
   rewrite; the highest credibility gain per line on the page.
5. `R2-06`, `R2-10`, `R2-11`, `R2-13` — copy pass `⚑ aprobación`.
6. `R2-14` — structural, unblocks auditing the agent layer automatically.
