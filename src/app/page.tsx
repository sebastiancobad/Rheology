import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import Fundamentals from "@/components/Fundamentals";
import PolymerRheology from "@/components/PolymerRheology";
import MeasurementTechniques from "@/components/MeasurementTechniques";
import Applications from "@/components/Applications";
import LiteratureGaps from "@/components/LiteratureGaps";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Navigation />
      <main>
        <Hero />
        <Fundamentals />
        <PolymerRheology />
        <MeasurementTechniques />
        <Applications />
        <LiteratureGaps />
      </main>
      <Footer />
    </>
  );
}
