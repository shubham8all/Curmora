"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState, type CSSProperties } from "react";
import { List, X } from "@phosphor-icons/react";
import { categories } from "@/data/products";
import { nav, site } from "@/data/site";
import { formatPrice } from "@/lib/format";
import { buttonClass, focusClass } from "@/components/ui";

/** Keyed by pathname so the menu resets (closes) whenever the route changes. */
export function MobileMenu() {
  const pathname = usePathname();
  return <Menu key={pathname} />;
}

function Menu() {
  const [open, setOpen] = useState(false);
  const Icon = open ? X : List;

  useEffect(() => {
    if (!open) return;
    const { overflow } = document.body.style;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = overflow;
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <div className="lg:hidden">
      <button
        type="button"
        className={`-ml-2 grid size-11 place-items-center text-ink ${focusClass}`}
        aria-expanded={open}
        aria-controls="mobile-nav"
        onClick={() => setOpen((v) => !v)}
      >
        <span className="sr-only">{open ? "Close menu" : "Open menu"}</span>
        <Icon aria-hidden className={`size-6 transition-transform duration-300 ${open ? "rotate-90" : ""}`} />
      </button>
      {open && (
        <nav
          id="mobile-nav"
          aria-label="Main"
          className="absolute inset-x-0 top-full h-[calc(100dvh-100%)] overflow-y-auto bg-bg px-4 pt-8 pb-[max(2rem,env(safe-area-inset-bottom))] text-ink motion-safe:animate-sheet-in sm:px-6"
        >
          <ul className="divide-y divide-border border-y border-border">
            {nav.map((item, i) => (
              <li key={item.href} className="motion-safe:animate-rise" style={{ animationDelay: `${60 + i * 60}ms` } as CSSProperties}>
                <Link
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className={`block py-4 text-xl font-light tracking-[0.14em] uppercase ${focusClass}`}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
          <p className="mt-8 text-label text-text-muted motion-safe:animate-rise" style={{ animationDelay: "300ms" }}>
            Our menu
          </p>
          <ul className="mt-3 flex flex-wrap gap-2 motion-safe:animate-rise" style={{ animationDelay: "340ms" }}>
            {categories.map((c) => (
              <li key={c.slug}>
                <Link href={`/shop?category=${c.slug}`} onClick={() => setOpen(false)} className={buttonClass("outline", "", "sm")}>
                  {c.name}
                </Link>
              </li>
            ))}
          </ul>
          <div className="mt-8 motion-safe:animate-rise" style={{ animationDelay: "400ms" }}>
            <Link href="/shop" onClick={() => setOpen(false)} className={buttonClass("primary", "w-full")}>
              Shop now
            </Link>
            <p className="mt-4 text-center text-sm text-text-muted">
              Free delivery over {formatPrice(site.delivery.freeAbove)}. Order by {site.delivery.cutoff} for tomorrow.
            </p>
          </div>
        </nav>
      )}
    </div>
  );
}
