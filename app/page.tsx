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
      
      {/* System Console — command-center band */}
      <section className="mb-section mb-section--console" aria-label="System console">
        <div className="container">
          <div className="console-shell">
            <div className="console-head">
              <Reveal className="mb-kicker" delay={0.02}>
                SYSTEM CONSOLE
              </Reveal>
              <Reveal as="h2" className="mb-title" delay={0.05}>
                A command-center experience — not a brochure.
              </Reveal>
              <Reveal className="mb-sub" delay={0.08}>
                Clear signals. Structured delivery. Evidence of operational maturity — designed to build trust
                with institutions.
              </Reveal>
            </div>

            <div className="console-grid">
              <Reveal className="console-panel" delay={0.06}>
                <div className="console-panel-head">
                  <div>
                    <div className="console-kicker">Delivery pipeline</div>
                    <div className="console-title">From scope → deployment</div>
                  </div>
                  <span className="console-badge">DISCIPLINED</span>
                </div>

                <ol className="console-steps">
                  {[
                    {
                      t: "Discovery",
                      d: "Define workflows, risks, data owners, and access boundaries.",
                    },
                    {
                      t: "Architecture",
                      d: "Produce system map, security model, and integration plan.",
                    },
                    {
                      t: "Build",
                      d: "Ship working increments with review loops and change control.",
                    },
                    {
                      t: "Deploy",
                      d: "Controlled releases with monitoring hooks and rollback paths.",
                    },
                    {
                      t: "Support",
                      d: "Operational handover, documentation, and continuity support.",
                    },
                  ].map((x) => (
                    <li key={x.t} className="console-step">
                      <div className="console-step-dot" aria-hidden="true" />
                      <div className="console-step-body">
                        <div className="console-step-title">{x.t}</div>
                        <div className="console-step-text">{x.d}</div>
                      </div>
                    </li>
                  ))}
                </ol>
              </Reveal>

              <Reveal className="console-panel console-panel--right" delay={0.09}>
                <div className="console-panel-head">
                  <div>
                    <div className="console-kicker">Controls</div>
                    <div className="console-title">Institution-ready defaults</div>
                  </div>
                  <span className="console-badge console-badge--alt">HARDENED</span>
                </div>

                <div className="console-checks" role="list">
                  {[
                    "Role-based access control (RBAC) + least privilege",
                    "Audit trails for critical actions",
                    "Segregation of duties for approvals",
                    "Operational logging + monitoring hooks",
                    "Data governance: owners, retention, and exports",
                    "Performance budgets + uptime-minded patterns",
                  ].map((t) => (
                    <div key={t} className="console-check" role="listitem">
                      <span className="console-check-icon" aria-hidden="true">
                        ▸
                      </span>
                      <span className="console-check-text">{t}</span>
                    </div>
                  ))}
                </div>

                <div className="console-faq">
                  <details className="console-details">
                    <summary className="console-summary" data-cursor-magnet>
                      What does onboarding look like?
                    </summary>
                    <div className="console-details-body">
                      We start with a short discovery call, map your workflows and access model, then share a
                      clear proposal: architecture outline, milestones, and delivery plan.
                    </div>
                  </details>

                  <details className="console-details">
                    <summary className="console-summary" data-cursor-magnet>
                      Can you work with limited connectivity?
                    </summary>
                    <div className="console-details-body">
                      Yes. We design for real constraints: caching, offline-tolerant workflows, and operational
                      fallbacks where needed.
                    </div>
                  </details>

                  <details className="console-details">
                    <summary className="console-summary" data-cursor-magnet>
                      Do you support systems after launch?
                    </summary>
                    <div className="console-details-body">
                      Yes. Delivery includes documentation, handover, and an optional support model aligned to
                      your operational needs.
                    </div>
                  </details>
                </div>
              </Reveal>
            </div>

            <Reveal className="console-foot" delay={0.12}>
              <div className="console-foot-left">
                <div className="console-foot-title">Operational signals</div>
                <div className="console-foot-text">
                  A clean interface is good — but institutions buy reliability. The site now surfaces that
                  posture intentionally.
                </div>
              </div>
              <div className="console-foot-right">
                <Link className="btn btn-ghost" href="/infrastructure" data-cursor-magnet>
                  View infrastructure <span className="cta-arrow">→</span>
                </Link>
                <Link className="btn btn-primary" href="/contact" data-cursor-magnet>
                  Start a scope call
                </Link>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

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
