import Hero from "@/components/home/Hero";
import BrandStatement from "@/components/home/BrandStatement";
import ServicesOverview from "@/components/home/ServicesOverview";
import Solutions from "@/components/home/Solutions";
import WhyAzoytrix from "@/components/home/WhyAzoytrix";
import TechStack from "@/components/home/TechStack";
import Process from "@/components/home/Process";
import PortfolioHighlights from "@/components/home/PortfolioHighlights";
import Stats from "@/components/home/Stats";
import Principles from "@/components/home/Principles";
import CtaStrip from "@/components/home/CtaStrip";

export default function HomePage() {
  return (
    <>
      <Hero />
      <BrandStatement />
      <ServicesOverview />
      <Solutions />
      <WhyAzoytrix />
      <TechStack />
      <Process />
      <PortfolioHighlights />
      <Stats />
      <Principles />
      <CtaStrip />
    </>
  );
}