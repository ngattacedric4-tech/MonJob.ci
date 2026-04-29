"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { BriefcaseBusiness, Menu, Search, Sparkles, X } from "lucide-react";

import { cn } from "@/lib/utils";

const NAV_LINKS = [
  { href: "/opportunites", label: "Opportunités" },
  { href: "/formations-premium", label: "Formations premium" },
  { href: "/connexion", label: "Connexion" },
];

export function SiteHeader() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();

  // Ferme le menu mobile lors d'une navigation
  useEffect(() => {
    setIsMenuOpen(false);
  }, [pathname]);

  // Empêche le scroll du body quand le menu mobile est ouvert
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMenuOpen]);

  return (
    <header className="sticky top-0 z-40 border-b border-ink-100/80 bg-cream/90 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 py-3 sm:gap-4 sm:px-6 sm:py-4">
        <Link href="/" className="group flex items-center gap-2.5 sm:gap-3">
          <span className="relative flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-brand-500 to-brand-700 text-white shadow-soft transition-transform group-hover:scale-105 sm:h-10 sm:w-10">
            <BriefcaseBusiness className="h-4 w-4 sm:h-5 sm:w-5" />
            <span className="absolute -right-0.5 -top-0.5 h-2.5 w-2.5 rounded-full bg-accent-500 ring-2 ring-cream" />
          </span>
          <div className="space-y-0.5">
            <p className="font-display text-base font-bold tracking-tight text-ink-900">
              MonJob<span className="text-brand-600">.ci</span>
            </p>
            <p className="hidden text-xs text-ink-600 sm:block">
              Opportunités vérifiées en Côte d&apos;Ivoire
            </p>
          </div>
        </Link>

        {/* Navigation desktop */}
        <nav className="hidden items-center gap-1 md:flex">
          {NAV_LINKS.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "rounded-lg px-3 py-2 text-sm font-medium transition",
                  isActive
                    ? "bg-brand-50 text-brand-700"
                    : "text-ink-700 hover:bg-ink-100/70 hover:text-ink-900",
                )}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        {/* Actions desktop */}
        <div className="hidden items-center gap-2 md:flex">
          <Link
            href="/opportunites"
            className="inline-flex h-10 items-center gap-2 rounded-lg border border-ink-200 bg-white/70 px-3 text-sm font-medium text-ink-700 transition hover:border-ink-300 hover:bg-white hover:text-ink-900"
            aria-label="Rechercher des opportunités"
          >
            <Search className="h-4 w-4" />
            <span className="hidden lg:inline">Rechercher</span>
          </Link>
          <Link
            href="/inscription"
            className="inline-flex h-10 items-center gap-2 rounded-lg bg-ink-900 px-3.5 text-sm font-medium text-cream transition hover:bg-ink-700"
          >
            <Sparkles className="h-4 w-4" />
            <span>Commencer</span>
          </Link>
        </div>

        {/* Bouton menu mobile */}
        <button
          type="button"
          onClick={() => setIsMenuOpen((prev) => !prev)}
          aria-label={isMenuOpen ? "Fermer le menu" : "Ouvrir le menu"}
          aria-expanded={isMenuOpen}
          aria-controls="mobile-menu"
          className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-ink-200 bg-white text-ink-800 transition hover:border-ink-300 hover:text-ink-900 md:hidden"
        >
          {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {/* Menu mobile */}
      {isMenuOpen ? (
        <div
          id="mobile-menu"
          className="border-t border-ink-100 bg-cream md:hidden"
        >
          <nav className="mx-auto flex max-w-6xl flex-col gap-1 px-4 py-4 sm:px-6">
            {NAV_LINKS.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "rounded-lg px-3 py-3 text-base font-medium transition",
                    isActive
                      ? "bg-brand-50 text-brand-700"
                      : "text-ink-800 hover:bg-ink-100",
                  )}
                >
                  {link.label}
                </Link>
              );
            })}
            <div className="mt-2 grid grid-cols-2 gap-2 pt-2">
              <Link
                href="/opportunites"
                className="inline-flex h-11 items-center justify-center gap-2 rounded-lg border border-ink-200 bg-white px-3 text-sm font-medium text-ink-800 transition hover:border-ink-300"
              >
                <Search className="h-4 w-4" />
                Rechercher
              </Link>
              <Link
                href="/inscription"
                className="inline-flex h-11 items-center justify-center gap-2 rounded-lg bg-ink-900 px-3 text-sm font-medium text-cream transition hover:bg-ink-700"
              >
                <Sparkles className="h-4 w-4" />
                Commencer
              </Link>
            </div>
          </nav>
        </div>
      ) : null}
    </header>
  );
}
