import SectionHeading from "@/components/ui/SectionHeading";
import Reveal from "@/components/ui/Reveal";
import { WHY } from "@/lib/data";

export default function WhyAzoytrix() {
  return (
    <section className="bg-surface py-24">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeading eyebrow="Why Azoytrix" title="A partner built for the long run" />
        <div className="mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {WHY.map((w, i) => (
            <Reveal key={w.title} delay={i * 0.08}>
              <div className="text-center">
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full border border-line bg-white text-brand shadow-sm">
                  <w.icon size={24} />
                </div>
                <h3 className="mt-5 font-bold text-navy">{w.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{w.text}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}