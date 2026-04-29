import Link from "next/link";
import { ArrowUpRight, CalendarDays, MapPin, ShieldCheck } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import type { Job } from "@/lib/db/types";
import { formatOpportunityType } from "@/lib/utils";

type JobCardProps = {
  job: Job;
};

export function JobCard({ job }: JobCardProps) {
  const isLiveSource = job.id.startsWith("scraped-");

  return (
    <Link
      href={`/opportunites/${job.slug}`}
      className="group block h-full rounded-2xl focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-500/40 focus-visible:ring-offset-2 focus-visible:ring-offset-cream"
    >
      <Card className="relative h-full overflow-hidden hover:border-brand-200 hover:shadow-elevated group-hover:-translate-y-0.5">
        {/* Decorative corner accent */}
        <div className="pointer-events-none absolute -right-12 -top-12 h-32 w-32 rounded-full bg-brand-50/0 transition-colors duration-300 group-hover:bg-brand-50/60" />

        <CardContent className="relative flex h-full flex-col justify-between gap-5">
          <div className="space-y-4">
            <div className="flex flex-wrap items-center gap-2">
              <Badge variant="muted">{formatOpportunityType(job.type)}</Badge>
              {job.is_verified ? (
                isLiveSource ? (
                  <Badge variant="live" className="live-dot">
                    Source live
                  </Badge>
                ) : (
                  <Badge variant="verified">
                    <ShieldCheck className="h-3.5 w-3.5" />
                    Vérifié
                  </Badge>
                )
              ) : null}
              {job.is_premium ? <Badge variant="premium">Premium</Badge> : null}
            </div>

            <div className="space-y-2">
              <h3 className="font-display text-base font-semibold leading-snug text-ink-900 transition-colors group-hover:text-brand-700 sm:text-lg">
                {job.title}
              </h3>
              <p className="line-clamp-3 text-sm leading-relaxed text-ink-600">
                {job.description}
              </p>
            </div>

            <div className="grid gap-1.5 text-sm text-ink-700">
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4 shrink-0 text-ink-500" />
                <span className="truncate">{job.location_city ?? "Côte d'Ivoire"}</span>
              </div>
              <div className="flex items-center gap-2">
                <CalendarDays className="h-4 w-4 shrink-0 text-ink-500" />
                <span className="truncate">{job.source_name}</span>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between gap-3 border-t border-ink-100 pt-4">
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-medium text-ink-900">{job.sector_label}</p>
              <p className="truncate text-xs text-ink-600">
                {job.organization_name ?? "Source externe"}
              </p>
            </div>
            <span className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-ink-100 text-ink-700 transition group-hover:bg-brand-500 group-hover:text-white">
              <ArrowUpRight className="h-4 w-4" />
            </span>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
