import Link from "next/link";

export default function ContactPage() {
  return (
    <div className="page">
      <section className="hero hero--matrix">
        <div className="container">
          <p className="hero-kicker">Contact</p>
          <h1 className="hero-main-title">Request a consultation.</h1>
          <p className="hero-text">
            Tell us what you’re trying to build. We’ll propose an architecture, delivery approach, and the operational model to run it properly.
          </p>

          <div className="hero-actions">
            <Link href="/platforms" className="btn btn-ghost">Explore platforms</Link>
            <Link href="/enterprise" className="btn btn-ghost">Enterprise engineering</Link>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="contact-grid">
            <div className="twocol-aside">
              <p style={{ marginTop: 0 }}>
                <strong>What happens next?</strong>
              </p>
              <p>1) We review your request and clarify constraints.</p>
              <p>2) We propose architecture + delivery plan.</p>
              <p>3) We align on deployment + support model.</p>
              <p style={{ marginBottom: 0 }}>
                <strong>Focus:</strong> secure systems, reporting platforms, dashboards, infrastructure, managed services.
              </p>
            </div>

            <form className="card" action="#" method="post">
              <div style={{ display: "grid", gap: "0.9rem" }}>
                <div style={{ display: "grid", gap: "0.4rem" }}>
                  <label htmlFor="name">Name</label>
                  <input id="name" name="name" type="text" placeholder="Your name" required />
                </div>

                <div style={{ display: "grid", gap: "0.4rem" }}>
                  <label htmlFor="email">Email</label>
                  <input id="email" name="email" type="email" placeholder="you@example.com" required />
                </div>

                <div style={{ display: "grid", gap: "0.4rem" }}>
                  <label htmlFor="org">Organisation</label>
                  <input id="org" name="org" type="text" placeholder="Organisation name" />
                </div>

                <div style={{ display: "grid", gap: "0.4rem" }}>
                  <label htmlFor="need">What do you need?</label>
                  <select id="need" name="need" defaultValue="platform">
                    <option value="platform">Platform demo</option>
                    <option value="enterprise">Enterprise system build</option>
                    <option value="infrastructure">Managed services</option>
                    <option value="advisory">Architecture advisory</option>
                  </select>
                </div>

                <div style={{ display: "grid", gap: "0.4rem" }}>
                  <label htmlFor="message">Brief description</label>
                  <textarea
                    id="message"
                    name="message"
                    placeholder="What are you trying to build? Constraints? Timeline? Users? Data sensitivity?"
                    required
                  />
                </div>

                <button type="submit" className="btn btn-primary">
                  Submit request
                </button>

                <p className="section-text" style={{ margin: 0 }}>
                  Prefer email? Write to: <strong>hello@savvyrilla.tech</strong>
                </p>
              </div>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}
