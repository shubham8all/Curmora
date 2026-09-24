import type { Metadata } from "next";
import { boxableCookies } from "@/data/products";
import { BoxBuilder } from "@/components/BoxBuilder";
import { Container, Eyebrow } from "@/components/ui";

export const metadata: Metadata = {
  title: "Build a Box",
  description: "Mix and match any of our cookies in a box of 4, 6 or 12.",
};

export default function BuildABoxPage() {
  return (
    <Container className="py-12">
      <Eyebrow>Build a box</Eyebrow>
      <h1 className="mt-2 text-display">Your box, your rules.</h1>
      <p className="mt-4 max-w-xl text-lg">
        Mix any of our cookies. We bake every box fresh for your delivery day.
      </p>
      <div className="mt-8">
        <BoxBuilder cookies={boxableCookies()} />
      </div>
    </Container>
  );
}
