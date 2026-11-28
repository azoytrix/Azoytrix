
import type { Metadata } from "next";
import { notFound } from "next/navigation";

import {
  showcaseProjects,
  getShowcaseProject,
} from "@/lib/showcase";

import DemoExperience from "@/components/showcase/DemoExperience";

import CorporateWebsiteDemo from "@/components/showcase/demos/CorporateWebsiteDemo";
import PortfolioDemo from "@/components/showcase/demos/PortfolioDemo";
import SchoolDemo from "@/components/showcase/demos/SchoolDemo";
import HospitalDemo from "@/components/showcase/demos/HospitalDemo";
import EcommerceDemo from "@/components/showcase/demos/EcommerceDemo";
import RestaurantDemo from "@/components/showcase/demos/RestaurantDemo";

type DemoPageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return showcaseProjects.map((project) => ({
    slug: project.slug,
  }));
}

export async function generateMetadata({
  params,
}: DemoPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = getShowcaseProject(slug);

  if (!project) {
    return {
      title: "Demo Not Found | Azoytrix",
    };
  }

  return {
    title: `${project.title} | Azoytrix Showcase`,
    description: project.description,
  };
}

export default async function DemoPage({ params }: DemoPageProps) {
  const { slug } = await params;
  const project = getShowcaseProject(slug);

  if (!project) {
    notFound();
  }

  switch (slug) {
    case "corporate-website":
      return <CorporateWebsiteDemo />;

    case "personal-portfolio":
      return <PortfolioDemo />;

    case "school-management":
      return <SchoolDemo />;

    case "hospital-management":
      return <HospitalDemo />;

    case "ecommerce-store":
      return <EcommerceDemo />;

    case "restaurant-platform":
      return <RestaurantDemo />;

    default:
      return <DemoExperience project={project} />;
  }
}
