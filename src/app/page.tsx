import Preloader from "@/components/layout/Preloader";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import FloatingWhatsApp from "@/components/layout/FloatingWhatsApp";
import FloatingReserve from "@/components/layout/FloatingReserve";
import Hero from "@/components/sections/Hero";
import VirtualExperience from "@/components/sections/VirtualExperience";
import ChefRecommendation from "@/components/sections/ChefRecommendation";
import Menu from "@/components/sections/Menu";
import SpecialOffers from "@/components/sections/SpecialOffers";
import Reservation from "@/components/sections/Reservation";
import PrivateDiningCTA from "@/components/sections/PrivateDiningCTA";
import Story from "@/components/sections/Story";
import Gallery from "@/components/sections/Gallery";
import Reviews from "@/components/sections/Reviews";
import OpeningHours from "@/components/sections/OpeningHours";
import Services from "@/components/sections/Services";
import Contact from "@/components/sections/Contact";
import SectionDivider from "@/components/ui/SectionDivider";

export default function Home() {
  return (
    <>
      <Preloader />
      <Navbar />
      <FloatingWhatsApp />
      <FloatingReserve />
      <main className="relative">
        <Hero />
        <VirtualExperience />
        <ChefRecommendation />
        <Menu />
        <SpecialOffers />
        <Reservation />
        <PrivateDiningCTA />
        <Story />
        <Gallery />
        <Reviews />
        <SectionDivider />
        <OpeningHours />
        <Services />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
