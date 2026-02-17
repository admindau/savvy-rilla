import Link from "next/link";

import Hero3DLoader from "@/components/hero-3d-loader";
import Parallax from "@/components/parallax";
import Reveal from "@/components/reveal";

export default function Page() {
  return (
    <main className="page">
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
                We build institutional-grade systems for organizations in South Sudan — engineered for
                stability, security, and real operational constraints.
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

              {/* Dashboard depth/tilt restored */}
              <Reveal className="hero-image-card" delay={0.16}>
                <Parallax className="hero-image-parallax" strength={8} hoverScale={1.02}>
                  <div
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
                    />

                    {/* Depth layers */}
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
                        opacity: 0.25,
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

      {/* Mission Briefing — Narrative Architecture */}
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

      {/* The rest of your sections remain unchanged below this point */}
      {/* ... */}
    </main>
  );
}
