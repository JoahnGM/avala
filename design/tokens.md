# design/tokens.md — AVALA

Visual direction: Russian constructivism applied to the literal artifact of
what AVALA does — a document getting stamped as valid or flagged. Not a
decorative theme; the stamp is the product's real output. This deliberately
avoids the current AI-generated defaults (warm cream + terracotta serif,
near-black + neon accent, broadsheet newspaper layout).

## Color

| Name | Hex | Use |
|---|---|---|
| `paper` | `#EEEAE0` | Base background. Warm, aged-document paper — not the cliché cream. |
| `surface` | `#FFFFFF` | The product's own artifacts sitting on that ground — the live console, the expediente preview. Only for things AVALA produced; the page itself is never white. |
| `ink` | `#211F1B` | Primary text, primary UI chrome. Warm near-black, not pure black. |
| `stamp` | `#B23A2E` | Primary accent. CTAs, links, the "REVISAR" stamp state. Used deliberately, not decoratively. |
| `approved` | `#3F5D3A` | Reserved ONLY for the "APROBADO" success state. Never used as a decorative color elsewhere — if it shows up, something was approved. |
| `graphite` | `#6B6759` | Secondary text, captions, muted labels. |
| `hairline` | `#D6D0C2` | Dividers, borders, table rules. |

Rule: `approved` (green) only appears when something has actually passed
validation. Don't dilute it by using it for generic "success" UI chrome
elsewhere (e.g. a form save confirmation) — that breaks the signal.

Before shipping, verify `graphite` on `paper` and `stamp` on `paper` meet
WCAG AA (4.5:1) at the actual sizes used — tune the value slightly if not,
don't skip the check.

## Type

| Role | Typeface | Notes |
|---|---|---|
| Display (headlines) | Archivo Black / Archivo 700 | Heavy, geometric grotesque — mechanical, stamped character. Used with restraint: headlines and key numbers only. |
| Body | IBM Plex Sans | Humanist, highly legible, slightly technical without being cold. This carries all actual reading. |
| Data / utility | IBM Plex Mono | RUT numbers, dates, status codes, anything that reads as a form field. Pairs natively with Plex Sans. |
| Stamp text only | Special Elite | Typewriter/stamped texture. Used exclusively inside the approval stamp signature element — never for regular UI text. |

Type scale: display 48/32/24px, body 16px (1.7 line-height per house rule),
data/mono 14px, captions 12px.

## Layout

Not a centered hero with a floating gradient blob. Think dossier, not
landing template:

- Asymmetric grid, left-aligned labels like a case file.
- Hairline horizontal rules (`hairline` color) separate sections instead of
  large empty whitespace gaps or shadowed cards.
- The live demo widget is framed literally as a case file: `CASO #0001`,
  document preview on one side, agent reasoning/status on the other.

```
[AVALA]                                     [Agenda demo →]
──────────────────────────────────────────────────────────
CASO #0001                       Deja de perseguir
                                  PILA y RUT a mano.
[documento subido] → [agente revisa] → [sello de resultado]
──────────────────────────────────────────────────────────
```

## Signature element

When the live demo agent finishes validating a document, a stamp visibly
lands on the document preview — rotated 2–3° off-axis like a real hand
stamp, not a clean vector icon, reading "APROBADO" (green) or "REVISAR"
(stamp red) in Special Elite. This replaces the generic checkmark/spinner
pattern entirely. This is the one moment of visual boldness on the page —
everything else stays quiet and disciplined around it.

## Voice and tone

Recommended: close but professional — "tú", direct, plain verbs, no
corporate filler. Reasoning: the visual language borrows from bureaucracy
on purpose, so the copy should be the antidote to it, not more of it.
Formal "usted" would undercut the "we remove the friction" promise. Flag
this to Joahn for confirmation before locking it in — this is a
recommendation, not yet validated.

## Tailwind mapping (for the build agent)

```ts
// tailwind.config.ts — extend, don't replace
colors: {
  paper: '#EEEAE0',
  surface: '#FFFFFF',
  ink: '#211F1B',
  stamp: '#B23A2E',
  approved: '#3F5D3A',
  graphite: '#6B6759',
  hairline: '#D6D0C2',
},
fontFamily: {
  display: ['Archivo Black', 'sans-serif'],
  body: ['IBM Plex Sans', 'sans-serif'],
  mono: ['IBM Plex Mono', 'monospace'],
  stamp: ['Special Elite', 'monospace'],
},
```
