import Link from "next/link";
import type { CSSProperties } from "react";
import ProductLogo from "@/components/product-logo";
import type { Product } from "@/lib/products";

export default function ProductCard({
  product,
  index,
}: {
  product: Product;
  index: number;
}) {
  const style = {
    "--product-accent": product.accent,
    "--product-soft": product.accentSoft,
  } as CSSProperties;

  return (
    <article className="product-card" style={style}>
      <div className="product-card-top">
        <span className="product-number">{String(index + 1).padStart(2, "0")}</span>
        <span
          className={`product-mark product-mark-${product.logoVariant}`}
          aria-hidden="true"
        >
          <ProductLogo
            product={product}
            decorative
            sizes={product.logoVariant === "wordmark" ? "114px" : "52px"}
          />
        </span>
      </div>
      <div className="product-card-copy">
        <p className="product-category">{product.category}</p>
        <h3>{product.name}</h3>
        <p className="product-tagline">{product.tagline}</p>
        <p>{product.description}</p>
      </div>
      <div className="product-card-actions">
        <Link href={`/products/${product.slug}`}>
          Product story <span aria-hidden="true">→</span>
        </Link>
        <a href={product.url} target="_blank" rel="noreferrer">
          Visit product <span aria-hidden="true">↗</span>
        </a>
      </div>
    </article>
  );
}
