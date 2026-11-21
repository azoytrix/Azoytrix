/**
 * Navbar content shape consumed by the Azoytrix Navbar component.
 *
 * The frontend consumes this shape regardless of source (Strapi CMS or the
 * hardcoded fallback). To make the navbar fully customizable, expose these
 * fields in Strapi and point the frontend at them (see lib/strapi.ts).
 *
 * Suggested Strapi model (Content-Type Builder -> Singleton "navbar"):
 *
 *   siteName        : short text        (brand name shown in the navbar)
 *   logo            : media (single)    (brand logo image)
 *   ctaLabel        : short text        (desktop CTA button label, e.g. "Contact Us")
 *   ctaHref         : short text        (desktop CTA button link, e.g. "/contact")
 *   ctaEnabled      : boolean           (show/hide the desktop CTA, default true)
 *   navLinks        : repeatable component "nav-link"
 *
 *   Repeatable component "nav-link":
 *     label   : short text
 *     href    : short text
 *     external: boolean (optional)
 *     newTab  : boolean (optional)
 *
 * Then add `navLinks` (repeatable zone of component "nav-link") to the navbar
 * singleton and enable the "Public" role for the find endpoint so the
 * frontend can read it without auth.
 */

import { strapiImageUrl } from "./strapi";

export interface NavLink {
  href: string;
  label: string;
  external?: boolean;
  newTab?: boolean;
}

export interface NavbarCta {
  enabled: boolean;
  label: string;
  href: string;
}

export interface NavbarConfig {
  source: "cms" | "fallback";
  siteName: string;
  logoUrl: string;
  logoAlt: string;
  logoWidth: number;
  logoHeight: number;
  links: NavLink[];
  cta: NavbarCta;
}

/* ------------------------------------------------------------------ */
/* Fallback / placeholder — mirrors the current hardcoded values so the */
/* navbar is identical when Strapi is unreachable.                    */
/* ------------------------------------------------------------------ */

export const FALLBACK_NAVBAR: NavbarConfig = {
  source: "fallback",
  siteName: "AZOYTRIX",
  logoUrl: "/logo-mark.png",
  logoAlt: "",
  logoWidth: 36,
  logoHeight: 36,
  links: [
    { href: "/", label: "Home" },
    { href: "/about", label: "About" },
    { href: "/services", label: "Services" },
    { href: "/solutions", label: "Solutions" },
    { href: "/our-work", label: "Our Work" },
    { href: "/contact", label: "Contact" },
  ],
  cta: {
    enabled: true,
    label: "Contact Us",
    href: "/contact",
  },
};

/**
 * Transform a Strapi navbar response into the app's NavbarConfig shape.
 * Any missing/invalid field falls back to the current hardcoded placeholder.
 */
export function mapStrapiNavbar(raw: unknown): NavbarConfig {
  const data = Array.isArray((raw as any)?.data)
    ? (raw as any).data[0]
    : (raw as any)?.data;
  const attrs = data?.attributes ?? data ?? {};

  const rawLinks = Array.isArray(attrs.navLinks) ? attrs.navLinks : [];
  const links: NavLink[] = rawLinks.map((l: any) => ({
    href: l.href || "/",
    label: l.label || "Link",
    external: Boolean(l.external),
    newTab: Boolean(l.newTab),
  }));

  const safeLinks = links.length > 0 ? links : FALLBACK_NAVBAR.links;

  const logoUrl =
    attrs.logo?.data?.attributes?.url ??
    attrs.logo?.url ??
    attrs.logoUrl ??
    "";

  const ctaHref = attrs.ctaHref || "/contact";

  return {
    source: "cms",
    siteName: attrs.siteName || FALLBACK_NAVBAR.siteName,
    logoUrl: strapiImageUrl(logoUrl) || FALLBACK_NAVBAR.logoUrl,
    logoAlt:
      attrs.logoAlt || attrs.logo?.name || FALLBACK_NAVBAR.logoAlt,
    logoWidth: FALLBACK_NAVBAR.logoWidth,
    logoHeight: FALLBACK_NAVBAR.logoHeight,
    links: safeLinks,
    cta: {
      enabled: attrs.ctaEnabled !== false,
      label: attrs.ctaLabel || FALLBACK_NAVBAR.cta.label,
      href: ctaHref || FALLBACK_NAVBAR.cta.href,
    },
  };
}
