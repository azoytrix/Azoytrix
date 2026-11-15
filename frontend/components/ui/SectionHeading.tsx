import Reveal from "./Reveal";

export default function SectionHeading({
  eyebrow,
  title,
  description,
  center = true,
  light = false,
}: {
  eyebrow: string;
  title: React.ReactNode;
  description?: string;
  center?: boolean;
  light?: boolean;
}) {
  return (
    <Reveal className={center ? "mx-auto max-w-3xl text-center" : "max-w-3xl"}>
      <span className="text-xs font-semibold uppercase tracking-[0.25em] text-brand">
        {eyebrow}
      </span>
      <h2
        className={`mt-3 text-3xl font-extrabold sm:text-4xl lg:text-5xl ${
          light ? "text-white" : "text-navy"
        }`}
      >
        {title}
      </h2>
      {description && (
        <p className={`mt-4 text-lg leading-relaxed ${light ? "text-white/70" : "text-muted"}`}>
          {description}
        </p>
      )}
    </Reveal>
  );
}