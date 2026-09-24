"use client";

import { focusClass } from "@/components/ui";

export function QtyStepper({
  value,
  onChange,
  min = 1,
  max,
  label,
}: {
  value: number;
  onChange: (next: number) => void;
  min?: number;
  max: number;
  /** Accessible label, e.g. "Quantity of Tiramisu Cup". */
  label: string;
}) {
  const btn = `grid size-11 place-items-center rounded-full text-lg text-text hover:bg-surface-alt disabled:cursor-not-allowed disabled:opacity-40 ${focusClass}`;

  return (
    <div role="group" aria-label={label} className="inline-flex items-center rounded-full border-[1.5px] border-text bg-bg">
      <button type="button" className={btn} onClick={() => onChange(value - 1)} disabled={value <= min} aria-label="Decrease quantity">
        −
      </button>
      <output className="min-w-8 text-center font-semibold tabular-nums" aria-live="polite">
        {value}
      </output>
      <button type="button" className={btn} onClick={() => onChange(value + 1)} disabled={value >= max} aria-label="Increase quantity">
        +
      </button>
    </div>
  );
}
