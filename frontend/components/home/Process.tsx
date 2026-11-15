import SectionHeading from "@/components/ui/SectionHeading";
import Reveal from "@/components/ui/Reveal";
import { PROCESS } from "@/lib/data";

export default function Process() {
  return (
    <section className="bg-surface py-24">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeading eyebrow="How we work" title="A clear path from idea to impact" />
        <div className="relative mt-16 grid gap-10 md:grid-cols-5 md:gap-4">
          <div className="absolute left-0 right-0 top-7 hidden h-px bg-linear-to-r from-transparent via-brand/40 to-transparent md:block" />
          {PROCESS.map((p, i) => (
            <Reveal key={p.title} delay={i * 0.09}>
              <div className="relative text-center">
                <div className="relative z-10 mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-navy text-white shadow-lg shadow-navy/20">
                  <p.icon size={22} />
                </div>
                <p className="mt-4 text-xs font-semibold tracking-widest text-cyan">0{i + 1}</p>
                <h3 className="mt-1 font-bold text-navy">{p.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{p.text}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}