import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getCategory, getProduct, listProducts, toneSplit } from "@/data/products";
import { ProductArt } from "@/components/ProductArt";
import { ProductCard } from "@/components/ProductCard";
import { AddToBag } from "@/components/AddToBag";
import { Badge, Container, SectionTitle, focusClass } from "@/components/ui";

export function generateStaticParams() {
  return listProducts().map((p) => ({ slug: p.slug }));
}

export const dynamicParams = false;

export async function generateMetadata(props: PageProps<"/shop/[slug]">): Promise<Metadata> {
  const { slug } = await props.params;
  const product = getProduct(slug);
  return product ? { title: product.name, description: product.description } : {};
}

export default async function ProductPage(props: PageProps<"/shop/[slug]">) {
  const { slug } = await props.params;
  const product = getProduct(slug);
  if (!product || product.hidden) notFound();

  const category = getCategory(product.category)!;
  const related = listProducts(product.category)
    .filter((p) => p.slug !== product.slug)
    .slice(0, 3);
  const layered = product.category === "layer-cups" || product.category === "entremets";

  return (
    <>
      <Container className="py-5">
        <nav aria-label="Breadcrumb">
          <ol className="flex flex-wrap gap-2 text-label text-text-muted">
            <li>
              <Link href="/shop" className={`hover:text-ink ${focusClass}`}>
                Shop
              </Link>
              <span aria-hidden className="ml-2">/</span>
            </li>
            <li>
              <Link href={`/shop?category=${category.slug}`} className={`hover:text-ink ${focusClass}`}>
                {category.name}
              </Link>
              <span aria-hidden className="ml-2">/</span>
            </li>
            <li aria-current="page" className="text-ink">
              {product.name}
            </li>
          </ol>
        </nav>
      </Container>

      <Container className="grid gap-10 pb-32 md:grid-cols-12 md:gap-12 md:pb-28">
        <div className={`relative aspect-[4/5] self-start overflow-hidden backdrop-split md:sticky md:top-32 md:col-span-7 lg:aspect-square ${toneSplit[product.tone]}`}>
          <ProductArt art={product.art} seed={product.slug} title={`Illustration of ${product.name}`} className="absolute inset-[12%]" />
          <div className="absolute top-4 left-4 flex flex-col items-start gap-2">
            {product.bestseller && <Badge>Bestseller</Badge>}
            {product.eggless && <Badge tone="surface">Eggless</Badge>}
          </div>
        </div>

        <div className="md:col-span-5">
          <p className="text-label text-text-muted">{category.name}</p>
          <h1 className="mt-3 text-hero">{product.name}</h1>
          <p className="mt-3 text-lg font-light italic">{product.tagline}</p>
          <p className="mt-4 text-body-md">{product.description}</p>

          <div className="mt-8 border-t border-border pt-8">
            <AddToBag product={product} />
          </div>

          <section aria-labelledby="inside" className="mt-12">
            <h2 id="inside" className="text-title">
              {layered ? "The layers" : "What's inside"}
            </h2>
            {layered ? (
              <>
                <p className="mt-1 text-sm text-text-muted">From top to bottom.</p>
                {/* A cross-section of the dessert: one colour band per layer, labelled alongside. */}
                <ol className="mt-6">
                  {product.inside.map((item, i) => {
                    const first = i === 0;
                    const last = i === product.inside.length - 1;
                    return (
                      <li key={item.name} className="grid grid-cols-[4.5rem_1fr] gap-x-6">
                        <span
                          aria-hidden
                          className={`block border-x border-ink ${first ? "border-t" : ""} ${last ? "border-b" : "border-b border-b-ink/20"}`}
                          style={{ background: `var(--color-${item.color})` }}
                        />
                        <div className={`py-4 ${last ? "" : "border-b border-border"}`}>
                          <p className="font-medium">{item.name}</p>
                          <p className="text-sm text-text-muted">{item.detail}</p>
                        </div>
                      </li>
                    );
                  })}
                </ol>
              </>
            ) : (
              <ul className="mt-6 grid gap-3 sm:grid-cols-2">
                {product.inside.map((item) => (
                  <li key={item.name} className="flex items-center gap-4 border border-border bg-surface p-4">
                    <span aria-hidden className="size-10 shrink-0 border border-ink" style={{ background: `var(--color-${item.color})` }} />
                    <span>
                      <span className="block font-medium">{item.name}</span>
                      <span className="block text-sm text-text-muted">{item.detail}</span>
                    </span>
                  </li>
                ))}
              </ul>
            )}
          </section>

          <section aria-labelledby="good-to-know" className="mt-12">
            <h2 id="good-to-know" className="text-title">
              Good to know
            </h2>
            <dl className="mt-6 grid grid-cols-2 gap-x-6 gap-y-6">
              {[...product.details, { label: "Eggless", value: product.eggless ? "Yes" : "No, contains egg" }].map((d) => (
                <div key={d.label}>
                  <dt className="text-label text-text-muted">{d.label}</dt>
                  <dd className="mt-1 text-text">{d.value}</dd>
                </div>
              ))}
            </dl>
          </section>
        </div>
      </Container>

      {related.length > 0 && (
        <section className="bg-blush py-14 md:py-20">
          <Container>
            <SectionTitle>You might also like</SectionTitle>
            <ul className="mt-6 grid grid-cols-2 gap-x-3 gap-y-8 sm:gap-x-4 lg:grid-cols-3">
              {related.map((p) => (
                <li key={p.slug}>
                  <ProductCard product={p} />
                </li>
              ))}
            </ul>
          </Container>
        </section>
      )}
    </>
  );
}
