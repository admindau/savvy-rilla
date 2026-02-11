// app/page.tsx
import Link from 'next/link';
import Image from 'next/image';
import Reveal from '@/components/reveal';
import Parallax from '@/components/parallax';

export default function HomePage() {
  return (
    <div className="page">
      {/* HERO */}
      <section className="hero hero--matrix">
        {/* Optional background image layer (add file to /public if you want) */}
        <div className="hero-bg" aria-hidden="true">
          {/* If you add a background image like /hero-grid.png or /hero-map.png, uncomment: */}
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
          <Reveal as="div" className="hero-left" delayMs={0}>
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
          </Reveal>

          {/* HERO RIGHT: Command panel + image */}
          <Reveal as="div" className="hero-right" delayMs={140}>
            <Parallax strength={10} className="hero-parallax">
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
                />
              </div>
            </Parallax>
          </Reveal>
        </div>
      </section>

      {/* PLATFORMS */}
      <section className="section section--dense">
        <div className="container">
          <Reveal as="div" className="section-header" delayMs={0}>
            <h2 className="section-title">Technology Platforms</h2>
            <p className="section-text">
              We build and operate platforms designed for security, clarity, and scale — from financial
              infrastructure to market intelligence systems.
            </p>
          </Reveal>

          <Reveal as="div" className="cards-grid cards-grid--platforms" delayMs={90}>
            <div className="card card--platform">
              <p className="card-tag">Platform · Finance</p>
              <h3 className="card-title">Gorilla Ledger™</h3>
              <p className="card-text">
                Enterprise-grade financial tracking infrastructure engineered for secure transaction
                management, structured reporting, and scalable analytics.
              </p>
              <p className="card-meta">Deployment: Cloud • Roadmap: Multi-tenant • Security: RLS-ready</p>
              <div className="card-actions">
                <Link href="/platforms/gorilla-ledger" className="btn btn-ghost btn-sm">
                  View platform
                </Link>
              </div>
            </div>

            <div className="card card--platform">
              <p className="card-tag">Platform · Market Intelligence</p>
              <h3 className="card-title">FX Intelligence Engine</h3>
              <p className="card-text">
                Multi-currency monitoring and analytics delivering clean visualisation, trend insights,
                and reporting workflows for institutions and analysts.
              </p>
              <p className="card-meta">Deployment: Cloud • Data: Time-series • UX: Command-center dashboards</p>
              <div className="card-actions">
                <Link href="/platforms/fx-intelligence" className="btn btn-ghost btn-sm">
                  View platform
                </Link>
              </div>
            </div>

            <div className="card card--platform">
              <p className="card-tag">Platform · Systems</p>
              <h3 className="card-title">Custom Enterprise Systems</h3>
              <p className="card-text">
                Purpose-built platforms tailored to institutional needs — reporting dashboards, internal
                tools, secure data hubs, and operational systems.
              </p>
              <p className="card-meta">Model: Build + Operate • Security: Access control • Support: SLA options</p>
              <div className="card-actions">
                <Link href="/enterprise" className="btn btn-ghost btn-sm">
                  Explore enterprise
                </Link>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ENTERPRISE ENGINEERING */}
      <section className="section">
        <div className="container">
          <Reveal as="div" className="section-header" delayMs={0}>
            <h2 className="section-title">Enterprise Engineering</h2>
            <p className="section-text">
              Beyond building apps — we architect digital foundations: APIs, databases, secure access
              layers, dashboards, and operational tooling that teams can rely on long-term.
            </p>
          </Reveal>

          <Reveal as="div" className="cards-grid" delayMs={90}>
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
          </Reveal>

          <Reveal as="div" className="" delayMs={140}>
            <div style={{ marginTop: '1rem' }}>
              <Link href="/enterprise" className="btn btn-primary">
                Explore enterprise engineering
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      {/* INDUSTRIES */}
      <section className="section section--subtle">
        <div className="container">
          <Reveal as="div" className="section-header" delayMs={0}>
            <h2 className="section-title">Industries</h2>
            <p className="section-text">
              We serve institutions and teams that need secure systems, credible reporting, and infrastructure
              that works in complex environments.
            </p>
          </Reveal>

          <Reveal as="div" className="cards-grid" delayMs={90}>
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
              <p className="card-text">
                Operational dashboards, secure data systems, M&amp;E tooling, visibility workflows.
              </p>
            </div>
          </Reveal>

          <Reveal as="div" className="" delayMs={140}>
            <div style={{ marginTop: '1rem' }}>
              <Link href="/industries" className="btn btn-ghost">
                View industries
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      {/* INFRASTRUCTURE */}
      <section className="section">
        <div className="container">
          <Reveal as="div" className="section-header" delayMs={0}>
            <h2 className="section-title">Infrastructure &amp; Managed Services</h2>
            <p className="section-text">
              Technology provision does not end at deployment. We provide operational support that keeps
              systems secure, monitored, and continuously improved.
            </p>
          </Reveal>

          <Reveal as="div" className="cards-grid" delayMs={90}>
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
          </Reveal>

          <Reveal as="div" className="" delayMs={140}>
            <div style={{ marginTop: '1rem' }}>
              <Link href="/infrastructure" className="btn btn-primary">
                Explore infrastructure &amp; support
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      {/* STACK */}
      <section className="section section--dense">
        <div className="container">
          <Reveal as="div" className="section-header" delayMs={0}>
            <h2 className="section-title">Technology Architecture</h2>
            <p className="section-text">
              We build with modern, reliable infrastructure — and design security into the data layer from day one.
            </p>
          </Reveal>

          <Reveal as="div" className="cards-grid" delayMs={90}>
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
          </Reveal>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="section section--cta">
        <div className="container">
          <Reveal as="div" className="section-header" delayMs={0}>
            <h2 className="section-title">Ready to build secure digital infrastructure?</h2>
            <p className="section-text">
              Tell us what you’re trying to build. We’ll propose an architecture, delivery plan, and the operational model to run it properly.
            </p>
          </Reveal>

          <Reveal as="div" className="" delayMs={120}>
            <Link href="/contact" className="btn btn-primary">
              Schedule consultation
            </Link>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
