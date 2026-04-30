import Button from "@/components/Button";
import Image from "next/image";

export default function CtaSection() {
  return (
    <>
      <section
        id="cta"
        className="py-24 md:py-32 bg-heading relative overflow-hidden"
      >
        {/* Background image */}
        <Image
          src="/handsAndComp.png"
          alt=""
          fill
          className="object-cover opacity-65"
          sizes="100vw"
          priority={false}
        />
        {/* Dark overlay for readability */}
        <div className="absolute inset-0 bg-heading/60" />

        <div className="relative max-w-3xl mx-auto px-6 md:px-8 text-center">
          <h2 className="text-3xl md:text-5xl font-extrabold text-white tracking-tight animate-fade-in-up">
            Start using CNX247 today
          </h2>
          <p className="mt-5 text-lg text-white/85 leading-relaxed animate-fade-in-up animate-delay-100">
            Join thousands of teams already transforming their operations. No
            credit card required.
          </p>
          <div className="mt-10 animate-fade-in-up animate-delay-200">
            <Button href="/contact" className="bg-primary! text-white! hover:bg-primary/90! hover:shadow-xl! px-10! py-4! text-base! font-bold">
              Get Started Free
            </Button>
            <p className="mt-4 text-sm text-white/50">
              or{" "}
              <a href="/products" className="text-white/70 underline underline-offset-2 hover:text-primary transition-colors">
                explore all features →
              </a>
            </p>
          </div>

          {/* Trust indicators */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-white/60 animate-fade-in animate-delay-300">
            <span className="flex items-center gap-1.5">
              <svg
                className="w-4 h-4 text-primary"
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
              No credit card required
            </span>
            <span className="flex items-center gap-1.5">
              <svg
                className="w-4 h-4 text-primary"
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
              14-day free trial
            </span>
            <span className="flex items-center gap-1.5">
              <svg
                className="w-4 h-4 text-primary"
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
              Cancel anytime
            </span>
          </div>
        </div>
      </section>
    </>
  );
}
