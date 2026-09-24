import type { CSSProperties, ReactNode } from "react";

/**
 * Lifts content into place as it scrolls into view. Pure CSS (a scroll-driven animation in
 * globals.css), so it needs no JavaScript, never hides content before hydration, and runs off
 * the main thread. `delay` staggers siblings (0 to about 0.4).
 */
export function Reveal({
  children,
  delay = 0,
  className = "",
  as: Tag = "div",
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
  as?: "div" | "li" | "section";
}) {
  return (
    <Tag className={`reveal ${className}`} style={{ "--reveal-delay": delay } as CSSProperties}>
      {children}
    </Tag>
  );
}
