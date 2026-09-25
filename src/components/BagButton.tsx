"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Handbag } from "@phosphor-icons/react";
import { BAG_ADD_EVENT, useBag } from "@/lib/bag";
import { focusClass } from "@/components/ui";

export function BagButton() {
  const count = useBag().reduce((sum, l) => sum + l.qty, 0);
  // Bumped on every add; used as a key so the wiggle and pop animations replay.
  const [bump, setBump] = useState(0);

  useEffect(() => {
    const onAdd = () => setBump((b) => b + 1);
    window.addEventListener(BAG_ADD_EVENT, onAdd);
    return () => window.removeEventListener(BAG_ADD_EVENT, onAdd);
  }, []);

  return (
    <Link
      href="/bag"
      className={`relative inline-flex items-center gap-2 py-2 text-ink ${focusClass}`}
      aria-label={count ? `Bag, ${count} ${count === 1 ? "item" : "items"}` : "Bag, empty"}
    >
      <span key={`icon-${bump}`} className={bump ? "motion-safe:animate-wiggle" : ""}>
        <Handbag aria-hidden className="size-6" />
      </span>
      <span className="hidden text-[0.8125rem] font-medium tracking-[0.12em] uppercase sm:inline">Bag</span>
      {count > 0 && (
        <span
          key={`count-${bump}`}
          className={`grid min-w-5 place-items-center rounded-sm bg-ink px-1 text-[0.6875rem] leading-5 font-semibold text-on-ink tabular-nums max-sm:absolute max-sm:-top-0.5 max-sm:-right-2 ${bump ? "motion-safe:animate-pop" : ""}`}
        >
          {count}
        </span>
      )}
    </Link>
  );
}
