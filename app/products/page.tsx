import PageGraphic from "@/components/page-graphic";
import { pageMetadata } from "@/lib/metadata";
import type { Metadata } from "next";
import ProductCard from "@/components/product-card";
import { products } from "@/lib/products";

export const metadata: Metadata = {
  ...pageMetadata("Products", "Explore the products built and operated by Savvy Rilla Technologies™ across commerce, finance, regional intelligence, livestock identity, and family history.", "/products"),
};

export default function ProductsPage() {
  return (
    <main id="main-content">
      <section className="page-hero">
        <div className="shell page-hero-layout">
          <div className="page-hero-content">
            <p className="eyebrow">Savvy Rilla products</p>
            <h1>Built around real needs.</h1>
            <p className="page-hero-copy">
              Our portfolio spans everyday money, trusted commerce, regional
              market intelligence, livestock identity, and family memory.
              Different challenges, united by practical design and dependable
              technology.
            </p>
          </div>
          <PageGraphic kind="portfolio" />
        </div>
      </section>

      <section className="page-section page-section-soft">
        <div className="shell">
          <div className="product-grid">
            {products.map((product, index) => (
              <ProductCard headingLevel={2} product={product} index={index} key={product.slug} />
            ))}
          </div>
        </div>
      </section>

      <section className="page-section">
        <div className="shell prose-grid">
          <div>
            <p className="eyebrow">A connected portfolio</p>
            <h2>Products with a company behind them.</h2>
          </div>
          <div className="prose-copy">
            <p>
              Every product is designed, developed, and supported as part of the
              Savvy Rilla ecosystem. That means shared engineering discipline,
              a consistent commitment to trust, and a team invested beyond the
              first release.
            </p>
            <p>
              As the portfolio grows, the purpose stays the same: use technology
              to make important systems clearer, more accessible, and more
              useful.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
