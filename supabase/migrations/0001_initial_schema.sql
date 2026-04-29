create extension if not exists pgcrypto;

do $$
begin
  create type public.app_role as enum ('candidate', 'recruiter');
exception
  when duplicate_object then null;
end $$;

do $$
begin
  create type public.opportunity_type as enum ('job', 'internship', 'training');
exception
  when duplicate_object then null;
end $$;

do $$
begin
  create type public.job_status as enum ('draft', 'pending_review', 'published', 'archived');
exception
  when duplicate_object then null;
end $$;

do $$
begin
  create type public.application_status as enum (
    'submitted',
    'reviewing',
    'interview',
    'accepted',
    'rejected',
    'withdrawn'
  );
exception
  when duplicate_object then null;
end $$;

do $$
begin
  create type public.source_kind as enum ('partner_site', 'institution', 'social', 'chariow', 'direct');
exception
  when duplicate_object then null;
end $$;

create or replace function public.handle_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = timezone('utc', now());
  return new;
end;
$$;

create table if not exists public.profiles (
  id uuid primary key references auth.users (id) on delete cascade,
  role public.app_role not null default 'candidate',
  full_name text,
  phone text,
  city text,
  headline text,
  bio text,
  skills text[] not null default '{}',
  avatar_url text,
  cv_path text,
  is_staff boolean not null default false,
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now())
);

create table if not exists public.jobs (
  id uuid primary key default gen_random_uuid(),
  created_by uuid references public.profiles (id) on delete set null,
  title text not null,
  slug text not null unique,
  description text not null,
  type public.opportunity_type not null,
  sector_slug text not null,
  sector_label text not null,
  source_kind public.source_kind not null,
  source_name text not null,
  organization_name text,
  location_city text,
  external_url text,
  status public.job_status not null default 'pending_review',
  is_verified boolean not null default false,
  verified_at timestamptz,
  verified_by uuid references public.profiles (id) on delete set null,
  is_premium boolean not null default false,
  published_at timestamptz,
  expires_at timestamptz,
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now()),
  constraint jobs_slug_format check (slug ~ '^[a-z0-9]+(?:-[a-z0-9]+)*$'),
  constraint jobs_chariow_external_url_check check (
    source_kind <> 'chariow'
    or (
      external_url is not null
      and external_url ~* '^https?://([a-z0-9-]+\\.)*chariow\\.com(/.*)?$'
    )
  )
);

create table if not exists public.applications (
  id uuid primary key default gen_random_uuid(),
  job_id uuid not null references public.jobs (id) on delete cascade,
  candidate_id uuid not null references public.profiles (id) on delete cascade,
  status public.application_status not null default 'submitted',
  cover_letter text,
  resume_path text,
  applied_at timestamptz not null default timezone('utc', now()),
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now()),
  constraint applications_unique_candidate_per_job unique (job_id, candidate_id)
);

create index if not exists jobs_type_idx on public.jobs (type);
create index if not exists jobs_sector_slug_idx on public.jobs (sector_slug);
create index if not exists jobs_status_idx on public.jobs (status);
create index if not exists jobs_is_verified_idx on public.jobs (is_verified);
create index if not exists jobs_source_kind_idx on public.jobs (source_kind);
create index if not exists jobs_published_at_idx on public.jobs (published_at desc);
create index if not exists applications_candidate_idx on public.applications (candidate_id);
create index if not exists applications_job_idx on public.applications (job_id);

drop trigger if exists set_profiles_updated_at on public.profiles;
create trigger set_profiles_updated_at
before update on public.profiles
for each row
execute function public.handle_updated_at();

drop trigger if exists set_jobs_updated_at on public.jobs;
create trigger set_jobs_updated_at
before update on public.jobs
for each row
execute function public.handle_updated_at();

drop trigger if exists set_applications_updated_at on public.applications;
create trigger set_applications_updated_at
before update on public.applications
for each row
execute function public.handle_updated_at();

create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.profiles (id, role, full_name, phone)
  values (
    new.id,
    case
      when new.raw_user_meta_data ->> 'role' = 'recruiter' then 'recruiter'::public.app_role
      else 'candidate'::public.app_role
    end,
    coalesce(new.raw_user_meta_data ->> 'full_name', split_part(coalesce(new.email, ''), '@', 1)),
    new.raw_user_meta_data ->> 'phone'
  )
  on conflict (id) do nothing;

  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
after insert on auth.users
for each row
execute function public.handle_new_user();

create or replace function public.is_staff()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1
    from public.profiles
    where id = auth.uid() and is_staff = true
  );
$$;

create or replace function public.is_recruiter()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1
    from public.profiles
    where id = auth.uid() and role = 'recruiter'
  );
$$;

create or replace function public.is_candidate()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1
    from public.profiles
    where id = auth.uid() and role = 'candidate'
  );
$$;

alter table public.profiles enable row level security;
alter table public.jobs enable row level security;
alter table public.applications enable row level security;

create policy "profiles_select_self_or_staff"
on public.profiles
for select
to authenticated
using (auth.uid() = id or public.is_staff());

create policy "profiles_insert_self"
on public.profiles
for insert
to authenticated
with check (auth.uid() = id);

create policy "profiles_update_self_or_staff"
on public.profiles
for update
to authenticated
using (auth.uid() = id or public.is_staff())
with check (auth.uid() = id or public.is_staff());

create policy "jobs_select_published"
on public.jobs
for select
to anon, authenticated
using (
  status = 'published'
  and is_verified = true
);

create policy "jobs_select_own"
on public.jobs
for select
to authenticated
using (auth.uid() = created_by);

create policy "jobs_select_staff"
on public.jobs
for select
to authenticated
using (public.is_staff());

create policy "jobs_insert_recruiter"
on public.jobs
for insert
to authenticated
with check (
  auth.uid() = created_by
  and public.is_recruiter()
);

create policy "jobs_update_owner"
on public.jobs
for update
to authenticated
using (
  auth.uid() = created_by
  and public.is_recruiter()
)
with check (
  auth.uid() = created_by
  and public.is_recruiter()
  and is_verified = false
  and verified_by is null
  and status in ('draft', 'pending_review', 'archived')
);

create policy "jobs_update_staff"
on public.jobs
for update
to authenticated
using (public.is_staff())
with check (public.is_staff());

create policy "jobs_delete_owner"
on public.jobs
for delete
to authenticated
using (
  auth.uid() = created_by
  and public.is_recruiter()
  and status in ('draft', 'pending_review', 'archived')
);

create policy "jobs_delete_staff"
on public.jobs
for delete
to authenticated
using (public.is_staff());

create policy "applications_select_candidate"
on public.applications
for select
to authenticated
using (auth.uid() = candidate_id);

create policy "applications_select_recruiter"
on public.applications
for select
to authenticated
using (
  exists (
    select 1
    from public.jobs
    where jobs.id = applications.job_id
      and jobs.created_by = auth.uid()
  )
);

create policy "applications_select_staff"
on public.applications
for select
to authenticated
using (public.is_staff());

create policy "applications_insert_candidate"
on public.applications
for insert
to authenticated
with check (
  auth.uid() = candidate_id
  and public.is_candidate()
  and exists (
    select 1
    from public.jobs
    where jobs.id = applications.job_id
      and jobs.status = 'published'
      and jobs.is_verified = true
  )
);

create policy "applications_update_recruiter"
on public.applications
for update
to authenticated
using (
  exists (
    select 1
    from public.jobs
    where jobs.id = applications.job_id
      and jobs.created_by = auth.uid()
  )
)
with check (
  exists (
    select 1
    from public.jobs
    where jobs.id = applications.job_id
      and jobs.created_by = auth.uid()
  )
);

create policy "applications_update_staff"
on public.applications
for update
to authenticated
using (public.is_staff())
with check (public.is_staff());

insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values (
  'cvs',
  'cvs',
  false,
  5242880,
  array[
    'application/pdf',
    'application/msword',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
  ]
)
on conflict (id) do update
set
  public = excluded.public,
  file_size_limit = excluded.file_size_limit,
  allowed_mime_types = excluded.allowed_mime_types;

create policy "cvs_select_own"
on storage.objects
for select
to authenticated
using (
  bucket_id = 'cvs'
  and (storage.foldername(name))[1] = auth.uid()::text
  and coalesce((storage.foldername(name))[2], '') = 'cv'
);

create policy "cvs_insert_own"
on storage.objects
for insert
to authenticated
with check (
  bucket_id = 'cvs'
  and (storage.foldername(name))[1] = auth.uid()::text
  and coalesce((storage.foldername(name))[2], '') = 'cv'
);

create policy "cvs_update_own"
on storage.objects
for update
to authenticated
using (
  bucket_id = 'cvs'
  and (storage.foldername(name))[1] = auth.uid()::text
  and coalesce((storage.foldername(name))[2], '') = 'cv'
)
with check (
  bucket_id = 'cvs'
  and (storage.foldername(name))[1] = auth.uid()::text
  and coalesce((storage.foldername(name))[2], '') = 'cv'
);

create policy "cvs_delete_own"
on storage.objects
for delete
to authenticated
using (
  bucket_id = 'cvs'
  and (storage.foldername(name))[1] = auth.uid()::text
  and coalesce((storage.foldername(name))[2], '') = 'cv'
);
