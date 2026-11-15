import Link from "next/link";
import { ArrowRight } from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";
import Reveal from "@/components/ui/Reveal";
import { SERVICES } from "@/lib/data";

export default function ServicesOverview() {
  return (
    <section className="bg-surface py-24">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeading
          eyebrow="What we do"
          title="Six ways we engineer your growth"
          description="From first idea to scaled platform, our services cover the full technology lifecycle."
        />

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {SERVICES.map((s, i) => (
            <Reveal key={s.title} delay={i * 0.07}>
              <div className="group h-full rounded-2xl border border-line bg-white p-7 transition hover:-translate-y-1 hover:border-brand/40 hover:shadow-xl hover:shadow-brand/10">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-linear-to-br from-brand to-cyan text-white">
                  <s.icon size={22} />
                </div>
                <h3 className="mt-5 text-lg font-bold text-navy">{s.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{s.text}</p>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-10 text-center">
          <Link href="/services" className="inline-flex items-center gap-2 text-sm font-semibold text-brand hover:underline">
            Explore all services <ArrowRight size={16} />
          </Link>
        </Reveal>
      </div>
    </section>
  );
}