"use client";

import { useHomepage } from "@/hooks/useHomepage";
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

/**
 * Loads the homepage content from Strapi once and passes each section its own slice.
 * Section order is defined here.
 */
export default function HomeSections() {
  const { config } = useHomepage();

  return (
    <>
      <Hero content={config.hero} />
      <BrandStatement content={config.brandStatement} />
      <ServicesOverview content={config.services} />
      <Solutions content={config.solutions} />
      <WhyAzoytrix content={config.why} />
      <TechStack content={config.tech} />
      <Process content={config.process} />
      <PortfolioHighlights content={config.portfolio} />
      <Stats content={config.stats} />
      <Principles content={config.principles} />
      <CtaStrip content={config.cta} />
    </>
  );
}
