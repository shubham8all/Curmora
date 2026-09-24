"use client";

import Link from "next/link";
import { useState } from "react";
import { BUILD_A_BOX_SLUG, getProduct, type Product } from "@/data/products";
import { bag } from "@/lib/bag";
import { formatPrice } from "@/lib/format";
import { ProductArt } from "@/components/ProductArt";
import { QtyStepper } from "@/components/QtyStepper";
import { Badge, buttonClass, focusClass } from "@/components/ui";

export function BoxBuilder({ cookies }: { cookies: Product[] }) {
  const box = getProduct(BUILD_A_BOX_SLUG)!;
  const [sizeId, setSizeId] = useState(box.variants[1].id);
  const [counts, setCounts] = useState<Record<string, number>>({});
  const [error, setError] = useState<string | null>(null);
  const [added, setAdded] = useState<string | null>(null);

  const size = box.variants.find((v) => v.id === sizeId)!;
  const capacity = size.count ?? 0;
  const picks = cookies.flatMap((c) => Array<string>(counts[c.slug] ?? 0).fill(c.slug));
  const remaining = capacity - picks.length;

  function changeSize(nextId: string) {
    const next = box.variants.find((v) => v.id === nextId)!;
    const cap = next.count ?? 0;
    setSizeId(nextId);
    setAdded(null);
    setError(null);
    if (picks.length > cap) {
      // Keep the first `cap` picks so shrinking the box never silently changes flavours the user chose first.
      const kept = picks.slice(0, cap);
      const nextCounts: Record<string, number> = {};
      kept.forEach((slug) => (nextCounts[slug] = (nextCounts[slug] ?? 0) + 1));
      setCounts(nextCounts);
      setError(`We removed ${picks.length - cap} cookie${picks.length - cap === 1 ? "" : "s"} to fit the smaller box.`);
    }
  }

  function setCount(slug: string, value: number) {
    setCounts((prev) => ({ ...prev, [slug]: Math.max(0, value) }));
    setError(null);
    setAdded(null);
  }

  function fillRest() {
    const next = { ...counts };
    const favourites = cookies.filter((c) => c.bestseller);
    const order = favourites.length ? favourites : cookies;
    for (let i = 0; i < remaining; i++) {
      const slug = order[i % order.length].slug;
      next[slug] = (next[slug] ?? 0) + 1;
    }
    setCounts(next);
    setError(null);
  }

  function addToBag() {
    if (remaining > 0) {
      setError(`Your box has room for ${remaining} more cookie${remaining === 1 ? "" : "s"}. Pick ${remaining === 1 ? "one" : "them"} to continue.`);
      return;
    }
    bag.add(BUILD_A_BOX_SLUG, size.id, 1, picks);
    setCounts({});
    setError(null);
    setAdded(`${size.label} added to your bag.`);
  }

  return (
    <div className="grid gap-8 pb-28 lg:grid-cols-[minmax(0,1fr)_22rem] 2xl:grid-cols-[minmax(0,64rem)_24rem] 2xl:justify-between lg:items-start lg:pb-0">
      <div className="space-y-8">
        <fieldset>
          <legend className="font-display text-2xl text-text">1. Pick a box size</legend>
          <div className="mt-4 grid gap-2 sm:grid-cols-3">
            {box.variants.map((v) => (
              <label
                key={v.id}
                className={`cursor-pointer rounded-md border-[1.5px] p-4 transition-colors has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-(--focus-ring) ${
                  v.id === sizeId ? "border-primary bg-primary text-on-primary" : "border-border bg-surface text-text hover:border-text"
                }`}
              >
                <input type="radio" name="box-size" value={v.id} checked={v.id === sizeId} onChange={() => changeSize(v.id)} className="sr-only" />
                <span className="block font-display text-xl">{v.label}</span>
                <span className="block text-sm">
                  {formatPrice(v.price)} · {formatPrice(Math.round(v.price / (v.count ?? 1)))} each
                </span>
              </label>
            ))}
          </div>
        </fieldset>

        <fieldset>
          <legend className="font-display text-2xl text-text">2. Choose your flavours</legend>
          <ul className="mt-4 grid gap-2 sm:grid-cols-2 2xl:grid-cols-3">
            {cookies.map((c) => {
              const count = counts[c.slug] ?? 0;
              return (
                <li key={c.slug} className="flex items-center gap-4 rounded-md border border-border bg-surface p-2">
                  <ProductArt art={c.art} seed={c.slug} className={`size-20 shrink-0 transition-transform duration-500 ease-(--ease-spring) ${count ? "scale-110 -rotate-6" : ""}`} />
                  <div className="min-w-0 flex-1">
                    <p className="font-semibold leading-snug text-on-surface">{c.name}</p>
                    {c.eggless && <Badge tone="highlight" className="mt-1">Eggless</Badge>}
                    <div className="mt-2">
                      <QtyStepper value={count} min={0} max={count + remaining} label={`Number of ${c.name}`} onChange={(n) => setCount(c.slug, n)} />
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
        </fieldset>
      </div>

      <aside id="your-box-panel" aria-labelledby="your-box" className="scroll-mt-24 rounded-md border border-border bg-surface p-6 shadow-soft lg:sticky lg:top-28">
        <h2 id="your-box" className="font-display text-2xl text-text">
          3. Your box
        </h2>
        <p className="mt-1" aria-live="polite">
          {picks.length} of {capacity} picked
        </p>
        <ul className={`mt-4 grid gap-2 rounded-md border-2 border-text bg-beige-100 p-2 inset-shadow-well ${capacity === 12 ? "grid-cols-4" : capacity === 4 ? "grid-cols-2" : "grid-cols-3"}`}>
          {Array.from({ length: capacity }, (_, i) => {
            const slug = picks[i];
            const cookie = slug ? cookies.find((c) => c.slug === slug) : undefined;
            return (
              <li key={i} className={`aspect-square rounded-md p-1 ${cookie ? "bg-beige-50 inset-shadow-well" : "border border-dashed border-beige-500"}`}>
                {cookie ? (
                  // Keyed by flavour so a newly placed cookie drops into its slot.
                  <div key={cookie.slug} className="motion-safe:animate-drop-in">
                    <ProductArt art={cookie.art} seed={cookie.slug} title={cookie.name} />
                  </div>
                ) : (
                  <span className="sr-only">Empty slot</span>
                )}
              </li>
            );
          })}
        </ul>
        {remaining > 0 && (
          <button type="button" onClick={fillRest} className={`mt-2 rounded-sm text-sm underline underline-offset-4 ${focusClass}`}>
            Fill the rest with bestsellers
          </button>
        )}
        <div className="mt-4 flex items-baseline justify-between border-t border-border pt-4">
          <span className="text-label">Total</span>
          <span className="font-display text-2xl text-text">{formatPrice(size.price)}</span>
        </div>
        <button type="button" onClick={addToBag} className={buttonClass("primary", "mt-4 w-full")} aria-describedby="box-status">
          Add box to bag
        </button>
        <div id="box-status" role="status" className="mt-2 min-h-6">
          {error && <p className="font-semibold text-accent">{error}</p>}
          {added && (
            <p>
              {added}{" "}
              <Link href="/bag" className={`rounded-sm font-semibold underline underline-offset-4 ${focusClass}`}>
                View bag
              </Link>
            </p>
          )}
        </div>
      </aside>

      {/* Phone: box progress and the add button stay in reach while picking flavours. */}
      <div className="bottom-bar fixed inset-x-0 bottom-0 z-20 border-t border-border bg-bg px-4 pt-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] lg:hidden">
        {error && <p className="mb-2 text-sm font-semibold text-accent">{error}</p>}
        <div className="flex items-center gap-4">
          <a href="#your-box-panel" className={`min-w-0 flex-1 rounded-sm ${focusClass}`}>
            <span className="block text-sm font-medium">
              {size.label}: {picks.length} of {capacity} picked
            </span>
            <span className="block font-display text-xl tabular-nums">{formatPrice(size.price)}</span>
          </a>
          {remaining > 0 ? (
            <button type="button" onClick={fillRest} className={buttonClass("outline", "", "sm")}>
              Fill for me
            </button>
          ) : (
            <button type="button" onClick={addToBag} className={buttonClass("primary")}>
              Add box
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
