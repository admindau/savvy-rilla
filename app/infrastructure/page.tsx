import Link from "next/link";

export default function InfrastructurePage() {
  return (
    <div className="page">
      <section className="hero hero--matrix">
        <div className="container">
          <p className="hero-kicker">Infrastructure</p>
          <h1 className="hero-main-title">Managed services & operational reliability.</h1>
          <p className="hero-text">
            Technology provision doesn’t end at deployment. We provide hosting, monitoring, security hardening,
            release management, and long-term support aligned with institutional needs.
          </p>

          <div className="hero-actions">
            <Link href="/contact" className="btn btn-primary">Discuss managed services</Link>
            <Link href="/enterprise" className="btn btn-ghost">Enterprise engineering</Link>
          </div>

          <div className="hero-strip">
            <span className="hero-strip-item">Monitoring</span>
            <span className="hero-strip-dot" aria-hidden="true" />
            <span className="hero-strip-item">Release control</span>
            <span className="hero-strip-dot" aria-hidden="true" />
            <span className="hero-strip-item">SLA options</span>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">What we operate</h2>
            <p className="section-text">
              We help organisations run systems like infrastructure—stable, secured, monitored, and continuously improved.
            </p>
          </div>

          <div className="cards-grid">
            <div className="card">
              <p className="card-tag">Reliability</p>
              <h3 className="card-title">Uptime & monitoring</h3>
              <p className="card-text">
                Alerts, performance metrics, incident response routines, and reliability practices aligned to your criticality level.
              </p>
            </div>
            <div className="card">
              <p className="card-tag">Security</p>
              <h3 className="card-title">Hardening & access controls</h3>
              <p className="card-text">
                Authentication checks, policy enforcement, secure configuration, and patch hygiene.
              </p>
            </div>
            <div className="card">
              <p className="card-tag">Delivery</p>
              <h3 className="card-title">CI/CD & release management</h3>
              <p className="card-text">
                Controlled deployment cycles, testing gates, and version lifecycle management.
              </p>
            </div>
          </div>

          <div className="twocol">
            <div>
              <h3 className="section-title">SLA tiers (example)</h3>
              <p className="section-text">
                We can offer support tiers based on uptime requirements, response time expectations, and change frequency.
              </p>
            </div>
            <div className="twocol-aside">
              <p style={{ marginTop: 0 }}><strong>Tier 1:</strong> Standard monitoring + monthly updates</p>
              <p><strong>Tier 2:</strong> Priority monitoring + controlled releases</p>
              <p><strong>Tier 3:</strong> Critical system coverage + incident response</p>
            </div>
          </div>

          <div style={{ marginTop: "1.25rem" }}>
            <Link href="/contact" className="btn btn-primary">Request an operations plan</Link>
          </div>
        </div>
      </section>
    </div>
  );
}
