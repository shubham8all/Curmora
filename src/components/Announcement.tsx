"use client";

import { useState } from "react";
import { CaretLeft, CaretRight } from "@phosphor-icons/react";
import { site } from "@/data/site";
import { focusClass } from "@/components/ui";

/** Blush announcement bar. Messages change only when the shopper uses the arrows. */
export function Announcement() {
  const messages = site.announcements;
  const [i, setI] = useState(0);
  const step = (d: number) => setI((n) => (n + d + messages.length) % messages.length);
  const arrow = `grid size-9 shrink-0 place-items-center text-ink transition-colors hover:text-rose-deep ${focusClass}`;

  return (
    <div className="flex items-center justify-between gap-2 bg-blush px-2 sm:px-4">
      <button type="button" onClick={() => step(-1)} className={arrow}>
        <CaretLeft aria-hidden className="size-4" />
        <span className="sr-only">Previous message</span>
      </button>
      <p key={i} aria-live="polite" className="min-h-9 content-center py-2 text-center text-label text-ink motion-safe:animate-rise">
        {messages[i]}
      </p>
      <button type="button" onClick={() => step(1)} className={arrow}>
        <CaretRight aria-hidden className="size-4" />
        <span className="sr-only">Next message</span>
      </button>
    </div>
  );
}
