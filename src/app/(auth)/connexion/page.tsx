import Link from "next/link";

import { signInWithMagicLink, signInWithPassword } from "@/actions/auth";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

export default function SignInPage() {
  return (
    <div className="mx-auto grid max-w-5xl gap-6 px-4 py-10 sm:px-6 lg:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle>Connexion rapide</CardTitle>
          <CardDescription>Magic Link pour un acces mobile simple et rapide.</CardDescription>
        </CardHeader>
        <CardContent>
          <form action={signInWithMagicLink} className="space-y-4">
            <input type="hidden" name="next" value="/candidat/tableau-de-bord" />
            <label className="block space-y-2">
              <span className="text-sm font-medium text-ink-700">Email</span>
              <Input type="email" name="email" placeholder="vous@example.com" required />
            </label>
            <Button type="submit" className="w-full">
              Envoyer un lien magique
            </Button>
          </form>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Connexion mot de passe</CardTitle>
          <CardDescription>Pour les comptes deja actifs cote candidat ou recruteur.</CardDescription>
        </CardHeader>
        <CardContent>
          <form action={signInWithPassword} className="space-y-4">
            <label className="block space-y-2">
              <span className="text-sm font-medium text-ink-700">Email</span>
              <Input type="email" name="email" placeholder="vous@example.com" required />
            </label>
            <label className="block space-y-2">
              <span className="text-sm font-medium text-ink-700">Mot de passe</span>
              <Input type="password" name="password" placeholder="********" required />
            </label>
            <Button type="submit" className="w-full">
              Se connecter
            </Button>
          </form>

          <p className="mt-4 text-sm text-ink-500">
            Nouveau sur MonJob.ci ?{" "}
            <Link href="/inscription" className="font-medium text-brand-600">
              Creer un compte
            </Link>
          </p>
        </CardContent>
      </Card>
    </div>
  );
}

