"use client";

import useReveal from "@/hooks/useReveal";

const stats = [
  { value: "2,000+", label: "Teams worldwide" },
  { value: "99.9%", label: "Uptime guarantee" },
  { value: "50M+", label: "Tasks completed" },
  { value: "4.9/5", label: "Customer rating" },
];

export default function Stats() {
  const sectionRef = useReveal();

  return (
    <section
      ref={sectionRef}
      className="relative py-16 md:py-20 bg-white overflow-hidden"
    >
      {/* Subtle top divider */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-2/3 h-px bg-linear-to-r from-transparent via-gray-200 to-transparent" />

      <div className="max-w-7xl mx-auto px-6 md:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
          {stats.map((stat, i) => (
            <div
              key={stat.label}
              className="reveal text-center"
              style={{ animationDelay: `${i * 0.1}s` }}
            >
              <p className="text-3xl md:text-4xl font-extrabold text-heading tracking-tight">
                {stat.value}
              </p>
              <p className="mt-1 text-sm text-body">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
