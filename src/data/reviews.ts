// Customer reviews shown on the home page. Add only real reviews, with the customer's permission.
// The section stays hidden while this list is empty.
export type Review = {
  quote: string;
  name: string;
  /** What they ordered, e.g. "Pistachio Kunafa Cup, pack of 4". */
  ordered: string;
  rating: 1 | 2 | 3 | 4 | 5;
};

export const reviews: Review[] = [];
