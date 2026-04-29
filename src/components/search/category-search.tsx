import Link from "next/link";
import { ArrowRight, LayoutGrid } from "lucide-react";

import type { Category } from "@/lib/constants/categories";
import { cn } from "@/lib/utils";

type CategorySearchProps = {
  categories: Category[];
  selectedSector?: string;
};

export function CategorySearch({ categories, selectedSector }: CategorySearchProps) {
  return (
    <div className="space-y-6">
      <div className="-mx-1 flex flex-wrap gap-2 px-1">
        <Link
          href="/"
          className={cn(
            "inline-flex h-10 items-center gap-1.5 rounded-full border px-4 text-sm font-semibold transition",
            !selectedSector
              ? "border-brand-500 bg-brand-500 text-white shadow-soft"
              : "border-ink-200 bg-white text-ink-800 hover:border-ink-300 hover:bg-ink-50",
          )}
        >
          <LayoutGrid className="h-3.5 w-3.5" />
          Toutes
        </Link>
        {categories.map((category) => (
          <Link
            key={category.slug}
            href={`/?secteur=${category.slug}`}
            className={cn(
              "inline-flex h-10 items-center rounded-full border px-4 text-sm font-semibold transition",
              selectedSector === category.slug
                ? "border-brand-500 bg-brand-500 text-white shadow-soft"
                : "border-ink-200 bg-white text-ink-800 hover:border-ink-300 hover:bg-ink-50",
            )}
          >
            {category.label}
          </Link>
        ))}
      </div>

      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
        {categories.map((category) => (
          <Link
            key={category.slug}
            href={`/opportunites?secteur=${category.slug}`}
            className="group relative overflow-hidden rounded-2xl border border-ink-100 bg-white p-5 transition hover:-translate-y-0.5 hover:border-brand-200 hover:shadow-soft"
          >
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -right-8 -top-8 h-24 w-24 rounded-full bg-brand-50/0 transition-colors duration-300 group-hover:bg-brand-50"
            />
            <div className="relative flex items-start justify-between gap-3">
              <div className="space-y-1">
                <p className="font-display font-semibold text-ink-900 transition-colors group-hover:text-brand-700">
                  {category.label}
                </p>
                <p className="text-sm leading-relaxed text-ink-600">{category.description}</p>
              </div>
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-ink-100 text-ink-700 transition group-hover:bg-brand-500 group-hover:text-white">
                <ArrowRight className="h-3.5 w-3.5" />
              </span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
