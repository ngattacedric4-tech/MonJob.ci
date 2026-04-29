import Link from "next/link";
import {
  ArrowRight,
  CheckCircle2,
  Radio,
  Search,
  ShieldCheck,
  Sparkles,
  TrendingUp,
} from "lucide-react";

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
  const selectedCategory = availableCategories.find(
    (category) => category.slug === selectedSector,
  );

  return (
    <div className="space-y-20 pb-20">
      {/* HERO */}
      <section className="relative overflow-hidden border-b border-ink-100 bg-gradient-to-b from-white via-cream to-cream">
        {/* Decorative pattern */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-grid-pattern opacity-60 [background-size:24px_24px]"
        />
        {/* Decorative blobs */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-32 top-10 h-72 w-72 rounded-full bg-brand-100/50 blur-3xl"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -left-20 bottom-0 h-64 w-64 rounded-full bg-accent-100/40 blur-3xl"
        />

        <div className="relative mx-auto grid max-w-6xl gap-12 px-4 py-16 sm:px-6 lg:grid-cols-[1.15fr_0.85fr] lg:items-center lg:py-24">
          <div className="space-y-7">
            <div className="inline-flex items-center gap-2 rounded-full border border-brand-100 bg-white/80 px-3 py-1.5 text-xs font-semibold text-brand-700 shadow-soft backdrop-blur">
              <Radio className="h-3.5 w-3.5 live-dot" />
              <span className="-ml-1">Flux live depuis 4 sources verifiees</span>
            </div>

            <div className="space-y-5">
              <h1 className="font-display text-4xl font-bold leading-[1.05] tracking-tight text-ink-900 text-balance sm:text-5xl lg:text-[3.5rem]">
                Trouve ton prochain job en{" "}
                <span className="relative inline-block">
                  <span className="relative z-10 text-brand-600">Cote d&#39;Ivoire</span>
                  <span
                    aria-hidden="true"
                    className="absolute inset-x-0 bottom-1 h-3 bg-accent-100/80"
                  />
                </span>
              </h1>
              <p className="max-w-xl text-lg leading-relaxed text-ink-500 text-pretty">
                Emplois, stages et formations remontes en direct depuis Emploi.ci, Stage.ci,
                Educarriere et Novojob. Aucune offre inventee, que du reel.
              </p>
            </div>

            {/* Search bar */}
            <form
              action="/opportunites"
              className="flex w-full max-w-xl flex-col gap-2 rounded-2xl border border-ink-100 bg-white p-2 shadow-soft sm:flex-row sm:items-center"
            >
              <label className="flex flex-1 items-center gap-2 px-3">
                <Search className="h-4 w-4 shrink-0 text-ink-400" aria-hidden="true" />
                <input
                  type="search"
                  name="q"
                  placeholder="Developpeur, comptable, marketing..."
                  className="h-10 w-full bg-transparent text-sm text-ink-900 placeholder:text-ink-400 focus:outline-none"
                  aria-label="Rechercher une opportunite"
                />
              </label>
              <button
                type="submit"
                className="inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-brand-500 px-5 text-sm font-semibold text-white shadow-soft transition hover:bg-brand-600"
              >
                Rechercher
                <ArrowRight className="h-4 w-4" />
              </button>
            </form>

            <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-ink-500">
              <span className="inline-flex items-center gap-1.5">
                <CheckCircle2 className="h-4 w-4 text-brand-500" />
                Sources verifiees
              </span>
              <span className="inline-flex items-center gap-1.5">
                <CheckCircle2 className="h-4 w-4 text-brand-500" />
                Mobile-first
              </span>
              <span className="inline-flex items-center gap-1.5">
                <CheckCircle2 className="h-4 w-4 text-brand-500" />
                Sans donnees inventees
              </span>
            </div>
          </div>

          {/* Hero stats card */}
          <div className="relative">
            <div className="absolute -inset-2 -z-10 rounded-3xl bg-gradient-to-br from-brand-500/20 via-brand-500/5 to-accent-500/20 blur-2xl" />
            <div className="relative overflow-hidden rounded-2xl border border-ink-100 bg-ink-900 p-7 text-cream shadow-elevated">
              <div
                aria-hidden="true"
                className="pointer-events-none absolute -right-12 -top-12 h-40 w-40 rounded-full bg-brand-500/30 blur-2xl"
              />
              <div
                aria-hidden="true"
                className="pointer-events-none absolute -bottom-16 -left-12 h-40 w-40 rounded-full bg-accent-500/20 blur-2xl"
              />

              <div className="relative space-y-6">
                <div className="flex items-center justify-between">
                  <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-xs font-medium text-cream/90 ring-1 ring-inset ring-white/20">
                    <TrendingUp className="h-3.5 w-3.5 text-accent-500" />
                    En direct
                  </div>
                  <ShieldCheck className="h-5 w-5 text-brand-200" />
                </div>

                <div className="grid gap-3 sm:grid-cols-2">
                  <div className="rounded-xl bg-white/[0.07] p-4 ring-1 ring-inset ring-white/10">
                    <p className="text-xs font-medium uppercase tracking-wider text-cream/60">
                      Categories
                    </p>
                    <p className="mt-2 font-display text-3xl font-bold text-cream">
                      {availableCategories.length}
                    </p>
                  </div>
                  <div className="rounded-xl bg-white/[0.07] p-4 ring-1 ring-inset ring-white/10">
                    <p className="text-xs font-medium uppercase tracking-wider text-cream/60">
                      Formations
                    </p>
                    <p className="mt-2 font-display text-3xl font-bold text-cream">
                      {premiumTrainings.length}
                    </p>
                  </div>
                  <div className="rounded-xl bg-white/[0.07] p-4 ring-1 ring-inset ring-white/10 sm:col-span-2">
                    <p className="text-xs font-medium uppercase tracking-wider text-cream/60">
                      Sources prioritaires
                    </p>
                    <div className="mt-3 flex flex-wrap gap-1.5">
                      {["Emploi.ci", "Stage.ci", "Educarriere", "Novojob"].map((source) => (
                        <span
                          key={source}
                          className="rounded-full bg-white/10 px-2.5 py-1 text-xs font-medium text-cream/90"
                        >
                          {source}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2 pt-1">
                  <Link
                    href="/opportunites"
                    className="inline-flex h-10 flex-1 items-center justify-center gap-2 rounded-lg bg-cream px-4 text-sm font-semibold text-ink-900 transition hover:bg-white"
                  >
                    Voir les opportunites
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                  <Link
                    href="/formations-premium"
                    className="inline-flex h-10 flex-1 items-center justify-center gap-2 rounded-lg bg-white/10 px-4 text-sm font-semibold text-cream ring-1 ring-inset ring-white/20 transition hover:bg-white/15"
                  >
                    <Sparkles className="h-4 w-4" />
                    Formations
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CATEGORIES */}
      <section className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeading
          eyebrow="Recherche par categorie"
          title="Trouver vite, depuis le mobile"
          description="Les categories sont derivees des donnees reelles collectees en avril 2026 pour rester proches du marche local."
        />
        <div className="mt-8">
          <CategorySearch categories={availableCategories} selectedSector={selectedSector} />
        </div>
      </section>

      {/* FEATURED JOBS */}
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
        <div className="mt-8">
          <JobList jobs={featuredJobs} />
        </div>
      </section>

      {/* LATEST */}
      <section className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="flex items-end justify-between gap-4">
          <SectionHeading
            eyebrow="Flux live"
            title="Dernieres offres remontees"
            description="Ce bloc affiche le flux recent agrege depuis Emploi.ci, Stage.ci, Educarriere et Novojob."
          />
          <Link
            href="/opportunites"
            className="hidden shrink-0 items-center gap-1.5 rounded-full border border-ink-200 bg-white px-4 py-2 text-sm font-medium text-ink-700 transition hover:border-ink-300 hover:text-ink-900 sm:inline-flex"
          >
            Tout voir
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>
        <div className="mt-8">
          <JobList
            jobs={latestJobs}
            emptyTitle="Aucune offre live pour le moment."
            emptyDescription="Le scraping n'a remonte aucune offre a cet instant. Reessaie dans quelques minutes."
          />
        </div>
      </section>

      {/* PREMIUM TRAININGS */}
      <section className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeading
          eyebrow="Formations premium"
          title="Chariow, filtre net et utile"
          description="Cette section reste separee du scraping et ne remonte que des boutiques Chariow reelles et verifiees."
        />
        <div className="mt-8">
          {premiumTrainings.length ? (
            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              {premiumTrainings.map((training) => (
                <PremiumTrainingCard key={training.id} training={training} />
              ))}
            </div>
          ) : (
            <Card className="border-accent-100 bg-gradient-to-br from-white to-accent-50/40">
              <CardContent className="flex flex-col gap-4 py-2 text-sm text-ink-600 md:flex-row md:items-center md:justify-between">
                <div className="flex items-start gap-4">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-accent-100 text-accent-700">
                    <Sparkles className="h-5 w-5" />
                  </span>
                  <div className="space-y-1">
                    <p className="font-display font-semibold text-ink-900">
                      Aucune boutique Chariow verifiee pour le moment.
                    </p>
                    <p className="text-ink-500">
                      On a retire les liens fictifs. La section s&#39;affichera des qu&#39;une vraie
                      boutique aura ete soumise et validee.
                    </p>
                  </div>
                </div>
                <Link
                  href="/recruteur/offres/chariow"
                  className="inline-flex h-11 shrink-0 items-center justify-center gap-2 rounded-lg bg-ink-900 px-4 text-sm font-medium text-cream transition hover:bg-ink-700"
                >
                  Soumettre une vraie boutique
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </CardContent>
            </Card>
          )}
        </div>
      </section>

      {/* TRUST CTA */}
      <section className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="relative overflow-hidden rounded-3xl border border-ink-100 bg-gradient-to-br from-brand-500 via-brand-600 to-brand-700 p-8 text-white shadow-elevated sm:p-12">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-accent-500/30 blur-3xl"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -bottom-16 -left-16 h-56 w-56 rounded-full bg-white/10 blur-3xl"
          />
          <div className="relative grid gap-8 lg:grid-cols-[1.5fr_1fr] lg:items-center">
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 rounded-full bg-white/15 px-3 py-1 text-xs font-medium text-white ring-1 ring-inset ring-white/20">
                <ShieldCheck className="h-3.5 w-3.5" />
                Pour les recruteurs
              </div>
              <h2 className="font-display text-3xl font-bold leading-tight text-white text-balance sm:text-4xl">
                Publie une vraie offre, touche les bons profils.
              </h2>
              <p className="max-w-xl text-base leading-relaxed text-white/85">
                MonJob.ci agrege uniquement des sources verifiees. Cree ton compte recruteur pour
                publier tes offres directement et apparaitre dans le flux mobile-first.
              </p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row lg:flex-col">
              <Link
                href="/inscription"
                className="inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-cream px-5 text-sm font-semibold text-ink-900 transition hover:bg-white"
              >
                Creer un compte recruteur
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/recruteur/offres"
                className="inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-white/10 px-5 text-sm font-semibold text-white ring-1 ring-inset ring-white/20 transition hover:bg-white/15"
              >
                Voir les offres
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
