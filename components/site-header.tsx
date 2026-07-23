import Image from "next/image";
import Link from "next/link";

const navigation = [
  { href: "/products", label: "Products" },
  { href: "/capabilities", label: "Capabilities" },
  { href: "/company", label: "Company" },
  { href: "/insights", label: "Insights" },
];

export default function SiteHeader() {
  return (
    <header className="site-header">
      <div className="shell nav-shell">
        <Link className="brand" href="/" aria-label="Savvy Rilla Technologies home">
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
            <Link key={item.href} href={item.href}>
              {item.label}
            </Link>
          ))}
        </nav>

        <Link className="nav-contact" href="/contact">
          Start a conversation
          <span aria-hidden="true">↗</span>
        </Link>

        <details className="mobile-nav">
          <summary aria-label="Open navigation">
            <span />
            <span />
          </summary>
          <div className="mobile-nav-panel">
            {navigation.map((item) => (
              <Link key={item.href} href={item.href}>
                {item.label}
              </Link>
            ))}
            <Link href="/contact">Start a conversation</Link>
          </div>
        </details>
      </div>
    </header>
  );
}
