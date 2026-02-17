import Link from "next/link";

import Hero3DLoader from "@/components/hero-3d-loader";
import Parallax from "@/components/parallax";
import Reveal from "@/components/reveal";

export default function HomePage() {
  return (
    <main>
      {/* HERO — enterprise-first: message dominates, visuals atmospheric */}
      <section className="hero hero--matrix">
        <div className="hero-bg" aria-hidden="true">
          <Hero3DLoader className="hero-visual" svgUrl="/srt-logo.svg" />
          <div className="hero-vignette" aria-hidden="true" />
        </div>

        <div className="container">
          <div className="hero-grid">
            <div className="hero-left">
              <Reveal className="hero-kicker" delay={0.02}>
                SAVVY RILLA TECHNOLOGIES
              </Reveal>

              <Reveal as="h1" className="hero-main-title hero-main-title--provider" delay={0.05}>
                SECURE
                <br />
                ENTERPRISE
                <br />
                SOFTWARE
                <br />
                FOR SOUTH SUDAN.
              </Reveal>

              <Reveal className="hero-text" delay={0.08}>
                We design, build, and operate institutional-grade systems for organisations in South Sudan — engineered
                for stability, security, and real operational constraints.
              </Reveal>

              <Reveal className="hero-actions" delay={0.12}>
                <Link className="btn btn-primary" href="/platforms" data-cursor-magnet>
                  Explore platforms
                </Link>
                <Link className="btn btn-ghost" href="/contact" data-cursor-magnet>
                  Request consultation
                </Link>
              </Reveal>

              <Reveal className="hero-strip" delay={0.14}>
                <span className="hero-strip-item">Operational since 2023</span>
                <span className="hero-strip-dot" aria-hidden="true" />
                <span className="hero-strip-item">Built &amp; deployed in South Sudan</span>
                <span className="hero-strip-dot" aria-hidden="true" />
                <span className="hero-strip-item">Security-first architecture</span>
              </Reveal>
            </div>

            <div className="hero-right">
              <Reveal className="hero-panel" delay={0.1}>
                <div className="hero-panel-head">
                  <div className="hero-panel-brand">
                    <div>
                      <p className="hero-panel-title">Operational Overview</p>
                      <p className="hero-panel-subtitle">LIVE SYSTEMS SNAPSHOT</p>
                    </div>
                  </div>
                  <span className="hero-panel-badge">ACTIVE</span>
                </div>

                <div className="metrics hero-metrics">
                  <div className="metric">
                    <div className="metric-label">Active platforms</div>
                    <div className="metric-value">3</div>
                  </div>
                  <div className="metric">
                    <div className="metric-label">Systems deployed</div>
                    <div className="metric-value">12+</div>
                  </div>
                  <div className="metric">
                    <div className="metric-label">Avg response time</div>
                    <div className="metric-value">&lt;200ms</div>
                  </div>
                  <div className="metric">
                    <div className="metric-label">Uptime target</div>
                    <div className="metric-value">99.9%</div>
                  </div>
                </div>

                <p className="card-meta" style={{ marginTop: "0.75rem" }}>
                  Engineering resilient systems for institutions in emerging markets.
                </p>
              </Reveal>

              <Reveal className="hero-image-card" delay={0.16}>
                <Parallax strength={8} hoverScale={1.02}>
                  <div style={{ position: "relative", borderRadius: "inherit", overflow: "hidden" }} data-cursor-magnet>
                    <img className="hero-image" src="/dashboard.png" alt="Gorilla Ledger dashboard preview" />

                    <div
                      data-depth="0.9"
                      style={{
                        position: "absolute",
                        inset: 0,
                        pointerEvents: "none",
                        borderRadius: "inherit",
                        background:
                          "radial-gradient(60% 60% at 30% 20%, rgba(255,255,255,0.10), rgba(255,255,255,0) 60%)",
                      }}
                    />
                    <div
                      data-depth="0.35"
                      style={{
                        position: "absolute",
                        inset: 0,
                        pointerEvents: "none",
                        borderRadius: "inherit",
                        opacity: 0.22,
                        backgroundImage:
                          "linear-gradient(rgba(255,255,255,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.08) 1px, transparent 1px)",
                        backgroundSize: "42px 42px",
                      }}
                    />
                  </div>
                </Parallax>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* VISION + POSITIONING */}
      <section className="section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Built for institutions. Designed for continuity.</h2>
            <p className="section-text" style={{ marginTop: "0.5rem" }}>
              A product company and systems engineering partner — delivering secure enterprise software for South Sudan.
              Built to be maintainable, auditable, and stable.
            </p>
          </div>
        </div>
      </section>

      {/* PLATFORMS — WHAT WE BUILD */}
      <section className="section section--subtle">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Platforms</h2>
            <p className="section-text" style={{ marginTop: "0.5rem" }}>
              Core platform capabilities — delivered as products, or as custom systems built to enterprise standards.
            </p>
          </div>

          <div className="cards-grid">
            <div className="card" data-cursor-magnet>
              <p className="card-tag">Operations</p>
              <h3 className="card-title">Workflow &amp; Operations Systems</h3>
              <p className="card-text">
                Digitize processes, approvals, and cross-team execution with auditable workflows.
              </p>
              <div className="card-actions">
                <Link className="btn btn-ghost btn-sm" href="/platforms">
                  Explore →
                </Link>
              </div>
            </div>

            <div className="card" data-cursor-magnet>
              <p className="card-tag">Data</p>
              <h3 className="card-title">Data &amp; Reporting Platforms</h3>
              <p className="card-text">
                Dashboards, analytics, and decision-grade reporting designed for real institutional needs.
              </p>
              <div className="card-actions">
                <Link className="btn btn-ghost btn-sm" href="/platforms">
                  Explore →
                </Link>
              </div>
            </div>

            <div className="card" data-cursor-magnet>
              <p className="card-tag">Delivery</p>
              <h3 className="card-title">Service Delivery Portals</h3>
              <p className="card-text">
                Secure portals for internal teams, partners, and public-facing services.
              </p>
              <div className="card-actions">
                <Link className="btn btn-ghost btn-sm" href="/platforms">
                  Explore →
                </Link>
              </div>
            </div>

            <div className="card" data-cursor-magnet>
              <p className="card-tag">Governance</p>
              <h3 className="card-title">Identity &amp; Admin Systems</h3>
              <p className="card-text">
                Role-based access, audit trails, and governance-ready controls.
              </p>
              <div className="card-actions">
                <Link className="btn btn-ghost btn-sm" href="/enterprise">
                  Learn →
                </Link>
              </div>
            </div>

            <div className="card" data-cursor-magnet>
              <p className="card-tag">Automation</p>
              <h3 className="card-title">Integrations &amp; Automation</h3>
              <p className="card-text">
                Reduce overhead by connecting systems and automating recurring operations.
              </p>
              <div className="card-actions">
                <Link className="btn btn-ghost btn-sm" href="/infrastructure">
                  Learn →
                </Link>
              </div>
            </div>

            <div className="card" data-cursor-magnet>
              <p className="card-tag">Delivery</p>
              <h3 className="card-title">Enterprise Product Delivery</h3>
              <p className="card-text">
                Build, ship, and maintain — with documentation and long-term reliability in mind.
              </p>
              <div className="card-actions">
                <Link className="btn btn-ghost btn-sm" href="/company">
                  Company →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* INFRASTRUCTURE — HOW IT RUNS */}
      <section className="section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Infrastructure</h2>
            <p className="section-text" style={{ marginTop: "0.5rem" }}>
              Operational reliability isn’t an afterthought. We engineer for uptime, observability, and clean change
              control.
            </p>
          </div>

          <div className="cards-grid" style={{ gridTemplateColumns: "repeat(2, minmax(0, 1fr))" }}>
            <div className="card" data-cursor-magnet>
              <p className="card-tag">Architecture</p>
              <h3 className="card-title">Modular systems that scale cleanly</h3>
              <p className="card-text">
                Designed to expand without rewrites — with stable interfaces and clear ownership boundaries.
              </p>
            </div>

            <div className="card" data-cursor-magnet>
              <p className="card-tag">Operations</p>
              <h3 className="card-title">Deployment patterns for constrained environments</h3>
              <p className="card-text">
                Performance, caching, and stability tuned for real connectivity and infrastructure realities.
              </p>
            </div>

            <div className="card" data-cursor-magnet>
              <p className="card-tag">Maintenance</p>
              <h3 className="card-title">Maintainable by default</h3>
              <p className="card-text">Clear structure, documentation, and handover-ready delivery.</p>
            </div>

            <div className="card" data-cursor-magnet>
              <p className="card-tag">Performance</p>
              <h3 className="card-title">Fast UI response, controlled effects</h3>
              <p className="card-text">Minimal overhead, deliberate motion, and measured client-side behavior.</p>
            </div>
          </div>

          <div style={{ marginTop: "1rem" }}>
            <Link className="btn btn-ghost" href="/infrastructure" data-cursor-magnet>
              Infrastructure overview
            </Link>
          </div>
        </div>
      </section>

      {/* TRUST LAYER */}
      <section className="section section--subtle">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Trust layer</h2>
            <p className="section-text" style={{ marginTop: "0.5rem" }}>
              Enterprise credibility comes from posture: least-privilege access, auditability, and continuity.
            </p>
          </div>

          <div className="cards-grid">
            <div className="card" data-cursor-magnet>
              <p className="card-tag">Security</p>
              <h3 className="card-title">Least-privilege access</h3>
              <p className="card-text">Roles and permissions designed for institutional control and clear ownership.</p>
            </div>

            <div className="card" data-cursor-magnet>
              <p className="card-tag">Governance</p>
              <h3 className="card-title">Audit-friendly patterns</h3>
              <p className="card-text">Logging and traceability aligned to enterprise expectations.</p>
            </div>

            <div className="card" data-cursor-magnet>
              <p className="card-tag">Operations</p>
              <h3 className="card-title">Change control mindset</h3>
              <p className="card-text">Measured releases, stability focus, and operational continuity.</p>
            </div>
          </div>

          <div style={{ marginTop: "1rem" }}>
            <Link className="btn btn-ghost" href="/status" data-cursor-magnet>
              View status
            </Link>
          </div>
        </div>
      </section>

      {/* PROOF */}
      <section className="section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Where this works</h2>
            <p className="section-text" style={{ marginTop: "0.5rem" }}>
              Systems engineered for continuity — across public service delivery, NGOs, and operations-heavy networks.
            </p>
          </div>

          <div className="cards-grid">
            <div className="card" data-cursor-magnet>
              <p className="card-tag">Public sector</p>
              <h3 className="card-title">Mission-critical programs</h3>
              <p className="card-text">Governance, accountability, and scale — engineered for continuity.</p>
            </div>

            <div className="card" data-cursor-magnet>
              <p className="card-tag">NGOs</p>
              <h3 className="card-title">Operations-heavy environments</h3>
              <p className="card-text">Workflows, reporting, coordination, and field-aware execution.</p>
            </div>

            <div className="card" data-cursor-magnet>
              <p className="card-tag">Services</p>
              <h3 className="card-title">Utilities, logistics &amp; service networks</h3>
              <p className="card-text">Access-controlled systems with operational visibility.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ENGAGE */}
      <section className="section section--cta">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Let’s scope the system you actually need.</h2>
            <p className="section-text" style={{ marginTop: "0.5rem" }}>
              Short discovery call. Clear architecture proposal. Delivery plan aligned to operational reality in South Sudan.
            </p>
          </div>

          <div className="hero-actions">
            <Link className="btn btn-primary" href="/contact" data-cursor-magnet>
              Request consultation
            </Link>
            <Link className="btn btn-ghost" href="/platforms" data-cursor-magnet>
              Explore platforms
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
