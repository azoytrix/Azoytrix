/**
 * Footer content shape consumed by the Azoytrix Footer component.
 *
 * Source is Strapi single type "footer" (GET /api/footer). When the CMS is
 * unreachable or a field is empty, values fall back to FALLBACK_FOOTER, which
 * mirrors the original hardcoded footer.
 */

import { strapiImageUrl } from "./strapi";
import type { NavLink } from "./navbar";

export interface FooterConfig {
  source: "cms" | "fallback";
  siteName: string;
  logoUrl: string;
  logoAlt: string;
  logoWidth: number;
  logoHeight: number;
  tagline: string;
  pillars: string;
  brandBadge: string;
  cta: {
    eyebrow: string;
    headingLine1: string;
    headingLine2: string;
    description: string;
    label: string;
    href: string;
    sideCode: string;
  };
  explore: {
    title: string;
    links: NavLink[];
  };
  contact: {
    title: string;
    description: string;
    email: string;
    linkLabel: string;
    linkHref: string;
  };
  bottom: {
    copyright: string;
    tags: string[];
    backToTopLabel: string;
  };
}

export const FALLBACK_FOOTER: FooterConfig = {
  source: "fallback",
  siteName: "AZOYTRIX",
  logoUrl: "/logo-mark.png",
  logoAlt: "",
  logoWidth: 44,
  logoHeight: 44,
  tagline: "Engineering the Next Era.",
  pillars: "INNOVATION · INTELLIGENCE · ENGINEERING",
  brandBadge: "Built for what's next",
  cta: {
    eyebrow: "The next chapter starts here",
    headingLine1: "Let's create",
    headingLine2: "what's next.",
    description:
      "Great ideas deserve thoughtful engineering. Tell us what you're imagining, and let's make it happen.",
    label: "Start a conversation",
    href: "/contact",
    sideCode: "AZ / 001",
  },
  explore: {
    title: "Explore",
    links: [
      { href: "/", label: "Home" },
      { href: "/about", label: "About" },
      { href: "/services", label: "Services" },
      { href: "/solutions", label: "Solutions" },
      { href: "/our-work", label: "Our Work" },
    ],
  },
  contact: {
    title: "Get in touch",
    description:
      "Have an idea worth building? Let's turn your vision into something meaningful.",
    email: "azoytrix@gmail.com",
    linkLabel: "Contact Azoytrix",
    linkHref: "/contact",
  },
  bottom: {
    copyright: "Azoytrix. All rights reserved.",
    tags: ["Innovation", "Intelligence", "Engineering"],
    backToTopLabel: "Back to top",
  },
};

/** Non-empty string or fallback. */
function str(value: unknown, fallback: string): string {
  return typeof value === "string" && value.trim() ? value : fallback;
}

/**
 * Transform a Strapi footer response into FooterConfig.
 * Any missing/invalid field falls back to the hardcoded placeholder.
 */
export function mapStrapiFooter(raw: unknown): FooterConfig {
  const data = Array.isArray((raw as any)?.data)
    ? (raw as any).data[0]
    : (raw as any)?.data;
  const a = data?.attributes ?? data ?? {};
  const F = FALLBACK_FOOTER;

  const rawLinks: any[] = Array.isArray(a.exploreLinks) ? a.exploreLinks : [];
  const links: NavLink[] = rawLinks
    .filter(
      (l) =>
        l?.href &&
        l?.label &&
        // ignore untouched "Add an entry" placeholders
        !(l.label === "Link" && l.href === "/")
    )
    .map((l) => ({
      href: l.href,
      label: l.label,
      external: Boolean(l.external),
      newTab: Boolean(l.newTab),
    }));

  const rawTags: any[] = Array.isArray(a.bottomTags) ? a.bottomTags : [];
  const tags = rawTags
    .map((t) => (typeof t?.label === "string" ? t.label.trim() : ""))
    .filter(Boolean);

  const logoUrl =
    a.logo?.data?.attributes?.url ?? a.logo?.url ?? a.logoUrl ?? "";

  return {
    source: "cms",
    siteName: str(a.siteName, F.siteName),
    logoUrl: strapiImageUrl(logoUrl) || F.logoUrl,
    logoAlt: a.logoAlt || a.logo?.name || F.logoAlt,
    logoWidth: F.logoWidth,
    logoHeight: F.logoHeight,
    tagline: str(a.tagline, F.tagline),
    pillars: str(a.pillars, F.pillars),
    brandBadge: str(a.brandBadge, F.brandBadge),
    cta: {
      eyebrow: str(a.ctaEyebrow, F.cta.eyebrow),
      headingLine1: str(a.ctaHeadingLine1, F.cta.headingLine1),
      headingLine2: str(a.ctaHeadingLine2, F.cta.headingLine2),
      description: str(a.ctaDescription, F.cta.description),
      label: str(a.ctaLabel, F.cta.label),
      href: str(a.ctaHref, F.cta.href),
      sideCode: str(a.sideCode, F.cta.sideCode),
    },
    explore: {
      title: str(a.exploreTitle, F.explore.title),
      links: links.length > 0 ? links : F.explore.links,
    },
    contact: {
      title: str(a.contactTitle, F.contact.title),
      description: str(a.contactDescription, F.contact.description),
      email: str(a.email, F.contact.email),
      linkLabel: str(a.contactLinkLabel, F.contact.linkLabel),
      linkHref: str(a.contactLinkHref, F.contact.linkHref),
    },
    bottom: {
      copyright: str(a.copyrightText, F.bottom.copyright),
      tags: tags.length > 0 ? tags : F.bottom.tags,
      backToTopLabel: str(a.backToTopLabel, F.bottom.backToTopLabel),
    },
  };
}