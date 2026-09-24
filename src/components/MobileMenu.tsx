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
        className={`grid size-11 place-items-center rounded-full text-text transition-colors hover:bg-surface ${focusClass}`}
        aria-expanded={open}
        aria-controls="mobile-nav"
        onClick={() => setOpen((v) => !v)}
      >
        <span className="sr-only">{open ? "Close menu" : "Open menu"}</span>
        <Icon aria-hidden className={`size-6 transition-transform duration-300 ${open ? "rotate-90" : ""}`} weight="bold" />
      </button>
      {open && (
        <nav
          id="mobile-nav"
          aria-label="Main"
          className="absolute inset-x-0 top-full h-[calc(100dvh-100%)] overflow-y-auto border-t border-border bg-bg px-4 pt-6 pb-[max(2rem,env(safe-area-inset-bottom))] motion-safe:animate-sheet-in"
        >
          <ul className="space-y-1">
            {nav.map((item, i) => (
              <li key={item.href} className="motion-safe:animate-rise" style={{ animationDelay: `${60 + i * 60}ms` } as CSSProperties}>
                <Link
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className={`block rounded-md px-2 py-3 font-display text-4xl text-text active:bg-surface ${focusClass}`}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
          <ul className="mt-8 flex flex-wrap gap-2 motion-safe:animate-rise" style={{ animationDelay: "320ms" }}>
            {categories.map((c) => (
              <li key={c.slug}>
                <Link
                  href={`/shop?category=${c.slug}`}
                  onClick={() => setOpen(false)}
                  className={`inline-flex rounded-full border-[1.5px] border-text px-4 py-2.5 text-sm font-medium ${focusClass}`}
                >
                  {c.name}
                </Link>
              </li>
            ))}
          </ul>
          <div className="mt-8 motion-safe:animate-rise" style={{ animationDelay: "380ms" }}>
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
