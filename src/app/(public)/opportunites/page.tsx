import { SectionHeading } from "@/components/layout/section-heading";
import { CategorySearch } from "@/components/search/category-search";
import { JobList } from "@/components/jobs/job-list";
import { getCategories, getJobs } from "@/lib/db/queries";

type OpportunitiesPageProps = {
  searchParams?: Promise<Record<string, string | string[] | undefined>>;
};

export const dynamic = "force-dynamic";

export default async function OpportunitiesPage({ searchParams }: OpportunitiesPageProps) {
  const params = (await searchParams) ?? {};
  const selectedSector = typeof params.secteur === "string" ? params.secteur : undefined;
  const [availableCategories, jobs] = await Promise.all([
    getCategories(),
    getJobs({ sectorSlug: selectedSector }),
  ]);

  return (
    <div className="mx-auto max-w-6xl space-y-10 px-4 py-12 sm:px-6 lg:py-16">
      <SectionHeading
        eyebrow="Catalogue"
        title="Toutes les opportunites"
        description="Emplois et stages charges directement depuis les sites suivis par le scraping, sans donnees fictives."
      />
      <CategorySearch categories={availableCategories} selectedSector={selectedSector} />
      <JobList jobs={jobs} />
    </div>
  );
}
