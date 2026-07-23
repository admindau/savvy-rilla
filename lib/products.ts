export type Product = {
  slug: string;
  name: string;
  shortName: string;
  mark: string;
  category: string;
  tagline: string;
  description: string;
  audience: string;
  capability: string;
  url: string;
  accent: string;
  accentSoft: string;
  featured?: boolean;
};

export const products: Product[] = [
  {
    slug: "suqjunub",
    name: "SuqJunub™",
    shortName: "SuqJunub",
    mark: "SJ",
    category: "Digital commerce",
    tagline: "Commerce built on trust.",
    description:
      "South Sudan’s marketplace for discovering products, trusted local businesses, and practical digital commerce.",
    audience: "Buyers, sellers, stores, and local businesses",
    capability: "Marketplace infrastructure, trust signals, and seller operations",
    url: "https://www.suqjunub.com",
    accent: "#f7a44a",
    accentSoft: "rgba(247, 164, 74, 0.16)",
    featured: true,
  },
  {
    slug: "gorilla-ledger",
    name: "Gorilla Ledger™",
    shortName: "Gorilla Ledger",
    mark: "GL",
    category: "Financial technology",
    tagline: "Clarity for every currency.",
    description:
      "A focused, multi-currency ledger for tracking money across wallets, currencies, categories, and time.",
    audience: "Individuals, teams, and growing organisations",
    capability: "Financial records, reporting, controls, and multi-currency workflows",
    url: "https://gl.savvyrilla.tech",
    accent: "#71e6a8",
    accentSoft: "rgba(113, 230, 168, 0.15)",
    featured: true,
  },
  {
    slug: "savvy-rilla-fx",
    name: "Savvy Rilla FX",
    shortName: "Savvy Rilla FX",
    mark: "FX",
    category: "Market intelligence",
    tagline: "Clearer exchange-rate data for South Sudan.",
    description:
      "Consistent SSP market data, historical movement, and a versioned API for products and reporting workflows.",
    audience: "Developers, finance teams, analysts, and institutions",
    capability: "Time-series data, market analytics, charts, and public APIs",
    url: "https://fx.savvyrilla.tech",
    accent: "#67b7ff",
    accentSoft: "rgba(103, 183, 255, 0.15)",
    featured: true,
  },
  {
    slug: "herdproof",
    name: "HerdProof™",
    shortName: "HerdProof",
    mark: "HP",
    category: "Livestock infrastructure",
    tagline: "Identity and traceability for livestock.",
    description:
      "A national livestock identity and traceability platform designed to protect ownership, provenance, and value.",
    audience: "Livestock owners, markets, institutions, and regulators",
    capability: "Identity records, traceability, verification, and field operations",
    url: "https://www.herdproof.com",
    accent: "#e8c66a",
    accentSoft: "rgba(232, 198, 106, 0.15)",
    featured: true,
  },
  {
    slug: "roots",
    name: "Roots™",
    shortName: "Roots",
    mark: "RT",
    category: "Family history",
    tagline: "Every family has a story.",
    description:
      "A private, family-led home for preserving lineage, relationships, and oral history across generations.",
    audience: "Families preserving identity, history, and memory",
    capability: "Private family spaces, relationship mapping, and oral history",
    url: "https://roots.savvyrilla.tech",
    accent: "#d69cff",
    accentSoft: "rgba(214, 156, 255, 0.14)",
    featured: true,
  },
];

export function getProduct(slug: string) {
  return products.find((product) => product.slug === slug);
}
