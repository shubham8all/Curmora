import { useId } from "react";
import { paint, type Art, type PaletteColor } from "@/data/products";

// Hand-drawn style product illustrations, built from brand-palette colours.
// Geometry is seeded by product slug so each item looks a little different but renders
// identically on server and client.

const INK = paint("beige-900");
// Highlight and shadow washes used inside the illustrations (not page tokens).
const HI = "rgb(255 255 250 / 0.65)";
const LO = "rgb(60 55 40 / 0.45)";

type Point = [number, number];

function seeded(seed: string) {
  let h = 2166136261;
  for (let i = 0; i < seed.length; i++) {
    h ^= seed.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return () => {
    h ^= h << 13;
    h ^= h >>> 17;
    h ^= h << 5;
    return (h >>> 0) / 4294967296;
  };
}

const pt = ([x, y]: Point) => `${x.toFixed(1)} ${y.toFixed(1)}`;

/** Rounds to one decimal place for compact, stable SVG attributes. */
const r1 = (n: number) => Math.round(n * 10) / 10;

/** A smooth, slightly irregular closed shape. */
function blob(cx: number, cy: number, r: number, rand: () => number, points = 14, wobble = 0.08) {
  const pts: Point[] = Array.from({ length: points }, (_, i) => {
    const a = (i / points) * Math.PI * 2;
    const rr = r * (1 + (rand() - 0.5) * 2 * wobble);
    return [cx + Math.cos(a) * rr, cy + Math.sin(a) * rr];
  });
  const mid = (p: Point, q: Point): Point => [(p[0] + q[0]) / 2, (p[1] + q[1]) / 2];
  let d = `M ${pt(mid(pts[points - 1], pts[0]))}`;
  for (let i = 0; i < points; i++) {
    d += ` Q ${pt(pts[i])} ${pt(mid(pts[i], pts[(i + 1) % points]))}`;
  }
  return `${d} Z`;
}

function Cookie({ art, seed, clipId }: { art: Extract<Art, { kind: "cookie" }>; seed: string; clipId: string }) {
  const rand = seeded(seed);
  const body = blob(100, 100, 66, rand, 16, 0.05);
  const chips = Array.from({ length: 8 }, () => {
    const a = rand() * Math.PI * 2;
    const d = 10 + rand() * 42;
    return blob(100 + Math.cos(a) * d, 100 + Math.sin(a) * d, 6 + rand() * 4, rand, 7, 0.25);
  });
  const cracks = Array.from({ length: 4 }, () => {
    const a = rand() * Math.PI * 2;
    const d = 14 + rand() * 34;
    const x = 100 + Math.cos(a) * d;
    const y = 100 + Math.sin(a) * d;
    return `M ${pt([x, y])} q ${(rand() * 12 - 6).toFixed(1)} ${(rand() * 8 - 4).toFixed(1)} ${(rand() * 18 - 9).toFixed(1)} ${(rand() * 10 - 5).toFixed(1)}`;
  });
  const topping = art.topping;

  return (
    <g>
      <ellipse cx="100" cy="172" rx="62" ry="8" fill={LO} opacity="0.35" />
      <clipPath id={clipId}>
        <path d={body} />
      </clipPath>
      <path d={body} fill={paint(art.dough)} />
      <g clipPath={`url(#${clipId})`}>
        <circle cx="84" cy="80" r="58" fill={HI} opacity="0.25" />
        <circle cx="122" cy="128" r="56" fill={LO} opacity="0.12" />
        {cracks.map((d, i) => (
          <path key={i} d={d} fill="none" stroke={INK} strokeOpacity="0.3" strokeWidth="2" strokeLinecap="round" />
        ))}
        {chips.map((d, i) => (
          <path key={i} d={d} fill={paint(art.chip)} stroke={INK} strokeWidth="1.5" />
        ))}
        {topping?.type === "drizzle" && (
          <>
            <path d="M24 70 C 50 58, 60 96, 90 82 S 130 58, 150 84 S 172 104, 180 96" fill="none" stroke={INK} strokeWidth="7" strokeLinecap="round" />
            <path d="M24 70 C 50 58, 60 96, 90 82 S 130 58, 150 84 S 172 104, 180 96" fill="none" stroke={paint(topping.color)} strokeWidth="4" strokeLinecap="round" />
            <path d="M20 118 C 46 104, 70 140, 100 124 S 140 106, 180 128" fill="none" stroke={INK} strokeWidth="7" strokeLinecap="round" />
            <path d="M20 118 C 46 104, 70 140, 100 124 S 140 106, 180 128" fill="none" stroke={paint(topping.color)} strokeWidth="4" strokeLinecap="round" />
          </>
        )}
      </g>
      <path d={body} fill="none" stroke={INK} strokeWidth="3" />
      {topping?.type === "salt" &&
        Array.from({ length: 9 }, (_, i) => {
          const x = r1(60 + rand() * 80);
          const y = r1(60 + rand() * 80);
          return (
            <rect key={i} x={x} y={y} width="5" height="4" rx="1" transform={`rotate(${Math.round(rand() * 90)} ${x} ${y})`} fill={paint(topping.color)} stroke={INK} strokeWidth="0.8" />
          );
        })}
      {topping?.type === "nuts" &&
        Array.from({ length: 6 }, (_, i) => {
          const x = r1(62 + rand() * 76);
          const y = r1(62 + rand() * 76);
          return <ellipse key={i} cx={x} cy={y} rx="6" ry="4" transform={`rotate(${Math.round(rand() * 180)} ${x} ${y})`} fill={paint(topping.color)} stroke={INK} strokeWidth="1.5" />;
        })}
      {topping?.type === "sprinkles" &&
        Array.from({ length: 12 }, (_, i) => {
          const x = r1(56 + rand() * 88);
          const y = r1(56 + rand() * 88);
          return <rect key={i} x={x} y={y} width="9" height="3" rx="1.5" transform={`rotate(${Math.round(rand() * 180)} ${x} ${y})`} fill={paint(topping.color)} />;
        })}
    </g>
  );
}

function Cup({ art, seed, clipId }: { art: Extract<Art, { kind: "cup" }>; seed: string; clipId: string }) {
  const rand = seeded(seed);
  const cup = "M58 66 L142 66 L133 176 Q132 182 126 182 L74 182 Q68 182 67 176 Z";
  const n = art.layers.length;
  const top = 78;
  const bottom = 182;
  const h = (bottom - top) / n;
  const wave = (y: number) => {
    const a = r1(3 + rand() * 4);
    return `M40 ${y} Q55 ${y - a} 70 ${y} T100 ${y} T130 ${y} T160 ${y}`;
  };
  const bands = art.layers.map((color, i) => {
    const y = bottom - (i + 1) * h;
    return { color, y, line: wave(y) };
  });

  return (
    <g>
      <ellipse cx="100" cy="184" rx="44" ry="6" fill={LO} opacity="0.35" />
      <clipPath id={clipId}>
        <path d={cup} />
      </clipPath>
      <g clipPath={`url(#${clipId})`}>
        <rect x="40" y="60" width="120" height="130" fill={HI} opacity="0.5" />
        {[...bands].reverse().map((b, i) => (
          <path key={i} d={`${b.line} L160 190 L40 190 Z`} fill={paint(b.color)} />
        ))}
        {bands.map((b, i) => (
          <path key={i} d={b.line} fill="none" stroke={INK} strokeOpacity="0.35" strokeWidth="1.5" />
        ))}
        {Array.from({ length: 10 }, (_, i) => (
          <circle key={i} cx={r1(72 + rand() * 56)} cy={r1(bottom - 4 - rand() * (h - 8))} r="1.5" fill={INK} opacity="0.3" />
        ))}
        <path d="M68 78 L75 172" stroke={HI} strokeWidth="5" strokeLinecap="round" opacity="0.8" />
      </g>
      <path d={cup} fill="none" stroke={INK} strokeWidth="3" strokeLinejoin="round" />
      {/* Cream swirl */}
      <path d="M56 66 Q56 50 78 50 L122 50 Q144 50 144 66 Z" fill={paint(art.cream)} stroke={INK} strokeWidth="2.5" strokeLinejoin="round" />
      <path d="M68 50 Q68 36 86 36 L114 36 Q132 36 132 50 Z" fill={paint(art.cream)} stroke={INK} strokeWidth="2.5" strokeLinejoin="round" />
      <path d="M84 36 Q86 20 100 16 Q104 26 116 36 Z" fill={paint(art.cream)} stroke={INK} strokeWidth="2.5" strokeLinejoin="round" />
      <path d="M72 58 Q90 54 108 58" fill="none" stroke={HI} strokeWidth="3" strokeLinecap="round" />
      {Array.from({ length: 6 }, (_, i) => {
        const x = r1(70 + rand() * 60);
        const y = r1(34 + rand() * 24);
        return <rect key={i} x={x} y={y} width="6" height="6" rx="1.5" transform={`rotate(${Math.round(rand() * 90)} ${x} ${y})`} fill={paint(art.topping)} stroke={INK} strokeWidth="1.2" />;
      })}
      <path d="M52 66 L148 66" stroke={INK} strokeWidth="3" strokeLinecap="round" />
    </g>
  );
}

function Cake({ art, seed }: { art: Extract<Art, { kind: "cake" }>; seed: string }) {
  const rand = seeded(seed);
  const rx = 68;
  const base = (x: number) => 104 + 16 * Math.sqrt(Math.max(0, 1 - ((x - 100) / rx) ** 2));
  let glaze = `M32 82 L32 ${base(32).toFixed(1)}`;
  for (let x = 32; x < 168; x += 17) {
    const x1 = Math.min(168, x + 17);
    const m = (x + x1) / 2;
    const depth = rand() < 0.6 ? 8 + rand() * 18 : 3;
    glaze += ` Q ${m.toFixed(1)} ${(base(m) + depth).toFixed(1)} ${x1.toFixed(1)} ${base(x1).toFixed(1)}`;
  }
  glaze += " L168 82 Z";
  const berries = [-40, -16, 10, 34].map((dx, i) => ({ x: 100 + dx, y: r1(76 + (i % 2) * 6 + rand() * 3) }));

  return (
    <g>
      <ellipse cx="100" cy="164" rx="88" ry="15" fill={paint("beige-50")} stroke={INK} strokeWidth="2.5" />
      <path d={`M32 82 L32 146 A${rx} 16 0 0 0 168 146 L168 82 Z`} fill={paint(art.sponge)} stroke={INK} strokeWidth="3" />
      <path d={`M32 134 A${rx} 16 0 0 0 168 134`} fill="none" stroke={INK} strokeOpacity="0.3" strokeWidth="2" />
      <path d={glaze} fill={paint(art.glaze)} stroke={INK} strokeWidth="2.5" strokeLinejoin="round" />
      <ellipse cx="100" cy="82" rx={rx} ry="16" fill={paint(art.glaze)} stroke={INK} strokeWidth="3" />
      <ellipse cx="86" cy="78" rx="36" ry="6" fill={HI} opacity="0.35" />
      {berries.map((b, i) => (
        <g key={i}>
          <circle cx={b.x} cy={b.y} r="7" fill={paint(art.decor)} stroke={INK} strokeWidth="2" />
          <circle cx={b.x - 2} cy={b.y - 2.5} r="1.8" fill={HI} />
        </g>
      ))}
    </g>
  );
}

function Macaron({ x, y, rotate, color }: { x: number; y: number; rotate: number; color: PaletteColor }) {
  return (
    <g transform={`translate(${x} ${y}) rotate(${rotate})`}>
      <path d="M-40 -6 Q-40 -28 0 -28 Q40 -28 40 -6 Z" fill={paint(color)} stroke={INK} strokeWidth="2.5" strokeLinejoin="round" />
      <path d="M-24 -18 Q-8 -24 12 -22" fill="none" stroke={HI} strokeWidth="3" strokeLinecap="round" />
      <path d="M-40 -6 q5 4 10 0 t10 0 t10 0 t10 0 t10 0 t10 0 t10 0 t10 0" fill="none" stroke={INK} strokeWidth="2" />
      <rect x="-37" y="-5" width="74" height="10" rx="3" fill={paint("beige-50")} stroke={INK} strokeWidth="2" />
      <path d="M-40 6 q5 -4 10 0 t10 0 t10 0 t10 0 t10 0 t10 0 t10 0 t10 0" fill="none" stroke={INK} strokeWidth="2" />
      <path d="M-40 6 L40 6 Q40 26 0 26 Q-40 26 -40 6 Z" fill={paint(color)} stroke={INK} strokeWidth="2.5" strokeLinejoin="round" />
    </g>
  );
}

function Macarons({ art }: { art: Extract<Art, { kind: "macaron" }> }) {
  const [a, b, c] = [art.shells[0], art.shells[1] ?? art.shells[0], art.shells[2] ?? art.shells[0]];
  return (
    <g>
      <ellipse cx="100" cy="176" rx="66" ry="8" fill={LO} opacity="0.35" />
      <Macaron x={96} y={62} rotate={-4} color={c} />
      <Macaron x={124} y={108} rotate={6} color={b} />
      <Macaron x={76} y={142} rotate={-8} color={a} />
    </g>
  );
}

function GiftBox({ art }: { art: Extract<Art, { kind: "giftbox" }> }) {
  return (
    <g>
      <ellipse cx="100" cy="176" rx="70" ry="8" fill={LO} opacity="0.35" />
      <rect x="42" y="92" width="116" height="80" rx="4" fill={paint(art.box)} stroke={INK} strokeWidth="3" />
      <rect x="42" y="92" width="116" height="80" rx="4" fill={LO} opacity="0.15" />
      <rect x="92" y="92" width="16" height="80" fill={paint(art.ribbon)} stroke={INK} strokeWidth="2" />
      <rect x="34" y="72" width="132" height="26" rx="4" fill={paint(art.box)} stroke={INK} strokeWidth="3" />
      <path d="M40 78 L160 78" stroke={HI} strokeWidth="3" strokeLinecap="round" opacity="0.6" />
      <rect x="92" y="72" width="16" height="26" fill={paint(art.ribbon)} stroke={INK} strokeWidth="2" />
      <path d="M100 72 C 74 40, 52 62, 72 72 Z" fill={paint(art.ribbon)} stroke={INK} strokeWidth="2.5" strokeLinejoin="round" />
      <path d="M100 72 C 126 40, 148 62, 128 72 Z" fill={paint(art.ribbon)} stroke={INK} strokeWidth="2.5" strokeLinejoin="round" />
      <circle cx="100" cy="70" r="7" fill={paint(art.ribbon)} stroke={INK} strokeWidth="2.5" />
      <path d="M130 112 L150 104 L156 120 L136 128 Z" fill={paint("beige-50")} stroke={INK} strokeWidth="2" strokeLinejoin="round" />
      <path d="M140 114 L150 110" stroke={INK} strokeWidth="1.5" strokeLinecap="round" />
    </g>
  );
}

/** Short radiating strokes either side of the product, like a hand-drawn "fresh" doodle. */
function Doodles() {
  const lines = [
    "M16 72 L30 80",
    "M10 102 L27 102",
    "M16 132 L30 124",
    "M184 72 L170 80",
    "M190 102 L173 102",
    "M184 132 L170 124",
  ];
  return (
    <g stroke={INK} strokeWidth="3" strokeLinecap="round">
      {lines.map((d) => (
        <path key={d} d={d} />
      ))}
    </g>
  );
}

export function ProductArt({
  art,
  seed,
  doodles = false,
  title,
  className,
}: {
  art: Art;
  seed: string;
  doodles?: boolean;
  /** Accessible name. Omit when the product name is already shown next to the art. */
  title?: string;
  className?: string;
}) {
  const clipId = useId();
  const a11y = title ? { role: "img", "aria-label": title } : { "aria-hidden": true };

  return (
    <svg viewBox="0 0 200 200" className={className} {...a11y}>
      {doodles && <Doodles />}
      {art.kind === "cookie" && <Cookie art={art} seed={seed} clipId={clipId} />}
      {art.kind === "cup" && <Cup art={art} seed={seed} clipId={clipId} />}
      {art.kind === "cake" && <Cake art={art} seed={seed} />}
      {art.kind === "macaron" && <Macarons art={art} />}
      {art.kind === "giftbox" && <GiftBox art={art} />}
    </svg>
  );
}
