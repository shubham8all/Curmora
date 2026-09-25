import { Suspense } from "react";
import { nav } from "@/data/site";
import { Announcement } from "@/components/Announcement";
import { BagButton } from "@/components/BagButton";
import { Logo } from "@/components/Logo";
import { MobileMenu } from "@/components/MobileMenu";
import { NavLinks, NavLinksStatic } from "@/components/NavLinks";

export function Header() {
  return (
    <>
      <Announcement />
      <header className="sticky top-0 z-30 bg-rose text-on-rose">
        <div className="relative grid h-18 grid-cols-[1fr_auto_1fr] items-center gap-4 px-4 sm:px-6 md:h-24 lg:px-10 2xl:px-16">
          <div className="flex items-center">
            <MobileMenu />
            <nav aria-label="Main" className="hidden lg:block">
              <Suspense fallback={<NavLinksStatic items={nav} />}>
                <NavLinks items={nav} />
              </Suspense>
            </nav>
          </div>
          <Logo />
          <div className="flex items-center justify-end">
            <BagButton />
          </div>
        </div>
      </header>
    </>
  );
}
