import type { Metadata } from "next";
import ContactForm from "@/components/contact-form";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Contact Savvy Rilla Technologies™ about products, partnerships, and technology systems.",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return (
    <main id="main-content">
      <section className="page-hero">
        <div className="shell">
          <p className="eyebrow">Contact</p>
          <h1>Let’s make something useful.</h1>
          <p className="page-hero-copy">
            Ask about a Savvy Rilla product, explore a partnership, or tell us
            about a system worth building.
          </p>
        </div>
      </section>

      <section className="page-section">
        <div className="shell contact-layout">
          <aside className="contact-aside">
            <p className="eyebrow">Start here</p>
            <h2>A direct line to the team.</h2>
            <p>
              Share enough context for us to understand what matters. We will
              review your message and respond with the right next step.
            </p>
            <dl>
              <dt>Email</dt>
              <dd>
                <a href="mailto:hello@savvyrilla.tech">
                  hello@savvyrilla.tech
                </a>
              </dd>
              <dt>Based in</dt>
              <dd>Juba, South Sudan</dd>
              <dt>Best for</dt>
              <dd>Products · Partnerships · Technology systems</dd>
            </dl>
          </aside>
          <ContactForm />
        </div>
      </section>
    </main>
  );
}
