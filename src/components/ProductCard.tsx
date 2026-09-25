import Link from "next/link";
import { fromPrice, toneSplit, type Product } from "@/data/products";
import { formatPrice } from "@/lib/format";
import { ProductArt } from "@/components/ProductArt";
import { QuickAdd } from "@/components/QuickAdd";
import { Badge } from "@/components/ui";

/**
 * design.md product tile: a tall two-tone diagonal backdrop with the illustration, the name and
 * price set underneath, and a quick "Add" that slides up on hover (always shown on touch screens).
 * The name link stretches over the whole card; the Add button sits above it.
 */
export function ProductCard({ product }: { product: Product }) {
  const multiple = product.variants.length > 1;

  return (
    <article className="group relative has-[a:focus-visible]:outline-2 has-[a:focus-visible]:outline-offset-4 has-[a:focus-visible]:outline-(--focus-ring)">
      <div className={`relative aspect-[4/5] overflow-hidden backdrop-split ${toneSplit[product.tone]}`}>
        <ProductArt
          art={product.art}
          seed={product.slug}
          className="absolute inset-[12%] transition-transform duration-700 ease-(--ease-soft) group-hover:scale-110 group-hover:-rotate-3"
        />
        {(product.bestseller || product.eggless) && (
          <div className="absolute top-3 left-3 flex flex-col items-start gap-1.5">
            {product.bestseller && <Badge>Bestseller</Badge>}
            {product.eggless && <Badge tone="surface">Eggless</Badge>}
          </div>
        )}
        <QuickAdd
          product={product}
          className="absolute right-3 bottom-3 z-10 md:translate-y-2 md:opacity-0 md:group-hover:translate-y-0 md:group-hover:opacity-100 md:group-focus-within:translate-y-0 md:group-focus-within:opacity-100"
        />
      </div>
      <h3 className="mt-3 text-sm leading-snug font-medium sm:text-[0.9375rem]">
        <Link href={`/shop/${product.slug}`} className="outline-none after:absolute after:inset-0 hover:underline hover:underline-offset-4">
          {product.name}
        </Link>
      </h3>
      <p className="mt-1 text-sm text-text-muted tabular-nums">
        {multiple && "From "}
        {formatPrice(fromPrice(product))}
      </p>
    </article>
  );
}
