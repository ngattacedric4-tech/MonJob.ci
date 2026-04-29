import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function CandidateProfilePage() {
  return (
    <div className="mx-auto max-w-5xl space-y-8 px-4 py-10 sm:px-6">
      <div className="space-y-2">
        <p className="text-sm font-medium text-brand-600">Profil</p>
        <h1 className="text-3xl font-semibold text-ink-900">Mon profil candidat</h1>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Champs prets dans `profiles`</CardTitle>
          <CardDescription>
            Nom, telephone, ville, headline, bio, competences, avatar et chemin du CV.
          </CardDescription>
        </CardHeader>
        <CardContent className="text-sm text-ink-600">
          Cette page est le point naturel pour brancher plus tard l edition de profil et l upload
          vers le bucket prive `cvs`.
        </CardContent>
      </Card>
    </div>
  );
}

