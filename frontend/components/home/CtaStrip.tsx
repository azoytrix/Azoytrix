import Link from "next/link";
import { ArrowRight, Mail } from "lucide-react";
import Reveal from "@/components/ui/Reveal";
import { SITE } from "@/lib/site";

export default function CtaStrip() {
  return (
    <section className="bg-surface px-5 py-24 sm:px-8">
      <Reveal className="relative mx-auto max-w-6xl overflow-hidden rounded-3xl bg-navy px-8 py-16 text-center sm:px-16">
        <div className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-cyan/20 blur-3xl" />
        <div className="absolute -bottom-24 -left-24 h-72 w-72 rounded-full bg-brand/40 blur-3xl" />
        <div className="relative">
          <h2 className="text-3xl font-extrabold text-white sm:text-5xl">
            Ready to engineer the <span className="text-cyan">next era</span>?
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-lg text-white/70">
            Tell us about your idea or challenge. We'll help you turn it into something real.
          </p>
          <div className="mt-9 flex flex-wrap items-center justify-center gap-4">
            <Link href="/contact" className="group inline-flex items-center gap-2 rounded-full bg-white px-7 py-3.5 text-sm font-semibold text-navy transition hover:bg-cyan">
              Start a project
              <ArrowRight size={16} className="transition group-hover:translate-x-1" />
            </Link>
            <a href={`mailto:${SITE.email}`} className="inline-flex items-center gap-2 rounded-full border border-white/30 px-7 py-3.5 text-sm font-semibold text-white transition hover:bg-white/10">
              <Mail size={16} /> {SITE.email}
            </a>
          </div>
        </div>
      </Reveal>
    </section>
  );
}