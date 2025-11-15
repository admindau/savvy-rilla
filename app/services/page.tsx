// app/services/page.tsx
export default function ServicesPage() {
  return (
    <div className="page">
      <div className="twocol">
        <div>
          <p className="page-eyebrow">Services</p>
          <h1 className="page-title">What we can build and shape with you</h1>
          <p className="page-subtitle">
            Our work sits at the intersection of technology, storytelling, and
            strategy. You can engage us for one-off projects or ongoing
            collaboration.
          </p>

          <section className="section">
            <div className="section-header">
              <h2 className="section-title">Tech &amp; digital products</h2>
              <p className="section-text">
                For teams and founders who want working tools — not endless
                slide decks. We help you design, prototype, and ship.
              </p>
            </div>
            <ul className="list">
              <li>
                <strong>Web apps &amp; dashboards.</strong> Modern, responsive
                interfaces for finance tracking, internal reporting, and
                workflow tools.
              </li>
              <li>
                <strong>Data-backed products.</strong> Lightweight analytics and
                reporting interfaces that make numbers understandable to humans.
              </li>
              <li>
                <strong>Domain &amp; hosting guidance.</strong> Practical
                support on where to host, how to structure domains, and how to
                keep things simple and maintainable.
              </li>
              <li>
                <strong>Technical advisory.</strong> Friendly support when you
                need a second brain on IT decisions, especially in
                resource-tight environments.
              </li>
            </ul>
          </section>

          <section className="section">
            <div className="section-header">
              <h2 className="section-title">
                Media, podcasts &amp; storytelling
              </h2>
              <p className="section-text">
                Stories are infrastructure. We help you design how your work is
                seen, heard, and remembered.
              </p>
            </div>
            <ul className="list">
              <li>
                <strong>Podcast creation.</strong> Concept, naming, episode
                structure, visual identity, and simple workflows to keep you
                consistent.
              </li>
              <li>
                <strong>Branding &amp; visuals.</strong> Cover art, episode
                templates, thumbnails, lower-thirds, and motion intros/outros.
              </li>
              <li>
                <strong>Docu-series concepting.</strong> High-level story
                design, structure for episodes, and visual direction in
                collaboration with production partners.
              </li>
              <li>
                <strong>Social media support.</strong> Captions, post series,
                key-message framing, and content calendars anchored in your real
                objectives.
              </li>
            </ul>
          </section>

          <section className="section">
            <div className="section-header">
              <h2 className="section-title">
                Communication strategy &amp; light-touch consulting
              </h2>
              <p className="section-text">
                For organisations who need clarity — especially in humanitarian,
                development, financial, or public-sector work.
              </p>
            </div>
            <ul className="list">
              <li>
                <strong>Communication strategies.</strong> Simple, realistic
                frameworks that reflect your mandate, capacity, and audiences.
              </li>
              <li>
                <strong>Donor &amp; stakeholder materials.</strong> Reports,
                one-pagers, concept notes, and talking points that do justice to
                your work.
              </li>
              <li>
                <strong>Event branding &amp; visibility.</strong> Visuals and
                messaging for campaigns, launches, and commemorations.
              </li>
              <li>
                <strong>Strategic planning support.</strong> Light Balanced
                Scorecard–style mapping and facilitation to connect activities
                to results.
              </li>
            </ul>
          </section>
        </div>

        <aside className="twocol-aside">
          <p>
            <strong>How we usually work</strong>
          </p>
          <p>
            Most collaborations start with a short conversation about where you
            are stuck or what you are trying to build. From there, we suggest a
            scope, timeline, and simple pricing structure.
          </p>
          <p>
            We are comfortable working with:
            <br />
            • small teams that need a lot of flexibility
            <br />
            • organisations operating in fragile or complex settings
            <br />
            • creators and founders doing their first big project.
          </p>
          <p>
            If you are not sure which service you need, you can still reach out
            — sometimes the first task is simply to name the problem together.
          </p>
        </aside>
      </div>
    </div>
  );
}
