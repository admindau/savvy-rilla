import Link from "next/link";

export default function IndustriesPage() {
  return (
    <div className="page">
      <section className="hero hero--matrix">
        <div className="container">
          <p className="hero-kicker">Industries</p>
          <h1 className="hero-main-title">Built for institutions and real-world constraints.</h1>
          <p className="hero-text">
            We design systems for high-trust environments—where security, reliability, and clear reporting matter.
          </p>

          <div className="hero-actions">
            <Link href="/contact" className="btn btn-primary">Talk to us</Link>
            <Link href="/platforms" className="btn btn-ghost">Explore platforms</Link>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Primary sectors</h2>
            <p className="section-text">
              We translate institutional needs into secure, maintainable digital systems.
            </p>
          </div>

          <div className="cards-grid">
            <div className="card card--industry">
              <p className="card-tag">Finance</p>
              <h3 className="card-title">Financial institutions</h3>
              <p className="card-text">
                Ledgers, reporting engines, FX monitoring systems, dashboards, and controlled access layers.
              </p>
            </div>
            <div className="card card--industry">
              <p className="card-tag">Public sector</p>
              <h3 className="card-title">Government & agencies</h3>
              <p className="card-text">
                Digital reporting systems, internal tooling, secure platforms, structured data visibility.
              </p>
            </div>
            <div className="card card--industry">
              <p className="card-tag">Development</p>
              <h3 className="card-title">NGOs & partners</h3>
              <p className="card-text">
                Operational dashboards, secure data systems, monitoring tools, reporting workflows.
              </p>
            </div>
            <div className="card card--industry">
              <p className="card-tag">Enterprise</p>
              <h3 className="card-title">Enterprises & startups</h3>
              <p className="card-text">
                Product architecture, scalable infrastructure, internal systems, performance-first platforms.
              </p>
            </div>
          </div>

          <div style={{ marginTop: "1.25rem" }}>
            <Link href="/contact" className="btn btn-primary">Start an engagement</Link>
          </div>
        </div>
      </section>
    </div>
  );
}
