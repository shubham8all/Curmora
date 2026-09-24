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
      className={`relative grid size-11 place-items-center rounded-full border-[1.5px] border-text text-text transition-colors hover:bg-surface ${focusClass}`}
      aria-label={count ? `Bag, ${count} ${count === 1 ? "item" : "items"}` : "Bag, empty"}
    >
      <span key={`icon-${bump}`} className={bump ? "motion-safe:animate-wiggle" : ""}>
        <Handbag aria-hidden className="size-5" weight="bold" />
      </span>
      {count > 0 && (
        <span
          key={`count-${bump}`}
          className={`absolute -top-1 -right-1 grid min-w-5 place-items-center rounded-full bg-accent px-1 text-xs leading-5 font-semibold text-on-accent tabular-nums ${bump ? "motion-safe:animate-pop" : ""}`}
        >
          {count}
        </span>
      )}
    </Link>
  );
}
