import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Insights",
  description:
    "Product notes and company updates from Savvy Rilla Technologies™.",
  alternates: { canonical: "/insights" },
};

export default function InsightsPage() {
  const notes = [
    {
      number: "01",
      title: "Build close to the problem",
      text: "The strongest product decisions come from understanding how people already work—their constraints, workarounds, language, and measures of trust.",
    },
    {
      number: "02",
      title: "Trust belongs in the architecture",
      text: "Privacy, provenance, permissions, and clear records are product foundations. They should shape the system before they appear in the interface.",
    },
    {
      number: "03",
      title: "Operate what you ship",
      text: "A launch creates responsibility. Monitoring, support, maintenance, and steady iteration are part of the product—not work that begins after it.",
    },
  ];

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
        <div className="shell">
          <div className="section-heading split-heading">
            <div>
              <p className="eyebrow">Operating principles</p>
              <h2>What the work keeps teaching us.</h2>
            </div>
            <p>
              These principles guide how we choose problems, design systems,
              and stay accountable after launch.
            </p>
          </div>
          <div className="detail-list">
            {notes.map((note) => (
              <article key={note.number}>
                <span>{note.number}</span>
                <h3>{note.title}</h3>
                <p>{note.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="page-section">
        <div className="shell prose-grid">
          <div>
            <p className="eyebrow">Proof in practice</p>
            <h2>Five products. One evolving point of view.</h2>
          </div>
          <div className="prose-copy">
            <p>
              The Savvy Rilla portfolio is where these ideas are tested:
              commerce built around trust, clearer financial records, useful
              market data, verifiable livestock identity, and family history
              preserved with care.
            </p>
            <div className="page-hero-actions">
              <Link className="button button-light" href="/products">
                Explore the products <span aria-hidden="true">↗</span>
              </Link>
              <Link className="text-link" href="/contact">
                Start a conversation <span aria-hidden="true">→</span>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
