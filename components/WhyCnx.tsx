import Section from "@/components/Section";

const benefits = [
  "Unified platform for CRM, tasks, HR, and more",
  "Real-time collaboration across departments",
  "Powerful automations that save hours every week",
  "Enterprise-grade security and compliance",
  "Seamless integrations with your existing tools",
  "Dedicated support and onboarding assistance",
];

function CheckIcon() {
  return (
    <svg
      className="w-5 h-5 text-primary flex-shrink-0 mt-0.5"
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

export default function WhyCnx() {
  return (
    <Section id="why" className="bg-bg-alt">
      <div className="grid lg:grid-cols-2 gap-16 items-center">
        {/* Left content */}
        <div>
          <p className="text-sm font-semibold text-primary tracking-widest uppercase mb-3 animate-fade-in">
            Why CNX247
          </p>
          <h2 className="text-3xl md:text-4xl font-extrabold text-heading tracking-tight animate-fade-in-up">
            Built for teams that move fast
          </h2>
          <p className="mt-5 text-body text-lg leading-relaxed animate-fade-in-up animate-delay-100">
            Stop juggling a dozen tools. CNX247 brings everything together so
            your team can focus on what matters most—growing the business.
          </p>

          <ul className="mt-8 space-y-4">
            {benefits.map((benefit, i) => (
              <li
                key={benefit}
                className={`flex items-start gap-3 text-body animate-fade-in-up animate-delay-${(i + 1) * 100}`}
              >
                <CheckIcon />
                <span>{benefit}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Right illustration */}
        <div className="animate-fade-in-up animate-delay-300 hidden lg:block">
          <div className="relative">
            <div className="absolute -inset-4 bg-primary/5 rounded-3xl blur-2xl" />
            <div className="relative bg-white rounded-3xl shadow-xl p-8 border border-primary/10">
              {/* Simplified app illustration */}
              <div className="space-y-4">
                {/* Header */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                      <div className="w-5 h-5 rounded-md bg-primary" />
                    </div>
                    <div>
                      <div className="h-3 w-24 bg-heading/10 rounded-full" />
                      <div className="h-2 w-16 bg-body/10 rounded-full mt-1.5" />
                    </div>
                  </div>
                  <div className="h-8 w-20 bg-bg-light rounded-lg" />
                </div>

                {/* Task items */}
                {[
                  { label: "Design Review", progress: 85, color: "bg-primary" },
                  {
                    label: "Sprint Planning",
                    progress: 60,
                    color: "bg-accent",
                  },
                  {
                    label: "Client Onboarding",
                    progress: 95,
                    color: "bg-primary",
                  },
                ].map((task) => (
                  <div
                    key={task.label}
                    className="bg-bg-light/50 rounded-xl p-4 border border-primary/5"
                  >
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-medium text-heading">
                        {task.label}
                      </span>
                      <span className="text-xs text-body">
                        {task.progress}%
                      </span>
                    </div>
                    <div className="h-1.5 bg-bg-light rounded-full overflow-hidden">
                      <div
                        className={`h-full ${task.color} rounded-full transition-all duration-500`}
                        style={{ width: `${task.progress}%` }}
                      />
                    </div>
                  </div>
                ))}

                {/* Stats row */}
                <div className="grid grid-cols-3 gap-3 pt-2">
                  {[
                    { label: "Active", value: "24" },
                    { label: "Done", value: "128" },
                    { label: "Hours Saved", value: "340" },
                  ].map((stat) => (
                    <div
                      key={stat.label}
                      className="text-center p-3 bg-bg-light rounded-xl"
                    >
                      <p className="text-xl font-bold text-heading">
                        {stat.value}
                      </p>
                      <p className="text-xs text-body">{stat.label}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
}
