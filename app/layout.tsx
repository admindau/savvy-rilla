// app/layout.tsx
import type { Metadata } from 'next';
import './globals.css';
import Image from 'next/image';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Savvy Gorilla Technologies',
  description:
    'Savvy Gorilla Technologies builds modern web apps, storytelling products, and strategic communication for organisations and creators in South Sudan and across Africa.',
};

function Nav() {
  return (
    <header className="site-header">
      <div className="container nav">
        <Link href="/" className="brand">
          <span className="brand-mark">
            <Image
              src="/logo-white.png"
              alt="Savvy Gorilla Technologies logo"
              width={40}
              height={40}
            />
          </span>
          <span className="brand-text">
            <span className="brand-title">Savvy Gorilla</span>
            <span className="brand-subtitle">Technologies</span>
          </span>
        </Link>
        <nav className="nav-links">
          <Link href="/services">Services</Link>
          <Link href="/studios">Studios &amp; Projects</Link>
          <Link href="/about">About</Link>
          <Link href="/contact" className="nav-cta">
            Contact
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
          <p className="footer-title">Savvy Gorilla Technologies</p>
          <p className="footer-text">
            Building African tech, stories, and strategy — from Juba to the world.
          </p>
        </div>
        <div className="footer-meta">
          <p className="footer-text">
            Based in Juba, South Sudan. Working with partners across Africa and beyond.
          </p>
          <p className="footer-text footer-copy">
            © {new Date().getFullYear()} Savvy Gorilla Technologies. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <div className="site">
          <Nav />
          <main className="site-main">
            <div className="container">{children}</div>
          </main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
