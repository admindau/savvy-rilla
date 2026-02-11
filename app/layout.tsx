// app/layout.tsx
import type { Metadata } from 'next';
import './globals.css';
import Image from 'next/image';
import Link from 'next/link';
import Script from 'next/script';

export const metadata: Metadata = {
  title: 'Savvy Rilla Technologies',
  description:
    'Savvy Rilla Technologies is a digital infrastructure and systems engineering company building secure, scalable platforms for institutions and enterprises across Africa.',
  metadataBase: new URL('https://savvyrilla.tech'),
  openGraph: {
    title: 'Savvy Rilla Technologies',
    description:
      'Powering secure digital infrastructure across Africa. Platforms, enterprise engineering, and managed technology services.',
    url: 'https://savvyrilla.tech',
    siteName: 'Savvy Rilla Technologies',
    images: [
      {
        url: '/og-savvy.png',
        width: 1200,
        height: 630,
        alt: 'Savvy Rilla Technologies – Powering secure digital infrastructure across Africa.',
      },
    ],
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Savvy Rilla Technologies',
    description:
      'Powering secure digital infrastructure across Africa. Platforms, enterprise engineering, and managed technology services.',
    images: ['/og-savvy.png'],
  },
};

function Nav() {
  return (
    <header className="site-header">
      <div className="container nav">
        <Link href="/" className="brand" aria-label="Savvy Rilla Technologies home">
          <span className="brand-mark">
            <Image
              src="/logo-white.png"
              alt="Savvy Rilla Technologies logo"
              width={40}
              height={40}
              priority
            />
          </span>
          <span className="brand-text">
            <span className="brand-title">Savvy Rilla</span>
            <span className="brand-subtitle">Technologies</span>
          </span>
        </Link>

        <nav className="nav-links" aria-label="Primary navigation">
          <Link href="/platforms">Platforms</Link>
          <Link href="/enterprise">Enterprise</Link>
          <Link href="/infrastructure">Infrastructure</Link>
          <Link href="/industries">Industries</Link>
          <Link href="/insights">Insights</Link>
          <Link href="/company">Company</Link>
          <Link href="/contact" className="nav-cta">
            Request consultation
          </Link>
        </nav>
      </div>
    </header>
  );
}

function Footer() {
  return (
    <footer className="site-footer">
      <div className="container footer">
        <div className="footer-top">
          <div className="footer-brand">
            <div className="footer-brand-row">
              <Image src="/logo-white.png" width={34} height={34} alt="Savvy Rilla" />
              <div>
                <div className="footer-brand-title">Savvy Rilla Technologies</div>
                <div className="footer-brand-subtitle">
                  Digital Infrastructure · Systems Engineering
                </div>
              </div>
            </div>

            <p className="footer-blurb">
              We design, build, and operate secure technology platforms for financial institutions,
              governments, and organisations — engineered for real-world African constraints.
            </p>

            <div className="footer-badges">
              <span className="footer-badge">Security-first</span>
              <span className="footer-badge">API-first</span>
              <span className="footer-badge">Operational support</span>
            </div>

            {/* Infra credibility blocks */}
            <div className="footer-infra">
              <div className="infra-block">
                <div className="infra-title">Compliance &amp; Security</div>
                <div className="infra-text">
                  Policy-first data • Access control • Audit-ready foundations
                </div>
              </div>

              <div className="infra-block">
                <div className="infra-title">Operational Coverage</div>
                <div className="infra-text">
                  East Africa focus • Multi-region deployments • Remote support
                </div>
              </div>

              <div className="infra-block">
                <div className="infra-title">Support Model</div>
                <div className="infra-text">
                  SLA options • Incident response • Scheduled maintenance windows
                </div>
              </div>

              <div className="infra-block">
                <div className="infra-title">Status</div>
                <div className="infra-text">
                  <Link className="footer-link inline" href="/status">
                    Status page
                  </Link>
                  <span className="sep">•</span>
                  <Link className="footer-link inline" href="/contact">
                    Support
                  </Link>
                </div>
              </div>
            </div>
          </div>

          <div className="footer-links">
            <div className="footer-col">
              <div className="footer-col-title">Company</div>
              <Link className="footer-link" href="/company">About</Link>
              <Link className="footer-link" href="/insights">Insights</Link>
              <Link className="footer-link" href="/contact">Contact</Link>
              <Link className="footer-link" href="/status">Status</Link>
            </div>

            <div className="footer-col">
              <div className="footer-col-title">Services</div>
              <Link className="footer-link" href="/enterprise">Enterprise Engineering</Link>
              <Link className="footer-link" href="/infrastructure">Infrastructure</Link>
              <Link className="footer-link" href="/industries">Industries</Link>
            </div>

            <div className="footer-col">
              <div className="footer-col-title">Platforms</div>
              <Link className="footer-link" href="/platforms">Platforms</Link>
              <Link className="footer-link" href="/platforms/gorilla-ledger">Gorilla Ledger™</Link>
              <Link className="footer-link" href="/platforms/fx-intelligence">FX Intelligence</Link>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <div className="footer-meta">
            <span className="footer-meta-item">Juba, South Sudan</span>
            <span className="footer-meta-dot" aria-hidden="true" />
            <span className="footer-meta-item">hello@savvyrilla.tech</span>
            <span className="footer-meta-dot" aria-hidden="true" />
            <span className="footer-meta-item">© {new Date().getFullYear()} Savvy Rilla</span>
          </div>

          <Link className="footer-cta" href="/contact">
            Request consultation
          </Link>
        </div>
      </div>
    </footer>
  );
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        {/* Performance polish: auto-reduce motion on low-end devices */}
        <Script
          id="low-power-detect"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{
            __html: `
(function(){
  try {
    var nav = navigator || {};
    var conn = nav.connection || nav.mozConnection || nav.webkitConnection;
    var saveData = !!(conn && conn.saveData);
    var mem = nav.deviceMemory || 0;
    var cores = nav.hardwareConcurrency || 0;

    // conservative thresholds
    var lowPower = saveData || (mem && mem <= 4) || (cores && cores <= 4);
    if (lowPower) document.documentElement.classList.add('low-power');
  } catch (e) {}
})();`,
          }}
        />

        <div className="site-bg" aria-hidden="true">
          <div className="site-grid" />
          <div className="site-vignette" />
        </div>

        <div className="site">
          <Nav />
          {/* Let pages control their own containers for full-bleed sections */}
          <main className="site-main">{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
