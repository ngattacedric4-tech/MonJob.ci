import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function RecruiterProfilePage() {
  return (
    <div className="mx-auto max-w-5xl space-y-8 px-4 py-10 sm:px-6">
      <div className="space-y-2">
        <p className="text-sm font-medium text-brand-600">Profil recruteur</p>
        <h1 className="text-3xl font-semibold text-ink-900">Organisation et publication</h1>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Base prete</CardTitle>
          <CardDescription>
            Les champs `organization_name`, `source_name` et `external_url` sont deja prevus dans
            les offres pour lier publication et credibilite de la source.
          </CardDescription>
        </CardHeader>
        <CardContent className="text-sm text-ink-600">
          Cette page servira a relier plus tard les informations de l entreprise au flux de
          publication.
        </CardContent>
      </Card>
    </div>
  );
}
