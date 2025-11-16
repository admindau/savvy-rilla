// app/contact/page.tsx
'use client';

import { useState } from 'react';

type Status = 'idle' | 'submitting' | 'success' | 'error';

export default function ContactPage() {
  const [status, setStatus] = useState<Status>('idle');
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus('submitting');
    setError(null);

    const form = e.currentTarget;
    const formData = new FormData(form);

    const payload = {
      name: formData.get('name'),
      organisation: formData.get('organisation'),
      email: formData.get('email'),
      type: formData.get('type'),
      message: formData.get('message'),
    };

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      const data = await res.json().catch(() => null);

      if (!res.ok || !data?.ok) {
        throw new Error(data?.error || 'Unable to send message right now.');
      }

      setStatus('success');
      form.reset();
    } catch (err: any) {
      setError(err?.message || 'Something went wrong while sending your message.');
      setStatus('error');
    }
  }

  const isSubmitting = status === 'submitting';

  return (
    <div className="page">
      <p className="page-eyebrow">Contact</p>
      <h1 className="page-title">Tell us what you are trying to build</h1>
      <p className="page-subtitle">
        A few honest lines about your idea or challenge are enough to start.
        Share what you can now — we will follow up with clarifying questions and
        possible next steps.
      </p>

      <div className="contact-grid">
        <div className="contact-card">
          <strong>Direct contact</strong>
          <p>
            You can reach us by email at:
            <br />
            <a href="mailto:info@savvyrilla.tech" className="card-link">
              info@savvyrilla.tech
            </a>
          </p>
          <p>
            If you already have a brief, deck, or sample materials, feel free to
            share them. They help us understand your context faster.
          </p>
          <p>
            Based in Juba, South Sudan (EAT / GMT+3). We happily work across
            time zones for partners in the region and beyond.
          </p>
        </div>

        <form className="contact-form" onSubmit={handleSubmit}>
          <div className="form-row">
            <label htmlFor="name">Name</label>
            <input
              id="name"
              name="name"
              placeholder="Your full name"
              required
              disabled={isSubmitting}
            />
          </div>

          <div className="form-row">
            <label htmlFor="org">Organisation / project</label>
            <input
              id="org"
              name="organisation"
              placeholder="Optional — who you represent"
              disabled={isSubmitting}
            />
          </div>

          <div className="form-row">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              name="email"
              type="email"
              placeholder="you@example.com"
              required
              disabled={isSubmitting}
            />
          </div>

          <div className="form-row">
            <label htmlFor="type">Type of work</label>
            <select id="type" name="type" disabled={isSubmitting}>
              <option value="">Select an option</option>
              <option value="tech">Tech / web app / dashboard</option>
              <option value="media">Podcast / docu-series / media</option>
              <option value="strategy">Communication / strategy support</option>
              <option value="other">Something else</option>
            </select>
          </div>

          <div className="form-row">
            <label htmlFor="message">Project or challenge</label>
            <textarea
              id="message"
              name="message"
              placeholder="Share what you are trying to do, your timeline, and anything else that feels important."
              required
              disabled={isSubmitting}
            />
          </div>

          <button type="submit" className="btn btn-primary" disabled={isSubmitting}>
            {isSubmitting ? 'Sending…' : 'Send message'}
          </button>

          {status === 'success' && (
            <p className="hero-meta" style={{ color: '#a0ffa0', marginTop: '0.5rem' }}>
              Thank you — your message has been sent. We&apos;ll get back to you soon.
            </p>
          )}

          {status === 'error' && error && (
            <p className="hero-meta" style={{ color: '#ffb0b0', marginTop: '0.5rem' }}>
              {error}
            </p>
          )}
        </form>
      </div>
    </div>
  );
}
