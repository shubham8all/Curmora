"use client";

import { useMemo, useSyncExternalStore } from "react";
import type { Fulfilment } from "@/lib/bag";

// Orders are not sent anywhere yet: the most recent one is kept in localStorage so the
// confirmation page can show it. Replace saveOrder with a real API call when the backend exists.

export type Order = {
  id: string;
  placedAt: string;
  name: string;
  phone: string;
  fulfilment: Fulfilment;
  date: string;
  slot: string;
  address?: string;
  giftNote?: string;
  instructions?: string;
  lines: { name: string; variantLabel: string; qty: number; lineTotal: number; picks?: string }[];
  subtotal: number;
  delivery: number;
  total: number;
};

const STORAGE_KEY = "curmora:last-order";

/** Stamps an order with an id and time. */
export function createOrder(details: Omit<Order, "id" | "placedAt">): Order {
  return {
    id: `CUR-${Date.now().toString(36).toUpperCase()}`,
    placedAt: new Date().toISOString(),
    ...details,
  };
}

export function saveOrder(order: Order) {
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(order));
  } catch {
    // Storage unavailable — the confirmation page will show its fallback message.
  }
}

const noopSubscribe = () => () => {};

function readRaw() {
  try {
    return window.localStorage.getItem(STORAGE_KEY);
  } catch {
    return null;
  }
}

function parse(raw: string | null): Order | null {
  if (!raw) return null;
  try {
    return JSON.parse(raw) as Order;
  } catch {
    return null;
  }
}

/** The last order placed in this browser, or null. Undefined while hydrating. */
export function useLastOrder(): Order | null | undefined {
  const raw = useSyncExternalStore(noopSubscribe, readRaw, () => undefined);
  return useMemo(() => (raw === undefined ? undefined : parse(raw)), [raw]);
}
