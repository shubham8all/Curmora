@AGENTS.md

# Design system

All UI must strictly follow [design.md](design.md) (Rose Atelier). It is the source of truth for colours, typography, shapes, spacing and component rules. It replaced the earlier Brushstroke Market and Emboss / Deboss systems.

- Use only the tokens in `design.md`, exposed as Tailwind utilities in `src/app/globals.css`: semantic colours (`bg-bg`, `bg-surface`, `bg-blush`, `bg-rose`, `bg-rose-deep`, `bg-ink`, `text-text`, `text-text-muted`, `bg-muted`, `border-border`, `text-on-*`) and the Brand Palette scales (`pink`, `beige`, `forest`, `sage`, `burgundy`, steps 50 to 950). No colours outside the palette, including pure white or black.
- When `design.md` changes, update `src/app/globals.css` to match in the same change.
- Type: Montserrat only (`font-sans`, weights 300 to 600 plus italics). Never add a second typeface. Use the design.md utilities: `text-hero` (page and hero headings), `text-title` (small uppercase section headings), `text-feature` (italic statement lines), `text-marquee`, `text-label` (buttons, labels, breadcrumbs).
- Shapes: square corners everywhere (buttons, tiles, cards, inputs, panels). `rounded-sm` only for tiny badges; dots may be round. No drop shadows.
- Buttons come from `buttonClass()` in `src/components/ui.tsx` (`primary` ink, `light` surface, `muted` sage, `rose`, `outline`). Focus rings use `focusClass`; dark bands set `[--focus-ring:...]`.
- Product and menu tiles use the `backdrop-split` utility with a `toneSplit` class from `src/data/products.ts`. The gingham check is the `gingham` utility (`[--check:...]` sets the square size).
- Contrast: never put cream text on rose or blush (fails AA); the header uses ink. Small text uses palette steps 600 or darker on light grounds.
- Spacing: Tailwind numeric steps on the 8px grid (design.md sm/md/lg/xl = `2`/`4`/`8`/`16`). Don't add `--spacing-sm|md|lg` theme tokens: Tailwind v4 also uses those names for `max-w-*`.
- Layout is full width: `Container` has no max width, only side padding (`px-4 sm:px-6 lg:px-10 2xl:px-16`). On wide screens add grid columns or cap inner elements (text measure, forms, illustrations) instead of capping the page.
- Maintain WCAG AA contrast and respect `prefers-reduced-motion`. Collapse grid columns below 768px with no horizontal overflow.

# House style

- Icons come from `@phosphor-icons/react` (use `@phosphor-icons/react/dist/ssr` in server components). Don't hand-draw icon SVGs. Line-art moments (values, story) use `weight="thin"`.
- Motion: prefer CSS. Scroll reveals use `Reveal` (a CSS scroll-driven animation, no JavaScript); entrances use the `animate-*` tokens in `globals.css` behind `motion-safe:`. Moving text (the marquee) needs a pause button. Never start content at `opacity: 0` from JavaScript.
- Performance: no live SVG filters, CSS `filter`/`drop-shadow` on illustrations, or `backdrop-blur`. They made scrolling janky. Animate only `transform` and `opacity`.
- Renders must be pure: React renders components twice in dev, so anything seeded or random (e.g. `ProductArt` geometry) must be recomputed inside each component from its props, never shared through a mutable closure.
- Mobile: product grids are two-up on phones. Pages with a phone action bar (product, build-a-box, bag) give it the `bottom-bar` class so the footer stays clear. Test at 390px with no horizontal overflow.
- No em or en dashes in customer-facing copy. Use commas, periods or "to" ("1 pm to 4 pm").
- Reviews: only real ones, in `src/data/reviews.ts`. The testimonials section stays hidden while that list is empty.
- Short lists of facts use `DotList`. Status labels use `Badge`.
