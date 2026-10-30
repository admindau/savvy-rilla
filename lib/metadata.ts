import type { Metadata } from "next";
import { brand } from "@/lib/brand";

export function pageMetadata(title: string, description: string, path: string): Metadata {
  const fullTitle = `${title} | ${brand.displayName}`;
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      type: "website",
      title: fullTitle,
      description,
      url: path,
      siteName: brand.displayName,
      images: [{ url: brand.assets.socialCard, width: 1200, height: 630, alt: brand.displayName }],
    },
    twitter: { card: "summary_large_image", title: fullTitle, description, images: [brand.assets.socialCard] },
  };
}
