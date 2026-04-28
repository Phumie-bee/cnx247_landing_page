import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import WhyCnx from "@/components/WhyCnx";
import Stats from "@/components/Stats";
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
      <Pricing />
      <CtaSection />
      <Footer />
    </>
  );
}
