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
