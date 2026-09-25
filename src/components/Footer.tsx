import Link from "next/link";
import { categories } from "@/data/products";
import { site } from "@/data/site";
import { formatPrice } from "@/lib/format";
import { Logo } from "@/components/Logo";
import { Container, focusClass } from "@/components/ui";

const linkClass = `text-text-muted transition-colors hover:text-ink ${focusClass}`;

export function Footer() {
  return (
    <footer className="mt-auto bg-blush text-ink">
      <Container className="grid gap-10 pt-16 pb-10 md:grid-cols-12 md:pt-20">
        <div className="md:col-span-4">
          <Logo ground="blush" size="lg" />
          <p className="mt-8 max-w-xs text-sm text-text-muted">{site.description}</p>
        </div>
        <nav aria-label="Quick links" className="md:col-span-2 md:col-start-6">
          <h2 className="text-title">Quick links</h2>
          <ul className="mt-5 space-y-3 text-sm">
            <li>
              <Link href="/shop" className={linkClass}>
                Shop everything
              </Link>
            </li>
            <li>
              <Link href="/build-a-box" className={linkClass}>
                Build a box
              </Link>
            </li>
            <li>
              <Link href="/#story" className={linkClass}>
                Our story
              </Link>
            </li>
          </ul>
        </nav>
        <nav aria-label="Our menu" className="md:col-span-2">
          <h2 className="text-title">Our menu</h2>
          <ul className="mt-5 space-y-3 text-sm">
            {categories.map((c) => (
              <li key={c.slug}>
                <Link href={`/shop?category=${c.slug}`} className={linkClass}>
                  {c.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <div className="md:col-span-3">
          <h2 className="text-title">Delivery</h2>
          <ul className="mt-5 space-y-3 text-sm text-text-muted">
            <li>Free delivery over {formatPrice(site.delivery.freeAbove)}</li>
            <li>Order by {site.delivery.cutoff} for next-day delivery</li>
            <li>
              <Link href="/#how-it-works" className={linkClass}>
                Delivery &amp; pickup
              </Link>
            </li>
            <li>
              <Link href="/bag" className={linkClass}>
                Your bag
              </Link>
            </li>
          </ul>
        </div>
      </Container>
      <Container>
        <p className="border-t border-ink/20 py-6 text-xs text-text-muted">
          © {new Date().getFullYear()} {site.name}. Baked by hand in small batches.
        </p>
      </Container>
    </footer>
  );
}
