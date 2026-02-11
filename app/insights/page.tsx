import Link from "next/link";

const posts = [
  {
    title: "Engineering Digital Infrastructure for Emerging Markets",
    excerpt:
      "Why architecture, security, and operational resilience matter more than flashy features in real-world deployments.",
    href: "/insights/infrastructure-emerging-markets",
  },
  {
    title: "Security by Architecture: Policy-First Data Design",
    excerpt:
      "How to build systems where access control lives in the data layer—not just the UI.",
    href: "/insights/security-by-architecture",
  },
  {
    title: "Building for Variable Connectivity",
    excerpt:
      "Performance, caching, and UX strategies for environments with unstable bandwidth and latency.",
    href: "/insights/variable-connectivity",
  },
];

export default function InsightsPage() {
  return (
    <div className="page">
      <section className="hero hero--matrix">
        <div className="container">
          <p className="hero-kicker">Insights</p>
          <h1 className="hero-main-title">Systems thinking, documented.</h1>
          <p className="hero-text">
            Architecture notes, engineering perspectives, and operational lessons from building technology in African contexts.
          </p>

          <div className="hero-actions">
            <Link href="/contact" className="btn btn-primary">Discuss a system</Link>
            <Link href="/platforms" className="btn btn-ghost">Explore platforms</Link>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Latest</h2>
            <p className="section-text">
              Short, high-signal writing for teams that build and operate serious systems.
            </p>
          </div>

          <div className="cards-grid">
            {posts.map((p) => (
              <div key={p.href} className="card">
                <p className="card-tag">Article</p>
                <h3 className="card-title">{p.title}</h3>
                <p className="card-text">{p.excerpt}</p>
                <div className="card-actions">
                  <Link href={p.href} className="btn btn-ghost btn-sm">
                    Read
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
