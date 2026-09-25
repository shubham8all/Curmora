import type { Metadata } from "next";
import { OrderConfirmation } from "@/components/OrderConfirmation";
import { Container, Eyebrow } from "@/components/ui";

export const metadata: Metadata = { title: "Order placed" };

export default function OrderConfirmedPage() {
  return (
    <Container className="py-12">
      <Eyebrow>Order placed</Eyebrow>
      <h1 className="mt-2 text-hero">It&apos;s in the oven.</h1>
      <OrderConfirmation />
    </Container>
  );
}
