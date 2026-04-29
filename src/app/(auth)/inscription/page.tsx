import { signUpWithPassword } from "@/actions/auth";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

export default function SignUpPage() {
  return (
    <div className="mx-auto max-w-2xl px-4 py-10 sm:px-6">
      <Card>
        <CardHeader>
          <CardTitle>Creer un compte</CardTitle>
          <CardDescription>
            Le role public reste simple: candidat ou recruteur. La moderation staff reste interne.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form action={signUpWithPassword} className="space-y-4">
            <label className="block space-y-2">
              <span className="text-sm font-medium text-ink-700">Nom complet</span>
              <Input type="text" name="full_name" placeholder="Votre nom complet" required />
            </label>
            <label className="block space-y-2">
              <span className="text-sm font-medium text-ink-700">Email</span>
              <Input type="email" name="email" placeholder="vous@example.com" required />
            </label>
            <label className="block space-y-2">
              <span className="text-sm font-medium text-ink-700">Mot de passe</span>
              <Input type="password" name="password" placeholder="********" required />
            </label>
            <label className="block space-y-2">
              <span className="text-sm font-medium text-ink-700">Role</span>
              <select
                name="role"
                className="h-11 w-full rounded-lg border border-ink-200 bg-white px-3 text-sm text-ink-900 outline-none transition focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20"
                defaultValue="candidate"
              >
                <option value="candidate">Candidat</option>
                <option value="recruiter">Recruteur</option>
              </select>
            </label>
            <Button type="submit" className="w-full">
              Creer le compte
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

