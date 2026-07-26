"use client";

import Link from "next/link";

export default function ErrorPage({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <main className="system-page" id="main-content">
      <div className="shell system-page-inner">
        <p className="eyebrow">System notice</p>
        <h1>Something interrupted this page.</h1>
        <p>
          The rest of the site is still available. You can retry this view or
          return to the homepage.
        </p>
        <div className="page-hero-actions">
          <button className="button button-light" onClick={reset} type="button">
            Try again <span aria-hidden="true">↻</span>
          </button>
          <Link className="text-link" href="/">
            Return home <span aria-hidden="true">→</span>
          </Link>
        </div>
      </div>
    </main>
  );
}
