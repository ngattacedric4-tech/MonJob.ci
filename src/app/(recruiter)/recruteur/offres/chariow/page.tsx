import Link from "next/link";
import { ArrowLeft, CheckCircle2, ShieldCheck, Store } from "lucide-react";

import { ChariowShopForm } from "@/components/formations/chariow-shop-form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { categories, trainingCategorySlugs } from "@/lib/constants/categories";

const chariowCategories = categories.filter((category) =>
  trainingCategorySlugs.includes(category.slug as (typeof trainingCategorySlugs)[number]),
);

export default function RecruiterChariowPage() {
  const isSupabaseConfigured = Boolean(
    process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
  );

  return (
    <div className="mx-auto max-w-6xl space-y-8 px-4 py-10 sm:px-6">
      <div className="space-y-3">
        <Link href="/recruteur/offres" className="inline-flex items-center gap-2 text-sm text-ink-600">
          <ArrowLeft className="h-4 w-4" />
          Retour a la gestion des offres
        </Link>
        <p className="text-sm font-medium text-brand-600">Parcours formateur</p>
        <h1 className="text-3xl font-semibold text-ink-900">Ajouter une boutique Chariow</h1>
        <p className="max-w-3xl text-sm text-ink-500">
          Ici, un formateur peut proposer sa boutique Chariow de facon simple. On recupere le
          lien, on le classe dans la bonne categorie, puis on laisse l&#39;equipe valider avant
          publication.
        </p>
      </div>

      <div className="grid gap-4 lg:grid-cols-[1.15fr_0.85fr]">
        <ChariowShopForm
          categories={chariowCategories}
          isSupabaseConfigured={isSupabaseConfigured}
        />

        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Ce qui se passe ensuite</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-sm text-ink-600">
              <div className="flex gap-3">
                <Store className="mt-0.5 h-4 w-4 shrink-0 text-brand-600" />
                <p>La soumission cree une offre de type `training` sourcee comme `chariow`.</p>
              </div>
              <div className="flex gap-3">
                <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-brand-600" />
                <p>Le statut part en `pending_review` et n&#39;est pas public avant moderation.</p>
              </div>
              <div className="flex gap-3">
                <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-brand-600" />
                <p>Une fois validee, la formation pourra apparaitre avec le badge verifie.</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Format recommande</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm text-ink-600">
              <p>
                Utilise de preference le lien final de ta boutique ou de la page de vente Chariow,
                pas un lien raccourci.
              </p>
              <p>
                Si la formation est orientee business, IA, e-commerce ou personal branding, elle
                rentrera naturellement dans la section premium deja prevue.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
