import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function RecruiterApplicationsPage() {
  return (
    <div className="mx-auto max-w-5xl space-y-8 px-4 py-10 sm:px-6">
      <div className="space-y-2">
        <p className="text-sm font-medium text-brand-600">Recruteur</p>
        <h1 className="text-3xl font-semibold text-ink-900">Candidatures recues</h1>
        <p className="text-sm text-ink-500">
          RLS autorise deja la lecture des candidatures liees aux offres du recruteur.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Etape suivante naturelle</CardTitle>
        </CardHeader>
        <CardContent className="text-sm text-ink-600">
          Brancher la liste issue de Supabase et permettre les transitions de statut
          `reviewing`, `interview`, `accepted` et `rejected`.
        </CardContent>
      </Card>
    </div>
  );
}

