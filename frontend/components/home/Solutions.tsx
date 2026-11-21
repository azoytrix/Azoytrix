
import Link from "next/link";
import { ArrowRight, MoveUpRight } from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";
import GradientTitle from "@/components/ui/GradientTitle";
import Reveal from "@/components/ui/Reveal";
import DynamicIcon from "@/components/ui/DynamicIcon";
import { FALLBACK_HOMEPAGE, type SolutionsContent } from "@/lib/homepage";

export default function Solutions({
  content = FALLBACK_HOMEPAGE.solutions,
}: {
  content?: SolutionsContent;
}) {
  return (
    <section className="relative isolate overflow-hidden bg-white py-24 sm:py-32">

      {/* Background atmosphere */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -left-48 top-20 h-96 w-96 rounded-full bg-blue-100/40 blur-[120px]" />
        <div className="absolute -right-40 bottom-0 h-96 w-96 rounded-full bg-cyan-100/40 blur-[120px]" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(30,111,217,0.025)_1px,transparent_1px),linear-gradient(to_bottom,rgba(30,111,217,0.025)_1px,transparent_1px)] bg-size-[64px_64px]" />
      </div>

      <div className="mx-auto grid max-w-7xl items-start gap-14 px-5 sm:px-8 lg:grid-cols-5 lg:gap-16">

        {/* Left introduction */}
        <div className="lg:sticky lg:top-28 lg:col-span-2">

          <SectionHeading
            center={false}
            eyebrow={content.eyebrow}
            title={<GradientTitle text={content.title} highlight={content.titleHighlight} />}
            description={content.description}
          />

          <Reveal delay={0.1}>
            <div className="mt-9">
              <Link
                href={content.buttonHref}
                className="group inline-flex items-center gap-3 rounded-full bg-navy px-7 py-3.5 text-sm font-semibold text-white shadow-lg shadow-navy/10 transition-all duration-300 hover:-translate-y-1 hover:bg-brand hover:shadow-brand/20"
              >
                {content.buttonLabel}
                <ArrowRight
                  size={16}
                  className="transition-transform duration-300 group-hover:translate-x-1"
                />
              </Link>
            </div>
          </Reveal>

          {/* Supporting statement */}
          <Reveal delay={0.2}>
            <div className="mt-14 border-l-2 border-brand/30 pl-5">
              <p className="text-sm font-semibold text-navy">
                {content.noteTitle}
              </p>
              <p className="mt-2 max-w-xs text-sm leading-7 text-muted">
                {content.noteText}
              </p>
            </div>
          </Reveal>
        </div>

        {/* Right solution cards */}
        <div className="grid gap-5 sm:grid-cols-2 lg:col-span-3">

          {content.items.map((s, i) => (
            <Reveal key={`${s.title}-${i}`} delay={i * 0.08}>
              <article className="group relative flex h-full min-h-64 flex-col overflow-hidden rounded-2xl border border-line/80 bg-white/80 p-7 shadow-[0_8px_30px_rgba(15,35,70,0.035)] backdrop-blur-sm transition-all duration-500 hover:-translate-y-2 hover:border-brand/30 hover:shadow-[0_24px_55px_rgba(30,111,217,0.10)]">

                {/* Hover glow */}
                <div className="pointer-events-none absolute -right-20 -top-20 h-48 w-48 rounded-full bg-cyan-100/0 blur-3xl transition-all duration-700 group-hover:bg-cyan-100/80" />

                {/* Number and arrow */}
                <div className="relative flex items-center justify-between">
                  <span className="font-display text-sm font-bold tracking-[0.2em] text-slate-300 transition-colors group-hover:text-brand/70">
                    0{i + 1}
                  </span>

                  <MoveUpRight
                    size={18}
                    className="text-slate-300 transition-all duration-300 group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-brand"
                  />
                </div>

                {/* Icon */}
                <div className="relative mt-8 flex h-14 w-14 items-center justify-center rounded-2xl bg-linear-to-br from-brand/10 to-cyan/10 text-brand ring-1 ring-brand/10 transition-all duration-500 group-hover:scale-110 group-hover:from-brand group-hover:to-cyan group-hover:text-white group-hover:shadow-lg group-hover:shadow-brand/20">
                  <DynamicIcon name={s.icon} size={25} strokeWidth={1.8} />
                </div>

                {/* Content */}
                <div className="relative mt-7">
                  <h3 className="font-display text-lg font-bold tracking-tight text-navy transition-colors duration-300 group-hover:text-brand">
                    {s.title}
                  </h3>

                  <p className="mt-3 text-sm leading-7 text-muted">
                    {s.text}
                  </p>
                </div>

                {/* Bottom accent */}
                <div className="relative mt-auto pt-7">
                  <div className="h-px w-full bg-slate-100 transition-colors duration-300 group-hover:bg-brand/20" />
                </div>

              </article>
            </Reveal>
          ))}

        </div>
      </div>
    </section>
  );
}
