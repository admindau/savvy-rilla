"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";

const navigation = [
  { href: "/products", label: "Products" },
  { href: "/capabilities", label: "Capabilities" },
  { href: "/company", label: "Company" },
  { href: "/insights", label: "Insights" },
];

export default function SiteHeader() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const menuPanelRef = useRef<HTMLElement>(null);

  function isCurrent(href: string) {
    return pathname === href || pathname.startsWith(`${href}/`);
  }

  useEffect(() => {
    if (!mobileOpen) {
      return;
    }

    const previousOverflow = document.body.style.overflow;
    const firstLink = menuPanelRef.current?.querySelector<HTMLAnchorElement>("a");

    document.body.style.overflow = "hidden";
    firstLink?.focus();

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setMobileOpen(false);
        menuButtonRef.current?.focus();
        return;
      }

      if (event.key === "Tab") {
        const focusableElements = [
          menuButtonRef.current,
          ...(menuPanelRef.current?.querySelectorAll<HTMLAnchorElement>("a") ||
            []),
        ].filter(
          (
            element,
          ): element is HTMLButtonElement | HTMLAnchorElement =>
            element !== null,
        );
        const firstElement = focusableElements[0];
        const lastElement = focusableElements.at(-1);

        if (event.shiftKey && document.activeElement === firstElement) {
          event.preventDefault();
          lastElement?.focus();
        } else if (!event.shiftKey && document.activeElement === lastElement) {
          event.preventDefault();
          firstElement?.focus();
        }
      }
    }

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [mobileOpen]);

  return (
    <header className="site-header" data-menu-open={mobileOpen || undefined}>
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
            aria-haspopup="true"
            aria-label={mobileOpen ? "Close navigation" : "Open navigation"}
            className="mobile-nav-toggle"
            onClick={() => setMobileOpen((open) => !open)}
            ref={menuButtonRef}
            type="button"
          >
            <span />
            <span />
          </button>
          <nav
            aria-label="Mobile navigation"
            className="mobile-nav-panel"
            hidden={!mobileOpen}
            id="mobile-navigation"
            ref={menuPanelRef}
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
        </div>
      </div>
    </header>
  );
}
