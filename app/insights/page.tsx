import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Insights",
  description:
    "Product notes and company updates from Savvy Rilla Technologies™.",
  alternates: { canonical: "/insights" },
};

export default function InsightsPage() {
  return (
    <main id="main-content">
      <section className="page-hero">
        <div className="shell">
          <p className="eyebrow">Insights</p>
          <h1>Notes from the work.</h1>
          <p className="page-hero-copy">
            Product releases, operating lessons, and ideas about building
            useful technology from South Sudan.
          </p>
        </div>
      </section>

      <section className="page-section page-section-soft">
        <div className="shell prose-grid">
          <div>
            <p className="eyebrow">Opening soon</p>
            <h2>The journal is taking shape.</h2>
          </div>
          <div className="prose-copy">
            <p>
              We are preparing the first set of product notes and field
              perspectives. Until then, the live portfolio is the clearest view
              of what the Savvy Rilla team is building.
            </p>
            <Link className="button button-light" href="/products">
              Explore the products <span aria-hidden="true">↗</span>
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
