"use client";

import { useState } from "react";
import Link from "next/link";
import useReveal from "@/hooks/useReveal";
import {
  TrendingUp,
  Briefcase,
  MessageCircle,
  Kanban,
  Users,
  CreditCard,
  BarChart2,
  UserCheck,
  Calendar,
  DollarSign,
  MessageSquare,
  Video,
  FolderOpen,
  CheckSquare,
  GitBranch,
  Activity,
  ArrowRight,
  type LucideIcon,
} from "lucide-react";

type Feature = { icon: LucideIcon; title: string; description: string };
type Suite = {
  icon: LucideIcon;
  label: string;
  title: string;
  subtitle: string;
  description: string;
  features: Feature[];
};

const suites: Suite[] = [
  {
    icon: TrendingUp,
    label: "Customer & Growth",
    title: "Customer & Growth Tools",
    subtitle: "Build relationships and grow revenue",
    description:
      "Give your sales team real-time visibility into leads, clients, and invoices — so no deal ever slips through the cracks.",
    features: [
      {
        icon: Users,
        title: "CRM (Customer Management)",
        description: "Track leads, manage deals, and monitor interactions.",
      },
      {
        icon: CreditCard,
        title: "Sales & Invoicing",
        description: "Convert leads into paying customers seamlessly.",
      },
      {
        icon: BarChart2,
        title: "Analytics & Reports",
        description: "Get insights to make smarter business decisions.",
      },
    ],
  },
  {
    icon: Briefcase,
    label: "Team & HR",
    title: "Team & HR Management",
    subtitle: "Empower your workforce",
    description:
      "Manage your people from a single hub — attendance, performance, payroll, and leave requests handled with zero friction.",
    features: [
      {
        icon: UserCheck,
        title: "Employee Management",
        description: "Monitor staff, attendance, and performance centrally.",
      },
      {
        icon: Calendar,
        title: "Leave & Workflow",
        description: "Automate approvals and internal processes.",
      },
      {
        icon: DollarSign,
        title: "Payroll & Records",
        description: "Keep everything organized and accessible.",
      },
    ],
  },
  {
    icon: MessageCircle,
    label: "Communication",
    title: "Communication & Collaboration",
    subtitle: "Work smarter together",
    description:
      "From instant chat to video meetings and shared drives, keep every conversation and file in one connected workspace.",
    features: [
      {
        icon: MessageSquare,
        title: "Chat & Calls",
        description: "Instant messaging and voice calls across teams.",
      },
      {
        icon: Video,
        title: "Video Meetings",
        description: "Host meetings and webinars effortlessly.",
      },
      {
        icon: FolderOpen,
        title: "Shared Workspace",
        description: "Store, share, and collaborate on files.",
      },
    ],
  },
  {
    icon: Kanban,
    label: "Project & Workflow",
    title: "Project & Workflow Management",
    subtitle: "Deliver projects faster",
    description:
      "Track every project from kickoff to completion with automated workflows that eliminate bottlenecks and keep teams moving.",
    features: [
      {
        icon: CheckSquare,
        title: "Task Management",
        description: "Break projects into manageable, trackable tasks.",
      },
      {
        icon: GitBranch,
        title: "Workflow Automation",
        description: "Automate approvals and multi-step processes.",
      },
      {
        icon: Activity,
        title: "Activity Tracking",
        description: "Monitor progress and bottlenecks in real time.",
      },
    ],
  },
];

export default function Features() {
  const [active, setActive] = useState(0);
  const sectionRef = useReveal();
  const suite = suites[active];
  const SuiteIcon = suite.icon;

  return (
    <section
      id="features"
      ref={sectionRef}
      className="relative overflow-hidden bg-heading py-16 text-white md:py-24"
    >
      {/* Ambient glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute -right-32 top-0 h-[30rem] w-[30rem] rounded-full bg-primary/20 blur-3xl"
      />

      <div className="relative mx-auto max-w-7xl px-6 md:px-8 lg:px-12">
        {/* Header */}
        <div className="relative max-w-2xl">
          <p className="reveal text-xs font-bold uppercase tracking-[0.2em] text-accent">
            Features
          </p>
          <h2 className="reveal mt-3 text-3xl font-bold leading-[1.1] tracking-tight md:text-4xl lg:text-5xl">
            Everything you need to run your business,{" "}
            <span className="bg-linear-to-r from-primary to-accent bg-clip-text text-transparent">
              in one place.
            </span>
          </h2>
          <p className="reveal mt-4 max-w-xl text-base leading-relaxed text-white/60">
            Four connected suites replace the dozens of disconnected tools your
            team juggles today.
          </p>
        </div>

        {/* Showcase */}
        <div className="relative mt-10 grid items-center gap-10 lg:mt-14 lg:grid-cols-[minmax(0,0.9fr)_1.1fr] lg:gap-6">
          {/* Left: suite selector */}
          <div>
            <ul className="space-y-2">
              {suites.map((s, i) => {
                const Icon = s.icon;
                const isActive = i === active;
                return (
                  <li key={s.label} className="reveal">
                    <button
                      type="button"
                      onClick={() => setActive(i)}
                      aria-pressed={isActive}
                      className={`group flex w-full items-center gap-4 rounded-2xl px-4 py-3.5 text-left transition-all duration-300 ${
                        isActive
                          ? "bg-primary shadow-lg shadow-primary/25"
                          : "hover:bg-white/5"
                      }`}
                    >
                      <span
                        className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl transition-colors duration-300 ${
                          isActive
                            ? "bg-white/20 text-white"
                            : "bg-white/5 text-white/70 group-hover:bg-white/10"
                        }`}
                      >
                        <Icon className="h-5 w-5" strokeWidth={2} />
                      </span>
                      <span className="min-w-0 flex-1">
                        <span
                          className={`block font-semibold ${
                            isActive ? "text-white" : "text-white/85"
                          }`}
                        >
                          {s.label}
                        </span>
                        <span
                          className={`block truncate text-sm ${
                            isActive ? "text-white/80" : "text-white/40"
                          }`}
                        >
                          {s.subtitle}
                        </span>
                      </span>
                    </button>
                  </li>
                );
              })}
            </ul>

            <Link
              href="/contact"
              className="reveal mt-5 inline-flex items-center gap-2 px-4 text-sm font-semibold text-accent transition-all duration-300 hover:gap-3"
            >
              See it in action
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          {/* Right: live preview */}
          <div className="reveal relative lg:translate-x-6">
            <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] shadow-2xl backdrop-blur-sm lg:origin-left lg:[transform:perspective(1800px)_rotateY(-13deg)]">
              {/* Top bar */}
              <div className="flex items-center gap-2 border-b border-white/10 px-5 py-4">
                <span className="h-3 w-3 rounded-full bg-white/15" />
                <span className="h-3 w-3 rounded-full bg-white/15" />
                <span className="h-3 w-3 rounded-full bg-white/15" />
                <div
                  key={active}
                  className="animate-features-in ml-3 flex items-center gap-2 text-sm font-medium text-white/80"
                >
                  <SuiteIcon className="h-4 w-4 text-accent" strokeWidth={2} />
                  {suite.title}
                </div>
              </div>

              {/* Body — swaps per suite with staggered entrance */}
              <div key={active} className="space-y-3 p-5">
                <p
                  className="animate-features-in text-sm leading-relaxed text-white/55"
                  style={{ animationDelay: "0ms" }}
                >
                  {suite.description}
                </p>
                {suite.features.map((f, i) => {
                  const FIcon = f.icon;
                  return (
                    <div
                      key={f.title}
                      style={{ animationDelay: `${(i + 1) * 70}ms` }}
                      className="animate-features-in flex items-start gap-4 rounded-xl border border-white/10 bg-white/[0.03] p-4"
                    >
                      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/15 text-accent">
                        <FIcon className="h-5 w-5" strokeWidth={2} />
                      </span>
                      <div className="min-w-0">
                        <p className="font-semibold text-white">{f.title}</p>
                        <p className="text-sm leading-relaxed text-white/55">
                          {f.description}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
