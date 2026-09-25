"use client";

import { useState } from "react";
import { Pause, Play } from "@phosphor-icons/react";
import { focusClass } from "@/components/ui";

/**
 * Oversized line of text drifting across a two-tone band. Pauses on hover and with its button,
 * and stays still for reduced-motion users.
 */
export function Marquee({ text, label }: { text: string; label: string }) {
  const [paused, setPaused] = useState(false);

  return (
    <div className="group relative overflow-hidden">
      <p className="sr-only">{label}</p>
      <div
        aria-hidden
        className={`flex w-max motion-safe:animate-marquee group-hover:[animation-play-state:paused] ${paused ? "[animation-play-state:paused]" : ""}`}
      >
        {[0, 1].map((copy) => (
          <span key={copy} className="pr-[0.4em] text-marquee whitespace-nowrap">
            {text}
          </span>
        ))}
      </div>
      <button
        type="button"
        onClick={() => setPaused((p) => !p)}
        className={`absolute top-0 right-0 grid size-9 place-items-center bg-surface/80 text-ink motion-reduce:hidden ${focusClass}`}
      >
        <span className="sr-only">{paused ? "Play scrolling text" : "Pause scrolling text"}</span>
        {paused ? <Play aria-hidden weight="fill" className="size-3.5" /> : <Pause aria-hidden weight="fill" className="size-3.5" />}
      </button>
    </div>
  );
}
