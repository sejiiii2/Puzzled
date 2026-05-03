# Puzzled — Design System
> Warm minimal, playful professionalism. A puzzle-forward UI where progress feels earned and tools feel approachable.

**Theme:** light

Puzzled adapts Contractbook's clean, high-contrast system into a warmer, more encouraging aesthetic. The warm white canvas (#ffffff) pairs with Energy Gold (#ffba09) as the single chromatic punch — used exclusively for activated puzzle pieces, primary CTAs, and celebration moments. Typography splits between Fraunces (display headlines, project titles) and Inter (all UI text). Puzzle pieces are the primary design element — real interlocking shapes, not cards. Greyed pieces create visual tension; activated pieces feel satisfying and earned.

---

## Tokens — Colors

| Name | Value | Token | Role |
|------|-------|-------|------|
| Pure White | `#ffffff` | `--color-pure-white` | Page background, card surfaces |
| Pearl | `#f7f7f3` | `--color-pearl` | Secondary backgrounds, onboarding card, section bands |
| Beige | `#f0f0ec` | `--color-beige` | Input fields, greyed puzzle piece fill, subtle surfaces |
| Washed Black | `#1a1a1a` | `--color-washed-black` | Primary text, borders, icons |
| Ink Black | `#000000` | `--color-ink-black` | Strongest contrast — "Snap it in" button, high-emphasis text |
| Dim Grey | `#6d6868` | `--color-dim-grey` | Secondary text, captions, muted labels |
| Concrete | `#d4d4d0` | `--color-concrete` | Dividers, inactive borders, puzzle piece outlines (locked) |
| Silver Mist | `#b3b3b3` | `--color-silver-mist` | Placeholder text, disabled states |
| Energy Gold | `#ffba09` | `--color-energy-gold` | Primary CTA buttons, activated puzzle pieces, progress indicators, celebration moments — the single chromatic accent |
| Deep Amber | `#d48f00` | `--color-deep-amber` | Gold shadow/stroke, hover state on Energy Gold elements |
| Coral Red | `#ff4d4d` | `--color-coral-red` | Error states, destructive actions |
| Valid Green | `#00c454` | `--color-valid-green` | Success states, "Yes" reuse badge |

---

## Puzzle Piece States

| State | Fill | Logo | Badge | Border |
|---|---|---|---|---|
| Locked | `#f0f0ec` (Beige) | Desaturated, 40% opacity | "TRY" — Dim Grey | 1px Concrete |
| Activated | Tool brand color (e.g. purple for Elicit, orange for Claude) | Full color | "DONE" — White on Dark | None |
| Hover (locked) | `#e8e6e0` | Slightly less desaturated | "TRY →" | 1px Washed Black |

Activated piece snap animation: spring easing, scale 0.95 → 1.02 → 1.0, 300ms. Color floods in on submission.

---

## Tokens — Typography

### Fraunces — Display headlines and project titles only. Warm, slightly editorial serif that adds personality without being precious. Used sparingly: hero, onboarding card titles, puzzle board project name.
- **Weights:** 500
- **Sizes:** 40px, 56px
- **Line height:** 1.10
- **Letter spacing:** -1px at 56px, -0.5px at 40px
- **Role:** Hero headline, project title on puzzle board, dashboard hero text

### Inter — All UI text without exception.
- **Weights:** 400, 500, 600
- **Sizes:** 11px, 12px, 13px, 14px, 15px, 16px, 19px, 23px
- **Line height:** 1.40–1.58
- **Letter spacing:** tightens with size (-0.2px at 15px, -0.44px at 23px)
- **Role:** Nav, body copy, card labels, buttons, captions, form inputs

### Type Scale

| Role | Font | Size | Weight | Line Height |
|------|------|------|--------|-------------|
| caption | Inter | 11px | 400 | 1.50 |
| body | Inter | 14px | 400 | 1.47 |
| body-md | Inter | 15px | 400 | 1.47 |
| label | Inter | 13px | 500 | 1.40 |
| heading-sm | Inter | 19px | 600 | 1.38 |
| heading | Inter | 23px | 600 | 1.20 |
| display-sm | Fraunces | 40px | 500 | 1.10 |
| display | Fraunces | 56px | 500 | 1.09 |

---

## Tokens — Spacing & Shapes

**Base unit:** 4px
**Density:** comfortable

### Spacing Scale

| Name | Value |
|------|-------|
| 4 | 4px |
| 8 | 8px |
| 12 | 12px |
| 16 | 16px |
| 20 | 20px |
| 24 | 24px |
| 32 | 32px |
| 40 | 40px |
| 48 | 48px |
| 60 | 60px |
| 80 | 80px |
| 120 | 120px |

### Border Radius

| Element | Value |
|---------|-------|
| tags / badges | 9999px |
| inputs | 8px |
| cards | 24px |
| puzzle board container | 24px |
| drawer panel | 24px (top corners only) |
| buttons (pill) | 999px |
| tool logo container | 16px |

### Shadows

| Name | Value | Usage |
|------|-------|-------|
| card-inset | `rgba(0,0,0,0.06) 0px 0px 0px 1px inset` | All white content cards |
| nav | `rgba(0,0,0,0.04) 0px 0px 0px 1px` | Sticky nav bar |
| drawer | `rgba(0,0,0,0.12) -4px 0px 24px 0px` | Tool detail drawer |
| elevated | `rgba(0,0,0,0.08) 0px 4px 16px 0px` | Hover state on project cards |

No drop shadows on content cards — inset borders only. Shadows reserved for drawers and overlays.

---

## Components

### Primary CTA Button (Pill Gold)
**Role:** Main actions — "Build my puzzle", "Snap it in", "Try it"

Background `#ffba09`, text `#000000`, border-radius 999px, padding 12px 24px. Inter 14px weight 600. On hover: background `#d48f00`, transition 0.15s ease.

### Secondary Button (Pill Outlined)
**Role:** Alternative actions — "See an example", "Back", "Skip"

Background transparent, text `#1a1a1a`, border 1.5px solid `#1a1a1a`, border-radius 999px, padding 12px 24px. Inter 14px weight 500.

### Ghost Text Link
**Role:** Inline actions — "View your dashboard →", "Open →"

Background transparent, text `#1a1a1a`, underline on hover. Inter 14px weight 500.

### Content Card (White)
**Role:** Dashboard tiles, community cards, onboarding card

Background `#ffffff`, box-shadow `rgba(0,0,0,0.06) 0px 0px 0px 1px inset`, border-radius 24px, padding 32px.

### Recessed Panel
**Role:** Input containers, secondary info blocks

Background `#f7f7f3`, no shadow, border-radius 16px, padding 24px.

### Input Field
**Role:** Project text input, optional note field

Background `#f0f0ec`, border 1px solid `#d4d4d0`, border-radius 8px, padding 12px 16px. Inter 14px weight 400, color `#1a1a1a`. Focus: border `#1a1a1a`.

### Pill Tag / Badge
**Role:** "TRY", "DONE", "FREEMIUM", category labels

Border-radius 9999px, padding 4px 10px. Inter 11px weight 600 all-caps.
- TRY: background `#f0f0ec`, text `#6d6868`
- DONE: background `#1a1a1a`, text `#ffffff`
- Gold accent: background `#ffba09`, text `#000000`

### Score Metric Card
**Role:** Dashboard — pieces unlocked, benefit score, friction score, reuse rate

Background `#ffffff`, inset border, border-radius 24px, padding 28px 32px.
Icon (40px colored rounded square) + large number (Inter 600 32px) + label (Inter 500 12px all-caps `#6d6868`) + subtitle (Inter 400 13px `#6d6868`).

### Tool Table Row
**Role:** "Your toolkit" table on dashboard

Columns: Tool (logo + name + category) / Benefit (dot scale 1–5, teal) / Friction (dot scale 1–5, coral) / Reuse (pill badge) / Note (italic grey).
Row padding 16px 0px. Divider: 1px `#f0f0ec`.

### Navigation Bar
**Role:** Sticky top nav

Background `#ffffff`, height 56px, box-shadow `rgba(0,0,0,0.04) 0px 0px 0px 1px`. Logo left (Fraunces or wordmark). Nav links center (Inter 14px 500 `#1a1a1a`). Right: "Dashboard" ghost link + project switcher tabs.

### Onboarding Progress Bar
**Role:** Shows step 1–4 progress

4 horizontal bars, full width. Active: `#1a1a1a`. Inactive: `#f0f0ec`. Height 3px, border-radius 9999px.

---

## Surfaces

| Level | Name | Value | Purpose |
|-------|------|-------|---------|
| 1 | Canvas | `#ffffff` | Page background |
| 2 | Subtle | `#f7f7f3` | Section bands, onboarding card background |
| 3 | Recessed | `#f0f0ec` | Inputs, locked puzzle piece fill, secondary panels |
| 4 | Dark | `#1a1a1a` | DONE badges, high-contrast CTA moments |

---

## Do's and Don'ts

### Do
- Use Energy Gold (`#ffba09`) exclusively for primary CTAs and activated puzzle pieces — its rarity creates impact
- Use pill buttons (999px radius) for all interactive actions — this is the signature button shape
- Use inset box-shadow for card borders — never a CSS border property on cards
- Use Fraunces only for display headlines (project titles, hero) — Inter handles everything else
- Keep puzzle pieces as real interlocking shapes — this is the core visual identity
- Generous whitespace — let the puzzle board breathe
- Show progress explicitly — "2 of 4 pieces unlocked" always visible on board

### Don't
- Don't use Energy Gold for more than one element per viewport — overuse kills hierarchy
- Don't use drop shadows on content cards — inset borders only
- Don't use rounded rectangles for puzzle pieces — they must interlock
- Don't add competitive or ranking elements — no leaderboards, no comparisons
- Don't use Royal Blue from Contractbook — Puzzled replaces it with warm neutrals
- Don't use font weights above 600 — max weight is Inter 600 / Fraunces 500
- Don't use gradients on UI surfaces — flat, warm, solid fills only

---

## Layout

Max-width 1200px centered on white canvas. 

**Landing:** Full-viewport hero — Fraunces headline left, puzzle preview right. Two pill buttons below hero text. Stats row (4–6 curated tools / 3 mins onboarding / ∞ reflections).

**Onboarding:** Centered card on Pearl background. Progress bar top. Single question per step, large and focused.

**Puzzle Board:** Two-column — puzzle grid left (main), sidebar right (progress + HOW IT WORKS + dashboard link). Project title in Fraunces above grid.

**Dashboard:** Single column, max-width 900px. Hero text top. 4-tile metric row. "Your toolkit" table. "Your projects" card grid. "Similar tools" suggestions.

**Community:** Card grid — project cards with puzzle thumbnail, project name, tool logos used.

---

## Motion

- **Piece activation:** spring easing cubic-bezier(0.19, 1, 0.22, 1), 300ms. Scale 0.95 → 1.02 → 1.0. Color floods in simultaneously.
- **Drawer open:** slide in from right, 250ms ease-out. Overlay fades in 200ms.
- **Page transitions:** fade, 150ms ease.
- **Button hover:** background color shift, 150ms ease.
- **Onboarding step:** slide left/right, 200ms ease-in-out.
- **Score counters on dashboard:** count up animation on first load, 600ms ease-out.

---

## CSS Custom Properties

```css
:root {
  /* Colors */
  --color-pure-white: #ffffff;
  --color-pearl: #f7f7f3;
  --color-beige: #f0f0ec;
  --color-washed-black: #1a1a1a;
  --color-ink-black: #000000;
  --color-dim-grey: #6d6868;
  --color-concrete: #d4d4d0;
  --color-silver-mist: #b3b3b3;
  --color-energy-gold: #ffba09;
  --color-deep-amber: #d48f00;
  --color-coral-red: #ff4d4d;
  --color-valid-green: #00c454;

  /* Typography */
  --font-display: 'Fraunces', 'Playfair Display', Georgia, serif;
  --font-ui: 'Inter', ui-sans-serif, system-ui, sans-serif;

  /* Spacing */
  --spacing-4: 4px;
  --spacing-8: 8px;
  --spacing-12: 12px;
  --spacing-16: 16px;
  --spacing-20: 20px;
  --spacing-24: 24px;
  --spacing-32: 32px;
  --spacing-40: 40px;
  --spacing-48: 48px;
  --spacing-60: 60px;
  --spacing-80: 80px;
  --spacing-120: 120px;

  /* Border Radius */
  --radius-input: 8px;
  --radius-card: 24px;
  --radius-button: 999px;
  --radius-tag: 9999px;
  --radius-logo: 16px;

  /* Shadows */
  --shadow-card: rgba(0,0,0,0.06) 0px 0px 0px 1px inset;
  --shadow-nav: rgba(0,0,0,0.04) 0px 0px 0px 1px;
  --shadow-drawer: rgba(0,0,0,0.12) -4px 0px 24px 0px;
  --shadow-elevated: rgba(0,0,0,0.08) 0px 4px 16px 0px;
}
```
