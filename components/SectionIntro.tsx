export function SectionIntro({
  eyebrow,
  title,
  text,
  centered = false
}: {
  eyebrow?: string;
  title: string;
  text?: string;
  centered?: boolean;
}) {
  return (
    <div className={`max-w-3xl ${centered ? 'mx-auto text-center' : ''}`}>
      {eyebrow ? <p className="mb-4 text-sm font-semibold uppercase tracking-[0.22em] text-copper">{eyebrow}</p> : null}
      <h2 className="font-serif text-4xl leading-tight text-petroleum md:text-5xl">{title}</h2>
      {text ? <p className="mt-5 text-lg leading-8 text-ink/72">{text}</p> : null}
    </div>
  );
}
