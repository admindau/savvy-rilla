// app/studio/messages/page.tsx

export const dynamic = 'force-static';

export default function StudioMessagesLandingPage() {
  return (
    <div className="page">
      <p className="page-eyebrow">Studio</p>
      <h1 className="page-title">Studio inbox</h1>
      <p className="page-subtitle">
        This page is for internal use only.
      </p>

      <p className="hero-meta" style={{ marginTop: '1rem' }}>
        To access the internal studio inbox, use the secret admin URL shared
        with the Savvy Gorilla team.
      </p>
    </div>
  );
}
