import Link from "next/link";
import { ArrowUpRight, ShieldCheck, Sparkles } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import type { Job } from "@/lib/db/types";

type PremiumTrainingCardProps = {
  training: Job;
};

export function PremiumTrainingCard({ training }: PremiumTrainingCardProps) {
  return (
    <Card className="group relative h-full overflow-hidden border-accent-100 bg-gradient-to-br from-white via-white to-accent-50/40 transition hover:shadow-elevated">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full bg-accent-100/40 blur-2xl"
      />
      <CardContent className="relative flex h-full flex-col justify-between gap-5">
        <div className="space-y-4">
          <div className="flex flex-wrap items-center gap-2">
            <Badge variant="premium">
              <Sparkles className="h-3.5 w-3.5" />
              Premium Chariow
            </Badge>
            <Badge variant="verified">
              <ShieldCheck className="h-3.5 w-3.5" />
              Verifie
            </Badge>
          </div>

          <div className="space-y-2">
            <h3 className="font-display text-lg font-semibold leading-snug text-ink-900">
              {training.title}
            </h3>
            <p className="line-clamp-3 text-sm leading-relaxed text-ink-500">
              {training.description}
            </p>
          </div>

          <div className="space-y-1 text-sm">
            <p className="font-medium text-ink-900">{training.organization_name}</p>
            <p className="text-ink-500">{training.sector_label}</p>
          </div>
        </div>

        <div className="flex items-center justify-between gap-3 border-t border-accent-100/70 pt-4">
          <p className="truncate text-xs uppercase tracking-wider text-ink-400">
            Source: {training.source_name}
          </p>
          <Link
            href={training.external_url ?? "#"}
            className="inline-flex items-center gap-1.5 rounded-full bg-ink-900 px-3 py-1.5 text-xs font-medium text-cream transition hover:bg-ink-700"
          >
            Ouvrir
            <ArrowUpRight className="h-3.5 w-3.5" />
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}
