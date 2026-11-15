import Counter from "@/components/ui/Counter";
import { STATS } from "@/lib/data";

export default function Stats() {
  return (
    <section className="bg-navy py-20">
      <div className="mx-auto grid max-w-7xl grid-cols-2 gap-10 px-5 sm:px-8 lg:grid-cols-4">
        {STATS.map((s) => (
          <div key={s.label} className="text-center">
            <div className="font-display text-5xl font-extrabold text-white">
              <Counter to={s.value} suffix={s.suffix} />
            </div>
            <p className="mt-2 text-sm tracking-wide text-cyan">{s.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
}