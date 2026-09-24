"use client";

import Link from "next/link";
import { useLastOrder } from "@/lib/order";
import { formatPrice } from "@/lib/format";
import { buttonClass } from "@/components/ui";

const formatDate = (iso: string) =>
  new Date(`${iso}T00:00:00`).toLocaleDateString("en-IN", { weekday: "long", day: "numeric", month: "long" });

export function OrderConfirmation() {
  const order = useLastOrder();

  if (order === undefined) return <p className="mt-8">Loading your order…</p>;

  if (order === null) {
    return (
      <div className="mt-8">
        <p className="text-lg">We couldn&apos;t find a recent order in this browser.</p>
        <Link href="/shop" className={buttonClass("primary", "mt-4")}>
          Shop the menu
        </Link>
      </div>
    );
  }

  return (
    <div className="mt-8 grid gap-8 md:grid-cols-2 md:items-start">
      <div className="space-y-4 text-lg">
        <p>
          Thank you, {order.name.split(" ")[0]}. We&apos;ll call you on {order.phone} to confirm, and we&apos;ll bake
          everything fresh for{" "}
          <strong className="font-semibold text-text">
            {order.fulfilment} on {formatDate(order.date)}, {order.slot}
          </strong>
          .
        </p>
        {order.address && <p>Delivering to {order.address}.</p>}
        {order.giftNote && <p>Your gift note: “{order.giftNote}”</p>}
        <Link href="/shop" className={buttonClass("outline")}>
          Keep browsing
        </Link>
      </div>

      <div className="rounded-md border border-border bg-surface p-6 text-on-surface shadow-soft">
        <p className="text-label">Order {order.id}</p>
        <ul className="mt-4 divide-y divide-border">
          {order.lines.map((l, i) => (
            <li key={i} className="flex justify-between gap-4 py-2">
              <span>
                {l.qty} × {l.name}
                <span className="block text-sm">{l.variantLabel}</span>
                {l.picks && <span className="block text-sm">{l.picks}</span>}
              </span>
              <span className="tabular-nums">{formatPrice(l.lineTotal)}</span>
            </li>
          ))}
        </ul>
        <dl className="mt-2 space-y-1 border-t border-border pt-2">
          <div className="flex justify-between">
            <dt>Subtotal</dt>
            <dd className="tabular-nums">{formatPrice(order.subtotal)}</dd>
          </div>
          <div className="flex justify-between">
            <dt className="capitalize">{order.fulfilment}</dt>
            <dd className="tabular-nums">{order.delivery === 0 ? "Free" : formatPrice(order.delivery)}</dd>
          </div>
          <div className="flex justify-between pt-2">
            <dt className="text-label self-center">To pay on {order.fulfilment}</dt>
            <dd className="font-display text-2xl tabular-nums">{formatPrice(order.total)}</dd>
          </div>
        </dl>
      </div>
    </div>
  );
}
