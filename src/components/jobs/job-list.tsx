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
      <div className="rounded-lg border border-dashed border-ink-200 bg-white p-8 text-center">
        <p className="text-lg font-semibold text-ink-900">{emptyTitle}</p>
        <p className="mt-2 text-sm text-ink-500">{emptyDescription}</p>
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

