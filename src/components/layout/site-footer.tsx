import Link from "next/link";
import { BriefcaseBusiness, ShieldCheck } from "lucide-react";

export function SiteFooter() {
  return (
    <footer className="mt-16 border-t border-ink-100 bg-white">
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
        <div className="grid gap-10 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div className="space-y-4">
            <Link href="/" className="flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-brand-500 to-brand-700 text-white">
                <BriefcaseBusiness className="h-5 w-5" />
              </span>
              <span className="font-display text-lg font-bold tracking-tight text-ink-900">
                MonJob<span className="text-brand-500">.ci</span>
              </span>
            </Link>
            <p className="max-w-sm text-sm leading-relaxed text-ink-500">
              MonJob.ci aide a trouver des opportunites verifiees, utiles et mobile-first en Cote
              d&#39;Ivoire.
            </p>
            <div className="inline-flex items-center gap-2 rounded-full bg-brand-50 px-3 py-1.5 text-xs font-medium text-brand-700">
              <ShieldCheck className="h-3.5 w-3.5" />
              Sources verifiees uniquement
            </div>
          </div>

          <div className="space-y-3">
            <p className="font-display text-sm font-semibold text-ink-900">Explorer</p>
            <ul className="space-y-2 text-sm text-ink-500">
              <li>
                <Link href="/opportunites" className="transition hover:text-ink-900">
                  Toutes les opportunites
                </Link>
              </li>
              <li>
                <Link href="/formations-premium" className="transition hover:text-ink-900">
                  Formations premium
                </Link>
              </li>
              <li>
                <Link href="/inscription" className="transition hover:text-ink-900">
                  Creer un compte
                </Link>
              </li>
            </ul>
          </div>

          <div className="space-y-3">
            <p className="font-display text-sm font-semibold text-ink-900">Recruteurs</p>
            <ul className="space-y-2 text-sm text-ink-500">
              <li>
                <Link href="/recruteur/offres" className="transition hover:text-ink-900">
                  Publier une offre
                </Link>
              </li>
              <li>
                <Link href="/recruteur/candidatures" className="transition hover:text-ink-900">
                  Candidatures
                </Link>
              </li>
              <li>
                <Link href="/recruteur/offres/chariow" className="transition hover:text-ink-900">
                  Boutique Chariow
                </Link>
              </li>
            </ul>
          </div>

          <div className="space-y-3">
            <p className="font-display text-sm font-semibold text-ink-900">Sources live</p>
            <ul className="space-y-2 text-sm text-ink-500">
              <li>Emploi.ci</li>
              <li>Stage.ci</li>
              <li>Educarriere</li>
              <li>Novojob</li>
            </ul>
          </div>
        </div>

        <div className="mt-10 flex flex-col items-start justify-between gap-3 border-t border-ink-100 pt-6 text-xs text-ink-400 md:flex-row md:items-center">
          <p>&copy; {new Date().getFullYear()} MonJob.ci. Fait avec soin a Abidjan.</p>
          <p>Aucune donnee inventee. Flux remontes en temps reel.</p>
        </div>
      </div>
    </footer>
  );
}
