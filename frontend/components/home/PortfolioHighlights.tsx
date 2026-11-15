import Link from "next/link";
import { ArrowRight } from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";
import Reveal from "@/components/ui/Reveal";
import { PORTFOLIO } from "@/lib/data";

export default function PortfolioHighlights() {
  return (
    <section className="bg-white py-24">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeading
          eyebrow="Our work"
          title="Concepts we're engineering"
          description="A look at the kind of products and platforms we design and build."
        />
        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {PORTFOLIO.map((p, i) => (
            <Reveal key={p.title} delay={i * 0.08}>
              <article className="group overflow-hidden rounded-2xl border border-line bg-white transition hover:-translate-y-1 hover:shadow-xl hover:shadow-brand/10">
                {/* Swap this gradient for a Cloudinary image later */}
                <div className={`relative h-48 bg-linear-to-br ${p.from} ${p.to}`}>
                  <div className="bg-grid absolute inset-0 opacity-60" />
                </div>
                <div className="p-6">
                  <span className="text-xs font-semibold uppercase tracking-wider text-brand">{p.tag}</span>
                  <h3 className="mt-2 text-lg font-bold text-navy">{p.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted">{p.text}</p>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
        <Reveal className="mt-10 text-center">
          <Link href="/our-work" className="inline-flex items-center gap-2 text-sm font-semibold text-brand hover:underline">
            See all work <ArrowRight size={16} />
          </Link>
        </Reveal>
      </div>
    </section>
  );
}