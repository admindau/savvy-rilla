import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Company",
  description:
    "Savvy Rilla Technologies™ is a product company building practical technology from Juba, South Sudan.",
  alternates: { canonical: "/company" },
};

export default function CompanyPage() {
  return (
    <main id="main-content">
      <section className="page-hero">
        <div className="shell">
          <p className="eyebrow">The company</p>
          <h1>Built here. Ready for everywhere.</h1>
          <p className="page-hero-copy">
            Savvy Rilla Technologies™ is a product company based in Juba, South
            Sudan. We create technology for important systems and stay close to
            the work after launch.
          </p>
        </div>
      </section>

      <section className="page-section">
        <div className="shell prose-grid">
          <div>
            <p className="eyebrow">Why Savvy Rilla</p>
            <h2>Proximity creates better products.</h2>
          </div>
          <div className="prose-copy">
            <p>
              Many of the systems that shape everyday life across emerging
              markets are still waiting for technology designed around their
              real conditions. That is the space where we work.
            </p>
            <p>
              We start close to the problem: how people buy and sell, understand
              their money, read markets, prove ownership, and preserve family
              history. Then we build with the care and technical discipline
              required to serve far beyond one place.
            </p>
            <p>
              <strong>
                Our ambition is simple: build consequential African technology
                companies and products from South Sudan.
              </strong>
            </p>
          </div>
        </div>
      </section>

      <section className="page-section page-section-soft">
        <div className="shell detail-list">
          <article>
            <span>01</span>
            <h3>Useful before impressive</h3>
            <p>
              A product earns its place by solving a clear problem well. Every
              other decision follows from that.
            </p>
          </article>
          <article>
            <span>02</span>
            <h3>Trust is a feature</h3>
            <p>
              Clarity, privacy, provenance, and dependable operation are central
              product qualities—not finishing touches.
            </p>
          </article>
          <article>
            <span>03</span>
            <h3>Stay for the long term</h3>
            <p>
              We build, operate, learn, and improve. Launch is a milestone, not
              the end of the relationship.
            </p>
          </article>
        </div>
      </section>

      <section className="page-section">
        <div className="shell prose-grid">
          <div>
            <p className="eyebrow">From Juba</p>
            <h2>A different starting point.</h2>
          </div>
          <div className="prose-copy">
            <p>
              Being based in Juba is not a footnote. It shapes how we see
              opportunity, how seriously we take resilience, and how we design
              around real people rather than abstract users.
            </p>
            <Link className="button button-light" href="/contact">
              Work with us <span aria-hidden="true">↗</span>
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
