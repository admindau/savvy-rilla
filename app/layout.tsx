// app/layout.tsx
import type { Metadata, Viewport } from "next";
import SiteFooter from "@/components/site-footer";
import SiteHeader from "@/components/site-header";
import MotionProvider from "@/components/motion-provider";
import { brand } from "@/lib/brand";
import { products } from "@/lib/products";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.savvyrilla.tech"),
  title: {
    default: "Savvy Rilla Technologies™ | Technology built in Juba",
    template: "%s | Savvy Rilla Technologies™",
  },
  description:
    "Savvy Rilla Technologies™ builds practical digital products for commerce, finance, regional market intelligence, livestock identity, and family history.",
  applicationName: "Savvy Rilla Technologies™",
  keywords: [
    "Savvy Rilla Technologies",
    "South Sudan technology",
    "Juba software company",
    "digital products South Sudan",
    "SuqJunub",
    "Gorilla Ledger",
    "EAMU",
    "HerdProof",
  ],
  authors: [{ name: "Savvy Rilla Technologies™" }],
  creator: "Savvy Rilla Technologies™",
  publisher: "Savvy Rilla Technologies™",
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "/",
    siteName: "Savvy Rilla Technologies™",
    title: "Savvy Rilla Technologies™ | Technology built in Juba",
    description:
      "One technology company. A growing family of products built for the systems that matter.",
    images: [
      {
        url: brand.assets.socialCard,
        width: 1200,
        height: 630,
        alt: "Savvy Rilla Technologies™",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Savvy Rilla Technologies™ | Technology built in Juba",
    description:
      "One technology company. A growing family of products built for the systems that matter.",
    images: [brand.assets.socialCard],
  },
  icons: {
    icon: brand.assets.favicon,
    apple: brand.assets.logoDark,
  },
};

export const viewport: Viewport = {
  colorScheme: "dark",
  themeColor: "#080908",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const organisation = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: brand.name,
    legalName: brand.name,
    url: brand.url,
    logo: `${brand.url}${brand.assets.logoDark}`,
    email: brand.email,
    address: {
      "@type": "PostalAddress",
      addressLocality: "Juba",
      addressCountry: "SS",
    },
    brand: products.map((product) => product.shortName),
  };

  return (
    <html lang="en">
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organisation) }}
        />
        <a className="skip-link" href="#main-content">
          Skip to content
        </a>
        <SiteHeader />
        {children}
        <SiteFooter />
        <MotionProvider />
      </body>
    </html>
  );
}
