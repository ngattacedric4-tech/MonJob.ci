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
    <div className="mx-auto max-w-6xl space-y-8 px-4 py-10 sm:space-y-10 sm:px-6 sm:py-12 lg:py-16">
      <SectionHeading
        eyebrow="Catalogue"
        title="Toutes les opportunités"
        description="Emplois et stages chargés directement depuis les sites suivis par le scraping, sans données fictives."
      />
      <CategorySearch categories={availableCategories} selectedSector={selectedSector} />
      <JobList jobs={jobs} />
    </div>
  );
}
