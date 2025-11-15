// app/contact/page.tsx
export default function ContactPage() {
  return (
    <>
      <p className="page-eyebrow">Contact</p>
      <h1 className="page-title">Tell us what you are trying to build</h1>
      <p className="page-subtitle">
        A few honest lines about your idea or challenge are enough to start.
        Share what you can now — we will follow up with clarifying questions and
        possible next steps.
      </p>

      <div className="contact-grid">
        <div className="contact-card">
          <strong>Direct contact</strong>
          <p>
            You can reach us by email at:
            <br />
            <a
              href="mailto:info@savvyrilla.tech"
              className="card-link"
            >
              info@savvyrilla.tech
            </a>
          </p>
          <p>
            If you already have a brief, deck, or sample materials, feel free to
            share them. They help us understand your context faster.
          </p>
          <p>
            Based in Juba, South Sudan (EAT / GMT+3). We happily work across
            time zones for partners in the region and beyond.
          </p>
        </div>

        <form className="contact-form">
          <div className="form-row">
            <label htmlFor="name">Name</label>
            <input id="name" name="name" placeholder="Your full name" />
          </div>
          <div className="form-row">
            <label htmlFor="org">Organisation / project</label>
            <input
              id="org"
              name="organisation"
              placeholder="Optional — who you represent"
            />
          </div>
          <div className="form-row">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              name="email"
              type="email"
              placeholder="you@example.com"
            />
          </div>
          <div className="form-row">
            <label htmlFor="type">Type of work</label>
            <select id="type" name="type">
              <option value="">Select an option</option>
              <option value="tech">Tech / web app / dashboard</option>
              <option value="media">Podcast / docu-series / media</option>
              <option value="strategy">Communication / strategy support</option>
              <option value="other">Something else</option>
            </select>
          </div>
          <div className="form-row">
            <label htmlFor="message">Project or challenge</label>
            <textarea
              id="message"
              name="message"
              placeholder="Share what you are trying to do, your timeline, and anything else that feels important."
            />
          </div>
          <button type="submit" className="btn btn-primary">
            Send message (placeholder)
          </button>
          <p className="hero-meta">
            This form is currently a visual placeholder. When you are ready, we
            can wire it to an email service or backend endpoint.
          </p>
        </form>
      </div>
    </>
  );
}
