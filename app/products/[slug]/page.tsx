import type { CSSProperties } from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getProduct, products } from "@/lib/products";

type ProductPageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return products.map((product) => ({ slug: product.slug }));
}

export async function generateMetadata({
  params,
}: ProductPageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = getProduct(slug);

  if (!product) {
    return {};
  }

  return {
    title: product.name,
    description: product.description,
    alternates: { canonical: `/products/${product.slug}` },
    openGraph: {
      title: `${product.name} | Savvy Rilla Technologies™`,
      description: product.description,
      url: `/products/${product.slug}`,
    },
  };
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = await params;
  const product = getProduct(slug);

  if (!product) {
    notFound();
  }

  const style = {
    "--detail-accent": product.accent,
    "--detail-soft": product.accentSoft,
  } as CSSProperties;

  return (
    <main id="main-content">
      <section className="product-detail-hero" style={style}>
        <div className="shell">
          <div className="product-detail-layout">
            <div>
              <p className="eyebrow">{product.category}</p>
              <h1>{product.name}</h1>
              <p className="product-detail-tagline">{product.tagline}</p>
              <p className="product-detail-copy">{product.description}</p>
              <div className="page-hero-actions">
                <a
                  className="button button-light"
                  href={product.url}
                  target="_blank"
                  rel="noreferrer"
                >
                  Visit {product.shortName} <span aria-hidden="true">↗</span>
                </a>
                <Link className="text-link" href="/products">
                  All products <span aria-hidden="true">→</span>
                </Link>
              </div>
            </div>
            <div className="product-symbol" aria-hidden="true">
              <span>{product.mark}</span>
            </div>
          </div>

          <div className="product-facts">
            <div>
              <span>Built for</span>
              <p>{product.audience}</p>
            </div>
            <div>
              <span>Core capability</span>
              <p>{product.capability}</p>
            </div>
            <div>
              <span>Created by</span>
              <p>Savvy Rilla Technologies™ · Juba, South Sudan</p>
            </div>
          </div>
        </div>
      </section>

      <section className="page-section">
        <div className="shell prose-grid">
          <div>
            <p className="eyebrow">The product promise</p>
            <h2>Focused on the job that matters.</h2>
          </div>
          <div className="prose-copy">
            <p>
              <strong>{product.name}</strong> is part of a growing family of
              products created by Savvy Rilla Technologies™. It is built around
              a clear use case, shaped by real operating conditions, and
              improved as those needs evolve.
            </p>
            <p>
              The live product is the best place to experience its current
              capabilities, access its services, or join its community.
            </p>
            <a
              className="text-link"
              href={product.url}
              target="_blank"
              rel="noreferrer"
            >
              Open the live product <span aria-hidden="true">↗</span>
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
