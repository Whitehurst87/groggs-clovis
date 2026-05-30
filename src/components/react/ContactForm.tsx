/**
 * ContactForm.tsx
 * --------------------------------------------------------------------------
 * React island — simple general-purpose contact form.
 * Submits to Formspree (swap REPLACE_WITH_YOUR_CONTACT_FORM_ID).
 *
 * Fields: name, email, subject, message + honeypot.
 */

import { useState } from "react";

const FORMSPREE_ENDPOINT = "https://formspree.io/f/REPLACE_WITH_YOUR_CONTACT_FORM_ID";

type Status = "idle" | "submitting" | "success" | "error";

interface FormData {
  name: string;
  email: string;
  subject: string;
  message: string;
  _gotcha: string;
}

const INITIAL: FormData = {
  name: "",
  email: "",
  subject: "",
  message: "",
  _gotcha: "",
};

const inputCls =
  "w-full rounded-sm border border-wood-mid bg-wood-darker px-4 py-3 text-sm text-text-primary placeholder-text-muted " +
  "focus:border-pub-green focus:outline-none focus:ring-1 focus:ring-pub-green transition-colors";

const labelCls = "block text-xs uppercase tracking-widest text-text-secondary mb-1.5";

export default function ContactForm() {
  const [form, setForm] = useState<FormData>(INITIAL);
  const [status, setStatus] = useState<Status>("idle");

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (form._gotcha) { setStatus("success"); return; }
    setStatus("submitting");
    try {
      const res = await fetch(FORMSPREE_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(form),
      });
      if (res.ok) {
        setStatus("success");
        setForm(INITIAL);
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div className="flex flex-col items-center gap-4 rounded-sm border border-pub-green/40 bg-pub-green/10 px-8 py-12 text-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="48"
          height="48"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="text-pub-green"
          aria-hidden="true"
        >
          <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
          <path d="m9 11 3 3L22 4" />
        </svg>
        <h3 className="display-caps text-xl text-text-primary">Message Sent!</h3>
        <p className="max-w-sm text-sm text-text-secondary leading-relaxed">
          Thanks for reaching out. We'll get back to you as soon as possible. Sláinte!
        </p>
        <button
          onClick={() => setStatus("idle")}
          className="mt-2 text-xs uppercase tracking-widest text-pub-green underline underline-offset-4 hover:text-pub-green-light transition-colors"
        >
          Send another message
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-6">
      {/* Honeypot */}
      <div aria-hidden="true" className="absolute -left-[9999px] overflow-hidden">
        <input
          type="text"
          name="_gotcha"
          value={form._gotcha}
          onChange={handleChange}
          tabIndex={-1}
          autoComplete="off"
        />
      </div>

      {/* Name + Email */}
      <div className="grid sm:grid-cols-2 gap-6">
        <div>
          <label htmlFor="cf-name" className={labelCls}>
            Full Name <span className="text-pub-green">*</span>
          </label>
          <input
            id="cf-name"
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            required
            placeholder="Jane Smith"
            className={inputCls}
          />
        </div>
        <div>
          <label htmlFor="cf-email" className={labelCls}>
            Email Address <span className="text-pub-green">*</span>
          </label>
          <input
            id="cf-email"
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            required
            placeholder="jane@example.com"
            className={inputCls}
          />
        </div>
      </div>

      {/* Subject */}
      <div>
        <label htmlFor="cf-subject" className={labelCls}>
          Subject <span className="text-pub-green">*</span>
        </label>
        <input
          id="cf-subject"
          type="text"
          name="subject"
          value={form.subject}
          onChange={handleChange}
          required
          placeholder="How can we help?"
          className={inputCls}
        />
      </div>

      {/* Message */}
      <div>
        <label htmlFor="cf-message" className={labelCls}>
          Message <span className="text-pub-green">*</span>
        </label>
        <textarea
          id="cf-message"
          name="message"
          value={form.message}
          onChange={handleChange}
          required
          rows={5}
          placeholder="Your message…"
          className={inputCls + " resize-y min-h-[120px]"}
        />
      </div>

      {status === "error" && (
        <p className="rounded-sm border border-red-500/40 bg-red-500/10 px-4 py-3 text-sm text-red-400">
          Something went wrong. Please try again or call us directly.
        </p>
      )}

      <button
        type="submit"
        disabled={status === "submitting"}
        className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-sm bg-pub-green px-8 py-3.5 text-sm font-semibold uppercase tracking-widest text-white transition-all hover:bg-pub-green-dark focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pub-green focus-visible:ring-offset-2 focus-visible:ring-offset-wood-darker disabled:opacity-60 disabled:pointer-events-none"
      >
        {status === "submitting" ? (
          <>
            <svg className="animate-spin h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" aria-hidden="true">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
            </svg>
            Sending…
          </>
        ) : (
          "Send Message"
        )}
      </button>

      <p className="text-xs text-text-muted">* Required fields.</p>
    </form>
  );
}
