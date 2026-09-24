@AGENTS.md

# Design system

All UI must strictly follow [design.md](design.md) (Brushstroke Market). It is the source of truth for colours, typography, shapes, spacing and component rules. It replaced the earlier Emboss / Deboss system.

- Use only the tokens in `design.md`, exposed as Tailwind utilities in `src/app/globals.css`: semantic colours (`bg-bg`, `bg-surface`, `bg-surface-alt`, `bg-primary`, `bg-accent`, `bg-highlight`, `bg-ink`, `text-text`, `text-text-muted`, `text-on-*`) and the Brand Palette scales (`pink`, `beige`, `forest`, `sage`, `burgundy`, steps 50 to 950). No colours outside the palette, including pure white or black.
- When `design.md` changes, update `src/app/globals.css` to match in the same change.
- Type: `text-display` (hero), `text-h2`, `text-h3` use Young Serif, which has one weight and no italic, so never add `font-bold` or `italic` to display text. Body and UI use Outfit (`font-sans`, `text-label` for buttons and labels). Labels are sentence case.
- Shapes: colour blocks and cards use `BrushPanel`. Its paint layer (`.brush-paint` in `globals.css`) uses brush edge masks and a streak texture pre-rendered from the approved SVG brush filter (`public/brush/`, regenerate with `node scripts/render-brush-masks.mjs`). Use `size="sm"` on small cards. Buttons, chips and steppers are pills (`rounded-full`). Inputs and small images use `rounded-sm` / `rounded-md`. Never brush-edge small elements.
- Buttons come from `buttonClass()` in `src/components/ui.tsx` (`primary`, `accent`, `highlight`, `light`, `outline`). Focus rings use `focusClass`; `BrushPanel` sets a visible ring colour on dark blocks.
- Contrast: small text must use palette steps 600 or darker on light grounds. `pink-500` and lighter are fills only.
- Spacing: Tailwind numeric steps on the 8px grid (design.md sm/md/lg/xl = `2`/`4`/`8`/`16`). Don't add `--spacing-sm|md|lg` theme tokens: Tailwind v4 also uses those names for `max-w-*`.
- Layout is full width: `Container` has no max width, only side padding (`px-4 sm:px-6 lg:px-10 2xl:px-16`). On wide screens add grid columns or cap inner elements (text measure, forms, illustrations) instead of capping the page.
- Maintain WCAG AA contrast and respect `prefers-reduced-motion`. Collapse grid columns below 768px with no horizontal overflow.

# House style

- Icons come from `@phosphor-icons/react` (use `@phosphor-icons/react/dist/ssr` in server components). Don't hand-draw icon SVGs.
- Motion: prefer CSS. Scroll reveals use `Reveal` (a CSS scroll-driven animation, no JavaScript); entrances use the `animate-*` tokens in `globals.css` behind `motion-safe:`. Use `motion/react` only for pointer-driven effects (the hero parallax). Never start content at `opacity: 0` from JavaScript.
- Performance: no live SVG filters, CSS `filter`/`drop-shadow` on illustrations, or `backdrop-blur`. They made scrolling janky. The brush look is pre-rendered for this reason; don't swap it back to a live filter or a vector outline. Animate only `transform` and `opacity`.
- Renders must be pure: React renders components twice in dev, so anything seeded or random (e.g. `ProductArt` geometry) must be recomputed inside each component from its props, never shared through a mutable closure.
- Mobile: product grids are two-up on phones. Pages with a phone action bar (product, build-a-box, bag) give it the `bottom-bar` class so the footer stays clear. Test at 390px with no horizontal overflow.
- No em or en dashes in customer-facing copy. Use commas, periods or "to" ("1 pm to 4 pm").
- Short lists of facts use `DotList` (accent-red dots). Status labels use `Badge`.
- Product illustrations (`ProductArt`) sit on brushed tinted blocks; they draw their own ground shadow.
