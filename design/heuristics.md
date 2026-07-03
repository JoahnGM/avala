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
