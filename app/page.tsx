// app/page.tsx  (Home)
import Link from 'next/link';
import Image from 'next/image';

export default function HomePage() {
  return (
    <>
      <section className="hero">
        <div>
          <p className="hero-kicker">Savvy Gorilla Technologies</p>
          <h1 className="hero-main-title">
            <span className="block">African Stories.</span>
            <span className="block">African Systems.</span>
            <span className="block">African Solutions.</span>
          </h1>
          <p className="hero-text">
            We are a Juba-based digital studio building modern web apps,
            podcasts, and strategic communication for organisations, creators,
            and movements across South Sudan and the continent.
          </p>
          <div className="hero-actions">
            <Link href="/contact" className="btn btn-primary">
              Start a project
            </Link>
            <Link href="/studios" className="btn btn-ghost">
              Explore our work
            </Link>
          </div>
          <p className="hero-meta">
            From core banking dashboards to women-led podcasts and docu-series,
            we help African ideas find a modern home — in code, on camera, and
            on record.
          </p>
        </div>

        <div className="hero-card">
          <div className="hero-card-inner">
            <div style={{ display: 'flex', gap: '0.6rem', marginBottom: '0.6rem' }}>
              <Image
                src="/logo-black.png"
                alt="Savvy Gorilla Technologies logo"
                width={40}
                height={40}
              />
              <div>
                <p className="hero-card-title">Juba-bred. Africa-focused.</p>
                <p className="hero-card-text">
                  Savvy Gorilla sits at the intersection of technology,
                  storytelling, and strategy — helping teams design tools and
                  narratives that actually work in African contexts.
                </p>
              </div>
            </div>
            <p className="hero-tagline">
              Tech studio · Creative lab · Strategy partner
            </p>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="section-header">
          <h2 className="section-title">What we do</h2>
          <p className="section-text">
            We help organisations and creators move from rough ideas and
            scattered tools to clear systems, visual identities, and products
            they can be proud to show donors, clients, and audiences.
          </p>
        </div>
        <div className="cards-grid">
          <div className="card">
            <p className="card-tag">Technology</p>
            <h3 className="card-title">Web apps & digital tools</h3>
            <p className="card-text">
              Design and development of modern, responsive web apps — from
              financial trackers and dashboards to internal tools and
              documentation hubs.
            </p>
            <p className="card-meta">
              Stack: Next.js, TypeScript, Supabase, Vercel, and clean, future
              friendly design.
            </p>
          </div>
          <div className="card">
            <p className="card-tag">Storytelling</p>
            <h3 className="card-title">Podcasts & docu-series</h3>
            <p className="card-text">
              Concepting, branding, and creative direction for audio and visual
              storytelling — including intros, episode artwork, and narrative
              structure.
            </p>
            <p className="card-meta">
              From Our Matriline Podcast to War Towards Purpose.
            </p>
          </div>
          <div className="card">
            <p className="card-tag">Strategy</p>
            <h3 className="card-title">Communication & strategy support</h3>
            <p className="card-text">
              Support to teams that need clear communication, event visibility,
              donor-facing materials, and light-touch strategic planning without
              the buzzwords.
            </p>
            <p className="card-meta">
              Especially for humanitarian, development, and public sector actors
              working in complex contexts.
            </p>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="section-header">
          <h2 className="section-title">Selected studios & projects</h2>
          <p className="section-text">
            Savvy Gorilla hosts several in-house studios and products. Each one
            explores a different side of African life — finance, family,
            freedom, football, and faith.
          </p>
        </div>
        <div className="cards-grid">
          <div className="card">
            <p className="card-tag">Fintech · Product</p>
            <h3 className="card-title">Gorilla Ledger™</h3>
            <p className="card-text">
              A modern personal finance tracker for Africans who want clarity on
              income, expenses, and goals — without wrestling with spreadsheets.
            </p>
            <p className="card-meta">Currently in active development.</p>
          </div>
          <div className="card">
            <p className="card-tag">Podcast · Storytelling</p>
            <h3 className="card-title">Our Matriline Podcast</h3>
            <p className="card-text">
              A women-led podcast documenting girlhood-to-womanhood journeys,
              inter-tribal relationships, and the everyday politics of family
              and love.
            </p>
            <p className="card-meta">Hosted and produced in collaboration.</p>
          </div>
          <div className="card">
            <p className="card-tag">Docu-series · Legacy</p>
            <h3 className="card-title">War Towards Purpose</h3>
            <p className="card-text">
              A docu-series archiving the lives of those who fought, built, and
              carried nations — soldiers, spouses, and children — before history
              forgets them.
            </p>
            <p className="card-meta">
              With Motherland Entertainment & Savvy Gorilla Studios.
            </p>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="section-header">
          <h2 className="section-title">Who we work with</h2>
          <p className="section-text">
            We collaborate with banks, humanitarian agencies, NGOs, creatives,
            and entrepreneurs who want African-made solutions — not copy-paste
            imports that ignore local realities.
          </p>
        </div>
        <p className="section-text">
          Whether you are prototyping a new app, documenting a campaign, or
          standing up a podcast from scratch, we come in as a thinking partner —
          not just a vendor.
        </p>
      </section>

      <section className="section">
        <div className="section-header">
          <h2 className="section-title">Ready when you are</h2>
          <p className="section-text">
            Have a project, an idea, or even just a problem you are trying to
            name? Share a few lines and we will help you shape it into something
            buildable.
          </p>
        </div>
        <Link href="/contact" className="btn btn-primary">
          Tell us about your project
        </Link>
      </section>
    </>
  );
}
