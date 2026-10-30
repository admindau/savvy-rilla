import PageGraphic from "@/components/page-graphic";
import { pageMetadata } from "@/lib/metadata";
import type { Metadata } from "next";
import ProductLogo from "@/components/product-logo";
import { products } from "@/lib/products";

export const metadata: Metadata = {
  ...pageMetadata("Product access", "Direct access links for Savvy Rilla Technologies™ products.", "/status"),
  robots: { index: false, follow: true },
};

export default function StatusPage() {
  return (
    <main id="main-content">
      <section className="page-hero">
        <div className="shell page-hero-layout">
          <div className="page-hero-content">
            <p className="eyebrow">Product access</p>
            <h1>Go directly to the products.</h1>
            <p className="page-hero-copy">
              This page provides direct access to each live Savvy Rilla product.
              Formal service monitoring and incident reporting will be introduced
              separately.
            </p>
          </div>
          <PageGraphic kind="portfolio" directAccess />
        </div>
      </section>
      <section className="page-section page-section-soft">
        <div className="shell detail-list">
          {products.map((product, index) => (
            <article className="access-card" key={product.slug}>
              <div className="access-card-top">
                <span>{String(index + 1).padStart(2, "0")}</span>
                <ProductLogo
                  product={product}
                  decorative
                  sizes={product.logoVariant === "wordmark" ? "90px" : "42px"}
                />
              </div>
              <div>
                <p className="product-availability">
                  <span aria-hidden="true" />
                  {product.availability}
                </p>
                <h3>{product.name}</h3>
              </div>
              <p>
                <a
                  aria-label={`Open ${product.shortName} (opens in a new tab)`}
                  className="text-link"
                  href={product.url}
                  target="_blank"
                  rel="noreferrer"
                >
                  Open product <span aria-hidden="true">↗</span>
                </a>
              </p>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
