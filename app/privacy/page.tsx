import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy",
  description: "Privacy information for the Savvy Rilla Technologies™ website.",
  alternates: { canonical: "/privacy" },
};

export default function PrivacyPage() {
  return (
    <main className="legal-page" id="main-content">
      <div className="shell">
        <p className="eyebrow">Legal</p>
        <h1>Privacy</h1>
        <div className="legal-copy">
          <p>
            This notice explains how Savvy Rilla Technologies™ handles
            information submitted through this company website.
          </p>
          <h2>Information you provide</h2>
          <p>
            When you use the contact form, we receive the name, email address,
            organisation, enquiry type, and message you choose to provide. We
            use that information to respond to your enquiry and maintain a
            record of the conversation.
          </p>
          <h2>Technical information</h2>
          <p>
            Basic technical information, such as browser type and network
            address, may be processed for security, reliability, and abuse
            prevention.
          </p>
          <h2>Sharing and retention</h2>
          <p>
            We use service providers to deliver email, store contact messages,
            and operate the website. We do not sell personal information. We
            retain enquiry information only as long as it remains useful for
            the conversation, legal obligations, and legitimate business
            records.
          </p>
          <h2>Your choices</h2>
          <p>
            To ask about, correct, or request deletion of information you
            submitted through this site, email hello@savvyrilla.tech.
          </p>
          <h2>Product privacy</h2>
          <p>
            Savvy Rilla products may have their own privacy notices reflecting
            the information and services within those products. Their notices
            apply when you use them.
          </p>
          <p>Last updated: 24 July 2026.</p>
        </div>
      </div>
    </main>
  );
}
