"use client";

import { CheckCircle2 } from "lucide-react";
import useReveal from "@/hooks/useReveal";

type Plan = {
  name: string;
  description: string;
  amount: string | null; // naira amount without symbol; null = custom/contact
  priceLabel?: string; // shown when amount is null
  accent: string; // per-plan heading + check colour
  features: string[];
};

const plans: Plan[] = [
  {
    name: "Startup",
    description: "Best for beginners who want to explore the platform.",
    amount: "10,000",
    accent: "#2e937d",
    features: [
      "Email",
      "Announcement",
      "Workgroup",
      "Cash Requisition",
      "Trainings",
      "Reminders",
      "CRM",
      "Mobile App",
    ],
  },
  {
    name: "SMB",
    description: "Perfect for professionals who need advanced tools.",
    amount: "18,000",
    accent: "#a9cf46",
    features: [
      "Email",
      "Announcement",
      "Workgroup",
      "Cash Requisition",
      "Trainings",
      "Reminders",
      "CRM",
      "Mobile App",
      "Chat",
      "Query",
      "Workflow",
      "GDrive",
      "eMeeting",
      "Leave Administration",
      "Performance Management",
      "Attendance",
    ],
  },
  {
    name: "Enterprise",
    description: "For businesses and power users who want it all.",
    amount: null,
    priceLabel: "Custom",
    accent: "#2e937d",
    features: [
      "Email",
      "Announcement",
      "Workgroup",
      "Cash Requisition",
      "Trainings",
      "Reminders",
      "CRM",
      "Mobile App",
      "Chat",
      "Query",
      "Workflow",
      "GDrive",
      "eMeeting",
      "Leave Administration",
      "Performance Management",
      "Attendance",
      "Memo",
      "Circular",
      "Registry",
    ],
  },
];

export default function Pricing() {
  const sectionRef = useReveal();

  return (
    <section
      id="pricing"
      ref={sectionRef}
      className="relative overflow-hidden bg-white py-20 md:py-28"
    >
      {/* Giant watermark heading */}
      <h2
        aria-label="Pricing"
        className="pointer-events-none absolute inset-x-0 top-1 select-none text-center text-[26vw] font-extrabold leading-none tracking-tight text-heading/6 md:top-1 md:text-[17rem]"
      >
        Pricing
      </h2>

      <div className="relative mx-auto max-w-7xl px-6 md:px-8">
        <div className="mt-14 grid items-start gap-6 md:mt-14 lg:grid-cols-3 lg:gap-7">
          {plans.map((plan, i) => {
            const prev = i > 0 ? plans[i - 1] : null;
            const extras = prev
              ? plan.features.filter((f) => !prev.features.includes(f))
              : plan.features;

            return (
              <div
                key={plan.name}
                style={{ "--plan-accent": plan.accent } as React.CSSProperties}
                className="group reveal flex flex-col rounded-3xl border border-border bg-gradient-to-b from-white to-subtle/40 p-7 shadow-sm transition-all duration-300 hover:-translate-y-2 hover:border-[var(--plan-accent)] hover:shadow-xl md:p-8"
              >
                <h3
                  className="text-2xl font-bold"
                  style={{ color: plan.accent }}
                >
                  {plan.name}
                </h3>
                <p className="mt-2 min-h-[3rem] text-sm leading-relaxed text-body">
                  {plan.description}
                </p>

                {/* Price */}
                <div className="mt-6 flex items-end gap-1.5">
                  {plan.amount ? (
                    <>
                      <span className="mt-2 self-start text-2xl font-bold text-heading">
                        ₦
                      </span>
                      <span className="inline-block text-5xl font-extrabold tracking-tight text-heading transition-transform duration-300 group-hover:scale-105 md:text-6xl">
                        {plan.amount}
                      </span>
                      <span className="mb-2 text-sm text-body">/month</span>
                    </>
                  ) : (
                    <span className="inline-block text-5xl font-extrabold tracking-tight text-heading transition-transform duration-300 group-hover:scale-105 md:text-6xl">
                      {plan.priceLabel}
                    </span>
                  )}
                </div>

                {/* CTA */}
                <a
                  href="/contact"
                  className="mt-7 block rounded-xl border border-border py-3.5 text-center font-semibold text-heading transition-all duration-300 hover:border-[var(--plan-accent)] hover:bg-[var(--plan-accent)] hover:text-white"
                >
                  Get Started
                </a>

                {/* Features */}
                <ul className="mt-7 space-y-3">
                  {prev && (
                    <li className="text-sm font-semibold text-heading">
                      Everything in {prev.name}, plus:
                    </li>
                  )}
                  {extras.map((feature) => (
                    <li
                      key={feature}
                      className="group/item flex cursor-default items-center gap-2.5 text-sm text-body transition-transform duration-200 hover:translate-x-1"
                    >
                      <CheckCircle2
                        className="h-5 w-5 shrink-0 transition-transform duration-200 group-hover/item:scale-110"
                        strokeWidth={2}
                        style={{ color: plan.accent }}
                      />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
