// Store-wide copy and business rules. Everything here is placeholder copy: edit it to match the real business.
export const site = {
  name: "Curmora",
  tagline: "Layered, baked & boxed by hand",
  description:
    "Small-batch cookies, layer cups and French-style entremet cakes, baked fresh every morning and delivered to your door.",
  announcement: "Baked fresh every morning · Order by 6 pm for next-day delivery",
  delivery: {
    fee: 99,
    freeAbove: 1500,
    cutoff: "6 pm",
  },
  pickup: {
    label: "Pick up from the Curmora kitchen",
    note: "We'll send the pickup address and a map pin with your order confirmation.",
  },
  timeSlots: ["10 am to 1 pm", "1 pm to 4 pm", "4 pm to 7 pm", "7 pm to 9 pm"],
};

export const nav = [
  { href: "/shop", label: "Shop" },
  { href: "/build-a-box", label: "Build a Box" },
  { href: "/shop?category=gifting", label: "Gifting" },
  { href: "/#story", label: "Our Story" },
];
