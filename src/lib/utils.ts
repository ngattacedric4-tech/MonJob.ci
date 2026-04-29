export function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

export function formatOpportunityType(type: "job" | "internship" | "training") {
  switch (type) {
    case "job":
      return "Emploi";
    case "internship":
      return "Stage";
    case "training":
      return "Formation";
    default:
      return type;
  }
}

export function slugify(value: string) {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .replace(/-{2,}/g, "-");
}

export function isChariowUrl(value: string) {
  try {
    const parsed = new URL(value);

    return /^(.+\.)?chariow\.com$/i.test(parsed.hostname);
  } catch {
    return false;
  }
}

const EMAIL_REGEX = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g;

/**
 * Extrait la première adresse email valide d'un texte (description d'offre,
 * organisation, etc.). Renvoie null si aucune adresse n'est trouvée.
 */
export function extractApplyEmail(...sources: Array<string | null | undefined>) {
  for (const source of sources) {
    if (!source) continue;
    const matches = source.match(EMAIL_REGEX);
    if (matches && matches.length > 0) {
      return matches[0].toLowerCase();
    }
  }
  return null;
}

/**
 * Construit un lien mailto: avec un sujet et un corps pré-remplis pour
 * faciliter la candidature directe par email.
 */
export function buildApplyMailto(params: {
  email: string;
  jobTitle: string;
  organizationName?: string | null;
  sourceName?: string | null;
}) {
  const { email, jobTitle, organizationName, sourceName } = params;

  const subject = `Candidature — ${jobTitle}`;
  const greeting = organizationName
    ? `Bonjour ${organizationName},`
    : "Bonjour,";
  const sourceLine = sourceName
    ? `\n\n(Offre vue sur ${sourceName} via MonJob.ci)`
    : "";

  const body = `${greeting}

Je me permets de vous contacter suite à votre annonce « ${jobTitle} ».

Vous trouverez ci-joint mon CV ainsi que ma lettre de motivation.
Je reste disponible pour tout entretien à votre convenance.

Cordialement,${sourceLine}`;

  const params_url = new URLSearchParams({
    subject,
    body,
  });

  return `mailto:${email}?${params_url.toString()}`;
}
