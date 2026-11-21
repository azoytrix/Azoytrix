
import Reveal from "@/components/ui/Reveal";
import { FALLBACK_HOMEPAGE, type BrandStatementContent } from "@/lib/homepage";

export default function BrandStatement({
  content = FALLBACK_HOMEPAGE.brandStatement,
}: {
  content?: BrandStatementContent;
}) {
  const capabilities = content.capabilities;

  return (
    <section className="relative isolate overflow-hidden bg-white py-28 sm:py-36">
      {/* Background details */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(30,111,217,0.035)_1px,transparent_1px),linear-gradient(to_bottom,rgba(30,111,217,0.035)_1px,transparent_1px)] bg-size-[64px_64px]" />

        <div className="absolute left-1/2 top-1/2 h-105 w-105 -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-100/40 blur-[120px]" />

        <div className="absolute -right-32 top-0 h-80 w-80 rounded-full bg-cyan-100/30 blur-[100px]" />
      </div>

      <Reveal className="mx-auto max-w-6xl px-5 sm:px-8">
        <div className="mx-auto max-w-5xl text-center">

          {/* Eyebrow */}
          <div className="mb-8 flex items-center justify-center gap-3">
            <span className="h-px w-8 bg-brand/50" />
            <span className="text-[11px] font-bold uppercase tracking-[0.3em] text-brand">
              {content.eyebrow}
            </span>
            <span className="h-px w-8 bg-brand/50" />
          </div>

          {/* Main statement */}
          <h2 className="font-display text-3xl font-semibold leading-[1.25] tracking-tight text-navy sm:text-5xl lg:text-[3.65rem]">
            {content.headingStart}{" "}
            <span className="relative inline-block">
              <span className="text-gradient">
                {content.headingHighlight}
              </span>
            </span>
          </h2>

          {/* Description */}
          <p className="mx-auto mt-8 max-w-3xl text-base leading-8 text-slate-500 sm:text-lg sm:leading-9">
            {content.descriptionStart}{" "}
            <span className="font-semibold text-navy">
              {content.descriptionHighlight}
            </span>{" "}
            {content.descriptionEnd}
          </p>

          {/* Capabilities */}
          <div className="mt-12 flex flex-wrap items-center justify-center gap-3">
            {capabilities.map((item, index) => (
              <div
                key={`${item}-${index}`}
                className="group flex items-center gap-2.5 rounded-full border border-slate-200/80 bg-white/80 px-5 py-3 shadow-[0_4px_20px_rgba(15,35,70,0.035)] backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-brand/30 hover:shadow-[0_10px_30px_rgba(30,111,217,0.09)]"
              >
                <span className="h-1.5 w-1.5 rounded-full bg-brand transition-transform duration-300 group-hover:scale-150" />
                <span className="text-xs font-semibold tracking-wide text-slate-600 sm:text-sm">
                  {item}
                </span>
              </div>
            ))}
          </div>

          {/* Bottom accent */}
          <div className="mx-auto mt-16 h-px w-24 bg-linear-to-r from-transparent via-brand/50 to-transparent" />
        </div>
      </Reveal>
    </section>
  );
}
