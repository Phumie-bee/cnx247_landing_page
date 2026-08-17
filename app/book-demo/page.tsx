import type { Metadata } from "next";
import { Clock, Monitor, Users, CheckCircle } from "lucide-react";
import Navbar from "@/components/Navbar";
import WatchDemoButton from "@/components/WatchDemoButton";
import BookDemoForm from "./BookDemoForm";

export const metadata: Metadata = {
  title: "Book a Demo | CNX247 Business Management Software",
  description:
    "Book a free, personalised demo of CNX247 — Nigeria's leading company management system. Pick a slot that suits you and we'll confirm it instantly.",
};

const whatToExpect = [
  {
    icon: Clock,
    title: "45 minutes, no pressure",
    body: "A focused walkthrough built around your team — not a generic slide deck.",
  },
  {
    icon: Monitor,
    title: "Onsite or virtual",
    body: "We'll come to your office in Abuja, or send a meeting link — your call.",
  },
  {
    icon: Users,
    title: "Bring your team",
    body: "Invite whoever needs to see it. We'll answer questions as they come.",
  },
];

export default function BookDemoPage() {
  return (
    <>
      <Navbar />
      <main className="mt-16 min-h-[calc(100svh-4rem)] flex lg:h-[calc(100svh-4rem)] lg:overflow-hidden">
        {/* ── Left: dark info panel ─────────────────────────────────── */}
        <aside className="hidden lg:flex w-90 xl:w-100 shrink-0 bg-heading flex-col relative overflow-hidden">
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
                CNX247 Demo
              </p>

              <h1 className="text-3xl xl:text-[2.2rem] font-bold text-white leading-[1.12] mb-4">
                See CNX247 running{" "}
                <span className="bg-linear-to-r from-primary to-accent bg-clip-text text-transparent">
                  on your business
                </span>
                .
              </h1>

              <p className="text-[13.5px] text-white/50 leading-relaxed mb-10">
                Pick a time that works for you. We&apos;ll confirm it
                immediately — no back-and-forth.
              </p>

              <ul className="space-y-6" aria-label="What to expect">
                {whatToExpect.map(({ icon: Icon, title, body }) => (
                  <li key={title} className="flex items-start gap-4">
                    <div className="w-9 h-9 rounded-xl bg-white/[0.07] border border-white/10 flex items-center justify-center text-primary shrink-0">
                      <Icon size={16} aria-hidden="true" strokeWidth={2} />
                    </div>
                    <div>
                      <p className="text-[13px] font-semibold text-white/85 mb-1">
                        {title}
                      </p>
                      <p className="text-[12.5px] text-white/40 leading-relaxed">
                        {body}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            <div className="pt-7 border-t border-white/10 space-y-3">
              <div className="flex items-center gap-2">
                <CheckCircle
                  size={13}
                  className="text-primary shrink-0"
                  aria-hidden="true"
                />
                <p className="text-[12px] text-white/40 leading-snug">
                  Just have a question instead?{" "}
                  <a
                    href="/contact"
                    className="text-primary font-semibold hover:underline"
                  >
                    Contact us
                  </a>
                  .
                </p>
              </div>
              <p className="text-[11px] text-white/20">
                Powered by Connexxion Telecoms
              </p>
            </div>
          </div>
        </aside>

        {/* ── Right: form ───────────────────────────────────────────── */}
        <div className="flex-1 lg:overflow-y-auto bg-white">
          <div className="min-h-full flex items-center justify-center px-6 py-10 md:px-12">
            <div className="w-full max-w-lg">
              <div className="mb-6">
                <h2 className="text-2xl font-bold text-heading mb-1.5">
                  Book your demo
                </h2>
                <p className="text-sm text-body">
                  Choose a slot and we&apos;ll lock it in straight away.
                </p>
              </div>

              {/* Lower-commitment alternative for anyone not ready to pick a
                  slot. Lives in this column rather than the dark panel because
                  that panel is hidden below lg. */}
              <div className="mb-7">
                <WatchDemoButton />
              </div>

              <BookDemoForm />
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
