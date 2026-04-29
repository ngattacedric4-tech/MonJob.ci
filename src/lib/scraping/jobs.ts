import { createHash } from "node:crypto";

import { load } from "cheerio";
import type { Element } from "domhandler";
import { unstable_cache } from "next/cache";

import { categories, getCategoryBySlug } from "@/lib/constants/categories";
import type { Job, OpportunityType, SourceKind } from "@/lib/db/types";
import { slugify } from "@/lib/utils";

type ScrapedJobDraft = {
  title: string;
  externalUrl: string;
  sourceName: string;
  sourceKind?: SourceKind;
  description?: string | null;
  organizationName?: string | null;
  locationCity?: string | null;
  type?: OpportunityType;
  typeHint?: string | null;
  categoryHint?: string | null;
  publishedAt?: string | null;
  expiresAt?: string | null;
};

type Scraper = () => Promise<Job[]>;

const SCRAPE_REVALIDATE_SECONDS = 60 * 30;
const SCRAPE_LIMIT_PER_SOURCE = 12;
const DEFAULT_SOURCE_KIND: SourceKind = "partner_site";
const REQUEST_HEADERS = {
  "user-agent":
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/135.0.0.0 Safari/537.36",
  "accept-language": "fr-FR,fr;q=0.9,en;q=0.8",
};

const CATEGORY_KEYWORDS: Array<{ slug: string; keywords: string[] }> = [
  {
    slug: "informatique",
    keywords: [
      "informatique",
      "it",
      "developpeur",
      "developer",
      "logiciel",
      "logiciels",
      "testeur",
      "qa",
      "support",
      "reseau",
      "reseaux",
      "telecom",
      "telecoms",
      "systeme",
      "systemes",
      "cyber",
      "web",
      "data",
      "fibre",
      "tech",
    ],
  },
  {
    slug: "transit",
    keywords: [
      "transit",
      "douane",
      "douanier",
      "import",
      "export",
      "freight",
      "shipping",
      "logistique portuaire",
      "declarant",
    ],
  },
  {
    slug: "transport",
    keywords: [
      "transport",
      "chauffeur",
      "livreur",
      "livraison",
      "vtc",
      "camion",
      "conducteur",
      "poids lourds",
      "mecanicien",
      "garage",
      "flotte",
    ],
  },
  {
    slug: "commerce",
    keywords: [
      "commercial",
      "vente",
      "vendeur",
      "vendeuse",
      "caissier",
      "caissiere",
      "prospection",
      "retail",
      "merchandiser",
      "animateur commercial",
      "business developer",
      "sales",
    ],
  },
  {
    slug: "administratif",
    keywords: [
      "administratif",
      "administrative",
      "assistant",
      "assistante",
      "secretaire",
      "back office",
      "reception",
      "receptionniste",
      "rh",
      "ressources humaines",
      "office",
    ],
  },
  {
    slug: "sante",
    keywords: [
      "sante",
      "medical",
      "infirmier",
      "infirmiere",
      "soignant",
      "clinique",
      "pharmacie",
      "sage femme",
      "laboratoire",
    ],
  },
  {
    slug: "marketing-digital",
    keywords: [
      "marketing",
      "digital",
      "communication",
      "community manager",
      "social media",
      "brand",
      "content",
      "copywriter",
      "acquisition",
    ],
  },
];

const monthMap: Record<string, number> = {
  janv: 0,
  janvier: 0,
  fevr: 1,
  fevrier: 1,
  mars: 2,
  avr: 3,
  avril: 3,
  mai: 4,
  juin: 5,
  juil: 6,
  juillet: 6,
  aout: 7,
  aou: 7,
  sept: 8,
  septembre: 8,
  oct: 9,
  octobre: 9,
  nov: 10,
  novembre: 10,
  dec: 11,
  decembre: 11,
};

function normalizeText(value: string) {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/\u00a0/g, " ")
    .replace(/\s+/g, " ")
    .trim()
    .toLowerCase();
}

function cleanText(value?: string | null) {
  return (value ?? "").replace(/\u00a0/g, " ").replace(/\s+/g, " ").trim();
}

function absoluteUrl(baseUrl: string, href?: string | null) {
  if (!href) {
    return null;
  }

  try {
    return new URL(href, baseUrl).toString();
  } catch {
    return null;
  }
}

function hashValue(value: string) {
  return createHash("sha1").update(value).digest("hex");
}

function extractCity(value?: string | null) {
  const cleaned = cleanText(value);

  if (!cleaned) {
    return null;
  }

  return cleaned
    .replace(/,\s*cote d['’]ivoire/i, "")
    .replace(/,\s*cote d ivoire/i, "")
    .replace(/\s*cote d['’]ivoire/i, "")
    .trim();
}

function inferType(value: string) {
  const normalized = normalizeText(value);

  if (
    normalized.includes("stage") ||
    normalized.includes("stagiaire") ||
    normalized.includes("pre embauche") ||
    normalized.includes("pre-embauche")
  ) {
    return "internship" as const;
  }

  if (normalized.includes("formation")) {
    return "training" as const;
  }

  return "job" as const;
}

function inferCategory(text: string) {
  const normalized = normalizeText(text);

  for (const rule of CATEGORY_KEYWORDS) {
    if (rule.keywords.some((keyword) => normalized.includes(keyword))) {
      return getCategoryBySlug(rule.slug) ?? categories[0];
    }
  }

  return getCategoryBySlug("administratif") ?? categories[0];
}

function parseSlashDate(value: string) {
  const match = value.match(/^(\d{2})\/(\d{2})\/(\d{4})$/);

  if (!match) {
    return null;
  }

  const [, day, month, year] = match;
  const date = new Date(Date.UTC(Number(year), Number(month) - 1, Number(day)));

  return Number.isNaN(date.getTime()) ? null : date.toISOString();
}

function parseDotDate(value: string) {
  const match = value.match(/^(\d{2})\.(\d{2})\.(\d{4})$/);

  if (!match) {
    return null;
  }

  const [, day, month, year] = match;
  const date = new Date(Date.UTC(Number(year), Number(month) - 1, Number(day)));

  return Number.isNaN(date.getTime()) ? null : date.toISOString();
}

function parseFrenchDate(value?: string | null) {
  const cleaned = cleanText(value);

  if (!cleaned) {
    return null;
  }

  if (/^\d{4}-\d{2}-\d{2}/.test(cleaned)) {
    const date = new Date(cleaned);
    return Number.isNaN(date.getTime()) ? null : date.toISOString();
  }

  const slashDate = parseSlashDate(cleaned);
  if (slashDate) {
    return slashDate;
  }

  const dotDate = parseDotDate(cleaned);
  if (dotDate) {
    return dotDate;
  }

  const normalized = normalizeText(cleaned)
    .replace(/\./g, " ")
    .replace(/,/g, " ")
    .replace(/\s+/g, " ");

  if (normalized.includes("aujourd")) {
    return new Date().toISOString();
  }

  if (normalized === "hier") {
    const date = new Date();
    date.setDate(date.getDate() - 1);
    return date.toISOString();
  }

  const match = normalized.match(/(\d{1,2})\s+([a-z]+)\s+(\d{4})(?:\s+a\s+(\d{1,2})h(\d{2}))?/);

  if (!match) {
    return null;
  }

  const [, dayValue, rawMonth, yearValue, hourValue, minuteValue] = match;
  const month = monthMap[rawMonth];

  if (month === undefined) {
    return null;
  }

  const date = new Date(
    Date.UTC(
      Number(yearValue),
      month,
      Number(dayValue),
      Number(hourValue ?? "0"),
      Number(minuteValue ?? "0"),
    ),
  );

  return Number.isNaN(date.getTime()) ? null : date.toISOString();
}

function buildExternalDescription(sourceName: string) {
  return `Annonce publiee sur ${sourceName}. Ouvre la source pour consulter les details complets.`;
}

function toJob(draft: ScrapedJobDraft): Job | null {
  const title = cleanText(draft.title);
  const externalUrl = cleanText(draft.externalUrl);

  if (!title || !externalUrl) {
    return null;
  }

  const now = new Date().toISOString();
  const hash = hashValue(`${draft.sourceName}:${externalUrl}`);
  const slugBase = slugify(`${draft.sourceName}-${title}`) || "opportunite-source";
  const type = draft.type ?? inferType(`${draft.typeHint ?? ""} ${title}`);
  const category = inferCategory(
    [draft.categoryHint, draft.title, draft.description, draft.organizationName, draft.locationCity]
      .filter(Boolean)
      .join(" "),
  );
  const publishedAt = parseFrenchDate(draft.publishedAt) ?? null;
  const expiresAt = parseFrenchDate(draft.expiresAt) ?? null;

  return {
    id: `scraped-${hash}`,
    created_by: null,
    title,
    slug: `${slugBase}-${hash.slice(0, 8)}`,
    description: cleanText(draft.description) || buildExternalDescription(draft.sourceName),
    type,
    sector_slug: category.slug,
    sector_label: category.label,
    source_kind: draft.sourceKind ?? DEFAULT_SOURCE_KIND,
    source_name: draft.sourceName,
    organization_name: cleanText(draft.organizationName) || null,
    location_city: extractCity(draft.locationCity),
    external_url: externalUrl,
    status: "published",
    is_verified: true,
    verified_at: publishedAt ?? now,
    verified_by: null,
    is_premium: false,
    published_at: publishedAt,
    expires_at: expiresAt,
    created_at: publishedAt ?? now,
    updated_at: now,
  };
}

async function fetchHtml(url: string) {
  const response = await fetch(url, {
    headers: REQUEST_HEADERS,
    redirect: "follow",
    next: { revalidate: SCRAPE_REVALIDATE_SECONDS },
    signal: AbortSignal.timeout(15_000),
  });

  if (!response.ok) {
    throw new Error(`Impossible de recuperer ${url} (${response.status})`);
  }

  return response.text();
}

function extractFirstMatchingValue(
  $: ReturnType<typeof load>,
  card: Element,
  labels: string[],
) {
  let value: string | null = null;

  $(card)
    .find("li")
    .each((_, node) => {
      if (value) {
        return;
      }

      const text = cleanText($(node).text());
      const normalized = normalizeText(text);

      if (labels.some((label) => normalized.includes(label))) {
        value = cleanText($(node).find("strong").last().text()) || text;
      }
    });

  return value;
}

async function scrapeEmploiCi() {
  const html = await fetchHtml("https://www.emploi.ci/recherche-jobs-cote-ivoire");
  const $ = load(html);
  const jobs: Job[] = [];

  $("div.card.card-job")
    .slice(0, SCRAPE_LIMIT_PER_SOURCE)
    .each((_, card) => {
      const titleLink = $(card).find("h3 a").first();
      const title = cleanText(titleLink.text());
      const externalUrl = absoluteUrl("https://www.emploi.ci", titleLink.attr("href"));

      const job = toJob({
        title,
        externalUrl: externalUrl ?? "",
        sourceName: "Emploi.ci",
        sourceKind: "partner_site",
        description: cleanText($(card).find(".card-job-description p").first().text()),
        organizationName: cleanText($(card).find("a.company-name").first().text()),
        locationCity: extractFirstMatchingValue($, card, [
          "region de",
          "ville de",
          "region",
          "ville",
        ]),
        publishedAt: $(card).find("time").attr("datetime"),
        typeHint: title,
      });

      if (job) {
        jobs.push(job);
      }
    });

  return jobs;
}

function readStageMeta($: ReturnType<typeof load>, card: Element, iconToken: string) {
  let value = "";

  $(card)
    .find("li")
    .each((_, item) => {
      const html = $(item).html() ?? "";

      if (!value && html.includes(iconToken)) {
        value = cleanText($(item).text());
      }
    });

  return value || null;
}

async function scrapeStageCi() {
  const html = await fetchHtml("https://www.stage.ci/");
  const $ = load(html);
  const jobs: Job[] = [];

  $("div.item-list")
    .slice(0, SCRAPE_LIMIT_PER_SOURCE)
    .each((_, card) => {
      const titleLink = $(card).find("h4 a").first();
      const title = cleanText(titleLink.text());
      const externalUrl = absoluteUrl("https://www.stage.ci", titleLink.attr("href"));
      const categoryHint = readStageMeta($, card, "bi-folder");
      const typeHint = readStageMeta($, card, "bi-tag");

      const job = toJob({
        title,
        externalUrl: externalUrl ?? "",
        sourceName: "Stage.ci",
        sourceKind: "partner_site",
        description: cleanText($(card).find(".container.px-0.pt-2").first().text()),
        organizationName:
          cleanText($(card).find("h5 a").first().text()) ||
          cleanText($(card).find("h5").first().text()),
        locationCity: readStageMeta($, card, "bi-geo-alt"),
        publishedAt: readStageMeta($, card, "fa-regular fa-clock"),
        typeHint,
        categoryHint,
      });

      if (job) {
        jobs.push(job);
      }
    });

  return jobs;
}

async function scrapeEducarriere() {
  const html = await fetchHtml("https://emploi.educarriere.ci/emploi/page/all");
  const $ = load(html);
  const jobs: Job[] = [];

  $("div.rt-post.post-md.style-8")
    .slice(0, SCRAPE_LIMIT_PER_SOURCE)
    .each((_, card) => {
      const titleLink = $(card).find("h4.post-title a").first();
      const title = cleanText(titleLink.text());
      const externalUrl = absoluteUrl("https://emploi.educarriere.ci", titleLink.attr("href"));
      const typeHint = cleanText($(card).find("a.racing").first().text());

      const metaValues = $(card)
        .find(".rt-meta li")
        .map((__, item) => cleanText($(item).text()))
        .get();

      const publishedLabel = metaValues.find((value) => normalizeText(value).includes("date d edition"));
      const expiresLabel = metaValues.find((value) => normalizeText(value).includes("date limite"));

      const publishedAt =
        publishedLabel?.split(":").slice(1).join(":").trim() ?? publishedLabel ?? null;
      const expiresAt = expiresLabel?.split(":").slice(1).join(":").trim() ?? expiresLabel ?? null;

      const job = toJob({
        title,
        externalUrl: externalUrl ?? "",
        sourceName: "Educarriere.ci",
        sourceKind: "partner_site",
        description: buildExternalDescription("Educarriere.ci"),
        organizationName: null,
        locationCity: null,
        publishedAt,
        expiresAt,
        typeHint,
        categoryHint: title,
      });

      if (job) {
        jobs.push(job);
      }
    });

  return jobs;
}

async function scrapeNovojob() {
  const html = await fetchHtml("https://www.novojob.com/cote-d-ivoire/offres-d-emploi");
  const $ = load(html);
  const jobs: Job[] = [];

  $("li.separator-bot")
    .slice(0, SCRAPE_LIMIT_PER_SOURCE)
    .each((_, card) => {
      const titleLink = $(card)
        .find("a[title]")
        .filter((__, link) => ($(link).attr("href") ?? "").includes("/offre-d-emploi/"))
        .first();
      const title = cleanText(titleLink.attr("title") || titleLink.text());
      const externalUrl = absoluteUrl("https://www.novojob.com", titleLink.attr("href"));
      const locationText = cleanText($(card).find(".bloc-bottom .fa-map-marker").parent().text());
      const publishedText = cleanText($(card).find(".bloc-bottom .fa-clock-o").parent().text());

      const job = toJob({
        title,
        externalUrl: externalUrl ?? "",
        sourceName: "Novojob",
        sourceKind: "partner_site",
        description: buildExternalDescription("Novojob"),
        organizationName: cleanText($(card).find(".contact h6 span").first().text()),
        locationCity: locationText,
        publishedAt: publishedText,
        typeHint: title,
        categoryHint: title,
      });

      if (job) {
        jobs.push(job);
      }
    });

  return jobs;
}

const scrapers: Scraper[] = [scrapeEmploiCi, scrapeStageCi, scrapeEducarriere, scrapeNovojob];

function deduplicateJobs(jobs: Job[]) {
  const unique = new Map<string, Job>();

  for (const job of jobs) {
    const key = job.external_url ?? job.slug;

    if (!unique.has(key)) {
      unique.set(key, job);
    }
  }

  return Array.from(unique.values());
}

function sortJobs(jobs: Job[]) {
  return [...jobs].sort((left, right) => {
    const leftValue = left.published_at ?? left.created_at;
    const rightValue = right.published_at ?? right.created_at;

    return new Date(rightValue).getTime() - new Date(leftValue).getTime();
  });
}

const getCachedScrapedJobs = unstable_cache(
  async () => {
    const settled = await Promise.allSettled(scrapers.map((scrape) => scrape()));
    const jobs = settled.flatMap((result) => {
      if (result.status === "fulfilled") {
        return result.value;
      }

      console.error("Scraping source error:", result.reason);
      return [];
    });

    return sortJobs(deduplicateJobs(jobs));
  },
  ["live-scraped-jobs-v1"],
  { revalidate: SCRAPE_REVALIDATE_SECONDS },
);

export async function getScrapedJobs() {
  return getCachedScrapedJobs();
}
