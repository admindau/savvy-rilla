import type { MetadataRoute } from "next";
import { products } from "@/lib/products";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://www.savvyrilla.tech";
  const updatedAt = new Date("2026-07-23");
  const routes = [
    "",
    "/products",
    "/capabilities",
    "/company",
    "/insights",
    "/contact",
    "/privacy",
    "/terms",
  ];

  return [
    ...routes.map((route) => ({
      url: `${baseUrl}${route}`,
      lastModified: updatedAt,
      changeFrequency: route === "" ? ("weekly" as const) : ("monthly" as const),
      priority: route === "" ? 1 : route === "/products" ? 0.9 : 0.7,
    })),
    ...products.map((product) => ({
      url: `${baseUrl}/products/${product.slug}`,
      lastModified: updatedAt,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
  ];
}
