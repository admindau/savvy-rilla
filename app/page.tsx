// app/page.tsx
import Link from 'next/link';
import Image from 'next/image';
import Reveal from '@/components/reveal';
import Parallax from '@/components/parallax';

export default function HomePage() {
  return (
    <div className="page">
      {/* HERO */}
      <section className="hero hero--cinema">
        {/* Optional background image layer (add file to /public if you want) */}
        <div className="hero-bg" aria-hidden="true">
          <Image
            src="/hero-space-earth.png"
            alt=""
            fill
            className="hero-bg-img hero-bg-img--cinema"
            priority
          />
          <div className="hero-cinema-overlay" />
          <div className="hero-cinema-grid" />
        </div>

        <div className="container hero-grid">
          <Reveal as="div" className="hero-left" delayMs={0}>
            <p className="hero-kicker">Savvy Rilla Technologies</p>

            <h1 className="hero-main-title hero-main-title--provider">
              Powering Secure Digital Infrastructure Across Africa
            </h1>

            <p className="hero-subtitle">
              We design, build, and operate secure platforms for financial institutions, governments, and
              enterprises — engineered for African constraints and global standards.
            </p>

            <div className="hero-ctas">
              <Link href="/platforms" className="btn btn-primary">
                Explore Platforms
              </Link>
              <Link href="/contact" className="btn btn-ghost">
                Request consultation
              </Link>
            </div>

            <div className="hero-meta">
              <div className="meta-pill">
                <span className="meta-label">NODE</span>
                <span className="meta-value">ORBIT-AFRICA</span>
              </div>
              <div className="meta-pill">
                <span className="meta-label">STATUS</span>
                <span className="meta-value">OPERATIONAL</span>
              </div>
              <div className="meta-pill">
                <span className="meta-label">SECURITY</span>
                <span className="meta-value">HARDENED</span>
              </div>
            </div>
          </Reveal>

          <Parallax className="hero-right" strength={9}>
            <div className="hero-panel" data-depth="0.9">
              <div className="hero-panel-head">
                <div className="hero-panel-brand">
                  <div>
                    <p className="hero-panel-title">SYSTEM STATUS</p>
                    <p className="hero-panel-subtitle">Live operational snapshot</p>
                  </div>
                </div>
                <span className="hero-panel-badge">LIVE</span>
              </div>

              <div className="hero-metrics">
                <div className="metric">
                  <p className="metric-label">Uptime target</p>
                  <p className="metric-value">99.9%</p>
                </div>
                <div className="metric">
                  <p className="metric-label">Incident rate</p>
                  <p className="metric-value">0 (30d)</p>
                </div>
                <div className="metric">
                  <p className="metric-label">Latency (p95)</p>
                  <p className="metric-value">187ms</p>
                </div>
                <div className="metric">
                  <p className="metric-label">Deploy cadence</p>
                  <p className="metric-value">Weekly</p>
                </div>
              </div>

              <p className="hero-panel-note">
                <Link href="/status">View status</Link> · <Link href="/platforms">View platforms</Link>
              </p>
            </div>

            <div className="hero-panel" data-depth="0.6">
              <div className="hero-panel-head">
                <div className="hero-panel-brand">
                  <div>
                    <p className="hero-panel-title">DEPLOYMENTS</p>
                    <p className="hero-panel-subtitle">Recent system updates</p>
                  </div>
                </div>
                <span className="hero-panel-badge hero-panel-badge--muted">SYNC</span>
              </div>

              <ul className="deployments">
                <li>
                  <span className="d-dot" /> API gateway deployed <span className="d-time">2h</span>
                </li>
                <li>
                  <span className="d-dot" /> Security rules updated <span className="d-time">1d</span>
                </li>
                <li>
                  <span className="d-dot" /> Observability tuned <span className="d-time">3d</span>
                </li>
                <li>
                  <span className="d-dot" /> Maintenance window scheduled <span className="d-time">7d</span>
                </li>
              </ul>
            </div>
          </Parallax>
        </div>
      </section>

      {/* OPERATIONAL OVERVIEW */}
      <section className="section">
        <div className="container">
          <Reveal as="div" className="section-head">
            <h2 className="section-title">Operational Overview</h2>
            <p className="section-subtitle">
              A systems-first engineering approach — designed for reliability, security, and real-world constraints.
            </p>
          </Reveal>

          <div className="grid grid-4">
            <Reveal className="card" delayMs={0}>
              <div className="card-title">Active platforms</div>
              <div className="card-value">3+</div>
              <div className="card-note">Production systems</div>
            </Reveal>

            <Reveal className="card" delayMs={60}>
              <div className="card-title">Systems deployed</div>
              <div className="card-value">25+</div>
              <div className="card-note">Enterprise modules</div>
            </Reveal>

            <Reveal className="card" delayMs={120}>
              <div className="card-title">Avg response time</div>
              <div className="card-value">~200ms</div>
              <div className="card-note">Optimized APIs</div>
            </Reveal>

            <Reveal className="card" delayMs={180}>
              <div className="card-title">Uptime target</div>
              <div className="card-value">99.9%</div>
              <div className="card-note">SLA-ready</div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* PLATFORMS */}
      <section className="section">
        <div className="container">
          <Reveal as="div" className="section-head">
            <h2 className="section-title">Technology Platforms</h2>
            <p className="section-subtitle">
              Purpose-built platforms under the Savvy Gorilla ecosystem — engineered for scale and operational clarity.
            </p>
          </Reveal>

          <div className="grid grid-3">
            <Reveal className="card card--platform" delayMs={0}>
              <div className="card-top">
                <div className="card-title">Gorilla Ledger™</div>
                <div className="chip">Finance</div>
              </div>
              <p className="card-desc">
                Modern financial tracking built for institutional workflows — wallets, transactions, budgets, recurring
                automation, and analytics.
              </p>
              <Link href="/platforms/gorilla-ledger" className="card-link">
                View platform →
              </Link>
            </Reveal>

            <Reveal className="card card--platform" delayMs={90}>
              <div className="card-top">
                <div className="card-title">FX Intelligence Engine</div>
                <div className="chip chip--alt">Markets</div>
              </div>
              <p className="card-desc">
                Multi-currency market insights, dashboards, and automated reporting — built for local realities with
                global-grade observability.
              </p>
              <Link href="/platforms/fx-intelligence" className="card-link">
                View platform →
              </Link>
            </Reveal>

            <Reveal className="card card--platform" delayMs={180}>
              <div className="card-top">
                <div className="card-title">Custom Enterprise Systems</div>
                <div className="chip chip--muted">Build</div>
              </div>
              <p className="card-desc">
                Bespoke portals, workflow systems, and secure backends — designed and delivered with a systems
                engineering mindset.
              </p>
              <Link href="/contact" className="card-link">
                Request build →
              </Link>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ENTERPRISE ENGINEERING */}
      <section className="section">
        <div className="container">
          <Reveal as="div" className="section-head">
            <h2 className="section-title">Enterprise Engineering</h2>
            <p className="section-subtitle">
              Architecture, delivery, and operational support that makes complex systems reliable — end to end.
            </p>
          </Reveal>

          <div className="grid grid-3">
            <Reveal className="card" delayMs={0}>
              <div className="card-title">Architecture</div>
              <p className="card-desc">
                Security-first design, API contracts, data models, and operational patterns built for real-world usage.
              </p>
            </Reveal>

            <Reveal className="card" delayMs={90}>
              <div className="card-title">Engineering</div>
              <p className="card-desc">
                Modern full-stack delivery — Next.js, Supabase, cloud infrastructure, and hardened integrations.
              </p>
            </Reveal>

            <Reveal className="card" delayMs={180}>
              <div className="card-title">Security</div>
              <p className="card-desc">
                Access control, auditing foundations, policy-first data design, and practical security posture.
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* INDUSTRIES */}
      <section className="section">
        <div className="container">
          <Reveal as="div" className="section-head">
            <h2 className="section-title">Industries</h2>
            <p className="section-subtitle">
              We build for institutions that require trust, operational clarity, and security.
            </p>
          </Reveal>

          <div className="grid grid-4">
            <Reveal className="card card--compact" delayMs={0}>
              <div className="card-title">Banking</div>
              <div className="card-note">Core + support systems</div>
            </Reveal>
            <Reveal className="card card--compact" delayMs={60}>
              <div className="card-title">Government</div>
              <div className="card-note">Digital services</div>
            </Reveal>
            <Reveal className="card card--compact" delayMs={120}>
              <div className="card-title">Telecom</div>
              <div className="card-note">APIs + platforms</div>
            </Reveal>
            <Reveal className="card card--compact" delayMs={180}>
              <div className="card-title">NGOs</div>
              <div className="card-note">Workflow automation</div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* INFRASTRUCTURE */}
      <section className="section">
        <div className="container">
          <Reveal as="div" className="section-head">
            <h2 className="section-title">Infrastructure &amp; Managed Services</h2>
            <p className="section-subtitle">
              Operational reliability, observability, and delivery discipline — so systems stay healthy.
            </p>
          </Reveal>

          <div className="grid grid-3">
            <Reveal className="card" delayMs={0}>
              <div className="card-title">Cloud Deployments</div>
              <p className="card-desc">
                Automated deployments, scalable infrastructure patterns, and multi-region readiness.
              </p>
            </Reveal>

            <Reveal className="card" delayMs={90}>
              <div className="card-title">Observability</div>
              <p className="card-desc">
                Metrics, logs, tracing, and alerts — built into platforms from day one.
              </p>
            </Reveal>

            <Reveal className="card" delayMs={180}>
              <div className="card-title">Ops Support</div>
              <p className="card-desc">
                Incident response, maintenance planning, and SLA options designed for institutional needs.
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ARCHITECTURE */}
      <section className="section">
        <div className="container">
          <Reveal as="div" className="section-head">
            <h2 className="section-title">Tech Architecture</h2>
            <p className="section-subtitle">
              A modern stack with security controls and operational maturity.
            </p>
          </Reveal>

          <div className="grid grid-4">
            <Reveal className="card card--compact" delayMs={0}>
              <div className="card-title">Next.js</div>
              <div className="card-note">App Router</div>
            </Reveal>
            <Reveal className="card card--compact" delayMs={60}>
              <div className="card-title">Supabase</div>
              <div className="card-note">Auth + DB</div>
            </Reveal>
            <Reveal className="card card--compact" delayMs={120}>
              <div className="card-title">Vercel</div>
              <div className="card-note">Deployments</div>
            </Reveal>
            <Reveal className="card card--compact" delayMs={180}>
              <div className="card-title">RLS</div>
              <div className="card-note">Policy-first</div>
            </Reveal>
          </div>
        </div>
      </section>
    </div>
  );
}
