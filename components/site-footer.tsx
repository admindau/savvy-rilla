import Link from "next/link";
import CompanyBrand from "@/components/company-brand";
import { brand } from "@/lib/brand";
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
            <CompanyBrand />
            <p>
              Designing and operating practical digital products from Juba,
              South Sudan.
            </p>
            <a href={`mailto:${brand.email}`}>{brand.email}</a>
          </div>

          <div className="footer-column">
            <p>Company</p>
            <Link href="/products">Products</Link>
            <Link href="/capabilities">Capabilities</Link>
            <Link href="/company">Company</Link>
            <Link href="/insights">Insights</Link>
            <Link href="/contact">Contact</Link>
            <Link href="/status">Product access</Link>
          </div>

          <div className="footer-column">
            <p>Products</p>
            {products.map((product) => (
              <a
                aria-label={`Visit ${product.shortName} (opens in a new tab)`}
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
