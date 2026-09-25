// Product catalogue. Prices are in INR. All names, prices and descriptions are placeholder copy.

type Hue = "pink" | "beige" | "forest" | "sage" | "burgundy";
type Step = 50 | 100 | 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900 | 950;
export type PaletteColor = `${Hue}-${Step}`;

/** A brand-palette colour as a CSS value, for SVG fills. */
export const paint = (color: PaletteColor) => `var(--color-${color})`;

export type Tone = "pink" | "beige" | "forest" | "sage" | "burgundy";

export type Art =
  | {
      kind: "cookie";
      dough: PaletteColor;
      chip: PaletteColor;
      topping?: { type: "salt" | "nuts" | "drizzle" | "sprinkles"; color: PaletteColor };
    }
  | { kind: "cup"; layers: PaletteColor[]; cream: PaletteColor; topping: PaletteColor }
  | { kind: "cake"; glaze: PaletteColor; sponge: PaletteColor; decor: PaletteColor }
  | { kind: "macaron"; shells: PaletteColor[] }
  | { kind: "giftbox"; box: PaletteColor; ribbon: PaletteColor };

export type CategorySlug = "cookies" | "layer-cups" | "entremets" | "gifting";

export type Category = {
  slug: CategorySlug;
  name: string;
  blurb: string;
  tone: Tone;
  art: Art;
};

export type Variant = { id: string; label: string; price: number; count?: number };

export type Product = {
  slug: string;
  name: string;
  category: CategorySlug;
  tagline: string;
  description: string;
  variants: Variant[];
  /** Top-to-bottom layers for cups and cakes; components for everything else. */
  inside: { name: string; detail: string; color: PaletteColor }[];
  details: { label: string; value: string }[];
  eggless: boolean;
  bestseller?: boolean;
  tone: Tone;
  art: Art;
  /** Hidden products (e.g. the build-a-box container) don't appear in listings. */
  hidden?: boolean;
};

/** Tile backgrounds per tone. Literal class names so Tailwind picks them up. */
/**
 * Two-tone diagonal backdrops per tone (design.md product tiles). Every tone includes a pink half so
 * the menu reads as one styled shoot, and no half matches the cream page. Literal class names so
 * Tailwind picks them up.
 */
export const toneSplit: Record<Tone, string> = {
  pink: "[--split-a:var(--color-pink-100)] [--split-b:var(--color-pink-200)]",
  beige: "[--split-a:var(--color-pink-200)] [--split-b:var(--color-pink-100)]",
  forest: "[--split-a:var(--color-forest-100)] [--split-b:var(--color-pink-100)]",
  sage: "[--split-a:var(--color-sage-200)] [--split-b:var(--color-pink-100)]",
  burgundy: "[--split-a:var(--color-burgundy-200)] [--split-b:var(--color-pink-100)]",
};

export const categories: Category[] = [
  {
    slug: "cookies",
    name: "Cookies",
    blurb: "Thick, chewy, brown-butter cookies in boxes of four and six.",
    tone: "beige",
    art: { kind: "cookie", dough: "beige-300", chip: "beige-800", topping: { type: "salt", color: "beige-50" } },
  },
  {
    slug: "layer-cups",
    name: "Layer Cups",
    blurb: "Spoonable layers of sponge, cream and crunch.",
    tone: "pink",
    art: { kind: "cup", layers: ["beige-500", "beige-200", "pink-400", "pink-50"], cream: "pink-50", topping: "pink-500" },
  },
  {
    slug: "entremets",
    name: "Entremet Cakes",
    blurb: "French-style mousse cakes for birthdays and big days.",
    tone: "burgundy",
    art: { kind: "cake", glaze: "burgundy-700", sponge: "beige-200", decor: "pink-200" },
  },
  {
    slug: "gifting",
    name: "Macarons & Gifts",
    blurb: "Boxes that say it better than a card.",
    tone: "forest",
    art: { kind: "macaron", shells: ["pink-300", "forest-300", "beige-300"] },
  },
];

const cookieVariants: Variant[] = [
  { id: "box-4", label: "Box of 4", price: 760, count: 4 },
  { id: "box-6", label: "Box of 6", price: 1100, count: 6 },
];

const cookieDetails = [
  { label: "Weight", value: "About 110 g per cookie" },
  { label: "Keeps", value: "3 days in an airtight tin" },
  { label: "Best", value: "Warmed for 8 seconds in the microwave" },
];

const cupVariants: Variant[] = [
  { id: "single", label: "Single cup", price: 340, count: 1 },
  { id: "pack-4", label: "Pack of 4", price: 1280, count: 4 },
];

const cupDetails = [
  { label: "Size", value: "250 ml cup with a spoon" },
  { label: "Keeps", value: "2 days, refrigerated" },
  { label: "Serve", value: "Straight from the fridge" },
];

const cakeVariants: Variant[] = [
  { id: "half-kg", label: "½ kg, serves 4 to 6", price: 1650 },
  { id: "one-kg", label: "1 kg, serves 8 to 10", price: 2950 },
];

const cakeDetails = [
  { label: "Notice", value: "Order a day ahead" },
  { label: "Keeps", value: "3 days, refrigerated" },
  { label: "Serve", value: "Rest 20 minutes out of the fridge first" },
];

export const products: Product[] = [
  // Cookies
  {
    slug: "brown-butter-chocolate-chunk",
    name: "Brown Butter Chocolate Chunk",
    category: "cookies",
    tagline: "The one that started it all.",
    description:
      "Nutty brown butter, a crackled top and puddles of dark chocolate, finished with flaky sea salt. Crisp edges, soft middle.",
    variants: cookieVariants,
    inside: [
      { name: "Brown butter dough", detail: "Butter cooked until toasty and nutty", color: "beige-300" },
      { name: "Dark chocolate", detail: "Hand-chopped 54% chunks", color: "beige-800" },
      { name: "Sea salt", detail: "A pinch of flakes on top", color: "beige-50" },
    ],
    details: cookieDetails,
    eggless: false,
    bestseller: true,
    tone: "beige",
    art: { kind: "cookie", dough: "beige-300", chip: "beige-800", topping: { type: "salt", color: "beige-50" } },
  },
  {
    slug: "pistachio-rose",
    name: "Pistachio Rose",
    category: "cookies",
    tagline: "Nutty, floral, a little bit fancy.",
    description:
      "A pistachio dough folded with rose-scented white chocolate and roasted pistachios. Eggless, and nobody can tell.",
    variants: cookieVariants,
    inside: [
      { name: "Pistachio dough", detail: "Ground pistachios in every bite", color: "forest-200" },
      { name: "Rose white chocolate", detail: "Folded through in chunks", color: "pink-300" },
      { name: "Roasted pistachios", detail: "Scattered on top", color: "forest-500" },
    ],
    details: cookieDetails,
    eggless: true,
    tone: "forest",
    art: { kind: "cookie", dough: "forest-200", chip: "pink-300", topping: { type: "nuts", color: "forest-500" } },
  },
  {
    slug: "salted-caramel-pecan",
    name: "Salted Caramel Pecan",
    category: "cookies",
    tagline: "Buttery, toasty, drizzled.",
    description:
      "Brown sugar dough, toasted pecans and pockets of salted caramel, with more caramel drizzled on while it's warm.",
    variants: cookieVariants,
    inside: [
      { name: "Brown sugar dough", detail: "Deep, molasses-y sweetness", color: "beige-400" },
      { name: "Toasted pecans", detail: "Roasted in-house", color: "beige-600" },
      { name: "Salted caramel", detail: "Inside and drizzled over", color: "beige-200" },
    ],
    details: cookieDetails,
    eggless: false,
    tone: "beige",
    art: { kind: "cookie", dough: "beige-400", chip: "beige-600", topping: { type: "drizzle", color: "beige-200" } },
  },
  {
    slug: "double-dark-sea-salt",
    name: "Double Dark Sea Salt",
    category: "cookies",
    tagline: "For people who mean it about chocolate.",
    description:
      "A cocoa dough loaded with dark chocolate chunks, baked just underdone and finished with sea salt. Fudgy all the way through.",
    variants: cookieVariants,
    inside: [
      { name: "Cocoa dough", detail: "Dutch-process cocoa", color: "beige-800" },
      { name: "Dark chocolate", detail: "Two kinds, chopped", color: "beige-950" },
      { name: "Sea salt", detail: "Flakes on top", color: "beige-50" },
    ],
    details: cookieDetails,
    eggless: false,
    bestseller: true,
    tone: "sage",
    art: { kind: "cookie", dough: "beige-800", chip: "beige-950", topping: { type: "salt", color: "beige-50" } },
  },
  {
    slug: "matcha-white-chocolate",
    name: "Matcha White Chocolate",
    category: "cookies",
    tagline: "Grassy, creamy, quietly sweet.",
    description: "Ceremonial-grade matcha dough with creamy white chocolate. Earthy and not too sweet. Eggless.",
    variants: cookieVariants,
    inside: [
      { name: "Matcha dough", detail: "Whisked into the butter", color: "sage-300" },
      { name: "White chocolate", detail: "Big creamy chunks", color: "beige-50" },
    ],
    details: cookieDetails,
    eggless: true,
    tone: "sage",
    art: { kind: "cookie", dough: "sage-300", chip: "beige-50" },
  },
  {
    slug: "berry-cheesecake",
    name: "Berry Cheesecake",
    category: "cookies",
    tagline: "Cheesecake, but you can hold it.",
    description:
      "A soft vanilla dough with a cream-cheese centre, swirled with berry jam and finished with a white chocolate drizzle.",
    variants: cookieVariants,
    inside: [
      { name: "Vanilla dough", detail: "Soft-baked", color: "pink-200" },
      { name: "Berry jam", detail: "Swirled through", color: "burgundy-600" },
      { name: "Cream cheese centre", detail: "Tangy and molten", color: "pink-50" },
    ],
    details: cookieDetails,
    eggless: false,
    tone: "pink",
    art: { kind: "cookie", dough: "pink-200", chip: "burgundy-600", topping: { type: "drizzle", color: "pink-50" } },
  },

  // Layer cups
  {
    slug: "biscoff-crunch-cup",
    name: "Biscoff Crunch Cup",
    category: "layer-cups",
    tagline: "Caramelised biscuit, four ways.",
    description:
      "Crushed Biscoff, vanilla sponge, whipped Biscoff cream and a crunchy crumble on top. Our most-reordered cup.",
    variants: cupVariants,
    inside: [
      { name: "Crumble", detail: "Toasted biscuit on top", color: "beige-600" },
      { name: "Biscoff cream", detail: "Whipped until light", color: "beige-400" },
      { name: "Vanilla sponge", detail: "Soaked in milk", color: "beige-200" },
      { name: "Biscuit base", detail: "Crushed Biscoff and butter", color: "beige-500" },
    ],
    details: cupDetails,
    eggless: true,
    bestseller: true,
    tone: "beige",
    art: { kind: "cup", layers: ["beige-500", "beige-200", "beige-400", "beige-100"], cream: "beige-100", topping: "beige-600" },
  },
  {
    slug: "strawberry-shortcake-cup",
    name: "Strawberry Shortcake Cup",
    category: "layer-cups",
    tagline: "Summer in a cup.",
    description: "Vanilla sponge, fresh strawberry compote and clouds of vanilla chantilly, topped with more strawberries.",
    variants: cupVariants,
    inside: [
      { name: "Fresh strawberries", detail: "On top", color: "pink-400" },
      { name: "Vanilla chantilly", detail: "Softly whipped cream", color: "pink-50" },
      { name: "Strawberry compote", detail: "Cooked down with a little lemon", color: "pink-500" },
      { name: "Vanilla sponge", detail: "Light and buttery", color: "beige-200" },
    ],
    details: cupDetails,
    eggless: true,
    tone: "pink",
    art: { kind: "cup", layers: ["beige-200", "pink-500", "pink-50", "pink-300"], cream: "pink-50", topping: "pink-500" },
  },
  {
    slug: "tiramisu-cup",
    name: "Tiramisu Cup",
    category: "layer-cups",
    tagline: "Espresso-soaked and dusted.",
    description: "Ladyfingers soaked in strong espresso, mascarpone cream and a thick dusting of cocoa. The grown-up one.",
    variants: cupVariants,
    inside: [
      { name: "Cocoa", detail: "Dusted on top", color: "beige-800" },
      { name: "Espresso soak", detail: "A second layer", color: "beige-700" },
      { name: "Mascarpone cream", detail: "Rich and silky", color: "beige-50" },
      { name: "Espresso ladyfingers", detail: "Soaked, not soggy", color: "beige-600" },
    ],
    details: cupDetails,
    eggless: false,
    tone: "sage",
    art: { kind: "cup", layers: ["beige-600", "beige-50", "beige-700", "beige-50"], cream: "beige-50", topping: "beige-800" },
  },
  {
    slug: "pistachio-kunafa-cup",
    name: "Pistachio Kunafa Cup",
    category: "layer-cups",
    tagline: "Crunchy, creamy, very green.",
    description:
      "Toasted kunafa pastry, pistachio cream and a layer of dark chocolate, finished with crushed pistachios.",
    variants: cupVariants,
    inside: [
      { name: "Crushed pistachios", detail: "On top", color: "forest-500" },
      { name: "Dark chocolate", detail: "A thin snappy layer", color: "beige-800" },
      { name: "Pistachio cream", detail: "Made with real pistachio paste", color: "forest-300" },
      { name: "Toasted kunafa", detail: "Buttery and crisp", color: "beige-300" },
    ],
    details: cupDetails,
    eggless: true,
    bestseller: true,
    tone: "forest",
    art: { kind: "cup", layers: ["beige-300", "forest-300", "beige-800", "forest-200"], cream: "forest-100", topping: "forest-500" },
  },

  // Entremet cakes
  {
    slug: "dark-chocolate-salted-caramel",
    name: "Dark Chocolate & Salted Caramel",
    category: "entremets",
    tagline: "Glossy, dark, celebratory.",
    description:
      "Dark chocolate mousse over a salted caramel centre and a crisp feuilletine base, under a mirror glaze.",
    variants: cakeVariants,
    inside: [
      { name: "Mirror glaze", detail: "Dark chocolate", color: "beige-900" },
      { name: "Chocolate mousse", detail: "Light and airy", color: "beige-700" },
      { name: "Salted caramel", detail: "Soft-set centre", color: "beige-300" },
      { name: "Feuilletine crunch", detail: "Crisp base", color: "beige-500" },
    ],
    details: cakeDetails,
    eggless: false,
    bestseller: true,
    tone: "beige",
    art: { kind: "cake", glaze: "beige-900", sponge: "beige-500", decor: "beige-200" },
  },
  {
    slug: "vanilla-almond-raspberry",
    name: "Vanilla, Almond & Raspberry",
    category: "entremets",
    tagline: "Bright, light and a little tart.",
    description:
      "Vanilla bean mousse with a raspberry centre on almond dacquoise, topped with fresh raspberries.",
    variants: cakeVariants,
    inside: [
      { name: "White glaze", detail: "Vanilla bean", color: "beige-50" },
      { name: "Vanilla mousse", detail: "Real vanilla pods", color: "beige-100" },
      { name: "Raspberry centre", detail: "Tart and bright", color: "pink-500" },
      { name: "Almond dacquoise", detail: "Nutty base", color: "beige-300" },
    ],
    details: cakeDetails,
    eggless: false,
    tone: "pink",
    art: { kind: "cake", glaze: "beige-50", sponge: "beige-300", decor: "pink-500" },
  },
  {
    slug: "rose-lychee-raspberry",
    name: "Rose, Lychee & Raspberry",
    category: "entremets",
    tagline: "Floral, fruity, made for a toast.",
    description:
      "Rose mousse with lychee and raspberry, on a soft vanilla sponge under a pink glaze. Eggless.",
    variants: cakeVariants,
    inside: [
      { name: "Pink glaze", detail: "Rose-scented", color: "pink-300" },
      { name: "Rose mousse", detail: "Delicately floral", color: "pink-100" },
      { name: "Lychee & raspberry", detail: "Fruit centre", color: "burgundy-500" },
      { name: "Vanilla sponge", detail: "Soft base", color: "beige-200" },
    ],
    details: cakeDetails,
    eggless: true,
    tone: "burgundy",
    art: { kind: "cake", glaze: "pink-300", sponge: "beige-200", decor: "burgundy-700" },
  },

  // Macarons & gifts
  {
    slug: "macaron-box",
    name: "Macaron Box",
    category: "gifting",
    tagline: "A little box of colour.",
    description:
      "Our house assortment of French macarons: pistachio, rose, salted caramel, vanilla and dark chocolate. Crisp shells, soft centres.",
    variants: [
      { id: "box-6", label: "Box of 6", price: 780, count: 6 },
      { id: "box-12", label: "Box of 12", price: 1450, count: 12 },
    ],
    inside: [
      { name: "Pistachio", detail: "Pistachio ganache", color: "forest-300" },
      { name: "Rose", detail: "Rose buttercream", color: "pink-300" },
      { name: "Salted caramel", detail: "Caramel centre", color: "beige-300" },
      { name: "Vanilla", detail: "Vanilla bean ganache", color: "beige-50" },
      { name: "Dark chocolate", detail: "Dark ganache", color: "beige-800" },
    ],
    details: [
      { label: "Keeps", value: "5 days, refrigerated" },
      { label: "Serve", value: "15 minutes out of the fridge" },
      { label: "Gift note", value: "Add one at checkout" },
    ],
    eggless: false,
    tone: "forest",
    art: { kind: "macaron", shells: ["pink-300", "forest-300", "beige-300"] },
  },
  {
    slug: "celebration-box",
    name: "The Celebration Box",
    category: "gifting",
    tagline: "A bit of everything, beautifully boxed.",
    description:
      "Four cookies, two layer cups and six macarons in our signature gift box, tied with ribbon and a handwritten note.",
    variants: [{ id: "standard", label: "One box", price: 2400 }],
    inside: [
      { name: "4 cookies", detail: "Our bestsellers", color: "beige-300" },
      { name: "2 layer cups", detail: "Biscoff and strawberry", color: "pink-300" },
      { name: "6 macarons", detail: "House assortment", color: "forest-300" },
      { name: "Handwritten note", detail: "Your message, our handwriting", color: "beige-50" },
    ],
    details: [
      { label: "Keeps", value: "2 days, refrigerated" },
      { label: "Notice", value: "Order a day ahead" },
      { label: "Gift note", value: "Add one at checkout" },
    ],
    eggless: false,
    bestseller: true,
    tone: "burgundy",
    art: { kind: "giftbox", box: "burgundy-700", ribbon: "pink-200" },
  },

  // Build-a-box container (not listed; configured on /build-a-box)
  {
    slug: "build-a-box",
    name: "Build-Your-Own Cookie Box",
    category: "cookies",
    tagline: "Your flavours, your box.",
    description: "Mix and match any of our cookies.",
    variants: [
      { id: "box-4", label: "Box of 4", price: 760, count: 4 },
      { id: "box-6", label: "Box of 6", price: 1100, count: 6 },
      { id: "box-12", label: "Box of 12", price: 2100, count: 12 },
    ],
    inside: [],
    details: [],
    eggless: false,
    tone: "beige",
    art: { kind: "giftbox", box: "beige-300", ribbon: "pink-400" },
    hidden: true,
  },
];

export const BUILD_A_BOX_SLUG = "build-a-box";

export function getProduct(slug: string) {
  return products.find((p) => p.slug === slug);
}

export function getCategory(slug: string) {
  return categories.find((c) => c.slug === slug);
}

export function listProducts(category?: CategorySlug) {
  return products.filter((p) => !p.hidden && (!category || p.category === category));
}

export function bestsellers() {
  return products.filter((p) => p.bestseller && !p.hidden);
}

export function boxableCookies() {
  return listProducts("cookies");
}

export function fromPrice(product: Product) {
  return Math.min(...product.variants.map((v) => v.price));
}
