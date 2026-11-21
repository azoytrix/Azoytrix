
import SectionHeading from "@/components/ui/SectionHeading";
import GradientTitle from "@/components/ui/GradientTitle";
import Reveal from "@/components/ui/Reveal";
import { FALLBACK_HOMEPAGE, type TechContent } from "@/lib/homepage";
import { ArrowUpRight, Cpu } from "lucide-react";

export default function TechStack({
  content = FALLBACK_HOMEPAGE.tech,
}: {
  content?: TechContent;
}) {
  return (
    <section className="relative isolate overflow-hidden bg-white py-24 sm:py-32">
      {/* Background */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -left-40 top-20 h-96 w-96 rounded-full bg-blue-100/40 blur-[120px]" />
        <div className="absolute -right-40 bottom-0 h-96 w-96 rounded-full bg-cyan-100/40 blur-[120px]" />

        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(30,111,217,0.025)_1px,transparent_1px),linear-gradient(to_bottom,rgba(30,111,217,0.025)_1px,transparent_1px)] bg-size-[64px_64px]" />
      </div>

      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeading
          eyebrow={content.eyebrow}
          title={<GradientTitle text={content.title} highlight={content.titleHighlight} />}
          description={content.description}
        />

        {/* Technology cards */}
        <div className="mt-16 grid gap-5 md:grid-cols-2">
          {content.groups.map((t, i) => (
            <Reveal key={`${t.group}-${i}`} delay={i * 0.08}>
              <article className="group relative h-full overflow-hidden rounded-2xl border border-line/80 bg-white/90 p-7 shadow-[0_8px_35px_rgba(15,35,70,0.035)] backdrop-blur-sm transition-all duration-500 hover:-translate-y-1 hover:border-brand/30 hover:shadow-[0_22px_50px_rgba(30,111,217,0.09)] sm:p-8">

                {/* Card heading */}
                <div className="flex items-center justify-between gap-4">
                  <div className="flex items-center gap-4">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-linear-to-br from-brand/10 to-cyan/10 text-brand ring-1 ring-brand/10 transition-all duration-500 group-hover:from-brand group-hover:to-cyan group-hover:text-white">
                      <Cpu size={23} strokeWidth={1.8} />
                    </div>

                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400">
                        {content.domainLabel} 0{i + 1}
                      </span>

                      <h3 className="mt-1 font-display text-lg font-bold text-navy">
                        {t.group}
                      </h3>
                    </div>
                  </div>

                  <ArrowUpRight
                    size={19}
                    className="shrink-0 text-slate-300 transition-all duration-300 group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-brand"
                  />
                </div>

                {/* Divider */}
                <div className="my-7 h-px bg-slate-100" />

                {/* Continuous technology marquee */}
                <div className="tech-marquee-container relative overflow-hidden rounded-xl border border-slate-100 bg-surface/70 py-4">

                  {/* Edge fading */}
                  <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-10 bg-linear-to-r from-[#f4f7fb] to-transparent" />

                  <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-10 bg-linear-to-l from-[#f4f7fb] to-transparent" />

                  {/* Animated track */}
                  <div
                    className="tech-marquee-track flex w-max items-center"
                    style={{
                      animationDuration: `${Math.max(18, 30 - i * 2)}s`,
                    }}
                  >
                    {/* First technology group */}
                    <div className="flex shrink-0 items-center gap-3 pr-3">
                      {t.items.map((item) => (
                        <span
                          key={`first-${item}`}
                          className="inline-flex shrink-0 items-center gap-2 whitespace-nowrap rounded-lg border border-slate-200/80 bg-white px-4 py-2 text-sm font-semibold text-slate-600 shadow-sm transition-colors duration-300 hover:border-brand/30 hover:text-brand"
                        >
                          <span className="h-1.5 w-1.5 rounded-full bg-brand/60" />
                          {item}
                        </span>
                      ))}
                    </div>

                    {/* Duplicate group for seamless looping */}
                    <div
                      aria-hidden="true"
                      className="flex shrink-0 items-center gap-3 pr-3"
                    >
                      {t.items.map((item) => (
                        <span
                          key={`second-${item}`}
                          className="inline-flex shrink-0 items-center gap-2 whitespace-nowrap rounded-lg border border-slate-200/80 bg-white px-4 py-2 text-sm font-semibold text-slate-600 shadow-sm"
                        >
                          <span className="h-1.5 w-1.5 rounded-full bg-brand/60" />
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Footer */}
                <div className="mt-7 flex items-center justify-between">
                  <span className="text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-400">
                    {content.ecosystemLabel}
                  </span>

                  <span className="h-1.5 w-1.5 rounded-full bg-cyan-400 shadow-[0_0_10px_rgba(34,211,238,0.5)]" />
                </div>
              </article>
            </Reveal>
          ))}
        </div>

        {/* Closing statement */}
        <Reveal delay={0.2}>
          <div className="mt-12 flex flex-col items-center justify-between gap-5 rounded-2xl border border-brand/10 bg-surface/70 p-7 text-center sm:flex-row sm:text-left sm:p-9">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-brand">
                {content.closingEyebrow}
              </p>

              <h3 className="mt-2 font-display text-xl font-bold text-navy sm:text-2xl">
                {content.closingTitle}
              </h3>
            </div>

            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-white text-brand shadow-sm ring-1 ring-brand/10">
              <Cpu size={22} />
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
