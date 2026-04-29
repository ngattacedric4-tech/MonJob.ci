"use server";

import { revalidatePath } from "next/cache";

import type { JobInsert, JobStatus } from "@/lib/db/types";
import { getCategoryBySlug, trainingCategorySlugs } from "@/lib/constants/categories";
import { createServerSupabaseClient } from "@/lib/supabase/server";
import { isChariowUrl, slugify } from "@/lib/utils";

export type ChariowTrainingSubmissionState = {
  status: "idle" | "success" | "error";
  message: string | null;
  submittedTitle?: string;
  submittedUrl?: string;
};

export const initialChariowTrainingSubmissionState: ChariowTrainingSubmissionState = {
  status: "idle",
  message: null,
};

export async function createRecruiterJobAction(payload: Omit<JobInsert, "created_by">) {
  const supabase = await createServerSupabaseClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    throw new Error("Authentification requise.");
  }

  const insertPayload: JobInsert = {
    ...payload,
    created_by: user.id,
  };

  const { error } = await supabase.from("jobs").insert(insertPayload as never);

  if (error) {
    throw error;
  }

  revalidatePath("/recruteur/offres");
}

export async function updateJobStatusAction(jobId: string, status: JobStatus) {
  const supabase = await createServerSupabaseClient();

  const { error } = await supabase.from("jobs").update({ status } as never).eq("id", jobId);

  if (error) {
    throw error;
  }

  revalidatePath("/recruteur/offres");
}

export async function createChariowTrainingAction(
  _previousState: ChariowTrainingSubmissionState,
  formData: FormData,
): Promise<ChariowTrainingSubmissionState> {
  const title = String(formData.get("title") ?? "").trim();
  const organizationName = String(formData.get("organization_name") ?? "").trim();
  const sectorSlug = String(formData.get("sector_slug") ?? "").trim();
  const description = String(formData.get("description") ?? "").trim();
  const externalUrl = String(formData.get("external_url") ?? "").trim();

  if (!title || !organizationName || !sectorSlug || !description || !externalUrl) {
    return {
      status: "error",
      message: "Complete le titre, le nom du formateur, la categorie, la description et le lien Chariow.",
    };
  }

  if (!trainingCategorySlugs.includes(sectorSlug as (typeof trainingCategorySlugs)[number])) {
    return {
      status: "error",
      message: "Choisis une categorie prevue pour les formations premium.",
    };
  }

  if (!isChariowUrl(externalUrl)) {
    return {
      status: "error",
      message: "Le lien doit pointer vers un domaine Chariow valide.",
    };
  }

  if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
    return {
      status: "error",
      message: "Supabase n'est pas encore configure dans l'environnement local. Le formulaire est pret, mais il ne peut pas encore enregistrer.",
    };
  }

  const category = getCategoryBySlug(sectorSlug);

  if (!category) {
    return {
      status: "error",
      message: "Categorie introuvable.",
    };
  }

  const supabase = await createServerSupabaseClient();
  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();

  if (authError || !user) {
    return {
      status: "error",
      message: "Connecte-toi avec un compte recruteur pour envoyer ta boutique Chariow.",
    };
  }

  const { data: isRecruiter, error: recruiterError } = await supabase.rpc("is_recruiter");

  if (recruiterError) {
    return {
      status: "error",
      message: "Impossible de verifier le profil pour le moment.",
    };
  }

  if (!isRecruiter) {
    return {
      status: "error",
      message: "Ce formulaire est reserve aux comptes recruteur ou formateur.",
    };
  }

  const baseSlug = slugify(`${title}-${organizationName}`);
  const slug = `${baseSlug || "formation-chariow"}-${Date.now().toString(36)}`;

  const payload: JobInsert = {
    created_by: user.id,
    title,
    slug,
    description,
    type: "training",
    sector_slug: category.slug,
    sector_label: category.label,
    source_kind: "chariow",
    source_name: "Chariow",
    organization_name: organizationName,
    location_city: "En ligne",
    external_url: externalUrl,
    status: "pending_review",
    is_verified: false,
    is_premium: true,
  };

  const { error } = await supabase.from("jobs").insert(payload as never);

  if (error) {
    return {
      status: "error",
      message: "La soumission a echoue. Verifie le lien Chariow et reessaie.",
    };
  }

  revalidatePath("/recruteur/offres");
  revalidatePath("/recruteur/offres/chariow");
  revalidatePath("/formations-premium");

  return {
    status: "success",
    message: "Boutique Chariow enregistree. Elle passera d'abord en verification avant publication.",
    submittedTitle: title,
    submittedUrl: externalUrl,
  };
}
