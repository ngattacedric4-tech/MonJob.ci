import { SearchX } from "lucide-react";

import type { Job } from "@/lib/db/types";

import { JobCard } from "@/components/jobs/job-card";

type JobListProps = {
  jobs: Job[];
  emptyTitle?: string;
  emptyDescription?: string;
};

export function JobList({
  jobs,
  emptyTitle = "Aucune opportunite pour ce filtre.",
  emptyDescription = "Change de categorie ou publie une nouvelle source pour enrichir la selection.",
}: JobListProps) {
  if (!jobs.length) {
    return (
      <div className="rounded-2xl border border-dashed border-ink-200 bg-white/60 px-6 py-12 text-center">
        <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-ink-100 text-ink-500">
          <SearchX className="h-5 w-5" />
        </div>
        <p className="font-display text-lg font-semibold text-ink-900">{emptyTitle}</p>
        <p className="mx-auto mt-2 max-w-md text-sm leading-relaxed text-ink-500">
          {emptyDescription}
        </p>
      </div>
    );
  }

  return (
    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
      {jobs.map((job) => (
        <JobCard key={job.id} job={job} />
      ))}
    </div>
  );
}
