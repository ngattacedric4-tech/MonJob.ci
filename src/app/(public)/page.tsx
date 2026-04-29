import Link from "next/link";
import { ArrowRight, ShieldCheck, Sparkles } from "lucide-react";

import { PremiumTrainingCard } from "@/components/formations/premium-training-card";
import { JobList } from "@/components/jobs/job-list";
import { SectionHeading } from "@/components/layout/section-heading";
import { CategorySearch } from "@/components/search/category-search";
import { Card, CardContent } from "@/components/ui/card";
import { getCategories, getFeaturedJobs, getLatestJobs, getPremiumTrainings } from "@/lib/db/queries";

type HomePageProps = {
  searchParams?: Promise<Record<string, string | string[] | undefined>>;
};

export const dynamic = "force-dynamic";

export default async function HomePage({ searchParams }: HomePageProps) {
  const params = (await searchParams) ?? {};
  const selectedSector = typeof params.secteur === "string" ? params.secteur : undefined;

  const [availableCategories, featuredJobs, latestJobs, premiumTrainings] = await Promise.all([
    getCategories(),
    getFeaturedJobs(selectedSector),
    getLatestJobs(),
    getPremiumTrainings(),
  ]);
  const selectedCategory = availableCategories.find((category) => category.slug === selectedSector);

  return (
    <div className="space-y-16 pb-16">
      <section className="border-b border-ink-100 bg-white">
        <div className="mx-auto grid max-w-6xl gap-10 px-4 py-12 sm:px-6 lg:grid-cols-[1.2fr_0.8fr] lg:items-center lg:py-16">
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 rounded-full bg-success-100 px-3 py-1 text-sm font-medium text-success-700">
              <ShieldCheck className="h-4 w-4" />
              Flux live depuis des sites suivis
            </div>
            <div className="space-y-4">
              <h1 className="max-w-2xl text-4xl font-semibold tracking-tight text-ink-900 sm:text-5xl">
                Opportunites et formations qui collent au terrain ivoirien.
              </h1>
              <p className="max-w-2xl text-base text-ink-500 sm:text-lg">
                Explore les emplois et stages remontes en direct depuis Emploi.ci, Stage.ci,
                Educarriere et Novojob, sans donnees inventees.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Link
                href="/opportunites"
                className="inline-flex h-12 items-center justify-center gap-2 rounded-lg bg-brand-500 px-5 text-base font-medium text-white transition hover:bg-brand-600"
              >
                Voir les opportunites
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/formations-premium"
                className="inline-flex h-12 items-center justify-center gap-2 rounded-lg bg-ink-100 px-5 text-base font-medium text-ink-900 transition hover:bg-ink-200"
              >
                <Sparkles className="h-4 w-4" />
                Formations premium
              </Link>
            </div>
          </div>

          <div className="rounded-lg border border-ink-100 bg-ink-900 p-6 text-white shadow-soft">
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-lg bg-white/10 p-4">
                <p className="text-sm text-white/70">Categories initiales</p>
                <p className="mt-2 text-3xl font-semibold">{availableCategories.length}</p>
              </div>
              <div className="rounded-lg bg-white/10 p-4">
                <p className="text-sm text-white/70">Formations premium</p>
                <p className="mt-2 text-3xl font-semibold">{premiumTrainings.length}</p>
              </div>
              <div className="rounded-lg bg-white/10 p-4 sm:col-span-2">
                <p className="text-sm text-white/70">Sources prioritaires</p>
                <p className="mt-2 text-lg font-medium">
                  Emploi.ci, Stage.ci, Educarriere, Novojob
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeading
          eyebrow="Recherche par categorie"
          title="Trouver vite, depuis le mobile"
          description="Les categories sont derivees des donnees reelles collectees en avril 2026 pour rester proches du marche local."
        />
        <div className="mt-6">
          <CategorySearch categories={availableCategories} selectedSector={selectedSector} />
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeading
          eyebrow="Sources suivies"
          title={
            selectedCategory
              ? `Selection ${selectedCategory.label}`
              : "Offres recuperees en direct"
          }
          description="Chaque carte est chargee depuis les sites suivis dans le scraping, sans donnees fictives."
        />
        <div className="mt-6">
          <JobList jobs={featuredJobs} />
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeading
          eyebrow="Flux live"
          title="Dernieres offres remontees"
          description="Ce bloc affiche le flux recent agrege depuis Emploi.ci, Stage.ci, Educarriere et Novojob."
        />
        <div className="mt-6">
          <JobList
            jobs={latestJobs}
            emptyTitle="Aucune offre live pour le moment."
            emptyDescription="Le scraping n'a remonte aucune offre a cet instant. Reessaie dans quelques minutes."
          />
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeading
          eyebrow="Formations premium"
          title="Chariow, filtre net et utile"
          description="Cette section reste separee du scraping et ne remonte que des boutiques Chariow reelles et verifiees."
        />
        <div className="mt-6">
          {premiumTrainings.length ? (
            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              {premiumTrainings.map((training) => (
                <PremiumTrainingCard key={training.id} training={training} />
              ))}
            </div>
          ) : (
            <Card>
              <CardContent className="flex flex-col gap-4 py-6 text-sm text-ink-600 md:flex-row md:items-center md:justify-between">
                <div className="space-y-1">
                  <p className="font-medium text-ink-900">
                    Aucune boutique Chariow verifiee pour le moment.
                  </p>
                  <p>
                    On a retire les liens fictifs. La section s&#39;affichera des qu&#39;une vraie
                    boutique aura ete soumise et validee.
                  </p>
                </div>
                <Link
                  href="/recruteur/offres/chariow"
                  className="inline-flex h-11 items-center justify-center rounded-lg bg-ink-900 px-4 text-sm font-medium text-white transition hover:bg-ink-700"
                >
                  Soumettre une vraie boutique
                </Link>
              </CardContent>
            </Card>
          )}
        </div>
      </section>
    </div>
  );
}
