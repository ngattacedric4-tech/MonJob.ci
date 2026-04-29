import { createServerSupabaseClient } from "@/lib/supabase/server";
import type {
  ApplicationInsert,
  ApplicationUpdate,
  JobInsert,
  JobUpdate,
  ProfileInsert,
} from "@/lib/db/types";

export async function upsertProfile(payload: ProfileInsert) {
  const supabase = await createServerSupabaseClient();

  return supabase.from("profiles").upsert(payload as never).select().single();
}

export async function createJob(payload: JobInsert) {
  const supabase = await createServerSupabaseClient();

  return supabase.from("jobs").insert(payload as never).select().single();
}

export async function updateJob(jobId: string, payload: JobUpdate) {
  const supabase = await createServerSupabaseClient();

  return supabase.from("jobs").update(payload as never).eq("id", jobId).select().single();
}

export async function submitApplication(payload: ApplicationInsert) {
  const supabase = await createServerSupabaseClient();

  return supabase.from("applications").insert(payload as never).select().single();
}

export async function updateApplication(applicationId: string, payload: ApplicationUpdate) {
  const supabase = await createServerSupabaseClient();

  return supabase
    .from("applications")
    .update(payload as never)
    .eq("id", applicationId)
    .select()
    .single();
}
