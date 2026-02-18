import Link from "next/link";

import Hero3DLoader from "@/components/hero-3d-loader";
import Reveal from "@/components/reveal";
import Parallax from "@/components/parallax";

export default function HomePage() {
  return (
    <main>
      <section className="hero">
        <div className="hero-bg" aria-hidden="true">
          {/* Stars + 3D Logo (pure stars + 3D logo, no Earth) */}
          <Hero3DLoader className="hero-visual" svgUrl="/srt-logo.svg" />

          {/* Subtle vignette ABOVE 3D but BELOW the UI */}
          <div className="hero-vignette" aria-hidden="true" />
        </div>

        <div className="container">
          <div className="hero-grid">
            <div className="hero-left">
              <Reveal className="hero-kicker" delay={0.02}>
                SAVVY RILLA TECHNOLOGIES
              </Reveal>

              <Reveal as="h1" className="hero-main-title" delay={0.05}>
                SECURE
                <br />
                ENTERPRISE
                <br />
                SOFTWARE
                <br />
                FOR SOUTH SUDAN.
              </Reveal>

              <Reveal className="hero-text" delay={0.08}>
                We build institutional-grade systems for organizations in South Sudan — engineered for
                stability, security, and real operational constraints.
              </Reveal>

              <Reveal className="hero-cta" delay={0.12}>
                <div className="hero-actions">
                  <Link className="btn btn-primary" href="/platforms" data-cursor-magnet>
                    Explore platforms
                  </Link>
                  <Link className="btn btn-ghost" href="/contact" data-cursor-magnet>
                    Request consultation
                  </Link>
                </div>

                <div className="hero-strip">
                  <span className="hero-strip-item">Operational since 2023</span>
                  <span className="hero-strip-item">Built &amp; deployed in South Sudan</span>
                  <span className="hero-strip-item">Security-first architecture</span>
                </div>
              </Reveal>
            </div>

            <div className="hero-right">
              {/* =========================
                  Operational Overview CARD
                  - Parallax owns tilt/depth
                  - data-cursor-magnet on Parallax root (safe)
                  ========================= */}
              <Reveal delay={0.1}>
                <Parallax
                  className="hero-panel"
                  data-cursor-magnet="0.32"
                  strength={9}
                  hoverScale={1.02}
                >
                  <div className="hero-panel-head">
                    <div className="hero-panel-brand">
                      <div>
                        <p className="hero-panel-title">Operational Overview</p>
                        <p className="hero-panel-subtitle">Live systems snapshot</p>
                      </div>
                    </div>
                    <span className="hero-panel-badge">ACTIVE</span>
                  </div>

                  <div className="hero-metrics">
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

                  <div className="hero-panel-note">
                    Engineering resilient systems for institutions in emerging markets.
                  </div>
                </Parallax>
              </Reveal>

              {/* =========================
                  Dashboard preview MODULE
                  - Parallax owns tilt/depth
                  - data-cursor-magnet on Parallax root (safe)
                  ========================= */}
              <Reveal delay={0.16}>
                <Parallax
                  className="hero-image-card"
                  data-cursor-magnet="0.28"
                  strength={8}
                  hoverScale={1.018}
                >
                  <img
                    className="hero-image"
                    src="/dashboard.png"
                    alt="Gorilla Ledger dashboard preview"
                  />
                </Parallax>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* Mission Briefing — Narrative Architecture */}
      <section className="mb-section" aria-label="Vision and positioning">
        <div className="container">
          <div className="mb-head">
            <Reveal className="mb-kicker" delay={0.02}>
              VISION &amp; POSITIONING
            </Reveal>
            <Reveal as="h2" className="mb-title" delay={0.05}>
              Built for institutions. Designed for continuity.
            </Reveal>
            <Reveal className="mb-sub" delay={0.08}>
              Savvy Rilla Technologies is a product company delivering custom enterprise system builds
              in South Sudan — engineered for governance, reliability, and long-term operational
              resilience.
            </Reveal>
          </div>

          <div className="mb-grid">
            <Reveal className="card card--interactive" delay={0.06}>
              <div className="card-rail" aria-hidden="true" />
              <div className="card-kicker">Operating posture</div>
              <div className="card-title">Institutional-grade engineering</div>
              <div className="card-text">
                Systems designed to be audit-friendly, maintainable, and stable under real operational
                constraints.
              </div>
              <div className="card-hover">
                <div className="card-metrics">
                  <div className="cm">
                    <span className="cm-k">Operational since</span>
                    <span className="cm-v">2023</span>
                  </div>
                  <div className="cm">
                    <span className="cm-k">Deployment focus</span>
                    <span className="cm-v">South Sudan</span>
                  </div>
                </div>
              </div>
            </Reveal>

            <Reveal className="card card--interactive" delay={0.09}>
              <div className="card-rail" aria-hidden="true" />
              <div className="card-kicker">Delivery model</div>
              <div className="card-title">Product + custom builds</div>
              <div className="card-text">
                We ship platform capabilities, then tailor workflows, controls, and integrations to each
                environment.
              </div>
              <div className="card-hover">
                <Link className="btn btn-sm card-cta" href="/enterprise" data-cursor-magnet>
                  Enterprise engineering <span className="cta-arrow">→</span>
                </Link>
              </div>
            </Reveal>

            <Reveal className="card card--interactive" delay={0.12}>
              <div className="card-rail" aria-hidden="true" />
              <div className="card-kicker">Trust layer</div>
              <div className="card-title">Security-first foundations</div>
              <div className="card-text">
                Access control, policy-first data design, and governance-minded implementation from day
                one.
              </div>
              <div className="card-hover">
                <Link className="btn btn-sm card-cta" href="/infrastructure" data-cursor-magnet>
                  Infrastructure posture <span className="cta-arrow">→</span>
                </Link>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="mb-section" aria-label="Platforms">
        <div className="container">
          <div className="mb-head mb-head--row">
            <div>
              <Reveal className="mb-kicker" delay={0.02}>
                PLATFORMS
              </Reveal>
              <Reveal as="h2" className="mb-title" delay={0.05}>
                What we build
              </Reveal>
              <Reveal className="mb-sub" delay={0.08}>
                Core platform modules that accelerate delivery — without compromising enterprise controls.
              </Reveal>
            </div>
            <Reveal className="mb-head-cta" delay={0.1}>
              <Link className="btn btn-primary" href="/platforms" data-cursor-magnet>
                Explore platforms
              </Link>
            </Reveal>
          </div>

          <div className="mb-grid mb-grid--four">
            {[
              {
                k: "Operations",
                t: "Workflow & approvals",
                d: "Structured processes with role-based controls, audit trails, and escalation paths.",
              },
              {
                k: "Data",
                t: "Reporting & dashboards",
                d: "Decision-ready visibility with governed metrics and controlled access.",
              },
              {
                k: "Service",
                t: "Portals & self-service",
                d: "Secure interfaces for staff, partners, and external stakeholders.",
              },
              {
                k: "Integrations",
                t: "Automation & APIs",
                d: "Systems integration designed for reliability, observability, and change control.",
              },
            ].map((x, i) => (
              <Reveal key={x.t} className="card card--interactive" delay={0.06 + i * 0.03}>
                <div className="card-rail" aria-hidden="true" />
                <div className="card-kicker">{x.k}</div>
                <div className="card-title">{x.t}</div>
                <div className="card-text">{x.d}</div>
                <div className="card-hover">
                  <Link className="btn btn-sm card-cta" href="/platforms" data-cursor-magnet>
                    Learn more <span className="cta-arrow">→</span>
                  </Link>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="mb-section" aria-label="Infrastructure">
        <div className="container">
          <div className="mb-head">
            <Reveal className="mb-kicker" delay={0.02}>
              INFRASTRUCTURE
            </Reveal>
            <Reveal as="h2" className="mb-title" delay={0.05}>
              How it runs
            </Reveal>
            <Reveal className="mb-sub" delay={0.08}>
              Architecture patterns engineered for stability, performance, and operational clarity.
            </Reveal>
          </div>

          <div className="mb-split">
            <Reveal className="card" delay={0.06}>
              <div className="card-kicker">Engineering standards</div>
              <div className="card-title">Maintainable by design</div>
              <div className="card-text">
                Modular components, explicit interfaces, and documentation-ready delivery — so systems can
                evolve without chaos.
              </div>
            </Reveal>

            <Reveal className="card" delay={0.09}>
              <div className="card-kicker">Operations</div>
              <div className="card-title">Observable &amp; supportable</div>
              <div className="card-text">
                Deployment discipline, monitoring hooks, and incident-ready patterns for institutions
                that cannot afford downtime.
              </div>
            </Reveal>

            <Reveal className="card" delay={0.12}>
              <div className="card-kicker">Delivery velocity</div>
              <div className="card-title">Platform acceleration</div>
              <div className="card-text">
                Reusable modules that reduce build time while preserving enterprise security and
                governance.
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="mb-section" aria-label="Trust layer">
        <div className="container">
          <div className="mb-head">
            <Reveal className="mb-kicker" delay={0.02}>
              TRUST LAYER
            </Reveal>
            <Reveal as="h2" className="mb-title" delay={0.05}>
              Security + governance baked in
            </Reveal>
            <Reveal className="mb-sub" delay={0.08}>
              Enterprise credibility comes from stability signals and implementation discipline — not
              slogans.
            </Reveal>
          </div>

          <div className="mb-grid">
            <Reveal className="card" delay={0.06}>
              <div className="card-kicker">Security posture</div>
              <div className="card-title">Least privilege access</div>
              <div className="card-text">
                Role-based permissions, secure defaults, and separation of duties aligned with
                institutional environments.
              </div>
            </Reveal>

            <Reveal className="card" delay={0.09}>
              <div className="card-kicker">Governance</div>
              <div className="card-title">Audit-friendly foundations</div>
              <div className="card-text">
                Policy-first data handling, traceable actions, and change control patterns that support
                compliance readiness.
              </div>
            </Reveal>

            <Reveal className="card" delay={0.12}>
              <div className="card-kicker">Reliability</div>
              <div className="card-title">Uptime-minded delivery</div>
              <div className="card-text">
                Clear operational boundaries, support models, and performance budgets designed for
                long-term continuity.
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="mb-section" aria-label="Proof and use cases">
        <div className="container">
          <div className="mb-head mb-head--row">
            <div>
              <Reveal className="mb-kicker" delay={0.02}>
                PROOF
              </Reveal>
              <Reveal as="h2" className="mb-title" delay={0.05}>
                Where this works
              </Reveal>
              <Reveal className="mb-sub" delay={0.08}>
                Use cases aligned to institutional environments across South Sudan — operations-heavy,
                security-sensitive, mission-critical.
              </Reveal>
            </div>
            <Reveal className="mb-head-cta" delay={0.1}>
              <Link className="btn btn-ghost" href="/industries" data-cursor-magnet>
                View industries
              </Link>
            </Reveal>
          </div>

          <div className="mb-grid mb-grid--four">
            {[
              "Government & public services",
              "Humanitarian & programme operations",
              "Utilities, logistics & service networks",
              "Enterprise teams needing controlled access and reporting",
            ].map((t, i) => (
              <Reveal key={t} className="card" delay={0.06 + i * 0.03}>
                <div className="card-title">{t}</div>
                <div className="card-text">
                  Structured workflows, governed data, and security-first design — engineered for
                  operational reality.
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="mb-section mb-section--cta" aria-label="Engage">
        <div className="container">
          <Reveal className="cta-card" delay={0.06}>
            <div className="cta-left">
              <div className="cta-kicker">ENGAGE</div>
              <h2 className="cta-title">Request a consultation</h2>
              <p className="cta-text">
                Short discovery call. Clear architecture proposal. Delivery plan aligned to your
                operational environment in South Sudan.
              </p>
            </div>
            <div className="cta-right">
              <Link className="btn btn-primary" href="/contact" data-cursor-magnet>
                Start a scope call
              </Link>
              <Link className="btn btn-ghost" href="/platforms" data-cursor-magnet>
                Explore platforms
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </main>
  );
}
