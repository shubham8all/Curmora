"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { Check } from "@phosphor-icons/react";
import type { Product } from "@/data/products";
import { bag, BAG_MAX_QTY } from "@/lib/bag";
import { formatPrice } from "@/lib/format";
import { QtyStepper } from "@/components/QtyStepper";
import { buttonClass, focusClass } from "@/components/ui";

export function AddToBag({ product }: { product: Product }) {
  const [variantId, setVariantId] = useState(product.variants[0].id);
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState<string | null>(null);
  // Counts adds so the button's "Added" tick can replay its pop.
  const [adds, setAdds] = useState(0);
  const [mainButtonVisible, setMainButtonVisible] = useState(true);
  const mainButton = useRef<HTMLButtonElement>(null);
  const variant = product.variants.find((v) => v.id === variantId) ?? product.variants[0];

  // Show the phone's sticky bar only once the main button has scrolled out of view.
  useEffect(() => {
    const el = mainButton.current;
    if (!el) return;
    const io = new IntersectionObserver(([entry]) => setMainButtonVisible(entry.isIntersecting), { rootMargin: "0px 0px -40px 0px" });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  function add() {
    bag.add(product.slug, variant.id, qty);
    setAdded(`${qty} × ${variant.label} added to your bag.`);
    setAdds((n) => n + 1);
  }

  const justAdded = added !== null;
  const buttonLabel = (
    <>
      {justAdded ? (
        <span key={adds} className="inline-flex items-center gap-2 motion-safe:animate-pop">
          <Check aria-hidden weight="bold" className="size-4" />
          Added
        </span>
      ) : (
        "Add to bag"
      )}
    </>
  );

  return (
    <div className="space-y-8">
      <p className="text-3xl font-light text-text tabular-nums">{formatPrice(variant.price * qty)}</p>

      {product.variants.length > 1 && (
        <fieldset>
          <legend className="text-label">Choose a size</legend>
          <div className="mt-2 flex flex-wrap gap-2">
            {product.variants.map((v) => (
              <label
                key={v.id}
                className={`cursor-pointer border px-4 py-2.5 transition-colors has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-(--focus-ring) ${
                  v.id === variantId ? "border-ink bg-ink text-on-ink" : "border-border bg-surface text-text hover:border-ink"
                }`}
              >
                <input
                  type="radio"
                  name={`${product.slug}-size`}
                  value={v.id}
                  checked={v.id === variantId}
                  onChange={() => {
                    setVariantId(v.id);
                    setAdded(null);
                  }}
                  className="sr-only"
                />
                <span className="block font-semibold">{v.label}</span>
                <span className="block text-sm">{formatPrice(v.price)}</span>
              </label>
            ))}
          </div>
        </fieldset>
      )}

      <div className="flex flex-wrap items-center gap-4">
        <QtyStepper
          value={qty}
          max={BAG_MAX_QTY}
          label={`Quantity of ${product.name}`}
          onChange={(next) => {
            setQty(next);
            setAdded(null);
          }}
        />
        <button ref={mainButton} type="button" onClick={add} className={buttonClass(justAdded ? "rose" : "primary", "min-w-48 flex-1 sm:flex-none")}>
          {buttonLabel}
        </button>
      </div>

      <p role="status" className="min-h-6 text-text">
        {added && (
          <>
            {added}{" "}
            <Link href="/bag" className={`rounded-sm font-semibold underline underline-offset-4 ${focusClass}`}>
              View bag
            </Link>
          </>
        )}
      </p>

      {/* Phone: keep the buy button in reach once the main one scrolls away. */}
      <div
        aria-hidden={mainButtonVisible}
        inert={mainButtonVisible}
        className={`bottom-bar fixed inset-x-0 bottom-0 z-20 border-t border-border bg-bg px-4 pt-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] transition-transform duration-300 ease-(--ease-soft) md:hidden ${
          mainButtonVisible ? "translate-y-full" : "translate-y-0"
        }`}
      >
        <div className="flex items-center gap-4">
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-medium">{product.name}</p>
            <p className="text-xl font-light tabular-nums">{formatPrice(variant.price * qty)}</p>
          </div>
          <button type="button" onClick={add} className={buttonClass(justAdded ? "rose" : "primary")}>
            {buttonLabel}
          </button>
        </div>
      </div>
    </div>
  );
}
