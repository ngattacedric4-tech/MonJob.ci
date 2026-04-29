type SectionHeadingProps = {
  eyebrow?: string;
  title: string;
  description?: string;
};

export function SectionHeading({ eyebrow, title, description }: SectionHeadingProps) {
  return (
    <div className="space-y-2">
      {eyebrow ? <p className="text-sm font-medium text-brand-600">{eyebrow}</p> : null}
      <div className="space-y-1">
        <h2 className="text-2xl font-semibold text-ink-900">{title}</h2>
        {description ? <p className="max-w-2xl text-sm text-ink-500">{description}</p> : null}
      </div>
    </div>
  );
}

