import Link from "next/link";

export default function EnterprisePage() {
  return (
    <div className="page">
      <section className="hero hero--matrix">
        <div className="container">
          <p className="hero-kicker">Enterprise</p>
          <h1 className="hero-main-title">Systems engineering for institutions.</h1>
          <p className="hero-text">
            We architect and deliver secure, scalable systems—APIs, databases, analytics dashboards, and internal platforms—
            built for long-term maintainability and operational resilience.
          </p>

          <div className="hero-actions">
            <Link href="/contact" className="btn btn-primary">Request consultation</Link>
            <Link href="/infrastructure" className="btn btn-ghost">Managed services</Link>
          </div>

          <div className="hero-strip">
            <span className="hero-strip-item">Architecture first</span>
            <span className="hero-strip-dot" aria-hidden="true" />
            <span className="hero-strip-item">Security by design</span>
            <span className="hero-strip-dot" aria-hidden="true" />
            <span className="hero-strip-item">Operational continuity</span>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Core capabilities</h2>
            <p className="section-text">
              We deliver end-to-end engineering—discovery through deployment—with a disciplined architecture approach.
            </p>
          </div>

          <div className="cards-grid">
            <div className="card">
              <p className="card-tag">Architecture</p>
              <h3 className="card-title">Discovery & system blueprints</h3>
              <p className="card-text">
                We map requirements, risks, data flows, roles, and infrastructure constraints—then deliver a clear architecture plan.
              </p>
            </div>

            <div className="card">
              <p className="card-tag">Engineering</p>
              <h3 className="card-title">Backend & data platforms</h3>
              <p className="card-text">
                Secure APIs, database design, analytics layers, and performance-first foundations.
              </p>
            </div>

            <div className="card">
              <p className="card-tag">Interfaces</p>
              <h3 className="card-title">Dashboards & workflows</h3>
              <p className="card-text">
                Modern, high-signal interfaces for reporting, operations, and decision-making.
              </p>
            </div>

            <div className="card">
              <p className="card-tag">Security</p>
              <h3 className="card-title">Access control & hardening</h3>
              <p className="card-text">
                Authentication flows, role-based access, policy-first data design, and production hardening.
              </p>
            </div>
          </div>

          <div className="twocol">
            <div>
              <h3 className="section-title">Engagement model</h3>
              <p className="section-text">
                We can deliver as a project, or as a long-term technology partner. For critical systems, we recommend
                a build + operate model aligned with SLAs.
              </p>
            </div>
            <div className="twocol-aside">
              <p style={{ marginTop: 0 }}>
                <strong>Option A:</strong> Architecture + build delivery
              </p>
              <p>
                <strong>Option B:</strong> Build + managed services (SLA)
              </p>
              <p>
                <strong>Option C:</strong> Advisory + technical governance
              </p>
            </div>
          </div>

          <div style={{ marginTop: "1.25rem" }}>
            <Link href="/contact" className="btn btn-primary">Start an enterprise engagement</Link>
          </div>
        </div>
      </section>
    </div>
  );
}
