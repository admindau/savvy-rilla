import Link from "next/link";

import Hero3DLoader from "@/components/hero-3d-loader";
import Parallax from "@/components/parallax";
import Reveal from "@/components/reveal";

export default function Page() {
  return (
    <main className="page">
      {/* HERO */}
      <section className="hero">
        <div className="hero-bg" aria-hidden="true">
          <div className="hero-stars" />
          <Hero3DLoader className="hero-visual" svgUrl="/srt-logo.svg" />
          <div className="hero-vignette" />
        </div>

        <div className="container hero-container">
          <div className="hero-grid">
            <div className="hero-left">
              <Reveal className="hero-kicker" delay={0.06}>
                SAVVY RILLA TECHNOLOGIES
              </Reveal>

              <Reveal delay={0.1}>
                <h1 className="hero-title">
                  SECURE
                  <br />
                  ENTERPRISE
                  <br />
                  SOFTWARE
                  <br />
                  FOR SOUTH SUDAN.
                </h1>
              </Reveal>

              <Reveal className="hero-subtitle" delay={0.12}>
                We build institutional-grade systems for organizations in South Sudan — engineered for stability,
                security, and real operational constraints.
              </Reveal>

              <Reveal className="hero-actions" delay={0.14}>
                <div className="hero-action-row">
                  <Link className="btn btn-primary" href="/platforms" data-cursor-magnet>
                    Explore platforms
                  </Link>
                  <Link className="btn btn-secondary" href="/contact" data-cursor-magnet>
                    Request consultation
                  </Link>
                </div>

                <div className="hero-trust-strip">
                  <span className="pill">Operational since 2023</span>
                  <span className="pill">Built &amp; deployed in South Sudan</span>
                  <span className="pill">Security-first architecture</span>
                </div>
              </Reveal>
            </div>

            <div className="hero-right">
              <Reveal className="ops-card" delay={0.12}>
                <div className="ops-head">
                  <div>
                    <div className="ops-title">Operational Overview</div>
                    <div className="ops-sub">LIVE SYSTEMS SNAPSHOT</div>
                  </div>
                  <div className="ops-badge">ACTIVE</div>
                </div>

                <div className="ops-grid">
                  <div className="ops-metric">
                    <div className="ops-label">ACTIVE PLATFORMS</div>
                    <div className="ops-value">3</div>
                  </div>
                  <div className="ops-metric">
                    <div className="ops-label">SYSTEMS DEPLOYED</div>
                    <div className="ops-value">12+</div>
                  </div>
                  <div className="ops-metric">
                    <div className="ops-label">AVG RESPONSE TIME</div>
                    <div className="ops-value">&lt;200ms</div>
                  </div>
                  <div className="ops-metric">
                    <div className="ops-label">UPTIME TARGET</div>
                    <div className="ops-value">99.9%</div>
                  </div>
                </div>

                <div className="ops-foot">
                  Engineering resilient systems for institutions in emerging markets.
                </div>
              </Reveal>

              {/* DASHBOARD PREVIEW — DEPTH/REACTIVITY RESTORED */}
              <Reveal className="hero-image-card" delay={0.16}>
                <Parallax className="hero-image-parallax" strength={8} hoverScale={1.02}>
                  <div
                    data-cursor-magnet
                    style={{
                      position: "relative",
                      borderRadius: "inherit",
                      overflow: "hidden",
                    }}
                  >
                    <img
                      className="hero-image"
                      src="/dashboard.png"
                      alt="Gorilla Ledger dashboard preview"
                      loading="lazy"
                    />

                    {/* Foreground gloss */}
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

                    {/* Mid-layer grid */}
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
      <section className="section section-briefing">
        <div className="container">
          <Reveal className="section-kicker">VISION &amp; POSITIONING</Reveal>
          <Reveal>
            <h2 className="section-title">Built for institutions. Designed for continuity.</h2>
          </Reveal>
          <Reveal className="section-text" delay={0.08}>
            Savvy Rilla Technologies is a product company that also delivers custom enterprise builds — engineering
            systems that remain stable under real operational constraints in South Sudan.
          </Reveal>
        </div>
      </section>

      {/* PLATFORMS — WHAT WE BUILD */}
      <section className="section">
        <div className="container">
          <Reveal className="section-kicker">PLATFORMS</Reveal>
          <Reveal>
            <h2 className="section-title">What we build</h2>
          </Reveal>

          <div className="grid cards-3">
            <Reveal className="card" delay={0.04}>
              <div className="card-title">Workflow &amp; Operations Systems</div>
              <div className="card-text">
                Digitize processes, approvals, and cross-team execution with auditable workflows.
              </div>
              <Link className="card-link" href="/platforms" data-cursor-magnet>
                Explore →
              </Link>
            </Reveal>

            <Reveal className="card" delay={0.06}>
              <div className="card-title">Data &amp; Reporting Platforms</div>
              <div className="card-text">
                Dashboards, analytics, and decision-grade reporting built for real institutional needs.
              </div>
              <Link className="card-link" href="/platforms" data-cursor-magnet>
                Explore →
              </Link>
            </Reveal>

            <Reveal className="card" delay={0.08}>
              <div className="card-title">Service Delivery Portals</div>
              <div className="card-text">
                Secure portals for internal teams, partners, and public-facing services.
              </div>
              <Link className="card-link" href="/platforms" data-cursor-magnet>
                Explore →
              </Link>
            </Reveal>

            <Reveal className="card" delay={0.1}>
              <div className="card-title">Identity &amp; Admin Systems</div>
              <div className="card-text">
                Role-based access, audit trails, and governance-ready controls.
              </div>
              <Link className="card-link" href="/enterprise" data-cursor-magnet>
                Learn →
              </Link>
            </Reveal>

            <Reveal className="card" delay={0.12}>
              <div className="card-title">Automation &amp; Integrations</div>
              <div className="card-text">
                Reduce overhead by connecting systems and automating recurring operations.
              </div>
              <Link className="card-link" href="/infrastructure" data-cursor-magnet>
                Learn →
              </Link>
            </Reveal>

            <Reveal className="card" delay={0.14}>
              <div className="card-title">Enterprise Product Delivery</div>
              <div className="card-text">
                Build, ship, maintain — with documentation and long-term reliability in mind.
              </div>
              <Link className="card-link" href="/company" data-cursor-magnet>
                Company →
              </Link>
            </Reveal>
          </div>
        </div>
      </section>

      {/* INFRASTRUCTURE — HOW IT RUNS */}
      <section className="section section-muted">
        <div className="container">
          <Reveal className="section-kicker">INFRASTRUCTURE</Reveal>
          <Reveal>
            <h2 className="section-title">How it runs</h2>
          </Reveal>

          <div className="grid cards-2">
            <Reveal className="card" delay={0.04}>
              <div className="card-title">Modular architecture for scale</div>
              <div className="card-text">
                Systems designed to expand cleanly without rewrites — services, modules, and APIs.
              </div>
            </Reveal>

            <Reveal className="card" delay={0.06}>
              <div className="card-title">Deployment patterns for constrained environments</div>
              <div className="card-text">
                Optimized performance, caching, and stability for real connectivity conditions.
              </div>
            </Reveal>

            <Reveal className="card" delay={0.08}>
              <div className="card-title">Maintainable by default</div>
              <div className="card-text">
                Clear structure, documentation, and handover-ready delivery.
              </div>
            </Reveal>

            <Reveal className="card" delay={0.1}>
              <div className="card-title">Performance-aware engineering</div>
              <div className="card-text">
                Minimal overhead, controlled client-side effects, and fast UI response.
              </div>
            </Reveal>
          </div>

          <div className="section-actions">
            <Link className="btn btn-secondary" href="/infrastructure" data-cursor-magnet>
              Infrastructure overview
            </Link>
          </div>
        </div>
      </section>

      {/* TRUST LAYER — SECURITY + COMPLIANCE */}
      <section className="section">
        <div className="container">
          <Reveal className="section-kicker">TRUST LAYER</Reveal>
          <Reveal>
            <h2 className="section-title">Security &amp; governance posture</h2>
          </Reveal>

          <div className="grid cards-3">
            <Reveal className="card" delay={0.04}>
              <div className="card-title">Least-privilege access</div>
              <div className="card-text">
                Roles and permissions designed for institutional control and clear ownership.
              </div>
            </Reveal>

            <Reveal className="card" delay={0.06}>
              <div className="card-title">Audit-friendly patterns</div>
              <div className="card-text">
                Logging and traceability aligned to enterprise expectations.
              </div>
            </Reveal>

            <Reveal className="card" delay={0.08}>
              <div className="card-title">Change control mindset</div>
              <div className="card-text">
                Measured releases, stability focus, and operational continuity.
              </div>
            </Reveal>
          </div>

          <div className="section-actions">
            <Link className="btn btn-secondary" href="/status" data-cursor-magnet>
              View system status
            </Link>
          </div>
        </div>
      </section>

      {/* PROOF — USE CASES / INDUSTRIES */}
      <section className="section section-muted">
        <div className="container">
          <Reveal className="section-kicker">PROOF</Reveal>
          <Reveal>
            <h2 className="section-title">Where this works</h2>
          </Reveal>

          <div className="grid cards-3">
            <Reveal className="card" delay={0.04}>
              <div className="card-title">Public sector &amp; mission-critical programs</div>
              <div className="card-text">
                Governance, accountability, and scale — engineered for continuity.
              </div>
            </Reveal>

            <Reveal className="card" delay={0.06}>
              <div className="card-title">NGOs &amp; operations-heavy environments</div>
              <div className="card-text">
                Workflows, reporting, coordination, and field-aware execution.
              </div>
            </Reveal>

            <Reveal className="card" delay={0.08}>
              <div className="card-title">Utilities, logistics &amp; service networks</div>
              <div className="card-text">
                Access-controlled systems with operational visibility.
              </div>
            </Reveal>
          </div>

          <div className="section-actions">
            <Link className="btn btn-secondary" href="/industries" data-cursor-magnet>
              View industries
            </Link>
          </div>
        </div>
      </section>

      {/* ENGAGE — CONSULTATION CTA */}
      <section className="section section-cta">
        <div className="container">
          <Reveal className="section-kicker">ENGAGE</Reveal>
          <Reveal>
            <h2 className="section-title">Let’s scope the system you actually need.</h2>
          </Reveal>
          <Reveal className="section-text" delay={0.08}>
            Short discovery call. Clear architecture proposal. Delivery plan aligned to operational reality in South Sudan.
          </Reveal>

          <div className="section-actions">
            <Link className="btn btn-primary" href="/contact" data-cursor-magnet>
              Request consultation
            </Link>
            <Link className="btn btn-secondary" href="/platforms" data-cursor-magnet>
              Explore platforms
            </Link>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="footer">
        <div className="container footer-inner">
          <div className="footer-left">
            <div className="footer-brand">Savvy Rilla Technologies</div>
            <div className="footer-sub">Secure enterprise systems for South Sudan.</div>
          </div>

          <div className="footer-links">
            <Link href="/platforms" data-cursor-magnet>
              Platforms
            </Link>
            <Link href="/enterprise" data-cursor-magnet>
              Enterprise
            </Link>
            <Link href="/infrastructure" data-cursor-magnet>
              Infrastructure
            </Link>
            <Link href="/industries" data-cursor-magnet>
              Industries
            </Link>
            <Link href="/insights" data-cursor-magnet>
              Insights
            </Link>
            <Link href="/company" data-cursor-magnet>
              Company
            </Link>
            <Link href="/contact" data-cursor-magnet>
              Contact
            </Link>
            <Link href="/status" data-cursor-magnet>
              Status
            </Link>
          </div>

          <div className="footer-meta">
            <div>Operational since 2023</div>
            <div>© {new Date().getFullYear()} Savvy Rilla Technologies</div>
          </div>
        </div>
      </footer>
    </main>
  );
}
