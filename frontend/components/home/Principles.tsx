import SectionHeading from "@/components/ui/SectionHeading";
import Reveal from "@/components/ui/Reveal";
import { PRINCIPLES } from "@/lib/data";

export default function Principles() {
  return (
    <section className="bg-white py-24">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeading eyebrow="What drives us" title="Our guiding principles" />
        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {PRINCIPLES.map((p, i) => (
            <Reveal key={p.title} delay={i * 0.1}>
              <div className="h-full rounded-2xl border border-line bg-linear-to-b from-white to-surface p-8">
                <span className="font-display text-5xl font-extrabold text-gradient">0{i + 1}</span>
                <h3 className="mt-4 text-xl font-bold text-navy">{p.title}</h3>
                <p className="mt-3 leading-relaxed text-muted">{p.text}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}