import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";
import { ArrowRight } from "@phosphor-icons/react/dist/ssr";

type ButtonVariant = "primary" | "light" | "muted" | "rose" | "outline";
type ButtonSize = "md" | "sm";

const focusRing = "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--focus-ring)";

const buttonBase = `group/btn inline-flex items-center justify-center gap-2 whitespace-nowrap text-label transition duration-200 ease-out select-none ${focusRing} hover:-translate-y-px active:translate-y-0 disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:translate-y-0`;

const buttonSizes: Record<ButtonSize, string> = {
  md: "px-6 py-3.5",
  sm: "px-4 py-2.5",
};

const buttonVariants: Record<ButtonVariant, string> = {
  primary: "bg-ink text-on-ink hover:bg-beige-800",
  light: "bg-surface text-ink hover:bg-beige-100",
  muted: "bg-muted text-ink hover:bg-sage-400",
  rose: "bg-rose text-on-rose hover:bg-pink-300",
  /** Takes the surrounding text colour, so it works on cream and on coloured bands. */
  outline: "border border-current bg-transparent hover:bg-current/10",
};

/** design.md rectangular buttons: primary (ink), light (surface), muted (sage), rose and outline. */
export function buttonClass(variant: ButtonVariant = "primary", extra = "", size: ButtonSize = "md") {
  return `${buttonBase} ${buttonSizes[size]} ${buttonVariants[variant]} ${extra}`;
}

export const focusClass = focusRing;

/** Arrow icon that nudges right when its parent button or link is hovered. */
export function Arrow({ className = "" }: { className?: string }) {
  return (
    <ArrowRight
      aria-hidden
      className={`size-4 shrink-0 transition-transform duration-200 group-hover/btn:translate-x-0.5 group-hover/link:translate-x-0.5 ${className}`}
    />
  );
}

/** Tertiary action: uppercase text with an underline that grows on hover. */
export function TextLink({ children, className = "", ...props }: ComponentProps<typeof Link>) {
  return (
    <Link
      {...props}
      className={`group/link relative inline-flex items-center gap-2 text-label after:absolute after:inset-x-0 after:-bottom-1 after:h-px after:origin-left after:bg-current after:transition-transform after:duration-300 hover:after:scale-x-100 ${focusRing} ${className} after:scale-x-40`}
    >
      {children}
      <Arrow />
    </Link>
  );
}

export function Container({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <div className={`w-full px-4 sm:px-6 lg:px-10 2xl:px-16 ${className}`}>{children}</div>;
}

/** Small square-cornered label, e.g. "Bestseller" or "Eggless". */
export function Badge({ children, tone = "rose", className = "" }: { children: ReactNode; tone?: "rose" | "ink" | "surface"; className?: string }) {
  const tones = {
    rose: "bg-rose text-on-rose",
    ink: "bg-ink text-on-ink",
    surface: "bg-surface text-ink",
  };
  return <span className={`inline-flex items-center rounded-sm px-2 py-1 text-[0.625rem] font-medium tracking-[0.12em] uppercase ${tones[tone]} ${className}`}>{children}</span>;
}

/** Short list of facts with small rose dots. */
export function DotList({ items, className = "" }: { items: string[]; className?: string }) {
  return (
    <ul className={`space-y-1 ${className}`}>
      {items.map((item) => (
        <li key={item} className="flex items-baseline gap-2">
          <span aria-hidden className="size-1.5 shrink-0 translate-y-[-2px] rounded-full bg-rose" />
          {item}
        </li>
      ))}
    </ul>
  );
}

export function Eyebrow({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <p className={`text-label text-text-muted ${className}`}>{children}</p>;
}

/** Section heading: small, uppercase and widely tracked, as in design.md "title". */
export function SectionTitle({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <h2 className={`text-title ${className}`}>{children}</h2>;
}
