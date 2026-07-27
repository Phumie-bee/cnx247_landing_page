"use client";

import { useState, useRef } from "react";
import { ArrowRight, CheckCircle } from "lucide-react";

type FormData = {
  name: string;
  email: string;
  company: string;
  topic: string;
  meetingType: string;
  preferredDate: string;
  preferredTime: string;
  message: string;
};

type FormErrors = Partial<Record<keyof FormData, string>>;

const topics = [
  "General Inquiry",
  "Sales & Pricing",
  "Technical Support",
  "Partnership",
  "Other",
];

function validate(form: FormData): FormErrors {
  const errors: FormErrors = {};
  if (!form.name.trim()) errors.name = "Your name is required.";
  if (!form.email.trim()) {
    errors.email = "Your email address is required.";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
    errors.email = "Please enter a valid email address.";
  }
  if (!form.topic) errors.topic = "Please select a topic.";
  if (!form.message.trim()) {
    errors.message = "A message is required.";
  } else if (form.message.trim().length < 15) {
    errors.message =
      "Please give us a bit more detail (at least 15 characters).";
  }
  return errors;
}

export default function ContactForm() {
  const [form, setForm] = useState<FormData>({
    name: "",
    email: "",
    company: "",
    topic: "",
    meetingType: "",
    preferredDate: "",
    preferredTime: "",
    message: "",
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  // Shown when the network request itself fails — so we never falsely tell a
  // customer their message was received when it wasn't.
  const [submitError, setSubmitError] = useState<string | null>(null);
  // Honeypot: a hidden field real users never see. Bots fill every field, so a
  // non-empty value here means "spam" and we silently drop the submission.
  const botRef = useRef<HTMLInputElement>(null);
  // Earliest date a demo can be booked for — today (blocks past dates).
  const today = new Date().toISOString().split("T")[0];

  function handleChange(
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof FormData]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  }

  function handleBlur(
    e: React.FocusEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) {
    const field = e.target.name as keyof FormData;
    const fieldErrors = validate(form);
    if (fieldErrors[field]) {
      setErrors((prev) => ({ ...prev, [field]: fieldErrors[field] }));
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitError(null);

    const fieldErrors = validate(form);
    if (Object.keys(fieldErrors).length > 0) {
      setErrors(fieldErrors);
      const firstKey = Object.keys(fieldErrors)[0];
      document.getElementById(firstKey)?.focus();
      return;
    }

    // Bot detected via honeypot — pretend success so the bot moves on, but
    // never actually send or count it.
    if (botRef.current?.value) {
      setSubmitted(true);
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/bookings", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          company: form.company,
          topic: form.topic,
          meetingType: form.meetingType,
          preferredDate: form.preferredDate,
          preferredTime: form.preferredTime,
          message: form.message,
        }),
      });
      const data = await res.json();

      if (res.ok && data.success) {
        setSubmitted(true);
      } else {
        setSubmitError(
          "We couldn't send your request. Please try again, or email info@cnx247.com directly.",
        );
      }
    } catch {
      setSubmitError(
        "Network error — please check your connection and try again, or email info@cnx247.com directly.",
      );
    } finally {
      setLoading(false);
    }
  }

  if (submitted) {
    return (
      <div
        className="flex flex-col items-start py-4 text-left"
        role="status"
        aria-live="polite"
      >
        <div className="w-16 h-16 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center mb-6">
          <CheckCircle size={28} className="text-primary" aria-hidden="true" />
        </div>
        <h3 className="text-2xl font-bold text-heading mb-3">
          Message received!
        </h3>
        <p className="text-body text-[15px] leading-relaxed max-w-sm">
          Thanks for reaching out. We typically respond within 2 business hours.
        </p>
        <button
          onClick={() => {
            setForm({
              name: "",
              email: "",
              company: "",
              topic: "",
              meetingType: "",
              preferredDate: "",
              preferredTime: "",
              message: "",
            });
            setErrors({});
            setSubmitted(false);
          }}
          className="mt-7 text-sm font-semibold text-primary hover:text-heading motion-safe:transition-colors"
        >
          Send another message →
        </button>
      </div>
    );
  }

  const base =
    "w-full rounded-xl border px-4 py-3 text-[14px] text-heading placeholder:text-body/40 bg-white outline-none motion-safe:transition-all duration-200 focus:ring-2 focus:ring-offset-0";
  const normal = "border-border focus:border-primary/40 focus:ring-primary/15";
  const errored = "border-red-300 focus:border-red-400 focus:ring-red-100";

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      aria-label="Contact form"
      className="space-y-5"
    >
      {/* Honeypot — hidden from people, catches bots. Leave empty; do not remove. */}
      <input
        ref={botRef}
        type="text"
        name="botcheck"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        className="hidden"
      />

      <div className="grid sm:grid-cols-2 gap-5">
        {/* Name */}
        <div>
          <label
            htmlFor="name"
            className="block text-[13px] font-semibold text-heading mb-2"
          >
            Full name{" "}
            <span className="text-red-400" aria-hidden="true">
              *
            </span>
          </label>
          <input
            id="name"
            name="name"
            type="text"
            autoComplete="name"
            placeholder="Adaeze Okonkwo"
            value={form.name}
            onChange={handleChange}
            onBlur={handleBlur}
            aria-required="true"
            aria-invalid={!!errors.name}
            aria-describedby={errors.name ? "name-err" : undefined}
            className={`${base} ${errors.name ? errored : normal}`}
          />
          {errors.name && (
            <p
              id="name-err"
              role="alert"
              className="mt-1.5 text-[12px] text-red-500"
            >
              {errors.name}
            </p>
          )}
        </div>

        {/* Email */}
        <div>
          <label
            htmlFor="email"
            className="block text-[13px] font-semibold text-heading mb-2"
          >
            Email address{" "}
            <span className="text-red-400" aria-hidden="true">
              *
            </span>
          </label>
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            placeholder="you@company.com"
            value={form.email}
            onChange={handleChange}
            onBlur={handleBlur}
            aria-required="true"
            aria-invalid={!!errors.email}
            aria-describedby={errors.email ? "email-err" : undefined}
            className={`${base} ${errors.email ? errored : normal}`}
          />
          {errors.email && (
            <p
              id="email-err"
              role="alert"
              className="mt-1.5 text-[12px] text-red-500"
            >
              {errors.email}
            </p>
          )}
        </div>
      </div>

      <div className="grid sm:grid-cols-2 gap-5">
        {/* Company */}
        <div>
          <label
            htmlFor="company"
            className="block text-[13px] font-semibold text-heading mb-2"
          >
            Company{" "}
            <span className="text-[12px] font-normal text-body/50">
              (optional)
            </span>
          </label>
          <input
            id="company"
            name="company"
            type="text"
            autoComplete="organization"
            placeholder="Acme Industries"
            value={form.company}
            onChange={handleChange}
            className={`${base} ${normal}`}
          />
        </div>

        {/* Topic */}
        <div>
          <label
            htmlFor="topic"
            className="block text-[13px] font-semibold text-heading mb-2"
          >
            How can we help?{" "}
            <span className="text-red-400" aria-hidden="true">
              *
            </span>
          </label>
          <select
            id="topic"
            name="topic"
            value={form.topic}
            onChange={handleChange}
            onBlur={handleBlur}
            aria-required="true"
            aria-invalid={!!errors.topic}
            aria-describedby={errors.topic ? "topic-err" : undefined}
            className={`${base} cursor-pointer appearance-none ${errors.topic ? errored : normal} ${
              !form.topic ? "text-body/40" : "text-heading"
            }`}
          >
            <option value="" disabled>
              Select a topic…
            </option>
            {topics.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
          {errors.topic && (
            <p
              id="topic-err"
              role="alert"
              className="mt-1.5 text-[12px] text-red-500"
            >
              {errors.topic}
            </p>
          )}
        </div>
      </div>

      {/* Preferred meeting type (optional) */}
      <div>
        <label htmlFor="meetingType" className="block text-[13px] font-semibold text-heading mb-2">
          Preferred meeting type{" "}
          <span className="text-[12px] font-normal text-body/50">(optional)</span>
        </label>
        <select
          id="meetingType"
          name="meetingType"
          value={form.meetingType}
          onChange={handleChange}
          className={`${base} cursor-pointer appearance-none ${normal} ${
            !form.meetingType ? "text-body/40" : "text-heading"
          }`}
        >
          <option value="">No preference</option>
          <option value="Onsite">Onsite</option>
          <option value="Virtual">Virtual</option>
        </select>
      </div>

      {/* Preferred demo date & time (optional) */}
      <div className="grid sm:grid-cols-2 gap-5">
        <div>
          <label
            htmlFor="preferredDate"
            className="block text-[13px] font-semibold text-heading mb-2"
          >
            Preferred demo date{" "}
            <span className="text-[12px] font-normal text-body/50">
              (optional)
            </span>
          </label>
          <input
            id="preferredDate"
            name="preferredDate"
            type="date"
            min={today}
            value={form.preferredDate}
            onChange={handleChange}
            className={`${base} ${normal} cursor-pointer ${
              !form.preferredDate ? "text-body/40" : "text-heading"
            }`}
          />
        </div>

        <div>
          <label
            htmlFor="preferredTime"
            className="block text-[13px] font-semibold text-heading mb-2"
          >
            Preferred time{" "}
            <span className="text-[12px] font-normal text-body/50">
              (optional)
            </span>
          </label>
          <input
            id="preferredTime"
            name="preferredTime"
            type="time"
            value={form.preferredTime}
            onChange={handleChange}
            className={`${base} ${normal} cursor-pointer ${
              !form.preferredTime ? "text-body/40" : "text-heading"
            }`}
          />
        </div>
      </div>

      {/* Message */}
      <div>
        <label
          htmlFor="message"
          className="block text-[13px] font-semibold text-heading mb-2"
        >
          Message{" "}
          <span className="text-red-400" aria-hidden="true">
            *
          </span>
        </label>
        <textarea
          id="message"
          name="message"
          rows={5}
          placeholder="Tell us what you need — the more context, the better we can help."
          value={form.message}
          onChange={handleChange}
          onBlur={handleBlur}
          aria-required="true"
          aria-invalid={!!errors.message}
          aria-describedby={errors.message ? "message-err" : undefined}
          className={`${base} resize-none ${errors.message ? errored : normal}`}
        />
        {errors.message && (
          <p
            id="message-err"
            role="alert"
            className="mt-1.5 text-[12px] text-red-500"
          >
            {errors.message}
          </p>
        )}
      </div>

      {/* Submission error — shown only when the send actually fails */}
      {submitError && (
        <p
          role="alert"
          className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-[13px] leading-relaxed text-red-600"
        >
          {submitError}
        </p>
      )}

      {/* Submit */}
      <button
        type="submit"
        disabled={loading}
        className="group w-full inline-flex items-center justify-center gap-2.5 rounded-xl bg-heading text-white hover:bg-primary! disabled:opacity-60 disabled:cursor-not-allowed px-6 py-3.5 text-sm font-semibold motion-safe:transition-colors duration-200 shadow-lg shadow-heading/15"
      >
        {loading ? (
          <>
            <span
              className="w-4 h-4 rounded-full border-2 border-white/30 border-t-white animate-spin"
              aria-hidden="true"
            />
            Sending…
          </>
        ) : (
          <>
            Send message
            <ArrowRight
              size={16}
              strokeWidth={2.5}
              aria-hidden="true"
              className="motion-safe:transition-transform group-hover:translate-x-0.5"
            />
          </>
        )}
      </button>

      <p className="text-center text-[11px] text-body/50 leading-relaxed">
        We respect your privacy. Your details are never shared with third
        parties.
      </p>
    </form>
  );
}
