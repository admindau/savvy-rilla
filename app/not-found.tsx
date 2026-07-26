import Link from "next/link";

export default function NotFound() {
  return (
    <main className="system-page" id="main-content">
      <div className="shell system-page-inner">
        <p className="eyebrow">404 · Route not found</p>
        <h1>This path ends here.</h1>
        <p>
          The page may have moved, but the Savvy Rilla product ecosystem is
          still within reach.
        </p>
        <div className="page-hero-actions">
          <Link className="button button-light" href="/">
            Return home <span aria-hidden="true">→</span>
          </Link>
          <Link className="text-link" href="/products">
            Explore products <span aria-hidden="true">↗</span>
          </Link>
        </div>
      </div>
    </main>
  );
}
