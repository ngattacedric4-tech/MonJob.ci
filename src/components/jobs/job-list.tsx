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
  emptyTitle = "Aucune opportunité pour ce filtre.",
  emptyDescription = "Change de catégorie ou publie une nouvelle source pour enrichir la sélection.",
}: JobListProps) {
  if (!jobs.length) {
    return (
      <div className="rounded-2xl border border-dashed border-ink-200 bg-white/70 px-6 py-10 text-center sm:py-12">
        <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-ink-100 text-ink-600">
          <SearchX className="h-5 w-5" />
        </div>
        <p className="font-display text-base font-semibold text-ink-900 sm:text-lg">
          {emptyTitle}
        </p>
        <p className="mx-auto mt-2 max-w-md text-sm leading-relaxed text-ink-600">
          {emptyDescription}
        </p>
      </div>
    );
  }

  return (
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
      {jobs.map((job) => (
        <JobCard key={job.id} job={job} />
      ))}
    </div>
  );
}
