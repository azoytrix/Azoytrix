import Link from "next/link";
import { ArrowRight, ArrowUpRight, Briefcase, Cpu, Layers3 } from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";
import Reveal from "@/components/ui/Reveal";
import { PRINCIPLES } from "@/lib/data";
import RobotCTA from "@/components/about/RobotCTA";

export const metadata = {
  title: "About",
  description:
    "About Azoytrix — our story, mission, and the principles that shape how we build technology.",
};

export default function AboutPage() {
  return (
    <>
      {/* Hero — Our story */}
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
                Our story
              </span>
              <span className="h-px w-8 bg-brand/50" />
            </div>

            <h1 className="font-display text-3xl font-semibold leading-[1.25] tracking-tight text-navy sm:text-5xl lg:text-[3.65rem]">
              Engineering the next era,{" "}
              <span className="relative inline-block">
                <span className="text-gradient">together.</span>
              </span>
            </h1>

            <p className="mx-auto mt-8 max-w-2xl text-base leading-8 text-slate-500 sm:text-lg sm:leading-9">
              Azoytrix was founded on the belief that technology should serve people — not the
              other way around. We bring together software engineering, artificial intelligence
              and cloud to help organisations innovate, evolve and build what comes next.
            </p>

            <div className="mx-auto mt-16 h-px w-24 bg-linear-to-r from-transparent via-brand/50 to-transparent" />
          </Reveal>
        </div>
      </section>
      {/* Mission & beliefs — unique to About */}
      <section className="relative isolate overflow-hidden bg-surface py-24 sm:py-32">
        <div className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute -left-40 top-20 h-96 w-96 rounded-full bg-blue-100/50 blur-[120px]" />
          <div className="absolute -right-40 bottom-0 h-96 w-96 rounded-full bg-cyan-100/40 blur-[120px]" />
          <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(30,111,217,0.025)_1px,transparent_1px),linear-gradient(to_bottom,rgba(30,111,217,0.025)_1px,transparent_1px)] bg-size-[64px_64px]" />
        </div>

        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
            <Reveal className="lg:pr-12">
              <SectionHeading
                eyebrow="Our mission"
                title="Technology that serves people, not the other way around."
                description="We exist to close the gap between ambitious ideas and working software. Every line of code we write is a step toward something useful, something lasting, something better."
              />
            </Reveal>

            <Reveal delay={0.08} className="lg:pl-12">
              <div className="space-y-6">
                {[
                  {
                    title: "Practical over performative",
                    text: "We ship what works. No buzzword-driven architecture, no solutions in search of a problem.",
                  },
                  {
                    title: "Partnership, not vendor relationships",
                    text: "We own outcomes alongside you — clear communication, shared accountability, real results.",
                  },
                  {
                    title: "Built to evolve",
                    text: "Software should grow with your business, not constrain it. We engineer for change from day one.",
                  },
                ].map((belief, i) => (
                  <div key={belief.title} className="flex gap-4">
                    <div className="flex shrink-0 h-10 w-10 items-center justify-center rounded-xl bg-linear-to-br from-brand/10 to-cyan/10 text-brand ring-1 ring-brand/10">
                      <Briefcase size={20} strokeWidth={2} />
                    </div>
                    <div>
                      <h3 className="font-display text-lg font-bold tracking-tight text-navy">
                        {belief.title}
                      </h3>
                      <p className="mt-1 text-sm leading-7 text-muted">{belief.text}</p>
                    </div>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </div>
      </section>
      {/* The Azoytrix Difference — unique pillars */}
      <section className="relative isolate overflow-hidden bg-white py-24 sm:py-32">
        <div className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute -right-40 top-0 h-96 w-96 rounded-full bg-blue-100/50 blur-[120px]" />
          <div className="absolute -left-40 bottom-0 h-96 w-96 rounded-full bg-cyan-100/40 blur-[120px]" />
          <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(30,111,217,0.025)_1px,transparent_1px),linear-gradient(to_bottom,rgba(30,111,217,0.025)_1px,transparent_1px)] bg-size-[64px_64px]" />
        </div>

        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <SectionHeading
            eyebrow="What sets us apart"
            title="The Azoytrix difference."
            description="It's not just what we build — it's how we build it, and who we build it with."
          />

          <div className="mt-16 grid gap-6 md:grid-cols-3">
            {[
              {
                title: "Engineering-first",
                text: "Clean, tested, scalable code — always. We hold ourselves to rigorous standards because your product deserves it.",
                icon: Cpu,
              },
              {
                title: "AI with purpose",
                text: "We apply AI where it genuinely adds value — copilots, automation, predictive models that fit real workflows.",
                icon: Layers3,
              },
              {
                title: "Long-term partnership",
                text: "We don't ship and disappear. We stay involved, iterate, and grow with you as your needs evolve.",
                icon: ArrowUpRight,
              },
            ].map((p, i) => (
              <Reveal key={p.title} delay={i * 0.08}>
                <article className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-white/80 bg-white/85 p-8 shadow-[0_8px_35px_rgba(15,35,70,0.035)] backdrop-blur-sm transition-all duration-500 hover:-translate-y-2 hover:border-brand/30 sm:p-9">
                  <div className="relative mt-10 flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-linear-to-br from-brand/10 to-cyan/10 text-brand ring-1 ring-brand/10 transition-all duration-500 group-hover:scale-110 group-hover:from-brand group-hover:to-cyan group-hover:text-white group-hover:shadow-lg group-hover:shadow-brand/20">
                    <p.icon size={28} strokeWidth={2} />
                  </div>
                  <div className="relative mt-10 flex-1">
                    <h3 className="font-display text-xl font-bold tracking-tight text-navy transition-colors duration-300 group-hover:text-brand">
                      {p.title}
                    </h3>
                    <p className="mt-5 text-sm leading-7 text-muted">{p.text}</p>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
      {/* Light glass closing CTA */}
      <section className="relative isolate overflow-hidden bg-surface px-5 py-24 sm:px-8 sm:py-32">
        <div className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute left-1/2 top-1/2 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-50/40 blur-[140px]" />
          <div className="absolute -right-40 top-0 h-96 w-96 rounded-full bg-cyan-50/30 blur-[120px]" />
          <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(30,111,217,0.02)_1px,transparent_1px),linear-gradient(to_bottom,rgba(30,111,217,0.02)_1px,transparent_1px)] bg-size-[64px_64px]" />
        </div>

        <Reveal>
          <div className="relative mx-auto max-w-7xl overflow-hidden rounded-[2rem] bg-white/70 border border-white/60 px-7 py-16 backdrop-blur-md sm:px-12 sm:py-20 lg:px-16 lg:py-24 shadow-[0_20px_60px_rgba(15,35,70,0.08)]">
            <div className="relative z-10 grid gap-10 items-center lg:grid-cols-2 lg:gap-16">
              {/* Left: CTA text */}
              <div className="max-w-xl">
                <div className="mb-6 inline-flex items-center gap-3 rounded-full border border-brand/20 bg-brand/10 px-4 py-2 backdrop-blur-sm">
                  <span className="relative flex h-2 w-2">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-brand opacity-60" />
                    <span className="relative inline-flex h-2 w-2 rounded-full bg-brand" />
                  </span>
                  <span className="text-[10px] font-bold uppercase tracking-[0.23em] text-brand">
                    Ready to start a conversation?
                  </span>
                </div>
                <h2 className="font-display text-4xl font-extrabold leading-[1.12] tracking-tight text-navy sm:text-5xl xl:text-6xl">
                  Let's build & Transform something meaningful.
                </h2>
                <p className="mt-7 max-w-xl text-base leading-8 text-muted sm:text-lg">
                  Tell us about your project, and we'll show you what's possible.
                </p>
                <div className="mt-10 flex flex-col gap-4 sm:flex-row">
                  <Link
                    href="/contact"
                    className="group inline-flex items-center justify-center gap-3 rounded-full bg-navy px-8 py-4 text-sm font-bold text-white shadow-lg shadow-navy/20 transition-all duration-300 hover:-translate-y-1 hover:bg-brand hover:shadow-lg hover:shadow-brand/25 sm:justify-start"
                  >
                    Start a conversation
                    <ArrowRight size={17} className="transition-transform duration-300 group-hover:translate-x-1" />
                  </Link>
                </div>
              </div>

              {/* Right: 3D robot that dodges the mouse */}
              <div className="flex justify-center">
                <RobotCTA />
              </div>
            </div>
          </div>
        </Reveal>
      </section>
    </>
  );
}