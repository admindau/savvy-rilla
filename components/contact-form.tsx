"use client";

import { FormEvent, useRef, useState } from "react";
import Link from "next/link";

type FormState = {
  state: "idle" | "submitting" | "success" | "error";
  message: string;
};

const initialState: FormState = { state: "idle", message: "" };

export default function ContactForm() {
  const [status, setStatus] = useState<FormState>(initialState);
  const submitting = useRef(false);
  const statusRef = useRef<HTMLParagraphElement>(null);
  const isSubmitting = status.state === "submitting";

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (submitting.current) return;
    submitting.current = true;
    const form = event.currentTarget;
    const formData = new FormData(form);

    setStatus({ state: "submitting", message: "Sending your message…" });

    const controller = new AbortController();
    const timeout = window.setTimeout(() => controller.abort(), 30_000);
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        signal: controller.signal,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(Object.fromEntries(formData)),
      });

      const result = (await response.json().catch(() => null)) as {
        ok?: boolean;
        error?: string;
      } | null;

      if (!response.ok || !result?.ok) {
        throw new Error(result?.error || "We could not confirm delivery. Please email us before trying again.");
      }

      form.reset();
      setStatus({
        state: "success",
        message:
          "Thank you. Your message has reached Savvy Rilla Technologies™.",
      });
    } catch (error) {
      setStatus({
        state: "error",
        message:
          error instanceof Error && error.name === "Error"
            ? error.message
            : "We could not confirm delivery. Your message is still here. Please email us before trying again.",
      });
    } finally {
      window.clearTimeout(timeout);
      submitting.current = false;
      window.requestAnimationFrame(() => statusRef.current?.focus());
    }
  }

  return (
    <form id="contact-form" aria-label="Contact Savvy Rilla" className="contact-form" onSubmit={handleSubmit}>
      <div className="form-honeypot" aria-hidden="true">
        <label htmlFor="website">Website</label>
        <input disabled={isSubmitting} id="website" name="website" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <div className="form-field">
        <label htmlFor="name">Name (required)</label>
        <input disabled={isSubmitting}
          id="name"
          name="name"
          type="text"
          autoComplete="name"
          required
          minLength={2}
          maxLength={100}
        />
      </div>

      <div className="form-field">
        <label htmlFor="email">Email (required)</label>
        <input disabled={isSubmitting} id="email" name="email" type="email" autoComplete="email" required maxLength={180} />
      </div>

      <div className="form-field">
        <label htmlFor="organisation">Organisation (optional)</label>
        <input disabled={isSubmitting}
          id="organisation"
          name="organisation"
          type="text"
          autoComplete="organization"
          maxLength={160}
        />
      </div>

      <div className="form-field">
        <label htmlFor="type">What would you like to discuss?</label>
        <select disabled={isSubmitting} id="type" name="type" defaultValue="product" required>
          <option value="product">A Savvy Rilla product</option>
          <option value="partnership">Partnership</option>
          <option value="build">A product or system</option>
          <option value="media">Media or company enquiry</option>
          <option value="other">Something else</option>
        </select>
      </div>

      <div className="form-field form-field-full">
        <label htmlFor="message">Tell us a little more (required)</label>
        <textarea disabled={isSubmitting}
          id="message"
          name="message"
          placeholder="What are you working on, and how can we help?"
          required
          minLength={10}
          maxLength={3000}
        />
      </div>

      <div className="form-submit form-field-full">
        <button
          aria-busy={status.state === "submitting"}
          className="button button-light"
          type="submit"
          disabled={status.state === "submitting"}
        >
          {status.state === "submitting" ? "Sending…" : "Send message"}
          <span aria-hidden="true">↗</span>
        </button>
        <p>
          By submitting, you agree that we may use this information to respond
          to your enquiry. See our <Link href="/privacy">privacy notice</Link>.
        </p>
      </div>

      <p
        className="form-status form-field-full"
        data-state={status.state}
        ref={statusRef}
        tabIndex={-1}
        role="status"
        aria-live="polite"
      >
        {status.message}
        {status.state === "error" && (
          <> <a href="mailto:hello@savvyrilla.tech">Email us directly ↗</a></>
        )}
      </p>
    </form>
  );
}
