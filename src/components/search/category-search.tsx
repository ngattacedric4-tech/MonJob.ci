import Link from "next/link";
import { ArrowRight } from "lucide-react";

import type { Category } from "@/lib/constants/categories";
import { cn } from "@/lib/utils";

type CategorySearchProps = {
  categories: Category[];
  selectedSector?: string;
};

export function CategorySearch({ categories, selectedSector }: CategorySearchProps) {
  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-2">
        <Link
          href="/"
          className={cn(
            "inline-flex h-10 items-center rounded-lg border px-3 text-sm font-medium transition",
            !selectedSector
              ? "border-brand-500 bg-brand-50 text-brand-700"
              : "border-ink-200 text-ink-700 hover:border-ink-300",
          )}
        >
          Toutes les categories
        </Link>
        {categories.map((category) => (
          <Link
            key={category.slug}
            href={`/?secteur=${category.slug}`}
            className={cn(
              "inline-flex h-10 items-center rounded-lg border px-3 text-sm font-medium transition",
              selectedSector === category.slug
                ? "border-brand-500 bg-brand-50 text-brand-700"
                : "border-ink-200 text-ink-700 hover:border-ink-300",
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
            className="rounded-lg border border-ink-100 bg-white p-4 transition hover:border-brand-200 hover:bg-brand-50/40"
          >
            <div className="flex items-start justify-between gap-3">
              <div className="space-y-1">
                <p className="font-medium text-ink-900">{category.label}</p>
                <p className="text-sm text-ink-500">{category.description}</p>
              </div>
              <ArrowRight className="mt-1 h-4 w-4 text-ink-400" />
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

