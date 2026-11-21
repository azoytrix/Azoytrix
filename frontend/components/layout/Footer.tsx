"use client";

import Link from "next/link";
import Image from "next/image";
import { Fragment, useEffect, useState } from "react";
import { ArrowUpRight, ArrowRight, Mail } from "lucide-react";

import { useFooter } from "@/hooks/useFooter";
import { FALLBACK_FOOTER, type FooterConfig } from "@/lib/footer";

interface FooterProps {
  /** Override the resolved footer config (testing / direct injection). */
  config?: FooterConfig;
}

/** Shown on the server render; replaced by the real year after mount. */
const INITIAL_YEAR = 2026;

function isExternalUrl(href: string): boolean {
  return /^https?:\/\//i.test(href);
}

export default function Footer({ config: configProp }: FooterProps = {}) {
  const { config: cmsConfig } = useFooter();
  const config = configProp ?? cmsConfig ?? FALLBACK_FOOTER;

  const [year, setYear] = useState(INITIAL_YEAR);
  useEffect(() => setYear(new Date().getFullYear()), []);

  const logoIsExternal = isExternalUrl(config.logoUrl);

  return (
    <footer className="relative isolate overflow-hidden bg-[#101820] text-white">

      {/* Background atmosphere */}
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute -left-40 top-0 h-[420px] w-[420px] rounded-full bg-blue-400/[0.07] blur-[130px]" />
        <div className="absolute right-[-100px] top-[35%] h-[380px] w-[380px] rounded-full bg-violet-400/[0.065] blur-[140px]" />
        <div className="absolute bottom-0 left-[45%] h-[300px] w-[400px] rounded-full bg-teal-300/[0.045] blur-[130px]" />
      </div>

      {/* Architectural grid */}
      <div
        className="pointer-events-none absolute inset-0 -z-10 opacity-[0.035]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.5) 1px, transparent 1px)",
          backgroundSize: "80px 80px",
        }}
      />

      <div className="relative mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-12">

        {/* Large contact statement */}
        <section className="relative border-b border-white/15 py-20 sm:py-28 lg:py-32">

          <div className="flex items-center gap-3 text-[10px] font-semibold uppercase tracking-[0.28em] text-teal-200">
            <span className="h-px w-9 bg-gradient-to-r from-teal-300 to-blue-300" />
            {config.cta.eyebrow}
          </div>

          <div className="mt-10 flex flex-col justify-between gap-10 lg:flex-row lg:items-end">

            <div>
              <h2 className="font-display text-[clamp(3.5rem,9vw,8rem)] font-semibold leading-[0.88] tracking-[-0.065em]">
                {config.cta.headingLine1}
                <br />
                <span className="bg-gradient-to-r from-slate-400 via-indigo-200 to-teal-200 bg-clip-text text-transparent">
                  {config.cta.headingLine2}
                </span>
              </h2>
            </div>

            <div className="max-w-xs lg:mb-2">
              <p className="text-sm leading-7 text-slate-400">
                {config.cta.description}
              </p>

              <Link
                href={config.cta.href}
                className="group mt-7 inline-flex items-center gap-4 border-b border-teal-300/40 pb-3 text-sm font-semibold text-white transition duration-300 hover:border-teal-200 hover:text-teal-200"
              >
                {config.cta.label}

                <span className="flex h-9 w-9 items-center justify-center rounded-full border border-white/20 bg-white/[0.035] transition duration-300 group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:border-teal-200 group-hover:bg-teal-200 group-hover:text-[#101820]">
                  <ArrowUpRight size={17} />
                </span>
              </Link>
            </div>
          </div>

          <div className="pointer-events-none absolute bottom-12 right-0 hidden text-[11px] font-medium tracking-[0.25em] text-white/20 lg:block">
            {config.cta.sideCode}
          </div>
        </section>

        {/* Brand, navigation and contact */}
        <section className="relative my-5 grid gap-14 rounded-3xl border border-white/[0.09] bg-gradient-to-br from-[#1B2A3D]/90 via-[#172638]/80 to-[#142C35]/75 px-6 py-12 shadow-[0_20px_70px_rgba(0,0,0,0.12)] sm:px-9 sm:py-14 lg:grid-cols-[1.3fr_0.7fr_1fr] lg:gap-16 lg:px-12 lg:py-16">

          {/* Soft decorative lighting */}
          <div className="pointer-events-none absolute right-0 top-0 h-48 w-64 rounded-full bg-sky-300/[0.045] blur-[90px]" />

          {/* Brand */}
          <div className="relative">

            <Link
              href="/"
              aria-label={`${config.siteName} home`}
              className="group inline-flex items-center gap-3"
            >
              <div className="relative flex h-14 w-14 items-center justify-center rounded-2xl border border-sky-200/20 bg-gradient-to-br from-sky-200/15 to-indigo-300/[0.08] shadow-[0_8px_30px_rgba(56,189,248,0.08)] transition duration-500 group-hover:border-sky-200/50 group-hover:shadow-[0_8px_35px_rgba(56,189,248,0.16)]">
                <Image
                  src={config.logoUrl}
                  alt={config.logoAlt}
                  width={config.logoWidth}
                  height={config.logoHeight}
                  unoptimized={logoIsExternal}
                  className="object-contain transition duration-500 group-hover:scale-110"
                />
              </div>

              <span className="font-display text-2xl font-extrabold tracking-tight text-white transition-colors group-hover:text-sky-100">
                {config.siteName}
              </span>
            </Link>

            <p className="mt-8 max-w-md font-serif text-xl italic leading-relaxed text-slate-100 sm:text-2xl">
              {config.tagline}
            </p>

            <p className="mt-6 max-w-sm text-[13px] leading-7 text-slate-300">
              {config.pillars}
            </p>

            <div className="mt-9 flex items-center gap-3">
              <span className="h-px w-8 bg-gradient-to-r from-sky-300 to-teal-300" />
              <span className="text-[10px] font-semibold uppercase tracking-[0.22em] text-slate-300">
                {config.brandBadge}
              </span>
            </div>
          </div>

          {/* Explore */}
          <div className="relative lg:pl-4">

            <div className="flex items-center gap-3">
              <span className="h-px w-7 bg-sky-300" />
              <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-sky-200">
                {config.explore.title}
              </p>
            </div>

            <ul className="mt-8 space-y-2">
              {config.explore.links.map((link, index) => {
                const linkClass =
                  "group flex items-center justify-between gap-3 rounded-xl px-3 py-3 text-sm text-slate-300 transition duration-300 hover:translate-x-1 hover:bg-white/[0.065] hover:text-white";

                const content = (
                  <>
                    <span className="flex items-center gap-4">
                      <span className="font-mono text-[10px] text-sky-200/65 transition-colors group-hover:text-teal-200">
                        {String(index + 1).padStart(2, "0")}
                      </span>

                      {link.label}
                    </span>

                    <ArrowUpRight
                      size={14}
                      className="text-teal-200 opacity-0 transition duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:opacity-100"
                    />
                  </>
                );

                return (
                  <li key={`${link.href}-${index}`}>
                    {link.external ? (
                      <a
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={linkClass}
                      >
                        {content}
                      </a>
                    ) : (
                      <Link href={link.href} className={linkClass}>
                        {content}
                      </Link>
                    )}
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Contact */}
          <div className="relative overflow-hidden rounded-2xl border border-sky-100/15 bg-gradient-to-br from-[#34465D]/75 via-[#293D52]/70 to-[#24434A]/65 p-7 shadow-[0_12px_40px_rgba(0,0,0,0.12)] transition duration-500 hover:border-teal-200/30 sm:p-8">

            <div className="pointer-events-none absolute -right-12 -top-16 h-48 w-48 rounded-full bg-teal-200/[0.10] blur-[70px]" />

            <div className="relative">

              <div className="flex items-center gap-3">
                <span className="h-px w-7 bg-teal-300" />
                <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-teal-200">
                  {config.contact.title}
                </p>
              </div>

              <p className="mt-8 max-w-xs text-sm leading-7 text-slate-200">
                {config.contact.description}
              </p>

              <a
                href={`mailto:${config.contact.email}`}
                className="group mt-7 flex max-w-full items-center gap-3 border-b border-white/20 pb-4 text-sm font-medium text-white transition duration-300 hover:border-teal-200/60 hover:text-teal-100"
              >
                <Mail size={17} className="shrink-0 text-teal-200" />

                <span className="break-all">{config.contact.email}</span>

                <ArrowUpRight
                  size={15}
                  className="shrink-0 text-slate-300 transition group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-teal-200"
                />
              </a>

              <Link
                href={config.contact.linkHref}
                className="mt-7 inline-flex items-center gap-2 text-xs font-semibold text-sky-200 transition hover:text-teal-200"
              >
                {config.contact.linkLabel}
                <ArrowRight size={14} />
              </Link>
            </div>
          </div>
        </section>

        {/* Bottom bar */}
        <div className="flex flex-col gap-5 border-t border-white/15 py-7 sm:flex-row sm:items-center sm:justify-between">

          <p className="text-[11px] tracking-wide text-slate-400">
            © {year} {config.bottom.copyright}
          </p>

          <p className="text-[10px] font-medium uppercase tracking-[0.2em] text-slate-400">
            {config.bottom.tags.map((tag, i) => (
              <Fragment key={`${tag}-${i}`}>
                {i > 0 && (
                  <span
                    className={`mx-2 ${
                      i % 2 === 1 ? "text-indigo-300" : "text-teal-300"
                    }`}
                  >
                    /
                  </span>
                )}
                {tag}
              </Fragment>
            ))}
          </p>

          <Link
            href="#"
            className="group inline-flex items-center gap-2 text-[11px] font-medium text-slate-400 transition hover:text-teal-200"
          >
            {config.bottom.backToTopLabel}
            <ArrowUpRight size={13} className="transition group-hover:-translate-y-1 group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </footer>
  );
}