---
description: Run the AVALA UX review (scores 1-5 on 5 principles, iterates until all ≥4)
argument-hint: <flow — route, component, screenshots, or the running preview>
---

Run the UX review defined in `design/ux-review.md` on: $ARGUMENTS

Follow that document exactly:
- Score all five principles 1–5 with cited evidence, using the running preview
  (`http://localhost:3000`) plus the source in `src/` when possible.
- Emit the report in the required format (summary table → per-principle
  sections → prioritized fixes → escalations).
- Then iterate (fix → re-score) until every principle is ≥ 4, honoring
  `CLAUDE.md` governance, or escalate the decisions you can't make alone.

If no flow is given in $ARGUMENTS, ask which flow to review before starting.
