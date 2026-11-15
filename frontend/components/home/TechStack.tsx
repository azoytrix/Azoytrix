import SectionHeading from "@/components/ui/SectionHeading";
import Reveal from "@/components/ui/Reveal";
import { TECH } from "@/lib/data";

export default function TechStack() {
  return (
    <section className="bg-white py-24">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeading
          eyebrow="Technology"
          title="Modern tools, proven in production"
          description="We choose technology for reliability and speed, not for trends."
        />
        <div className="mt-14 grid gap-6 md:grid-cols-2">
          {TECH.map((t, i) => (
            <Reveal key={t.group} delay={i * 0.07}>
              <div className="rounded-2xl border border-line p-6">
                <h3 className="text-sm font-semibold uppercase tracking-wider text-brand">{t.group}</h3>
                <div className="mt-4 flex flex-wrap gap-2.5">
                  {t.items.map((item) => (
                    <span key={item} className="rounded-full border border-line bg-surface px-4 py-1.5 text-sm font-medium text-navy">
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}