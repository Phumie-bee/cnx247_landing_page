"use client";

import { useState } from "react";

const plans = [
  {
    name: "Enterprise",
    icon: "👑",
    description: "For businesses and power users who want it all.",
    price: "$36.99",
    highlighted: false,
    features: [
      "Email",
      "Chat",
      "Announcement",
      "Query",
      "Workflow",
      "Workgroup",
      "GDrive",
      "Cash Requisition",
      "Trainings",
      "eMeeting",
      "Leave Administration",
      "Performance Management",
      "Reminders",
      "Mobile App",
      "Attendance",
      "CRM",
      "Memo",
      "Circular",
      "Registry",
    ],
  },
  {
    name: "SMB",
    icon: "🛡️",
    description: "Perfect for professionals who need advanced tools.",
    price: "$24.99",
    highlighted: true,
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
    name: "Startup",
    icon: "🚀",
    description: "Best for beginners who want to explore the platform.",
    price: "$12.99",
    highlighted: false,
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
];

/* Master list of all features in display order */
const allFeatures = [
  "Email",
  "Chat",
  "Announcement",
  "Query",
  "Workflow",
  "Workgroup",
  "GDrive",
  "Cash Requisition",
  "Trainings",
  "eMeeting",
  "Leave Administration",
  "Performance Management",
  "Reminders",
  "Mobile App",
  "Attendance",
  "CRM",
  "Memo",
  "Circular",
  "Registry",
];

function CheckIcon() {
  return (
    <svg
      className="w-5 h-5 text-primary shrink-0"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={2}
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
      />
    </svg>
  );
}

function EmptyCircle() {
  return (
    <svg
      className="w-5 h-5 text-gray-500 shrink-0"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
    >
      <circle cx="12" cy="12" r="9" />
    </svg>
  );
}

export default function Pricing() {
  const [selected, setSelected] = useState(1); // SMB selected by default

  return (
    <section
      id="pricing"
      className="relative min-h-0 max-h-screen bg-white flex flex-col justify-center py-10 md:py-16 overflow-hidden"
    >
      {/* Ambient blobs */}
      <div className="absolute top-0 left-1/4 w-80 h-80 bg-primary/5 rounded-full blur-[100px] animate-blob" />
      <div className="absolute bottom-0 right-1/4 w-72 h-72 bg-accent/5 rounded-full blur-[100px] animate-blob-delay" />

      <div className="relative max-w-7xl mx-auto px-6 md:px-8">
        {/* Section header */}
        <div className="text-center max-w-2xl mx-auto mb-8">
          <p className="text-sm font-semibold text-primary tracking-widest uppercase mb-3 animate-fade-in">
            Pricing
          </p>

          <p className="mt-4 text-body text-lg animate-fade-in-up animate-delay-100">
            Choose the plan that fits your team. Upgrade anytime.
          </p>
        </div>

        {/* Pricing card */}
        <div className="max-w-5xl mx-auto animate-fade-in-up animate-delay-200">
          <div className="rounded-3xl bg-heading p-6 sm:p-10 md:p-12">
            <div className="grid md:grid-cols-2 gap-10 md:gap-16 items-start">
              {/* Left — Plan cards */}
              <div className="flex flex-col gap-4">
                {plans.map((plan, i) => {
                  const isSelected = selected === i;
                  return (
                    <button
                      key={plan.name}
                      onClick={() => setSelected(i)}
                      className={`relative w-full text-left rounded-2xl p-5 transition-all duration-300 cursor-pointer ${
                        isSelected
                          ? "bg-bg-light/30"
                          : "bg-[#1a1a1a] hover:bg-[#222]"
                      }`}
                    >
                      {/* Gradient border for selected */}
                      {isSelected && (
                        <div className="absolute -inset-0.5 rounded-2xl bg-linear-to-r from-blue-500 via-purple-500 to-pink-500 -z-10" />
                      )}

                      <div className="flex items-center justify-between gap-4">
                        <div className="min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="text-lg">{plan.icon}</span>
                            <span className="text-white font-bold text-lg">
                              {plan.name}
                            </span>
                          </div>
                          <p className="text-gray-400 text-sm leading-relaxed">
                            {plan.description}
                          </p>
                        </div>
                        <div className="text-right shrink-0">
                          <span className="text-white font-extrabold text-2xl sm:text-3xl">
                            {plan.price}
                          </span>
                          <span className="text-gray-400 text-sm">/mo</span>
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* Right — Feature list */}
              <div>
                <h3 className="text-white font-bold text-xl mb-4">Features:</h3>
                <ul className="space-y-2.5 max-h-[55vh] overflow-y-auto pr-2 [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-primary">
                  {allFeatures.map((feature) => {
                    const included = plans[selected].features.includes(feature);
                    return (
                      <li
                        key={feature}
                        className={`flex items-center gap-3 text-sm ${
                          included ? "text-gray-200" : "text-gray-500"
                        }`}
                      >
                        {included ? <CheckIcon /> : <EmptyCircle />}
                        <span>{feature}</span>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
