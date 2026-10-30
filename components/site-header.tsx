"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import CompanyBrand from "@/components/company-brand";

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

  useEffect(() => {
    const desktop = window.matchMedia("(min-width: 1051px)");
    const closeOnDesktop = () => {
      if (desktop.matches) setMobileOpen(false);
    };
    const closeOnHistory = () => setMobileOpen(false);
    desktop.addEventListener("change", closeOnDesktop);
    window.addEventListener("popstate", closeOnHistory);
    return () => {
      desktop.removeEventListener("change", closeOnDesktop);
      window.removeEventListener("popstate", closeOnHistory);
    };
  }, []);

  function isCurrent(href: string) {
    return pathname === href || pathname.startsWith(`${href}/`);
  }

  useEffect(() => {
    if (!mobileOpen) {
      return;
    }

    const previousOverflow = document.body.style.overflow;
    const firstLink = menuPanelRef.current?.querySelector<HTMLAnchorElement>("a");

    const background = Array.from(document.querySelectorAll<HTMLElement>("main, footer"));
    const previouslyInert = background.map(element => element.inert);
    background.forEach(element => { element.inert = true; });
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
      background.forEach((element, index) => { element.inert = previouslyInert[index]; });
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [mobileOpen]);

  return (
    <header
      className="site-header"
      data-menu-open={mobileOpen || undefined}
      onClickCapture={(event) => {
        if (event.target instanceof Element && event.target.closest("a")) {
          setMobileOpen(false);
        }
      }}
    >
      <div className="shell nav-shell">
        <CompanyBrand priority />

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
            ref={menuButtonRef}
            type="button"
          >
            <span />
            <span />
          </button>
          <button
            aria-label="Dismiss navigation"
            className="mobile-nav-backdrop"
            hidden={!mobileOpen}
            onClick={() => {
              setMobileOpen(false);
              menuButtonRef.current?.focus();
            }}
            tabIndex={-1}
            type="button"
          />
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
