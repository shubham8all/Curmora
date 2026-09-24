import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getCategory, getProduct, listProducts, tonePaint } from "@/data/products";
import { ProductArt } from "@/components/ProductArt";
import { ProductCard } from "@/components/ProductCard";
import { AddToBag } from "@/components/AddToBag";
import { Badge, BrushPanel, Container, SectionTitle, focusClass } from "@/components/ui";

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
      <Container className="py-6">
        <nav aria-label="Breadcrumb">
          <ol className="flex flex-wrap gap-2 text-sm">
            <li>
              <Link href="/shop" className={`rounded-sm underline underline-offset-4 ${focusClass}`}>
                Shop
              </Link>
              <span aria-hidden className="ml-2">/</span>
            </li>
            <li>
              <Link href={`/shop?category=${category.slug}`} className={`rounded-sm underline underline-offset-4 ${focusClass}`}>
                {category.name}
              </Link>
              <span aria-hidden className="ml-2">/</span>
            </li>
            <li aria-current="page">{product.name}</li>
          </ol>
        </nav>
      </Container>

      <Container className="grid gap-10 pb-32 md:grid-cols-12 md:gap-12 md:pb-28">
        <BrushPanel paint={tonePaint[product.tone]} shape={1} className="self-start p-10 md:sticky md:top-28 md:col-span-7">
          <ProductArt art={product.art} seed={product.slug} doodles title={`Illustration of ${product.name}`} className="mx-auto aspect-square w-full max-w-lg" />
          <div className="absolute top-6 left-6 flex flex-col items-start gap-2">
            {product.bestseller && <Badge>Bestseller</Badge>}
            {product.eggless && <Badge tone="highlight">Eggless</Badge>}
          </div>
        </BrushPanel>

        <div className="md:col-span-5">
          <h1 className="font-display text-5xl leading-[1.05] tracking-tight text-text md:text-6xl">
            {product.name}
          </h1>
          <p className="mt-4 text-xl font-medium text-primary">{product.tagline}</p>
          <p className="mt-4 text-body-md">{product.description}</p>

          <div className="mt-8 border-t border-border pt-8">
            <AddToBag product={product} />
          </div>

          <section aria-labelledby="inside" className="mt-12">
            <h2 id="inside" className="font-display text-3xl tracking-tight text-text">
              {layered ? "The layers" : "What's inside"}
            </h2>
            {layered ? (
              <>
                <p className="mt-2 text-sm">From top to bottom.</p>
                {/* A cross-section of the dessert: one colour band per layer, labelled alongside. */}
                <ol className="mt-6">
                  {product.inside.map((item, i) => {
                    const first = i === 0;
                    const last = i === product.inside.length - 1;
                    return (
                      <li key={item.name} className="grid grid-cols-[4.5rem_1fr] gap-x-6">
                        <span
                          aria-hidden
                          className={`block border-x-2 border-text ${first ? "rounded-t-lg border-t-2" : ""} ${last ? "rounded-b-lg border-b-2" : "border-b border-b-ink/20"}`}
                          style={{ background: `var(--color-${item.color})` }}
                        />
                        <div className={`py-4 ${last ? "" : "border-b border-border"}`}>
                          <p className="font-semibold text-text">{item.name}</p>
                          <p className="text-sm">{item.detail}</p>
                        </div>
                      </li>
                    );
                  })}
                </ol>
              </>
            ) : (
              <ul className="mt-6 grid gap-3 sm:grid-cols-2">
                {product.inside.map((item) => (
                  <li key={item.name} className="flex items-center gap-4 rounded-md bg-surface p-4 inset-shadow-well">
                    <span aria-hidden className="size-10 shrink-0 rounded-md border-2 border-text" style={{ background: `var(--color-${item.color})` }} />
                    <span>
                      <span className="block font-semibold text-text">{item.name}</span>
                      <span className="block text-sm">{item.detail}</span>
                    </span>
                  </li>
                ))}
              </ul>
            )}
          </section>

          <section aria-labelledby="good-to-know" className="mt-12">
            <h2 id="good-to-know" className="font-display text-3xl tracking-tight text-text">
              Good to know
            </h2>
            <dl className="mt-6 grid grid-cols-2 gap-x-6 gap-y-6">
              {[...product.details, { label: "Eggless", value: product.eggless ? "Yes" : "No, contains egg" }].map((d) => (
                <div key={d.label}>
                  <dt className="text-label text-accent">{d.label}</dt>
                  <dd className="mt-1 text-text">{d.value}</dd>
                </div>
              ))}
            </dl>
          </section>
        </div>
      </Container>

      {related.length > 0 && (
        <section className="border-t border-border bg-surface py-20 md:py-28">
          <Container>
            <SectionTitle>You might also like</SectionTitle>
            <ul className="mt-10 grid grid-cols-2 gap-x-3 gap-y-6 sm:gap-x-6 sm:gap-y-12 lg:grid-cols-3">
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
