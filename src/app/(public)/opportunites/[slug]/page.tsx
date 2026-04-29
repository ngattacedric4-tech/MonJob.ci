import Link from "next/link";
import { ArrowLeft, ArrowUpRight, Building2, MapPin, ShieldCheck } from "lucide-react";
import { notFound } from "next/navigation";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getJobBySlug } from "@/lib/db/queries";
import { formatOpportunityType } from "@/lib/utils";

type JobDetailPageProps = {
  params: Promise<{ slug: string }>;
};

export const dynamic = "force-dynamic";

export default async function JobDetailPage({ params }: JobDetailPageProps) {
  const { slug } = await params;
  const job = await getJobBySlug(slug);

  if (!job) {
    notFound();
  }

  const isLiveSource = job.id.startsWith("scraped-");

  return (
    <div className="mx-auto max-w-4xl space-y-8 px-4 py-10 sm:px-6">
      <Link href="/opportunites" className="inline-flex items-center gap-2 text-sm text-ink-600">
        <ArrowLeft className="h-4 w-4" />
        Retour aux opportunites
      </Link>

      <section className="rounded-lg border border-ink-100 bg-white p-6 shadow-soft">
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

        <div className="mt-5 space-y-4">
          <div>
            <h1 className="text-3xl font-semibold text-ink-900">{job.title}</h1>
            <p className="mt-2 text-base text-ink-500">{job.description}</p>
          </div>

          <div className="grid gap-3 text-sm text-ink-600 sm:grid-cols-2">
            <div className="flex items-center gap-2">
              <Building2 className="h-4 w-4 text-ink-400" />
              <span>{job.organization_name ?? job.source_name}</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4 text-ink-400" />
              <span>{job.location_city ?? "Cote d'Ivoire"}</span>
            </div>
          </div>
        </div>
      </section>

      <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
        <Card>
          <CardHeader>
            <CardTitle>Ce que le schema couvre deja</CardTitle>
          </CardHeader>
          <CardContent className="text-sm text-ink-600">
            <ul className="space-y-2">
              <li>Type d opportunite, secteur, source et lien externe.</li>
              <li>Badge live pour les annonces recuperees directement depuis les sites sources.</li>
              <li>Possibilite de suivre les candidatures internes dans `applications`.</li>
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Action rapide</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm text-ink-600">
              Pour un agregat de sources, le trafic final peut partir vers le lien d origine ou
              vers un parcours de candidature interne selon la source.
            </p>
            <Link
              href={job.external_url ?? "#"}
              className="inline-flex h-11 items-center gap-2 rounded-lg bg-brand-500 px-4 text-sm font-medium text-white"
            >
              Voir la source
              <ArrowUpRight className="h-4 w-4" />
            </Link>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
