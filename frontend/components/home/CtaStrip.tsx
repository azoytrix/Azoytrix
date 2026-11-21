
"use client";

import Link from "next/link";
import dynamic from "next/dynamic";
import { ArrowUpRight, Mail, MoveUpRight } from "lucide-react";
import Reveal from "@/components/ui/Reveal";
import { FALLBACK_HOMEPAGE, type CtaContent } from "@/lib/homepage";

const BuildingModel = dynamic(
  () => import("@/components/ui/BuildingModel"),
  {
    ssr: false,
    loading: () => (
      <div className="h-[380px] w-full animate-pulse rounded-full bg-cyan-300/5 lg:h-[540px]" />
    ),
  }
);

export default function CtaStrip({
  content = FALLBACK_HOMEPAGE.cta,
}: {
  content?: CtaContent;
}) {
  return (
    <section className="relative isolate overflow-hidden bg-[#f4f7fb] px-5 py-24 sm:px-8 sm:py-32">
      {/* Ambient page background */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-1/2 top-1/2 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-200/30 blur-[140px]" />
        <div className="absolute -right-40 top-0 h-96 w-96 rounded-full bg-cyan-200/30 blur-[120px]" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(30,111,217,0.035)_1px,transparent_1px),linear-gradient(to_bottom,rgba(30,111,217,0.035)_1px,transparent_1px)] bg-size-[64px_64px]" />
      </div>

      <Reveal>
        <div className="relative mx-auto max-w-7xl overflow-hidden rounded-[2rem] bg-[#07172f] px-7 py-16 shadow-[0_35px_100px_rgba(7,23,47,0.18)] sm:px-12 sm:py-20 lg:px-16 lg:py-24">
          {/* Atmospheric lighting */}
          <div className="pointer-events-none absolute inset-0">
            <div className="absolute -right-20 -top-40 h-[500px] w-[500px] rounded-full bg-blue-600/25 blur-[100px]" />
            <div className="absolute -bottom-52 left-1/4 h-[450px] w-[450px] rounded-full bg-cyan-500/15 blur-[110px]" />
            <div className="absolute inset-0 opacity-[0.08] bg-[linear-gradient(rgba(255,255,255,0.2)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.2)_1px,transparent_1px)] bg-size-[55px_55px]" />
          </div>

          {/* Subtle model-side lighting */}
          <div className="pointer-events-none absolute -right-20 top-1/2 hidden h-[550px] w-[550px] -translate-y-1/2 rounded-full bg-cyan-400/[0.07] blur-[100px] lg:block" />

          {/* Main content layout */}
          <div className="relative z-10 grid items-center gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:gap-0">

            {/* Left: CTA content */}
            <div className="relative z-20 max-w-2xl">
              <div className="mb-8 inline-flex items-center gap-3 rounded-full border border-cyan-300/20 bg-cyan-300/[0.07] px-4 py-2 backdrop-blur-md">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-cyan-300 opacity-60" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-cyan-300" />
                </span>

                <span className="text-[10px] font-bold uppercase tracking-[0.23em] text-cyan-200">
                  {content.badge}
                </span>
              </div>

              <h2 className="font-display text-4xl font-extrabold leading-[1.12] tracking-tight text-white sm:text-5xl xl:text-6xl">
                {content.title}
                <span className="mt-2 block bg-linear-to-r from-cyan-200 via-blue-300 to-white bg-clip-text text-transparent">
                  {content.titleHighlight}
                </span>
              </h2>

              <p className="mt-7 max-w-xl text-base leading-8 text-blue-100/65 sm:text-lg">
                {content.description}
              </p>

              {/* Actions */}
              <div className="mt-10 flex flex-col gap-4 sm:flex-row">
                <Link
                  href={content.primaryHref}
                  className="group inline-flex items-center justify-center gap-3 rounded-full bg-white px-8 py-4 text-sm font-bold text-[#07172f] shadow-[0_8px_35px_rgba(255,255,255,0.12)] transition-all duration-300 hover:-translate-y-1 hover:bg-cyan-200 hover:shadow-[0_12px_35px_rgba(34,211,238,0.2)]"
                >
                  {content.primaryLabel}
                  <MoveUpRight
                    size={17}
                    className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
                  />
                </Link>

                <a
                  href={`mailto:${content.email}`}
                  className="inline-flex items-center justify-center gap-3 rounded-full border border-white/20 bg-white/[0.04] px-7 py-4 text-sm font-semibold text-white transition-all duration-300 hover:border-cyan-300/40 hover:bg-white/10"
                >
                  <Mail size={17} className="text-cyan-300" />
                  {content.emailLabel}
                </a>
              </div>
            </div>

            
            {/* Right: 3D architectural model */}
            <div className="relative z-10 min-w-0">
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(34,211,238,0.10),transparent_65%)]" />

             <div className="relative mx-auto w-full max-w-[560px]">
                <BuildingModel />
            </div>

            <div className="pointer-events-none absolute bottom-5 right-2 hidden items-center gap-3 rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 backdrop-blur-md sm:flex">
                <span className="h-1.5 w-1.5 rounded-full bg-cyan-300 shadow-[0_0_10px_#67e8f9]" />
                <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-blue-100/60">
                {content.modelCaption}
                </span>
            </div>
            </div>

          </div>

          {/* Bottom signature */}
          <div className="relative z-20 mt-10 flex flex-col justify-between gap-4 border-t border-white/10 pt-6 sm:flex-row sm:items-center lg:mt-4">
            <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-blue-100/40">
              {content.signatureLeft}
            </span>

            <span className="flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.18em] text-blue-100/50">
              {content.signatureRight}
              <ArrowUpRight size={13} className="text-cyan-300" />
            </span>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
