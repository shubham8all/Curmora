---
version: "1.0"
name: "Rose Atelier"
description: "Soft French patisserie system for Curmora: rose header, peach and cream bands, square corners, small uppercase headings with wide tracking, set entirely in Montserrat."
colors:
  background: "#f5ece0"
  surface: "#faf6f0"
  blush: "#e5c8c6"
  rose: "#ce827b"
  rose-deep: "#6e3b36"
  ink: "#201b12"
  text: "#201b12"
  text-muted: "#534735"
  muted: "#c0c0a9"
  border: "#c0c0a9"
  on-rose: "#201b12"
  on-rose-deep: "#faf6f0"
  on-ink: "#faf6f0"
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
  font-family: "'Montserrat', system-ui, sans-serif"
  hero:
    fontSize: "clamp(1.5rem, 1.5vw + 1rem, 2.25rem)"
    fontWeight: "400"
    lineHeight: "1.25"
    letterSpacing: "0.08em"
    textTransform: "uppercase"
  title:
    fontSize: "0.9375rem"
    fontWeight: "500"
    lineHeight: "1.3"
    letterSpacing: "0.14em"
    textTransform: "uppercase"
  feature:
    fontSize: "clamp(2rem, 3vw + 1rem, 3.5rem)"
    fontWeight: "300"
    fontStyle: "italic"
    lineHeight: "1.15"
  marquee:
    fontSize: "clamp(3rem, 6vw + 1rem, 6.5rem)"
    fontWeight: "300"
    lineHeight: "1"
  body-md:
    fontSize: "1rem"
    fontWeight: "400"
    lineHeight: "1.7"
  label:
    fontSize: "0.75rem"
    fontWeight: "500"
    lineHeight: "1.2"
    letterSpacing: "0.14em"
    textTransform: "uppercase"
rounded:
  none: "0px"
  sm: "4px"
spacing:
  sm: "8px"
  md: "16px"
  lg: "32px"
  xl: "64px"
components:
  button-dark:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.on-ink}"
    rounded: "{rounded.none}"
    padding: "14px 24px"
  button-light:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.ink}"
    rounded: "{rounded.none}"
    padding: "14px 24px"
  button-muted:
    backgroundColor: "{colors.muted}"
    textColor: "{colors.ink}"
    rounded: "{rounded.none}"
    padding: "14px 24px"
  button-outline:
    backgroundColor: "transparent"
    textColor: "currentColor"
    border: "1px solid currentColor"
    rounded: "{rounded.none}"
    padding: "14px 24px"
  header:
    backgroundColor: "{colors.rose}"
    textColor: "{colors.on-rose}"
  band:
    backgroundColor: "{colors.blush}"
    textColor: "{colors.ink}"
    padding: "64px 16px"
  feature-band:
    backgroundColor: "{colors.rose-deep}"
    textColor: "{colors.on-rose-deep}"
  product-tile:
    backgroundColor: "diagonal split of pink-100 and pink-200"
    rounded: "{rounded.none}"
  input:
    backgroundColor: "{colors.surface}"
    border: "1px solid {colors.border}"
    rounded: "{rounded.none}"
  page:
    backgroundColor: "{colors.background}"
    textColor: "{colors.text}"
    padding: "16px"
---
## Overview

Rose Atelier is a calm, feminine patisserie system inspired by boutique French pastry shops. A dusty-rose header sits over cream pages broken up by soft peach bands. Everything is quiet and square: small uppercase headings with generous letter spacing, rectangular buttons, edge-to-edge sections, and product illustrations on two-tone pink backdrops. It replaces the earlier Brushstroke Market system.

- **Category:** editorial / boutique retail
- **Reference:** French patisserie storefronts with rose branding, split heroes and pastry flat-lays.
- **Structural base:** full-width 12-column grid with side padding.

**Defining traits:**
- One typeface, Montserrat, for everything
- Small uppercase headings with wide tracking; italic light for feature lines
- Dusty-rose header, peach bands, cream ground
- Square corners on buttons, tiles, cards and inputs
- Gingham check strips and flat-lay illustrations as signature details

## Colors

- **background** #f5ece0 (beige-100): page ground
- **surface** #faf6f0 (beige-50): cards, inputs, light buttons
- **blush** #e5c8c6 (pink-200): peach bands (announcement, hero panel, values, footer)
- **rose** #ce827b (pink-400): header bar, gingham, accents
- **rose-deep** #6e3b36 (pink-700): feature band, accent text, errors
- **ink** #201b12 (beige-900): text, dark buttons
- **text-muted** #534735 (beige-700): secondary text
- **muted** #c0c0a9 (sage-300): muted buttons, hairlines

**Contrast (WCAG AA):** ink on background 14.6:1, ink on blush 10.9:1, ink on rose 5.8:1, on-rose-deep on rose-deep 8.3:1, text-muted on background 7.7:1 and on blush 5.8:1, ink on muted 9.2:1. Cream text on rose is only 2.7:1, so the header uses ink text.

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

- Montserrat only (300, 400, 500, 600 and italics). No second typeface.
- **Hero:** uppercase 400 with 0.08em tracking, modest size, centred in its panel.
- **Title:** section headings are small uppercase 500 with 0.14em tracking, left aligned.
- **Feature:** italic 300 for large statement lines on the feature band.
- **Marquee:** 300 at display size for the scrolling band.
- **Body:** 400 at 16px with 1.7 line height. Labels and buttons are uppercase 500 at 12 to 13px with 0.14em tracking.

## Layout

- Full-width 12-column grid, edge to edge with side padding: 16px on phones, 24px from 640px, 40px from 1024px, 64px from 1536px.
- Sections alternate cream and blush bands; the feature band is rose-deep.
- Horizontal rows (the menu) scroll sideways with snap on every screen size.
- Collapse columns below 768px without horizontal overflow.

## Elevation & Depth

- Flat. No shadows on tiles or buttons; separation comes from colour bands and spacing.
- Products may carry the illustrations' own ground shadow.

## Shapes

- Square corners (0px) on buttons, tiles, cards, inputs and panels. 4px only for tiny badges.
- Gingham check (rose on surface) as a strip under the marquee band and as the hero flat-lay cloth.

## Components

- **Header:** announcement bar in blush with previous and next arrows; rose bar with uppercase nav left, boxed logo centre, bag right.
- **Buttons:** rectangular, uppercase labels. Dark (ink), light (surface), muted (sage) and outline. Visible focus ring, gentle lift on hover.
- **Menu tiles:** tall 4:5 tiles with a two-tone pink diagonal backdrop, uppercase label below.
- **Product tiles:** same backdrop, name in sentence case and price below, quick add on hover.
- **Values:** three columns of thin line icons with uppercase titles on a blush band.
- **Forms:** persistent labels above inputs, helper text, textual errors below in rose-deep, square surface inputs with a 1px border.

## Do's and Don'ts

- Do: keep headings small and tracked; let space and colour bands do the work.
- Do: maintain WCAG AA contrast and respect `prefers-reduced-motion`.
- Don't: round corners, add drop shadows, or use a second typeface.
- Don't: put cream text on the rose header or on blush.
