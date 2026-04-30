import Image from "next/image";
import Button from "@/components/Button";
import memoImg from "@/public/memo_img.png";
import cashReqImg from "@/public/cash_req_img.png";
import chatImg from "@/public/chat_img.png";
import announcement from "@/public/announcement.png";

export default function Hero() {
  return (
    <>
      {/* Bottom fade for seamless transition */}
      <div className="bg-white px-4 md:px-6 lg:px-8 pt-4  mt-14 h-[calc(100vh-3rem)]">
        <section
          className="relative min-h-[calc(100vh-4rem)] flex items-center justify-center px-4 md:px-6 lg:px-8 rounded-3xl md:rounded-4xl border border-gray-200  h-full overflow-hidden"
          style={{
            backgroundColor: "#f8fafc",
            backgroundImage: "radial-gradient(#dcdcdc 1px, transparent 1px)",
            backgroundSize: "16px 16px",
          }}
        >
          {/* Floating Cards — hidden on small screens */}
          {/* Top Left — Memo */}
          <div className="hidden md:block absolute left-6 lg:left-12 xl:left-20 top-10 lg:top-16 xl:top-24 animate-float -rotate-2">
            <div className="bg-surface/80 backdrop-blur-sm rounded-xl lg:rounded-2xl shadow-lg overflow-hidden border border-primary/10">
              <Image
                src={memoImg}
                alt="CNX247 memo and internal communication feature"
                priority
                className="object-cover w-35 lg:w-45 xl:w-55 h-auto"
              />
            </div>
          </div>

          {/* Top Right — Approval Request */}
          <div className="hidden md:block absolute right-6 lg:right-12 xl:right-20 top-10 lg:top-16 xl:top-24 animate-float-reverse rotate-2">
            <div className="bg-surface/80 backdrop-blur-sm rounded-xl lg:rounded-2xl shadow-lg overflow-hidden border border-primary/10">
              <Image
                src={cashReqImg}
                alt="CNX247 cash requisition and approval workflow"
                priority
                className="object-cover w-35 lg:w-45 xl:w-55 h-auto"
              />
            </div>
          </div>

          {/* Bottom Right — Dashboard */}

          <div className="hidden md:block absolute left-6 lg:left-12 xl:left-20 bottom-16 lg:bottom-24 xl:bottom-32 animate-float-slow rotate-2">
            <div className="bg-surface/80 backdrop-blur-sm rounded-xl lg:rounded-2xl shadow-lg overflow-hidden border border-primary/10">
              <Image
                src={announcement}
                alt="CNX247 company announcement broadcasting tool"
                priority
                className="object-cover w-35 lg:w-45 xl:w-55 h-auto"
              />
            </div>
          </div>

          {/* Bottom Left — Chat */}

          <div className="hidden md:block absolute right-6 lg:right-12 xl:right-20 bottom-16 lg:bottom-24 xl:bottom-32 animate-float-delay -rotate-2">
            <div className="bg-surface/80 backdrop-blur-sm rounded-xl lg:rounded-2xl shadow-lg overflow-hidden border border-primary/10">
              <Image
                src={chatImg}
                alt="CNX247 team chat and real-time collaboration"
                priority
                className="object-cover w-35 lg:w-45 xl:w-55 h-auto"
              />
            </div>
          </div>

          {/* Center Content */}
          <div className="relative z-10 max-w-2xl lg:max-w-3xl xl:max-w-4xl mx-auto px-4 md:px-6 py-16 md:py-20 lg:py-24 text-center">
            {/* Badge */}
            {/* <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-semibold tracking-wide mb-6 animate-fade-in">
              <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
              Now available for teams of all sizes
            </div> */}

            {/* Keyword pre-heading */}
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-primary mb-4 animate-fade-in">
              Business Management Software · Nigeria
            </p>

            {/* Heading */}
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-[1.1] tracking-tight animate-fade-in-up">
              <span className="text-heading">
                All Your Business Operations.
              </span>
              <br />
              <span className="bg-linear-to-r from-primary to-accent bg-clip-text text-transparent">
                One Intelligent System.
              </span>
            </h1>

            {/* Subtext */}
            <p className="text-body text-base md:text-lg mt-5 md:mt-6 max-w-md md:max-w-lg lg:max-w-xl mx-auto leading-relaxed animate-fade-in-up animate-delay-200">
              CNX247 brings your teams, processes, and data together into a
              single platform—so you can manage operations, automate workflows,
              and scale faster without complexity.
            </p>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row justify-center gap-3 mt-8 md:mt-10 animate-fade-in-up animate-delay-300">
              <Button href="/contact" className="hover:scale-105 bg-primary!">
                Get Started Free
              </Button>
              <Button
                href="#features"
                variant="secondary"
                className="hover:scale-105"
              >
                See How It Works
              </Button>
            </div>

            {/* Social proof */}
            <div className="mt-10 md:mt-12 flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-in animate-delay-500">
              <div className="flex -space-x-2.5">
                {[0, 1, 2, 3, 4].map((i) => (
                  <div
                    key={i}
                    className="w-9 h-9 rounded-full border-2 border-white bg-primary/15 flex items-center justify-center text-xs font-bold text-primary shadow-sm"
                  >
                    {["JA", "BK", "CR", "DS", "EL"][i]}
                  </div>
                ))}
              </div>
              <div className="flex flex-col items-center sm:items-start">
                <div className="flex items-center gap-0.5 text-amber-400">
                  {[...Array(5)].map((_, i) => (
                    <svg
                      key={i}
                      className="w-4 h-4"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <p className="text-xs text-body mt-0.5">
                  Trusted by{" "}
                  <span className="font-semibold text-heading">2,000+</span>{" "}
                  teams
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
