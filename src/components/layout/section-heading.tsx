type SectionHeadingProps = {
  eyebrow?: string;
  title: string;
  description?: string;
};

export function SectionHeading({ eyebrow, title, description }: SectionHeadingProps) {
  return (
    <div className="space-y-3">
      {eyebrow ? (
        <div className="inline-flex items-center gap-2">
          <span className="h-px w-6 bg-brand-500" aria-hidden="true" />
          <p className="text-xs font-semibold uppercase tracking-wider text-brand-700">
            {eyebrow}
          </p>
        </div>
      ) : null}
      <div className="space-y-2">
        <h2 className="font-display text-2xl font-bold tracking-tight text-ink-900 text-balance sm:text-3xl">
          {title}
        </h2>
        {description ? (
          <p className="max-w-2xl text-base leading-relaxed text-ink-500 text-pretty">
            {description}
          </p>
        ) : null}
      </div>
    </div>
  );
}
