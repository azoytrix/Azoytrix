
import Link from "next/link";
import { ArrowUpRight, ArrowRight, Layers3 } from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";
import GradientTitle from "@/components/ui/GradientTitle";
import Reveal from "@/components/ui/Reveal";
import { FALLBACK_HOMEPAGE, PORTFOLIO_GRADIENTS, type PortfolioContent } from "@/lib/homepage";

export default function PortfolioHighlights({
  content = FALLBACK_HOMEPAGE.portfolio,
}: {
  content?: PortfolioContent;
}) {
  return (
    <section className="relative isolate overflow-hidden bg-white py-24 sm:py-32">
      {/* Background atmosphere */}
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

        {/* Portfolio cards */}
        <div className="mt-16 grid gap-7 md:grid-cols-2 lg:grid-cols-3">
          {content.projects.map((p, i) => (
            <Reveal key={`${p.title}-${i}`} delay={i * 0.09}>
              <article className="group relative h-full overflow-hidden rounded-2xl border border-line/80 bg-white shadow-[0_8px_35px_rgba(15,35,70,0.035)] transition-all duration-500 hover:-translate-y-2 hover:border-brand/30 hover:shadow-[0_24px_55px_rgba(30,111,217,0.12)]">
                {/* Project visual */}
                <div
                  className={`relative h-56 overflow-hidden bg-linear-to-br ${PORTFOLIO_GRADIENTS[p.gradient] ?? PORTFOLIO_GRADIENTS.brand_cyan}`}
                >
                  <div className="bg-grid absolute inset-0 opacity-50" />

                  {/* Decorative visual elements */}
                  <div className="absolute inset-0 bg-linear-to-t from-navy/25 via-transparent to-white/10" />

                  <div className="absolute left-5 top-5 flex items-center gap-2 rounded-full border border-white/30 bg-white/20 px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.18em] text-white shadow-sm backdrop-blur-md">
                    <span className="h-1.5 w-1.5 rounded-full bg-white" />
                    {content.badgeLabel}
                  </div>

                  <span className="absolute bottom-4 left-5 font-display text-6xl font-bold text-white/20 transition-transform duration-700 group-hover:scale-110">
                    0{i + 1}
                  </span>

                  <div className="absolute bottom-5 right-5 flex h-11 w-11 items-center justify-center rounded-full border border-white/30 bg-white/20 text-white backdrop-blur-md transition-all duration-300 group-hover:rotate-45 group-hover:bg-white group-hover:text-brand">
                    <ArrowUpRight size={20} />
                  </div>
                </div>

                {/* Project information */}
                <div className="p-7">
                  <div className="flex items-center justify-between gap-3">
                    <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-brand">
                      {p.tag}
                    </span>
                    <span className="h-px flex-1 bg-slate-100" />
                  </div>

                  <h3 className="mt-4 font-display text-xl font-bold text-navy transition-colors duration-300 group-hover:text-brand">
                    {p.title}
                  </h3>

                  <p className="mt-3 text-sm leading-7 text-muted">
                    {p.text}
                  </p>

                  <div className="mt-7 flex items-center justify-between border-t border-slate-100 pt-5">
                    <span className="text-[10px] font-semibold uppercase tracking-[0.16em] text-slate-400">
                      {content.footerLabel}
                    </span>
                    <ArrowRight
                      size={17}
                      className="text-slate-300 transition-all duration-300 group-hover:translate-x-1 group-hover:text-brand"
                    />
                  </div>
                </div>
              </article>
            </Reveal>
          ))}
        </div>

        {/* Bottom CTA */}
        <Reveal delay={0.2}>
          <div className="relative mt-14 overflow-hidden rounded-2xl border border-brand/10 bg-surface/80 p-8 sm:p-10">
            <div className="pointer-events-none absolute -right-16 -top-24 h-64 w-64 rounded-full bg-blue-200/30 blur-[80px]" />

            <div className="relative flex flex-col items-center justify-between gap-7 text-center sm:flex-row sm:text-left">
              <div className="flex flex-col items-center gap-4 sm:flex-row">
                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-white text-brand shadow-sm ring-1 ring-brand/10">
                  <Layers3 size={25} />
                </div>

                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.2em] text-brand">
                    {content.ctaEyebrow}
                  </p>
                  <h3 className="mt-2 font-display text-xl font-bold text-navy sm:text-2xl">
                    {content.ctaTitle}
                  </h3>
                </div>
              </div>

              <Link
                href={content.ctaHref}
                className="inline-flex shrink-0 items-center gap-3 rounded-xl bg-navy px-6 py-3.5 text-sm font-semibold text-white shadow-lg shadow-navy/15 transition-all duration-300 hover:-translate-y-1 hover:bg-brand hover:shadow-brand/20"
              >
                {content.ctaLabel}
                <ArrowUpRight size={17} />
              </Link>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
