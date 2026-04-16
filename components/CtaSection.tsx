import Button from "@/components/Button";

export default function CtaSection() {
  return (
    <section
      id="cta"
      className="py-24 md:py-32"
      style={{
        background: "linear-gradient(135deg, #2E937D, #a9cf46)",
      }}
    >
      <div className="max-w-3xl mx-auto px-6 md:px-8 text-center">
        <h2 className="text-3xl md:text-5xl font-extrabold text-white tracking-tight animate-fade-in-up">
          Start using CNX247 today
        </h2>
        <p className="mt-5 text-lg text-white/85 leading-relaxed animate-fade-in-up animate-delay-100">
          Join thousands of teams already transforming their operations. No
          credit card required.
        </p>
        <div className="mt-10 animate-fade-in-up animate-delay-200">
          <Button className="!bg-white !text-primary hover:!bg-bg-light hover:!shadow-xl !px-10 !py-4 !text-base font-bold">
            Get Started Free
          </Button>
        </div>
      </div>
    </section>
  );
}
