import Link from "next/link";
import { categories } from "@/data/products";
import { site } from "@/data/site";
import { formatPrice } from "@/lib/format";
import { Logo } from "@/components/Logo";
import { BrushPanel, Container, focusClass } from "@/components/ui";

export function Footer() {
  const linkClass = `rounded-sm transition-colors hover:text-highlight ${focusClass}`;

  return (
    <footer className="mt-auto pt-16">
      <Container className="pb-8">
        <BrushPanel tone="ink" className="grid gap-10 px-8 py-12 md:grid-cols-12 md:px-12 md:py-16">
          <div className="md:col-span-4">
            <Logo tone="light" />
            <p className="mt-6 max-w-xs">{site.description}</p>
          </div>
          <nav aria-label="Shop" className="md:col-span-2">
            <p className="font-display text-lg text-highlight">Shop</p>
            <ul className="mt-4 space-y-2">
              {categories.map((c) => (
                <li key={c.slug}>
                  <Link href={`/shop?category=${c.slug}`} className={linkClass}>
                    {c.name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <nav aria-label="Help" className="md:col-span-2">
            <p className="font-display text-lg text-highlight">Help</p>
            <ul className="mt-4 space-y-2">
              <li>
                <Link href="/#how-it-works" className={linkClass}>
                  Delivery &amp; pickup
                </Link>
              </li>
              <li>
                <Link href="/#story" className={linkClass}>
                  Our story
                </Link>
              </li>
              <li>
                <Link href="/bag" className={linkClass}>
                  Your bag
                </Link>
              </li>
            </ul>
          </nav>
          <nav aria-label="Make it yours" className="md:col-span-2">
            <p className="font-display text-lg text-highlight">Make it yours</p>
            <ul className="mt-4 space-y-2">
              <li>
                <Link href="/build-a-box" className={linkClass}>
                  Build a box
                </Link>
              </li>
              <li>
                <Link href="/shop?category=gifting" className={linkClass}>
                  Gifting
                </Link>
              </li>
            </ul>
          </nav>
          <div className="md:col-span-2">
            <p className="font-display text-lg text-highlight">Delivery</p>
            <p className="mt-4">
              Free over {formatPrice(site.delivery.freeAbove)}. Order by {site.delivery.cutoff} for the next day.
            </p>
          </div>
          <p className="border-t border-on-ink/20 pt-6 text-sm md:col-span-12">
            © {new Date().getFullYear()} {site.name}. Baked by hand in small batches.
          </p>
        </BrushPanel>
      </Container>
    </footer>
  );
}
