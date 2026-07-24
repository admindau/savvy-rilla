import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms",
  description: "Website terms for Savvy Rilla Technologies™.",
  alternates: { canonical: "/terms" },
};

export default function TermsPage() {
  return (
    <main className="legal-page" id="main-content">
      <div className="shell">
        <p className="eyebrow">Legal</p>
        <h1>Website terms</h1>
        <div className="legal-copy">
          <p>
            These terms apply to the public Savvy Rilla Technologies™ company
            website. By using the site, you agree to use it lawfully and without
            interfering with its operation or other visitors.
          </p>
          <h2>Company information</h2>
          <p>
            The site introduces Savvy Rilla Technologies™, its capabilities,
            and its family of products. Product descriptions are general
            information and may change as products develop.
          </p>
          <h2>Product links</h2>
          <p>
            Links may take you to a Savvy Rilla product with separate terms,
            privacy information, accounts, or service conditions. Those product
            terms apply to your use of that product.
          </p>
          <h2>Intellectual property</h2>
          <p>
            Company and product names, trademarks, copy, design, and other
            original materials on this site belong to Savvy Rilla Technologies™
            or their respective owners. They may not be used in a way that
            suggests endorsement or affiliation without permission.
          </p>
          <h2>No warranty</h2>
          <p>
            We work to keep this website accurate and available, but it is
            provided for general information without a guarantee that every
            page will always be current, uninterrupted, or error-free.
          </p>
          <h2>Contact</h2>
          <p>Questions about these terms can be sent to hello@savvyrilla.tech.</p>
          <p>Last updated: 24 July 2026.</p>
        </div>
      </div>
    </main>
  );
}
