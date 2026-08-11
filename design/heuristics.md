# design/heuristics.md — AVALA

This is not a general usability checklist copied from Nielsen. It grows one
entry at a time, each one derived from an actual issue found in this
product — so every rule here is grounded in something that really happened,
not a guess about what might go wrong. Add an entry only after you've seen
the violation, not preemptively.

Every UI change must be checked against the entries below before it's
considered done (see `CLAUDE.md`, non-negotiable rule 6).

---

## 1. Component consistency

**Rule:** The same type of element (message, card, label, stamp) must
always render through the same shared component from
`src/components/ui/` — never through markup reimplemented per section.

**Violation signal:** Two instances of "the same kind of thing" look
visually different with no state-based reason for it. A "sent" message
bubble and a "received" message bubble are allowed to look different —
that's a real state distinction. A "sent" bubble in one section looking
different from a "sent" bubble in another section is not a state
distinction; it's drift.

**Origin:** Found 2026-07-03 — the WhatsApp conversation demo rendered the
AVALA message as a filled bubble and the supplier's message as a bracketed
placeholder (`[envía PDF actualizado]`) in a completely different visual
language, because each was hand-built inline instead of sharing a
`ChatBubble` component.

**How this gets checked:** Manually today, in PR review. Once
`src/components/ui/` covers most patterns, this becomes checkable by a
visual regression eval — same component, same snapshot baseline, any drift
between instances shows up as a diff instead of requiring a human to spot it
in a screen recording.

---

## 2. Claims cite a norm, or say "illustrative" in place

**Rule:** Any user-facing string that makes a regulatory, legal or numeric
claim must either cite a norm from `agents/legal-brain.md` §1 (an `N-xxx`)
or be marked illustrative **adjacent to the claim itself**. A section-level
caption does not qualify. And a claim about a mechanism — what AVALA
checks, against which source, for which period — must correspond to a rule
in `agents/legal-brain.md` §4. If no rule covers it, the product doesn't do
it, and the copy can't say it does.

**Violation signal:** A number rendered at display size with no unit, no
subject and no source. A check written as a green ✓ whose underlying
validation nobody can name. An authority cited as a data source when it's
actually a regulator. A claim stated in the negative ("sin indicios de …")
that would require evidence the product never sees.

**Origin:** Found 2026-07-28 — `design/claims-audit.md`. Three examples
from the same audit: `Sanciones UGPP · $0 · en clientes activos`
(`hero.tsx:17`) is a verifiable regulatory-outcome claim carried only by a
12px `Cifras ilustrativas` caption 100+ lines below it; `PILA feb-2026`
(`hero.tsx:21`) names a period that cannot exist yet, because contributions
are paid mes vencido; and `60%` under `Frente · UGPP`
(`risk-section.tsx:20`) is unsourced while a real 60% exists in the UGPP
sanction regime attached to a completely different concept — plausible
enough to survive review, wrong enough to mislead.

**How this gets checked:** Manually today, against
`design/claims-audit.md` — every claim there carries a verdict, so a copy
change either resolves a finding or must not reintroduce one. Two things
make it mechanisable later: `agents/verbatim.es.md` §F is a literal
do-not-say list that a lint rule could grep the `src/` tree for, and once
copy moves out of inline JSX into data, claims can be required to carry an
`N-xxx` field rather than relying on a reviewer to notice one is missing.
