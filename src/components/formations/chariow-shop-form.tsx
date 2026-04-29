"use client";

import { useActionState } from "react";
import { AlertCircle, CheckCircle2, Link2, LockKeyhole, Store } from "lucide-react";

import {
  createChariowTrainingAction,
  initialChariowTrainingSubmissionState,
} from "@/actions/jobs";
import type { Category } from "@/lib/constants/categories";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";

type ChariowShopFormProps = {
  categories: Category[];
  isSupabaseConfigured: boolean;
};

export function ChariowShopForm({
  categories,
  isSupabaseConfigured,
}: ChariowShopFormProps) {
  const [state, formAction, isPending] = useActionState(
    createChariowTrainingAction,
    initialChariowTrainingSubmissionState,
  );

  return (
    <Card>
      <CardHeader>
        <CardTitle>Ajouter une boutique Chariow</CardTitle>
        <CardDescription>
          Colle le lien de ta boutique ou de ta page de vente Chariow. La fiche sera classee en
          formation premium puis relue avant publication.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-5">
        {!isSupabaseConfigured ? (
          <div className="flex gap-3 rounded-lg border border-warn-100 bg-warn-100/60 p-4 text-sm text-warn-700">
            <LockKeyhole className="mt-0.5 h-4 w-4 shrink-0" />
            <p>
              L&#39;interface est prete. Pour enregistrer les soumissions, ajoute les variables
              Supabase dans `.env.local`.
            </p>
          </div>
        ) : null}

        <form action={formAction} className="space-y-4">
          <label className="block space-y-2">
            <span className="text-sm font-medium text-ink-700">Nom de la formation</span>
            <Input
              name="title"
              placeholder="Ex: Vente via WhatsApp Business"
              required
            />
          </label>

          <label className="block space-y-2">
            <span className="text-sm font-medium text-ink-700">Nom du formateur ou de la boutique</span>
            <Input
              name="organization_name"
              placeholder="Ex: Ibrahim Oue"
              required
            />
          </label>

          <label className="block space-y-2">
            <span className="text-sm font-medium text-ink-700">Categorie</span>
            <select
              name="sector_slug"
              required
              defaultValue=""
              className="h-11 w-full rounded-lg border border-ink-200 bg-white px-3 text-sm text-ink-900 outline-none transition focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20"
            >
              <option value="" disabled>
                Choisir une categorie
              </option>
              {categories.map((category) => (
                <option key={category.slug} value={category.slug}>
                  {category.label}
                </option>
              ))}
            </select>
          </label>

          <label className="block space-y-2">
            <span className="text-sm font-medium text-ink-700">Lien Chariow</span>
            <Input
              name="external_url"
              type="url"
              placeholder="https://...chariow.com/..."
              required
            />
            <p className="text-xs text-ink-500">
              Tu peux coller le lien de la boutique Chariow ou celui d&#39;une page de vente precise.
            </p>
          </label>

          <label className="block space-y-2">
            <span className="text-sm font-medium text-ink-700">Description courte</span>
            <Textarea
              name="description"
              placeholder="Explique en quelques lignes ce que la personne va apprendre."
              required
            />
          </label>

          {state.message ? (
            <div
              className={cn(
                "flex gap-3 rounded-lg border p-4 text-sm",
                state.status === "success"
                  ? "border-success-100 bg-success-100/70 text-success-700"
                  : "border-red-200 bg-red-50 text-red-700",
              )}
            >
              {state.status === "success" ? (
                <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0" />
              ) : (
                <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
              )}
              <div className="space-y-1">
                <p>{state.message}</p>
                {state.status === "success" && state.submittedTitle && state.submittedUrl ? (
                  <p className="text-xs">
                    {state.submittedTitle} - {state.submittedUrl}
                  </p>
                ) : null}
              </div>
            </div>
          ) : null}

          <Button type="submit" className="w-full" disabled={isPending}>
            {isPending ? "Envoi en cours..." : "Envoyer la boutique Chariow"}
          </Button>
        </form>

        <div className="grid gap-3 rounded-lg bg-ink-50 p-4 text-sm text-ink-600 sm:grid-cols-3">
          <div className="space-y-2">
            <Store className="h-4 w-4 text-brand-600" />
            <p className="font-medium text-ink-900">Soumission simple</p>
            <p>Un seul lien Chariow a coller pour proposer la formation.</p>
          </div>
          <div className="space-y-2">
            <Link2 className="h-4 w-4 text-brand-600" />
            <p className="font-medium text-ink-900">Lien valide</p>
            <p>Le formulaire refuse les URLs qui ne pointent pas vers Chariow.</p>
          </div>
          <div className="space-y-2">
            <CheckCircle2 className="h-4 w-4 text-brand-600" />
            <p className="font-medium text-ink-900">Verification</p>
            <p>La fiche reste en revue avant d&#39;apparaitre dans les formations premium.</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
