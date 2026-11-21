
"use client";

import Counter from "@/components/ui/Counter";
import Reveal from "@/components/ui/Reveal";
import { FALLBACK_HOMEPAGE, type StatsContent } from "@/lib/homepage";
import { Activity, ArrowUpRight, Orbit } from "lucide-react";

export default function Stats({
  content = FALLBACK_HOMEPAGE.stats,
}: {
  content?: StatsContent;
}) {
  return (
    <section className="relative isolate overflow-hidden bg-[#07172f] py-28 sm:py-36">
      {/* Background */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(30,111,217,0.20),transparent_55%)]" />
        <div className="absolute inset-0 opacity-[0.08] bg-[linear-gradient(rgba(255,255,255,0.2)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.2)_1px,transparent_1px)] bg-size-[55px_55px]" />
        <div className="absolute -left-40 top-0 h-96 w-96 rounded-full bg-blue-500/10 blur-[120px]" />
        <div className="absolute -right-40 bottom-0 h-96 w-96 rounded-full bg-cyan-400/10 blur-[120px]" />
      </div>

      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        {/* Header */}
        <Reveal>
          <div className="mb-20 flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
            <div>
              <div className="mb-5 flex items-center gap-3">
                <span className="h-px w-9 bg-cyan-400" />
                <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-cyan-300">
                  {content.eyebrow}
                </span>
              </div>

              <h2 className="max-w-2xl font-display text-3xl font-bold leading-tight tracking-tight text-white sm:text-5xl">
                {content.title}
                <span className="block text-cyan-300">
                  {content.titleHighlight}
                </span>
              </h2>
            </div>

            <div className="max-w-xs text-sm leading-7 text-blue-100/60">
              {content.description}
            </div>
          </div>
        </Reveal>

        {/* Dashboard composition */}
        <div className="relative">
          {/* Central visual - desktop */}
          <div className="pointer-events-none absolute left-1/2 top-1/2 hidden h-[420px] w-[420px] -translate-x-1/2 -translate-y-1/2 items-center justify-center lg:flex">
            <div className="absolute inset-0 rounded-full border border-cyan-300/10" />
            <div className="absolute inset-8 rounded-full border border-dashed border-cyan-300/15 animate-[spin_45s_linear_infinite]" />
            <div className="absolute inset-16 rounded-full border border-blue-300/15" />
            <div className="absolute inset-[90px] rounded-full border border-cyan-300/20 animate-[spin_30s_linear_infinite_reverse]" />

            <div className="absolute h-48 w-48 rounded-full bg-blue-500/20 blur-3xl" />
            <div className="relative flex h-28 w-28 items-center justify-center rounded-full border border-cyan-300/30 bg-[#0b2850]/80 shadow-[0_0_80px_rgba(34,211,238,0.15)] backdrop-blur-xl">
              <Orbit size={43} strokeWidth={1} className="text-cyan-300" />
            </div>

            <span className="absolute left-8 top-20 h-2 w-2 rounded-full bg-cyan-300 shadow-[0_0_15px_#67e8f9]" />
            <span className="absolute bottom-16 right-10 h-1.5 w-1.5 rounded-full bg-blue-300 shadow-[0_0_15px_#93c5fd]" />
          </div>

          {/* Stats grid */}
          <div className="relative grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {content.items.map((s, i) => (
              <Reveal key={`${s.label}-${i}`} delay={i * 0.12}>
                <article
                  className={`group relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.035] p-7 backdrop-blur-md transition-all duration-500 hover:-translate-y-2 hover:border-cyan-300/30 hover:bg-white/[0.07] sm:p-8 ${
                    i % 2 === 0 ? "lg:translate-y-12" : "lg:-translate-y-12"
                  }`}
                >
                  {/* Card light */}
                  <div className="absolute -right-12 -top-12 h-32 w-32 rounded-full bg-cyan-400/10 blur-3xl transition-opacity duration-500 group-hover:opacity-100" />

                  <div className="relative flex items-center justify-between">
                    <span className="font-mono text-[10px] tracking-[0.2em] text-cyan-300/60">
                      DATA / 0{i + 1}
                    </span>

                    <ArrowUpRight
                      size={17}
                      className="text-white/30 transition-all duration-300 group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-cyan-300"
                    />
                  </div>

                  <div className="relative mt-12">
                    <div className="font-display text-5xl font-extrabold tracking-tight text-white sm:text-6xl">
                      <Counter to={s.value} suffix={s.suffix} />
                    </div>

                    <p className="mt-4 max-w-40 text-xs font-semibold uppercase leading-relaxed tracking-[0.16em] text-blue-100/60">
                      {s.label}
                    </p>
                  </div>

                  {/* Bottom data indicator */}
                  <div className="relative mt-10 flex items-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-cyan-300 shadow-[0_0_8px_rgba(103,232,249,0.8)]" />
                    <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-cyan-100/40">
                      Azoytrix metrics
                    </span>
                    <div className="ml-auto h-px w-8 bg-cyan-300/30 transition-all duration-500 group-hover:w-14 group-hover:bg-cyan-300" />
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>

        {/* Footer */}
        <Reveal delay={0.3}>
          <div className="mt-28 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-7 sm:flex-row">
            <div className="flex items-center gap-3">
              <Activity size={16} className="text-cyan-300" />
              <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-blue-100/50">
                {content.footerLabel}
              </span>
            </div>

            <span className="font-mono text-[10px] tracking-wider text-blue-100/30">
              {content.footerCode}
            </span>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
