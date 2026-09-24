"use client";

import { motion, useMotionValue, useReducedMotion, useSpring, useTransform, type MotionValue } from "motion/react";
import type { CSSProperties, PointerEvent, ReactNode } from "react";
import type { Product } from "@/data/products";
import { ProductArt } from "@/components/ProductArt";

/**
 * One hero piece, three layers deep so each motion stays on its own element:
 * pointer parallax (Motion values, outside React renders) > pop-in on load (CSS) > idle float (CSS).
 */
function Piece({
  className,
  depth,
  px,
  py,
  delay,
  floatFor,
  rotate,
  children,
}: {
  className: string;
  depth: number;
  px: MotionValue<number>;
  py: MotionValue<number>;
  delay: number;
  floatFor: number;
  rotate: number;
  children: ReactNode;
}) {
  const x = useTransform(px, (v) => v * depth);
  const y = useTransform(py, (v) => v * depth);

  return (
    <motion.div className={`absolute ${className}`} style={{ x, y }}>
      <div className="motion-safe:animate-pop-in" style={{ animationDelay: `${delay}s` }}>
        <div
          className="motion-safe:animate-float"
          style={{ animationDuration: `${floatFor}s`, animationDelay: `${-delay * 3}s`, rotate: `${rotate}deg` } as CSSProperties}
        >
          {children}
        </div>
      </div>
    </motion.div>
  );
}

/**
 * Hero products spilling out of the top-right of the olive block: they pop in one after another,
 * then float gently, and on desktop they drift with the pointer at different depths.
 */
export function HeroArt({ main, second, cup, floater }: { main: Product; second: Product; cup: Product; floater: Product }) {
  const reduce = useReducedMotion();
  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const px = useSpring(rawX, { stiffness: 120, damping: 20, mass: 0.6 });
  const py = useSpring(rawY, { stiffness: 120, damping: 20, mass: 0.6 });

  function onMove(e: PointerEvent<HTMLDivElement>) {
    if (reduce || e.pointerType !== "mouse") return;
    const box = e.currentTarget.getBoundingClientRect();
    rawX.set((e.clientX - box.left) / box.width - 0.5);
    rawY.set((e.clientY - box.top) / box.height - 0.5);
  }

  function onLeave() {
    rawX.set(0);
    rawY.set(0);
  }

  return (
    <div className="relative mx-auto aspect-square w-full max-w-lg md:max-w-xl 2xl:max-w-2xl" onPointerMove={onMove} onPointerLeave={onLeave}>
      <Piece className="top-[4%] left-[2%] w-[52%]" depth={-18} px={px} py={py} delay={0.35} floatFor={7} rotate={-12}>
        <ProductArt art={second.art} seed={second.slug} title={`Illustration of ${second.name}`} />
      </Piece>
      <Piece className="top-[18%] right-[2%] w-[70%]" depth={28} px={px} py={py} delay={0.15} floatFor={6} rotate={8}>
        <ProductArt art={main.art} seed={main.slug} title={`Illustration of ${main.name}`} />
      </Piece>
      <Piece className="bottom-0 left-[6%] w-[38%]" depth={40} px={px} py={py} delay={0.5} floatFor={5} rotate={-6}>
        <ProductArt art={cup.art} seed={cup.slug} title={`Illustration of ${cup.name}`} />
      </Piece>
      <Piece className="-top-[3%] right-[-4%] w-[30%]" depth={-36} px={px} py={py} delay={0.7} floatFor={4.5} rotate={14}>
        <ProductArt art={floater.art} seed={floater.slug} title={`Illustration of ${floater.name}`} />
      </Piece>
    </div>
  );
}
