import type { Metadata } from "next";
import {
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
  TrendingUp,
  Briefcase,
  MessageCircle,
  Kanban,
  ArrowRight,
  Plus,
  MoreHorizontal,
  Send,
  Hash,
  Bell,
  Search,
  type LucideIcon,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CtaSection from "@/components/CtaSection";

export const metadata: Metadata = {
  title: "Products | CNX247",
  description:
    "Explore the four interconnected suites of CNX247 — Customer & Growth, Team & HR, Communication, and Project Management — built into one unified platform.",
};

type Feature = { icon: LucideIcon; title: string; description: string };
type Product = {
  number: string;
  anchor: string;
  mainIcon: LucideIcon;
  label: string;
  title: string;
  subtitle: string;
  description: string;
  features: Feature[];
};

const products: Product[] = [
  {
    number: "01",
    anchor: "customer-growth",
    mainIcon: TrendingUp,
    label: "Customer & Growth",
    title: "Customer & Growth Tools",
    subtitle: "Build relationships and grow revenue.",
    description:
      "CNX247 CRM gives your sales team real-time visibility into leads, clients, and invoices — so no deal ever slips through the cracks. Track every conversation, forecast revenue, and turn pipeline into predictable growth.",
    features: [
      {
        icon: Users,
        title: "CRM (Customer Management)",
        description:
          "Track leads, manage deals, and monitor every customer interaction from a single dashboard.",
      },
      {
        icon: CreditCard,
        title: "Sales & Invoicing",
        description:
          "Convert qualified leads into paying customers with branded invoices and automated reminders.",
      },
      {
        icon: BarChart2,
        title: "Analytics & Reports",
        description:
          "Real-time dashboards turn raw activity into the insights your sales leaders actually use.",
      },
    ],
  },
  {
    number: "02",
    anchor: "team-hr",
    mainIcon: Briefcase,
    label: "Team & HR",
    title: "Team & HR Management",
    subtitle: "Empower your workforce.",
    description:
      "Manage your people from a single hub — attendance, performance, payroll, and leave requests handled with zero friction. Give HR back the hours they're losing to spreadsheets.",
    features: [
      {
        icon: UserCheck,
        title: "Employee Management",
        description:
          "A central directory for every staff record, role, and reporting line — kept current automatically.",
      },
      {
        icon: Calendar,
        title: "Leave & Workflow Automation",
        description:
          "Multi-step approvals for leave, expenses, and internal requests — no more email chains.",
      },
      {
        icon: DollarSign,
        title: "Payroll & Records",
        description:
          "Compliant payroll runs, payslips, and statutory filings, organised and auditable.",
      },
    ],
  },
  {
    number: "03",
    anchor: "communication",
    mainIcon: MessageCircle,
    label: "Communication",
    title: "Communication & Collaboration",
    subtitle: "Work smarter together.",
    description:
      "From instant chat to video meetings and shared drives, CNX247 keeps every conversation and file in one connected workspace — so context never gets lost in another inbox.",
    features: [
      {
        icon: MessageSquare,
        title: "Chat & Calls",
        description:
          "Channels, DMs, and threaded replies for every team — searchable, persistent, and always in context.",
      },
      {
        icon: Video,
        title: "Video Meetings (Stream)",
        description:
          "HD meetings, webinars, and screen sharing built directly into the workspace your team already uses.",
      },
      {
        icon: FolderOpen,
        title: "Shared Workspace (Drive)",
        description:
          "One source of truth for every file — versioned, permissioned, and effortless to share.",
      },
    ],
  },
  {
    number: "04",
    anchor: "project-workflow",
    mainIcon: Kanban,
    label: "Project & Workflow",
    title: "Project & Workflow Management",
    subtitle: "Deliver projects faster.",
    description:
      "Track every project from kickoff to completion with automated workflows that eliminate bottlenecks and keep your team moving — across departments, time zones, and devices.",
    features: [
      {
        icon: CheckSquare,
        title: "Task Management",
        description:
          "Break ambitious projects into trackable tasks with owners, deadlines, and dependencies.",
      },
      {
        icon: GitBranch,
        title: "Workflow Automation",
        description:
          "Codify your approval and review processes once — then let the platform run them on autopilot.",
      },
      {
        icon: Activity,
        title: "Activity Tracking",
        description:
          "Live progress, bottleneck alerts, and a complete audit trail across every project and team.",
      },
    ],
  },
];

/* ------------------------------------------------------------------ */
/*  Editorial product section (zigzag)                                */
/* ------------------------------------------------------------------ */

function ProductSection({
  product,
  reverse,
  altBg,
  mockup,
  isFirst,
}: {
  product: Product;
  reverse: boolean;
  altBg: boolean;
  mockup: React.ReactNode;
  isFirst?: boolean;
}) {
  const MainIcon = product.mainIcon;

  const TextSide = (
    <div className="relative max-w-xl">
      {/* <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-linear-to-br from-primary to-primary/80 text-white shadow-lg shadow-primary/25 ring-8 ring-primary/5 mb-7">
        <MainIcon size={26} strokeWidth={2} aria-hidden="true" />
      </div> */}

      {/* <p className="text-[11px] font-bold uppercase tracking-[0.25em] text-primary mb-4">
        <span className="tabular-nums">{product.number}</span>
        <span className="mx-2 text-primary/30">·</span>
        {product.label}
      </p> */}

      <h2 className="text-3xl md:text-4xl lg:text-[2.75rem] font-bold text-heading tracking-tight leading-[1.08] mb-4">
        {product.title}
      </h2>

      <p className="text-primary text-lg italic font-medium mb-5">
        {product.subtitle}
      </p>

      {/* <p className="text-body text-[17px] leading-relaxed mb-9">
        {product.description}
      </p> */}

      <ul className="space-y-5 mb-10">
        {product.features.map((f) => {
          const FIcon = f.icon;
          return (
            <li key={f.title} className="flex items-start gap-4">
              <div
                aria-hidden="true"
                className="flex items-center justify-center w-11 h-11 rounded-xl bg-bg-light border border-primary/10 text-primary shrink-0 mt-0.5"
              >
                <FIcon size={20} strokeWidth={2} />
              </div>
              <div className="min-w-0">
                <h3 className="font-semibold text-heading text-[15px] mb-1">
                  {f.title}
                </h3>
                <p className="text-sm text-body leading-relaxed">
                  {f.description}
                </p>
              </div>
            </li>
          );
        })}
      </ul>

      <a
        href="/contact"
        className="group inline-flex items-center gap-2 bg-heading text-white hover:bg-primary motion-safe:transition-colors px-5 py-3 rounded-xl text-sm font-semibold"
      >
        Try now
        <ArrowRight
          size={16}
          strokeWidth={2.5}
          aria-hidden="true"
          className="motion-safe:transition-transform group-hover:translate-x-0.5"
        />
      </a>
    </div>
  );

  const VisualSide = <div className="relative">{mockup}</div>;

  return (
    <section
      id={product.anchor}
      className={`relative scroll-mt-20 ${isFirst ? "pt-28 md:pt-32 pb-20 md:pb-28 lg:pb-32" : "py-20 md:py-28 lg:py-32"
        } ${altBg ? "bg-bg-light/40" : "bg-white"}`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-8">
        <div className="grid lg:grid-cols-2 gap-14 lg:gap-20 items-center">
          <div className={reverse ? "lg:order-2" : "lg:order-1"}>
            {TextSide}
          </div>
          <div className={reverse ? "lg:order-1" : "lg:order-2"}>
            {VisualSide}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  Mockup wrapper — gradient hairline + ambient glow                 */
/* ------------------------------------------------------------------ */

function MockupFrame({
  children,
  glow = "primary",
}: {
  children: React.ReactNode;
  glow?: "primary" | "accent";
}) {
  return (
    <div className="relative">
      <div
        aria-hidden="true"
        className={`absolute -inset-8 ${glow === "accent" ? "bg-accent/15" : "bg-primary/15"
          } blur-3xl rounded-full pointer-events-none`}
      />
      <div className="relative rounded-[2rem] bg-linear-to-br from-primary/25 via-accent/15 to-transparent p-px shadow-[0_30px_70px_-20px_rgba(46,147,125,0.25)]">
        <div className="relative rounded-[calc(2rem-1px)] bg-white overflow-hidden">
          {children}
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Mockup 1 — CRM / Sales Pipeline                                   */
/* ------------------------------------------------------------------ */

function CrmMockup() {
  const deals = [
    {
      initials: "AC",
      company: "Acme Industries",
      stage: "Closing",
      amount: "₦890K",
      stageColor: "bg-primary",
    },
    {
      initials: "OL",
      company: "Olojo & Co.",
      stage: "Negotiation",
      amount: "₦450K",
      stageColor: "bg-accent",
    },
    {
      initials: "LT",
      company: "Lateef Technologies",
      stage: "Discovery",
      amount: "₦230K",
      stageColor: "bg-body/40",
    },
  ];

  const bars = [40, 65, 50, 80, 95, 70, 88];

  return (
    <MockupFrame>
      <div className="p-6 sm:p-7">
        {/* Header */}
        <div className="flex items-start justify-between mb-6">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-primary mb-1.5">
              Pipeline
            </p>
            <h4 className="font-bold text-heading text-2xl tabular-nums">
              ₦4.2M
            </h4>
            <p className="text-xs text-body mt-0.5">
              <span className="text-primary font-semibold">+12%</span> vs.
              last quarter
            </p>
          </div>
          <button
            type="button"
            aria-label="New deal"
            className="w-9 h-9 rounded-xl bg-primary text-white flex items-center justify-center shadow-md shadow-primary/30"
          >
            <Plus size={18} strokeWidth={2.5} aria-hidden="true" />
          </button>
        </div>

        {/* Bar chart */}
        <div className="flex items-end gap-2 h-24 mb-7">
          {bars.map((h, i) => (
            <div key={i} className="flex-1 flex flex-col gap-1.5">
              <div
                className="rounded-md bg-linear-to-t from-primary/70 to-primary"
                style={{ height: `${h}%` }}
              />
              <span className="text-[9px] text-body/60 text-center font-semibold uppercase tracking-wider">
                {["M", "T", "W", "T", "F", "S", "S"][i]}
              </span>
            </div>
          ))}
        </div>

        {/* Deals */}
        <div className="space-y-2.5">
          <div className="flex items-center justify-between mb-2">
            <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-body">
              Top deals
            </p>
            <p className="text-[10px] text-primary font-semibold">View all</p>
          </div>
          {deals.map((d) => (
            <div
              key={d.company}
              className="flex items-center gap-3 p-3 rounded-xl bg-bg-light/60 border border-primary/8"
            >
              <div
                aria-hidden="true"
                className="w-9 h-9 rounded-full bg-linear-to-br from-primary/25 to-accent/25 flex items-center justify-center text-primary font-bold text-[11px]"
              >
                {d.initials}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-heading truncate">
                  {d.company}
                </p>
                <div className="flex items-center gap-1.5 mt-0.5">
                  <span
                    aria-hidden="true"
                    className={`w-1.5 h-1.5 rounded-full ${d.stageColor}`}
                  />
                  <p className="text-[11px] text-body">{d.stage}</p>
                </div>
              </div>
              <span className="text-sm font-bold text-heading tabular-nums shrink-0">
                {d.amount}
              </span>
            </div>
          ))}
        </div>
      </div>
    </MockupFrame>
  );
}

/* ------------------------------------------------------------------ */
/*  Mockup 2 — HR / Team Directory                                    */
/* ------------------------------------------------------------------ */

function HrMockup() {
  const team = [
    { initials: "BK", role: "Sales", online: true },
    { initials: "AM", role: "Engineering", online: true },
    { initials: "TO", role: "Design", online: false, leave: true },
    { initials: "SR", role: "Operations", online: true },
    { initials: "JN", role: "People", online: true },
    { initials: "DK", role: "Finance", online: false, leave: true },
    { initials: "EL", role: "Marketing", online: true },
    { initials: "PA", role: "Support", online: true },
  ];

  return (
    <MockupFrame glow="accent">
      <div className="p-6 sm:p-7">
        {/* Header */}
        <div className="flex items-start justify-between mb-6">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-primary mb-1.5">
              Team
            </p>
            <h4 className="font-bold text-heading text-2xl">42 Members</h4>
            <p className="text-xs text-body mt-0.5">
              <span className="font-semibold text-heading">38</span> active
              today
            </p>
          </div>
          <span className="inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider px-2.5 py-1.5 rounded-full bg-accent/15 text-heading border border-accent/25">
            <span
              aria-hidden="true"
              className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse"
            />
            3 on leave
          </span>
        </div>

        {/* Employee tiles */}
        <div className="grid grid-cols-4 gap-3.5 mb-6">
          {team.map((e, i) => (
            <div
              key={i}
              className="flex flex-col items-center gap-1.5"
            >
              <div className="relative">
                <div
                  aria-hidden="true"
                  className="w-12 h-12 rounded-full bg-linear-to-br from-primary/20 to-accent/25 border border-primary/10 flex items-center justify-center text-primary font-bold text-[11px]"
                >
                  {e.initials}
                </div>
                {e.online && (
                  <div
                    aria-hidden="true"
                    className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full bg-accent border-2 border-white"
                  />
                )}
                {e.leave && (
                  <div
                    aria-hidden="true"
                    className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full bg-body/40 border-2 border-white"
                  />
                )}
              </div>
              <p className="text-[10px] text-body truncate w-full text-center font-medium">
                {e.role}
              </p>
            </div>
          ))}
        </div>

        {/* This week */}
        <div className="rounded-xl bg-bg-light/60 border border-primary/8 p-4">
          <div className="flex items-center justify-between mb-3">
            <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-body">
              This week
            </p>
            <p className="text-[10px] text-primary font-semibold">
              View calendar
            </p>
          </div>
          <div className="flex gap-1.5">
            {["M", "T", "W", "T", "F", "S", "S"].map((d, i) => {
              const isToday = i === 2;
              const onLeave = i === 4;
              return (
                <div
                  key={i}
                  className="flex-1 flex flex-col items-center gap-1.5"
                >
                  <span className="text-[10px] text-body font-semibold">
                    {d}
                  </span>
                  <div
                    aria-hidden="true"
                    className={`w-full h-9 rounded-md border ${isToday
                      ? "bg-primary border-primary shadow-sm shadow-primary/30"
                      : onLeave
                        ? "bg-accent/30 border-accent/30"
                        : "bg-white border-primary/10"
                      }`}
                  />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </MockupFrame>
  );
}

/* ------------------------------------------------------------------ */
/*  Mockup 3 — Chat / Messages                                        */
/* ------------------------------------------------------------------ */

function ChatMockup() {
  return (
    <MockupFrame>
      <div className="flex flex-col">
        {/* Channel header */}
        <div className="flex items-center gap-3 px-5 py-4 border-b border-primary/8">
          <div
            aria-hidden="true"
            className="w-9 h-9 rounded-lg bg-primary/12 flex items-center justify-center"
          >
            <Hash size={16} className="text-primary" strokeWidth={2.5} />
          </div>
          <div className="flex-1 min-w-0">
            <p className="font-semibold text-heading text-sm">general</p>
            <p className="text-[11px] text-body">12 members · 4 online</p>
          </div>
          <div className="flex items-center gap-2">
            <button
              type="button"
              aria-label="Search"
              className="w-8 h-8 rounded-lg bg-bg-light text-body flex items-center justify-center"
            >
              <Search size={14} aria-hidden="true" />
            </button>
            <button
              type="button"
              aria-label="Notifications"
              className="w-8 h-8 rounded-lg bg-bg-light text-body flex items-center justify-center"
            >
              <Bell size={14} aria-hidden="true" />
            </button>
          </div>
        </div>

        {/* Messages */}
        <div className="px-5 py-5 space-y-4 bg-linear-to-b from-bg-light/30 to-white">
          <div className="flex gap-3">
            <div
              aria-hidden="true"
              className="w-8 h-8 rounded-full bg-linear-to-br from-primary/25 to-primary/10 flex items-center justify-center text-primary font-bold text-[11px] shrink-0"
            >
              JN
            </div>
            <div className="min-w-0 max-w-[80%]">
              <div className="flex items-baseline gap-2 mb-1">
                <p className="font-semibold text-[13px] text-heading">
                  Jumoke
                </p>
                <p className="text-[10px] text-body">10:24 AM</p>
              </div>
              <div className="rounded-2xl rounded-tl-md bg-white border border-primary/8 px-3.5 py-2 inline-block shadow-sm">
                <p className="text-[13px] text-heading leading-relaxed">
                  Q3 numbers are looking strong — pipeline is healthy.
                </p>
              </div>
            </div>
          </div>

          <div className="flex gap-3 flex-row-reverse">
            <div
              aria-hidden="true"
              className="w-8 h-8 rounded-full bg-linear-to-br from-accent/30 to-primary/15 flex items-center justify-center text-primary font-bold text-[11px] shrink-0"
            >
              YO
            </div>
            <div className="min-w-0 max-w-[80%] flex flex-col items-end">
              <div className="flex items-baseline gap-2 mb-1">
                <p className="text-[10px] text-body">10:25 AM</p>
                <p className="font-semibold text-[13px] text-heading">You</p>
              </div>
              <div className="rounded-2xl rounded-tr-md bg-primary text-white px-3.5 py-2 inline-block shadow-md shadow-primary/20">
                <p className="text-[13px] leading-relaxed">
                  Awesome — let&apos;s review on Friday&apos;s call.
                </p>
              </div>
            </div>
          </div>

          <div className="flex gap-3">
            <div
              aria-hidden="true"
              className="w-8 h-8 rounded-full bg-linear-to-br from-bg-alt to-primary/10 flex items-center justify-center text-primary font-bold text-[11px] shrink-0"
            >
              BK
            </div>
            <div className="min-w-0 max-w-[80%]">
              <div className="flex items-baseline gap-2 mb-1">
                <p className="font-semibold text-[13px] text-heading">
                  Babatunde
                </p>
                <p className="text-[10px] text-body">10:26 AM</p>
              </div>
              <div className="rounded-2xl rounded-tl-md bg-white border border-primary/8 px-3.5 py-2 inline-block shadow-sm">
                <p className="text-[13px] text-heading leading-relaxed">
                  In — bringing the deck. 📊
                </p>
              </div>
            </div>
          </div>

          {/* Typing indicator */}
          <div className="flex items-center gap-2 pl-11">
            <span className="text-[11px] text-body italic">
              Adaeze is typing
            </span>
            <span className="flex gap-1">
              <span
                aria-hidden="true"
                className="w-1 h-1 rounded-full bg-primary/60 animate-pulse"
                style={{ animationDelay: "0s" }}
              />
              <span
                aria-hidden="true"
                className="w-1 h-1 rounded-full bg-primary/60 animate-pulse"
                style={{ animationDelay: "0.2s" }}
              />
              <span
                aria-hidden="true"
                className="w-1 h-1 rounded-full bg-primary/60 animate-pulse"
                style={{ animationDelay: "0.4s" }}
              />
            </span>
          </div>
        </div>

        {/* Input */}
        <div className="border-t border-primary/8 p-3 flex items-center gap-2 bg-white">
          <div className="flex-1 rounded-full border border-primary/10 px-4 py-2.5 text-[13px] text-body/60 bg-bg-light/40">
            Reply to thread...
          </div>
          <button
            type="button"
            aria-label="Send"
            className="w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center shadow-md shadow-primary/30"
          >
            <Send size={14} strokeWidth={2.5} aria-hidden="true" />
          </button>
        </div>
      </div>
    </MockupFrame>
  );
}

/* ------------------------------------------------------------------ */
/*  Mockup 4 — Kanban Board                                           */
/* ------------------------------------------------------------------ */

function KanbanMockup() {
  const columns: {
    title: string;
    dot: string;
    cards: { title: string; tag: string; progress?: number; due?: string }[];
  }[] = [
      {
        title: "To Do",
        dot: "bg-body/40",
        cards: [
          { title: "User research interviews", tag: "Design", due: "Apr 28" },
          { title: "API spec review", tag: "Eng", due: "Apr 30" },
        ],
      },
      {
        title: "In Progress",
        dot: "bg-primary",
        cards: [
          {
            title: "Launch page rebuild",
            tag: "Marketing",
            progress: 65,
          },
          {
            title: "Onboarding flow v2",
            tag: "Product",
            progress: 30,
          },
        ],
      },
      {
        title: "Done",
        dot: "bg-accent",
        cards: [{ title: "Wireframe sign-off", tag: "Design" }],
      },
    ];

  return (
    <MockupFrame glow="accent">
      <div className="p-6 sm:p-7">
        {/* Header */}
        <div className="flex items-start justify-between mb-6">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-primary mb-1.5">
              Sprint 24
            </p>
            <h4 className="font-bold text-heading text-2xl">Q2 Roadmap</h4>
            <p className="text-xs text-body mt-0.5">
              <span className="font-semibold text-heading">5</span> tasks ·{" "}
              <span className="font-semibold text-primary">62%</span> complete
            </p>
          </div>
          <button
            type="button"
            aria-label="More"
            className="w-9 h-9 rounded-xl bg-bg-light text-body flex items-center justify-center"
          >
            <MoreHorizontal size={18} aria-hidden="true" />
          </button>
        </div>

        {/* Kanban */}
        <div className="grid grid-cols-3 gap-2.5">
          {columns.map((col) => (
            <div key={col.title}>
              <div className="flex items-center gap-1.5 mb-3 px-1">
                <span
                  aria-hidden="true"
                  className={`w-1.5 h-1.5 rounded-full ${col.dot}`}
                />
                <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-body truncate">
                  {col.title}
                </p>
                <span className="text-[10px] text-body/50 ml-auto tabular-nums">
                  {col.cards.length}
                </span>
              </div>
              <div className="space-y-2">
                {col.cards.map((card) => (
                  <div
                    key={card.title}
                    className="rounded-lg bg-bg-light/60 border border-primary/8 p-2.5 hover:bg-white hover:border-primary/20 motion-safe:transition-colors"
                  >
                    <p className="text-[11.5px] font-semibold text-heading mb-2 leading-snug">
                      {card.title}
                    </p>
                    <div className="flex items-center gap-1.5">
                      <span className="text-[9px] px-1.5 py-0.5 rounded bg-white border border-primary/10 text-body font-semibold">
                        {card.tag}
                      </span>
                      {card.progress !== undefined && (
                        <div className="flex-1 h-1 rounded-full bg-white overflow-hidden">
                          <div
                            className="h-full bg-linear-to-r from-primary to-accent"
                            style={{ width: `${card.progress}%` }}
                          />
                        </div>
                      )}
                      {card.due && (
                        <span className="text-[9px] text-body/70 font-medium ml-auto">
                          {card.due}
                        </span>
                      )}
                    </div>
                  </div>
                ))}
                {/* Add card */}
                <button
                  type="button"
                  aria-label={`Add task to ${col.title}`}
                  className="w-full rounded-lg border border-dashed border-primary/15 p-2.5 text-[10px] font-semibold text-body/50 hover:bg-bg-light/40 hover:text-primary motion-safe:transition-colors"
                >
                  + Add task
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </MockupFrame>
  );
}

/* ------------------------------------------------------------------ */
/*  Page                                                              */
/* ------------------------------------------------------------------ */

export default function ProductsPage() {
  const mockups = [
    <CrmMockup key="crm" />,
    <HrMockup key="hr" />,
    <ChatMockup key="chat" />,
    <KanbanMockup key="kanban" />,
  ];

  return (
    <>
      <Navbar />
      <main className="bg-white">
        {products.map((p, i) => (
          <ProductSection
            key={p.anchor}
            product={p}
            reverse={i % 2 === 1}
            altBg={i % 2 === 1}
            mockup={mockups[i]}
            isFirst={i === 0}
          />
        ))}
        <CtaSection />
      </main>
      <Footer />
    </>
  );
}
