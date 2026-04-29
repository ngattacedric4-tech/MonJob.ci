import Link from "next/link";
import { BriefcaseBusiness, ShieldCheck } from "lucide-react";

export function SiteFooter() {
  return (
    <footer className="mt-16 border-t border-ink-100 bg-white">
      <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-12">
        <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-[1.4fr_1fr_1fr_1fr] md:gap-10">
          <div className="space-y-4 sm:col-span-2 md:col-span-1">
            <Link href="/" className="flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-brand-500 to-brand-700 text-white">
                <BriefcaseBusiness className="h-5 w-5" />
              </span>
              <span className="font-display text-lg font-bold tracking-tight text-ink-900">
                MonJob<span className="text-brand-600">.ci</span>
              </span>
            </Link>
            <p className="max-w-sm text-sm leading-relaxed text-ink-600">
              MonJob.ci aide à trouver des opportunités vérifiées, utiles et mobile-first en Côte
              d&apos;Ivoire.
            </p>
            <div className="inline-flex items-center gap-2 rounded-full bg-brand-50 px-3 py-1.5 text-xs font-semibold text-brand-700">
              <ShieldCheck className="h-3.5 w-3.5" />
              Sources vérifiées uniquement
            </div>
          </div>

          <div className="space-y-3">
            <p className="font-display text-sm font-semibold text-ink-900">Explorer</p>
            <ul className="space-y-2 text-sm text-ink-600">
              <li>
                <Link href="/opportunites" className="transition hover:text-brand-700">
                  Toutes les opportunités
                </Link>
              </li>
              <li>
                <Link href="/formations-premium" className="transition hover:text-brand-700">
                  Formations premium
                </Link>
              </li>
              <li>
                <Link href="/inscription" className="transition hover:text-brand-700">
                  Créer un compte
                </Link>
              </li>
            </ul>
          </div>

          <div className="space-y-3">
            <p className="font-display text-sm font-semibold text-ink-900">Recruteurs</p>
            <ul className="space-y-2 text-sm text-ink-600">
              <li>
                <Link href="/recruteur/offres" className="transition hover:text-brand-700">
                  Publier une offre
                </Link>
              </li>
              <li>
                <Link href="/recruteur/candidatures" className="transition hover:text-brand-700">
                  Candidatures
                </Link>
              </li>
              <li>
                <Link href="/recruteur/offres/chariow" className="transition hover:text-brand-700">
                  Boutique Chariow
                </Link>
              </li>
            </ul>
          </div>

          <div className="space-y-3">
            <p className="font-display text-sm font-semibold text-ink-900">Sources live</p>
            <ul className="space-y-2 text-sm text-ink-600">
              <li>Emploi.ci</li>
              <li>Stage.ci</li>
              <li>Educarrière</li>
              <li>Novojob</li>
            </ul>
          </div>
        </div>

        <div className="mt-10 flex flex-col items-start justify-between gap-3 border-t border-ink-100 pt-6 text-xs text-ink-500 md:flex-row md:items-center">
          <p>&copy; {new Date().getFullYear()} MonJob.ci. Fait avec soin à Abidjan.</p>
          <p>Aucune donnée inventée. Flux remontés en temps réel.</p>
        </div>
      </div>
    </footer>
  );
}
