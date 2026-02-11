import Link from "next/link";

export default function FXIntelligencePlatformPage() {
  return (
    <div className="page">
      <section className="hero hero--matrix">
        <div className="container">
          <p className="hero-kicker">Platform · Market Intelligence</p>
          <h1 className="hero-main-title">FX Intelligence Engine</h1>
          <p className="hero-text">
            Multi-currency monitoring and analytics delivering clean visualisation, trend insights, and institutional-grade reporting.
          </p>

          <div className="hero-actions">
            <Link href="/contact" className="btn btn-primary">Request a demo</Link>
            <Link href="/platforms" className="btn btn-ghost">Back to platforms</Link>
          </div>

          <div className="hero-strip">
            <span className="hero-strip-item">Time-series analytics</span>
            <span className="hero-strip-dot" aria-hidden="true" />
            <span className="hero-strip-item">Command-center dashboards</span>
            <span className="hero-strip-dot" aria-hidden="true" />
            <span className="hero-strip-item">Institutional reporting</span>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">What it enables</h2>
            <p className="section-text">
              Designed for teams that need trustworthy FX monitoring, visibility, and consistent reporting workflows.
            </p>
          </div>

          <div className="cards-grid">
            <div className="card">
              <p className="card-tag">Monitoring</p>
              <h3 className="card-title">Market visibility</h3>
              <p className="card-text">
                Track rates over time, compare trends, and understand movement with clean visual outputs.
              </p>
            </div>
            <div className="card">
              <p className="card-tag">Analysis</p>
              <h3 className="card-title">Trend insight</h3>
              <p className="card-text">
                Spot patterns using time windows and multi-currency comparisons designed for clarity.
              </p>
            </div>
            <div className="card">
              <p className="card-tag">Reporting</p>
              <h3 className="card-title">Institutional outputs</h3>
              <p className="card-text">
                Reporting flows that support internal briefings and operational decision-making.
              </p>
            </div>
          </div>

          <div style={{ marginTop: "1.25rem" }}>
            <Link href="/contact" className="btn btn-primary">Discuss the FX Engine</Link>
          </div>
        </div>
      </section>
    </div>
  );
}
