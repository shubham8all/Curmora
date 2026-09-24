import Link from "next/link";
import { site } from "@/data/site";
import { focusClass } from "@/components/ui";

/** Curmora mark (a "C" drawn as an open cookie) with the wordmark and a short descriptor. */
export function Logo({ tone = "dark" }: { tone?: "dark" | "light" }) {
  const light = tone === "light";
  return (
    <Link href="/" className={`group inline-flex items-center gap-3 rounded-full ${focusClass}`}>
      <svg viewBox="0 0 64 64" aria-hidden className="size-10 shrink-0 transition-transform duration-300 group-hover:-rotate-12">
        <circle cx="32" cy="32" r="32" className={light ? "fill-highlight" : "fill-primary"} />
        <path d="M44.5 21.5a15 15 0 1 0 0 21" fill="none" strokeWidth="7" strokeLinecap="round" className={light ? "stroke-ink" : "stroke-bg"} />
      </svg>
      <span className="leading-none">
        <span className="block font-display text-2xl tracking-tight">{site.name}</span>
        <span className={`mt-1 block text-xs font-medium ${light ? "text-on-ink" : "text-text-muted"}`}>Small-batch bakery</span>
      </span>
    </Link>
  );
}
