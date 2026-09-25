"use client";

import { useState } from "react";
import { Check, Plus } from "@phosphor-icons/react";
import type { Product } from "@/data/products";
import { bag } from "@/lib/bag";
import { formatPrice } from "@/lib/format";
import { focusClass } from "@/components/ui";

/** Adds a product's first size to the bag straight from its tile. */
export function QuickAdd({ product, className = "" }: { product: Product; className?: string }) {
  const [added, setAdded] = useState(false);
  const variant = product.variants[0];

  function add() {
    bag.add(product.slug, variant.id, 1);
    setAdded(true);
    window.setTimeout(() => setAdded(false), 1600);
  }

  return (
    <button
      type="button"
      onClick={add}
      aria-label={`Add ${product.name}, ${variant.label}, ${formatPrice(variant.price)}, to bag`}
      className={`inline-flex items-center justify-center gap-1.5 bg-surface px-3 py-2 text-label text-ink transition-colors hover:bg-ink hover:text-on-ink ${focusClass} ${className}`}
    >
      {added ? (
        <span className="inline-flex items-center gap-1.5 motion-safe:animate-pop">
          <Check aria-hidden className="size-3.5" weight="bold" />
          Added
        </span>
      ) : (
        <>
          <Plus aria-hidden className="size-3.5" weight="bold" />
          Add
        </>
      )}
    </button>
  );
}
