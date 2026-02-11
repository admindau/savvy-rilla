// app/status/page.tsx
import Link from "next/link";

export const metadata = {
  title: "Status · Savvy Rilla Technologies",
  description: "Operational status for Savvy Rilla platforms and services.",
};

export default function StatusPage() {
  return (
    <div className="page">
      <section className="section section--dense">
        <div className="container">
          <div className="section-header">
            <h1 className="hero-main-title" style={{ fontSize: "2rem", marginBottom: "0.35rem" }}>
              System Status
            </h1>
            <p className="section-text">
              Live operational visibility for Savvy Rilla platforms. This page is a clean placeholder
              — we’ll wire it to real monitoring when needed.
            </p>
          </div>

          <div className="cards-grid">
            <div className="card">
              <p className="card-tag">Overall</p>
              <h3 className="card-title">All systems operational</h3>
              <p className="card-text">
                No active incidents. Uptime target maintained across monitored services.
              </p>
              <p className="card-meta">Incidents (30d): 0 • Target uptime: 99.9%</p>
            </div>

            <div className="card">
              <p className="card-tag">Platforms</p>
              <h3 className="card-title">Gorilla Ledger™</h3>
              <p className="card-text">Operational • Scheduled maintenance: None</p>
              <p className="card-meta">Latency target: &lt;200ms • Access: Secure</p>
            </div>

            <div className="card">
              <p className="card-tag">Platforms</p>
              <h3 className="card-title">FX Intelligence Engine</h3>
              <p className="card-text">Operational • Data ingest: Normal</p>
              <p className="card-meta">Time-series pipeline: Healthy</p>
            </div>
          </div>

          <div style={{ marginTop: "1rem" }}>
            <Link href="/contact" className="btn btn-primary">
              Report an issue
            </Link>{" "}
            <Link href="/" className="btn btn-ghost" style={{ marginLeft: "0.6rem" }}>
              Back to home
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
