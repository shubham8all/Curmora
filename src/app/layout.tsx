import type { Metadata, Viewport } from "next";
import { Montserrat } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { site } from "@/data/site";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import "./globals.css";

// design.md typeface: Montserrat for everything.
const montserrat = Montserrat({
  variable: "--font-montserrat",
  weight: ["300", "400", "500", "600"],
  style: ["normal", "italic"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: { default: `${site.name} · ${site.tagline}`, template: `%s · ${site.name}` },
  description: site.description,
};

export const viewport: Viewport = {
  themeColor: "#ce827b",
  viewportFit: "cover",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" data-scroll-behavior="smooth" className={`${montserrat.variable} h-full antialiased`}>
      <body className="min-h-full">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-50 focus:bg-ink focus:px-6 focus:py-3 focus:text-on-ink"
        >
          Skip to content
        </a>
        {/* Clips anything that spills past the screen edge (the menu row, the marquee) without breaking the sticky header. */}
        <div className="flex min-h-dvh flex-col overflow-x-clip">
          <Header />
          <main id="main" className="flex-1">
            {children}
          </main>
          <Footer />
        </div>
        <Analytics />
      </body>
    </html>
  );
}
