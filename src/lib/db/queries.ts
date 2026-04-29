import { categories } from "@/lib/constants/categories";
import type { Job, OpportunityType } from "@/lib/db/types";
import { createServerSupabaseClient } from "@/lib/supabase/server";
import { getScrapedJobs } from "@/lib/scraping/jobs";

type JobFilters = {
  sectorSlug?: string;
  type?: OpportunityType;
  verifiedOnly?: boolean;
  premiumOnly?: boolean;
  limit?: number;
};

type SupabaseErrorLike = {
  code?: string | null;
  message?: string | null;
};

let jobsTableAvailability: "unknown" | "available" | "missing" = "unknown";
let hasLoggedMissingJobsTable = false;

export async function getCategories() {
  return categories;
}

function isMissingJobsTableError(error: SupabaseErrorLike) {
  const message = error.message ?? "";

  return (
    error.code === "PGRST205" ||
    /public\.jobs/i.test(message) ||
    /relation .*jobs.* does not exist/i.test(message)
  );
}

function markJobsTableMissing() {
  jobsTableAvailability = "missing";

  if (!hasLoggedMissingJobsTable) {
    console.warn(
      "Supabase jobs table unavailable. Public pages will keep using live scraped sources only.",
    );
    hasLoggedMissingJobsTable = true;
  }
}

async function getPublishedJobsFromSupabase(filters: JobFilters = {}) {
  if (
    jobsTableAvailability === "missing" ||
    !process.env.NEXT_PUBLIC_SUPABASE_URL ||
    !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  ) {
    return [] as Job[];
  }

  try {
    const supabase = await createServerSupabaseClient();
    let query = supabase.from("jobs").select("*").eq("status", "published").eq("is_verified", true);

    if (filters.sectorSlug) {
      query = query.eq("sector_slug", filters.sectorSlug);
    }

    if (filters.type) {
      query = query.eq("type", filters.type);
    }

    if (filters.premiumOnly) {
      query = query.eq("is_premium", true);
    }

    const { data, error } = await query.order("published_at", { ascending: false });

    if (error) {
      if (isMissingJobsTableError(error)) {
        markJobsTableMissing();
        return [] as Job[];
      }

      console.error("Supabase jobs query failed:", error);
      return [] as Job[];
    }

    jobsTableAvailability = "available";
    return data ?? [];
  } catch (error) {
    if (error && typeof error === "object" && isMissingJobsTableError(error as SupabaseErrorLike)) {
      markJobsTableMissing();
      return [] as Job[];
    }

    console.error("Supabase jobs query crashed:", error);
    return [] as Job[];
  }
}

function filterJobs(jobs: Job[], filters: JobFilters = {}) {
  const filtered = jobs.filter((job) => {
    if (job.status !== "published") {
      return false;
    }

    if (filters.sectorSlug && job.sector_slug !== filters.sectorSlug) {
      return false;
    }

    if (filters.type && job.type !== filters.type) {
      return false;
    }

    if (!filters.type && job.type === "training") {
      return false;
    }

    if (filters.verifiedOnly && !job.is_verified) {
      return false;
    }

    if (filters.premiumOnly && !job.is_premium) {
      return false;
    }

    return true;
  });

  return filtered.sort((left, right) => {
    const leftValue = left.published_at ?? left.created_at;
    const rightValue = right.published_at ?? right.created_at;

    return new Date(rightValue).getTime() - new Date(leftValue).getTime();
  });
}

async function getPublicScrapedJobs(filters: JobFilters = {}) {
  const scrapedJobs = await getScrapedJobs();
  const filtered = filterJobs(scrapedJobs, filters);

  if (filters.limit) {
    return filtered.slice(0, filters.limit);
  }

  return filtered;
}

export async function getJobs(filters: JobFilters = {}) {
  return getPublicScrapedJobs(filters);
}

export async function getFeaturedJobs(sectorSlug?: string) {
  return getJobs({ sectorSlug, limit: 6 });
}

export async function getLatestJobs(limit = 6) {
  return getJobs({ limit });
}

export async function getPremiumTrainings() {
  return getPublishedJobsFromSupabase({
    type: "training",
    premiumOnly: true,
    verifiedOnly: true,
  });
}

export async function getJobBySlug(slug: string): Promise<Job | null> {
  const scrapedJobs = await getScrapedJobs();
  const scrapedJob = scrapedJobs.find((job) => job.slug === slug);

  if (scrapedJob) {
    return scrapedJob;
  }

  const dbJobs = await getPublishedJobsFromSupabase();
  return dbJobs.find((job) => job.slug === slug) ?? null;
}
