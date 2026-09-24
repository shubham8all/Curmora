import Link from "next/link";
import { Container, Eyebrow, buttonClass } from "@/components/ui";

export default function NotFound() {
  return (
    <Container className="py-20">
      <Eyebrow>404</Eyebrow>
      <h1 className="mt-2 text-display">This page crumbled.</h1>
      <p className="mt-4 max-w-md text-lg">We couldn&apos;t find what you were looking for. The menu is still here, though.</p>
      <Link href="/shop" className={buttonClass("primary", "mt-8")}>
        Back to the shop
      </Link>
    </Container>
  );
}
