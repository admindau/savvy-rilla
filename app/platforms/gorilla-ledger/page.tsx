import Link from "next/link";

export default function GorillaLedgerPlatformPage() {
  return (
    <div className="page">
      <section className="hero hero--matrix">
        <div className="container">
          <p className="hero-kicker">Platform · Finance</p>
          <h1 className="hero-main-title">Gorilla Ledger™</h1>
          <p className="hero-text">
            Enterprise-grade financial tracking infrastructure engineered for secure transaction management,
            structured reporting, and scalable analytics.
          </p>

          <div className="hero-actions">
            <Link href="/contact" className="btn btn-primary">Request a demo</Link>
            <Link href="/platforms" className="btn btn-ghost">Back to platforms</Link>
          </div>

          <div className="hero-strip">
            <span className="hero-strip-item">Policy-first</span>
            <span className="hero-strip-dot" aria-hidden="true" />
            <span className="hero-strip-item">Audit-friendly</span>
            <span className="hero-strip-dot" aria-hidden="true" />
            <span className="hero-strip-item">Built for clarity</span>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">What it enables</h2>
            <p className="section-text">
              Gorilla Ledger is designed for organisations that need consistent financial visibility, controlled access,
              and reporting that matches operational reality.
            </p>
          </div>

          <div className="cards-grid">
            <div className="card">
              <p className="card-tag">Controls</p>
              <h3 className="card-title">Secure access & visibility</h3>
              <p className="card-text">
                Role-based access and policy-first data boundaries so teams only see what they are authorised to see.
              </p>
            </div>
            <div className="card">
              <p className="card-tag">Reporting</p>
              <h3 className="card-title">Structured outputs</h3>
              <p className="card-text">
                Clean reporting flows that support operational decision-making and accountability.
              </p>
            </div>
            <div className="card">
              <p className="card-tag">Analytics</p>
              <h3 className="card-title">Trend insight</h3>
              <p className="card-text">
                Time-based and category-based analytics to understand spending, inflows, and risk patterns over time.
              </p>
            </div>
          </div>

          <div className="twocol">
            <div>
              <h3 className="section-title">Architecture approach</h3>
              <p className="section-text">
                Designed as a modular platform: clear boundaries, secure data layer, and extensible rules for
                recurring automation and analytics.
              </p>
            </div>
            <div className="twocol-aside">
              <p style={{ marginTop: 0 }}>
                <strong>Typical deployment:</strong> Cloud or hybrid
              </p>
              <p>
                <strong>Security:</strong> Policy-first access, audit-ready design
              </p>
              <p>
                <strong>Support:</strong> Optional managed services & SLA tiers
              </p>
            </div>
          </div>

          <div style={{ marginTop: "1.25rem" }}>
            <Link href="/contact" className="btn btn-primary">Discuss Gorilla Ledger for your institution</Link>
          </div>
        </div>
      </section>
    </div>
  );
}
