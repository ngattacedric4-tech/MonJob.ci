import Link from "next/link";
import { ArrowRight, Store } from "lucide-react";

import { PremiumTrainingCard } from "@/components/formations/premium-training-card";
import { SectionHeading } from "@/components/layout/section-heading";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getPremiumTrainings } from "@/lib/db/queries";

export default async function PremiumTrainingsPage() {
  const trainings = await getPremiumTrainings();

  return (
    <div className="mx-auto max-w-6xl space-y-8 px-4 py-10 sm:px-6">
      <SectionHeading
        eyebrow="Filtre Chariow"
        title="Formations premium"
        description="Cette vue applique les trois criteres de la v1: training, source_kind = chariow, is_premium = true."
      />

      {trainings.length ? (
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {trainings.map((training) => (
            <PremiumTrainingCard key={training.id} training={training} />
          ))}
        </div>
      ) : (
        <Card>
          <CardHeader>
            <CardTitle>Aucune boutique Chariow verifiee pour l&#39;instant</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-sm text-ink-600">
            <p>
              Les liens Chariow fictifs ont ete retires pour ne pas envoyer vers des pages qui ne
              correspondent pas a une vraie boutique.
            </p>
            <p>
              Cette section affichera uniquement des boutiques ou pages de vente Chariow reelles,
              une fois validees.
            </p>
          </CardContent>
        </Card>
      )}

      <Card>
        <CardHeader>
          <CardTitle>Vous vendez deja sur Chariow ?</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-4 text-sm text-ink-600 md:flex-row md:items-center md:justify-between">
          <div className="flex gap-3">
            <Store className="mt-0.5 h-4 w-4 shrink-0 text-brand-600" />
            <p>
              Ajoute le lien de ta boutique Chariow pour proposer une formation premium qui sera
              relue avant publication.
            </p>
          </div>
          <Link href="/recruteur/offres/chariow">
            <Button variant="secondary">
              Ajouter mon lien
              <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </CardContent>
      </Card>
    </div>
  );
}
