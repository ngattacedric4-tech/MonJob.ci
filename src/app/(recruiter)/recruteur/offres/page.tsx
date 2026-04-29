import Link from "next/link";
import { ArrowRight, ShieldCheck, Store } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const recruiterStats = [
  { label: "Brouillons", value: "03" },
  { label: "En revue", value: "04" },
  { label: "Publiees", value: "09" },
];

export default function RecruiterJobsPage() {
  return (
    <div className="mx-auto max-w-5xl space-y-8 px-4 py-10 sm:px-6">
      <div className="space-y-2">
        <p className="text-sm font-medium text-brand-600">Espace recruteur</p>
        <h1 className="text-3xl font-semibold text-ink-900">Gestion des offres</h1>
        <p className="text-sm text-ink-500">
          Les annonces creees par un recruteur restent en `pending_review` jusqu a verification.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {recruiterStats.map((item) => (
          <Card key={item.label}>
            <CardHeader>
              <CardTitle className="text-base">{item.label}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-semibold text-ink-900">{item.value}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-4 lg:grid-cols-[1.15fr_0.85fr]">
        <Card>
          <CardHeader>
            <CardTitle>Workflow v1</CardTitle>
            <CardDescription>
              Creation, edition par le recruteur, puis publication par un membre staff.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4 text-sm text-ink-600">
            <p>Les policies RLS separent deja la gestion proprietaire et la moderation interne.</p>
            <div className="rounded-lg border border-ink-100 bg-ink-50 p-4">
              <div className="flex items-start gap-3">
                <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-brand-600" />
                <div className="space-y-1">
                  <p className="font-medium text-ink-900">Formations premium Chariow</p>
                  <p>
                    Un formateur peut maintenant proposer sa boutique Chariow via un formulaire
                    dedie. Le lien sera relu avant publication.
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Ajouter un lien Chariow</CardTitle>
            <CardDescription>
              Pour les formateurs et createurs qui vendent via Chariow.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4 text-sm text-ink-600">
            <div className="flex gap-3">
              <Store className="mt-0.5 h-4 w-4 shrink-0 text-brand-600" />
              <p>Colle le lien de la boutique ou de la page de vente Chariow.</p>
            </div>
            <div className="flex gap-3">
              <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-brand-600" />
              <p>La fiche part en verification avant d&#39;apparaitre dans la section premium.</p>
            </div>
            <Link href="/recruteur/offres/chariow" className="block">
              <Button className="w-full">
                Ajouter une boutique Chariow
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
