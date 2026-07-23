import Image from "next/image";
import Link from "next/link";
import { products } from "@/lib/products";

export default function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="shell">
        <div className="footer-lead">
          <div>
            <p className="eyebrow">Build what comes next</p>
            <h2>Have a system worth building?</h2>
          </div>
          <Link className="button button-light" href="/contact">
            Talk to Savvy Rilla <span aria-hidden="true">↗</span>
          </Link>
        </div>

        <div className="footer-grid">
          <div className="footer-brand">
            <Link className="brand" href="/" aria-label="Savvy Rilla Technologies home">
              <Image src="/logo-white.png" alt="" width={44} height={44} />
              <span className="brand-copy">
                <strong>Savvy Rilla</strong>
                <span>Technologies</span>
              </span>
            </Link>
            <p>
              Designing and operating practical digital products from Juba,
              South Sudan.
            </p>
            <a href="mailto:hello@savvyrilla.tech">hello@savvyrilla.tech</a>
          </div>

          <div className="footer-column">
            <p>Company</p>
            <Link href="/products">Products</Link>
            <Link href="/capabilities">Capabilities</Link>
            <Link href="/company">Company</Link>
            <Link href="/insights">Insights</Link>
            <Link href="/contact">Contact</Link>
          </div>

          <div className="footer-column">
            <p>Products</p>
            {products.map((product) => (
              <a
                key={product.slug}
                href={product.url}
                target="_blank"
                rel="noreferrer"
              >
                {product.name}
              </a>
            ))}
          </div>
        </div>

        <div className="footer-bottom">
          <span>© {new Date().getFullYear()} Savvy Rilla Technologies™</span>
          <span>Made in Juba · Built for the world</span>
          <div>
            <Link href="/privacy">Privacy</Link>
            <Link href="/terms">Terms</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
