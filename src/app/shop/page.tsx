import type { Metadata } from "next";
import Link from "next/link";
import { categories, getCategory, listProducts, type CategorySlug } from "@/data/products";
import { site } from "@/data/site";
import { ProductCard } from "@/components/ProductCard";
import { Arrow, BrushPanel, Container, Eyebrow, buttonClass, focusClass } from "@/components/ui";

export const metadata: Metadata = {
  title: "Shop",
  description: "Cookies, layer cups, entremet cakes, macarons and gift boxes.",
};

export default async function ShopPage(props: PageProps<"/shop">) {
  const { category: raw } = await props.searchParams;
  const active = typeof raw === "string" ? getCategory(raw) : undefined;
  const products = listProducts(active?.slug as CategorySlug | undefined);

  const tabs = [{ slug: undefined, name: "Everything" }, ...categories];

  return (
    <Container className="py-12">
      <Eyebrow>{active ? "Shop" : "The full menu"}</Eyebrow>
      <h1 className="mt-4 text-display">{active?.name ?? "Shop everything"}</h1>
      <p className="mt-4 max-w-xl text-lg">
        {active?.blurb ?? `Everything we bake, all in one place. Order by ${site.delivery.cutoff} for next-day delivery.`}
      </p>

      <nav aria-label="Categories" className="-mx-4 mt-8 overflow-x-auto px-4 [scrollbar-width:none] md:mx-0 md:px-0">
        <ul className="flex gap-2 pb-2">
          {tabs.map((t) => {
            const current = t.slug === active?.slug;
            return (
              <li key={t.name} className="shrink-0">
                <Link
                  href={t.slug ? `/shop?category=${t.slug}` : "/shop"}
                  aria-current={current ? "page" : undefined}
                  className={`block rounded-full border-[1.5px] px-5 py-2 text-label transition-colors ${focusClass} ${
                    current ? "border-primary bg-primary text-on-primary" : "border-text text-text hover:bg-surface"
                  }`}
                >
                  {t.name}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      <ul className="mt-8 grid grid-cols-2 gap-x-3 gap-y-6 sm:mt-10 sm:gap-x-6 sm:gap-y-12 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
        {products.map((p) => (
          <li key={p.slug}>
            <ProductCard product={p} />
          </li>
        ))}
        {(!active || active.slug === "cookies") && (
          <li className="col-span-2 sm:col-span-1">
            <BrushPanel tone="primary" className="flex h-full flex-col justify-between gap-4 p-8 sm:min-h-80">
              <div>
                <p className="text-label text-highlight">Build a box</p>
                <h2 className="mt-2 text-h3">Mix your own cookie box</h2>
                <p className="mt-2">Choose any 4, 6 or 12 cookies. We&apos;ll bake them fresh for your delivery day.</p>
              </div>
              <Link href="/build-a-box" className={buttonClass("highlight", "self-start")}>
                Build a box
                <Arrow />
              </Link>
            </BrushPanel>
          </li>
        )}
      </ul>
    </Container>
  );
}
