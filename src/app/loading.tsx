export default function Loading() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
      <div className="animate-pulse space-y-4">
        <div className="h-8 w-48 rounded bg-ink-100" />
        <div className="h-4 w-full rounded bg-ink-100" />
        <div className="h-4 w-3/4 rounded bg-ink-100" />
      </div>
    </div>
  );
}

