"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useQuote } from "@/components/providers/QuoteProvider";
import { Icon } from "@/components/ui/Icon";
import { services, site } from "@/lib/site";

export function QuoteModal() {
  const { isOpen, closeQuote, source } = useQuote();
  const [submitted, setSubmitted] = useState(false);

  // Lock body scroll + close on Escape while open.
  useEffect(() => {
    if (!isOpen) return;
    const original = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeQuote();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = original;
      window.removeEventListener("keydown", onKey);
    };
  }, [isOpen, closeQuote]);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    // Demo handler — wire to your CRM, email service, or form backend here.
    setSubmitted(true);
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <button
            aria-label="Close quote form"
            className="absolute inset-0 bg-forest-950/70 backdrop-blur-sm"
            onClick={closeQuote}
          />

          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby="quote-title"
            className="relative z-10 w-full max-w-lg overflow-hidden rounded-3xl bg-white shadow-card-lg"
            initial={{ opacity: 0, y: 30, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.98 }}
            transition={{ type: "spring", damping: 26, stiffness: 280 }}
          >
            <div className="flex items-start justify-between gap-4 bg-forest-900 px-6 py-5 text-white sm:px-8">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-forest-200">
                  Free • No Obligation
                </p>
                <h2
                  id="quote-title"
                  className="mt-1 font-display text-2xl font-semibold"
                >
                  Get Your Free Estimate
                </h2>
              </div>
              <button
                onClick={closeQuote}
                aria-label="Close"
                className="rounded-full p-2 text-white/70 transition hover:bg-white/10 hover:text-white"
              >
                <Icon name="close" className="h-5 w-5" />
              </button>
            </div>

            {submitted ? (
              <div className="px-6 py-12 text-center sm:px-8">
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-forest-100 text-forest-700">
                  <Icon name="check" className="h-8 w-8" />
                </div>
                <h3 className="mt-5 font-display text-2xl font-semibold text-forest-900">
                  Request Received!
                </h3>
                <p className="mx-auto mt-2 max-w-sm text-bark/70">
                  Thanks for reaching out. A member of our team will contact you
                  shortly with your free estimate. Need a faster response?
                </p>
                <a href={site.phoneHref} className="btn-primary mt-6">
                  <Icon name="phone" className="h-4 w-4" />
                  Call {site.phoneDisplay}
                </a>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="px-6 py-6 sm:px-8">
                <input type="hidden" name="source" value={source} />
                <div className="grid gap-4 sm:grid-cols-2">
                  <Field label="Full Name" htmlFor="q-name">
                    <input
                      id="q-name"
                      name="name"
                      required
                      autoComplete="name"
                      className="form-input"
                      placeholder="Jane Smith"
                    />
                  </Field>
                  <Field label="Phone" htmlFor="q-phone">
                    <input
                      id="q-phone"
                      name="phone"
                      type="tel"
                      required
                      autoComplete="tel"
                      className="form-input"
                      placeholder="(555) 000-0000"
                    />
                  </Field>
                </div>

                <Field label="Email" htmlFor="q-email" className="mt-4">
                  <input
                    id="q-email"
                    name="email"
                    type="email"
                    required
                    autoComplete="email"
                    className="form-input"
                    placeholder="you@email.com"
                  />
                </Field>

                <Field label="Service Needed" htmlFor="q-service" className="mt-4">
                  <select
                    id="q-service"
                    name="service"
                    className="form-input"
                    defaultValue=""
                  >
                    <option value="" disabled>
                      Select a service…
                    </option>
                    {services.map((s) => (
                      <option key={s.slug} value={s.title}>
                        {s.title}
                      </option>
                    ))}
                    <option value="Commercial Maintenance">
                      Commercial Maintenance
                    </option>
                    <option value="Other">Other / Not sure</option>
                  </select>
                </Field>

                <Field
                  label="Project Details (optional)"
                  htmlFor="q-message"
                  className="mt-4"
                >
                  <textarea
                    id="q-message"
                    name="message"
                    rows={3}
                    className="form-input resize-none"
                    placeholder="Tell us about your property and what you need…"
                  />
                </Field>

                <button type="submit" className="btn-primary mt-5 w-full">
                  Request My Free Estimate
                  <Icon name="arrowRight" className="h-4 w-4" />
                </button>
                <p className="mt-3 text-center text-xs text-bark/50">
                  Prefer to talk?{" "}
                  <a
                    href={site.phoneHref}
                    className="font-semibold text-forest-700 underline"
                  >
                    Call {site.phoneDisplay}
                  </a>
                </p>
              </form>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function Field({
  label,
  htmlFor,
  children,
  className = "",
}: {
  label: string;
  htmlFor: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={className}>
      <label
        htmlFor={htmlFor}
        className="mb-1.5 block text-sm font-semibold text-forest-900"
      >
        {label}
      </label>
      {children}
    </div>
  );
}
