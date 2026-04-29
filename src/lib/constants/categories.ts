export type Category = {
  slug: string;
  label: string;
  description: string;
};

export const categories: Category[] = [
  {
    slug: "informatique",
    label: "Informatique",
    description: "Support, fibre optique, produit, web et operations tech.",
  },
  {
    slug: "transit",
    label: "Transit",
    description: "Import-export, douane, logistique et suivi documentaire.",
  },
  {
    slug: "transport",
    label: "Transport",
    description: "Conduite, flotte, distribution et chaines de livraison.",
  },
  {
    slug: "commerce",
    label: "Commerce",
    description: "Prospection, vente terrain, relation client et retail.",
  },
  {
    slug: "administratif",
    label: "Administratif",
    description: "Assistant, back-office, accueil, coordination et support.",
  },
  {
    slug: "sante",
    label: "Sante",
    description: "Stage clinique, aide-soignant, accueil et support medical.",
  },
  {
    slug: "e-commerce",
    label: "E-commerce",
    description: "Vente en ligne, catalogues produits et conversion digitale.",
  },
  {
    slug: "marketing-digital",
    label: "Marketing digital",
    description: "Acquisition, campagnes, copywriting et contenus.",
  },
  {
    slug: "business-en-ligne",
    label: "Business en ligne",
    description: "Freelancing, monetic, systemes de vente et business web.",
  },
  {
    slug: "ia-contenu",
    label: "IA & contenu",
    description: "Creation assistee, workflow IA et production de contenus.",
  },
  {
    slug: "leadership",
    label: "Leadership",
    description: "Personal branding, management, communication et posture.",
  },
];

export const trainingCategorySlugs = [
  "informatique",
  "commerce",
  "e-commerce",
  "marketing-digital",
  "business-en-ligne",
  "ia-contenu",
  "leadership",
] as const;

export function getCategoryBySlug(slug: string) {
  return categories.find((category) => category.slug === slug) ?? null;
}
