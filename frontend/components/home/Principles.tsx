
import SectionHeading from "@/components/ui/SectionHeading";
import Reveal from "@/components/ui/Reveal";
import { PRINCIPLES } from "@/lib/data";
import { ArrowUpRight, Fingerprint } from "lucide-react";

export default function Principles() {
  return (
    <section className="relative isolate overflow-hidden bg-white py-28 sm:py-36">
      {/* Background */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -right-40 top-0 h-96 w-96 rounded-full bg-blue-100/50 blur-[120px]" />
        <div className="absolute -left-40 bottom-0 h-96 w-96 rounded-full bg-cyan-100/40 blur-[120px]" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(30,111,217,0.025)_1px,transparent_1px),linear-gradient(to_bottom,rgba(30,111,217,0.025)_1px,transparent_1px)] bg-size-[64px_64px]" />
      </div>

      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        {/* Editorial heading */}
        <div className="grid gap-8 lg:grid-cols-[1fr_0.7fr] lg:items-end">
          <Reveal>
            <div>
              <div className="mb-5 flex items-center gap-3">
                <span className="h-px w-9 bg-brand" />
                <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-brand">
                  What drives us
                </span>
              </div>

              <h2 className="max-w-2xl font-display text-4xl font-bold leading-[1.12] tracking-tight text-navy sm:text-5xl lg:text-6xl">
                The principles behind{" "}
                <span className="text-gradient">every possibility.</span>
              </h2>
            </div>
          </Reveal>

          <Reveal delay={0.12}>
            <p className="max-w-md text-sm leading-8 text-muted lg:ml-auto">
              Technology is only as meaningful as the thinking behind it.
              These principles shape how we approach challenges, engineer
              solutions and build lasting partnerships.
            </p>
          </Reveal>
        </div>

        {/* Principle pillars */}
        <div className="relative mt-20">
          {/* Connecting line */}
          <div className="absolute left-0 right-0 top-0 hidden h-px bg-linear-to-r from-transparent via-brand/25 to-transparent md:block" />

          <div className="grid gap-0 md:grid-cols-3">
            {PRINCIPLES.map((p, i) => (
              <Reveal key={p.title} delay={i * 0.12}>
                <article className="group relative flex h-full flex-col border-b border-line py-9 first:pt-0 last:border-b-0 md:border-b-0 md:border-r md:px-8 md:first:pl-0 md:last:border-r-0 md:last:pr-0 md:pt-10">
                  {/* Number and icon */}
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs font-bold tracking-[0.2em] text-brand">
                      PRINCIPLE / 0{i + 1}
                    </span>

                    <div className="flex h-10 w-10 items-center justify-center rounded-full border border-line bg-white text-brand transition-all duration-500 group-hover:border-brand group-hover:bg-brand group-hover:text-white">
                      <ArrowUpRight size={18} />
                    </div>
                  </div>

                  {/* Oversized number */}
                  <div className="relative mt-8 overflow-hidden">
                    <span className="select-none font-display text-[100px] font-extrabold leading-none tracking-tighter text-slate-100 transition-all duration-700 group-hover:text-blue-100/80">
                      0{i + 1}
                    </span>

                    <div className="absolute bottom-3 left-1 h-1 w-10 rounded-full bg-linear-to-r from-brand to-cyan transition-all duration-500 group-hover:w-24" />
                  </div>

                  {/* Content */}
                  <div className="mt-7 max-w-sm">
                    <h3 className="font-display text-2xl font-bold tracking-tight text-navy transition-colors duration-300 group-hover:text-brand">
                      {p.title}
                    </h3>

                    <p className="mt-4 text-sm leading-8 text-muted">
                      {p.text}
                    </p>
                  </div>

                  {/* Bottom marker */}
                  <div className="mt-9 flex items-center gap-3">
                    <span className="h-px w-6 bg-brand/40 transition-all duration-500 group-hover:w-12 group-hover:bg-brand" />
                    <span className="text-[9px] font-bold uppercase tracking-[0.2em] text-slate-400">
                      The Azoytrix mindset
                    </span>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>

        {/* Manifesto footer */}
        <Reveal delay={0.25}>
          <div className="relative mt-16 overflow-hidden rounded-3xl bg-navy px-8 py-10 sm:px-12 sm:py-14">
            <div className="pointer-events-none absolute -right-20 -top-32 h-80 w-80 rounded-full bg-blue-500/20 blur-[100px]" />
            <div className="pointer-events-none absolute inset-0 opacity-[0.07] bg-[linear-gradient(rgba(255,255,255,0.3)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.3)_1px,transparent_1px)] bg-size-[40px_40px]" />

            <div className="relative flex flex-col gap-7 sm:flex-row sm:items-center sm:justify-between">
              <div className="max-w-2xl">
                <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-cyan-300">
                  Our philosophy
                </span>

                <h3 className="mt-4 font-display text-2xl font-bold leading-snug text-white sm:text-3xl">
                  We don't just follow the future.
                  <span className="block text-cyan-300">
                    We engineer what's possible.
                  </span>
                </h3>
              </div>

              <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl border border-white/15 bg-white/5 text-cyan-300">
                <Fingerprint size={32} strokeWidth={1.3} />
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
