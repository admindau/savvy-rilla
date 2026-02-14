// app/page.tsx
import Link from "next/link";
import Image from "next/image";
import Reveal from "@/components/reveal";
import Parallax from "@/components/parallax";
import Hero3DLoader from "@/components/hero-3d-loader";

export default function HomePage() {
  return (
    <div className="page">
      {/* HERO */}
      <section className="hero hero--matrix">
        <div className="hero-bg" aria-hidden="true">
          {/* Stars + 3D Logo (pure stars + 3D logo, no Earth) */}
          <Hero3DLoader
            className="hero-visual"
            src="/srt-logo.svg"
            scale={0.98}
            depth={0.22}
          />
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

            <div className="ticker-wrap" aria-label="Operational status ticker">
              <div className="ticker-fade ticker-fade-left" aria-hidden="true" />
              <div className="ticker-fade ticker-fade-right" aria-hidden="true" />
              <div className="ticker-track" aria-hidden="true">
                <span className="tick">
                  <span className="dot" aria-hidden="true" /> <b>UPTIME</b> 99.9% target
                </span>
                <span className="tick">
                  <span className="dot" aria-hidden="true" /> <b>INCIDENTS</b> 0 (rolling 30d)
                </span>
                <span className="tick">
                  <span className="dot" aria-hidden="true" /> <b>LATENCY</b> &lt;200ms avg
                </span>
                <span className="tick">
                  <span className="dot" aria-hidden="true" /> <b>SECURITY</b> policy-first data
                </span>
                <span className="tick">
                  <span className="dot" aria-hidden="true" /> <b>REGION</b> Africa-ready
                </span>
                <span className="tick">
                  <span className="dot" aria-hidden="true" /> <b>DEPLOY</b>{" "}
                  gorillaledger.savvyrilla.tech
                </span>

                {/* duplicate for seamless loop */}
                <span className="tick">
                  <span className="dot" aria-hidden="true" /> <b>UPTIME</b> 99.9% target
                </span>
                <span className="tick">
                  <span className="dot" aria-hidden="true" /> <b>INCIDENTS</b> 0 (rolling 30d)
                </span>
                <span className="tick">
                  <span className="dot" aria-hidden="true" /> <b>LATENCY</b> &lt;200ms avg
                </span>
                <span className="tick">
                  <span className="dot" aria-hidden="true" /> <b>SECURITY</b> policy-first data
                </span>
                <span className="tick">
                  <span className="dot" aria-hidden="true" /> <b>REGION</b> Africa-ready
                </span>
                <span className="tick">
                  <span className="dot" aria-hidden="true" /> <b>DEPLOY</b>{" "}
                  gorillaledger.savvyrilla.tech
                </span>
              </div>
            </div>
          </Reveal>

          {/* HERO RIGHT: Command panel + image (parallax restored) */}
          <Reveal as="div" className="hero-right" delayMs={140}>
            <Parallax strength={10} className="hero-parallax">
              {/* panel: moves less (deeper) */}
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

              {/* image: moves more (closer) */}
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
              <p className="card-meta">Signals: Live rates • Analytics: Trends • Output: Reporting</p>

              <div className="card-hover">
                <div className="card-metrics">
                  <div className="cm">
                    <span className="cm-k">Latency</span>
                    <span className="cm-v">&lt;200ms</span>
                  </div>
                  <div className="cm">
                    <span className="cm-k">Modes</span>
                    <span className="cm-v">Charts + API</span>
                  </div>
                  <div className="cm">
                    <span className="cm-k">Coverage</span>
                    <span className="cm-v">Multi-currency</span>
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
              <p className="card-tag">Platform · Infrastructure</p>
              <h3 className="card-title">Managed Systems</h3>
              <p className="card-text">
                Production-grade deployment, monitoring, incident response, and optimisation for critical
                systems — with security and uptime as first-class constraints.
              </p>
              <p className="card-meta">SLA options • Observability • Hardening • Continuous improvement</p>

              <div className="card-hover">
                <div className="card-metrics">
                  <div className="cm">
                    <span className="cm-k">Ops</span>
                    <span className="cm-v">24/7 ready</span>
                  </div>
                  <div className="cm">
                    <span className="cm-k">Infra</span>
                    <span className="cm-v">Multi-region</span>
                  </div>
                  <div className="cm">
                    <span className="cm-k">Security</span>
                    <span className="cm-v">Defense-in-depth</span>
                  </div>
                </div>
              </div>

              <div className="card-actions">
                <Link href="/infrastructure" className="btn btn-ghost btn-sm card-cta">
                  View platform
                </Link>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
