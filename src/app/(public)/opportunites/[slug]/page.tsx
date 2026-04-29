import Link from "next/link";
import { ArrowLeft, ArrowUpRight, Building2, Mail, MapPin, ShieldCheck } from "lucide-react";
import { notFound } from "next/navigation";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getJobBySlug } from "@/lib/db/queries";
import {
  buildApplyMailto,
  extractApplyEmail,
  formatOpportunityType,
} from "@/lib/utils";

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

  // Cherche un email dans la description ou le nom de l'organisation
  const applyEmail = extractApplyEmail(job.description, job.organization_name);
  const mailtoUrl = applyEmail
    ? buildApplyMailto({
        email: applyEmail,
        jobTitle: job.title,
        organizationName: job.organization_name,
        sourceName: job.source_name,
      })
    : null;

  return (
    <div className="mx-auto max-w-4xl space-y-6 px-4 py-8 sm:space-y-8 sm:px-6 sm:py-10">
      <Link
        href="/opportunites"
        className="inline-flex items-center gap-2 text-sm font-medium text-ink-600 transition hover:text-ink-900"
      >
        <ArrowLeft className="h-4 w-4" />
        Retour aux opportunités
      </Link>

      <section className="rounded-2xl border border-ink-100 bg-white p-5 shadow-soft sm:p-6">
        <div className="flex flex-wrap items-center gap-2">
          <Badge>{formatOpportunityType(job.type)}</Badge>
          {job.is_verified ? (
            <Badge variant="verified">
              <ShieldCheck className="h-3.5 w-3.5" />
              {isLiveSource ? "Source live" : "Vérifié"}
            </Badge>
          ) : null}
          {job.is_premium ? <Badge variant="premium">Premium</Badge> : null}
        </div>

        <div className="mt-5 space-y-4">
          <div>
            <h1 className="font-display text-2xl font-bold leading-tight text-ink-900 text-balance sm:text-3xl">
              {job.title}
            </h1>
            <p className="mt-3 text-base leading-relaxed text-ink-600 text-pretty">
              {job.description}
            </p>
          </div>

          <div className="grid gap-3 text-sm text-ink-700 sm:grid-cols-2">
            <div className="flex items-center gap-2">
              <Building2 className="h-4 w-4 shrink-0 text-ink-500" />
              <span className="truncate">{job.organization_name ?? job.source_name}</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4 shrink-0 text-ink-500" />
              <span className="truncate">{job.location_city ?? "Côte d'Ivoire"}</span>
            </div>
          </div>
        </div>
      </section>

      <div className="grid gap-5 lg:grid-cols-[1.1fr_0.9fr] lg:gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Ce que couvre cette annonce</CardTitle>
          </CardHeader>
          <CardContent className="text-sm text-ink-700">
            <ul className="space-y-2.5">
              <li className="flex gap-2">
                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-500" />
                <span>Type d&apos;opportunité, secteur, source et lien externe.</span>
              </li>
              <li className="flex gap-2">
                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-500" />
                <span>
                  Badge live pour les annonces récupérées directement depuis les sites sources.
                </span>
              </li>
              <li className="flex gap-2">
                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-500" />
                <span>Suivi des candidatures internes pour les recruteurs inscrits.</span>
              </li>
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Postuler à cette offre</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {mailtoUrl ? (
              <>
                <p className="text-sm leading-relaxed text-ink-600">
                  Envoie ta candidature directement par email à l&apos;adresse indiquée dans
                  l&apos;annonce. Le sujet et un modèle de message sont déjà pré-remplis.
                </p>
                <a
                  href={mailtoUrl}
                  className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-brand-500 px-4 text-sm font-semibold text-white shadow-soft transition hover:bg-brand-600 sm:w-auto"
                >
                  <Mail className="h-4 w-4" />
                  Postuler par email
                </a>
                <p className="break-all text-xs text-ink-500">
                  Adresse détectée :{" "}
                  <span className="font-medium text-ink-700">{applyEmail}</span>
                </p>
                {job.external_url ? (
                  <Link
                    href={job.external_url}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="inline-flex items-center gap-1.5 text-xs font-medium text-ink-600 transition hover:text-ink-900"
                  >
                    Voir l&apos;annonce complète
                    <ArrowUpRight className="h-3.5 w-3.5" />
                  </Link>
                ) : null}
              </>
            ) : (
              <>
                <p className="text-sm leading-relaxed text-ink-600">
                  Aucun email de candidature n&apos;est précisé dans cette annonce. Ouvre la
                  page d&apos;origine pour découvrir les modalités exactes pour postuler.
                </p>
                <Link
                  href={job.external_url ?? "#"}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-brand-500 px-4 text-sm font-semibold text-white shadow-soft transition hover:bg-brand-600 sm:w-auto"
                >
                  Voir l&apos;offre complète
                  <ArrowUpRight className="h-4 w-4" />
                </Link>
              </>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
