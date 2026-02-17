import "./globals.css";
import type { Metadata } from "next";
import Link from "next/link";
import Script from "next/script";

import CursorFX from "@/components/cursor-fx";

export const metadata: Metadata = {
  title: "Savvy Rilla Technologies",
  description: "Secure enterprise software for South Sudan.",
  metadataBase: new URL("https://www.savvyrilla.tech"),
  openGraph: {
    title: "Savvy Rilla Technologies",
    description: "Secure enterprise software for South Sudan.",
    url: "https://www.savvyrilla.tech",
    siteName: "Savvy Rilla Technologies",
    images: [{ url: "/og-savvy.png", width: 1200, height: 630 }],
    locale: "en_US",
    type: "website",
  },
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        {/* Header */}
        <header className="header">
          <div className="container header-inner">
            <Link className="brand" href="/">
              <img className="brand-mark" src="/logo-white.png" alt="Savvy Rilla" />
              <div className="brand-text">
                <div className="brand-name">SAVVY RILLA</div>
                <div className="brand-sub">TECHNOLOGIES</div>
              </div>
            </Link>

            <nav className="nav">
              <Link className="nav-link" href="/platforms">
                Platforms
              </Link>
              <Link className="nav-link" href="/enterprise">
                Enterprise
              </Link>
              <Link className="nav-link" href="/infrastructure">
                Infrastructure
              </Link>
              <Link className="nav-link" href="/industries">
                Industries
              </Link>
              <Link className="nav-link" href="/insights">
                Insights
              </Link>
              <Link className="nav-link" href="/company">
                Company
              </Link>
            </nav>

            <div className="header-cta">
              <Link className="nav-cta" href="/contact" data-cursor-magnet>
                Request consultation
              </Link>
            </div>
          </div>
        </header>

        {children}

        {/* Cursor FX (mounted globally) */}
        <CursorFX />

        {/* Optional analytics/scripts remain unchanged */}
        <Script id="noop" strategy="afterInteractive">
          {""}
        </Script>
      </body>
    </html>
  );
}
