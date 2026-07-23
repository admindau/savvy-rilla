"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";

type FormState = {
  state: "idle" | "submitting" | "success" | "error";
  message: string;
};

const initialState: FormState = { state: "idle", message: "" };

export default function ContactForm() {
  const [status, setStatus] = useState<FormState>(initialState);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);

    setStatus({ state: "submitting", message: "Sending your message…" });

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(Object.fromEntries(formData)),
      });

      const result = (await response.json()) as {
        ok?: boolean;
        error?: string;
      };

      if (!response.ok || !result.ok) {
        throw new Error(result.error || "We could not send your message.");
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
          error instanceof Error
            ? error.message
            : "Something went wrong. Please email hello@savvyrilla.tech.",
      });
    }
  }

  return (
    <form className="contact-form" onSubmit={handleSubmit}>
      <div className="form-honeypot" aria-hidden="true">
        <label htmlFor="website">Website</label>
        <input id="website" name="website" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <div className="form-field">
        <label htmlFor="name">Name</label>
        <input id="name" name="name" type="text" autoComplete="name" required maxLength={100} />
      </div>

      <div className="form-field">
        <label htmlFor="email">Email</label>
        <input id="email" name="email" type="email" autoComplete="email" required maxLength={180} />
      </div>

      <div className="form-field">
        <label htmlFor="organisation">Organisation</label>
        <input
          id="organisation"
          name="organisation"
          type="text"
          autoComplete="organization"
          maxLength={160}
        />
      </div>

      <div className="form-field">
        <label htmlFor="type">What would you like to discuss?</label>
        <select id="type" name="type" defaultValue="product">
          <option value="product">A Savvy Rilla product</option>
          <option value="partnership">Partnership</option>
          <option value="build">A product or system</option>
          <option value="media">Media or company enquiry</option>
          <option value="other">Something else</option>
        </select>
      </div>

      <div className="form-field form-field-full">
        <label htmlFor="message">Tell us a little more</label>
        <textarea
          id="message"
          name="message"
          placeholder="What are you working on, and how can we help?"
          required
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
        role="status"
        aria-live="polite"
      >
        {status.message}
      </p>
    </form>
  );
}
