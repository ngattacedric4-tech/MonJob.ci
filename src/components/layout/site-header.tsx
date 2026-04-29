import Link from "next/link";
import { BriefcaseBusiness, Search, Sparkles } from "lucide-react";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-ink-100/80 bg-cream/85 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-4 sm:px-6">
        <Link href="/" className="flex items-center gap-3 group">
          <span className="relative flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-brand-500 to-brand-700 text-white shadow-soft transition-transform group-hover:scale-105">
            <BriefcaseBusiness className="h-5 w-5" />
            <span className="absolute -right-0.5 -top-0.5 h-2.5 w-2.5 rounded-full bg-accent-500 ring-2 ring-cream" />
          </span>
          <div className="space-y-0.5">
            <p className="font-display text-base font-bold tracking-tight text-ink-900">
              MonJob<span className="text-brand-500">.ci</span>
            </p>
            <p className="hidden text-xs text-ink-500 sm:block">
              Opportunites verifiees en Cote d&#39;Ivoire
            </p>
          </div>
        </Link>

        <nav className="hidden items-center gap-1 md:flex">
          <Link
            href="/opportunites"
            className="rounded-lg px-3 py-2 text-sm font-medium text-ink-600 transition hover:bg-ink-100/70 hover:text-ink-900"
          >
            Opportunites
          </Link>
          <Link
            href="/formations-premium"
            className="rounded-lg px-3 py-2 text-sm font-medium text-ink-600 transition hover:bg-ink-100/70 hover:text-ink-900"
          >
            Formations premium
          </Link>
          <Link
            href="/connexion"
            className="rounded-lg px-3 py-2 text-sm font-medium text-ink-600 transition hover:bg-ink-100/70 hover:text-ink-900"
          >
            Connexion
          </Link>
        </nav>

        <div className="flex items-center gap-2">
          <Link
            href="/opportunites"
            className="inline-flex h-10 items-center gap-2 rounded-lg border border-ink-200 bg-white/60 px-3 text-sm font-medium text-ink-700 transition hover:border-ink-300 hover:bg-white hover:text-ink-900"
            aria-label="Rechercher des opportunites"
          >
            <Search className="h-4 w-4" />
            <span className="hidden sm:inline">Rechercher</span>
          </Link>
          <Link
            href="/inscription"
            className="inline-flex h-10 items-center gap-2 rounded-lg bg-ink-900 px-3.5 text-sm font-medium text-cream transition hover:bg-ink-700"
          >
            <Sparkles className="h-4 w-4" />
            <span className="hidden sm:inline">Commencer</span>
            <span className="sm:hidden">S&#39;inscrire</span>
          </Link>
        </div>
      </div>
    </header>
  );
}
