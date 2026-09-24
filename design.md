---
version: "beta"
name: "Brushstroke Market"
description: "Warm market-stall visual system for Curmora. Big soft-serif headlines, colour blocks painted on with rough brush edges, pill-shaped buttons and friendly sans-serif body text, all drawn from the Curmora brand palette."
colors:
  primary: "#6a664a"
  background: "#faf6f0"
  surface: "#f5ece0"
  surface-alt: "#eaeacf"
  text: "#201b12"
  text-muted: "#70614a"
  border: "#c0c0a9"
  accent: "#8f4f48"
  highlight: "#efe7ab"
  ink: "#201b12"
  on-primary: "#faf6f0"
  on-surface: "#201b12"
  on-accent: "#faf6f0"
  on-highlight: "#201b12"
  on-ink: "#f5ece0"
  pink-50: "#f8f2f2"
  pink-100: "#f1e2e1"
  pink-200: "#e5c8c6"
  pink-300: "#d9a7a4"
  pink-400: "#ce827b"
  pink-500: "#b6655d"
  pink-600: "#8f4f48"
  pink-700: "#6e3b36"
  pink-800: "#4e2824"
  pink-900: "#2d1512"
  pink-950: "#1e0c0a"
  beige-50: "#faf6f0"
  beige-100: "#f5ece0"
  beige-200: "#e6cba0"
  beige-300: "#c9b088"
  beige-400: "#ab9673"
  beige-500: "#8b7a5d"
  beige-600: "#70614a"
  beige-700: "#534735"
  beige-800: "#3a3124"
  beige-900: "#201b12"
  beige-950: "#14100a"
  forest-50: "#f7f2cd"
  forest-100: "#efe7ab"
  forest-200: "#d5cd98"
  forest-300: "#b8b283"
  forest-400: "#9f9a71"
  forest-500: "#87825f"
  forest-600: "#6a664a"
  forest-700: "#4f4c36"
  forest-800: "#373525"
  forest-900: "#1f1e13"
  forest-950: "#12110a"
  sage-50: "#f5f5d9"
  sage-100: "#eaeacf"
  sage-200: "#d6d6bd"
  sage-300: "#c0c0a9"
  sage-400: "#abab97"
  sage-500: "#8c8c7c"
  sage-600: "#6e6e60"
  sage-700: "#535349"
  sage-800: "#373730"
  sage-900: "#20201b"
  sage-950: "#141410"
  burgundy-50: "#f7f2f5"
  burgundy-100: "#efe6ea"
  burgundy-200: "#e0ccd7"
  burgundy-300: "#d0b0c1"
  burgundy-400: "#c397af"
  burgundy-500: "#b67d9d"
  burgundy-600: "#9f6988"
  burgundy-700: "#83556f"
  burgundy-800: "#6a455a"
  burgundy-900: "#523445"
  burgundy-950: "#2f1c27"
typography:
  display:
    fontFamily: "'Young Serif', 'Georgia', serif"
    fontSize: "clamp(3rem, 6vw + 1rem, 6rem)"
    fontWeight: "400"
    lineHeight: "1"
    letterSpacing: "-0.02em"
  h2:
    fontFamily: "'Young Serif', 'Georgia', serif"
    fontSize: "clamp(2rem, 3vw + 1rem, 3.25rem)"
    fontWeight: "400"
    lineHeight: "1.1"
    letterSpacing: "-0.01em"
  h3:
    fontFamily: "'Young Serif', 'Georgia', serif"
    fontSize: "1.5rem"
    fontWeight: "400"
    lineHeight: "1.2"
  body-md:
    fontFamily: "'Outfit', system-ui, sans-serif"
    fontSize: "1rem"
    fontWeight: "400"
    lineHeight: "1.6"
  label:
    fontFamily: "'Outfit', system-ui, sans-serif"
    fontSize: "0.9375rem"
    fontWeight: "600"
    lineHeight: "1.2"
rounded:
  sm: "6px"
  md: "10px"
  pill: "9999px"
spacing:
  sm: "8px"
  md: "16px"
  lg: "32px"
  xl: "64px"
components:
  button-primary:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.on-primary}"
    rounded: "{rounded.pill}"
    padding: "12px 24px"
  button-accent:
    backgroundColor: "{colors.accent}"
    textColor: "{colors.on-accent}"
    rounded: "{rounded.pill}"
    padding: "12px 24px"
  button-highlight:
    backgroundColor: "{colors.highlight}"
    textColor: "{colors.on-highlight}"
    rounded: "{rounded.pill}"
    padding: "12px 24px"
  button-outline:
    backgroundColor: "transparent"
    textColor: "currentColor"
    border: "1.5px solid currentColor"
    rounded: "{rounded.pill}"
    padding: "12px 24px"
  brush-panel:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.on-primary}"
    edge: "brush"
    padding: "48px"
  card:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.on-surface}"
    edge: "brush"
    padding: "32px"
  input:
    backgroundColor: "{colors.background}"
    border: "1.5px solid {colors.border}"
    rounded: "{rounded.md}"
  page:
    backgroundColor: "{colors.background}"
    textColor: "{colors.text}"
    padding: "16px"
---
## Overview

Brushstroke Market is a warm, hand-made system for a small-batch bakery. Pages feel like a market stall: colour blocks look painted on with a wide brush, headlines are big and soft, and every action is a friendly pill. It replaces the earlier Emboss / Deboss system.

- **Category:** hand-made / organic
- **Reference:** Illustrated snack and bakery storefronts with painted colour blocks.
- **Structural base:** full-width responsive 12-column grid with side padding.

**Defining traits:**
- Colour blocks with rough, brush-painted edges and faint bristle streaks
- Big soft-serif display type (Young Serif) over friendly sans-serif body (Outfit)
- Pill-shaped buttons, chips and nav actions
- Products break out of their colour blocks, with soft shadows underneath
- Cream page ground with olive, terracotta-red and butter-yellow accents

## Colors

- **background** #faf6f0 (beige-50): page ground
- **surface** #f5ece0 (beige-100): warm card blocks
- **surface-alt** #eaeacf (sage-100): cool card blocks
- **primary** #6a664a (forest-600): hero block, main buttons, product cards
- **accent** #8f4f48 (pink-600): banner block, active nav, bullets, accent buttons
- **highlight** #efe7ab (forest-100): butter-yellow pills and chips
- **ink** #201b12 (beige-900): headings, body text, footer block
- **text-muted** #70614a (beige-600): secondary text
- **border** #c0c0a9 (sage-300): hairlines and input borders

**Contrast (WCAG AA):** on-primary on primary 5.4:1, on-accent on accent 5.7:1, ink on background 15.9:1, text-muted on background 5.5:1, on-highlight on highlight 13.6:1. `pink-500` and lighter scale steps do not pass as small text on light grounds; use them for fills only.

## Brand Palette

Project colour scales for the website / app. Use these alongside the semantic tokens above; they are exposed as Tailwind utilities (`bg-pink-500`, `text-forest-700`, `border-sage-300`, …).

| Step | Pink | Beige | Forest | Sage | Burgundy |
|---|---|---|---|---|---|
| 50 | #f8f2f2 | #faf6f0 | #f7f2cd | #f5f5d9 | #f7f2f5 |
| 100 | #f1e2e1 | #f5ece0 | #efe7ab | #eaeacf | #efe6ea |
| 200 | #e5c8c6 | #e6cba0 | #d5cd98 | #d6d6bd | #e0ccd7 |
| 300 | #d9a7a4 | #c9b088 | #b8b283 | #c0c0a9 | #d0b0c1 |
| 400 | #ce827b | #ab9673 | #9f9a71 | #abab97 | #c397af |
| 500 | #b6655d | #8b7a5d | #87825f | #8c8c7c | #b67d9d |
| 600 | #8f4f48 | #70614a | #6a664a | #6e6e60 | #9f6988 |
| 700 | #6e3b36 | #534735 | #4f4c36 | #535349 | #83556f |
| 800 | #4e2824 | #3a3124 | #373525 | #373730 | #6a455a |
| 900 | #2d1512 | #201b12 | #1f1e13 | #20201b | #523445 |
| 950 | #1e0c0a | #14100a | #12110a | #141410 | #2f1c27 |

## Typography

- Display and headings: 'Young Serif', 'Georgia', serif (one weight; hierarchy comes from size)
- Body and UI: 'Outfit', system-ui, sans-serif (400 body, 500 emphasis, 600 labels and buttons)
- Labels are sentence case, never all caps.
- Headlines use tight leading (1 to 1.1) and slight negative tracking.

## Layout

- Full-width 12-column grid, edge to edge with side padding: 16px on phones, 24px from 640px, 40px from 1024px, 64px from 1536px. No maximum page width; grids add columns on wide screens instead of stretching.
- Colour blocks sit inside the container, not edge to edge, so their brushed edges show against the cream ground.
- Products break out of the top or side of their block.
- Collapse columns below 768px without horizontal overflow.

## Elevation & Depth

- Depth comes from overlap: products sit over block edges with a soft shadow beneath them.
- Shadows are warm and soft (`0 16px 32px -16px` in ink at 35%). No hard or black shadows.
- No text shadows.

## Shapes

- Colour blocks and cards: brush-painted edges with faint dry-brush streaks, no corner radius. The edges are pre-rendered masks (`public/brush/`), applied as 9-slice mask borders so they keep the same scale at any size.
- Buttons, chips and nav actions: pill (9999px).
- Inputs and small images: 6px or 10px radius.

## Components

- **Buttons:** pill-shaped. Primary (olive), accent (red), highlight (butter) and outline (1.5px current colour). Visible focus ring, lift on hover, press down on click.
- **Brush panel:** a colour block with brushed edges. Content never gets the filter; only the painted background does.
- **Chips:** small pills for categories and filters.
- **Bullets:** small accent-red dots before short list items.
- **Forms:** persistent labels above inputs, helper text, textual errors below in accent red, cream inputs with a 1.5px border.

## Do's and Don'ts

- Do: keep text on solid fills, never across the brushed edge.
- Do: maintain WCAG AA contrast and respect `prefers-reduced-motion`.
- Do: use one colour block per section; alternate warm (surface) and cool (surface-alt) blocks.
- Don't: brush-edge small elements like buttons or inputs.
- Don't: use scale steps lighter than 600 for small text.
