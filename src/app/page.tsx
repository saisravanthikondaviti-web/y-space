import Navbar from "@/components/layout/Navbar";
import Hero from "@/components/home/Hero";
import Services from "@/components/home/Services";
import About from "@/components/home/About";
import Portfolio from "@/components/home/Portfolio";
import Process from "@/components/home/Process";
import CTA from "@/components/home/CTA";
import Footer from "@/components/layout/Footer";
import CustomCursor from "@/components/ui/CustomCursor";
import SmoothScroll from "@/components/ui/SmoothScroll";
import ScrollProgress from "@/components/ui/ScrollProgress";
import GlobalParticles from "@/components/ui/GlobalParticles";

export default function Home() {
  return (
    <>
      <SmoothScroll />
      <ScrollProgress />
      <GlobalParticles />
      <CustomCursor />

      <Navbar />
      <Hero />
      <About />
      <Services />
      <Portfolio />
      <Process />
      <CTA />
      <Footer />
    </>
  );
}
