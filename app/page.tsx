import Image from "next/image";
import Link from "next/link";
import ProductCard from "@/components/product-card";
import ProductLogo from "@/components/product-logo";
import { brand } from "@/lib/brand";
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
              commerce, finance, regional market intelligence, livestock
              identity, and family history.
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
            <div className="hero-system-label" aria-hidden="true">
              <span />
              Product network · {String(products.length).padStart(2, "0")} live
            </div>
            <div className="ecosystem-core">
              <Image
                src={brand.assets.logoLight}
                alt="Savvy Rilla Technologies"
                width={92}
                height={92}
                sizes="92px"
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
                aria-label={`${product.shortName} — product story`}
                data-logo-variant={product.logoVariant}
              >
                <ProductLogo
                  product={product}
                  decorative
                  sizes={product.logoVariant === "wordmark" ? "88px" : "48px"}
                />
                <span className="ecosystem-node-label" aria-hidden="true">{product.shortName}</span>
              </Link>
            ))}
          </div>
        </div>

        <div className="shell hero-proof">
          <div>
            <span className="proof-label">Portfolio</span>
            <strong>
              {String(products.length).padStart(2, "0")} live products
            </strong>
            <span>One connected product family</span>
          </div>
          <div>
            <span className="proof-label">Based in</span>
            <strong>Juba</strong>
            <span>South Sudan</span>
          </div>
          <div>
            <span className="proof-label">Operating model</span>
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
              <h2>One company. A growing product family.</h2>
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
            <Image
              src={brand.assets.logoLight}
              alt=""
              width={170}
              height={170}
              sizes="170px"
            />
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

      <section className="section technology-section" id="technology-ecosystem">
        <div className="shell">
          <div className="section-heading split-heading">
            <div>
              <p className="eyebrow">Technology ecosystem</p>
              <h2>Products connected by one engineering core.</h2>
            </div>
            <p>
              Commerce, finance, regional intelligence, identity, and memory
              are different systems. We build them with shared product
              discipline, dependable infrastructure, and a long operating
              horizon.
            </p>
          </div>

          <div className="technology-map" aria-label="Savvy Rilla technology ecosystem">
            <div className="technology-backplane" aria-hidden="true" />
            <div className="technology-core">
              <Image
                src={brand.assets.logoLight}
                alt=""
                width={76}
                height={76}
                sizes="76px"
              />
              <span>Product core</span>
              <strong>SRT</strong>
            </div>

            <div className="technology-products">
              {products.map((product, index) => (
                <Link
                  className="technology-product"
                  href={`/products/${product.slug}`}
                  key={product.slug}
                  style={
                    {
                      "--technology-accent": product.accent,
                    } as React.CSSProperties
                  }
                >
                  <span className="technology-product-index">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <ProductLogo
                    product={product}
                    decorative
                    sizes={product.logoVariant === "wordmark" ? "92px" : "44px"}
                  />
                  <span className="technology-product-copy">
                    <strong>{product.shortName}</strong>
                    <small>{product.category}</small>
                  </span>
                  <span className="technology-product-state">
                    <i aria-hidden="true" />
                    Live
                  </span>
                </Link>
              ))}
            </div>

            <div className="technology-horizon">
              <article>
                <span>Exploration 01</span>
                <h3>Applied AI systems</h3>
                <p>Future product research</p>
              </article>
              <article>
                <span>Exploration 02</span>
                <h3>Innovation lab</h3>
                <p>Prototypes and new systems</p>
              </article>
            </div>
          </div>

          <div className="technology-principles">
            <article>
              <span>01 / Interfaces</span>
              <h3>Useful at first contact</h3>
              <p>Responsive products shaped around real people and workflows.</p>
            </article>
            <article>
              <span>02 / Intelligence</span>
              <h3>Data made actionable</h3>
              <p>APIs, reporting layers, and historical signals with clear purpose.</p>
            </article>
            <article>
              <span>03 / Trust</span>
              <h3>Confidence by design</h3>
              <p>Identity, provenance, permissions, and auditability built in.</p>
            </article>
            <article>
              <span>04 / Operations</span>
              <h3>Owned after launch</h3>
              <p>Monitoring, maintenance, and product iteration over the long term.</p>
            </article>
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
