
import SectionHeading from "@/components/ui/SectionHeading";
import Reveal from "@/components/ui/Reveal";
import { WHY } from "@/lib/data";
import { ArrowUpRight } from "lucide-react";

export default function WhyAzoytrix() {
  return (
    <section className="relative isolate overflow-hidden bg-surface py-24 sm:py-32">

      {/* Background atmosphere */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -left-40 top-0 h-96 w-96 rounded-full bg-blue-100/50 blur-[120px]" />
        <div className="absolute -right-40 bottom-0 h-96 w-96 rounded-full bg-cyan-100/40 blur-[120px]" />

        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(30,111,217,0.025)_1px,transparent_1px),linear-gradient(to_bottom,rgba(30,111,217,0.025)_1px,transparent_1px)] bg-size-[64px_64px]" />
      </div>

      <div className="mx-auto max-w-7xl px-5 sm:px-8">

        {/* Section heading */}
        <SectionHeading
          eyebrow="Why Azoytrix"
          title="A technology partner built for the long run."
          description="Great technology is more than code. It's about building meaningful partnerships, delivering lasting value and creating solutions that grow with your ambitions."
        />

        {/* Feature cards */}
        <div className="mt-16 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">

          {WHY.map((w, i) => (
            <Reveal key={w.title} delay={i * 0.09}>
              <article className="group relative flex h-full min-h-72 flex-col overflow-hidden rounded-2xl border border-white/80 bg-white/85 p-7 shadow-[0_8px_35px_rgba(15,35,70,0.035)] backdrop-blur-sm transition-all duration-500 hover:-translate-y-2 hover:border-brand/30 hover:shadow-[0_24px_55px_rgba(30,111,217,0.11)]">

                {/* Decorative number */}
                <span className="pointer-events-none absolute -right-2 -top-8 select-none font-display text-[110px] font-bold leading-none text-slate-100/80 transition-all duration-500 group-hover:text-blue-50">
                  0{i + 1}
                </span>

                {/* Hover glow */}
                <div className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-cyan-100/0 blur-3xl transition-all duration-700 group-hover:bg-cyan-100/80" />

                {/* Top row */}
                <div className="relative flex items-center justify-between">
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-linear-to-br from-brand/10 to-cyan/10 text-brand ring-1 ring-brand/10 transition-all duration-500 group-hover:scale-110 group-hover:from-brand group-hover:to-cyan group-hover:text-white group-hover:shadow-lg group-hover:shadow-brand/20">
                    <w.icon size={25} strokeWidth={1.8} />
                  </div>

                  <ArrowUpRight
                    size={19}
                    className="text-slate-300 transition-all duration-300 group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-brand"
                  />
                </div>

                {/* Content */}
                <div className="relative mt-9">
                  <h3 className="font-display text-lg font-bold tracking-tight text-navy transition-colors duration-300 group-hover:text-brand">
                    {w.title}
                  </h3>

                  <p className="mt-3 text-sm leading-7 text-muted">
                    {w.text}
                  </p>
                </div>

                {/* Bottom accent */}
                <div className="relative mt-auto pt-8">
                  <div className="h-px w-10 bg-brand/30 transition-all duration-500 group-hover:w-full group-hover:bg-brand/50" />
                </div>

              </article>
            </Reveal>
          ))}

        </div>

        {/* Closing statement */}
        <Reveal delay={0.2}>
          <div className="mt-12 flex flex-col items-center justify-between gap-5 rounded-2xl border border-brand/10 bg-white/75 p-7 text-center backdrop-blur-sm sm:flex-row sm:text-left sm:p-9">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-brand">
                The Azoytrix approach
              </p>
              <h3 className="mt-2 font-display text-xl font-bold text-navy sm:text-2xl">
                Think beyond technology. Build for impact.
              </h3>
            </div>

            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-brand/10 text-brand">
              <ArrowUpRight size={22} />
            </div>
          </div>
        </Reveal>

      </div>
    </section>
  );
}
