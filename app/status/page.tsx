import type { Metadata } from "next";
import { products } from "@/lib/products";

export const metadata: Metadata = {
  title: "Product access",
  description: "Direct access links for Savvy Rilla Technologies™ products.",
  alternates: { canonical: "/status" },
  robots: { index: false, follow: true },
};

export default function StatusPage() {
  return (
    <main id="main-content">
      <section className="page-hero">
        <div className="shell">
          <p className="eyebrow">Product access</p>
          <h1>Go directly to the products.</h1>
          <p className="page-hero-copy">
            This page provides direct access to each live Savvy Rilla product.
            Formal service monitoring and incident reporting will be introduced
            separately.
          </p>
        </div>
      </section>
      <section className="page-section page-section-soft">
        <div className="shell detail-list">
          {products.map((product, index) => (
            <article key={product.slug}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <h3>{product.name}</h3>
              <p>
                <a
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
