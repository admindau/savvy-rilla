// app/studios/page.tsx
export default function StudiosPage() {
  return (
    <>
      <p className="page-eyebrow">Studios &amp; Projects</p>
      <h1 className="page-title">The ecosystem around Savvy Gorilla</h1>
      <p className="page-subtitle">
        Beyond client work, Savvy Gorilla develops in-house products, podcasts,
        and series that experiment with African finance, memory, and everyday
        life.
      </p>

      <section className="section">
        <div className="cards-grid">
          <div className="card">
            <p className="card-tag">Fintech · Product</p>
            <h2 className="card-title">Gorilla Ledger™</h2>
            <p className="card-text">
              A modern personal finance and spending tracker designed for
              African realities — irregular income, multiple currencies, and
              shared family responsibilities.
            </p>
            <p className="card-meta">
              Built with Next.js and Supabase under the Savvy Gorilla ecosystem.
              Public release in phases.
            </p>
          </div>

          <div className="card">
            <p className="card-tag">Podcast · Women · Legacy</p>
            <h2 className="card-title">Our Matriline Podcast</h2>
            <p className="card-text">
              A women-led storytelling space documenting the journeys from
              girlhood to womanhood, inter-tribal love, dowry politics, and the
              sometimes messy beauty of matrilineal lines.
            </p>
            <p className="card-meta">
              Savvy Gorilla supports branding, digital presence, and technical
              setup.
            </p>
          </div>

          <div className="card">
            <p className="card-tag">Docu-series · Memory</p>
            <h2 className="card-title">War Towards Purpose</h2>
            <p className="card-text">
              A docu-series archiving the lived experiences of leaders,
              soldiers, spouses, and everyday people who carried the burden of
              liberation and nation-building.
            </p>
            <p className="card-meta">
              Produced by Savvy Gorilla Studios in collaboration with Motherland
              Entertainment.
            </p>
          </div>

          <div className="card">
            <p className="card-tag">Storylab · Family</p>
            <h2 className="card-title">Roots Family Tree</h2>
            <p className="card-text">
              A digital and visual experiment in mapping family histories,
              cattle camp memories, and inter-generational stories before they
              disappear from everyday conversation.
            </p>
            <p className="card-meta">
              Early-stage; combining visual design, light tech, and oral
              history.
            </p>
          </div>

          <div className="card">
            <p className="card-tag">Tech &amp; Comms · Partners</p>
            <h2 className="card-title">UNMAS &amp; humanitarian support</h2>
            <p className="card-text">
              Strategic communication, visibility, and light tech thinking in
              support of mine action, protection, and peacebuilding efforts in
              South Sudan.
            </p>
            <p className="card-meta">
              Includes event concepts, reports, social media content, and
              partner-facing materials.
            </p>
          </div>

          <div className="card">
            <p className="card-tag">Studio · Experiments</p>
            <h2 className="card-title">Savvy Rilla Podcast &amp; side labs</h2>
            <p className="card-text">
              A playground for tech talk in Africa, football banter, and
              creative experiments — testing formats that may later graduate
              into full products.
            </p>
            <p className="card-meta">
              Used as a lab to test workflows, formats, and brand directions.
            </p>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="section-header">
          <h2 className="section-title">Partnerships &amp; co-productions</h2>
          <p className="section-text">
            If you have a story, product, or archive concept that feels bigger
            than a single project, we are open to co-creating — combining your
            subject matter expertise with our tech and storytelling structure.
          </p>
        </div>
      </section>
    </>
  );
}
