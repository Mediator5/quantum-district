"use client";

import { AnimatePresence, motion } from "framer-motion";
import { AlertCircle, ArrowRight, CheckCircle2, Loader2 } from "lucide-react";
import { useState } from "react";
import { budgetRanges, projectTypes, site, timelines } from "@/data/site";

type Status = "idle" | "sending" | "sent" | "error";

const field =
  "w-full rounded-xl border border-navy-900/12 bg-white px-4 py-3.5 text-[15px] text-navy-950 placeholder:text-navy-900/35 transition-colors focus:border-brand-500 focus:ring-4 focus:ring-brand-500/10 focus:outline-none";
const label =
  "mb-2 block text-[12px] font-semibold tracking-[0.1em] text-navy-900/55 uppercase";

export function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (status === "sending") return;

    const form = e.currentTarget;
    const fd = new FormData(form);
    const payload = Object.fromEntries(fd.entries());

    setStatus("sending");
    setError(null);
    setFieldErrors({});

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...payload,
          pageUrl: typeof window !== "undefined" ? window.location.href : "",
        }),
      });
      const data = await res.json();

      if (!res.ok || !data?.ok) {
        setFieldErrors(data?.fieldErrors || {});
        setError(data?.error || "Something went wrong. Please try again.");
        setStatus("error");
        return;
      }

      form.reset();
      setStatus("sent");
    } catch {
      setError(
        "We couldn't reach the server. Please try again, or email us directly.",
      );
      setStatus("error");
    }
  }

  return (
    <div className="relative overflow-hidden rounded-[1.75rem] border border-navy-900/9 bg-white p-6 shadow-lift-lg sm:p-9">
      <span
        aria-hidden
        className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-brand-600 via-brand-400 to-accent-500"
      />

      <AnimatePresence mode="wait">
        {status === "sent" ? (
          <motion.div
            key="success"
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            className="py-10 text-center"
          >
            <motion.span
              initial={{ scale: 0.6, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: "spring", stiffness: 220, damping: 16 }}
              className="mx-auto grid h-16 w-16 place-items-center rounded-2xl bg-emerald-50 text-emerald-600"
            >
              <CheckCircle2 className="h-8 w-8" />
            </motion.span>
            <h3 className="mt-6 font-display text-2xl font-bold text-navy-950">
              Message received.
            </h3>
            <p className="mx-auto mt-3 max-w-sm text-[15.5px] leading-relaxed text-navy-900/65">
              A senior consultant is reviewing it now and will reply personally in{" "}
              {site.responseWindow}. We&apos;ve sent a confirmation to your inbox.
            </p>
            <button
              onClick={() => setStatus("idle")}
              className="mt-7 inline-flex items-center gap-2 rounded-full border border-navy-900/15 px-5 py-3 text-[14px] font-semibold text-navy-950 transition-colors hover:border-navy-900/35"
            >
              Send another message
            </button>
          </motion.div>
        ) : (
          <motion.form
            key="form"
            onSubmit={onSubmit}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-5"
            noValidate
          >
            {/* honeypot */}
            <input
              type="text"
              name="website"
              tabIndex={-1}
              autoComplete="off"
              aria-hidden
              className="pointer-events-none absolute -left-[9999px] h-0 w-0 opacity-0"
            />

            <div className="grid gap-5 sm:grid-cols-2">
              <div>
                <label className={label} htmlFor="name">
                  Full name *
                </label>
                <input
                  id="name"
                  name="name"
                  required
                  autoComplete="name"
                  placeholder="Jordan Reyes"
                  className={field}
                />
                <FieldError message={fieldErrors.name} />
              </div>
              <div>
                <label className={label} htmlFor="email">
                  Work email *
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  autoComplete="email"
                  placeholder="jordan@organization.gov"
                  className={field}
                />
                <FieldError message={fieldErrors.email} />
              </div>
            </div>

            <div className="grid gap-5 sm:grid-cols-2">
              <div>
                <label className={label} htmlFor="company">
                  Organization
                </label>
                <input
                  id="company"
                  name="company"
                  autoComplete="organization"
                  placeholder="Department, agency, or company"
                  className={field}
                />
              </div>
              <div>
                <label className={label} htmlFor="phone">
                  Phone
                </label>
                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  autoComplete="tel"
                  placeholder="Optional"
                  className={field}
                />
              </div>
            </div>

            <div>
              <label className={label} htmlFor="projectType">
                What do you need help with?
              </label>
              <select id="projectType" name="projectType" className={field} defaultValue="">
                <option value="" disabled>
                  Select an area
                </option>
                {projectTypes.map((p) => (
                  <option key={p} value={p}>
                    {p}
                  </option>
                ))}
              </select>
            </div>

            <div className="grid gap-5 sm:grid-cols-2">
              <div>
                <label className={label} htmlFor="budget">
                  Estimated budget
                </label>
                <select id="budget" name="budget" className={field} defaultValue="">
                  <option value="" disabled>
                    Select a range
                  </option>
                  {budgetRanges.map((b) => (
                    <option key={b} value={b}>
                      {b}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className={label} htmlFor="timeline">
                  Timeline
                </label>
                <select id="timeline" name="timeline" className={field} defaultValue="">
                  <option value="" disabled>
                    When would you start?
                  </option>
                  {timelines.map((t) => (
                    <option key={t} value={t}>
                      {t}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label className={label} htmlFor="message">
                Tell us about the challenge *
              </label>
              <textarea
                id="message"
                name="message"
                required
                rows={5}
                placeholder="What is the initiative, the constraint, or the deadline you're working against?"
                className={`${field} resize-y`}
              />
              <FieldError message={fieldErrors.message} />
            </div>

            <AnimatePresence>
              {error && (
                <motion.p
                  initial={{ opacity: 0, y: -6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="flex items-start gap-2.5 rounded-xl border border-accent-500/25 bg-accent-500/6 px-4 py-3 text-[14px] text-accent-600"
                >
                  <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
                  {error}
                </motion.p>
              )}
            </AnimatePresence>

            <button
              type="submit"
              disabled={status === "sending"}
              className="group relative inline-flex w-full items-center justify-center gap-2.5 overflow-hidden rounded-full bg-navy-950 px-8 py-4.5 text-[15px] font-bold tracking-wide text-white transition-all duration-300 hover:bg-brand-600 disabled:opacity-70"
            >
              {status === "sending" ? (
                <>
                  <Loader2 className="h-4.5 w-4.5 animate-spin" />
                  SENDING…
                </>
              ) : (
                <>
                  START A CONVERSATION
                  <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                </>
              )}
            </button>

            <p className="text-center text-[12.5px] leading-relaxed text-navy-900/45">
              We reply in {site.responseWindow}. Your information stays with our
              consulting team — never shared, never sold.
            </p>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}

function FieldError({ message }: { message?: string }) {
  if (!message) return null;
  return (
    <p className="mt-2 flex items-center gap-1.5 text-[13px] text-accent-600">
      <AlertCircle className="h-3.5 w-3.5" />
      {message}
    </p>
  );
}
