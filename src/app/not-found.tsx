import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-20 text-center sm:px-6">
      <p className="text-sm font-medium text-brand-600">Introuvable</p>
      <h1 className="mt-2 text-3xl font-semibold text-ink-900">Cette page n&#39;existe pas.</h1>
      <p className="mt-3 text-sm text-ink-500">
        Retourne a l&#39;accueil pour explorer les offres verifiees ou les formations premium.
      </p>
      <Link
        href="/"
        className="mt-6 inline-flex h-11 items-center rounded-lg bg-brand-500 px-4 text-sm font-medium text-white"
      >
        Retour a l&#39;accueil
      </Link>
    </div>
  );
}
