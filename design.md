# Design — Library Globe

A locked design system for this app. Every page redesign reads this file before
emitting code. Do not regenerate per page — extend or amend this file when the
system needs to grow.

Because this is one product rather than a set of unrelated pages, the usual
"make each page different" rule is **inverted**: pages must share the theme,
the type, the accent and the CTA voice. Variety lives in macrostructure, not
in colour.

## Genre

**Editorial.** The content is books, and the reading surface is a catalogue.
Hairlines rather than card borders, generous whitespace, restraint over motion.

## Macrostructure family

- **Marketing surface** (the home fold): **Marquee Hero** — one display
  statement, a short lede, and figures computed from the catalogue itself.
  Typography is the visual; no hero illustration.
- **App pages** (the catalogue grid): **Catalogue** — a uniform grid of the
  same object, hairline footing rules, card-internal link, no global CTA
  inside the grid.
- **Content pages** (a book record): **Long Document** — the record reads as a
  colophon. Title, byline, prose, then a hairline spec sheet.

## Theme — Almanac

Warm parchment paper, warm near-black ink, a single oxblood accent. Reference
book, not SaaS dashboard.

| Token | Light | Dark |
| --- | --- | --- |
| `--color-paper` | `oklch(96.5% 0.010 85)` | `oklch(16% 0.012 62)` |
| `--color-paper-2` | `oklch(93.5% 0.013 85)` | `oklch(20% 0.013 62)` |
| `--color-paper-3` | `oklch(90.5% 0.015 82)` | `oklch(24% 0.014 62)` |
| `--color-rule` | `oklch(84% 0.012 80)` | `oklch(32% 0.013 62)` |
| `--color-rule-2` | `oklch(78% 0.013 78)` | `oklch(38% 0.014 62)` |
| `--color-neutral` | `oklch(52% 0.012 72)` | `oklch(64% 0.012 70)` |
| `--color-muted` | `oklch(42% 0.014 68)` | `oklch(74% 0.012 76)` |
| `--color-ink-2` | `oklch(32% 0.016 62)` | `oklch(84% 0.010 80)` |
| `--color-ink` | `oklch(20% 0.015 60)` | `oklch(94% 0.008 85)` |
| `--color-accent` | `oklch(46% 0.155 28)` | `oklch(68% 0.130 32)` |
| `--color-accent-ink` | `oklch(97% 0.008 85)` | `oklch(18% 0.020 40)` |
| `--color-focus` | `oklch(32% 0.130 258)` | `oklch(72% 0.130 258)` |
| `--color-danger` | `oklch(50% 0.200 22)` | `oklch(70% 0.165 24)` |

Two rules that are easy to break by accident:

- **Focus is deliberately off-hue from the accent** (blue against oxblood). If
  focus shared the accent hue, the ring would vanish on an accent-filled
  button. Do not "harmonise" it.
- **Danger is not the accent.** They are both warm, so a destructive control
  must never rely on colour alone — `.btn--danger` also changes its border and
  carries a trash icon and an explicit label.

The accent is a highlighter, not a surface. It appears on: the primary button
fill, the hero figures, link and card hover rules, and the required-field
asterisk. Nothing else. It stays under 5 % of any viewport.

### Book boards

Six cloth tints (`--board-1` … `--board-6`), chroma capped at 0.030 so a screen
of forty covers stays quiet. `BookCover` hashes the book's title to pick one, so
each book gets a stable board without a colour ever being chosen at random.

## Typography

2 + 1. Three families is the ceiling and the third has exactly one job.

- **Display:** Fraunces, weight 600, `font-style: normal`. Headings, the
  wordmark, card and board titles. **Never italic** — italic headers are a tell.
- **Body:** IBM Plex Sans 400 / 500 (350 in dark, to offset the optical weight
  of light-on-dark). Prose, labels, buttons.
- **Data (outlier):** JetBrains Mono. One role only — *catalogue data*: the
  masthead issue line, hero figures, card footing, spec-sheet keys, the
  colophon. If you reach for it outside that role, use the body face.

Scale is a major third (1.25) from a 16 px body. Display caps at
`clamp(2.75rem, 5vw + 1rem, 5.25rem)`. Measure is 65 ch. Tabular figures
everywhere a number sits in a column.

## Spacing

4-point named scale, in `app/tokens.css`. Pages use `var(--space-md)`, never
raw values. Section rhythm is deliberately uneven — the hero is `--space-3xl`
top, the catalogue section `--space-lg` top and `--space-3xl` bottom.

## Motion

Almanac runs at **0.85×** — functional, like a reference book.

- Easings: `--ease-out` `cubic-bezier(0.16, 1, 0.3, 1)`, `--ease-in`
  `cubic-bezier(0.7, 0, 0.84, 0)`, `--ease-in-out` `cubic-bezier(0.65, 0, 0.35, 1)`.
- Durations: `--dur-micro` 100 ms, `--dur-short` 190 ms, `--dur-long` 360 ms.
- **Reveal pattern: none.** Both Catalogue and Long Document specify no reveal.
  The page is simply there. Do not add scroll-triggered fades.
- **Exactly three primitives**, and no fourth: hover-underline · button press
  (`translateY(1px)`) · skeleton pulse (functional).
- Reduced motion collapses spatial motion; functional loaders keep running,
  slower.

## Microinteractions stance

- **Silent success.** Adding a book puts it at the top of the catalogue;
  editing updates the record in place. The result is on screen, so there is no
  toast. Toasts are for failures and for Undo.
- **Undo over confirm.** Removing a book is optimistic and the DELETE is
  genuinely *deferred* for 6 s — Undo means the request never fired. A
  `pagehide` listener flushes held deletes with `keepalive` so closing the tab
  does not silently drop them. No `window.confirm`, ever.
- Focus rings appear **instantly** and are never transitioned.
- Search filters instantly; the result count is announced on a 400 ms settle so
  a screen reader is not read a new number per keystroke.
- Hover affordances always have a focus and touch equivalent. Nothing lives
  behind `group-hover` alone.

## CTA voice

- **Primary:** `.btn--primary` — accent fill, `--color-accent-ink` label,
  3 px radius, `--space-lg` inline padding. Verb-first copy: "Add a book",
  "Save changes", "Add to the shelf".
- **Secondary:** `.btn--quiet` — transparent with a `--color-rule-2` hairline.
- **Destructive:** `.btn--danger` — quiet at rest, danger colour + border on
  hover and focus, always paired with an icon and an explicit label.
- **Typographic:** `.btn--type` — rule-underlined text, no box. The catalogue's
  "Show more" voice.
- Every button is a **single-line affordance**: `white-space: nowrap`,
  44 px minimum height (48 px on coarse pointers).

## Per-page allowances

- Marketing surface MAY carry the hero figure strip. It MUST NOT invent a
  number — every figure is derived from the catalogue.
- App pages MUST NOT use enrichment. The book boards are the imagery.
- Content pages are typography plus the large board. No full-bleed images.

## What pages MUST share

- The wordmark, in Fraunces, in the N6 masthead.
- The accent colour and its placement (≤ 5 % per viewport).
- The display + body + data faces, in their assigned roles.
- The CTA voice — shape, radius, padding rhythm, verb-first copy.
- The section-head rhythm: title then note, **stacked in one column**. A
  tag-left / heading-right two-column head is banned outright.
- The Ft4 colophon closing every page.

## What pages MAY differ on

- Macrostructure within the family above.
- Masthead scale — `.mast--compact` on record pages, full on the catalogue.
- Which empty / error state renders.

## Component archetypes in use

- **Nav:** N6 Newspaper masthead. The issue line carries the collection count;
  the theme toggle sits at its end. Record actions belong on the record, never
  in the global nav.
- **Footer:** Ft4 Dense typographic colophon. **Not** Ft3 index columns — a
  catalogue has no "Company" sitemap, and twelve links pointing at `/` is the
  most recognisable AI footer there is.

## Known deviations

- `components/ImageUploader.tsx` is not mounted. Its dropzone was never wired
  to an `onDrop` and there is no upload endpoint on the API, so it presented a
  working control that did nothing. Kept in place for when cover upload is
  actually built; if it returns, covers still fall back to the CSS-art board.

## Exports

Drop-in formats for re-using this design system.

### tokens.css

The canonical file is [`frontend/app/tokens.css`](frontend/app/tokens.css),
imported at the top of `app/globals.css`. It carries every `--color-*`,
`--font-*`, `--space-*`, `--text-*`, `--ease-*`, `--dur-*`, `--rule-*`,
`--radius-*` and `--board-*` token, plus the full `.dark` override block.

### Tailwind

Tailwind v4 is what is installed. `app/globals.css` does
`@import "tailwindcss"` and `@config "../tailwind.config.ts"`; the config maps
utilities onto the same tokens, so `bg-paper` and `text-accent` resolve to
`var(--color-paper)` / `var(--color-accent)` rather than duplicating values.
`darkMode: "class"` pairs with next-themes' `attribute="class"`.

### DTCG `tokens.json`

```json
{
  "color": {
    "paper":  { "$value": "oklch(96.5% 0.010 85)", "$type": "color" },
    "ink":    { "$value": "oklch(20% 0.015 60)",   "$type": "color" },
    "accent": { "$value": "oklch(46% 0.155 28)",   "$type": "color" },
    "focus":  { "$value": "oklch(32% 0.130 258)",  "$type": "color" }
  },
  "font": {
    "display": { "$value": "Fraunces",       "$type": "fontFamily" },
    "body":    { "$value": "IBM Plex Sans",  "$type": "fontFamily" },
    "data":    { "$value": "JetBrains Mono", "$type": "fontFamily" }
  },
  "space": {
    "md": { "$value": "1rem",   "$type": "dimension" },
    "lg": { "$value": "1.5rem", "$type": "dimension" }
  }
}
```
