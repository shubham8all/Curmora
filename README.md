# Curmora

Storefront for a small-batch dessert brand: cookies, layer cups, entremet cakes, macarons and gift boxes. Built with Next.js (App Router), TypeScript and Tailwind CSS v4, styled to the Rose Atelier system in [design.md](design.md), set in Montserrat.

## Run it

```bash
npm install
npm run dev     # http://localhost:3000
npm run build   # production build
npm run lint
```

## Where things live

| Path | What |
| --- | --- |
| `design.md` | Design system and brand palette (source of truth) |
| `src/app/globals.css` | design.md tokens as Tailwind theme values |
| `src/data/products.ts` | Product catalogue, categories, prices (INR) |
| `src/data/site.ts` | Store copy, delivery fee, cutoff, time slots |
| `src/components/ProductArt.tsx` | SVG product illustrations |
| `src/lib/bag.ts` | Shopping bag (localStorage) |
| `src/lib/order.ts` | Order creation (stub; see below) |

## Pages

`/` home · `/shop` (filter with `?category=`) · `/shop/[slug]` product · `/build-a-box` · `/bag` · `/checkout` · `/order/confirmed`

## Not built yet

- **Orders aren't sent anywhere.** Checkout validates the form, saves the order in the browser and shows a confirmation. Connect `saveOrder` in `src/lib/order.ts` to a backend (and add a payment provider) before taking real orders.
- **Placeholder content.** Product names, prices, descriptions, the brand story and delivery rules are sample copy. Illustrations stand in for product photography.
