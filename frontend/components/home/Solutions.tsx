import Link from "next/link";
import { ArrowRight } from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";
import Reveal from "@/components/ui/Reveal";
import { SOLUTIONS } from "@/lib/data";

export default function Solutions() {
  return (
    <section className="bg-white py-24">
      <div className="mx-auto grid max-w-7xl gap-14 px-5 sm:px-8 lg:grid-cols-5">
        <div className="lg:col-span-2">
          <SectionHeading
            center={false}
            eyebrow="Solutions"
            title={<>Solutions shaped around your <span className="text-gradient">business</span></>}
            description="We combine business insight with technical depth to solve real operational challenges."
          />
          <Reveal delay={0.1}>
            <Link href="/solutions" className="mt-8 inline-flex items-center gap-2 rounded-full bg-navy px-6 py-3 text-sm font-semibold text-white transition hover:bg-brand">
              View solutions <ArrowRight size={16} />
            </Link>
          </Reveal>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:col-span-3">
          {SOLUTIONS.map((s, i) => (
            <Reveal key={s.title} delay={i * 0.08}>
              <div className="h-full rounded-2xl border border-line bg-surface p-6">
                <s.icon className="text-brand" size={26} />
                <h3 className="mt-4 font-bold text-navy">{s.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{s.text}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}