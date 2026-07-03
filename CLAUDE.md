# CLAUDE.md — AVALA Landing

## Project context

AVALA removes the friction between a supplier submitting an invoice ("cuenta de cobro") and actually getting paid. Today, someone on the finance team has to manually review compliance documents (PILA, RUT, etc.) before payment can go through — and that team already has too much else on their plate, so the review is slow and error-prone. Getting this wrong exposes the company to UGPP sanctions for improper supplier payments.

The flow: a supplier submits an invoice, AVALA picks it up, and all back-and-forth about fixing missing or incorrect documents (PILA, RUT, etc.) happens over WhatsApp between AVALA and the supplier — until everything checks out and the invoice is cleared to pay.

This landing must demonstrate that mechanism live (submit a document, see the validation happen), not just describe it in copy.

## Design principles

- The product must feel simple and trustworthy at a glance — this is a compliance/finance tool, not a toy.
- It must NOT look like a generic AI-generated app: no default purple/violet gradients, no templated "Lovable-style" SaaS look, no interchangeable stock layout. Every visual choice should look deliberate and specific to AVALA. See `design/tokens.md` and `design/heuristics.md` once defined.

## Language

- Code, comments, variable/function names, commits, PRs, and this file: always in English.
- Anything the end user sees or hears (landing copy, the agent's WhatsApp messages, form content, visible error messages): always in Spanish. The ICP is Colombian finance teams — do not translate this layer.
- If unsure whether a piece of text is "internal" or "user-facing", treat it as user-facing and keep it in Spanish.

## Stack

- Next.js + TypeScript
- Tailwind CSS — all styling uses the tokens defined in `design/tokens.md` and reflected in `tailwind.config.ts`
- shadcn/ui as the base component library
- Vitest for unit tests
- Playwright for end-to-end tests
- Deployed on Vercel (automatic preview per PR)

## Non-negotiable rules

1. Every new component must ship with at least one unit test in the same PR. No UI code gets merged without a test.
2. Never hardcode colors, spacing, radii, or typography. Always use the Tailwind tokens — if a value doesn't exist as a token yet, add it to the token set first, don't hardcode it in the component.
3. Minimum accessibility on every interactive element: AA contrast, labels on inputs, full keyboard navigation.
4. No PR gets approved with failing tests, broken lint, or a broken build.
5. The critical flow (upload document → see validation result → leave contact info) must have Playwright e2e coverage.
6. Any change touching existing UI must be evaluated against `design/heuristics.md` before it's considered done — passing tests and compiling isn't enough.

## Folder structure

```
avala-landing/
├── CLAUDE.md
├── design/
│   ├── tokens.md          ← palette, typography, spacing, voice/tone
│   └── heuristics.md      ← usability rubric, non-negotiable for UI changes
├── src/
│   ├── components/
│   └── app/
├── tests/
│   ├── unit/               (Vitest)
│   └── e2e/                (Playwright)
└── .github/workflows/ci.yml
```

## Expected agent workflow

1. Read the task/section spec before writing any code.
2. Implement the component together with its test — not as a separate step.
3. Run `npm run lint` and `npm run test` locally before opening the PR.
4. Open the PR with a clear description of what changed and why.
5. Wait for CI to pass (lint + typecheck + tests + build) before requesting human review. If something fails, fix it before flagging for review.

## Commit conventions

Conventional commits: `feat:`, `fix:`, `test:`, `docs:`, `refactor:`, `chore:`

## What the agent must NOT do without asking first

- Modify the color palette, typography, or base tokens without explicit approval.
- Add a new external dependency without justifying it in the PR description.
- Touch CI/CD configuration (`.github/workflows/`) without human review.
- Change the core messaging copy (hero, value proposition) without flagging it explicitly for review — the message is still being actively validated.
