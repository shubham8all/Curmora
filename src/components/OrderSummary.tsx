import type { ReactNode } from "react";
import { site } from "@/data/site";
import { formatPrice } from "@/lib/format";

export function OrderSummary({
  subtotal,
  delivery,
  total,
  fulfilment,
  children,
}: {
  subtotal: number;
  delivery: number;
  total: number;
  fulfilment: "delivery" | "pickup";
  children?: ReactNode;
}) {
  const toFree = site.delivery.freeAbove - subtotal;

  return (
    <div className="rounded-md border border-border bg-surface p-6 text-on-surface shadow-soft">
      <h2 className="font-display text-2xl">Order summary</h2>
      <dl className="mt-4 space-y-2">
        <div className="flex justify-between gap-4">
          <dt>Subtotal</dt>
          <dd className="tabular-nums">{formatPrice(subtotal)}</dd>
        </div>
        <div className="flex justify-between gap-4">
          <dt>{fulfilment === "pickup" ? "Pickup" : "Delivery"}</dt>
          <dd className="tabular-nums">{delivery === 0 ? "Free" : formatPrice(delivery)}</dd>
        </div>
        <div className="flex justify-between gap-4 border-t border-border pt-2">
          <dt className="text-label self-center">Total</dt>
          <dd className="font-display text-2xl tabular-nums">{formatPrice(total)}</dd>
        </div>
      </dl>
      {fulfilment === "delivery" && toFree > 0 && (
        <p className="mt-2 text-sm">Add {formatPrice(toFree)} more for free delivery.</p>
      )}
      {children}
    </div>
  );
}
