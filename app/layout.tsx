// app/layout.tsx
import type { Metadata } from 'next';
import './globals.css';
import Image from 'next/image';
import Link from 'next/link';

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
      <div className="container footer-content">
        <div>
          <p className="footer-title">Savvy Rilla Technologies</p>
          <p className="footer-text">
            Powering secure digital infrastructure across Africa — platforms, enterprise engineering,
            and managed technology services.
          </p>
        </div>

        <div className="footer-meta">
          <div className="footer-links">
            <div className="footer-col">
              <p className="footer-col-title">Platforms</p>
              <Link href="/platforms" className="footer-link">
                Overview
              </Link>
              <Link href="/platforms/gorilla-ledger" className="footer-link">
                Gorilla Ledger™
              </Link>
              <Link href="/platforms/fx-intelligence" className="footer-link">
                FX Intelligence Engine
              </Link>
            </div>

            <div className="footer-col">
              <p className="footer-col-title">Enterprise</p>
              <Link href="/enterprise" className="footer-link">
                Systems engineering
              </Link>
              <Link href="/infrastructure" className="footer-link">
                Managed services
              </Link>
              <Link href="/industries" className="footer-link">
                Industries
              </Link>
            </div>

            <div className="footer-col">
              <p className="footer-col-title">Company</p>
              <Link href="/company" className="footer-link">
                About
              </Link>
              <Link href="/insights" className="footer-link">
                Insights
              </Link>
              <Link href="/contact" className="footer-link">
                Contact
              </Link>
            </div>
          </div>

          <p className="footer-text">
            Based in Juba, South Sudan. Working with partners across Africa and beyond.
          </p>
          <p className="footer-text footer-copy">
            © {new Date().getFullYear()} Savvy Rilla Technologies. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
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
