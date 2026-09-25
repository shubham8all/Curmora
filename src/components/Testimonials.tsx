import { Star, User } from "@phosphor-icons/react/dist/ssr";
import { reviews } from "@/data/reviews";
import { Reveal } from "@/components/Reveal";
import { Container } from "@/components/ui";

/** Staggered review cards on a blush band. Renders nothing until real reviews are added. */
export function Testimonials() {
  if (reviews.length === 0) return null;

  return (
    <section aria-label="What customers say" className="bg-blush py-16 md:py-24">
      <Container className="space-y-6">
        {reviews.slice(0, 3).map((r, i) => (
          <Reveal key={r.name + i} delay={i * 0.06} className={`max-w-3xl bg-surface p-6 md:p-8 ${i % 2 ? "md:ml-[8%]" : "md:ml-auto"}`}>
            <p className="flex gap-1 text-rose" aria-label={`${r.rating} out of 5 stars`}>
              {Array.from({ length: 5 }, (_, s) => (
                <Star key={s} aria-hidden weight={s < r.rating ? "fill" : "regular"} className="size-4" />
              ))}
            </p>
            <blockquote className="mt-4 text-lg font-light italic">“{r.quote}”</blockquote>
            <p className="mt-5 flex items-center gap-3 text-sm">
              <span className="grid size-10 place-items-center bg-blush">
                <User aria-hidden className="size-5" />
              </span>
              <span>
                <span className="block font-medium">{r.name}</span>
                <span className="block text-text-muted">Ordered {r.ordered}</span>
              </span>
            </p>
          </Reveal>
        ))}
      </Container>
    </section>
  );
}
