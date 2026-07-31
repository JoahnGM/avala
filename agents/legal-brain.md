# agents/legal-brain.md — AVALA

The normative core for every AVALA agent. This is not background reading: it
is the only source an agent may rely on when it decides whether a supplier's
social security position is correct. If a rule an agent needs is not in §4, the
agent does not improvise it — it escalates per §5.

Scope is deliberately narrow: **payment of independent contractors (vendors)
and their contributions to the Colombian Sistema de Seguridad Social Integral,
calendar year 2026.** Everything outside that boundary is listed in §0 and is
out of scope, not merely undocumented.

Two conventions carry the whole document:

- **`N-xxx`** identifies a norm in §1. Every constant in §2 and every rule in
  §4 cites the `N-xxx` it comes from. A rule with no norm ID is a bug.
- **`⚠ verificar`** marks a statement that has not been confirmed against a
  primary source, together with what specifically needs checking. An agent
  treats a `⚠ verificar` value as unavailable, not as true. See §6.

Companion files: `agents/verbatim.es.md` holds every line an agent is allowed
to say; `agents/README.md` holds load order and the annual refresh protocol.

---

## §0 Scope and boundary

**In scope.** Natural persons who invoice AVALA's client for services or goods
and are therefore responsible for their own contributions: the four contributor
types in §3. Validation of the planilla, the RUT, the contribution base, and
the client's own verification duty.

**Out of scope.** Dependent employees (`contrato de trabajo`); pensioners who
also contract; contractors whose monthly income falls below 1 SMMLV; a person
who is simultaneously a dependent employee and a contractor; non-resident or
foreign vendors not subject to Colombian social security; public-sector
contracting rules; and the `régimen subsidiado`. These are excluded because no
rule for them has been sourced here — not because they are simple.

**The hard boundary.** An AVALA agent states rules and reports evidence. It
does **not**:

| Prohibited | Why |
|---|---|
| Render a legal, tax or accounting opinion | AVALA is not an advisor; the client's own footer disclaimer says so |
| Declare that a contractor is or is not a disguised employee | Turns on `subordinación` (`N-015`), which is assessed by UGPP in a fiscalization or by a labor judge — never from a planilla |
| Assert that DIAN *has* rejected or *will* reject a deduction | The deduction condition is the client's verification (`N-010`), and only DIAN determines rejection |
| Tell a supplier what to declare to DIAN or how to reduce a base | Advising a third party on their own tax position |
| Compute using a value marked `⚠ verificar` in §2 | An unverified constant is unavailable, per §6 |

**Rule:** the boundary is stated before the rules on purpose. An agent that
knows §4 but not §0 is more dangerous than one that knows neither, because it
will answer confidently in exactly the cases where being wrong costs the client
a sanction. When §0 and §4 appear to conflict, §0 wins.

---

## §1 Normative index

Status is as of **2026-07-28**. The `Estado` column is the most important one
in this document: two of the norms an agent is most likely to reach for are
suspended or repealed, and citing either is a substantive error.

| ID | Norma | What it fixes | Estado (2026-07-28) |
|---|---|---|---|
| `N-001` | Ley 100 de 1993 | Sistema de Seguridad Social Integral; salud and pensión regimes | **Vigente — governs 2026** |
| `N-002` | Ley 2381 de 2024 (reforma pensional) | New pillar-based pension system | **SUSPENDIDA** — Auto 841 de 2025, Corte Constitucional. **Do not cite as current law.** |
| `N-003` | Ley 1955 de 2019, art. 244 | IBC de trabajadores independientes: 40%; the three contributor categories | **Vigente** |
| `N-004` | Decreto 1273 de 2018 | Contributions paid **mes vencido**; IBC for `contrato de prestación de servicios personales` (adds art. 3.2.7.1 to `N-005`) | **Vigente** |
| `N-005` | Decreto 780 de 2016 (Único Reglamentario Salud) | Compiles the salud rules; art. 3.2.7.5 governs `presunción de costos` | **Vigente**, as modified by `N-006` |
| `N-006` | Decreto 379 de 2026 (2026-04-07) | Modifies art. 3.2.7.5 of `N-005`; moves `presunción de costos` from a fixed annex to a UGPP resolution | **Vigente desde 2026-04-09** |
| `N-007` | Resolución UGPP 532 de 2024 | `Costos presuntos` by CIIU activity | **Aplicable desde 2026-04-09**, activated by `N-006` |
| `N-008` | Decreto 1601 de 2022 | Former fixed `presunción de costos` annex | **DEROGADO** by `N-006`. **Do not apply.** |
| `N-009` | Ley 1393 de 2010, arts. 26 y 27 | The **contratante's** duty to verify affiliation and payment before performing the contract | **Vigente** |
| `N-010` | Estatuto Tributario, art. 108 par. 2 (added by art. 27 of `N-009`) | Conditions the deduction of payments to independent contractors on that verification | **Vigente** |
| `N-011` | Decreto 723 de 2013 | ARL affiliation for `prestación de servicios` contracts over one month; who pays by risk class | **Vigente** |
| `N-012` | Ley 1607 de 2012, arts. 178–180 | UGPP's determination powers, procedure, and sanction regime | **Vigente**, art. 179 as modified by `N-013` |
| `N-013` | Ley 1819 de 2016, art. 314 | Rewrites art. 179 of `N-012` — the current sanction percentages | **Vigente** |
| `N-014` | Resolución DIAN 000165 de 2023 | Electronic invoicing; `documento soporte en adquisiciones a no obligados a facturar` (DSNO); art. 8 lists who is not obligated to invoice | **Vigente** |
| `N-015` | Código Sustantivo del Trabajo, art. 23 + Constitución Política, art. 53 | The three elements of an employment relationship; `primacía de la realidad` | **Vigente** |
| `N-016` | Decreto 1469 de 2025 (2025-12-29) | SMMLV 2026 | **Vigente desde 2026-01-01** |
| `N-017` | Decreto 1470 de 2025 (2025-12-29) | Auxilio de transporte 2026 | **Vigente desde 2026-01-01** |
| `N-018` | Resolución DIAN 000238 de 2025 (2025-12-15) | UVT 2026 | **Vigente desde 2026-01-01** |
| `N-019` | Ley 1581 de 2012 | Habeas data; authorization required to process personal data | **Vigente** — applies to AVALA's own intake, see §5 |
| `N-020` | Sentencia C-276 de 2021, Corte Constitucional | Declared art. 193 of Ley 1955 de 2019 (`piso de protección social`) **inexequible**, effective 2023-06-20; left Decreto 1174 de 2020 without effect | **Vigente — piso de protección social does not exist in 2026** |
| `N-021` | Estatuto Tributario, art. 555-2 | RUT: registration and the obligation to keep it updated | **Vigente** |
| `N-022` | Resolución MinSalud 2388 de 2016 | PILA planilla types and `tipos de cotizante` | **Vigente** with later modifications. **Trap:** its text describes independent contributions as `anticipadas`; `N-004` later changed them to `mes vencido`. `N-004` controls. |
| `N-023` | Decreto 543 de 2026 (2026-05-29) | Modifies Decreto 1833 de 2016 on the `Programa de Subsidio al Aporte en Pensión` (subcuenta de solidaridad subsidies) | **Vigente** — **not applicable** to vendor validation; indexed only so agents do not mistake it for an IBC rule |
| `N-024` | Estatuto Tributario, art. 240 (mod. art. 10 of Ley 2277 de 2022) | General corporate income tax rate: `35%` | **Vigente** — sets what a lost deduction actually costs the client |

**Rule:** an agent may cite only the norms in this table, and must carry the
`Estado` with the citation whenever it names `N-002` or `N-008`. The most
common way to be confidently wrong about Colombian social security in 2026 is
to apply the pension reform (`N-002`) as if it were in force, or the repealed
cost annex (`N-008`) as if it still set the percentages. Both were live law in
recent drafts and both are dead now.

**On `N-002` specifically.** The reform was to take effect 2025-07-01. The
Corte Constitucional suspended it (Auto 841 de 2025) over a procedural defect;
the Cámara re-voted, and the substantive constitutionality ruling is still
pending with roughly 85 challenges accumulated. Until that ruling, **`N-001`
(Ley 100 de 1993) is the pension system.** `⚠ verificar` before any use: this
status changes the moment the Corte rules, and it is the single most
time-sensitive fact in this document.

---

## §2 Constants — calendar 2026

| Constant | Value 2026 | Source | Notes |
|---|---|---|---|
| `SMMLV` | `$1.750.905` | `N-016` | +23,0% over 2025 |
| `AUX_TRANSPORTE` | `$249.095` | `N-017` | **Not applicable to independent contractors** — indexed to prevent misuse |
| `UVT` | `$52.374` | `N-018` | +5,17% (IPC clase media, DANE, oct-2024–oct-2025) |
| `IBC_MIN` | `$1.750.905` (1 SMMLV) | `N-003` | Hard floor; applies even when 40% of income is lower |
| `IBC_MAX` | `$43.772.625` (25 SMMLV) | `N-003` | Hard cap |
| `IBC_PCT` | `40%` | `N-003` | Of monthly income or monthly contract value, **IVA excluded** |
| `TASA_SALUD` | `12,5%` | `N-001` | Full rate — no employer to split it with |
| `TASA_PENSION` | `16%` | `N-001` | Full rate |
| `FSP_UMBRAL` | `$7.003.620` (4 SMMLV) | `N-001` | Fondo de Solidaridad Pensional applies above this IBC |
| `FSP_SOLIDARIDAD` | `1%` | `N-001` | IBC above 4 SMMLV |
| `FSP_SUBSISTENCIA` | `0,2% → 1%` | `N-001` | Additional, by bracket — see table below |
| `UVT_15000` | `$785.610.000` | `N-018` | Ceiling of the `no envío de información` sanction |
| `PAGO` | `mes vencido` | `N-004` | Period `M` is paid during `M+1` |

Fondo de Solidaridad Pensional brackets, additional `subsistencia` component
on top of the 1% `solidaridad` component:

| IBC bracket | Additional |
|---|---|
| `> 16` to `17` SMMLV | `0,2%` |
| `> 17` to `18` SMMLV | `0,4%` |
| `> 18` to `19` SMMLV | `0,6%` |
| `> 19` to `20` SMMLV | `0,8%` |
| `> 20` SMMLV | `1,0%` |

`⚠ verificar` — the bracket table is corroborated by two secondary sources but
not yet read against the primary text of `N-001` and its reglamentario. It only
binds at IBC above 16 SMMLV (`$28.014.480`), which no current AVALA test case
reaches. Confirm before an agent uses it in a computation.

**Rule:** these values expire. An agent must treat every constant as valid only
for calendar 2026 and refuse to compute for a period outside that window rather
than carry a value forward — the 2026 SMMLV rose 23%, so a stale figure is not
a rounding error, it changes whether the floor binds. See §6.

---

## §3 Contributor taxonomy

Classification comes first, because it decides the IBC formula. An agent that
skips it will apply the wrong base and produce a confident wrong answer.

| ID | Type | IBC formula | Costs deductible |
|---|---|---|---|
| `T-1` | Independiente con **contrato de prestación de servicios personales** | `40%` of the monthly contract value, IVA excluded | **No** |
| `T-2` | Independiente **por cuenta propia** | `40%` of net income | Yes — real, or presumed per `N-007` |
| `T-3` | Independiente con **contrato distinto** a prestación de servicios personales | `40%` of net income | Yes — real, or presumed per `N-007` |
| `T-4` | **Rentista de capital** | `40%` of net income | Yes — real, or presumed per `N-007` |

**Rule:** `T-1` is the type that cannot deduct costs, and it is also the most
common vendor profile AVALA will see — a person invoicing for their own
professional or technical work with no materials and no subcontracting. Its IBC
is always 40% of the gross monthly contract value net of IVA, regardless of
what the contractor actually spent. Getting `T-1` wrong in either direction is
the highest-frequency error available: treating a `T-1` as `T-2`/`T-3` lets a
cost deduction through that the law does not allow, which understates the base
and is precisely what UGPP fiscalizes.

The discriminating questions live in `agents/verbatim.es.md` §A (`Q-CLS-xx`).
An agent must not infer the type from the supplier's trade name. A supplier
called `Distribuidora …` is *likely* `T-3` and one called `Talleres …` may be
`T-1` or `T-3`, but "likely" is not a classification — ask.

**On `presunción de costos` (`T-2`, `T-3`, `T-4`).** Since 2026-04-09 the
presumed-cost percentages are no longer in a decree annex. `N-006` moved them
to `N-007`, a UGPP resolution the UGPP can update on its own. Two consequences:
an agent must resolve the percentage against `N-007` by CIIU code at the time
of validation rather than from a cached table, and `N-008` must never be used.
`⚠ verificar` — the per-CIIU percentages of `N-007` have not been transcribed
here. Until they are, an agent handling `T-2`/`T-3`/`T-4` with claimed costs
escalates per §5 instead of computing.

**On the presumption's scope.** The `presunción de costos` is an administrative
facility for social security purposes only. It does not carry over to the
supplier's income tax return, where costs must meet the ordinary support
requirements of art. 107 ET. An agent must never tell a supplier the presumed
percentage is what they can deduct from their taxes — that is both wrong and
outside §0.

---

## §4 Validation rules

Each rule is one row. `Verbatim` names the IDs in `agents/verbatim.es.md` the
agent uses to ask and to answer; an agent never phrases these itself. Every
rule that applies to a case must pass before the agent reports `R-OK-01`; a
single fail branch blocks the invoice and the agent reports that branch's line
instead.

### Classification

| ID | Precondition | Evidence | Pass | Fail | Norma | Verbatim |
|---|---|---|---|---|---|---|
| `V-CLS-01` | A vendor invoice is in scope | Contract or its object; whether materials/subcontracting are involved | Type resolved to exactly one of `T-1`..`T-4` | Ambiguous or two types claimed | `N-003` | `Q-CLS-01`, `Q-CLS-02`, `Q-CLS-03`, `Q-CLS-04`; on `T-1` also `Q-CLS-05` |
| `V-CLS-02` | Type is `T-2`/`T-3`/`T-4` and costs are claimed | CIIU code; claimed costs | Percentage resolved against `N-007` | `N-007` not resolvable → **escalate** | `N-006`, `N-007` | `Q-AUD-08`, `Q-AUD-09`, `L-ESC-03` |

### Contribution base — the rules that address the UGPP exposure

| ID | Precondition | Evidence | Pass | Fail | Norma | Verbatim |
|---|---|---|---|---|---|---|
| `V-IBC-01` | Type resolved | Monthly contract value; whether the stated amount includes IVA | IVA identified and excluded from the base | IVA treatment unknown → **cannot compute** | `N-003` | `Q-AUD-03`, `Q-AUD-04` |
| `V-IBC-02` | Base net of IVA known | Declared IBC | Declared IBC `≥` 40% of that base | Declared IBC below it | `N-003` | `Q-AUD-05`, `R-FAIL-IBC-01` |
| `V-IBC-03` | 40% computed | Declared IBC | Result `≥ IBC_MIN` , else IBC `= IBC_MIN` | Declared IBC below `IBC_MIN` | `N-003`, `N-016` | `Q-AUD-05`, `R-FAIL-IBC-02`, `R-OK-02` |
| `V-IBC-04` | 40% computed | Declared IBC | Result `≤ IBC_MAX` , else IBC `= IBC_MAX` | Declared IBC above `IBC_MAX` | `N-003` | `Q-AUD-05`, `R-FAIL-IBC-03` |
| `V-IBC-05` | IBC `> FSP_UMBRAL` | Declared FSP contribution | FSP present at the correct bracket | FSP missing or under-rated | `N-001` | `R-FAIL-IBC-04` |

**Rule:** `V-IBC-02` is the rule the product does not currently have, and it is
the one that actually addresses UGPP exposure. UGPP does not fiscalize whether
a planilla exists — it fiscalizes whether the base was right (`N-012`). A
supplier can hold a perfectly valid, fully paid planilla and still leave the
client exposed, because the planilla was liquidated on a base below 40% of the
contract. Checking document presence without checking the base validates the
wrong thing.

### Planilla

| ID | Precondition | Evidence | Pass | Fail | Norma | Verbatim |
|---|---|---|---|---|---|---|
| `V-PILA-01` | Invoice covers service month `M` | Planilla for the **latest closed period**, i.e. `M-1`, paid during `M` | Planilla exists for `M-1` and is paid | No planilla for `M-1` | `N-004` | `Q-AUD-01`, `R-FAIL-PILA-01` |
| `V-PILA-02` | Planilla presented | Planilla type and `tipo de cotizante` | Type `I` (independientes) or `Y`; cotizante `3`, `57` or `59` as applicable; `N` for corrections | Wrong type for the contributor | `N-022` | `Q-AUD-02`, `R-FAIL-PILA-02` |
| `V-PILA-03` | Planilla presented | Declared IBC on the planilla | Matches the `V-IBC-*` result | Below it | `N-003` | `Q-AUD-05`, `R-FAIL-IBC-01` |
| `V-PILA-04` | Planilla presented | Salud and pensión lines | **Both** present at `TASA_SALUD` and `TASA_PENSION` | Either missing or under-rated | `N-001` | `Q-AUD-06`, `R-FAIL-PILA-03` |
| `V-PILA-05` | Planilla presented | Payment status | Paid, not in `mora` | In `mora`, or planilla type `M` | `N-001` | `Q-AUD-12`, `R-FAIL-PILA-04` |

**Rule on `V-PILA-01` — read this before writing any UI that names a period.**
Contributions are paid **mes vencido** (`N-004`): the planilla for period `M` is
filed and paid during `M+1`. Therefore, at the moment an invoice for service
month `M` arrives, the planilla for `M` **does not yet exist and cannot**. The
latest period an agent can verify is `M-1`. Any check that claims to have
validated the current service month's planilla is either mislabelled or
describing something impossible. This is the single most common way to specify
an unsatisfiable validation, and AVALA's own landing page currently does it —
see `design/claims-audit.md`, finding 1.

### ARL

| ID | Precondition | Evidence | Pass | Fail | Norma | Verbatim |
|---|---|---|---|---|---|---|
| `V-ARL-01` | `Prestación de servicios` contract longer than one month | Contract duration; CIIU; risk class | Contractor affiliated to ARL | Not affiliated | `N-011` | `Q-AUD-07`, `R-FAIL-ARL-01` |
| `V-ARL-02` | Risk class is `IV` or `V` | Who paid the ARL contribution | **The client (contratante) paid it** | Contractor paid it, or nobody did | `N-011` | `Q-AUD-08`, `R-FAIL-ARL-02` |
| `V-ARL-03` | Risk class is `I`, `II` or `III` | Who paid | The contractor paid it | Not paid | `N-011` | `Q-AUD-08`, `R-FAIL-ARL-01` |

**Rule:** `V-ARL-02` is a direct obligation of AVALA's client, not of the
supplier. For risk classes IV–V on contracts over one month, the contratante
must affiliate and pay (`N-011`). An agent that reports "supplier is compliant"
without resolving the risk class has not told the client about the one
contribution the client itself owes.

### RUT and tax support

| ID | Precondition | Evidence | Pass | Fail | Norma | Verbatim |
|---|---|---|---|---|---|---|
| `V-RUT-01` | Supplier is a natural person invoicing | RUT | RUT exists and its `estado` is active | Suspended, cancelled, or absent | `N-021` | `Q-AUD-10`, `R-FAIL-RUT-01` |
| `V-RUT-02` | RUT presented | `Responsabilidades` codes | Consistent with the service actually invoiced | Inconsistent | `N-021` | `R-FAIL-RUT-02` |
| `V-RUT-03` | RUT presented | Last update vs. current circumstances | Updated | Out of date | `N-021` | `Q-AUD-10`, `R-FAIL-RUT-03` |
| `V-DSNO-01` | Supplier is **not obligated to invoice** (`N-014` art. 8) | Whether the client generated the DSNO | **The client** generated the electronic `documento soporte` | Only a `cuenta de cobro` exists | `N-014` | `Q-AUD-11`, `R-FAIL-DSNO-01` |

**Rule on `V-DSNO-01`.** A `cuenta de cobro` from a supplier who is not
obligated to invoice is not, by itself, sufficient tax support. `N-014`
requires the **buyer** to generate the electronic `Documento Soporte en
Adquisiciones efectuadas a no obligados a facturar`. Since AVALA's entire
product is framed around the `cuenta de cobro`, this is the gap most likely to
surprise a client who believes a validated cuenta de cobro is all they need.

### The client's own duty, and the deduction

| ID | Precondition | Evidence | Pass | Fail | Norma | Verbatim |
|---|---|---|---|---|---|---|
| `V-DED-01` | Client intends to pay and deduct | Record that the client verified affiliation **and** payment | Verification performed **and documented** | Not performed, or performed but not evidenced | `N-009`, `N-010` | `R-OK-03`, `R-FAIL-DED-01` |

**Rule:** `N-010` conditions the deduction on the **contratante's**
verification, not on the supplier's compliance in the abstract. The
consequential failure is therefore the client's own omission, and the remedy is
an auditable record that the check happened. This reverses the intuitive story:
the exposure is not "your supplier was delinquent", it is "you cannot show you
checked". An agent must describe it that way, and must never state that a
deduction *has been* or *will be* rejected — see §0.

### Reclassification — assessment prohibited

| ID | Precondition | Permitted action | Prohibited | Norma | Verbatim |
|---|---|---|---|---|---|
| `V-REC-01` | Any indicator of an employment relationship appears | Record the objective facts observed — exclusivity, fixed schedule, duration, whose tools and premises, whether the person reports to a supervisor — and escalate to a human | Stating, implying or scoring whether the contractor is a disguised employee | `N-015` | `L-ESC-01` |

**Rule:** the elements of an employment relationship under `N-015` are personal
service, **continuing subordination**, and remuneration. Subordination is not
observable in a planilla, a RUT, or an invoice. No document set AVALA validates
can establish or exclude it, and the determination belongs to UGPP in a
fiscalization or to a labor judge under `primacía de la realidad`. An agent
therefore collects facts and hands them over. It never renders the verdict —
including softened forms such as "no indications found", which reads as a
clearance the agent has no basis to give.

---

## §5 Escalation and refusal

An agent stops and hands to a human when:

1. **Legal, tax or accounting advice is requested** — including "what should we
   do", "are we exposed", "is this contract risky". Reply `L-ESC-02`.
2. **A reclassification verdict is requested or implied** (`V-REC-01`). Reply
   `L-ESC-01`.
3. **A required norm is not in §1**, or the situation falls in the §0
   out-of-scope list. Reply `L-ESC-03`.
4. **A needed constant is marked `⚠ verificar`**, or the period is outside
   calendar 2026 (§6). Reply `L-ESC-04`.
5. **The supplier disputes a finding on legal grounds.** The agent does not
   argue law. Reply `L-ESC-05`.
6. **A `T-2`/`T-3`/`T-4` case claims costs** and `N-007` cannot be resolved for
   the CIIU code (`V-CLS-02`). Reply `L-ESC-03`.
7. **Personal data beyond what the flow needs is offered or requested.**
   `N-019` requires authorization for processing; an agent does not collect
   identity documents, bank details or health data it was not asked to collect,
   and never asks a supplier for a password or a portal credential. Reply
   `L-ESC-06`.

`L-ESC-07` is not an escalation but a standing footer: an agent appends it
whenever a client reads a result as advice, restating that AVALA does not
replace tax or accounting advice and that the client approves each payment.

**Rule:** escalation is a success state, not a failure. The cost asymmetry is
severe — a wrong "compliant" verdict can cost the client the contributions plus
a sanction of up to 100% of them (`N-013`), while an escalation costs a human a
few minutes. When the confidence is not there, escalate.

---

## §6 Freshness protocol

| What | Expires | Re-verify against |
|---|---|---|
| `SMMLV`, `AUX_TRANSPORTE` | Annually, 31 December | The December decree (`N-016`, `N-017` pattern) |
| `UVT` | Annually, 31 December | The DIAN resolution (`N-018` pattern) |
| `N-002` status | **On any Corte Constitucional ruling** | corteconstitucional.gov.co |
| `N-007` percentages | Whenever UGPP reissues | ugpp.gov.co |
| FSP bracket table | Still `⚠ verificar` | Primary text of `N-001` and its reglamentario |
| Everything marked `⚠ verificar` | Before first use in a computation | The primary source named alongside it |

**Rule:** an agent must refuse to compute when a constant it needs is outside
its validity window, rather than fall back to the previous year's value. The
2026 SMMLV rose 23% over 2025, which moves the `IBC_MIN` floor by `$327.405` —
enough to flip whether the floor binds at all for a mid-size contract. A stale
constant here does not degrade the answer, it inverts it.

**Open `⚠ verificar` items as of 2026-07-28.** All were researched; none is
blocking for the `T-1` path, and each names what is missing:

| Item | What is missing |
|---|---|
| `N-002` status | Standing item — recheck before every use |
| FSP bracket table | Primary text; only binds above 16 SMMLV |
| `N-007` per-CIIU percentages | Not transcribed; blocks `T-2`/`T-3`/`T-4` with claimed costs |
| UGPP sanction percentages (§7) | Corroborated by two secondary sources; primary text of `N-012`/`N-013` not read — the government sites refused TLS/returned 403, and the official PDFs are scanned images |
| PILA planilla and cotizante type table | Partially sourced; `V-PILA-02` needs the full table from `N-022` |
| UGPP determination term (5 years) | Article not pinned down within `N-012` |

---

## §7 Consequence reference — what is actually at stake

Agents use this only to answer a factual question about the regime. They never
use it to warn, pressure, or estimate a client's exposure.

| Conduct | Consequence | Norma |
|---|---|---|
| Omission or late payment of contributions | `5%` of the amount not liquidated and paid, **per month or fraction**, capped at `100%` | `N-012`, `N-013` |
| Same, after failing to comply with a UGPP `requerimiento` | `10%` per month, capped at `200%` | `N-012`, `N-013` |
| Inexactitud, corrected within the response period | `35%` of the difference between the amount payable and the amount declared | `N-012`, `N-013` |
| Inexactitud, determined officially | `60%` of the difference | `N-012`, `N-013` |
| Information not supplied, incomplete, inexact or late | Up to `15.000 UVT` = `$785.610.000` (2026), with reductions of `10%`/`20%`/`30%` for supplying within UGPP's deadlines | `N-012`, `N-013`, `N-018` |
| Declaring or correcting **before** the `requerimiento` is notified | **No omission or inexactitud sanction** | `N-012` |
| Deduction of payments to a contractor | Conditioned on the contratante's verification of affiliation and payment | `N-009`, `N-010` |

`⚠ verificar` — every percentage in this table is corroborated by two
independent secondary sources but has not been read against the primary text of
`N-012`/`N-013`. Treat the structure as reliable and the exact figures as
pending. The UGPP determination term is commonly stated as five years; the
article has not been pinned down.

**Rule:** the last row of that table is the one worth repeating to a client,
because it is the only one that is entirely within their control: correcting
before UGPP issues a `requerimiento` removes the omission and inexactitud
sanctions altogether. An agent that understands this describes AVALA as
something that gets corrections done early, which is accurate, rather than as
something that prevents sanctions, which it cannot promise.

---

## §8 Worked examples

These are computed here so an agent has a checked reference, and so any change
to §2 or §4 can be re-validated against a known answer. Figures come from
AVALA's own demo cases.

### A — `T-1`, and why the IVA question is load-bearing

Contract/invoice: `$4.850.000` per month. Type `T-1` (`prestación de servicios
personales`, no cost deduction).

*If `$4.850.000` is the contract value net of IVA:*

| Step | Value |
|---|---|
| Base net of IVA | `$4.850.000` |
| `40%` | `$1.940.000` |
| vs. `IBC_MIN` `$1.750.905` | above → IBC `= $1.940.000` |
| Salud `12,5%` | `$242.500` |
| Pensión `16%` | `$310.400` |
| FSP (IBC vs `$7.003.620`) | below threshold → none |
| **Total** | **`$552.900`** |

*If `$4.850.000` includes IVA at 19%:*

| Step | Value |
|---|---|
| Base net of IVA (`÷ 1,19`) | `$4.075.630` |
| `40%` | `$1.630.252` |
| vs. `IBC_MIN` `$1.750.905` | **below → IBC floors to `$1.750.905`** |
| Salud `12,5%` | `$218.863` |
| Pensión `16%` | `$280.145` |
| **Total** | **`$499.008`** |

**Rule:** the same invoice produces two different bases and two different
correct answers depending on one fact. In the second case the floor binds and
the 40% computation is discarded entirely. This is why `V-IBC-01` treats unknown
IVA treatment as *cannot compute* rather than assuming either way, and why
`Q-AUD-04` exists.

### B — the floor dominating a small invoice

Invoice: `$2.100.000`.

| Step | Value |
|---|---|
| `40%` | `$840.000` |
| vs. `IBC_MIN` | **below → IBC `= $1.750.905`** |
| Salud `12,5%` | `$218.863` |
| Pensión `16%` | `$280.145` |
| **Total** | **`$499.008`** — `23,8%` of the invoice |

**Rule:** for small invoices the floor, not the 40%, sets the contribution — and
it can approach a quarter of the invoice. An agent asked why a supplier's
contribution looks disproportionate answers with `IBC_MIN` (`N-003`, `N-016`),
not with an apology or a suggestion to lower it.

### C — resolving the period under `mes vencido`

Service month `M` = February 2026. Invoice arrives late February or early
March.

| Period | Paid during | Verifiable when the invoice arrives? |
|---|---|---|
| January 2026 | February 2026 | **Yes** — this is `M-1`, the latest closed period |
| February 2026 | March 2026 | **No** — not yet due, cannot exist |

**Rule:** the correct check on a February invoice is the **January** planilla.
A check presented as validating February's planilla at that moment describes
something that cannot exist (`N-004`). `V-PILA-01` encodes this; finding 1 of
`design/claims-audit.md` records where the product currently gets it wrong.
