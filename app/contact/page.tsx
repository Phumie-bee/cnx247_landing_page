import type { Metadata } from "next";
import {
  Mail,
  Phone,
  MapPin,
  Clock,
  MessageCircle,
  Headphones,
  Handshake,
  ArrowRight,
  CheckCircle,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ContactForm from "./ContactForm";

export const metadata: Metadata = {
  title: "Contact Us | CNX247",
  description:
    "Get in touch with the CNX247 team. Whether you have a question, need a demo, or want to explore a partnership — we reply fast.",
};

const contactDetails = [
  {
    icon: Mail,
    label: "Email us",
    value: "hello@cnx247.com",
    href: "mailto:hello@cnx247.com",
  },
  {
    icon: Phone,
    label: "Call us",
    value: "+234 901 234 5678",
    href: "tel:+2349012345678",
  },
  {
    icon: MapPin,
    label: "Visit us",
    value: "Victoria Island, Lagos, Nigeria",
    href: null,
  },
  {
    icon: Clock,
    label: "Working hours",
    value: "Mon – Fri, 9 AM – 6 PM WAT",
    href: null,
  },
];

const stats = [
  { value: "500+", label: "Businesses" },
  { value: "< 2 hrs", label: "Avg. reply" },
  { value: "99%", label: "Satisfaction" },
];

const categories = [
  {
    icon: MessageCircle,
    title: "General Inquiries",
    description:
      "Questions about our platform, getting started, or how CNX247 can help your business grow?",
    email: "hello@cnx247.com",
  },
  {
    icon: Headphones,
    title: "Customer Support",
    description:
      "Already using CNX247? Our support team is ready to resolve any issue you're running into.",
    email: "support@cnx247.com",
  },
  {
    icon: Handshake,
    title: "Partnerships",
    description:
      "Exploring reseller, integration, or co-marketing partnership opportunities with CNX247?",
    email: "partnerships@cnx247.com",
  },
];

export default function ContactPage() {
  return (
    <>
      <Navbar />
      <main>
        {/* ── Hero ───────────────────────────────────────────────────── */}
        <section className="relative pt-32 pb-14 md:pt-40 md:pb-18 overflow-hidden bg-white">
          {/* Ambient glows */}
          <div
            aria-hidden="true"
            className="absolute -top-28 left-1/2 -translate-x-1/2 w-[52rem] h-[24rem] bg-primary/8 rounded-full blur-[110px] pointer-events-none"
          />
          <div
            aria-hidden="true"
            className="absolute top-36 right-[12%] w-52 h-52 bg-accent/8 rounded-full blur-3xl pointer-events-none"
          />

          <div className="relative max-w-5xl mx-auto px-6 md:px-8 text-center">
            <span className="inline-flex items-center gap-2 py-1.5 px-4 rounded-full bg-bg-light border border-primary/20 text-primary text-[11px] font-bold tracking-[0.22em] uppercase mb-8">
              <span
                aria-hidden="true"
                className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse"
              />
              Get in touch
            </span>

            <h1 className="text-4xl md:text-[3.5rem] lg:text-6xl font-bold text-heading tracking-tight leading-[1.04] mb-6">
              Let&apos;s build something{" "}
              <span className="bg-linear-to-r from-primary to-accent bg-clip-text text-transparent">
                great together.
              </span>
            </h1>

            <p className="text-lg md:text-xl text-body leading-relaxed max-w-xl mx-auto">
              Whether you have a question, need a product demo, or want to
              explore a partnership — our team is here, and we reply fast.
            </p>
          </div>
        </section>

        {/* ── Split: Info panel + Form ───────────────────────────────── */}
        <section className="pb-24 md:pb-32 bg-white">
          <div className="max-w-6xl mx-auto px-6 md:px-8">
            <div className="grid lg:grid-cols-[5fr_7fr] gap-10 lg:gap-14 items-start">

              {/* Left — dark info card (sticky on large screens) */}
              <div className="lg:sticky lg:top-28 lg:self-start">
                <div className="relative rounded-3xl bg-heading overflow-hidden">
                  {/* Dot pattern */}
                  <div
                    aria-hidden="true"
                    className="absolute inset-0"
                    style={{
                      backgroundImage:
                        "radial-gradient(rgba(46,147,125,0.22) 1px, transparent 1px)",
                      backgroundSize: "22px 22px",
                    }}
                  />
                  {/* Glows */}
                  <div
                    aria-hidden="true"
                    className="absolute -top-20 -right-16 w-72 h-72 bg-primary/20 rounded-full blur-3xl pointer-events-none"
                  />
                  <div
                    aria-hidden="true"
                    className="absolute -bottom-16 -left-16 w-64 h-64 bg-accent/10 rounded-full blur-3xl pointer-events-none"
                  />

                  <div className="relative p-8 lg:p-10">
                    <p className="text-[10px] font-bold uppercase tracking-[0.28em] text-primary mb-5">
                      CNX247 Team
                    </p>

                    <h2 className="text-2xl lg:text-[1.7rem] font-bold text-white leading-snug mb-4">
                      We&apos;re here for you,{" "}
                      <br className="hidden sm:block lg:hidden xl:block" />
                      every step of the way.
                    </h2>

                    <p className="text-[14px] text-white/55 leading-relaxed mb-8">
                      Our team understands the challenges of running a business
                      in Nigeria. We&apos;re fast, friendly, and genuinely
                      invested in your success.
                    </p>

                    <div className="h-px bg-white/10 mb-8" />

                    {/* Contact details */}
                    <ul className="space-y-5 mb-8" aria-label="Contact details">
                      {contactDetails.map(({ icon: Icon, label, value, href }) => (
                        <li key={label} className="flex items-start gap-4">
                          <div className="w-10 h-10 rounded-xl bg-white/[0.07] border border-white/10 flex items-center justify-center text-primary shrink-0 mt-0.5">
                            <Icon size={17} aria-hidden="true" strokeWidth={2} />
                          </div>
                          <div>
                            <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-white/35 mb-1">
                              {label}
                            </p>
                            {href ? (
                              <a
                                href={href}
                                className="text-[14px] font-medium text-white/80 hover:text-primary motion-safe:transition-colors"
                              >
                                {value}
                              </a>
                            ) : (
                              <p className="text-[14px] font-medium text-white/80">
                                {value}
                              </p>
                            )}
                          </div>
                        </li>
                      ))}
                    </ul>

                    <div className="h-px bg-white/10 mb-8" />

                    {/* Trust stats */}
                    <div className="grid grid-cols-3 gap-3">
                      {stats.map(({ value, label }) => (
                        <div
                          key={label}
                          className="rounded-xl bg-white/[0.06] border border-white/10 p-3.5 text-center"
                        >
                          <p className="text-lg font-bold text-white tabular-nums leading-none mb-1">
                            {value}
                          </p>
                          <p className="text-[10px] text-white/40 font-medium uppercase tracking-wider">
                            {label}
                          </p>
                        </div>
                      ))}
                    </div>

                    {/* Response time badge */}
                    <div className="mt-6 flex items-center gap-2">
                      <CheckCircle
                        size={14}
                        className="text-primary shrink-0"
                        aria-hidden="true"
                      />
                      <p className="text-[12px] text-white/50 leading-snug">
                        We aim to respond to every message within{" "}
                        <span className="text-primary font-semibold">
                          2 business hours
                        </span>
                        .
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right — form card */}
              <div>
                <div className="rounded-3xl bg-linear-to-br from-primary/25 via-accent/15 to-transparent p-px shadow-[0_28px_64px_-18px_rgba(46,147,125,0.2)]">
                  <div className="rounded-[calc(1.5rem-1px)] bg-white p-8 lg:p-10">
                    <div className="mb-8">
                      <h2 className="text-xl font-bold text-heading mb-2">
                        Send us a message
                      </h2>
                      <p className="text-sm text-body leading-relaxed">
                        Fill in the form and we&apos;ll get back to you as soon
                        as possible.
                      </p>
                    </div>
                    <ContactForm />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── Direct contact categories ──────────────────────────────── */}
        <section className="py-20 md:py-24 bg-bg-light/50">
          <div className="max-w-6xl mx-auto px-6 md:px-8">
            <div className="text-center max-w-lg mx-auto mb-12">
              <p className="text-[10px] font-bold uppercase tracking-[0.24em] text-primary mb-4">
                Direct contact
              </p>
              <h2 className="text-2xl md:text-3xl font-bold text-heading tracking-tight leading-snug">
                Prefer to reach out directly?
              </h2>
              <p className="text-body mt-3 text-[15px] leading-relaxed">
                Route your message to exactly the right team from the start.
              </p>
            </div>

            <div className="grid sm:grid-cols-3 gap-5">
              {categories.map(({ icon: Icon, title, description, email }) => (
                <a
                  key={title}
                  href={`mailto:${email}`}
                  className="group flex flex-col gap-5 p-7 rounded-2xl bg-white border border-primary/8 hover:border-primary/25 hover:-translate-y-1 hover:shadow-xl hover:shadow-primary/7 motion-safe:transition-all duration-200 min-h-[44px]"
                >
                  <div className="w-12 h-12 rounded-xl bg-bg-light border border-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white motion-safe:transition-colors duration-200 shrink-0">
                    <Icon size={20} aria-hidden="true" strokeWidth={2} />
                  </div>

                  <div className="flex-1">
                    <h3 className="font-semibold text-heading text-[15px] mb-2">
                      {title}
                    </h3>
                    <p className="text-[13px] text-body leading-relaxed">
                      {description}
                    </p>
                  </div>

                  <div className="flex items-center gap-1.5 text-[12px] font-semibold text-primary group-hover:gap-2.5 motion-safe:transition-all truncate">
                    <span className="truncate">{email}</span>
                    <ArrowRight
                      size={12}
                      strokeWidth={2.5}
                      aria-hidden="true"
                      className="shrink-0"
                    />
                  </div>
                </a>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
