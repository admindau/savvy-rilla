import Link from "next/link";

export default function PlatformsPage() {
  return (
    <div className="page">
      <section className="hero hero--matrix">
        <div className="container">
          <p className="hero-kicker">Platforms</p>
          <h1 className="hero-main-title">Technology platforms we build and operate.</h1>
          <p className="hero-text">
            Savvy Rilla builds secure, scalable platforms engineered for performance, clarity, and long-term
            operational reliability across African institutions.
          </p>

          <div className="hero-actions">
            <Link href="/contact" className="btn btn-primary">Request a demo</Link>
            <Link href="/enterprise" className="btn btn-ghost">Enterprise engineering</Link>
          </div>

          <div className="hero-strip">
            <span className="hero-strip-item">Cloud-ready</span>
            <span className="hero-strip-dot" aria-hidden="true" />
            <span className="hero-strip-item">Policy-first data design</span>
            <span className="hero-strip-dot" aria-hidden="true" />
            <span className="hero-strip-item">Operational support available</span>
          </div>
        </div>
      </section>

      <section className="section section--dense">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Featured platforms</h2>
            <p className="section-text">
              Owned systems designed as durable infrastructure—usable today and extensible tomorrow.
            </p>
          </div>

          <div className="cards-grid cards-grid--platforms">
            <div className="card card--platform">
              <p className="card-tag">Platform · Finance</p>
              <h3 className="card-title">Gorilla Ledger™</h3>
              <p className="card-text">
                Enterprise-grade financial tracking infrastructure for secure transaction management, structured
                reporting, and scalable analytics.
              </p>
              <p className="card-meta">Deployment: Cloud • Security: Policy-first • Roadmap: Multi-tenant</p>
              <div className="card-actions">
                <Link className="btn btn-ghost btn-sm" href="/platforms/gorilla-ledger">Open platform page</Link>
              </div>
            </div>

            <div className="card card--platform">
              <p className="card-tag">Platform · Market Intelligence</p>
              <h3 className="card-title">FX Intelligence Engine</h3>
              <p className="card-text">
                Multi-currency monitoring and analytics for institutions—clean visualisation, trend insights,
                and reporting workflows.
              </p>
              <p className="card-meta">Data: Time-series • UX: Command-center dashboards • Reporting: Institutional</p>
              <div className="card-actions">
                <Link className="btn btn-ghost btn-sm" href="/platforms/fx-intelligence">Open platform page</Link>
              </div>
            </div>

            <div className="card card--platform">
              <p className="card-tag">Platform · Systems</p>
              <h3 className="card-title">Enterprise Systems</h3>
              <p className="card-text">
                Custom platform builds for internal operations, secure data hubs, reporting dashboards, and
                institutional tooling.
              </p>
              <p className="card-meta">Model: Build + Operate • Support: SLA options • Security: Access controls</p>
              <div className="card-actions">
                <Link className="btn btn-ghost btn-sm" href="/enterprise">Explore enterprise engineering</Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section section--subtle">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Deployment models</h2>
            <p className="section-text">
              We align deployments to institutional constraints—connectivity, compliance, scaling needs, and support.
            </p>
          </div>

          <div className="cards-grid">
            <div className="card">
              <p className="card-tag">Cloud</p>
              <h3 className="card-title">Fast, scalable, cost-effective</h3>
              <p className="card-text">
                Best for teams that need rapid rollout, elastic scale, and managed reliability with strong access controls.
              </p>
            </div>
            <div className="card">
              <p className="card-tag">Hybrid</p>
              <h3 className="card-title">Controlled data + modern UX</h3>
              <p className="card-text">
                Keep sensitive datasets in controlled environments while delivering modern dashboards and workflows.
              </p>
            </div>
            <div className="card">
              <p className="card-tag">Institutional</p>
              <h3 className="card-title">Governed operations</h3>
              <p className="card-text">
                Designed for governance, audit readiness, and long-term operational continuity.
              </p>
            </div>
          </div>

          <div style={{ marginTop: "1rem" }}>
            <Link href="/contact" className="btn btn-primary">Talk to us about deployment</Link>
          </div>
        </div>
      </section>
    </div>
  );
}
