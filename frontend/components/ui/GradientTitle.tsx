/** Heading text with an optional gradient-highlighted tail, e.g. "Technology that moves your" + "business forward." */
export default function GradientTitle({
  text,
  highlight,
}: {
  text: string;
  highlight?: string;
}) {
  if (!highlight) return <>{text}</>;
  return (
    <>
      {text} <span className="text-gradient">{highlight}</span>
    </>
  );
}
