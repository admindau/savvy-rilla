// app/studios/gorilla-ledger/page.tsx
import Link from 'next/link';

export default function GorillaLedgerPage() {
  return (
    <div className="page">
      <div className="twocol">
        <div>
          <p className="page-eyebrow">Fintech · Product</p>
          <h1 className="page-title">Gorilla Ledger™</h1>
          <p className="page-subtitle">
            A personal finance and spending tracker designed for African
            realities: irregular income, multiple currencies, shared
            responsibilities, and families that plan together.
          </p>

          {/* Story + vision */}
          <section className="section">
            <div className="section-header">
              <h2 className="section-title">Why we are building it</h2>
              <p className="section-text">
                Gorilla Ledger started as a simple question: how do we give
                Africans a modern, quiet space to see where their money is going
                without being punished for living outside Western salary cycles?
              </p>
            </div>
            <p className="section-text">
              Many existing tools assume a single monthly paycheck, one
              currency, and individualistic budgets. Our realities are
              different. Income comes in waves — salary, small businesses,
              remittances, side hustles — and money often moves in and out of
              extended family structures, obligations, and community
              commitments.
            </p>
            <p className="section-text">
              Gorilla Ledger is being designed to respect this context while
              still giving you clarity, structure, and a sense of control.
            </p>
          </section>

          {/* Core features */}
          <section className="section">
            <div className="section-header">
              <h2 className="section-title">What Gorilla Ledger will do</h2>
              <p className="section-text">
                The product is being shaped in phases. From the beginning, a few
                things are non-negotiable.
              </p>
            </div>
            <div className="cards-grid">
              <div className="card">
                <p className="card-tag">Money in, money out</p>
                <h3 className="card-title">Clean transaction tracking</h3>
                <p className="card-text">
                  Simple ways to record income and expenses across multiple
                  wallets — cash, bank accounts, mobile money, or envelopes you
                  track mentally.
                </p>
              </div>
              <div className="card">
                <p className="card-tag">Real life flows</p>
                <h3 className="card-title">Irregular income friendly</h3>
                <p className="card-text">
                  Designed to cope with freelance work, seasonal payments, and
                  staggered salaries instead of assuming one fixed payday.
                </p>
              </div>
              <div className="card">
                <p className="card-tag">Shared lives</p>
                <h3 className="card-title">
                  Shared responsibilities in mind
                </h3>
                <p className="card-text">
                  Budgets and categories that recognise support to parents,
                  siblings, children, and community — not just individual
                  consumption.
                </p>
              </div>
              <div className="card">
                <p className="card-tag">Multiple currencies</p>
                <h3 className="card-title">FX-aware by design</h3>
                <p className="card-text">
                  Support for common currency combinations in the region, with
                  the ability to see your life in one base currency without
                  losing detail.
                </p>
              </div>
              <div className="card">
                <p className="card-tag">Less stress</p>
                <h3 className="card-title">Budgets &amp; gentle guardrails</h3>
                <p className="card-text">
                  Light budgeting and category limits that nudge you instead of
                  shaming you — especially in tight months.
                </p>
              </div>
              <div className="card">
                <p className="card-tag">Insight</p>
                <h3 className="card-title">Simple, honest insights</h3>
                <p className="card-text">
                  Clear views of where money is going over time, without
                  overwhelming charts or jargon. The focus is on patterns you
                  can act on.
                </p>
              </div>
            </div>
          </section>

          {/* Roadmap */}
          <section className="section">
            <div className="section-header">
              <h2 className="section-title">How we are rolling it out</h2>
              <p className="section-text">
                Gorilla Ledger will grow in deliberate stages so that each layer
                is stable before we add more complexity.
              </p>
            </div>
            <ul className="list">
              <li>
                <strong>Phase 1 · Foundations.</strong> Wallets, categories,
                and reliable transaction tracking. The goal is a calm,
                trustworthy core.
              </li>
              <li>
                <strong>Phase 2 · Budgets &amp; recurring rules.</strong>{' '}
                Monthly budgets, category limits, and recurring transactions for
                rent, salaries, subscriptions, and regular commitments.
              </li>
              <li>
                <strong>Phase 3 · Insights &amp; exports.</strong> Trend views,
                category breakdowns, and exports that make it easy to share
                summaries with partners, families, or financial advisors.
              </li>
              <li>
                <strong>Phase 4 · Ecosystem.</strong> Optional mobile-first
                experiences and deeper integrations, guided by how early users
                actually adopt the tool.
              </li>
            </ul>
          </section>
        </div>

        <aside className="twocol-aside">
          <p>
            <strong>The technology behind it</strong>
          </p>
          <p>
            Gorilla Ledger is being built with Next.js, TypeScript, Supabase,
            and Vercel — the same modern stack powering many production-grade
            products around the world.
          </p>
          <p>
            Data is stored in PostgreSQL with row-level security, providing a
            strong foundation for privacy and multi-user scenarios as the
            product grows.
          </p>
          <p>
            The design language follows the Savvy Gorilla black-and-white
            palette, keeping the interface calm, focused, and readable even
            during long budgeting sessions.
          </p>

          <hr style={{ borderColor: '#242424', margin: '1rem 0' }} />

          <p>
            <strong>Interested in early access?</strong>
          </p>
          <p>
            Gorilla Ledger is under active development. If you are interested in
            piloting it for yourself, your organisation, or a community group,
            reach out and mention Gorilla Ledger in your message.
          </p>
          <p>
            <Link href="/contact" className="card-link">
              Go to the contact page
            </Link>
          </p>
        </aside>
      </div>
    </div>
  );
}
