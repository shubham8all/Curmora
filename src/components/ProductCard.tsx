import Link from "next/link";
import { fromPrice, tonePaint, type Product } from "@/data/products";
import { formatPrice } from "@/lib/format";
import { ProductArt } from "@/components/ProductArt";
import { Badge, BrushPanel, buttonClass, focusClass, type BrushShape } from "@/components/ui";

/** Picks a brush outline from the slug so neighbouring cards differ but stay stable between renders. */
function shapeFor(slug: string) {
  let sum = 0;
  for (const ch of slug) sum += ch.charCodeAt(0);
  return (sum % 4) as BrushShape;
}

/**
 * Brush-painted tile in the product's tone, with the illustration rising out of the top.
 * Compact on phones (two per row), roomier from `sm` up.
 */
export function ProductCard({ product }: { product: Product }) {
  const multiple = product.variants.length > 1;

  return (
    <Link href={`/shop/${product.slug}`} className={`group block h-full rounded-md ${focusClass}`}>
      <BrushPanel
        paint={tonePaint[product.tone]}
        shape={shapeFor(product.slug)}
        size="sm"
        className="flex h-full flex-col px-3 pt-3 pb-5 transition-transform duration-500 ease-(--ease-spring) group-hover:-translate-y-1.5 group-active:scale-[0.98] sm:px-6 sm:pt-4 sm:pb-8"
      >
        {(product.bestseller || product.eggless) && (
          <div className="absolute top-2 left-2 z-10 flex flex-col items-start gap-1 sm:top-4 sm:left-4 sm:gap-2">
            {product.bestseller && <Badge className="max-sm:px-2 max-sm:text-[0.6875rem]">Bestseller</Badge>}
            {product.eggless && (
              <Badge tone="highlight" className="max-sm:px-2 max-sm:text-[0.6875rem]">
                Eggless
              </Badge>
            )}
          </div>
        )}
        <ProductArt
          art={product.art}
          seed={product.slug}
          className="mx-auto aspect-square w-full max-w-56 transition-transform duration-700 ease-(--ease-spring) group-hover:-translate-y-3 group-hover:scale-105 group-hover:rotate-6"
        />
        <h3 className="mt-2 font-display text-lg leading-tight sm:text-h3">{product.name}</h3>
        <p className="mt-1 hidden text-sm text-text-muted sm:block">{product.tagline}</p>
        <div className="mt-auto flex items-center justify-between gap-4 pt-3 sm:pt-6">
          <p className="text-label tabular-nums max-sm:text-sm">
            {multiple && <span className="font-normal text-text-muted">from </span>}
            {formatPrice(fromPrice(product))}
          </p>
          <span aria-hidden className={buttonClass("outline", "pointer-events-none max-sm:hidden", "sm")}>
            View
          </span>
        </div>
      </BrushPanel>
    </Link>
  );
}
