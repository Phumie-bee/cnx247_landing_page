import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import WhyCnx from "@/components/WhyCnx";
import Stats from "@/components/Stats";
import Features from "@/components/Features";
import Pricing from "@/components/Pricing";
import CtaSection from "@/components/CtaSection";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <Hero />
      <WhyCnx />
      <Stats />
      <Features />
      <Pricing />
      <CtaSection />
      <Footer />
    </>
  );
}
