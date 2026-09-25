import type { Metadata } from "next";
import { BagView } from "@/components/BagView";
import { Container, Eyebrow } from "@/components/ui";

export const metadata: Metadata = { title: "Your bag" };

export default function BagPage() {
  return (
    <Container className="py-12">
      <Eyebrow>Your bag</Eyebrow>
      <h1 className="mt-2 text-hero">Almost yours.</h1>
      <BagView />
    </Container>
  );
}
