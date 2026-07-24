import Image from "next/image";
import type { Product } from "@/lib/products";

export default function ProductLogo({
  product,
  decorative = false,
  className = "",
  sizes = "160px",
}: {
  product: Product;
  decorative?: boolean;
  className?: string;
  sizes?: string;
}) {
  return (
    <span
      aria-hidden={decorative || undefined}
      className={`product-logo product-logo-${product.logoVariant} ${className}`.trim()}
    >
      <Image
        alt={decorative ? "" : `${product.shortName} logo`}
        fill
        sizes={sizes}
        src={product.logo}
      />
    </span>
  );
}
