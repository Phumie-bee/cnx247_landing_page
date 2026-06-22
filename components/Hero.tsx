import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Check } from "lucide-react";
import { Playfair_Display } from "next/font/google";
import heroBg from "@/public/corporate-noir.jpeg";

/* Cinematic photographic hero — full-bleed dark image under a transparent
   navbar, oversized headline with a serif-italic accent, pill CTAs, and
   floating module tags. */

const playfair = Playfair_Display({
  subsets: ["latin"],
  style: ["italic"],
  weight: ["400"],
});

const modules = [
  "Memos",
  "Approvals",
  "Cash Requisitions",
  "Team Chat",
  "E-meeting",
  "Announcements",
  "CRM",
  "Workflow",
  "Attendance",
  "Performance",
];

export default function Hero() {
  return (
    <section className="relative isolate flex min-h-screen items-center overflow-hidden text-white lg:items-end">
      {/* Background photo */}
      <Image
        src={heroBg}
        alt="A Nigerian team collaborating on business operations with CNX247"
        fill
        priority
        placeholder="blur"
        sizes="100vw"
        className="animate-hero-zoom object-cover object-[70%_center]"
      />
      {/* Legibility overlays */}
      <div
        aria-hidden
        className="absolute inset-0 bg-linear-to-r from-black/85 via-black/45 to-black/10"
      />
      <div
        aria-hidden
        className="absolute inset-0 bg-linear-to-t from-black/80 via-transparent to-black/40"
      />

      {/* Content */}
      <div className="relative z-10 mx-auto w-full max-w-7xl px-6 pt-16 pb-18 text-center md:px-10 md:pb-23 lg:px-14 lg:pt-24 lg:text-left">
        <h1 className="animate-fade-in-up">
          <span className="block text-4xl font-bold leading-[1.3] tracking-tight sm:text-5xl lg:whitespace-nowrap lg:text-7xl">
            Your Whole Business,
          </span>
          <span
            className={`${playfair.className} mt-1 block text-4xl font-normal italic leading-[1.05] sm:text-5xl lg:text-6xl`}
          >
            Reimagined.
          </span>
        </h1>

        <p className="mt-6 max-w-xl mx-auto text-sm italic leading-relaxed text-white/80 md:text-base animate-fade-in-up animate-delay-200 lg:mt-5 lg:mx-0">
          Where your teams, processes, and data come together — giving you the
          clarity, control, and automation to run operations and scale faster.
        </p>

        {/* Bottom row: values + CTAs + attribution on the left, module pyramid on the right */}
        <div className="mt-12 flex flex-col gap-10 lg:flex-row lg:items-end lg:justify-between">
          {/* Left: value highlights + CTAs + powered-by attribution */}
          <div>
            <ul className="space-y-4 lg:space-y-3">
              {[
                "CRM, HR, payroll, projects & chat — in one login",
                "Automate approvals, requisitions & workflows",
                "Built for how Nigerian teams actually run",
              ].map((point, i) => (
                <li
                  key={point}
                  style={{ animationDelay: `${300 + i * 120}ms` }}
                  className="flex animate-fade-in-up items-center justify-center gap-3 text-sm text-white/85 md:text-base lg:justify-start"
                >
                  <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-accent/20 text-accent">
                    <Check className="h-3 w-3" strokeWidth={3} />
                  </span>
                  {point}
                </li>
              ))}
            </ul>

            <div className="mt-10 flex items-center justify-center gap-2 animate-fade-in-up animate-delay-300 sm:gap-3 lg:mt-8 lg:justify-start">
              <Link
                href="/contact"
                className="whitespace-nowrap rounded-full bg-white px-5 py-3 text-sm font-semibold text-heading transition-all duration-300 hover:-translate-y-0.5 hover:bg-accent hover:text-white hover:shadow-lg hover:shadow-black/20 sm:px-7 sm:py-3.5 sm:text-base"
              >
                Book a Demo
              </Link>
              <Link
                href="#features"
                className="group inline-flex items-center gap-2 whitespace-nowrap rounded-full border border-white/40 py-1.5 pl-4 pr-1.5 text-sm font-semibold text-white transition-colors duration-300 hover:bg-white/10 sm:gap-3 sm:pl-5 sm:text-base"
              >
                How It Works
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-white text-heading transition-colors duration-300 group-hover:bg-accent group-hover:text-white">
                  <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </span>
              </Link>
            </div>
            <p className="mt-8 text-xs uppercase tracking-[0.2em] text-white/55 animate-fade-in animate-delay-500">
              Powered by{" "}
              <span className="font-semibold text-white">
                Connexxion Telecoms
              </span>
            </p>
          </div>

          {/* Right: 1-2-3-4 pyramid of module tags (desktop only) */}
          <div className="hidden flex-col items-start gap-2 lg:flex lg:items-end">
            {[
              modules.slice(0, 1),
              modules.slice(1, 3),
              modules.slice(3, 6),
              modules.slice(6, 10),
            ].map((row, i) => {
              const offsets = [0, 1, 3, 6];
              return (
                <div key={i} className="flex flex-wrap gap-2 lg:justify-end">
                  {row.map((m, j) => (
                    <span
                      key={m}
                      style={{
                        animationDelay: `${450 + (offsets[i] + j) * 60}ms`,
                        animationFillMode: "backwards",
                      }}
                      className="animate-fade-in-up cursor-default rounded-full border border-white/25 bg-white/5 px-4 py-1.5 text-sm font-medium text-white/90 backdrop-blur-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-accent/70 hover:bg-white/10"
                    >
                      {m}
                    </span>
                  ))}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
