import Link from "next/link";
import { ArrowUpRight, Sparkles } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import type { Job } from "@/lib/db/types";

type PremiumTrainingCardProps = {
  training: Job;
};

export function PremiumTrainingCard({ training }: PremiumTrainingCardProps) {
  return (
    <Card className="h-full border-warn-100">
      <CardContent className="flex h-full flex-col justify-between gap-5">
        <div className="space-y-4">
          <div className="flex flex-wrap items-center gap-2">
            <Badge variant="premium">
              <Sparkles className="h-3.5 w-3.5" />
              Premium Chariow
            </Badge>
            <Badge variant="verified">Verifie</Badge>
          </div>

          <div className="space-y-2">
            <h3 className="text-lg font-semibold text-ink-900">{training.title}</h3>
            <p className="text-sm text-ink-500">{training.description}</p>
          </div>

          <div className="space-y-1 text-sm">
            <p className="font-medium text-ink-900">{training.organization_name}</p>
            <p className="text-ink-500">{training.sector_label}</p>
          </div>
        </div>

        <div className="flex items-center justify-between gap-3 border-t border-ink-100 pt-4">
          <p className="text-sm text-ink-500">Source: {training.source_name}</p>
          <Link
            href={training.external_url ?? "#"}
            className="inline-flex items-center gap-2 text-sm font-medium text-brand-600 hover:text-brand-700"
          >
            Ouvrir
            <ArrowUpRight className="h-4 w-4" />
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}

