// app/about/page.tsx
export default function AboutPage() {
  return (
    <div className="page">
      <div className="twocol">
        <div>
          <p className="page-eyebrow">About</p>
          <h1 className="page-title">
            A studio rooted in Juba, thinking continent-wide
          </h1>
          <p className="page-subtitle">
            Savvy Gorilla Technologies was born from a simple observation:
            African teams and creatives are doing serious work, but often
            without tools and narratives that match the weight of what they
            carry.
          </p>

          <section className="section">
            <div className="section-header">
              <h2 className="section-title">Who we are</h2>
              <p className="section-text">
                We are a small, focused studio that sits between technology,
                communication, and storytelling. Our work pulls from banking,
                humanitarian response, media, and Pan-African organising.
              </p>
            </div>
            <ul className="list">
              <li>
                We speak both{' '}
                <em>“let&apos;s get this into production”</em> and{' '}
                <em>“how will this land with communities and donors?”</em>
              </li>
              <li>
                We care about design that feels modern without forgetting where
                it is coming from.
              </li>
              <li>
                We believe African stories and systems deserve world-class
                polish — not leftovers.
              </li>
            </ul>
          </section>

          <section className="section">
            <div className="section-header">
              <h2 className="section-title">What we believe in</h2>
              <p className="section-text">
                Our work is anchored in a few commitments that shape how and why
                we build.
              </p>
            </div>
            <ul className="list">
              <li>
                <strong>Pan-African imagination.</strong> We see each project as
                part of a larger story about African unity, dignity, and
                self-determined futures.
              </li>
              <li>
                <strong>Practical elegance.</strong> Tools must be beautiful
                enough to be loved and simple enough to be used.
              </li>
              <li>
                <strong>Care for people.</strong> Behind every dashboard,
                report, or podcast episode are human beings trying to do their
                best inside imperfect systems.
              </li>
              <li>
                <strong>Documenting the journey.</strong> We are intentional
                about archiving processes so that others can learn, adapt, and
                build on what exists.
              </li>
            </ul>
          </section>

          <section className="section">
            <div className="section-header">
              <h2 className="section-title">How we show up in projects</h2>
              <p className="section-text">
                When you work with Savvy Gorilla, you are not just hiring a
                designer or developer. You are bringing in a thinking partner
                who cares about the long-term life of your idea.
              </p>
            </div>
            <ul className="list">
              <li>We ask many questions before we touch design or code.</li>
              <li>
                We prefer honest timelines over rushed promises that collapse
                later.
              </li>
              <li>
                We design with the future in mind: handovers, documentation, and
                room for growth.
              </li>
            </ul>
          </section>
        </div>

        <aside className="twocol-aside">
          <p>
            <strong>The people behind the studio</strong>
          </p>
          <p>
            <strong>Founder &amp; Lead Technologist.</strong> Systems, web
            development, banking and IT background, obsessed with clean
            infrastructure and African-made products.
          </p>
          <p>
            <strong>Creative &amp; Communications lead.</strong> Humanitarian
            and development communication, gender and protection work, and a
            strong eye for how stories land with communities and donors.
          </p>
          <p>
            Around this core, we collaborate with videographers, editors,
            photographers, and other creatives on a project-by-project basis.
          </p>
        </aside>
      </div>
    </div>
  );
}
