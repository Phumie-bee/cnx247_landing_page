import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Playfair_Display } from "next/font/google";
import heroBg from "@/public/handsAndComp.png";

/* Cinematic photographic hero — full-bleed dark image under a transparent
   navbar, oversized headline with a serif-italic accent, pill CTAs, and
   floating module tags. */

const playfair = Playfair_Display({
  subsets: ["latin"],
  style: ["italic"],
  weight: ["500"],
});

const modules = [
  "Memos",
  "Approvals",
  "Cash Requisitions",
  "Team Chat",
  "E-meeting",
  "Announcements",
];

export default function Hero() {
  return (
    <section className="relative isolate flex min-h-screen items-end overflow-hidden  text-white">
      {/* Background photo */}
      <Image
        src={heroBg}
        alt="A team member managing approvals and operations on CNX247"
        fill
        priority
        sizes="100vw"
        className="object-cover object-[62%_center]"
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
      <div className="relative z-10 mx-auto w-full max-w-7xl px-6 pb-12 md:px-10 md:pb-16 lg:px-14">
        <h1 className="max-w-4xl animate-fade-in-up">
          <span className="block text-4xl font-bold leading-[1.02] tracking-tight sm:text-5xl lg:text-7xl">
            All Your Business Operations,
          </span>
          <span
            className={`${playfair.className} mt-1 block text-5xl italic leading-[1.05] text-accent sm:text-6xl lg:text-8xl`}
          >
            Reimagined.
          </span>
        </h1>

        <p className="mt-5 max-w-xl text-sm italic leading-relaxed text-white/80 md:text-base animate-fade-in-up animate-delay-200">
          Where your teams, processes, and data come together — giving you the
          clarity, control, and automation to run operations and scale faster.
        </p>

        {/* CTAs */}
        <div className="mt-7 flex flex-wrap items-center gap-3 animate-fade-in-up animate-delay-300">
          <Link
            href="/contact"
            className="rounded-full bg-white px-7 py-3.5 font-semibold text-heading transition-colors duration-300 hover:bg-accent hover:text-white"
          >
            Book a Demo
          </Link>
          <Link
            href="#features"
            className="group inline-flex items-center gap-3 rounded-full border border-white/40 py-1.5 pl-5 pr-1.5 font-semibold text-white transition-colors duration-300 hover:bg-white/10"
          >
            How It Works
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-white text-heading transition-colors duration-300 group-hover:bg-accent group-hover:text-white">
              <ArrowUpRight className="h-4 w-4" />
            </span>
          </Link>
        </div>

        {/* Footer row: attribution + module tags */}
        <div className="mt-10 flex flex-col gap-6 border-t border-white/15 pt-6 lg:flex-row lg:items-center lg:justify-between animate-fade-in animate-delay-500">
          <p className="text-xs uppercase tracking-[0.2em] text-white/55">
            Powered by{" "}
            <span className="font-semibold text-white">
              Connexxion Telecoms
            </span>
          </p>
          <div className="flex flex-wrap gap-2 lg:justify-end">
            {modules.map((m) => (
              <span
                key={m}
                className="rounded-full border border-white/25 bg-white/5 px-4 py-1.5 text-sm font-medium text-white/90 backdrop-blur-sm"
              >
                {m}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
