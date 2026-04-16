import Image from "next/image";
import Button from "@/components/Button";

export default function Hero() {
  return (
    <div className="bg-white px-4 md:px-6 lg:px-8 pt-4 md:pt-6 lg:pt-8 mt-16 h-[calc(100vh-5rem)]">
      <section
        className="rounded-3xl md:rounded-4xl border border-gray-200 relative h-full flex items-center justify-center overflow-hidden"
        style={{
          backgroundColor: "#f8fafc",
          backgroundImage: "radial-gradient(#dcdcdc 1px, transparent 1px)",
          backgroundSize: "16px 16px",
        }}
      >
        {/* Soft blur glow behind text */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="w-80 md:w-96 lg:w-125 h-80 md:h-96 lg:h-125 bg-primary/10 rounded-full blur-[120px]" />
        </div>

        {/* Floating Cards — hidden on small screens */}
        {/* Top Left — Memo */}
        <div className="hidden md:block absolute left-3 lg:left-6 xl:left-10 top-6 lg:top-12 xl:top-20 animate-float -rotate-2">
          <div className="bg-surface rounded-xl lg:rounded-2xl shadow-lg overflow-hidden border border-primary/10">
            <Image
              src="/memo_img.png"
              alt="Memo"
              width={250}
              height={190}
              className="object-cover w-[140px] lg:w-[180px] xl:w-[220px] h-auto"
            />
          </div>
        </div>

        {/* Top Right — Approval Request */}
        <div className="hidden md:block absolute right-3 lg:right-6 xl:right-10 top-6 lg:top-12 xl:top-20 animate-float-reverse rotate-2">
          <div className="bg-surface rounded-xl lg:rounded-2xl shadow-lg overflow-hidden border border-primary/10">
            <Image
              src="/cash_req_img.png"
              alt="Approval Request"
              width={250}
              height={190}
              className="object-cover w-[140px] lg:w-[180px] xl:w-[220px] h-auto"
            />
          </div>
        </div>

        {/* Bottom Left — Chat */}
        <div className="hidden md:block absolute left-3 lg:left-6 xl:left-10 bottom-6 lg:bottom-12 xl:bottom-20 animate-float-slow rotate-2">
          <div className="bg-surface rounded-xl lg:rounded-2xl shadow-lg overflow-hidden border border-primary/10">
            <Image
              src="/chat_img.png"
              alt="Chat"
              width={250}
              height={190}
              className="object-cover w-[140px] lg:w-[180px] xl:w-[220px] h-auto"
            />
          </div>
        </div>

        {/* Bottom Right — Dashboard */}
        <div className="hidden md:block absolute right-3 lg:right-6 xl:right-10 bottom-6 lg:bottom-12 xl:bottom-16 animate-float-delay -rotate-2">
          <div className="bg-surface rounded-xl lg:rounded-2xl shadow-lg overflow-hidden border border-primary/10">
            <Image
              src="/all_img.png"
              alt="Dashboard"
              width={250}
              height={190}
              className="object-cover w-[140px] lg:w-[180px] xl:w-[220px] h-auto"
            />
          </div>
        </div>

        {/* Center Content */}
        <div className="relative z-10 max-w-2xl lg:max-w-3xl xl:max-w-4xl mx-auto px-4 md:px-6 py-10 md:py-14 lg:py-16 text-center">
          {/* Heading */}
          <h1 className="text-3xl md:text-4xl lg:text-5xl xl:text-5xl font-medium leading-tight tracking-tight animate-fade-in-up">
            <span className="text-heading">
              Manage, approve, and collaborate{" "}
            </span>
            <br />
            <span className="text-gray-500">all in one platform</span>
          </h1>

          {/* Subtext */}
          <p className="text-body text-base md:text-lg mt-3 md:mt-4 max-w-md md:max-w-lg lg:max-w-xl mx-auto animate-fade-in-up animate-delay-200">
            Manage Communication, workflows, approvals, and documents seamlessly
            - securely from anywhere.
          </p>

          {/* Buttons */}
          <div className="flex justify-center gap-4 mt-6 md:mt-8 animate-fade-in-up animate-delay-300">
            <Button href="#cta" className="hover:scale-105 bg-[#72AF83]!">
              Get Started
            </Button>
          </div>

          {/* Social proof */}
          <div className="mt-8 md:mt-10 lg:mt-12 flex items-center justify-center gap-4 animate-fade-in animate-delay-500">
            <div className="flex -space-x-2">
              {[0, 1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="w-8 h-8 md:w-9 md:h-9 rounded-full border-2 border-white bg-primary/20 flex items-center justify-center text-xs font-bold text-primary"
                >
                  {["A", "B", "C", "D"][i]}
                </div>
              ))}
            </div>
            <p className="text-xs md:text-sm text-body">
              <span className="font-semibold text-heading">2,000+</span> teams
              already on board
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
