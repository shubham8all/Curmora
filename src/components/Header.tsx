import Link from "next/link";
import { Suspense } from "react";
import { nav } from "@/data/site";
import { BagButton } from "@/components/BagButton";
import { Logo } from "@/components/Logo";
import { MobileMenu } from "@/components/MobileMenu";
import { NavLinks, NavLinksStatic } from "@/components/NavLinks";
import { buttonClass } from "@/components/ui";

export function Header() {
  return (
    <header className="sticky top-0 z-30 border-b border-border/60 bg-bg">
      <div className="relative flex h-18 items-center justify-between gap-6 px-4 sm:px-6 md:h-20 lg:px-10 2xl:px-16">
        <div className="flex items-center gap-2">
          <MobileMenu />
          <Logo />
        </div>
        <nav aria-label="Main" className="hidden lg:block">
          <Suspense fallback={<NavLinksStatic items={nav} />}>
            <NavLinks items={nav} />
          </Suspense>
        </nav>
        <div className="flex items-center gap-3">
          <BagButton />
          <Link href="/shop" className={buttonClass("primary", "max-sm:hidden")}>
            Shop now
          </Link>
        </div>
      </div>
    </header>
  );
}
