'use client';

// app/page.tsx
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Reveal from '@/components/reveal';
import Parallax from '@/components/parallax';

export default function HomePage() {
  const sections = useMemo(
    () => [
      { id: 'hero', label: 'Hero' },
      { id: 'overview', label: 'Overview' },
      { id: 'platforms', label: 'Platforms' },
      { id: 'enterprise', label: 'Enterprise' },
      { id: 'industries', label: 'Industries' },
      { id: 'infrastructure', label: 'Infrastructure' },
      { id: 'architecture', label: 'Architecture' },
    ],
    []
  );

  const [progress, setProgress] = useState(0);
  const [activeId, setActiveId] = useState<string>('hero');

  const scrollToId = useCallback((id: string) => {
    const el = document.getElementById(id);
    if (!el) return;
    el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }, []);

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const lowPower = document.documentElement.classList.contains('low-power');

    const onScroll = () => {
      const doc = document.documentElement;
      const scrollTop = doc.scrollTop || document.body.scrollTop;
      const scrollHeight = doc.scrollHeight - doc.clientHeight;
      const p = scrollHeight > 0 ? scrollTop / scrollHeight : 0;
      setProgress(Math.max(0, Math.min(1, p)));
    };

    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });

    let io: IntersectionObserver | null = null;
    if (!prefersReduced && !lowPower && 'IntersectionObserver' in window) {
      io = new IntersectionObserver(
        (entries) => {
          const visible = entries
            .filter((e) => e.isIntersecting)
            .sort((a, b) => (b.intersectionRatio ?? 0) - (a.intersectionRatio ?? 0));
          if (visible[0]?.target?.id) setActiveId((visible[0].target as HTMLElement).id);
        },
        { root: null, threshold: 0.35 }
      );

      for (const s of sections) {
        const el = document.getElementById(s.id);
        if (el) io.observe(el);
      }
    }

    return () => {
      window.removeEventListener('scroll', onScroll);
      if (io) io.disconnect();
    };
  }, [sections]);

  return (

    <div className="page">
      {/* Phase B: Scroll HUD */}
      <div className="scroll-progress" aria-hidden="true">
        <div className="scroll-progress-bar" style={{ transform: `scaleX(${progress})` }} />
      </div>

      <nav className="scroll-rail" aria-label="Section navigation">
        {sections.map((s) => (
          <button
            key={s.id}
            type="button"
            className={`rail-dot ${activeId === s.id ? 'is-active' : ''}`}
            onClick={() => scrollToId(s.id)}
            aria-label={s.label}
            aria-current={activeId === s.id ? 'true' : undefined}
          />
        ))}
      </nav>
      {/* HERO */}
      <section id="hero" className="hero hero--orbital" data-section="Hero">
        {/* Optional background image layer (add file to /public if you want) */}
        <div className="hero-bg" aria-hidden="true">
          <div className="hero-orbit" />
          <div className="hero-stars" />
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
            <div className="hero-panel hud-panel hud-panel--interactive" data-depth="0.9">
              <div className="panel-header">
                <div className="panel-title">SYSTEM STATUS</div>
                <div className="panel-chip">LIVE</div>
              </div>

              <div className="panel-stats">
                <div className="stat">
                  <div className="stat-label">Uptime target</div>
                  <div className="stat-value">99.9%</div>
                </div>
                <div className="stat">
                  <div className="stat-label">Incident rate</div>
                  <div className="stat-value">0 (30d)</div>
                </div>
                <div className="stat">
                  <div className="stat-label">Latency (p95)</div>
                  <div className="stat-value">187ms</div>
                </div>
                <div className="stat">
                  <div className="stat-label">Deploy cadence</div>
                  <div className="stat-value">Weekly</div>
                </div>
              </div>

              <div className="panel-divider" />

              <div className="panel-links">
                <Link className="panel-link" href="/status">
                  View status
                </Link>
                <Link className="panel-link" href="/platforms">
                  View platforms
                </Link>
              </div>
            </div>

            <div className="hero-panel hero-panel--alt hud-panel hud-panel--interactive" data-depth="0.6">
              <div className="panel-header">
                <div className="panel-title">DEPLOYMENTS</div>
                <div className="panel-chip panel-chip--muted">SYNC</div>
              </div>

              <div className="panel-list">
                <div className="panel-row">
                  <span className="dot dot--ok" />
                  <span className="row-text">API gateway deployed</span>
                  <span className="row-time">2h</span>
                </div>
                <div className="panel-row">
                  <span className="dot dot--ok" />
                  <span className="row-text">Security rules updated</span>
                  <span className="row-time">1d</span>
                </div>
                <div className="panel-row">
                  <span className="dot dot--ok" />
                  <span className="row-text">Observability tuned</span>
                  <span className="row-time">3d</span>
                </div>
                <div className="panel-row">
                  <span className="dot dot--warn" />
                  <span className="row-text">Maintenance window scheduled</span>
                  <span className="row-time">7d</span>
                </div>
              </div>
            </div>
          </Parallax>
        </div>
      </section>

      {/* OPERATIONAL OVERVIEW */}
      <section id="overview" className="section" data-section="Overview">
        <div className="container">
          <Reveal as="div" className="section-head">
            <h2 className="section-title">Operational Overview</h2>
            <p className="section-subtitle">
              A systems-first engineering approach — designed for reliability, security, and real-world constraints.
            </p>
          </Reveal>

          <div className="grid grid-4">
            <Reveal className="card card--interactive" delayMs={0}>
              <div className="card card--interactive-title">Active platforms</div>
              <div className="card card--interactive-value">3+</div>
              <div className="card card--interactive-note">Production systems</div>
            </Reveal>

            <Reveal className="card card--interactive" delayMs={60}>
              <div className="card card--interactive-title">Systems deployed</div>
              <div className="card card--interactive-value">25+</div>
              <div className="card card--interactive-note">Enterprise modules</div>
            </Reveal>

            <Reveal className="card card--interactive" delayMs={120}>
              <div className="card card--interactive-title">Avg response time</div>
              <div className="card card--interactive-value">~200ms</div>
              <div className="card card--interactive-note">Optimized APIs</div>
            </Reveal>

            <Reveal className="card card--interactive" delayMs={180}>
              <div className="card card--interactive-title">Uptime target</div>
              <div className="card card--interactive-value">99.9%</div>
              <div className="card card--interactive-note">SLA-ready</div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* PLATFORMS */}
      <section id="platforms" className="section" data-section="Platforms">
        <div className="container">
          <Reveal as="div" className="section-head">
            <h2 className="section-title">Technology Platforms</h2>
            <p className="section-subtitle">
              Purpose-built platforms under the Savvy Gorilla ecosystem — engineered for scale and operational clarity.
            </p>
          </Reveal>

          <div className="grid grid-3">
            <Reveal className="card card--interactive card--platform" delayMs={0}>
              <div className="card card--interactive-top">
                <div className="card card--interactive-title">Gorilla Ledger™</div>
                <div className="chip">Finance</div>
              </div>
              <p className="card card--interactive-desc">
                Modern financial tracking built for institutional workflows — wallets, transactions, budgets, recurring
                automation, and analytics.
              </p>
              <Link href="/platforms/gorilla-ledger" className="card card--interactive-link">
                View platform →
              </Link>
            </Reveal>

            <Reveal className="card card--interactive card--platform" delayMs={90}>
              <div className="card card--interactive-top">
                <div className="card card--interactive-title">FX Intelligence Engine</div>
                <div className="chip chip--alt">Markets</div>
              </div>
              <p className="card card--interactive-desc">
                Multi-currency market insights, dashboards, and automated reporting — built for local realities with
                global-grade observability.
              </p>
              <Link href="/platforms/fx-intelligence" className="card card--interactive-link">
                View platform →
              </Link>
            </Reveal>

            <Reveal className="card card--interactive card--platform" delayMs={180}>
              <div className="card card--interactive-top">
                <div className="card card--interactive-title">Custom Enterprise Systems</div>
                <div className="chip chip--muted">Build</div>
              </div>
              <p className="card card--interactive-desc">
                Bespoke portals, workflow systems, and secure backends — designed and delivered with a systems
                engineering mindset.
              </p>
              <Link href="/contact" className="card card--interactive-link">
                Request build →
              </Link>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ENTERPRISE ENGINEERING */}
      <section id="enterprise" className="section" data-section="Enterprise">
        <div className="container">
          <Reveal as="div" className="section-head">
            <h2 className="section-title">Enterprise Engineering</h2>
            <p className="section-subtitle">
              Architecture, delivery, and operational support that makes complex systems reliable — end to end.
            </p>
          </Reveal>

          <div className="grid grid-3">
            <Reveal className="card card--interactive" delayMs={0}>
              <div className="card card--interactive-title">Architecture</div>
              <p className="card card--interactive-desc">
                Security-first design, API contracts, data models, and operational patterns built for real-world usage.
              </p>
            </Reveal>

            <Reveal className="card card--interactive" delayMs={90}>
              <div className="card card--interactive-title">Engineering</div>
              <p className="card card--interactive-desc">
                Modern full-stack delivery — Next.js, Supabase, cloud infrastructure, and hardened integrations.
              </p>
            </Reveal>

            <Reveal className="card card--interactive" delayMs={180}>
              <div className="card card--interactive-title">Security</div>
              <p className="card card--interactive-desc">
                Access control, auditing foundations, policy-first data design, and practical security posture.
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* INDUSTRIES */}
      <section id="industries" className="section" data-section="Industries">
        <div className="container">
          <Reveal as="div" className="section-head">
            <h2 className="section-title">Industries</h2>
            <p className="section-subtitle">
              We build for institutions that require trust, operational clarity, and security.
            </p>
          </Reveal>

          <div className="grid grid-4">
            <Reveal className="card card--interactive card--compact" delayMs={0}>
              <div className="card card--interactive-title">Banking</div>
              <div className="card card--interactive-note">Core + support systems</div>
            </Reveal>
            <Reveal className="card card--interactive card--compact" delayMs={60}>
              <div className="card card--interactive-title">Government</div>
              <div className="card card--interactive-note">Digital services</div>
            </Reveal>
            <Reveal className="card card--interactive card--compact" delayMs={120}>
              <div className="card card--interactive-title">Telecom</div>
              <div className="card card--interactive-note">APIs + platforms</div>
            </Reveal>
            <Reveal className="card card--interactive card--compact" delayMs={180}>
              <div className="card card--interactive-title">NGOs</div>
              <div className="card card--interactive-note">Workflow automation</div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* INFRASTRUCTURE */}
      <section id="infrastructure" className="section" data-section="Infrastructure">
        <div className="container">
          <Reveal as="div" className="section-head">
            <h2 className="section-title">Infrastructure &amp; Managed Services</h2>
            <p className="section-subtitle">
              Operational reliability, observability, and delivery discipline — so systems stay healthy.
            </p>
          </Reveal>

          <div className="grid grid-3">
            <Reveal className="card card--interactive" delayMs={0}>
              <div className="card card--interactive-title">Cloud Deployments</div>
              <p className="card card--interactive-desc">
                Automated deployments, scalable infrastructure patterns, and multi-region readiness.
              </p>
            </Reveal>

            <Reveal className="card card--interactive" delayMs={90}>
              <div className="card card--interactive-title">Observability</div>
              <p className="card card--interactive-desc">
                Metrics, logs, tracing, and alerts — built into platforms from day one.
              </p>
            </Reveal>

            <Reveal className="card card--interactive" delayMs={180}>
              <div className="card card--interactive-title">Ops Support</div>
              <p className="card card--interactive-desc">
                Incident response, maintenance planning, and SLA options designed for institutional needs.
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ARCHITECTURE */}
      <section id="architecture" className="section" data-section="Architecture">
        <div className="container">
          <Reveal as="div" className="section-head">
            <h2 className="section-title">Tech Architecture</h2>
            <p className="section-subtitle">
              A modern stack with security controls and operational maturity.
            </p>
          </Reveal>

          <div className="grid grid-4">
            <Reveal className="card card--interactive card--compact" delayMs={0}>
              <div className="card card--interactive-title">Next.js</div>
              <div className="card card--interactive-note">App Router</div>
            </Reveal>
            <Reveal className="card card--interactive card--compact" delayMs={60}>
              <div className="card card--interactive-title">Supabase</div>
              <div className="card card--interactive-note">Auth + DB</div>
            </Reveal>
            <Reveal className="card card--interactive card--compact" delayMs={120}>
              <div className="card card--interactive-title">Vercel</div>
              <div className="card card--interactive-note">Deployments</div>
            </Reveal>
            <Reveal className="card card--interactive card--compact" delayMs={180}>
              <div className="card card--interactive-title">RLS</div>
              <div className="card card--interactive-note">Policy-first</div>
            </Reveal>
          </div>
        </div>
      </section>
    </div>
  );
}
