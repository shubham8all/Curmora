"use client";

import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { focusClass } from "@/components/ui";

type Item = { href: string; label: string };

function isActive(href: string, pathname: string, category: string | null) {
  const [path, query] = href.split("?");
  if (path === "/" || path.startsWith("/#")) return false;
  if (query) return pathname === path && `category=${category}` === query;
  if (path === "/shop") return pathname.startsWith("/shop") && category !== "gifting";
  return pathname === path;
}

const linkClass = `relative py-2 text-[0.8125rem] font-medium tracking-[0.12em] text-ink uppercase ${focusClass} after:absolute after:inset-x-0 after:bottom-0.5 after:h-px after:origin-left after:scale-x-0 after:bg-ink after:transition-transform after:duration-300 hover:after:scale-x-100 aria-[current=page]:after:scale-x-100`;

/** Desktop nav links. Marks the current section so shoppers always know where they are. */
export function NavLinks({ items }: { items: Item[] }) {
  const pathname = usePathname();
  const category = useSearchParams().get("category");

  return (
    <ul className="flex items-center gap-7">
      {items.map((item) => (
        <li key={item.href}>
          <Link href={item.href} aria-current={isActive(item.href, pathname, category) ? "page" : undefined} className={linkClass}>
            {item.label}
          </Link>
        </li>
      ))}
    </ul>
  );
}

/** Same links without active state, shown while search params are unavailable during prerender. */
export function NavLinksStatic({ items }: { items: Item[] }) {
  return (
    <ul className="flex items-center gap-7">
      {items.map((item) => (
        <li key={item.href}>
          <Link href={item.href} className={linkClass}>
            {item.label}
          </Link>
        </li>
      ))}
    </ul>
  );
}
