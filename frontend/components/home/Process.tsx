
import SectionHeading from "@/components/ui/SectionHeading";
import Reveal from "@/components/ui/Reveal";
import { PROCESS } from "@/lib/data";
import { ArrowDown, ArrowRight } from "lucide-react";

export default function Process() {
  return (
    <section className="relative isolate overflow-hidden bg-surface py-24 sm:py-32">

      {/* Background atmosphere */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -left-40 top-10 h-96 w-96 rounded-full bg-blue-100/50 blur-[120px]" />
        <div className="absolute -right-40 bottom-0 h-96 w-96 rounded-full bg-cyan-100/40 blur-[120px]" />

        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(30,111,217,0.025)_1px,transparent_1px),linear-gradient(to_bottom,rgba(30,111,217,0.025)_1px,transparent_1px)] bg-size-[64px_64px]" />
      </div>

      <div className="mx-auto max-w-7xl px-5 sm:px-8">

        {/* Section heading */}
        <SectionHeading
          eyebrow="How we work"
          title={
            <>
              A clear path from{" "}
              <span className="text-gradient">idea to impact.</span>
            </>
          }
          description="A thoughtful, collaborative process that transforms complex challenges into meaningful digital solutions."
        />

        {/* Process timeline */}
        <div className="relative mt-16">

          {/* Desktop connecting line */}
          <div className="absolute left-[10%] right-[10%] top-8 hidden h-px bg-linear-to-r from-brand/10 via-brand/50 to-cyan/20 lg:block" />

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-5 lg:gap-5">

            {PROCESS.map((p, i) => (
              <Reveal key={p.title} delay={i * 0.1}>
                <article className="group relative flex h-full flex-col rounded-2xl border border-white/80 bg-white/85 p-6 shadow-[0_8px_35px_rgba(15,35,70,0.035)] backdrop-blur-sm transition-all duration-500 hover:-translate-y-2 hover:border-brand/30 hover:shadow-[0_24px_55px_rgba(30,111,217,0.10)] sm:p-7">

                  {/* Step number */}
                  <div className="relative z-10 flex items-center justify-between">

                    <div className="flex h-16 w-16 items-center justify-center rounded-2xl border border-brand/10 bg-linear-to-br from-brand/10 to-cyan/10 text-brand shadow-sm transition-all duration-500 group-hover:scale-105 group-hover:from-brand group-hover:to-cyan group-hover:text-white group-hover:shadow-lg group-hover:shadow-brand/20">
                      <p.icon size={26} strokeWidth={1.8} />
                    </div>

                    <span className="font-display text-3xl font-bold text-slate-100 transition-colors duration-300 group-hover:text-brand/20">
                      0{i + 1}
                    </span>

                  </div>

                  {/* Content */}
                  <div className="mt-8">
                    <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-brand">
                      Phase 0{i + 1}
                    </span>

                    <h3 className="mt-2 font-display text-lg font-bold tracking-tight text-navy transition-colors duration-300 group-hover:text-brand">
                      {p.title}
                    </h3>

                    <p className="mt-3 text-sm leading-7 text-muted">
                      {p.text}
                    </p>
                  </div>

                  {/* Bottom accent */}
                  <div className="mt-auto flex items-center justify-between pt-8">
                    <div className="h-px w-10 bg-brand/30 transition-all duration-500 group-hover:w-full group-hover:bg-brand/50" />

                    {i !== PROCESS.length - 1 && (
                      <ArrowRight
                        size={15}
                        className="text-slate-300 transition-all duration-300 group-hover:translate-x-1 group-hover:text-brand"
                      />
                    )}
                  </div>

                </article>
              </Reveal>
            ))}

          </div>
        </div>

        {/* Closing statement */}
        <Reveal delay={0.3}>
          <div className="mt-12 flex flex-col items-center justify-between gap-5 rounded-2xl border border-brand/10 bg-white/75 p-7 text-center backdrop-blur-sm sm:flex-row sm:text-left sm:p-9">

            <div>
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-brand">
                From vision to reality
              </p>

              <h3 className="mt-2 font-display text-xl font-bold text-navy sm:text-2xl">
                Every great product starts with a clear process.
              </h3>
            </div>

            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-brand/10 text-brand">
              <ArrowDown size={22} />
            </div>

          </div>
        </Reveal>

      </div>
    </section>
  );
}
