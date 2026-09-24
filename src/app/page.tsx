import Link from "next/link";
import { CalendarCheck, CookingPot, Egg, Truck } from "@phosphor-icons/react/dist/ssr";
import { bestsellers, boxableCookies, categories, fromPrice, getProduct, listProducts, type CategorySlug } from "@/data/products";
import { site } from "@/data/site";
import { formatPrice } from "@/lib/format";
import { HeroArt } from "@/components/HeroArt";
import { ProductArt } from "@/components/ProductArt";
import { Reveal } from "@/components/Reveal";
import { SplitWords } from "@/components/SplitWords";
import { Arrow, BrushPanel, Container, DotList, Eyebrow, SectionTitle, buttonClass, focusClass } from "@/components/ui";

const promises = [
  { icon: CookingPot, label: "Baked every morning" },
  { icon: Egg, label: "Eggless options" },
  { icon: Truck, label: `Free delivery over ${formatPrice(site.delivery.freeAbove)}` },
  { icon: CalendarCheck, label: `Order by ${site.delivery.cutoff} for tomorrow` },
];

const categoryPoints: Record<CategorySlug, string> = {
  cookies: "Boxes of 4 and 6",
  "layer-cups": "Single cups or packs of 4",
  entremets: "½ kg and 1 kg cakes",
  gifting: "Macarons and gift boxes",
};

function categoryFrom(slug: CategorySlug) {
  return Math.min(...listProducts(slug).map(fromPrice));
}

/** Where each cookie sits in the story section's pile. */
const pileSpots = [
  "left-[4%] bottom-[2%] w-[44%] -rotate-12",
  "left-[34%] bottom-0 w-[44%] rotate-6",
  "right-0 bottom-[8%] w-[40%] rotate-12",
  "left-[16%] top-[6%] w-[42%] rotate-3",
  "right-[14%] top-0 w-[40%] -rotate-6",
];

export default function Home() {
  const hero = {
    main: getProduct("brown-butter-chocolate-chunk")!,
    second: getProduct("double-dark-sea-salt")!,
    cup: getProduct("strawberry-shortcake-cup")!,
    floater: getProduct("macaron-box")!,
  };
  const featured = bestsellers().slice(0, 3);
  const [warmA, warmB, coolA, coolB] = categories;
  const cookies = boxableCookies();
  const pile = cookies.slice(0, 5);
  const newCup = getProduct("pistachio-kunafa-cup")!;
  const gifts = { macarons: getProduct("macaron-box")!, box: getProduct("celebration-box")! };

  return (
    <>
      {/* Hero: olive brush block, copy left, products spilling out top-right */}
      <section className="pt-8 md:pt-12">
        <Container>
          <BrushPanel tone="primary" className="grid items-center gap-8 px-6 py-12 md:grid-cols-12 md:px-14 md:py-16">
            <div className="md:col-span-6">
              <p className="text-lg font-medium motion-safe:animate-rise">Cookies, layer cups and cakes</p>
              <h1 className="mt-2 text-display">
                <SplitWords text="Baked this morning." />
              </h1>
              <p className="mt-6 max-w-md text-lg motion-safe:animate-rise [animation-delay:450ms]">
                Small-batch desserts made by hand and delivered to your door, fresh the day they&apos;re baked.
              </p>
              <div className="motion-safe:animate-rise [animation-delay:550ms]">
                <Link href="/shop" className={buttonClass("outline", "mt-8")}>
                  Shop the menu
                  <Arrow />
                </Link>
              </div>
              <ul className="mt-10 flex flex-wrap gap-2" aria-label="Categories">
                {categories.map((c, i) => (
                  <li key={c.slug} className="motion-safe:animate-rise" style={{ animationDelay: `${650 + i * 70}ms` }}>
                    <Link
                      href={`/shop?category=${c.slug}`}
                      className={`inline-flex rounded-full bg-forest-700 px-4 py-2.5 text-sm font-medium transition duration-300 ease-(--ease-spring) hover:-translate-y-0.5 hover:bg-forest-800 ${focusClass}`}
                    >
                      {c.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            {/* Products spill over the block's top edge, like the bowl in the reference */}
            <div className="md:col-span-6 md:-mt-20 md:-mr-10 md:-mb-8">
              <HeroArt {...hero} />
            </div>
          </BrushPanel>
        </Container>
      </section>

      {/* Promise strip */}
      <section id="how-it-works" aria-label="How we bake and deliver" className="scroll-mt-24 py-10">
        <Container>
          <ul className="grid grid-cols-2 gap-x-4 gap-y-4 sm:flex sm:flex-wrap sm:items-center sm:justify-center sm:gap-x-10">
            {promises.map((p, i) => (
              <Reveal as="li" key={p.label} delay={i * 0.05} className="flex items-center gap-2 text-sm font-medium text-primary sm:text-base">
                <p.icon aria-hidden weight="duotone" className="size-6 shrink-0" />
                {p.label}
              </Reveal>
            ))}
          </ul>
        </Container>
      </section>

      {/* Two paired category panels: warm and cool */}
      <section className="pb-16">
        <Container className="grid gap-6 md:grid-cols-2">
          {[
            { tone: "surface" as const, items: [warmA, warmB] },
            { tone: "surface-alt" as const, items: [coolA, coolB] },
          ].map((panel, pi) => (
            <Reveal key={panel.tone} delay={pi * 0.1}>
              <BrushPanel tone={panel.tone} as="article" className="grid h-full grid-cols-2 gap-6 p-8 md:p-10">
                {panel.items.map((c) => (
                  <Link key={c.slug} href={`/shop?category=${c.slug}`} className={`group block rounded-md ${focusClass}`}>
                    <ProductArt
                      art={c.art}
                      seed={c.slug}
                      className="mx-auto w-28 transition-transform duration-500 group-hover:-translate-y-1 group-hover:-rotate-6 md:w-32"
                    />
                    <h3 className="mt-4 text-h3 decoration-2 underline-offset-4 group-hover:underline">{c.name}</h3>
                    <DotList className="mt-3 text-sm" items={[categoryPoints[c.slug], `From ${formatPrice(categoryFrom(c.slug))}`]} />
                  </Link>
                ))}
              </BrushPanel>
            </Reveal>
          ))}
        </Container>
      </section>

      {/* Bestseller cards */}
      <section className="pb-16">
        <Container>
          <Reveal className="text-center">
            <SectionTitle>Our bestsellers</SectionTitle>
          </Reveal>
          <ul className="-mx-4 mt-10 flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-2 [scrollbar-width:none] md:mx-0 md:grid md:grid-cols-3 md:gap-6 md:overflow-visible md:px-0">
            {featured.map((p, i) => (
              <Reveal as="li" key={p.slug} delay={i * 0.08} className="w-[80%] shrink-0 snap-center md:w-auto">
                <BrushPanel tone="primary" className="group flex h-full flex-col items-center px-8 pt-8 pb-10 text-center">
                  <ProductArt art={p.art} seed={p.slug} className="w-28 transition-transform duration-700 ease-(--ease-spring) group-hover:-translate-y-2 group-hover:rotate-6" />
                  <h3 className="mt-4 text-h3">{p.name}</h3>
                  <p className="mt-1 text-sm">From {formatPrice(fromPrice(p))}</p>
                  <hr className="my-5 w-full border-on-primary/25" />
                  <p className="max-w-xs">{p.tagline}</p>
                  <div className="mt-auto pt-6">
                    <Link href={`/shop/${p.slug}`} className={buttonClass("outline", "", "sm")} aria-label={`View ${p.name}`}>
                      View details
                    </Link>
                  </div>
                </BrushPanel>
              </Reveal>
            ))}
          </ul>
        </Container>
      </section>

      {/* Build-a-box promo pair: wide pattern block + narrow callout */}
      <section className="pb-16">
        <Container className="grid gap-6 md:grid-cols-12">
          <Reveal className="md:col-span-8">
            <Link href="/build-a-box" className={`group block h-full rounded-md ${focusClass}`}>
              <BrushPanel tone="pink" className="flex h-full min-h-80 flex-col p-8 md:block md:p-10">
                <div aria-hidden className="order-last mt-6 grid grid-cols-3 content-center gap-2 md:absolute md:inset-y-0 md:right-0 md:mt-0 md:w-[58%] md:max-w-md md:p-4 lg:right-8 xl:max-w-lg">
                  {[...cookies, ...cookies].slice(0, 9).map((c, i) => (
                    <ProductArt
                      key={i}
                      art={c.art}
                      seed={`${c.slug}-${i}`}
                      className={`w-full transition-transform duration-700 ease-(--ease-spring) ${i % 2 ? "rotate-12 group-hover:-translate-y-2 group-hover:rotate-0" : "-rotate-6 group-hover:translate-y-1 group-hover:rotate-6"}`}
                    />
                  ))}
                </div>
                <div className="relative md:max-w-[15rem]">
                  <p className="text-label text-pink-800">Build a box</p>
                  <h2 className="mt-2 text-h2">Mix your favourite cookies</h2>
                  <p className="mt-4">Any 4, 6 or 12, baked fresh for your delivery day.</p>
                  <span className={buttonClass("accent", "mt-6")}>
                    Build a box
                    <Arrow />
                  </span>
                </div>
              </BrushPanel>
            </Link>
          </Reveal>
          <Reveal delay={0.1} className="md:col-span-4">
            <Link href={`/shop/${newCup.slug}`} className={`group block h-full rounded-md ${focusClass}`}>
              <BrushPanel paint="bg-forest-100" shape={2} className="flex h-full min-h-80 flex-col items-center justify-center p-8 text-center">
                <ProductArt art={newCup.art} seed={newCup.slug} className="w-40 transition-transform duration-500 group-hover:-rotate-6" />
                <p className="mt-4 -rotate-3 font-display text-3xl leading-tight">Try the {newCup.name}</p>
                <p className="mt-2 text-sm">{newCup.tagline}</p>
              </BrushPanel>
            </Link>
          </Reveal>
        </Container>
      </section>

      {/* Story split with cookie pile */}
      <section id="story" className="scroll-mt-24 pb-16">
        <Container>
          <BrushPanel tone="surface" className="grid items-center gap-10 px-8 py-12 md:grid-cols-12 md:px-14 md:py-16">
            <Reveal className="md:col-span-6">
              <Eyebrow>Our story</Eyebrow>
              <SectionTitle className="mt-2">Made slowly, on purpose.</SectionTitle>
              <p className="mt-6 max-w-md text-lg">
                Curmora started with one tray of brown butter cookies. We still bake by hand, in small batches, with
                ingredients we&apos;d eat on their own.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link href="/shop" className={buttonClass("accent")}>
                  Shop the menu
                </Link>
                <Link href="/build-a-box" className={buttonClass("highlight")}>
                  Build a box
                </Link>
              </div>
            </Reveal>
            <div aria-hidden className="relative mx-auto aspect-[4/3] w-full max-w-md md:col-span-6">
              {pile.map((c, i) => (
                <Reveal key={c.slug} delay={0.1 + i * 0.08} className={`absolute ${pileSpots[i]}`}>
                  <ProductArt art={c.art} seed={c.slug} />
                </Reveal>
              ))}
            </div>
          </BrushPanel>
        </Container>
      </section>

      {/* Gifting banner */}
      <section>
        <Container>
          <Reveal>
            <BrushPanel tone="accent" className="flex flex-col items-center gap-6 px-8 py-12 text-center md:py-14">
              <div>
                <h2 className="text-h2">Gifting, sorted.</h2>
                <p className="mt-2 text-lg">Add a handwritten note at checkout and we&apos;ll take it from there.</p>
              </div>
              <div className="flex flex-wrap justify-center gap-3">
                <Link href="/shop?category=gifting" className={buttonClass("highlight")}>
                  Shop gifts
                </Link>
                <Link href={`/shop/${gifts.macarons.slug}`} className={buttonClass("highlight")}>
                  {gifts.macarons.name}
                </Link>
                <Link href={`/shop/${gifts.box.slug}`} className={buttonClass("light")}>
                  {gifts.box.name}, {formatPrice(gifts.box.variants[0].price)}
                </Link>
              </div>
            </BrushPanel>
          </Reveal>
        </Container>
      </section>
    </>
  );
}
