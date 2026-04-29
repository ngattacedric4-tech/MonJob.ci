import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const applicationSteps = [
  "submitted",
  "reviewing",
  "interview",
  "accepted",
];

export default function CandidateApplicationsPage() {
  return (
    <div className="mx-auto max-w-5xl space-y-8 px-4 py-10 sm:px-6">
      <div className="space-y-2">
        <p className="text-sm font-medium text-brand-600">Suivi</p>
        <h1 className="text-3xl font-semibold text-ink-900">Mes candidatures</h1>
        <p className="text-sm text-ink-500">
          Le schema `applications` supporte deja le suivi de statut et la reference vers le CV.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Pipeline actuel</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {applicationSteps.map((step) => (
            <div key={step} className="rounded-lg bg-ink-50 p-4 text-center text-sm font-medium text-ink-700">
              {step}
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}

