import Link from "next/link";
import { BriefcaseBusiness, Search, ShieldCheck } from "lucide-react";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-ink-100 bg-white/90 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-4 sm:px-6">
        <Link href="/" className="flex items-center gap-3">
          <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-brand-500 text-white">
            <BriefcaseBusiness className="h-5 w-5" />
          </span>
          <div className="space-y-0.5">
            <p className="text-base font-semibold text-ink-900">MonJob.ci</p>
            <p className="text-xs text-ink-500">Opportunites fiables en Cote d&#39;Ivoire</p>
          </div>
        </Link>

        <nav className="hidden items-center gap-5 text-sm text-ink-600 md:flex">
          <Link href="/opportunites" className="hover:text-ink-900">
            Opportunites
          </Link>
          <Link href="/formations-premium" className="hover:text-ink-900">
            Formations premium
          </Link>
          <Link href="/connexion" className="hover:text-ink-900">
            Connexion
          </Link>
        </nav>

        <div className="flex items-center gap-2">
          <Link
            href="/opportunites"
            className="inline-flex h-10 items-center gap-2 rounded-lg border border-ink-200 px-3 text-sm font-medium text-ink-700 transition hover:border-ink-300 hover:text-ink-900"
          >
            <Search className="h-4 w-4" />
            Rechercher
          </Link>
          <Link
            href="/formations-premium"
            className="inline-flex h-10 items-center gap-2 rounded-lg bg-ink-900 px-3 text-sm font-medium text-white transition hover:bg-ink-700"
          >
            <ShieldCheck className="h-4 w-4" />
            Verifie
          </Link>
        </div>
      </div>
    </header>
  );
}
