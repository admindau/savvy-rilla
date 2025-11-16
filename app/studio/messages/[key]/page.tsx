// app/studio/messages/[key]/page.tsx
import { getSupabaseServerClient } from '@/lib/supabase';

export const dynamic = 'force-dynamic';

interface ContactMessage {
  id: string;
  created_at: string;
  name: string;
  email: string;
  organisation: string | null;
  type: string | null;
  message: string;
}

interface PageProps {
  params: {
    key: string;
  };
}

export default async function StudioMessagesPage({ params }: PageProps) {
  const adminKey = process.env.ADMIN_DASHBOARD_KEY ?? null;
  const providedKey = params.key;

  // Log once in case we ever need to debug again
  console.log('STUDIO MESSAGES AUTH CHECK', {
    hasAdminKey: !!adminKey,
    providedKey,
  });

  const isAuthorized =
    !adminKey || (adminKey !== null && providedKey === adminKey);

  if (!isAuthorized) {
    return (
      <div className="page">
        <p className="page-eyebrow">Studio</p>
        <h1 className="page-title">Access denied</h1>
        <p className="page-subtitle">
          This page is for internal use only. Invalid admin key in URL.
        </p>
      </div>
    );
  }

  const supabase = getSupabaseServerClient();

  let messages: ContactMessage[] = [];
  let loadError: string | null = null;

  if (!supabase) {
    loadError = 'Supabase client is not configured on the server.';
  } else {
    const { data, error } = await supabase
      .from('contact_messages')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(100);

    if (error) {
      console.error('Error loading contact_messages:', error);
      loadError = 'Unable to load messages from Supabase.';
    } else if (data) {
      messages = data as ContactMessage[];
    }
  }

  return (
    <div className="page">
      <p className="page-eyebrow">Studio</p>
      <h1 className="page-title">Studio inbox</h1>
      <p className="page-subtitle">
        Internal view of contact form messages logged to Supabase. This page is
        for Savvy Gorilla eyes only.
      </p>

      {loadError && (
        <p className="hero-meta" style={{ color: '#ffb0b0', marginTop: '0.5rem' }}>
          {loadError}
        </p>
      )}

      {!loadError && messages.length === 0 && (
        <p className="hero-meta" style={{ marginTop: '1rem' }}>
          No messages yet. Once people start reaching out through the contact
          form, they will appear here.
        </p>
      )}

      {!loadError && messages.length > 0 && (
        <div className="mt-8 grid gap-4">
          {messages.map((msg) => {
            const created = new Date(msg.created_at);
            const formatted = created.toLocaleString('en-GB', {
              day: '2-digit',
              month: 'short',
              year: 'numeric',
              hour: '2-digit',
              minute: '2-digit',
            });

            return (
              <article
                key={msg.id}
                className="rounded-2xl border border-neutral-800 bg-black/40 px-4 py-4 md:px-5 md:py-5"
              >
                <header className="flex flex-wrap items-baseline justify-between gap-2">
                  <div>
                    <h2 className="text-base font-semibold text-white">
                      {msg.name}{' '}
                      <span className="text-xs font-normal text-neutral-400">
                        &lt;{msg.email}&gt;
                      </span>
                    </h2>
                    {msg.organisation && (
                      <p className="text-xs text-neutral-400">
                        {msg.organisation}
                      </p>
                    )}
                  </div>
                  <div className="text-xs text-neutral-500">{formatted}</div>
                </header>

                <dl className="mt-3 space-y-1 text-xs text-neutral-400">
                  {msg.type && (
                    <div>
                      <dt className="inline uppercase tracking-[0.18em] text-[0.65rem] text-neutral-500">
                        Type of work:{' '}
                      </dt>
                      <dd className="inline">{msg.type}</dd>
                    </div>
                  )}
                </dl>

                <div className="mt-3 rounded-xl bg-neutral-950/70 px-3 py-3 text-sm leading-relaxed text-neutral-100 border border-neutral-800">
                  {msg.message.split('\n').map((line, idx) => (
                    <p key={idx} className={idx > 0 ? 'mt-1' : undefined}>
                      {line}
                    </p>
                  ))}
                </div>
              </article>
            );
          })}
        </div>
      )}
    </div>
  );
}
