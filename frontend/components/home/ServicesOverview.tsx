
import Link from "next/link";
import { ArrowRight, MoveUpRight } from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";
import GradientTitle from "@/components/ui/GradientTitle";
import Reveal from "@/components/ui/Reveal";
import DynamicIcon from "@/components/ui/DynamicIcon";
import { FALLBACK_HOMEPAGE, type ServicesContent } from "@/lib/homepage";

export default function ServicesOverview({
  content = FALLBACK_HOMEPAGE.services,
}: {
  content?: ServicesContent;
}) {
  return (
    <section className="relative isolate overflow-hidden bg-surface py-24 sm:py-32">

      {/* Background atmosphere */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -left-40 top-20 h-96 w-96 rounded-full bg-blue-100/50 blur-[120px]" />
        <div className="absolute -right-40 bottom-0 h-96 w-96 rounded-full bg-cyan-100/40 blur-[120px]" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(30,111,217,0.025)_1px,transparent_1px),linear-gradient(to_bottom,rgba(30,111,217,0.025)_1px,transparent_1px)] bg-size-[64px_64px]" />
      </div>

      <div className="mx-auto max-w-7xl px-5 sm:px-8">

        <SectionHeading
          eyebrow={content.eyebrow}
          title={<GradientTitle text={content.title} highlight={content.titleHighlight} />}
          description={content.description}
        />

        {/* Services grid */}
        <div className="mt-16 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {content.items.map((s, i) => (
            <Reveal key={`${s.title}-${i}`} delay={i * 0.07}>
              <article className="group relative flex h-full min-h-72 flex-col overflow-hidden rounded-2xl border border-white/80 bg-white/85 p-7 shadow-[0_8px_35px_rgba(15,35,70,0.035)] backdrop-blur-sm transition-all duration-500 hover:-translate-y-2 hover:border-brand/25 hover:shadow-[0_24px_60px_rgba(30,111,217,0.11)] sm:p-8">

                {/* Hover background glow */}
                <div className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-cyan-100/0 blur-3xl transition-all duration-700 group-hover:bg-cyan-100/80" />

                {/* Top row */}
                <div className="relative flex items-center justify-between">
                  <span className="font-display text-sm font-semibold tracking-[0.2em] text-slate-300 transition-colors duration-300 group-hover:text-brand/70">
                    0{i + 1}
                  </span>

                  <MoveUpRight
                    size={19}
                    className="text-slate-300 transition-all duration-300 group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-brand"
                  />
                </div>

                {/* Icon */}
                <div className="relative mt-8 flex h-14 w-14 items-center justify-center rounded-2xl bg-linear-to-br from-brand/10 to-cyan/10 text-brand ring-1 ring-brand/10 transition-all duration-500 group-hover:scale-110 group-hover:from-brand group-hover:to-cyan group-hover:text-white group-hover:shadow-lg group-hover:shadow-brand/20">
                  <DynamicIcon name={s.icon} size={25} strokeWidth={1.8} />
                </div>

                {/* Content */}
                <div className="relative mt-7">
                  <h3 className="font-display text-xl font-bold tracking-tight text-navy transition-colors duration-300 group-hover:text-brand">
                    {s.title}
                  </h3>

                  <p className="mt-3 text-sm leading-7 text-muted">
                    {s.text}
                  </p>
                </div>

                {/* Bottom accent */}
                <div className="relative mt-auto pt-8">
                  <div className="h-px w-full bg-slate-100 transition-colors duration-300 group-hover:bg-brand/20" />
                  <div className="mt-4 flex items-center gap-2 text-xs font-bold uppercase tracking-[0.15em] text-slate-400 transition-all duration-300 group-hover:gap-3 group-hover:text-brand">
                    {content.cardFooterLabel}
                    <ArrowRight size={14} />
                  </div>
                </div>

              </article>
            </Reveal>
          ))}
        </div>

        {/* Bottom CTA */}
        <Reveal className="mt-14">
          <div className="relative overflow-hidden rounded-2xl border border-brand/10 bg-white p-7 shadow-[0_8px_35px_rgba(15,35,70,0.035)] sm:flex sm:items-center sm:justify-between sm:p-9">

            <div className="pointer-events-none absolute -right-10 -top-24 h-64 w-64 rounded-full bg-blue-100/50 blur-[80px]" />

            <div className="relative">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-brand">
                {content.ctaEyebrow}
              </p>
              <h3 className="mt-2 font-display text-xl font-bold text-navy sm:text-2xl">
                {content.ctaTitle}
              </h3>
              <p className="mt-2 text-sm text-muted">
                {content.ctaDescription}
              </p>
            </div>

            <Link
              href={content.ctaHref}
              className="relative mt-6 inline-flex shrink-0 items-center justify-center gap-3 rounded-full bg-navy px-6 py-3.5 text-sm font-semibold text-white transition-all duration-300 hover:bg-brand hover:shadow-lg hover:shadow-brand/20 sm:mt-0"
            >
              {content.ctaLabel}
              <ArrowRight size={16} />
            </Link>

          </div>
        </Reveal>

      </div>
    </section>
  );
}
