"use client";

import Link from "next/link";
import { BUILD_A_BOX_SLUG, getProduct } from "@/data/products";
import { BAG_MAX_QTY, bag, describePicks, resolveLines, totals, useBag, useHydrated } from "@/lib/bag";
import { formatPrice } from "@/lib/format";
import { OrderSummary } from "@/components/OrderSummary";
import { ProductArt } from "@/components/ProductArt";
import { QtyStepper } from "@/components/QtyStepper";
import { buttonClass, focusClass } from "@/components/ui";

export function BagView() {
  const hydrated = useHydrated();
  const lines = resolveLines(useBag());
  const t = totals(lines);

  if (!hydrated) {
    return <p className="mt-8">Loading your bag…</p>;
  }

  if (lines.length === 0) {
    return (
      <div className="mt-8 rounded-md border border-border bg-surface p-8 text-center shadow-soft">
        <p className="font-display text-2xl text-on-surface">Your bag is empty.</p>
        <p className="mt-2 text-on-surface">Fresh cookies, layer cups and cakes are a click away.</p>
        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <Link href="/shop" className={buttonClass("primary")}>
            Shop the menu
          </Link>
          <Link href="/build-a-box" className={buttonClass("outline")}>
            Build a box
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="mt-8 grid gap-8 pb-24 lg:grid-cols-[minmax(0,1fr)_22rem] 2xl:grid-cols-[minmax(0,64rem)_24rem] 2xl:justify-between lg:items-start lg:pb-0">
      <ul className="divide-y divide-border rounded-md border border-border bg-surface shadow-soft">
        {lines.map((line) => {
          const product = getProduct(line.slug)!;
          const isBox = line.slug === BUILD_A_BOX_SLUG;
          return (
            <li key={line.key} className="flex flex-col gap-4 p-4 sm:flex-row sm:items-center">
              <ProductArt art={product.art} seed={product.slug} className="size-20 shrink-0 rounded-md bg-bg p-1 inset-shadow-well" />
              <div className="min-w-0 flex-1 text-on-surface">
                {isBox ? (
                  <p className="font-display text-lg">{line.name}</p>
                ) : (
                  <Link href={`/shop/${line.slug}`} className={`rounded-sm font-display text-lg hover:underline ${focusClass}`}>
                    {line.name}
                  </Link>
                )}
                <p className="text-sm">
                  {line.variantLabel} · {formatPrice(line.unitPrice)}
                </p>
                {line.picks && <p className="mt-1 text-sm">{describePicks(line.picks)}</p>}
              </div>
              <div className="flex items-center justify-between gap-4 sm:flex-col sm:items-end">
                <QtyStepper value={line.qty} max={BAG_MAX_QTY} label={`Quantity of ${line.name}`} onChange={(n) => bag.setQty(line.key, n)} />
                <div className="flex items-center gap-4">
                  <button type="button" onClick={() => bag.remove(line.key)} className={`rounded-sm text-sm underline underline-offset-4 ${focusClass}`}>
                    Remove<span className="sr-only"> {line.name}</span>
                  </button>
                  <span className="font-semibold tabular-nums text-on-surface">{formatPrice(line.lineTotal)}</span>
                </div>
              </div>
            </li>
          );
        })}
      </ul>
      <div className="lg:sticky lg:top-8">
        <OrderSummary subtotal={t.subtotal} delivery={t.delivery} total={t.total} fulfilment="delivery">
          <p className="mt-2 text-sm">Choose delivery or pickup at checkout.</p>
          <Link href="/checkout" className={buttonClass("primary", "mt-4 w-full")}>
            Checkout
          </Link>
        </OrderSummary>
      </div>

      {/* Phone: total and checkout always in reach. */}
      <div className="bottom-bar fixed inset-x-0 bottom-0 z-20 border-t border-border bg-bg px-4 pt-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] lg:hidden">
        <div className="flex items-center gap-4">
          <div className="min-w-0 flex-1">
            <p className="text-sm font-medium">
              {t.itemCount} {t.itemCount === 1 ? "item" : "items"}
            </p>
            <p className="font-display text-xl tabular-nums">{formatPrice(t.total)}</p>
          </div>
          <Link href="/checkout" className={buttonClass("primary")}>
            Checkout
          </Link>
        </div>
      </div>
    </div>
  );
}
