import Link from "next/link";

export default function CompanyPage() {
  return (
    <div className="page">
      <section className="hero hero--matrix">
        <div className="container">
          <p className="hero-kicker">Company</p>
          <h1 className="hero-main-title">Savvy Rilla Technologies</h1>
          <p className="hero-text">
            We are a digital infrastructure and systems engineering company based in Juba, South Sudan—building secure,
            scalable systems for African institutions.
          </p>

          <div className="hero-actions">
            <Link href="/contact" className="btn btn-primary">Work with us</Link>
            <Link href="/platforms" className="btn btn-ghost">Explore platforms</Link>
          </div>

          <div className="hero-strip">
            <span className="hero-strip-item">Infrastructure-first</span>
            <span className="hero-strip-dot" aria-hidden="true" />
            <span className="hero-strip-item">Security-minded</span>
            <span className="hero-strip-dot" aria-hidden="true" />
            <span className="hero-strip-item">Africa-context engineering</span>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">What we believe</h2>
            <p className="section-text">
              Modern technology must be engineered for reality: operational constraints, security demands, and clarity of outcomes.
            </p>
          </div>

          <div className="cards-grid">
            <div className="card">
              <p className="card-tag">Principle</p>
              <h3 className="card-title">Architecture before code</h3>
              <p className="card-text">
                We reduce risk by mapping systems first—roles, data, boundaries, failure modes, and operational needs.
              </p>
            </div>
            <div className="card">
              <p className="card-tag">Principle</p>
              <h3 className="card-title">Security in the data layer</h3>
              <p className="card-text">
                Access control is enforced where it matters—at the data boundary—not only at the interface layer.
              </p>
            </div>
            <div className="card">
              <p className="card-tag">Principle</p>
              <h3 className="card-title">Build + operate</h3>
              <p className="card-text">
                Providers operate what they build. We support systems with monitoring, upgrades, and governance.
              </p>
            </div>
          </div>

          <div style={{ marginTop: "1.25rem" }}>
            <Link href="/contact" className="btn btn-primary">Request consultation</Link>
          </div>
        </div>
      </section>
    </div>
  );
}
