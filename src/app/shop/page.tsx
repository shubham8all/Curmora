import type { Metadata } from "next";
import Link from "next/link";
import { bestsellers, categories, getCategory, listProducts, type CategorySlug } from "@/data/products";
import { site } from "@/data/site";
import { ProductCard } from "@/components/ProductCard";
import { Arrow, Container, buttonClass, focusClass } from "@/components/ui";

export const metadata: Metadata = {
  title: "Shop",
  description: "Cookies, layer cups, entremet cakes, macarons and gift boxes.",
};

/** Collections cut across categories, like the "Bestsellers" and "Eggless" menus. */
const collections = {
  bestsellers: { name: "Bestsellers", blurb: "The ones people order again and again.", list: () => bestsellers() },
  eggless: { name: "Eggless menu", blurb: "Everything we bake without eggs. Nobody can tell.", list: () => listProducts().filter((p) => p.eggless) },
} as const;

type CollectionSlug = keyof typeof collections;

export default async function ShopPage(props: PageProps<"/shop">) {
  const { category: rawCategory, collection: rawCollection } = await props.searchParams;
  const category = typeof rawCategory === "string" ? getCategory(rawCategory) : undefined;
  const collectionSlug = typeof rawCollection === "string" && rawCollection in collections ? (rawCollection as CollectionSlug) : undefined;
  const collection = collectionSlug ? collections[collectionSlug] : undefined;

  const products = collection ? collection.list() : listProducts(category?.slug as CategorySlug | undefined);
  const title = collection?.name ?? category?.name ?? "Shop everything";
  const blurb = collection?.blurb ?? category?.blurb ?? `Everything we bake, all in one place. Order by ${site.delivery.cutoff} for next-day delivery.`;

  const tabs = [
    { href: "/shop", name: "Everything", current: !category && !collection },
    ...categories.map((c) => ({ href: `/shop?category=${c.slug}`, name: c.name, current: category?.slug === c.slug })),
    ...(Object.keys(collections) as CollectionSlug[]).map((k) => ({ href: `/shop?collection=${k}`, name: collections[k].name, current: collectionSlug === k })),
  ];

  return (
    <>
      <div className="bg-blush">
        <Container className="py-12 text-center md:py-16">
          <h1 className="text-hero">{title}</h1>
          <p className="mx-auto mt-3 max-w-xl text-text-muted">{blurb}</p>
        </Container>
      </div>

      <Container className="py-8 md:py-12">
        <nav aria-label="Menu" className="-mx-4 overflow-x-auto border-b border-border px-4 [scrollbar-width:none] sm:-mx-6 sm:px-6 lg:mx-0 lg:px-0">
          <ul className="flex gap-6 lg:justify-center">
            {tabs.map((t) => (
              <li key={t.name} className="shrink-0">
                <Link
                  href={t.href}
                  aria-current={t.current ? "page" : undefined}
                  className={`relative block py-3 text-label transition-colors after:absolute after:inset-x-0 after:-bottom-px after:h-0.5 after:bg-ink after:transition-transform ${focusClass} ${
                    t.current ? "text-ink after:scale-x-100" : "text-text-muted after:scale-x-0 hover:text-ink"
                  }`}
                >
                  {t.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <ul className="mt-8 grid grid-cols-2 gap-x-3 gap-y-8 sm:mt-10 sm:gap-x-4 sm:gap-y-12 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
          {products.map((p) => (
            <li key={p.slug}>
              <ProductCard product={p} />
            </li>
          ))}
          {!collection && (!category || category.slug === "cookies") && (
            <li className="col-span-2 sm:col-span-1">
              <div className="flex aspect-[4/5] flex-col items-center justify-center gingham p-6 text-center [--check:20px] max-sm:aspect-auto max-sm:py-12">
                <div className="bg-surface px-6 py-8">
                  <p className="text-label text-text-muted">Build a box</p>
                  <h2 className="mt-2 text-title">Mix your own cookie box</h2>
                  <p className="mt-2 text-sm">Any 4, 6 or 12 cookies, baked fresh for your delivery day.</p>
                  <Link href="/build-a-box" className={buttonClass("primary", "mt-5")}>
                    Build a box
                    <Arrow />
                  </Link>
                </div>
              </div>
            </li>
          )}
        </ul>
      </Container>
    </>
  );
}
