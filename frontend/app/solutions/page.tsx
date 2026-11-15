import Link from "next/link";
import { ArrowRight, ArrowUpRight, Target } from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";
import Reveal from "@/components/ui/Reveal";
import { SOLUTIONS } from "@/lib/data";

export const metadata = {
  title: "Solutions",
  description:
    "Azoytrix solutions — business process automation, intelligent analytics, cloud modernization and digital product platforms.",
};

export default function SolutionsPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative isolate overflow-hidden bg-white py-24 sm:py-32">
        <div className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(30,111,217,0.035)_1px,transparent_1px),linear-gradient(to_bottom,rgba(30,111,217,0.035)_1px,transparent_1px)] bg-size-[64px_64px]" />
          <div className="absolute left-1/2 top-1/2 h-105 w-105 -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-100/40 blur-[120px]" />
          <div className="absolute -right-32 top-0 h-80 w-80 rounded-full bg-cyan-100/30 blur-[100px]" />
        </div>

        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <Reveal className="mx-auto max-w-4xl text-center">
            <div className="mb-8 flex items-center justify-center gap-3">
              <span className="h-px w-8 bg-brand/50" />
              <span className="text-[11px] font-bold uppercase tracking-[0.3em] text-brand">
                Solutions
              </span>
              <span className="h-px w-8 bg-brand/50" />
            </div>

            <h1 className="font-display text-3xl font-semibold leading-[1.25] tracking-tight text-navy sm:text-5xl lg:text-[3.65rem]">
              Technology that moves your{" "}
              <span className="relative inline-block">
                <span className="text-gradient">business forward.</span>
              </span>
            </h1>

            <p className="mx-auto mt-8 max-w-2xl text-base leading-8 text-slate-500 sm:text-lg sm:leading-9">
              We combine business insight with technical depth to solve real operational challenges,
              simplify complexity and create opportunities for sustainable growth.
            </p>

            <div className="mx-auto mt-16 h-px w-24 bg-linear-to-r from-transparent via-brand/50 to-transparent" />
          </Reveal>
        </div>
      </section>
      {/* Solutions grid */}
      <section className="relative isolate overflow-hidden bg-surface py-24 sm:py-32">
        <div className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute -left-40 top-20 h-96 w-96 rounded-full bg-blue-100/40 blur-[120px]" />
          <div className="absolute -right-40 bottom-0 h-96 w-96 rounded-full bg-cyan-100/40 blur-[120px]" />
          <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(30,111,217,0.025)_1px,transparent_1px),linear-gradient(to_bottom,rgba(30,111,217,0.025)_1px,transparent_1px)] bg-size-[64px_64px]" />
        </div>

        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <div className="mt-16 grid gap-7 md:grid-cols-2 lg:grid-cols-4">
            {SOLUTIONS.map((s, i) => (
              <Reveal key={s.title} delay={i * 0.08}>
                <article className="group relative flex h-full min-h-[460px] flex-col overflow-hidden rounded-2xl border border-white/80 bg-white/90 p-8 shadow-[0_8px_35px_rgba(15,35,70,0.035)] backdrop-blur-sm transition-all duration-500 hover:-translate-y-2 hover:border-brand/30 hover:shadow-[0_24px_55px_rgba(30,111,217,0.10)] sm:p-9">
                  <div className="pointer-events-none absolute -right-20 -top-20 h-56 w-56 rounded-full bg-cyan-100/0 blur-3xl transition-all duration-700 group-hover:bg-cyan-100/80" />
                  <div className="relative flex items-center justify-between">
                    <span className="font-display text-sm font-semibold tracking-[0.2em] text-slate-300 transition-colors duration-300 group-hover:text-brand/70">
                      0{i + 1}
                    </span>
                    <ArrowUpRight
                      size={18}
                      className="text-slate-300 transition-all duration-300 group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-brand"
                    />
                  </div>
                  <div className="relative mt-10 flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-linear-to-br from-brand/10 to-cyan/10 text-brand ring-1 ring-brand/10 transition-all duration-500 group-hover:scale-110 group-hover:from-brand group-hover:to-cyan group-hover:text-white group-hover:shadow-lg group-hover:shadow-brand/20">
                    <s.icon size={28} strokeWidth={2} />
                  </div>
                  <div className="relative mt-10 flex-1">
                    <h3 className="font-display text-2xl font-bold tracking-tight text-navy transition-colors duration-300 group-hover:text-brand">
                      {s.title}
                    </h3>
                    <p className="mt-5 text-sm leading-7 text-muted">{s.text}</p>
                  </div>
                  <div className="relative mt-auto pt-10 border-t border-slate-100/60">
                    <Link
                      href={`/solutions#${s.title.toLowerCase().replace(/\s+/g, "-")}`}
                      className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.15em] text-slate-400 transition-all duration-300 group-hover:gap-3 group-hover:text-brand"
                    >
                      Explore solution
                      <ArrowRight size={14} className="transition-transform duration-300 group-hover:translate-x-1" />
                    </Link>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
          {/* Supporting statement */}
          <Reveal className="mt-16">
            <div className="relative mt-12 flex flex-col items-center justify-between gap-5 rounded-2xl border border-brand/10 bg-white/75 p-8 text-center backdrop-blur-sm sm:flex-row sm:text-left sm:p-10">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-brand">
                  Built around your business
                </p>
                <h3 className="mt-2 font-display text-xl font-bold text-navy sm:text-2xl">
                  Purposeful technology, practical thinking and solutions designed to scale with
                  you.
                </h3>
              </div>
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-brand/10 text-brand">
                <Target size={22} />
              </div>
            </div>
          </Reveal>

          {/* Bottom CTA */}
          <Reveal className="mt-16">
            <div className="relative overflow-hidden rounded-2xl border border-brand/10 bg-white p-8 shadow-[0_8px_35px_rgba(15,35,70,0.035)] sm:flex sm:items-center sm:justify-between sm:p-10">
              <div className="pointer-events-none absolute -right-10 -top-24 h-64 w-64 rounded-full bg-blue-100/50 blur-[80px]" />
              <div className="relative">
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-brand">
                  Ready to solve a challenge?
                </p>
                <h3 className="mt-2 font-display text-xl font-bold text-navy sm:text-2xl">
                  Let's find the right solution together.
                </h3>
                <p className="mt-2 text-sm text-muted">
                  Tell us about your operational goals and we'll recommend a path forward.
                </p>
              </div>
              <Link
                href="/contact"
                className="relative mt-6 inline-flex shrink-0 items-center justify-center gap-3 rounded-full bg-navy px-7 py-4 text-sm font-semibold text-white transition-all duration-300 hover:bg-brand hover:shadow-lg hover:shadow-brand/20 sm:mt-0"
              >
                Start a conversation
                <ArrowRight size={16} />
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}