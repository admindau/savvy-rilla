"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const navigation = [
  { href: "/products", label: "Products" },
  { href: "/capabilities", label: "Capabilities" },
  { href: "/company", label: "Company" },
  { href: "/insights", label: "Insights" },
];

export default function SiteHeader() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  function isCurrent(href: string) {
    return pathname === href || pathname.startsWith(`${href}/`);
  }

  return (
    <header className="site-header">
      <div className="shell nav-shell">
        <Link className="brand" href="/">
          <Image
            className="brand-mark"
            src="/logo-white.png"
            alt=""
            width={44}
            height={44}
            priority
          />
          <span className="brand-copy">
            <strong>Savvy Rilla</strong>
            <span>Technologies</span>
          </span>
        </Link>

        <nav className="desktop-nav" aria-label="Primary navigation">
          {navigation.map((item) => (
            <Link
              aria-current={isCurrent(item.href) ? "page" : undefined}
              className={isCurrent(item.href) ? "nav-link-active" : undefined}
              key={item.href}
              href={item.href}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <Link className="nav-contact" href="/contact">
          Start a conversation
          <span aria-hidden="true">↗</span>
        </Link>

        <div className="mobile-nav">
          <button
            aria-controls="mobile-navigation"
            aria-expanded={mobileOpen}
            aria-label={mobileOpen ? "Close navigation" : "Open navigation"}
            className="mobile-nav-toggle"
            onClick={() => setMobileOpen((open) => !open)}
            type="button"
          >
            <span />
            <span />
          </button>
          {mobileOpen ? (
          <nav
            aria-label="Mobile navigation"
            className="mobile-nav-panel"
            id="mobile-navigation"
          >
            {navigation.map((item) => (
              <Link
                aria-current={isCurrent(item.href) ? "page" : undefined}
                className={isCurrent(item.href) ? "nav-link-active" : undefined}
                key={item.href}
                href={item.href}
                onClick={() => setMobileOpen(false)}
              >
                {item.label}
              </Link>
            ))}
            <Link href="/contact" onClick={() => setMobileOpen(false)}>
              Start a conversation
            </Link>
          </nav>
          ) : null}
        </div>
      </div>
    </header>
  );
}
