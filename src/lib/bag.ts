"use client";

import { useSyncExternalStore } from "react";
import { getProduct } from "@/data/products";
import { site } from "@/data/site";

// The shopping bag lives in localStorage and is exposed to React through useSyncExternalStore,
// so every component reading it stays in sync (including across tabs).

export type BagLine = {
  key: string;
  slug: string;
  variantId: string;
  qty: number;
  /** Cookie slugs chosen for a build-a-box line. */
  picks?: string[];
};

export type ResolvedLine = BagLine & {
  name: string;
  variantLabel: string;
  unitPrice: number;
  lineTotal: number;
};

const STORAGE_KEY = "curmora:bag:v1";
/** Fired on window whenever something is added, so the header bag can celebrate. */
export const BAG_ADD_EVENT = "curmora:bag-add";
const MAX_QTY = 20;
const EMPTY: BagLine[] = [];

let lines: BagLine[] = EMPTY;
let loaded = false;
const listeners = new Set<() => void>();

function isValid(line: BagLine) {
  const product = getProduct(line.slug);
  return Boolean(product?.variants.some((v) => v.id === line.variantId)) && line.qty > 0;
}

function read() {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    const parsed: unknown = raw ? JSON.parse(raw) : [];
    lines = Array.isArray(parsed) ? (parsed as BagLine[]).filter(isValid) : EMPTY;
  } catch {
    lines = EMPTY;
  }
}

function write(next: BagLine[]) {
  lines = next;
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  } catch {
    // Storage unavailable (private mode, quota) — the bag still works for this page view.
  }
  listeners.forEach((listener) => listener());
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  const onStorage = (event: StorageEvent) => {
    if (event.key === STORAGE_KEY) {
      read();
      listener();
    }
  };
  window.addEventListener("storage", onStorage);
  return () => {
    listeners.delete(listener);
    window.removeEventListener("storage", onStorage);
  };
}

function getSnapshot() {
  if (!loaded) {
    loaded = true;
    read();
  }
  return lines;
}

const getServerSnapshot = () => EMPTY;

export function useBag() {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}

function lineKey(slug: string, variantId: string, picks?: string[]) {
  return [slug, variantId, ...(picks ? [...picks].sort() : [])].join(":");
}

export const bag = {
  add(slug: string, variantId: string, qty = 1, picks?: string[]) {
    const key = lineKey(slug, variantId, picks);
    const current = getSnapshot();
    const existing = current.find((l) => l.key === key);
    write(
      existing
        ? current.map((l) => (l.key === key ? { ...l, qty: Math.min(MAX_QTY, l.qty + qty) } : l))
        : [...current, { key, slug, variantId, qty: Math.min(MAX_QTY, qty), picks }],
    );
    window.dispatchEvent(new Event(BAG_ADD_EVENT));
  },
  setQty(key: string, qty: number) {
    const current = getSnapshot();
    write(
      qty <= 0
        ? current.filter((l) => l.key !== key)
        : current.map((l) => (l.key === key ? { ...l, qty: Math.min(MAX_QTY, qty) } : l)),
    );
  },
  remove(key: string) {
    write(getSnapshot().filter((l) => l.key !== key));
  },
  clear() {
    write(EMPTY);
  },
};

export const BAG_MAX_QTY = MAX_QTY;

export function resolveLines(bagLines: BagLine[]): ResolvedLine[] {
  return bagLines.flatMap((line) => {
    const product = getProduct(line.slug);
    const variant = product?.variants.find((v) => v.id === line.variantId);
    if (!product || !variant) return [];
    return [
      {
        ...line,
        name: product.name,
        variantLabel: variant.label,
        unitPrice: variant.price,
        lineTotal: variant.price * line.qty,
      },
    ];
  });
}

export type Fulfilment = "delivery" | "pickup";

export function totals(resolved: ResolvedLine[], fulfilment: Fulfilment = "delivery") {
  const subtotal = resolved.reduce((sum, l) => sum + l.lineTotal, 0);
  const itemCount = resolved.reduce((sum, l) => sum + l.qty, 0);
  const delivery =
    fulfilment === "pickup" || subtotal === 0 || subtotal >= site.delivery.freeAbove ? 0 : site.delivery.fee;
  return { subtotal, delivery, total: subtotal + delivery, itemCount };
}

const noopSubscribe = () => () => {};

/** False during server render and hydration, true once running in the browser. */
export function useHydrated() {
  return useSyncExternalStore(
    noopSubscribe,
    () => true,
    () => false,
  );
}

/** "2 × Pistachio Rose, 4 × Double Dark Sea Salt" for a build-a-box line. */
export function describePicks(picks: string[]) {
  const counts = new Map<string, number>();
  picks.forEach((slug) => counts.set(slug, (counts.get(slug) ?? 0) + 1));
  return [...counts]
    .map(([slug, n]) => `${n} × ${getProduct(slug)?.name ?? slug}`)
    .join(", ");
}
