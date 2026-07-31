# agents/README.md — AVALA

The agent layer. `design/` governs how AVALA looks; this directory governs what
AVALA's agents know, decide, and are allowed to say.

It exists because the knowledge was previously nowhere. Before this, the agent's
conversational lines were hardcoded JSX strings inside `src/components/` and
there was no source of truth at all for what "correctly validated" means — no
contribution base, no period rule, no boundary on what an agent may assert. A
runtime WhatsApp agent built on that has nothing to reason from.

## Files

| File | Holds | Language |
|---|---|---|
| `legal-brain.md` | The normative core: which norms are live, the 2026 constants, the contributor taxonomy, the validation decision tables, the escalation boundary | EN structure, ES legal text |
| `verbatim.es.md` | Every line an agent may say, with a stable ID | ES |
| `README.md` | This file — load order, ID namespaces, refresh protocol | EN |

Per `CLAUDE.md`, internal structure and reasoning are English; anything a
supplier or client reads is Spanish. Norm names and quoted articles stay in
Spanish because translating them would misstate them.

## Load order and precedence

Load in this order. Later files never override earlier ones.

1. `CLAUDE.md` — project rules, language policy
2. `agents/legal-brain.md` §0 — the boundary, before any rule
3. `agents/legal-brain.md` §1–§4 — norms, constants, taxonomy, rules
4. `agents/verbatim.es.md` — the wording for whatever §4 decided
5. `design/tokens.md` §Voice and tone — register, for anything not already
   fixed verbatim

**Precedence:** `§0` beats everything. An agent that can satisfy a rule in §4
but would cross the boundary in §0 does not act — it escalates. The reason for
the ordering is that §4 makes an agent capable and §0 makes it safe, and an
agent that loads capability first will answer before it knows it shouldn't.

## ID namespaces

| Prefix | Lives in | Means |
|---|---|---|
| `N-xxx` | `legal-brain.md` §1 | A norm, with its status |
| `T-x` | `legal-brain.md` §3 | A contributor type |
| `V-<área>-xx` | `legal-brain.md` §4 | A validation rule |
| `Q-CLS-xx` / `Q-AUD-xx` | `verbatim.es.md` §A / §B | A question |
| `R-OK-xx` / `R-FAIL-<área>-xx` | `verbatim.es.md` §C | A result to the client |
| `S-COR-xx` | `verbatim.es.md` §D | A request to the supplier |
| `L-ESC-xx` | `verbatim.es.md` §E | A boundary or escalation line |

IDs are append-only. Never renumber and never reuse a retired ID — an agent
transcript or an audit log that cites `R-FAIL-IBC-01` must still resolve to the
same claim a year later. Retire by marking, not by deleting.

## Adding or changing a rule

1. The norm goes in `legal-brain.md` §1 first, with its status and source. A
   rule that cites no `N-xxx` is a bug.
2. Add the rule to the right table in §4, including its fail branch and its
   escalation path. A rule with no fail branch has not been thought through.
3. Add the lines it needs to `verbatim.es.md` and reference their IDs from the
   rule's `Verbatim` column. Both directions must resolve.
4. If the change contradicts anything the product currently says to users,
   record it in `design/claims-audit.md` rather than silently diverging.

## Refresh protocol

The constants expire. This is not housekeeping — the 2026 SMMLV rose 23% over
2025, which moves the minimum contribution base by `$327.405` and can flip
whether the floor binds at all for a given contract.

| What | When | Where to re-verify |
|---|---|---|
| `SMMLV`, `AUX_TRANSPORTE` | Every year, late December | The MinTrabajo decrees (2026: `N-016`, `N-017`) |
| `UVT` | Every year, mid-December | The DIAN resolution (2026: `N-018`) |
| Pension reform status (`N-002`) | **On any Corte Constitucional ruling** | corteconstitucional.gov.co |
| `presunción de costos` (`N-007`) | Whenever UGPP reissues the resolution | ugpp.gov.co |
| Anything marked `⚠ verificar` | Before an agent computes with it | The primary source named beside it |

**The hard rule:** an agent must refuse to compute when a constant it needs is
outside its validity window or is marked `⚠ verificar`, and reply `L-ESC-04`. It
must never carry forward last year's value. A stale constant here does not make
the answer slightly worse — it inverts whether a supplier is compliant.

## Sourcing discipline

Primary sources, in order of preference:
`funcionpublica.gov.co/eva/gestornormativo` · `secretariasenado.gov.co` ·
`normograma.dian.gov.co` · `ugpp.gov.co` · `corteconstitucional.gov.co` ·
`dapre.presidencia.gov.co`.

Secondary commentary may be used to *locate* a norm, never as the authority for
a number. Where a figure rests on secondary sources only, it ships marked
`⚠ verificar` naming what is missing — see `legal-brain.md` §6 for the current
open list. Several government endpoints refuse TLS or return 403 to automated
fetches, and some official PDFs are scanned images rather than text, so closing
those items may need a human with a browser.

## What this directory is not

It is not wired into anything yet. Nothing in `src/` reads these files; the
chat strings in `src/components/demo-pipeline.tsx` and
`src/components/contact-intake.tsx` are still hardcoded and are **not** yet
sourced from `verbatim.es.md`. Reconciling those two is a separate change, and
until it happens the landing page and the agent layer can disagree — which they
currently do, as recorded in `design/claims-audit.md`.
