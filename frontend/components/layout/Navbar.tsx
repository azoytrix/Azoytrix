"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";

import { useNavbar } from "@/hooks/useNavbar";
import {
  FALLBACK_NAVBAR,
  type NavbarConfig,
  type NavLink,
} from "@/lib/navbar";

interface NavbarProps {
  /**
   * Override the resolved navbar config.
   * Useful for testing or for injecting CMS data directly without the hook.
   */
  config?: NavbarConfig;
}

function isExternalUrl(href: string): boolean {
  return /^https?:\/\//i.test(href);
}

function renderNavLink({
  link,
  active,
  mobile,
}: {
  link: NavLink;
  active: boolean;
  mobile: boolean;
}) {
  const common = "font-medium transition-colors block";
  const cls = mobile
    ? `rounded-lg px-3 py-3 text-base ${common} ${
        active ? "bg-surface text-brand" : "text-navy"
      }`
    : `rounded-full px-4 py-2 text-sm ${common} ${
        active ? "bg-surface text-brand" : "text-muted hover:text-navy"
      }`;

  if (link.external) {
    return (
      <a
        href={link.href}
        target="_blank"
        rel="noopener noreferrer"
        className={cls}
      >
        {link.label}
      </a>
    );
  }

  return <Link href={link.href} className={cls}>{link.label}</Link>;
}

export default function Navbar({
  config: configProp,
}: NavbarProps = {}) {
  const pathname = usePathname();
  const { config: cmsConfig } = useNavbar();
  const config = configProp ?? cmsConfig ?? FALLBACK_NAVBAR;

  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setOpen(false), [pathname]);

  const isActive = (href: string) => pathname === href;
  const desktopLinks = config.links.filter((l) => l.href !== config.cta.href);
  const logoIsExternal = isExternalUrl(config.logoUrl);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 border-b transition-all ease-out ${
        scrolled
          ? "border-line bg-white/85 shadow-sm backdrop-blur-md"
          : "border-transparent bg-white/60 backdrop-blur-sm"
      }`}
    >
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 sm:px-8">
        <Link
          href="/"
          className="flex items-center gap-2.5"
          aria-label={`${config.siteName} home`}
        >
          <Image
            src={config.logoUrl}
            alt={config.logoAlt}
            width={config.logoWidth}
            height={config.logoHeight}
            priority
            unoptimized={logoIsExternal}
          />
          <span className="font-display text-xl font-extrabold tracking-tight text-navy">
            {config.siteName}
          </span>
        </Link>

        <ul className="hidden items-center gap-1 md:flex">
          {desktopLinks.map((link, i) => {
              const active = isActive(link.href);
              return (
                <li key={`${link.href}-${i}`}>
                  {renderNavLink({ link, active, mobile: false })}
                </li>
              );
            })}
          {config.cta.enabled && (
            <li className="ml-2">
              <Link
                href={config.cta.href}
                className="rounded-full bg-navy px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-brand"
              >
                {config.cta.label}
              </Link>
            </li>
          )}
        </ul>

        <button
          className="rounded-lg p-2 text-navy md:hidden"
          onClick={() => setOpen((o) => !o)}
          aria-label="Toggle menu"
          aria-expanded={open}
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      {open && (
        <div className="border-t border-line bg-white md:hidden">
          <ul className="mx-auto flex max-w-7xl flex-col px-5 py-3">
            {config.links.map((link, i) => {
              const active = isActive(link.href);
              return (
                <li key={`${link.href}-${i}`}>
                  {renderNavLink({ link, active, mobile: true })}
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </header>
  );
}
