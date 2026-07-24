import Footer from "@/components/layout/Footer";
import Navbar from "@/components/layout/Navbar";
import CustomCursor from "@/components/ui/CustomCursor";
import ScrollProgress from "@/components/ui/ScrollProgress";
import SmoothScroll from "@/components/ui/SmoothScroll";

import ServicesStepper from "@/components/services/ServicesStepper";

export default function ServicesPage() {
  return (
    <>
      <ScrollProgress />
      <SmoothScroll />
      <CustomCursor />

      <Navbar />

      <main className="min-h-screen bg-black">
        <ServicesStepper />
      </main>

      <Footer />
    </>
  );
}