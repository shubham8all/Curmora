// Renders the brush-painted edge masks and streak texture used by BrushPanel.
// Run: node scripts/render-brush-masks.mjs   (needs Google Chrome; set CHROME=/path/to/chrome elsewhere)
//
// The look comes from an SVG turbulence + displacement filter. Running that filter live on every
// panel made scrolling janky, so it is rendered once here into PNGs:
//   public/brush/edge-{0..3}.png  alpha masks, applied as 9-slice mask borders so the brushed edge
//                                 keeps the same scale on panels of any size
//   public/brush/streaks.png      a seamless tile of faint dry-brush streaks laid over the paint
import { chromium } from "playwright-core";
import { mkdirSync } from "node:fs";

const CHROME = process.env.CHROME ?? "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";
const OUT = new URL("../public/brush/", import.meta.url).pathname;
mkdirSync(OUT, { recursive: true });

// Canvas for each edge mask, and the transparent margin the brush strokes can spill into.
const SIZE = 1000;
const MARGIN = 60;

// The exact filter from the approved design: a slow wobble, horizontal bristle streaks on the
// left and right edges, and a rougher top and bottom.
const edgeFilter = (seed) => `
  <filter id="f" x="-10%" y="-10%" width="120%" height="120%" color-interpolation-filters="sRGB">
    <feTurbulence type="fractalNoise" baseFrequency="0.005 0.02" numOctaves="2" seed="${seed}" result="wobble"/>
    <feDisplacementMap in="SourceGraphic" in2="wobble" scale="30" xChannelSelector="R" yChannelSelector="G" result="bent"/>
    <feTurbulence type="fractalNoise" baseFrequency="0.0015 0.28" numOctaves="3" seed="${seed + 5}" result="hStreak"/>
    <feDisplacementMap in="bent" in2="hStreak" scale="34" xChannelSelector="R" yChannelSelector="B" result="sides"/>
    <feTurbulence type="fractalNoise" baseFrequency="0.3 0.004" numOctaves="3" seed="${seed + 9}" result="vStreak"/>
    <feDisplacementMap in="sides" in2="vStreak" scale="14" xChannelSelector="B" yChannelSelector="G"/>
  </filter>`;

const edgeSvg = (seed) => `<svg xmlns="http://www.w3.org/2000/svg" width="${SIZE}" height="${SIZE}">
  <defs>${edgeFilter(seed)}</defs>
  <rect x="${MARGIN}" y="${MARGIN}" width="${SIZE - 2 * MARGIN}" height="${SIZE - 2 * MARGIN}" fill="#000" filter="url(#f)"/>
</svg>`;

// Faint horizontal streaks, tileable thanks to stitchTiles.
const TILE_W = 1024;
const TILE_H = 512;
const streakSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="${TILE_W}" height="${TILE_H}">
  <filter id="t" x="0" y="0" width="100%" height="100%" color-interpolation-filters="sRGB">
    <feTurbulence type="fractalNoise" baseFrequency="0.002 0.18" numOctaves="3" seed="6" stitchTiles="stitch"/>
    <feColorMatrix type="matrix" values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 0.22 -0.1"/>
  </filter>
  <rect width="100%" height="100%" filter="url(#t)"/>
</svg>`;

const browser = await chromium.launch({ executablePath: CHROME });
const page = await browser.newPage({ viewport: { width: SIZE, height: SIZE } });

async function render(svg, width, height, file) {
  await page.setViewportSize({ width, height });
  await page.setContent(`<html><body style="margin:0;background:transparent">${svg}</body></html>`);
  await page.locator("svg").screenshot({ path: OUT + file, omitBackground: true });
  console.log("wrote", file);
}

for (const [i, seed] of [4, 21, 38, 55].entries()) await render(edgeSvg(seed), SIZE, SIZE, `edge-${i}.png`);
await render(streakSvg, TILE_W, TILE_H, "streaks.png");
await browser.close();
