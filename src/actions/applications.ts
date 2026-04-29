"use server";

import { revalidatePath } from "next/cache";

import type { ApplicationInsert, ApplicationStatus } from "@/lib/db/types";
import { createServerSupabaseClient } from "@/lib/supabase/server";

export async function submitApplicationAction(payload: Omit<ApplicationInsert, "candidate_id">) {
  const supabase = await createServerSupabaseClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    throw new Error("Authentification requise.");
  }

  const insertPayload: ApplicationInsert = {
    ...payload,
    candidate_id: user.id,
  };

  const { error } = await supabase.from("applications").insert(insertPayload as never);

  if (error) {
    throw error;
  }

  revalidatePath("/candidat/candidatures");
}

export async function updateApplicationStatusAction(
  applicationId: string,
  status: ApplicationStatus,
) {
  const supabase = await createServerSupabaseClient();

  const { error } = await supabase
    .from("applications")
    .update({ status } as never)
    .eq("id", applicationId);

  if (error) {
    throw error;
  }

  revalidatePath("/recruteur/candidatures");
}
