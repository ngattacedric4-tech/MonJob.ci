import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const summary = [
  { label: "Candidatures envoyees", value: "08" },
  { label: "Offres sauvegardees", value: "12" },
  { label: "CV actif", value: "1 fichier" },
];

export default function CandidateDashboardPage() {
  return (
    <div className="mx-auto max-w-5xl space-y-8 px-4 py-10 sm:px-6">
      <div className="space-y-2">
        <p className="text-sm font-medium text-brand-600">Espace candidat</p>
        <h1 className="text-3xl font-semibold text-ink-900">Tableau de bord</h1>
        <p className="text-sm text-ink-500">
          Point d entree pour suivre les candidatures, le CV stocke sur Supabase Storage et les
          prochaines opportunites.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {summary.map((item) => (
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
    </div>
  );
}

