import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";
import { ArrowRight } from "@phosphor-icons/react/dist/ssr";

type ButtonVariant = "primary" | "accent" | "highlight" | "light" | "outline";
type ButtonSize = "md" | "sm";

const focusRing = "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--focus-ring)";

const buttonBase = `group/btn inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full text-label transition duration-200 ease-out select-none ${focusRing} hover:-translate-y-0.5 hover:shadow-soft active:translate-y-0 active:shadow-none disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:translate-y-0 disabled:hover:shadow-none`;

const buttonSizes: Record<ButtonSize, string> = {
  md: "px-6 py-3",
  sm: "px-4 py-2 text-sm",
};

const buttonVariants: Record<ButtonVariant, string> = {
  primary: "bg-primary text-on-primary hover:brightness-110",
  accent: "bg-accent text-on-accent hover:brightness-110",
  highlight: "bg-highlight text-on-highlight hover:brightness-105",
  light: "bg-bg text-text hover:brightness-95",
  /** Takes the surrounding text colour, so it works on cream and on coloured blocks. */
  outline: "border-[1.5px] border-current bg-transparent hover:bg-current/10",
};

/** design.md pill buttons: primary (olive), accent (red), highlight (butter), light (cream) and outline. */
export function buttonClass(variant: ButtonVariant = "primary", extra = "", size: ButtonSize = "md") {
  return `${buttonBase} ${buttonSizes[size]} ${buttonVariants[variant]} ${extra}`;
}

export const focusClass = focusRing;

/** Arrow icon that nudges right when its parent button or link is hovered. */
export function Arrow({ className = "" }: { className?: string }) {
  return (
    <ArrowRight
      aria-hidden
      weight="bold"
      className={`size-4 shrink-0 transition-transform duration-200 group-hover/btn:translate-x-0.5 group-hover/link:translate-x-0.5 ${className}`}
    />
  );
}

/** Tertiary action: underlined text with an arrow, in the surrounding text colour. */
export function TextLink({ children, className = "", ...props }: ComponentProps<typeof Link>) {
  return (
    <Link
      {...props}
      className={`group/link inline-flex items-center gap-2 rounded-sm font-semibold underline decoration-current/40 decoration-2 underline-offset-8 transition-colors hover:decoration-current ${focusRing} ${className}`}
    >
      {children}
      <Arrow />
    </Link>
  );
}

export function Container({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <div className={`w-full px-4 sm:px-6 lg:px-10 2xl:px-16 ${className}`}>{children}</div>;
}

export type BrushTone = "primary" | "accent" | "surface" | "surface-alt" | "ink" | "highlight" | "pink";
export type BrushShape = 0 | 1 | 2 | 3;

const brushTones: Record<BrushTone, { paint: string; text: string; shape: BrushShape }> = {
  primary: { paint: "bg-primary", text: "text-on-primary [--focus-ring:var(--highlight)]", shape: 0 },
  accent: { paint: "bg-accent", text: "text-on-accent [--focus-ring:var(--highlight)]", shape: 3 },
  ink: { paint: "bg-ink", text: "text-on-ink [--focus-ring:var(--highlight)]", shape: 1 },
  surface: { paint: "bg-surface", text: "text-on-surface", shape: 1 },
  "surface-alt": { paint: "bg-surface-alt", text: "text-on-surface", shape: 2 },
  highlight: { paint: "bg-highlight", text: "text-on-highlight", shape: 2 },
  pink: { paint: "bg-pink-200", text: "text-on-surface", shape: 3 },
};

/**
 * A colour block with brush-painted edges and faint dry-brush streaks. The paint is a masked
 * layer behind the content (see `.brush-paint` in globals.css), so text and products stay crisp.
 */
export function BrushPanel({
  tone = "surface",
  paint,
  shape,
  size = "lg",
  children,
  className = "",
  as: Tag = "div",
  id,
}: {
  tone?: BrushTone;
  /** A light palette background class (e.g. `bg-pink-100`) instead of a named tone. Text uses on-surface. */
  paint?: string;
  /** Which of the four brush edges to use; neighbouring panels look best with different ones. */
  shape?: BrushShape;
  /** `sm` gives small cards a finer edge. */
  size?: "lg" | "sm";
  children: ReactNode;
  className?: string;
  as?: "div" | "section" | "aside" | "li" | "article";
  id?: string;
}) {
  const t = paint ? { paint, text: "text-on-surface", shape: 0 as BrushShape } : brushTones[tone];
  const edge = shape ?? t.shape;
  return (
    <Tag id={id} className={`relative isolate ${t.text} ${className}`}>
      <div aria-hidden className={`brush-paint ${edge ? `brush-${edge}` : ""} ${size === "sm" ? "brush-sm" : ""} ${t.paint}`} />
      {children}
    </Tag>
  );
}

/** Small pill label, e.g. "Bestseller" or "Eggless". */
export function Badge({ children, tone = "accent", className = "" }: { children: ReactNode; tone?: "accent" | "highlight" | "ink"; className?: string }) {
  const tones = {
    accent: "bg-accent text-on-accent",
    highlight: "bg-highlight text-on-highlight",
    ink: "bg-ink text-on-ink",
  };
  return <span className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold ${tones[tone]} ${className}`}>{children}</span>;
}

/** Short list with accent-red dot bullets. */
export function DotList({ items, className = "" }: { items: string[]; className?: string }) {
  return (
    <ul className={`space-y-1 ${className}`}>
      {items.map((item) => (
        <li key={item} className="flex items-baseline gap-2">
          <span aria-hidden className="size-1.5 shrink-0 translate-y-[-2px] rounded-full bg-accent" />
          {item}
        </li>
      ))}
    </ul>
  );
}

export function Eyebrow({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <p className={`text-label text-accent ${className}`}>{children}</p>;
}

export function SectionTitle({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <h2 className={`text-h2 ${className}`}>{children}</h2>;
}
