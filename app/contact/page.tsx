import PageGraphic from "@/components/page-graphic";
import { pageMetadata } from "@/lib/metadata";
import type { Metadata } from "next";
import Link from "next/link";
import ContactForm from "@/components/contact-form";
import { brand } from "@/lib/brand";

export const metadata: Metadata = {
  ...pageMetadata("Contact", "Contact Savvy Rilla Technologies™ about products, partnerships, and technology systems.", "/contact"),
};

export default function ContactPage() {
  return (
    <main id="main-content">
      <section className="page-hero">
        <div className="shell page-hero-layout">
          <div className="page-hero-content">
            <p className="eyebrow">Contact</p>
            <h1>Let’s make something useful.</h1>
            <p className="page-hero-copy">
              Ask about a Savvy Rilla product, explore a partnership, or tell us
              about a system worth building.
            </p>
            <div className="page-hero-actions"><Link href="#contact-form" className="button button-light">Write your message <span aria-hidden="true">↓</span></Link></div>
          </div>
          <PageGraphic kind="contact" />
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
                <a href={`mailto:${brand.email}`}>{brand.email}</a>
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
