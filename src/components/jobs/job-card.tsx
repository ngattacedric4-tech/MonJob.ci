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
    <Card className="h-full">
      <CardContent className="flex h-full flex-col justify-between gap-5">
        <div className="space-y-4">
          <div className="flex flex-wrap items-center gap-2">
            <Badge>{formatOpportunityType(job.type)}</Badge>
            {job.is_verified ? (
              <Badge variant="verified">
                <ShieldCheck className="h-3.5 w-3.5" />
                {isLiveSource ? "Source live" : "Verifie"}
              </Badge>
            ) : null}
            {job.is_premium ? <Badge variant="premium">Premium</Badge> : null}
          </div>

          <div className="space-y-2">
            <h3 className="text-lg font-semibold text-ink-900">{job.title}</h3>
            <p className="text-sm text-ink-500">{job.description}</p>
          </div>

          <div className="grid gap-2 text-sm text-ink-600">
            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4 text-ink-400" />
              <span>{job.location_city ?? "Cote d'Ivoire"}</span>
            </div>
            <div className="flex items-center gap-2">
              <CalendarDays className="h-4 w-4 text-ink-400" />
              <span>{job.source_name}</span>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between gap-3 border-t border-ink-100 pt-4">
          <div>
            <p className="text-sm font-medium text-ink-900">{job.sector_label}</p>
            <p className="text-xs text-ink-500">{job.organization_name ?? "Source externe"}</p>
          </div>
          <Link
            href={`/opportunites/${job.slug}`}
            className="inline-flex items-center gap-2 text-sm font-medium text-brand-600 hover:text-brand-700"
          >
            Voir
            <ArrowUpRight className="h-4 w-4" />
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}
