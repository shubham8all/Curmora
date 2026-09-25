"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useRef, useState, useSyncExternalStore, type FormEvent, type ReactNode } from "react";
import { site } from "@/data/site";
import { bag, describePicks, resolveLines, totals, useBag, useHydrated, type Fulfilment } from "@/lib/bag";
import { createOrder, saveOrder } from "@/lib/order";
import { formatPrice } from "@/lib/format";
import { OrderSummary } from "@/components/OrderSummary";
import { buttonClass, focusClass } from "@/components/ui";

type Values = {
  fulfilment: Fulfilment;
  name: string;
  phone: string;
  email: string;
  address: string;
  landmark: string;
  city: string;
  pincode: string;
  date: string;
  slot: string;
  giftNote: string;
  instructions: string;
};

type Errors = Partial<Record<keyof Values, string>>;

const initial: Values = {
  fulfilment: "delivery",
  name: "",
  phone: "",
  email: "",
  address: "",
  landmark: "",
  city: "",
  pincode: "",
  date: "",
  slot: "",
  giftNote: "",
  instructions: "",
};

const GIFT_NOTE_MAX = 200;

const toISODate = (d: Date) =>
  `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;

/** Earliest date we can bake for: tomorrow, or the day after once today's cutoff has passed. */
function earliestDate() {
  const d = new Date();
  d.setDate(d.getDate() + (d.getHours() >= 18 ? 2 : 1));
  return toISODate(d);
}

function latestDate() {
  const d = new Date();
  d.setDate(d.getDate() + 30);
  return toISODate(d);
}

const noopSubscribe = () => () => {};

function normalisePhone(raw: string) {
  const digits = raw.replace(/\D/g, "");
  return digits.length === 12 && digits.startsWith("91") ? digits.slice(2) : digits;
}

function validate(v: Values, minDate: string, maxDate: string): Errors {
  const e: Errors = {};
  if (!v.name.trim()) e.name = "Enter your name.";
  if (!v.phone.trim()) e.phone = "Enter a mobile number so we can reach you about your order.";
  else if (!/^[6-9]\d{9}$/.test(normalisePhone(v.phone))) e.phone = "Enter a 10-digit Indian mobile number, like 98765 43210.";
  if (v.email.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.email.trim())) e.email = "Enter an email address like name@example.com, or leave it blank.";
  if (v.fulfilment === "delivery") {
    if (!v.address.trim()) e.address = "Enter the delivery address.";
    if (!v.city.trim()) e.city = "Enter the city.";
    if (!/^\d{6}$/.test(v.pincode.trim())) e.pincode = "Enter a 6-digit PIN code.";
  }
  if (!v.date) e.date = `Choose a ${v.fulfilment} date.`;
  else if (v.date < minDate) e.date = "Choose a later date. We need at least a day to bake your order.";
  else if (v.date > maxDate) e.date = "Choose a date within the next 30 days.";
  if (!v.slot) e.slot = "Choose a time slot.";
  if (v.giftNote.length > GIFT_NOTE_MAX) e.giftNote = `Keep the note under ${GIFT_NOTE_MAX} characters.`;
  return e;
}

const labels: Record<keyof Values, string> = {
  fulfilment: "Delivery or pickup",
  name: "Full name",
  phone: "Mobile number",
  email: "Email",
  address: "Address",
  landmark: "Area or landmark",
  city: "City",
  pincode: "PIN code",
  date: "Date",
  slot: "Time slot",
  giftNote: "Gift note",
  instructions: "Instructions",
};

const inputClass = `mt-1 block w-full border border-ink bg-beige-50 px-4 py-2 text-ink aria-invalid:border-2 aria-invalid:border-rose-deep ${focusClass}`;

function Field({
  id,
  label,
  error,
  hint,
  optional,
  children,
}: {
  id: string;
  label: string;
  error?: string;
  hint?: string;
  optional?: boolean;
  children: ReactNode;
}) {
  return (
    <div>
      <label htmlFor={id} className="block font-semibold text-text">
        {label}
        {optional && <span className="font-normal"> (optional)</span>}
      </label>
      {hint && (
        <p id={`${id}-hint`} className="text-sm">
          {hint}
        </p>
      )}
      {children}
      {error && (
        <p id={`${id}-error`} className="mt-1 text-sm font-semibold text-rose-deep">
          {error}
        </p>
      )}
    </div>
  );
}

export function CheckoutForm() {
  const router = useRouter();
  const hydrated = useHydrated();
  const lines = resolveLines(useBag());
  const minDate = useSyncExternalStore(noopSubscribe, earliestDate, () => "");
  const maxDate = useSyncExternalStore(noopSubscribe, latestDate, () => "");
  const [values, setValues] = useState<Values>(initial);
  const [submitted, setSubmitted] = useState(false);
  const [placing, setPlacing] = useState(false);
  const summaryRef = useRef<HTMLDivElement>(null);

  const t = totals(lines, values.fulfilment);
  const errors = submitted ? validate(values, minDate, maxDate) : {};
  const errorEntries = Object.entries(errors) as [keyof Values, string][];

  if (!hydrated) return <p className="mt-8">Loading checkout…</p>;

  if (lines.length === 0 && !placing) {
    return (
      <div className="mt-8 border border-border bg-surface p-8">
        <p className="text-2xl font-light text-ink">There&apos;s nothing to check out yet.</p>
        <Link href="/shop" className={buttonClass("primary", "mt-4")}>
          Shop the menu
        </Link>
      </div>
    );
  }

  const set = <K extends keyof Values>(key: K, value: Values[K]) => setValues((prev) => ({ ...prev, [key]: value }));

  const fieldProps = (key: keyof Values, hint?: boolean) => ({
    id: key,
    name: key,
    value: values[key],
    "aria-invalid": errors[key] ? true : undefined,
    "aria-describedby": [hint && `${key}-hint`, errors[key] && `${key}-error`].filter(Boolean).join(" ") || undefined,
    className: inputClass,
  });

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitted(true);
    const found = validate(values, minDate, maxDate);
    if (Object.keys(found).length > 0) {
      // Move focus to the error summary so keyboard and screen-reader users hear what to fix.
      requestAnimationFrame(() => summaryRef.current?.focus());
      return;
    }

    setPlacing(true);
    const order = createOrder({
      name: values.name.trim(),
      phone: normalisePhone(values.phone),
      fulfilment: values.fulfilment,
      date: values.date,
      slot: values.slot,
      address:
        values.fulfilment === "delivery"
          ? [values.address, values.landmark, values.city, values.pincode].map((s) => s.trim()).filter(Boolean).join(", ")
          : undefined,
      giftNote: values.giftNote.trim() || undefined,
      instructions: values.instructions.trim() || undefined,
      lines: lines.map((l) => ({
        name: l.name,
        variantLabel: l.variantLabel,
        qty: l.qty,
        lineTotal: l.lineTotal,
        picks: l.picks ? describePicks(l.picks) : undefined,
      })),
      subtotal: t.subtotal,
      delivery: t.delivery,
      total: t.total,
    });
    saveOrder(order);
    bag.clear();
    router.push("/order/confirmed");
  }

  return (
    <form noValidate onSubmit={onSubmit} className="mt-8 grid gap-8 lg:grid-cols-[minmax(0,1fr)_22rem] 2xl:grid-cols-[minmax(0,64rem)_24rem] 2xl:justify-between lg:items-start">
      <div className="space-y-8">
        {errorEntries.length > 0 && (
          <div ref={summaryRef} tabIndex={-1} role="alert" className={` border-2 border-rose-deep bg-pink-50 p-4 text-ink ${focusClass}`}>
            <p className="text-xl font-light">
              Please fix {errorEntries.length === 1 ? "this" : `these ${errorEntries.length} things`} to place your order:
            </p>
            <ul className="mt-2 list-disc space-y-1 pl-6">
              {errorEntries.map(([key, message]) => (
                <li key={key}>
                  <a href={`#${key}`} className={`rounded-sm underline underline-offset-4 ${focusClass}`}>
                    {labels[key]}: {message}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        )}

        <fieldset className=" border border-border bg-surface p-6">
          <legend className="px-2 text-title">How would you like it?</legend>
          <div className="grid gap-2 sm:grid-cols-2">
            {(
              [
                { id: "delivery", title: "Delivery", body: `${formatPrice(site.delivery.fee)}, free over ${formatPrice(site.delivery.freeAbove)}` },
                { id: "pickup", title: "Pickup", body: `Free · ${site.pickup.label}` },
              ] as const
            ).map((opt) => (
              <label
                key={opt.id}
                className={`cursor-pointer border p-4 has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-(--focus-ring) ${
                  values.fulfilment === opt.id ? "border-ink bg-blush" : "border-border bg-bg hover:border-ink"
                }`}
              >
                <input type="radio" name="fulfilment" value={opt.id} checked={values.fulfilment === opt.id} onChange={() => set("fulfilment", opt.id)} className="sr-only" />
                <span className="block text-xl font-light text-text">{opt.title}</span>
                <span className="block text-sm">{opt.body}</span>
              </label>
            ))}
          </div>
          {values.fulfilment === "pickup" && <p className="mt-4 text-sm">{site.pickup.note}</p>}
        </fieldset>

        <fieldset className="space-y-4 border border-border bg-surface p-6">
          <legend className="px-2 text-title">Your details</legend>
          <Field id="name" label={labels.name} error={errors.name}>
            <input {...fieldProps("name")} autoComplete="name" onChange={(e) => set("name", e.target.value)} />
          </Field>
          <div className="grid gap-4 sm:grid-cols-2">
            <Field id="phone" label={labels.phone} error={errors.phone} hint="We'll call if we can't find you.">
              <input {...fieldProps("phone", true)} type="tel" inputMode="tel" autoComplete="tel-national" onChange={(e) => set("phone", e.target.value)} />
            </Field>
            <Field id="email" label={labels.email} error={errors.email} optional hint="For your receipt.">
              <input {...fieldProps("email", true)} type="email" autoComplete="email" onChange={(e) => set("email", e.target.value)} />
            </Field>
          </div>
        </fieldset>

        {values.fulfilment === "delivery" && (
          <fieldset className="space-y-4 border border-border bg-surface p-6">
            <legend className="px-2 text-title">Delivery address</legend>
            <Field id="address" label={labels.address} error={errors.address} hint="House or flat number, building and street.">
              <input {...fieldProps("address", true)} autoComplete="street-address" onChange={(e) => set("address", e.target.value)} />
            </Field>
            <Field id="landmark" label={labels.landmark} error={errors.landmark} optional>
              <input {...fieldProps("landmark")} onChange={(e) => set("landmark", e.target.value)} />
            </Field>
            <div className="grid gap-4 sm:grid-cols-2">
              <Field id="city" label={labels.city} error={errors.city}>
                <input {...fieldProps("city")} autoComplete="address-level2" onChange={(e) => set("city", e.target.value)} />
              </Field>
              <Field id="pincode" label={labels.pincode} error={errors.pincode}>
                <input {...fieldProps("pincode")} inputMode="numeric" autoComplete="postal-code" maxLength={6} onChange={(e) => set("pincode", e.target.value)} />
              </Field>
            </div>
          </fieldset>
        )}

        <fieldset className="space-y-4 border border-border bg-surface p-6">
          <legend className="px-2 text-title">When?</legend>
          <div className="grid gap-4 sm:grid-cols-2">
            <Field id="date" label={labels.date} error={errors.date} hint={`Order by ${site.delivery.cutoff} for next-day ${values.fulfilment}.`}>
              <input {...fieldProps("date", true)} type="date" min={minDate || undefined} max={maxDate || undefined} onChange={(e) => set("date", e.target.value)} />
            </Field>
            <Field id="slot" label={labels.slot} error={errors.slot}>
              <select {...fieldProps("slot")} onChange={(e) => set("slot", e.target.value)}>
                <option value="">Choose a slot</option>
                {site.timeSlots.map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>
            </Field>
          </div>
        </fieldset>

        <fieldset className="space-y-4 border border-border bg-surface p-6">
          <legend className="px-2 text-title">Extras</legend>
          <Field id="giftNote" label={labels.giftNote} error={errors.giftNote} optional hint={`We'll handwrite it on a card. ${values.giftNote.length}/${GIFT_NOTE_MAX} characters.`}>
            <textarea {...fieldProps("giftNote", true)} rows={3} onChange={(e) => set("giftNote", e.target.value)} />
          </Field>
          <Field id="instructions" label={labels.instructions} error={errors.instructions} optional hint="Gate codes, allergies, anything we should know.">
            <textarea {...fieldProps("instructions", true)} rows={2} onChange={(e) => set("instructions", e.target.value)} />
          </Field>
        </fieldset>
      </div>

      <div className="space-y-4 lg:sticky lg:top-8">
        <OrderSummary subtotal={t.subtotal} delivery={t.delivery} total={t.total} fulfilment={values.fulfilment}>
          <ul className="mt-4 space-y-1 border-t border-border pt-4 text-sm">
            {lines.map((l) => (
              <li key={l.key} className="flex justify-between gap-4">
                <span>
                  {l.qty} × {l.name} <span className="block">{l.variantLabel}</span>
                </span>
                <span className="tabular-nums">{formatPrice(l.lineTotal)}</span>
              </li>
            ))}
          </ul>
          <p className="mt-4 bg-bg p-2 text-sm">
            Pay on {values.fulfilment === "pickup" ? "pickup" : "delivery"} by UPI, card or cash. We&apos;ll confirm your order by phone.
          </p>
          <button type="submit" disabled={placing} className={buttonClass("primary", "mt-4 w-full")}>
            {placing ? "Placing order…" : `Place order · ${formatPrice(t.total)}`}
          </button>
        </OrderSummary>
        <Link href="/bag" className={`inline-block rounded-sm text-sm underline underline-offset-4 ${focusClass}`}>
          ← Back to bag
        </Link>
      </div>
    </form>
  );
}
