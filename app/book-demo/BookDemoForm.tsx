"use client";

import { useState, useRef } from "react";
import { ArrowRight, CalendarCheck } from "lucide-react";

type FormData = {
  name: string;
  email: string;
  company: string;
  meetingType: string;
  preferredDate: string;
  preferredTime: string;
  message: string;
};

type FormErrors = Partial<Record<keyof FormData, string>>;

/** Local "YYYY-MM-DD" for today — used as the date input's floor. */
function todayLocal(): string {
  const now = new Date();
  const pad = (n: number) => String(n).padStart(2, "0");
  return `${now.getFullYear()}-${pad(now.getMonth() + 1)}-${pad(now.getDate())}`;
}

function validate(form: FormData): FormErrors {
  const errors: FormErrors = {};
  if (!form.name.trim()) errors.name = "Your name is required.";
  if (!form.email.trim()) {
    errors.email = "Your email address is required.";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
    errors.email = "Please enter a valid email address.";
  }
  if (!form.meetingType)
    errors.meetingType = "Please choose onsite or virtual.";
  if (!form.preferredDate) {
    errors.preferredDate = "Please pick a date.";
  }
  if (!form.preferredTime) {
    errors.preferredTime = "Please pick a time.";
  }
  // The slot is confirmed the moment it's submitted, so it has to be ahead of
  // now — not merely today. The server enforces this too.
  if (form.preferredDate && form.preferredTime) {
    const slot = new Date(`${form.preferredDate}T${form.preferredTime}`);
    if (!Number.isNaN(slot.getTime()) && slot.getTime() <= Date.now()) {
      errors.preferredTime = "Please choose a time in the future.";
    }
  }
  return errors;
}

export default function BookDemoForm() {
  const [form, setForm] = useState<FormData>({
    name: "",
    email: "",
    company: "",
    meetingType: "",
    preferredDate: "",
    preferredTime: "",
    message: "",
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  // Held onto so the success screen can name the slot back to the customer.
  const [bookedSlot, setBookedSlot] = useState<string>("");
  // Shown when the network request itself fails — so we never falsely tell a
  // customer their demo is booked when it isn't.
  const [submitError, setSubmitError] = useState<string | null>(null);
  // Honeypot: a hidden field real users never see. Bots fill every field, so a
  // non-empty value here means "spam" and we silently drop the submission.
  const botRef = useRef<HTMLInputElement>(null);
  const today = todayLocal();

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
      const res = await fetch("/api/demo", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(form),
      });
      const data = await res.json();

      if (res.ok && data.success) {
        setBookedSlot(
          new Date(
            `${form.preferredDate}T${form.preferredTime}`,
          ).toLocaleString("en-GB", {
            weekday: "long",
            day: "numeric",
            month: "long",
            hour: "2-digit",
            minute: "2-digit",
          }),
        );
        setSubmitted(true);
      } else {
        setSubmitError(
          data.error ||
            "We couldn't book your demo. Please try again, or email enquiry@connexxiongroup.com directly.",
        );
      }
    } catch {
      setSubmitError(
        "Network error — please check your connection and try again, or email enquiry@connexxiongroup.com directly.",
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
          <CalendarCheck
            size={28}
            className="text-primary"
            aria-hidden="true"
          />
        </div>
        <h3 className="text-2xl font-bold text-heading mb-3">
          Your demo is booked!
        </h3>
        <p className="text-body text-[15px] leading-relaxed max-w-sm">
          {bookedSlot ? (
            <>
              We&apos;ll see you on{" "}
              <span className="font-semibold text-heading">{bookedSlot}</span>.
              A confirmation is on its way to your inbox.
            </>
          ) : (
            <>A confirmation is on its way to your inbox.</>
          )}
        </p>
        <button
          onClick={() => {
            setForm({
              name: "",
              email: "",
              company: "",
              meetingType: "",
              preferredDate: "",
              preferredTime: "",
              message: "",
            });
            setErrors({});
            setBookedSlot("");
            setSubmitted(false);
          }}
          className="mt-7 text-sm font-semibold text-primary hover:text-heading motion-safe:transition-colors"
        >
          Book another demo →
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
      aria-label="Book a demo"
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
            Work email{" "}
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

        {/* Meeting type */}
        <div>
          <label
            htmlFor="meetingType"
            className="block text-[13px] font-semibold text-heading mb-2"
          >
            Meeting type{" "}
            <span className="text-red-400" aria-hidden="true">
              *
            </span>
          </label>
          <select
            id="meetingType"
            name="meetingType"
            value={form.meetingType}
            onChange={handleChange}
            onBlur={handleBlur}
            aria-required="true"
            aria-invalid={!!errors.meetingType}
            aria-describedby={
              errors.meetingType ? "meetingType-err" : undefined
            }
            className={`${base} cursor-pointer appearance-none ${errors.meetingType ? errored : normal} ${
              !form.meetingType ? "text-body/40" : "text-heading"
            }`}
          >
            <option value="" disabled>
              Select meeting type…
            </option>
            <option value="Virtual">Virtual</option>
            <option value="Onsite">Onsite</option>
          </select>
          {errors.meetingType && (
            <p
              id="meetingType-err"
              role="alert"
              className="mt-1.5 text-[12px] text-red-500"
            >
              {errors.meetingType}
            </p>
          )}
        </div>
      </div>

      <div className="grid sm:grid-cols-2 gap-5">
        {/* Date */}
        <div>
          <label
            htmlFor="preferredDate"
            className="block text-[13px] font-semibold text-heading mb-2"
          >
            Date{" "}
            <span className="text-red-400" aria-hidden="true">
              *
            </span>
          </label>
          <input
            id="preferredDate"
            name="preferredDate"
            type="date"
            min={today}
            value={form.preferredDate}
            onChange={handleChange}
            onBlur={handleBlur}
            aria-required="true"
            aria-invalid={!!errors.preferredDate}
            aria-describedby={
              errors.preferredDate ? "preferredDate-err" : undefined
            }
            className={`${base} cursor-pointer ${errors.preferredDate ? errored : normal} ${
              !form.preferredDate ? "text-body/40" : "text-heading"
            }`}
          />
          {errors.preferredDate && (
            <p
              id="preferredDate-err"
              role="alert"
              className="mt-1.5 text-[12px] text-red-500"
            >
              {errors.preferredDate}
            </p>
          )}
        </div>

        {/* Time */}
        <div>
          <label
            htmlFor="preferredTime"
            className="block text-[13px] font-semibold text-heading mb-2"
          >
            Time{" "}
            <span className="text-[12px] font-normal text-body/50">(WAT)</span>{" "}
            <span className="text-red-400" aria-hidden="true">
              *
            </span>
          </label>
          <input
            id="preferredTime"
            name="preferredTime"
            type="time"
            value={form.preferredTime}
            onChange={handleChange}
            onBlur={handleBlur}
            aria-required="true"
            aria-invalid={!!errors.preferredTime}
            aria-describedby={
              errors.preferredTime ? "preferredTime-err" : undefined
            }
            className={`${base} cursor-pointer ${errors.preferredTime ? errored : normal} ${
              !form.preferredTime ? "text-body/40" : "text-heading"
            }`}
          />
          {errors.preferredTime && (
            <p
              id="preferredTime-err"
              role="alert"
              className="mt-1.5 text-[12px] text-red-500"
            >
              {errors.preferredTime}
            </p>
          )}
        </div>
      </div>

      {/* Notes */}
      <div>
        <label
          htmlFor="message"
          className="block text-[13px] font-semibold text-heading mb-2"
        >
          Anything you&apos;d like us to focus on?{" "}
          <span className="text-[12px] font-normal text-body/50">
            (optional)
          </span>
        </label>
        <textarea
          id="message"
          name="message"
          rows={4}
          placeholder="Tell us about your team size, the modules you're most interested in, or any specific problem you're trying to solve."
          value={form.message}
          onChange={handleChange}
          className={`${base} resize-none ${normal}`}
        />
      </div>

      {/* Submission error — shown only when the booking actually fails */}
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
            Booking…
          </>
        ) : (
          <>
            Confirm my demo
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
        Your slot is confirmed instantly. Need a different time later? Just
        reply to the confirmation email.
      </p>
    </form>
  );
}
