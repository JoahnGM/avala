# design/mobile-spec.md — AVALA landing at 375px

P4-1 of the landing backlog. Mobile was never evaluated, and three patterns on
the page are high-risk at 375px. This is the spec to build against — it is
written before touching desktop layout again, as the backlog requires.

**Status:** specified, **not implemented**. Nothing here has been built or
measured on a device yet. The desktop layout currently degrades by stacking, so
the page is usable at 375px but not designed for it.

**Baseline.** Container padding is `px-6` (24px), so the usable width at 375px
is **327px**. Every measurement below assumes that.

---

## 1 · Scope list (§03) — two columns become inline detail

**Desktop:** `md:grid-cols-[1fr_0.85fr]` — item list left, panel right. The
panel redraws for the open item.

**At 375px the two-column relationship breaks**: the panel drops below the whole
list, so the open item and its panel are separated by up to four closed titles.
The cause-effect the panel exists to carry is lost — which is exactly what
`P3-2` fixed on desktop.

**Spec.** The panel moves *inside* the open item, directly under its body copy.

- One `<li>` per item, `border-t border-hairline`, active item keeps the
  `border-l-2 border-l-stamp` marker.
- Open item renders: title row → body → panel block, in that order, all within
  the item's own bounds.
- Panel drops its `border` and `bg-surface` on mobile and becomes an indented
  definition list (`pl-4`, `border-l border-hairline`) — a card inside a card at
  327px reads as clutter, and the surface no longer separates anything.
- `panel-in` animation stays; it is now animating in place, which is stronger.
- The `+`/`–` marker stays right-aligned in the title row and is the tap target
  along with the whole row (min 44px height).

## 2 · Console check rows (§02) — stack, code becomes a chip

**Desktop:** one row per check — `[RU] label … V-RUT-01 … ✓ OK` — four elements
on one line, status right-aligned in a `w-24` column.

**At 375px** the label wraps to two or three lines while the rule ID and status
sit at the right edge of the first line, so the row loses its reading order and
the status detaches from what it describes.

**Spec.** Two lines per check, no right alignment.

```
┌───────────────────────────────────────┐
│ [RU]  RUT activo en la DIAN           │   line 1: chip + label
│       V-RUT-01            ✓ OK        │   line 2: evidence + status
└───────────────────────────────────────┘
```

- Line 1: the two-letter code as a chip (`h-6 w-6`, `border-hairline`,
  `text-caption`) + label at `text-body`, wrapping freely.
- Line 2: rule ID (`text-evidence`) left, status right, both `text-caption`,
  indented to align with the label.
- Status keeps its glyph (`✓` / `✗`) as well as its colour — the state must
  survive without hue (`CLAUDE.md` rule 3).
- The WhatsApp thread inside the console keeps `max-w-bubble` (240px), which
  already fits; the attachment bubble must not exceed the console's inner width.

## 3 · Type scale — declare it, don't let it inherit

**Desktop:** `display-lg` is 48px. The H1 renders at `text-display-md` (32px)
below `md`, which is already the mobile step — but it is inherited from a
breakpoint rather than specified, and the section headings (`h2`) all sit at
`text-display-md` on mobile with no distinction from the H1.

**Spec — explicit mobile ramp:**

| Role | Mobile | Desktop | Notes |
|---|---|---|---|
| H1 (§01) | 34px / 1.05 | 48px | The only 34px on the page |
| H2 (section) | 26px / 1.1 | 32-48px | One clear step below H1 |
| H3 / item title | 20px / 1.2 | 24px | Scope items, trust blocks |
| Lead paragraph | 18px / 1.55 | 20px | `body-xl` steps down |
| Body | 16px / 1.7 | 16px | Unchanged — never below 16px |
| Data / mono | 14px / 1.5 | 14px | Unchanged |
| Caption / evidence | 12px / 1.5 | 12px | Never 11px on mobile |

`micro` (11px) is not used on mobile at all: it exists for chat timestamps and
the footer copyright, and at 375px both step up to `caption`.

Add the two missing steps as tokens (`display-xs` 20px, and a 26px/34px pair)
rather than hardcoding per component — `CLAUDE.md` rule 2.

---

## 4 · Everything else, checked

| Element | At 375px | Action |
|---|---|---|
| Header nav | Wordmark + eyebrow + CTA on one row | Eyebrow already `hidden sm:block`; fine |
| Hero CTA + note | `flex-wrap`, stacks | Fine |
| Trust section (§04, inverted) | 3 columns stack | Fine; check `paper` on `ink` at 16px |
| Intake stage indicator | `Paso 1 de 2 · contexto` + rule + `Paso 2 de 2` | Rule collapses; stack the two labels, drop the rule |
| Intake composer | Input + labelled button on one row | Button text may squeeze the input below 200px; allow the button to wrap under |
| Closing "qué pasa después" | Two columns stack below the form | Fine — order is correct (form first) |
| Console controls | Two buttons side by side | `flex-wrap` already; verify no 3rd line |

## 5 · Acceptance

1. No horizontal scroll at 320px, 375px and 414px.
2. Every tap target ≥ 44×44px.
3. Contrast unchanged from desktop — `evidence` on `paper`/`surface`,
   `paper`/`hairline` on `ink`.
4. The scope panel is never separated from its open item.
5. No text below 12px anywhere.
6. Verified on a real viewport, not by resizing a desktop window.
