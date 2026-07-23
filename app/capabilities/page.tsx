import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Capabilities",
  description:
    "Product engineering, data systems, trust infrastructure, and long-term product operations from Savvy Rilla Technologies™.",
  alternates: { canonical: "/capabilities" },
};

const capabilities = [
  {
    number: "01",
    title: "Product strategy",
    text: "Turn a meaningful problem into a focused product direction, a credible first release, and a roadmap grounded in use.",
  },
  {
    number: "02",
    title: "Software engineering",
    text: "Responsive web products, secure application architecture, APIs, dashboards, and the foundations needed to scale.",
  },
  {
    number: "03",
    title: "Data and intelligence",
    text: "Structured data, reporting, historical analysis, visualisation, and interfaces that make information useful.",
  },
  {
    number: "04",
    title: "Identity and trust",
    text: "Verification, provenance, permissions, and traceability for products where confidence is part of the value.",
  },
  {
    number: "05",
    title: "Product operations",
    text: "Deployment, monitoring, support, and steady improvement after a product enters the real world.",
  },
  {
    number: "06",
    title: "Applied local insight",
    text: "Product decisions informed by connectivity, currencies, institutions, behaviours, and realities on the ground.",
  },
];

export default function CapabilitiesPage() {
  return (
    <main id="main-content">
      <section className="page-hero">
        <div className="shell">
          <p className="eyebrow">Capabilities</p>
          <h1>Ideas are only the beginning.</h1>
          <p className="page-hero-copy">
            We combine product judgement, engineering, and operations to turn
            ambitious ideas into systems people can actually depend on.
          </p>
          <div className="page-hero-actions">
            <Link className="button button-light" href="/contact">
              Start a conversation <span aria-hidden="true">↗</span>
            </Link>
            <Link className="text-link" href="/products">
              See what we operate <span aria-hidden="true">→</span>
            </Link>
          </div>
        </div>
      </section>

      <section className="page-section page-section-soft">
        <div className="shell detail-list">
          {capabilities.map((capability) => (
            <article key={capability.number}>
              <span>{capability.number}</span>
              <h3>{capability.title}</h3>
              <p>{capability.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="page-section">
        <div className="shell prose-grid">
          <div>
            <p className="eyebrow">The model</p>
            <h2>Build and operate.</h2>
          </div>
          <div className="prose-copy">
            <p>
              We do not separate product ambition from operational reality.
              Architecture, security, support, and long-term ownership influence
              the work from day one.
            </p>
            <p>
              That approach is visible across the Savvy Rilla portfolio: each
              product has its own purpose and audience, backed by one team
              responsible for making it better.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
