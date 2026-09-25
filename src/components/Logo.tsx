import Link from "next/link";
import { site } from "@/data/site";
import { focusClass } from "@/components/ui";

/**
 * Boxed wordmark: the name inside a hairline frame, with the descriptor sitting on the frame's
 * bottom edge. `ground` must match the background so the descriptor can mask the line behind it.
 */
export function Logo({ ground = "rose", size = "md" }: { ground?: "rose" | "blush"; size?: "md" | "lg" }) {
  const bg = ground === "rose" ? "bg-rose" : "bg-blush";
  const lg = size === "lg";
  return (
    <Link href="/" aria-label={`${site.name} home`} className={`group inline-block text-ink ${focusClass}`}>
      <span className={`relative block border border-ink text-center transition-colors group-hover:border-rose-deep ${lg ? "px-8 pt-4 pb-6" : "px-4 pt-1.5 pb-3 sm:px-5"}`}>
        <span className={`block font-normal tracking-[0.32em] uppercase ${lg ? "text-4xl" : "text-xl sm:text-2xl"}`}>{site.name}</span>
        <span
          className={`absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 px-2 whitespace-nowrap font-medium tracking-[0.2em] uppercase ${bg} ${lg ? "text-[0.6875rem]" : "text-[0.5rem] sm:text-[0.5625rem]"}`}
        >
          Pâtisserie &amp; cookies
        </span>
      </span>
    </Link>
  );
}
