// app/page.tsx
import Link from 'next/link';
import Image from 'next/image';
import Reveal from '@/components/reveal';
import Parallax from '@/components/parallax';
import Hero3DLoader from '@/components/hero-3d-loader';

export default function HomePage() {
  return (
    <div className="page">
      {/* HERO */}
      <section className="hero hero--matrix">
        <div className="hero-bg" aria-hidden="true">
          {/* 3D Logo (texture-based, reliable) */}
          <Hero3DLoader className="hero-visual" textureUrl="/logo-white.png" />
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

            <div className="ticker-wrap" aria-label="Live status ticker">
              <div className="ticker-fade ticker-fade-left" aria-hidden="true" />
              <div className="ticker-fade ticker-fade-right" aria-hidden="true" />
              <div className="ticker-track" aria-hidden="true">
                <span className="tick"><span className="dot" /><b>DEPLOY</b> savvyrilla.tech</span>
                <span className="tick"><span className="dot" /><b>UPTIME</b> 99.9% target</span>
                <span className="tick"><span className="dot" /><b>INCIDENTS</b> 0 (rolling 30d)</span>
                <span className="tick"><span className="dot" /><b>LATENCY</b> &lt;200ms avg</span>
                <span className="tick"><span className="dot" /><b>SECURITY</b> policy-first data</span>
                <span className="tick"><span className="dot" /><b>REGION</b> Africa-ready</span>

                <span className="tick"><span className="dot" /><b>DEPLOY</b> savvyrilla.tech</span>
                <span className="tick"><span className="dot" /><b>UPTIME</b> 99.9% target</span>
                <span className="tick"><span className="dot" /><b>INCIDENTS</b> 0 (rolling 30d)</span>
                <span className="tick"><span className="dot" /><b>LATENCY</b> &lt;200ms avg</span>
                <span className="tick"><span className="dot" /><b>SECURITY</b> policy-first data</span>
                <span className="tick"><span className="dot" /><b>REGION</b> Africa-ready</span>
              </div>
            </div>
          </Reveal>

          <Reveal as="div" className="hero-right" delayMs={140}>
            <Parallax strength={10} className="hero-parallax">
              <div className="hero-panel" data-depth="0.55">
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

              <div className="hero-image-card" data-depth="1">
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
            </Parallax>
          </Reveal>
        </div>
      </section>

      {/* The rest of your sections unchanged */}
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
            <div className="card card--interactive card--platform">
              <div className="card-rail" aria-hidden="true" />
              <p className="card-tag">Platform · Finance</p>
              <h3 className="card-title">Gorilla Ledger™</h3>
              <p className="card-text">
                Enterprise-grade financial tracking infrastructure engineered for secure transaction
                management, structured reporting, and scalable analytics.
              </p>
              <p className="card-meta">Deployment: Cloud • Roadmap: Multi-tenant • Security: RLS-ready</p>

              <div className="card-hover">
                <div className="card-metrics">
                  <div className="cm">
                    <span className="cm-k">Security</span>
                    <span className="cm-v">RLS-ready</span>
                  </div>
                  <div className="cm">
                    <span className="cm-k">Data</span>
                    <span className="cm-v">PostgreSQL</span>
                  </div>
                  <div className="cm">
                    <span className="cm-k">Mode</span>
                    <span className="cm-v">Build + Operate</span>
                  </div>
                </div>
              </div>

              <div className="card-actions">
                <Link href="/platforms/gorilla-ledger" className="btn btn-ghost btn-sm card-cta">
                  View platform
                </Link>
              </div>
            </div>

            <div className="card card--interactive card--platform">
              <div className="card-rail" aria-hidden="true" />
              <p className="card-tag">Platform · Market Intelligence</p>
              <h3 className="card-title">FX Intelligence Engine</h3>
              <p className="card-text">
                Multi-currency monitoring and analytics delivering clean visualisation, trend insights,
                and reporting workflows for institutions and analysts.
              </p>
              <p className="card-meta">Deployment: Cloud • Data: Time-series • UX: Command-center dashboards</p>

              <div className="card-hover">
                <div className="card-metrics">
                  <div className="cm">
                    <span className="cm-k">Data</span>
                    <span className="cm-v">Time-series</span>
                  </div>
                  <div className="cm">
                    <span className="cm-k">Insight</span>
                    <span className="cm-v">Trend + signals</span>
                  </div>
                  <div className="cm">
                    <span className="cm-k">UX</span>
                    <span className="cm-v">Command-center</span>
                  </div>
                </div>
              </div>

              <div className="card-actions">
                <Link href="/platforms/fx-intelligence" className="btn btn-ghost btn-sm card-cta">
                  View platform
                </Link>
              </div>
            </div>

            <div className="card card--interactive card--platform">
              <div className="card-rail" aria-hidden="true" />
              <p className="card-tag">Platform · Systems</p>
              <h3 className="card-title">Custom Enterprise Systems</h3>
              <p className="card-text">
                Purpose-built platforms tailored to institutional needs — reporting dashboards, internal
                tools, secure data hubs, and operational systems.
              </p>
              <p className="card-meta">Model: Build + Operate • Security: Access control • Support: SLA options</p>

              <div className="card-hover">
                <div className="card-metrics">
                  <div className="cm">
                    <span className="cm-k">Delivery</span>
                    <span className="cm-v">Institutional</span>
                  </div>
                  <div className="cm">
                    <span className="cm-k">Access</span>
                    <span className="cm-v">Role-based</span>
                  </div>
                  <div className="cm">
                    <span className="cm-k">Support</span>
                    <span className="cm-v">SLA options</span>
                  </div>
                </div>
              </div>

              <div className="card-actions">
                <Link href="/enterprise" className="btn btn-ghost btn-sm card-cta">
                  Explore enterprise
                </Link>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="section section--cta">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Ready to build secure digital infrastructure?</h2>
            <p className="section-text">
              Tell us what you’re trying to build. We’ll propose an architecture, delivery plan, and the
              operational model to run it properly.
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
