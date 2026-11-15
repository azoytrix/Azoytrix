import Reveal from "@/components/ui/Reveal";

export default function BrandStatement() {
  return (
    <section className="bg-white py-24 sm:py-32">
      <Reveal className="mx-auto max-w-4xl px-5 text-center sm:px-8">
        <span className="text-xs font-semibold uppercase tracking-[0.25em] text-brand">
          Who we are
        </span>
        <p className="mt-6 font-display text-2xl font-semibold leading-snug text-navy sm:text-4xl">
          Azoytrix is a technology company that blends{" "}
          <span className="text-gradient">software, artificial intelligence and cloud</span>{" "}
          to help organisations build what comes next.
        </p>
      </Reveal>
    </section>
  );
}