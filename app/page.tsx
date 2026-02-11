// app/page.tsx
import Link from 'next/link';
import Image from 'next/image';

export default function HomePage() {
  return (
    <div className="page">
      {/* HERO */}
      <section className="hero hero--matrix">
        {/* Background layer */}
        <div className="hero-bg" aria-hidden="true">
          {/* Optional image background */}
          {/*
          <Image
            src="/hero-map.png"
            alt=""
            fill
            className="hero-bg-img"
            priority
          />
          */}
        </div>

        <div className="container hero-grid">
          <div className="hero-left">
            <p className="hero-kicker">Savvy Rilla Technologies</p>

            <h1 className="hero-main-title hero-main-title--provider">
              Powering Secure Digital Infrastructure Across Africa.
            </h1>

            <p className="hero-text">
              We design, build, and operate enterprise-grade technology platforms for financial
              institutions, governments, and organisations — engineered for performance, security,
              and real-world African constraints.
            </p>

            <div className="hero-actions">
              <Link href="/platforms" className="btn btn-primary">
                Explore platforms
              </Link>
              <Link href="/contact" className="btn btn-ghost">
                Request consultation
              </Link>
            </div>

            <div className="hero-strip">
              <span className="hero-strip-item">Secure by architecture</span>
              <span className="hero-strip-dot" aria-hidden="true" />
              <span className="hero-strip-item">API-first systems</span>
              <span className="hero-strip-dot" aria-hidden="true" />
              <span className="hero-strip-item">Performance optimized</span>
              <span className="hero-strip-dot" aria-hidden="true" />
              <span className="hero-strip-item">Multi-region ready</span>
            </div>

            {/* NEW: Hero Status Ticker */}
            <div className="hero-ticker" aria-label="Live infrastructure ticker">
              <div className="ticker-fade ticker-fade-left" aria-hidden="true" />
              <div className="ticker-fade ticker-fade-right" aria-hidden="true" />

              <div className="ticker-viewport">
                <div className="ticker-track">
                  <span className="tick">
                    <span className="tick-dot" aria-hidden="true" /> Deployments: <b>12+</b>
                  </span>
                  <span className="tick">
                    <span className="tick-dot" aria-hidden="true" /> Uptime target: <b>99.9%</b>
                  </span>
                  <span className="tick">
                    <span className="tick-dot" aria-hidden="true" /> Incidents (30d): <b>0</b>
                  </span>
                  <span className="tick">
                    <span className="tick-dot" aria-hidden="true" /> Avg response time: <b>&lt;200ms</b>
                  </span>
                  <span className="tick">
                    <span className="tick-dot" aria-hidden="true" /> Security posture: <b>Hardened</b>
                  </span>

                  {/* Duplicate for seamless loop */}
                  <span className="tick">
                    <span className="tick-dot" aria-hidden="true" /> Deployments: <b>12+</b>
                  </span>
                  <span className="tick">
                    <span className="tick-dot" aria-hidden="true" /> Uptime target: <b>99.9%</b>
                  </span>
                  <span className="tick">
                    <span className="tick-dot" aria-hidden="true" /> Incidents (30d): <b>0</b>
                  </span>
                  <span className="tick">
                    <span className="tick-dot" aria-hidden="true" /> Avg response time: <b>&lt;200ms</b>
                  </span>
                  <span className="tick">
                    <span className="tick-dot" aria-hidden="true" /> Security posture: <b>Hardened</b>
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* HERO RIGHT */}
          <div className="hero-right">
            <div className="hero-panel">
              <div className="hero-panel-head">
                <div className="hero-panel-brand">
                  <Image
                    src="/logo-white.png"
                    alt="Savvy Rilla Technologies logo"
                    width={34}
                    height={34}
                  />
                  <div>
                    <p className="hero-panel-title">Operational Overview</p>
                    <p className="hero-panel-subtitle">Live systems snapshot</p>
                  </div>
                </div>
                <div className="hero-panel-badge">ACTIVE</div>
              </div>

              <div className="hero-metrics">
                <div className="metric">
                  <p className="metric-label">Active platforms</p>
                  <p className="metric-value">3</p>
                </div>
                <div className="metric">
                  <p className="metric-label">Systems deployed</p>
                  <p className="metric-value">12+</p>
                </div>
                <div className="metric">
                  <p className="metric-label">Avg response time</p>
                  <p className="metric-value">&lt;200ms</p>
                </div>
                <div className="metric">
                  <p className="metric-label">Uptime target</p>
                  <p className="metric-value">99.9%</p>
                </div>
              </div>

              <div className="hero-panel-foot">
                <p className="hero-panel-note">
                  Engineering resilient systems for institutions in emerging markets.
                </p>
              </div>
            </div>

            <div className="hero-image-card">
              <Image
                src="/dashboard.png"
                alt="Gorilla Ledger dashboard preview"
                width={900}
                height={620}
                className="hero-image"
                priority
                sizes="(max-width: 920px) 92vw, 520px"
              />
            </div>
          </div>
        </div>
      </section>

      {/* PLATFORMS */}
      <section className="section section--dense">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Technology Platforms</h2>
            <p className="section-text">
              We build and operate platforms designed for security, clarity, and scale — from financial
              infrastructure to market intelligence systems.
            </p>
          </div>

          <div className="cards-grid cards-grid--platforms">
            {/* Interactive Platform Card 1 */}
            <div className="card card--platform card--interactive">
              <div className="card-rail" aria-hidden="true" />
              <p className="card-tag">Platform · Finance</p>
              <h3 className="card-title">Gorilla Ledger™</h3>
              <p className="card-text">
                Enterprise-grade financial tracking infrastructure engineered for secure transaction
                management, structured reporting, and scalable analytics.
              </p>

              <div className="card-hover">
                <div className="card-metrics">
                  <div className="cm">
                    <span className="cm-k">Security</span>
                    <span className="cm-v">RLS-ready</span>
                  </div>
                  <div className="cm">
                    <span className="cm-k">Latency</span>
                    <span className="cm-v">&lt;200ms</span>
                  </div>
                  <div className="cm">
                    <span className="cm-k">Mode</span>
                    <span className="cm-v">Build + Operate</span>
                  </div>
                </div>
              </div>

              <p className="card-meta">Deployment: Cloud • Roadmap: Multi-tenant • Security: RLS-ready</p>
              <div className="card-actions">
                <Link href="/platforms/gorilla-ledger" className="btn btn-ghost btn-sm card-cta">
                  View platform <span className="cta-arrow" aria-hidden="true">→</span>
                </Link>
              </div>
            </div>

            {/* Interactive Platform Card 2 */}
            <div className="card card--platform card--interactive">
              <div className="card-rail" aria-hidden="true" />
              <p className="card-tag">Platform · Market Intelligence</p>
              <h3 className="card-title">FX Intelligence Engine</h3>
              <p className="card-text">
                Multi-currency monitoring and analytics delivering clean visualisation, trend insights,
                and reporting workflows for institutions and analysts.
              </p>

              <div className="card-hover">
                <div className="card-metrics">
                  <div className="cm">
                    <span className="cm-k">Data</span>
                    <span className="cm-v">Time-series</span>
                  </div>
                  <div className="cm">
                    <span className="cm-k">Views</span>
                    <span className="cm-v">Dashboards</span>
                  </div>
                  <div className="cm">
                    <span className="cm-k">Output</span>
                    <span className="cm-v">Insights</span>
                  </div>
                </div>
              </div>

              <p className="card-meta">Deployment: Cloud • Data: Time-series • UX: Command-center dashboards</p>
              <div className="card-actions">
                <Link href="/platforms/fx-intelligence" className="btn btn-ghost btn-sm card-cta">
                  View platform <span className="cta-arrow" aria-hidden="true">→</span>
                </Link>
              </div>
            </div>

            {/* Interactive Platform Card 3 */}
            <div className="card card--platform card--interactive">
              <div className="card-rail" aria-hidden="true" />
              <p className="card-tag">Platform · Systems</p>
              <h3 className="card-title">Custom Enterprise Systems</h3>
              <p className="card-text">
                Purpose-built platforms tailored to institutional needs — reporting dashboards, internal
                tools, secure data hubs, and operational systems.
              </p>

              <div className="card-hover">
                <div className="card-metrics">
                  <div className="cm">
                    <span className="cm-k">Access</span>
                    <span className="cm-v">Role-based</span>
                  </div>
                  <div className="cm">
                    <span className="cm-k">Delivery</span>
                    <span className="cm-v">CI/CD</span>
                  </div>
                  <div className="cm">
                    <span className="cm-k">Support</span>
                    <span className="cm-v">SLA options</span>
                  </div>
                </div>
              </div>

              <p className="card-meta">Model: Build + Operate • Security: Access control • Support: SLA options</p>
              <div className="card-actions">
                <Link href="/enterprise" className="btn btn-ghost btn-sm card-cta">
                  Explore enterprise <span className="cta-arrow" aria-hidden="true">→</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ENTERPRISE ENGINEERING */}
      <section className="section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Enterprise Engineering</h2>
            <p className="section-text">
              Beyond building apps — we architect digital foundations: APIs, databases, secure access
              layers, dashboards, and operational tooling that teams can rely on long-term.
            </p>
          </div>

          <div className="cards-grid">
            <div className="card">
              <p className="card-tag">Architecture</p>
              <h3 className="card-title">Systems design &amp; blueprints</h3>
              <p className="card-text">
                Discovery, systems mapping, architecture decisions, and delivery plans that reduce
                risk before development starts.
              </p>
            </div>
            <div className="card">
              <p className="card-tag">Engineering</p>
              <h3 className="card-title">Backend, data &amp; dashboards</h3>
              <p className="card-text">
                Secure APIs, database modeling, analytics layers, and high-performance user interfaces
                designed for clarity and scale.
              </p>
            </div>
            <div className="card">
              <p className="card-tag">Security</p>
              <h3 className="card-title">Access control &amp; hardening</h3>
              <p className="card-text">
                Authentication flows, role-based access, policy-first data design, and production hardening.
              </p>
            </div>
          </div>

          <div style={{ marginTop: '1rem' }}>
            <Link href="/enterprise" className="btn btn-primary">
              Explore enterprise engineering
            </Link>
          </div>
        </div>
      </section>

      {/* INDUSTRIES */}
      <section className="section section--subtle">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Industries</h2>
            <p className="section-text">
              We serve institutions and teams that need secure systems, credible reporting, and infrastructure
              that works in complex environments.
            </p>
          </div>

          <div className="cards-grid">
            <div className="card card--industry">
              <p className="card-tag">Finance</p>
              <h3 className="card-title">Financial institutions</h3>
              <p className="card-text">Ledgers, reporting engines, FX monitoring, data dashboards, secure access.</p>
            </div>
            <div className="card card--industry">
              <p className="card-tag">Public sector</p>
              <h3 className="card-title">Government &amp; agencies</h3>
              <p className="card-text">Digital reporting systems, internal tooling, structured data platforms.</p>
            </div>
            <div className="card card--industry">
              <p className="card-tag">Development</p>
              <h3 className="card-title">NGOs &amp; partners</h3>
              <p className="card-text">Operational dashboards, secure data systems, M&amp;E tooling, visibility workflows.</p>
            </div>
          </div>

          <div style={{ marginTop: '1rem' }}>
            <Link href="/industries" className="btn btn-ghost">
              View industries
            </Link>
          </div>
        </div>
      </section>

      {/* INFRASTRUCTURE */}
      <section className="section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Infrastructure &amp; Managed Services</h2>
            <p className="section-text">
              Technology provision does not end at deployment. We provide operational support that keeps
              systems secure, monitored, and continuously improved.
            </p>
          </div>

          <div className="cards-grid">
            <div className="card">
              <p className="card-tag">Operations</p>
              <h3 className="card-title">Hosting, monitoring &amp; uptime</h3>
              <p className="card-text">
                Deployment models, performance monitoring, and reliability practices aligned with institutional needs.
              </p>
            </div>
            <div className="card">
              <p className="card-tag">Delivery</p>
              <h3 className="card-title">CI/CD &amp; release management</h3>
              <p className="card-text">
                Automated delivery pipelines, controlled releases, and version lifecycle management.
              </p>
            </div>
            <div className="card">
              <p className="card-tag">Support</p>
              <h3 className="card-title">SLA-based support options</h3>
              <p className="card-text">
                Tiered support for incident response, upgrades, and long-term technical advisory.
              </p>
            </div>
          </div>

          <div style={{ marginTop: '1rem' }}>
            <Link href="/infrastructure" className="btn btn-primary">
              Explore infrastructure &amp; support
            </Link>
          </div>
        </div>
      </section>

      {/* STACK */}
      <section className="section section--dense">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Technology Architecture</h2>
            <p className="section-text">
              We build with modern, reliable infrastructure — and design security into the data layer from day one.
            </p>
          </div>

          <div className="cards-grid">
            <div className="card">
              <p className="card-tag">Frontend</p>
              <h3 className="card-title">Next.js · TypeScript</h3>
              <p className="card-text">High-performance interfaces, dashboards, and user journeys.</p>
            </div>
            <div className="card">
              <p className="card-tag">Backend</p>
              <h3 className="card-title">Node.js · API-first</h3>
              <p className="card-text">Clean system boundaries, scalable endpoints, structured service layers.</p>
            </div>
            <div className="card">
              <p className="card-tag">Data</p>
              <h3 className="card-title">PostgreSQL · Policy-first</h3>
              <p className="card-text">Secure modeling, access controls, audit-ready foundations.</p>
            </div>
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="section section--cta">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Ready to build secure digital infrastructure?</h2>
            <p className="section-text">
              Tell us what you’re trying to build. We’ll propose an architecture, delivery plan, and the operational model to run it properly.
            </p>
          </div>
          <Link href="/contact" className="btn btn-primary">
            Schedule consultation
          </Link>
        </div>
      </section>
    </div>
  );
}
