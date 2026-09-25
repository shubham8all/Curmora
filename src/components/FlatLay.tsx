import type { CSSProperties } from "react";
import { getProduct } from "@/data/products";
import { ProductArt } from "@/components/ProductArt";

/** Where each piece sits on the cloth, how it is turned, and when it settles in. */
const pieces = [
  { slug: "macaron-box", spot: "left-[4%] top-[6%] w-[30%]", rotate: -8, delay: 0.1 },
  { slug: "dark-chocolate-salted-caramel", spot: "left-[36%] top-[2%] w-[34%]", rotate: 4, delay: 0.2 },
  { slug: "celebration-box", spot: "right-[3%] top-[8%] w-[26%]", rotate: 10, delay: 0.3 },
  { slug: "strawberry-shortcake-cup", spot: "left-[8%] top-[42%] w-[22%]", rotate: -6, delay: 0.35 },
  { slug: "brown-butter-chocolate-chunk", spot: "left-[32%] top-[36%] w-[36%]", rotate: 8, delay: 0.15 },
  { slug: "pistachio-kunafa-cup", spot: "right-[6%] top-[40%] w-[22%]", rotate: 6, delay: 0.45 },
  { slug: "vanilla-almond-raspberry", spot: "left-[2%] bottom-[2%] w-[32%]", rotate: -4, delay: 0.5 },
  { slug: "double-dark-sea-salt", spot: "left-[40%] bottom-[4%] w-[24%]", rotate: -10, delay: 0.55 },
  { slug: "berry-cheesecake", spot: "right-[4%] bottom-[3%] w-[26%]", rotate: 12, delay: 0.6 },
];

/**
 * The hero "photo": desserts laid out on a gingham tablecloth, seen from above, like a styled
 * patisserie flat-lay. Pieces settle in one after another, then breathe gently (CSS only).
 */
export function FlatLay({ className = "" }: { className?: string }) {
  return (
    <div className={`relative overflow-hidden gingham [--check:28px] ${className}`}>
      {pieces.map((p) => {
        const product = getProduct(p.slug);
        if (!product) return null;
        return (
          <div key={p.slug} className={`absolute ${p.spot} motion-safe:animate-pop-in`} style={{ animationDelay: `${p.delay}s` }}>
            <div
              className="motion-safe:animate-float"
              style={{ animationDuration: `${5 + (p.delay * 10) % 3}s`, animationDelay: `${-p.delay * 4}s`, rotate: `${p.rotate}deg` } as CSSProperties}
            >
              <ProductArt art={product.art} seed={product.slug} title={product.name} />
            </div>
          </div>
        );
      })}
    </div>
  );
}
