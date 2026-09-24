import type { Metadata } from "next";
import { CheckoutForm } from "@/components/CheckoutForm";
import { Container, Eyebrow } from "@/components/ui";

export const metadata: Metadata = { title: "Checkout" };

export default function CheckoutPage() {
  return (
    <Container className="py-12">
      <Eyebrow>Checkout</Eyebrow>
      <h1 className="mt-2 text-display">Nearly there.</h1>
      <CheckoutForm />
    </Container>
  );
}
