import Link from "next/link";
import { Basket, ChefHat, Egg, Package } from "@phosphor-icons/react/dist/ssr";
import { bestsellers, boxableCookies, getProduct, toneSplit, type Product } from "@/data/products";
import { site } from "@/data/site";
import { formatPrice } from "@/lib/format";
import { FlatLay } from "@/components/FlatLay";
import { Marquee } from "@/components/Marquee";
import { ProductArt } from "@/components/ProductArt";
import { ProductCard } from "@/components/ProductCard";
import { Reveal } from "@/components/Reveal";
import { Testimonials } from "@/components/Testimonials";
import { Container, SectionTitle, TextLink, buttonClass, focusClass } from "@/components/ui";

/** "Our menu" row: collections and categories, each shown with a signature piece. */
const menu: { label: string; href: string; slug: string }[] = [
  { label: "Bestsellers", href: "/shop?collection=bestsellers", slug: "dark-chocolate-salted-caramel" },
  { label: "Cookies", href: "/shop?category=cookies", slug: "brown-butter-chocolate-chunk" },
  { label: "Layer cups", href: "/shop?category=layer-cups", slug: "strawberry-shortcake-cup" },
  { label: "Entremet cakes", href: "/shop?category=entremets", slug: "vanilla-almond-raspberry" },
  { label: "Eggless menu", href: "/shop?collection=eggless", slug: "pistachio-kunafa-cup" },
  { label: "Macarons & gifts", href: "/shop?category=gifting", slug: "macaron-box" },
  { label: "Build a box", href: "/build-a-box", slug: "build-a-box" },
];

const values = [
  { icon: Basket, title: "Ingredient forward", body: "Real butter, good chocolate and fruit at its best." },
  { icon: ChefHat, title: "Baked every morning", body: "Small batches from our own kitchen, never from a freezer." },
  { icon: Egg, title: "Eggless options", body: "Look for the eggless label across cookies, cups and cakes." },
  { icon: Package, title: "Made to travel", body: `Packed by hand. Free delivery over ${formatPrice(site.delivery.freeAbove)}.` },
];

/** Cookies drifting across the feature band. */
const drift = [
  "left-[6%] top-[10%] w-[26%] -rotate-12",
  "left-[38%] top-[4%] w-[22%] rotate-6",
  "right-[4%] top-[16%] w-[28%] rotate-12",
  "left-[16%] bottom-[6%] w-[24%] rotate-3",
  "right-[18%] bottom-[2%] w-[26%] -rotate-6",
];

export default function Home() {
  const featured = bestsellers().slice(0, 4);
  const cookies = boxableCookies();
  const menuItems = menu.map((m) => ({ ...m, product: getProduct(m.slug) })).filter((m): m is typeof m & { product: Product } => Boolean(m.product));

  return (
    <>
      {/* Hero: blush panel with centred copy beside a gingham flat-lay */}
      <section className="grid lg:h-[min(calc(100dvh-8.5rem),52rem)] lg:min-h-[36rem] lg:grid-cols-[5fr_7fr]">
        <div className="order-last flex items-center justify-center bg-blush px-6 py-14 text-center lg:order-first lg:py-20">
          <div className="max-w-md">
            <h1 className="text-hero motion-safe:animate-rise">Small-batch desserts for every celebration</h1>
            <p className="mt-5 motion-safe:animate-rise [animation-delay:150ms]">
              Cookies, layer cups and French-style entremet cakes, baked every morning and delivered to your door.
            </p>
            <div className="motion-safe:animate-rise [animation-delay:300ms]">
              <Link href="/shop" className={buttonClass("light", "mt-8")}>
                Order now
              </Link>
            </div>
          </div>
        </div>
        <FlatLay className="aspect-square lg:aspect-auto" />
      </section>

      {/* Our menu: sideways-scrolling row of tiles */}
      <section aria-labelledby="our-menu" className="py-14 md:py-20">
        <Container>
          <SectionTitle>
            <span id="our-menu">Our menu</span>
          </SectionTitle>
        </Container>
        <div
          role="region"
          aria-label="Menu categories"
          tabIndex={0}
          className={`mt-6 overflow-x-auto pb-4 [scrollbar-width:thin] ${focusClass}`}
        >
          <ul className="flex snap-x snap-mandatory gap-3 px-4 sm:gap-4 sm:px-6 lg:px-10 2xl:px-16">
            {menuItems.map((m, i) => (
              <Reveal as="li" key={m.label} delay={i * 0.04} className="w-[68%] shrink-0 snap-start sm:w-[40%] md:w-[30%] lg:w-[22%] 2xl:w-[18%]">
                <Link href={m.href} className={`group block ${focusClass}`}>
                  <div className={`relative aspect-[4/5] overflow-hidden backdrop-split ${toneSplit[m.product.tone]}`}>
                    <ProductArt
                      art={m.product.art}
                      seed={m.product.slug}
                      className="absolute inset-[14%] transition-transform duration-700 ease-(--ease-soft) group-hover:scale-110 group-hover:rotate-3"
                    />
                  </div>
                  <h3 className="mt-3 text-title">{m.label}</h3>
                </Link>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      {/* Values: thin line icons on a blush band */}
      <section id="how-it-works" aria-label="How we bake" className="scroll-mt-28 bg-blush py-16 md:py-24">
        <Container>
          <ul className="grid grid-cols-2 gap-x-4 gap-y-10 text-center lg:grid-cols-4 lg:gap-12">
            {values.map((v, i) => (
              <Reveal as="li" key={v.title} delay={i * 0.06}>
                <v.icon aria-hidden weight="thin" className="mx-auto size-16 text-ink sm:size-24 md:size-28" />
                <h3 className="mt-5 text-title">{v.title}</h3>
                <p className="mx-auto mt-2 max-w-60 text-sm text-text-muted">{v.body}</p>
              </Reveal>
            ))}
          </ul>
        </Container>
      </section>

      {/* Feature band: italic statement on rose-deep, cookies drifting alongside */}
      <section className="overflow-hidden bg-rose-deep text-on-rose-deep [--focus-ring:var(--color-beige-50)]">
        <Container className="grid items-center gap-10 py-16 md:min-h-[34rem] md:grid-cols-2 md:py-20">
          <Reveal>
            <h2 className="max-w-xl text-feature">Build a box, one cookie at a time.</h2>
            <p className="mt-6 max-w-md">
              Choose any 4, 6 or 12 of our cookies. We bake every box fresh for your delivery day, so each one arrives
              just as it left the oven.
            </p>
            <Link href="/build-a-box" className={buttonClass("light", "mt-8")}>
              Build a box
            </Link>
          </Reveal>
          <div aria-hidden className="relative mx-auto aspect-[4/3] w-full max-w-xl">
            {cookies.slice(0, 5).map((c, i) => (
              <div key={c.slug} className={`absolute ${drift[i]}`}>
                <div className="motion-safe:animate-float" style={{ animationDuration: `${5 + i}s`, animationDelay: `${-i * 1.3}s` }}>
                  <ProductArt art={c.art} seed={c.slug} />
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <Testimonials />

      {/* Bestsellers grid */}
      <section aria-labelledby="bestsellers" className="py-14 md:py-20">
        <Container>
          <div className="flex items-baseline justify-between gap-4">
            <SectionTitle>
              <span id="bestsellers">Bestsellers</span>
            </SectionTitle>
            <TextLink href="/shop">Shop all</TextLink>
          </div>
          <ul className="mt-6 grid grid-cols-2 gap-x-3 gap-y-8 sm:gap-x-4 lg:grid-cols-4">
            {featured.map((p, i) => (
              <Reveal as="li" key={p.slug} delay={i * 0.05}>
                <ProductCard product={p} />
              </Reveal>
            ))}
          </ul>
        </Container>
      </section>

      {/* Scrolling band over two tones, finished with a gingham strip */}
      <section aria-label="Order information">
        <div className="relative grid min-h-80 place-items-center overflow-hidden bg-[linear-gradient(90deg,var(--color-pink-300)_0_50%,var(--color-beige-200)_50%_100%)] py-16 md:min-h-[28rem]">
          <div className="w-full">
            <Marquee
              text={`Baked fresh every morning. Order by ${site.delivery.cutoff} for tomorrow. Free delivery over ${formatPrice(site.delivery.freeAbove)}. `}
              label={`Baked fresh every morning. Order by ${site.delivery.cutoff} for tomorrow. Free delivery over ${formatPrice(site.delivery.freeAbove)}.`}
            />
          </div>
          <Link href="/shop" className={buttonClass("light", "absolute bottom-8 left-1/2 -translate-x-1/2 hover:-translate-y-px")}>
            Shop now
          </Link>
        </div>
        <div aria-hidden className="h-6 gingham [--check:12px]" />
      </section>

      {/* Story: line drawing beside a short note */}
      <section id="story" className="scroll-mt-28 py-16 md:py-24">
        <Container className="grid items-center gap-10 md:grid-cols-12">
          <Reveal className="md:col-span-5 md:col-start-2">
            <ChefHat aria-hidden weight="thin" className="mx-auto size-56 text-ink md:size-72" />
          </Reveal>
          <Reveal delay={0.08} className="md:col-span-5">
            <h2 className="text-title">Hello, we&apos;re Curmora</h2>
            <p className="mt-4 max-w-lg">
              Curmora started with one tray of brown butter cookies. We still bake by hand, in small batches, with
              ingredients we&apos;d eat on their own, and pack every order as if it were going to our own table.
            </p>
            <Link href="/shop" className={buttonClass("muted", "mt-6")}>
              Taste the menu
            </Link>
          </Reveal>
        </Container>
      </section>
    </>
  );
}
