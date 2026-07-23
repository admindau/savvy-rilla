import Image from "next/image";
import Link from "next/link";
import ProductCard from "@/components/product-card";
import { products } from "@/lib/products";

const capabilities = [
  {
    number: "01",
    title: "Product engineering",
    text: "From a sharp first release to the systems that keep a product dependable as it grows.",
  },
  {
    number: "02",
    title: "Data and intelligence",
    text: "Useful data products, reporting layers, and APIs built to make complex information actionable.",
  },
  {
    number: "03",
    title: "Trust infrastructure",
    text: "Identity, provenance, permissions, and auditability designed into the product from the start.",
  },
  {
    number: "04",
    title: "Operate and improve",
    text: "Monitoring, maintenance, and product iteration that continue long after the first launch.",
  },
];

export default function HomePage() {
  return (
    <main id="main-content">
      <section className="home-hero">
        <div className="hero-noise" aria-hidden="true" />
        <div className="hero-orbit hero-orbit-one" aria-hidden="true" />
        <div className="hero-orbit hero-orbit-two" aria-hidden="true" />

        <div className="shell home-hero-grid">
          <div className="home-hero-copy">
            <p className="eyebrow">
              <span className="eyebrow-dot" />
              Born in Juba · Built for what comes next
            </p>
            <h1>
              Technology for the systems that{" "}
              <span className="text-accent">matter.</span>
            </h1>
            <p className="hero-intro">
              Savvy Rilla Technologies™ creates practical digital products for
              commerce, finance, market intelligence, livestock identity, and
              family history.
            </p>
            <div className="hero-actions">
              <Link className="button button-light" href="/products">
                Explore our products <span aria-hidden="true">↗</span>
              </Link>
              <Link className="text-link" href="/company">
                Meet the company <span aria-hidden="true">→</span>
              </Link>
            </div>
          </div>

          <div className="ecosystem-visual" aria-label="Savvy Rilla product ecosystem">
            <div className="ecosystem-glow" aria-hidden="true" />
            <div className="ecosystem-core">
              <Image
                src="/logo-white.png"
                alt="Savvy Rilla Technologies"
                width={112}
                height={112}
                priority
              />
              <span>SRT</span>
            </div>
            {products.map((product, index) => (
              <Link
                className={`ecosystem-node ecosystem-node-${index + 1}`}
                href={`/products/${product.slug}`}
                key={product.slug}
                style={{ "--node-color": product.accent } as React.CSSProperties}
                aria-label={`Explore ${product.name}`}
              >
                <span>{product.mark}</span>
                <strong>{product.shortName}</strong>
              </Link>
            ))}
          </div>
        </div>

        <div className="shell hero-proof">
          <div>
            <strong>05</strong>
            <span>Products and growing</span>
          </div>
          <div>
            <strong>Juba</strong>
            <span>South Sudan</span>
          </div>
          <div>
            <strong>Build + operate</strong>
            <span>One accountable team</span>
          </div>
          <p>
            Made close to the problems.
            <br />
            Designed for wider possibility.
          </p>
        </div>
      </section>

      <section className="section section-products">
        <div className="shell">
          <div className="section-heading split-heading">
            <div>
              <p className="eyebrow">The product family</p>
              <h2>One company. Five ambitious products.</h2>
            </div>
            <p>
              Each product starts with a specific real-world need. Together,
              they show the breadth of what purposeful technology can unlock.
            </p>
          </div>
          <div className="product-grid">
            {products.map((product, index) => (
              <ProductCard product={product} index={index} key={product.slug} />
            ))}
          </div>
          <div className="section-end-link">
            <Link className="text-link" href="/products">
              Explore the full portfolio <span aria-hidden="true">→</span>
            </Link>
          </div>
        </div>
      </section>

      <section className="section belief-section">
        <div className="shell belief-grid">
          <div className="belief-mark" aria-hidden="true">
            <Image src="/logo-white.png" alt="" width={220} height={220} />
          </div>
          <div>
            <p className="eyebrow">What we believe</p>
            <blockquote>
              The most valuable technology does not arrive from somewhere else.
              It is built with a clear understanding of the people, systems,
              and realities it is meant to serve.
            </blockquote>
            <p className="belief-copy">
              We build from South Sudan with the discipline to compete anywhere:
              focused products, durable engineering, and a long-term commitment
              to the systems we put into the world.
            </p>
            <Link className="text-link" href="/company">
              Our story and principles <span aria-hidden="true">→</span>
            </Link>
          </div>
        </div>
      </section>

      <section className="section capability-preview">
        <div className="shell">
          <div className="section-heading split-heading">
            <div>
              <p className="eyebrow">How we build</p>
              <h2>From useful idea to dependable system.</h2>
            </div>
            <p>
              Product thinking and operational discipline belong in the same
              room. We bring them together from the first decision.
            </p>
          </div>
          <div className="capability-grid">
            {capabilities.map((capability) => (
              <article key={capability.number}>
                <span>{capability.number}</span>
                <h3>{capability.title}</h3>
                <p>{capability.text}</p>
              </article>
            ))}
          </div>
          <div className="section-end-link">
            <Link className="text-link" href="/capabilities">
              See our capabilities <span aria-hidden="true">→</span>
            </Link>
          </div>
        </div>
      </section>

      <section className="section product-bridge">
        <div className="shell product-bridge-inner">
          <p className="eyebrow">The Savvy Rilla ecosystem</p>
          <h2>
            Different products.
            <br />
            One standard of care.
          </h2>
          <p>
            Every Savvy Rilla product carries the same promise: clear purpose,
            thoughtful engineering, and an experience worthy of the people who
            depend on it.
          </p>
          <Link className="button button-dark" href="/contact">
            Build with us <span aria-hidden="true">↗</span>
          </Link>
        </div>
      </section>
    </main>
  );
}
