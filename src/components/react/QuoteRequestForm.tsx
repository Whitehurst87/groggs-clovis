/**
 * QuoteRequestForm.tsx
 * --------------------------------------------------------------------------
 * React island — catering / private event quote request form.
 * Submits to Formspree (swap REPLACE_WITH_YOUR_FORM_ID with the real endpoint
 * once a Formspree account is set up at formspree.io).
 *
 * Features:
 *  - Controlled form with validation feedback
 *  - Honeypot field to block spam bots
 *  - Loading / success / error states
 */

import { useState } from "react";

const FORMSPREE_ENDPOINT = "https://formspree.io/f/REPLACE_WITH_YOUR_FORM_ID";

type Status = "idle" | "submitting" | "success" | "error";

interface FormData {
  name: string;
  email: string;
  phone: string;
  eventDate: string;
  guestCount: string;
  packageInterest: string;
  venuePreference: string;
  notes: string;
  // honeypot — must stay empty
  _gotcha: string;
}

const INITIAL: FormData = {
  name: "",
  email: "",
  phone: "",
  eventDate: "",
  guestCount: "",
  packageInterest: "",
  venuePreference: "",
  notes: "",
  _gotcha: "",
};

// Shared input class strings (Tailwind)
const inputCls =
  "w-full rounded-sm border border-wood-mid bg-wood-darker px-4 py-3 text-sm text-text-primary placeholder-text-muted " +
  "focus:border-pub-green focus:outline-none focus:ring-1 focus:ring-pub-green transition-colors";

const labelCls = "block text-xs uppercase tracking-widest text-text-secondary mb-1.5";

export default function QuoteRequestForm() {
  const [form, setForm] = useState<FormData>(INITIAL);
  const [status, setStatus] = useState<Status>("idle");

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    // If honeypot is filled, silently succeed (it's a bot)
    if (form._gotcha) {
      setStatus("success");
      return;
    }
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
        <h3 className="display-caps text-xl text-text-primary">Request Received!</h3>
        <p className="max-w-sm text-sm text-text-secondary leading-relaxed">
          Thanks for reaching out. We'll be in touch within one business day to
          discuss your event. Cheers!
        </p>
        <button
          onClick={() => setStatus("idle")}
          className="mt-2 text-xs uppercase tracking-widest text-pub-green underline underline-offset-4 hover:text-pub-green-light transition-colors"
        >
          Submit another request
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-6">
      {/* Honeypot — hidden from real users, bots fill it in */}
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

      {/* Row 1 — Name + Email */}
      <div className="grid sm:grid-cols-2 gap-6">
        <div>
          <label htmlFor="cqf-name" className={labelCls}>
            Full Name <span className="text-pub-green">*</span>
          </label>
          <input
            id="cqf-name"
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
          <label htmlFor="cqf-email" className={labelCls}>
            Email Address <span className="text-pub-green">*</span>
          </label>
          <input
            id="cqf-email"
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

      {/* Row 2 — Phone + Event Date */}
      <div className="grid sm:grid-cols-2 gap-6">
        <div>
          <label htmlFor="cqf-phone" className={labelCls}>
            Phone Number
          </label>
          <input
            id="cqf-phone"
            type="tel"
            name="phone"
            value={form.phone}
            onChange={handleChange}
            placeholder="(559) 555-0100"
            className={inputCls}
          />
        </div>
        <div>
          <label htmlFor="cqf-date" className={labelCls}>
            Event Date <span className="text-pub-green">*</span>
          </label>
          <input
            id="cqf-date"
            type="date"
            name="eventDate"
            value={form.eventDate}
            onChange={handleChange}
            required
            className={inputCls + " [color-scheme:dark]"}
          />
        </div>
      </div>

      {/* Row 3 — Guest Count + Package Interest */}
      <div className="grid sm:grid-cols-2 gap-6">
        <div>
          <label htmlFor="cqf-guests" className={labelCls}>
            Estimated Guest Count <span className="text-pub-green">*</span>
          </label>
          <select
            id="cqf-guests"
            name="guestCount"
            value={form.guestCount}
            onChange={handleChange}
            required
            className={inputCls}
          >
            <option value="" disabled>Select a range…</option>
            <option value="Under 20">Under 20</option>
            <option value="20–30">20–30</option>
            <option value="30–50">30–50</option>
            <option value="50–80">50–80</option>
            <option value="80+">80+</option>
          </select>
        </div>
        <div>
          <label htmlFor="cqf-package" className={labelCls}>
            Package Interest <span className="text-pub-green">*</span>
          </label>
          <select
            id="cqf-package"
            name="packageInterest"
            value={form.packageInterest}
            onChange={handleChange}
            required
            className={inputCls}
          >
            <option value="" disabled>Select a package…</option>
            <option value="Intimate Gathering (up to 30)">Intimate Gathering (up to 30)</option>
            <option value="Party Package (30–80)">Party Package (30–80)</option>
            <option value="Full Venue Buyout (80+)">Full Venue Buyout (80+)</option>
            <option value="Not Sure Yet">Not Sure Yet</option>
          </select>
        </div>
      </div>

      {/* Row 4 — Venue Preference */}
      <div>
        <label htmlFor="cqf-venue" className={labelCls}>
          Venue Preference
        </label>
        <select
          id="cqf-venue"
          name="venuePreference"
          value={form.venuePreference}
          onChange={handleChange}
          className={inputCls}
        >
          <option value="" disabled>Select a preference…</option>
          <option value="At the Pub">At the Pub (Clovis)</option>
          <option value="Off-site Catering">Off-site Catering</option>
          <option value="Not Sure Yet">Not Sure Yet</option>
        </select>
      </div>

      {/* Row 5 — Additional Notes */}
      <div>
        <label htmlFor="cqf-notes" className={labelCls}>
          Additional Details
        </label>
        <textarea
          id="cqf-notes"
          name="notes"
          value={form.notes}
          onChange={handleChange}
          rows={4}
          placeholder="Tell us about your event — theme, entertainment requests, dietary needs, or anything else we should know."
          className={inputCls + " resize-y min-h-[100px]"}
        />
      </div>

      {/* Error state */}
      {status === "error" && (
        <p className="rounded-sm border border-red-500/40 bg-red-500/10 px-4 py-3 text-sm text-red-400">
          Something went wrong sending your request. Please try again or call us directly.
        </p>
      )}

      {/* Submit */}
      <button
        type="submit"
        disabled={status === "submitting"}
        className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-sm bg-pub-green px-8 py-3.5 text-sm font-semibold uppercase tracking-widest text-white transition-all hover:bg-pub-green-dark focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pub-green focus-visible:ring-offset-2 focus-visible:ring-offset-wood-darker disabled:opacity-60 disabled:pointer-events-none"
      >
        {status === "submitting" ? (
          <>
            <svg
              className="animate-spin h-4 w-4"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
            </svg>
            Sending…
          </>
        ) : (
          "Request a Quote"
        )}
      </button>

      <p className="text-xs text-text-muted">
        * Required fields. We typically respond within one business day.
      </p>
    </form>
  );
}
