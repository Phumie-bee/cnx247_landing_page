import type { Metadata } from "next";
import { Mail, Phone, MapPin, Clock, CheckCircle } from "lucide-react";
import Navbar from "@/components/Navbar";
import ContactForm from "./ContactForm";

export const metadata: Metadata = {
  title: "Contact Us | CNX247",
  description:
    "Get in touch with the CNX247 team. Whether you have a question, need a demo, or want to explore a partnership — we reply fast.",
};

const contactDetails = [
  {
    icon: Mail,
    label: "Email",
    value: "info@cnx247.com",
    href: "mailto:info@cnx247.com",
  },
  {
    icon: Phone,
    label: "Phone",
    value: "+234 901 640 0000",
    href: "tel:+23409016400000",
  },
  {
    icon: MapPin,
    label: "Location",
    value: "2A, Iller Crescent, Maitama, Abuja",
    href: null,
  },
  {
    icon: Clock,
    label: "Hours",
    value: "Mon – Fri · 9 AM – 6 PM WAT",
    href: null,
  },
];

export default function ContactPage() {
  return (
    <>
      <Navbar />
      <main className="mt-16 h-[calc(100svh-4rem)] flex overflow-hidden">
        {/* ── Left: dark info panel ─────────────────────────────────── */}
        <aside className="hidden lg:flex w-90 xl:w-100 shrink-0 bg-heading flex-col relative overflow-hidden  ">
          {/* Dot pattern */}
          <div
            aria-hidden="true"
            className="absolute inset-0 pointer-events-none"
            style={{
              backgroundImage:
                "radial-gradient(rgba(46,147,125,0.2) 1px, transparent 1px)",
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

          <div className="relative flex flex-col h-full p-10 xl:p-12">
            <div className="flex-1">
              <p className="text-[10px] font-bold uppercase tracking-[0.28em] text-primary mb-6">
                CNX247
              </p>

              <h1 className="text-3xl xl:text-[2.2rem] font-bold text-white leading-[1.12] mb-4">
                Let&apos;s build{" "}
                <span className="bg-linear-to-r from-primary to-accent bg-clip-text text-transparent">
                  something great
                </span>{" "}
                together.
              </h1>

              <p className="text-[13.5px] text-white/50 leading-relaxed mb-10">
                Whether it&apos;s a question, a demo, or a partnership —
                we&apos;re here and we reply fast.
              </p>

              <ul className="space-y-5" aria-label="Contact details">
                {contactDetails.map(({ icon: Icon, label, value, href }) => (
                  <li key={label} className="flex items-center gap-4">
                    <div className="w-9 h-9 rounded-xl bg-white/[0.07] border border-white/10 flex items-center justify-center text-primary shrink-0">
                      <Icon size={16} aria-hidden="true" strokeWidth={2} />
                    </div>
                    <div>
                      <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-white/30 mb-0.5">
                        {label}
                      </p>
                      {href ? (
                        <a
                          href={href}
                          className="text-[13px] font-medium text-white/75 hover:text-primary motion-safe:transition-colors"
                        >
                          {value}
                        </a>
                      ) : (
                        <p className="text-[13px] font-medium text-white/75">
                          {value}
                        </p>
                      )}
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex items-center gap-2 pt-7 border-t border-white/10">
              <CheckCircle
                size={13}
                className="text-primary shrink-0"
                aria-hidden="true"
              />
              <p className="text-[12px] text-white/40 leading-snug">
                We aim to respond within{" "}
                <span className="text-primary font-semibold">
                  2 business hours
                </span>
                .
              </p>
            </div>
          </div>
        </aside>

        {/* ── Right: form ───────────────────────────────────────────── */}
        <div className="flex-1 overflow-y-auto bg-white">
          <div className="min-h-full flex items-center justify-center px-6 py-10 md:px-12">
            <div className="w-full max-w-lg">
              <div className="mb-6">
                <h2 className="text-2xl font-bold text-heading mb-1.5">
                  Send us a message
                </h2>
                <p className="text-sm text-body">
                  Fill in the form and we&apos;ll get back to you shortly.
                </p>
              </div>
              <ContactForm />
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
