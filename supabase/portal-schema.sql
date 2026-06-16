-- Tax Business Stockholm AB client portal
-- Run this in the Supabase SQL editor after creating the project.

create extension if not exists pgcrypto;

create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  email text,
  role text not null default 'client' check (role in ('client', 'admin')),
  created_at timestamptz not null default now()
);

create table if not exists public.documents (
  id uuid primary key default gen_random_uuid(),
  owner_id uuid not null references auth.users(id) on delete cascade,
  uploader_email text,
  file_name text not null,
  file_path text not null unique,
  file_size bigint,
  content_type text,
  created_at timestamptz not null default now()
);

alter table public.profiles enable row level security;
alter table public.documents enable row level security;

create or replace function public.is_admin()
returns boolean
language sql
security definer
set search_path = public
as $$
  select exists (
    select 1
    from public.profiles
    where id = auth.uid()
      and role = 'admin'
  );
$$;

create or replace function public.create_profile_for_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.profiles (id, email)
  values (new.id, new.email)
  on conflict (id) do update set email = excluded.email;
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
after insert on auth.users
for each row execute function public.create_profile_for_new_user();

drop policy if exists "Users can read own profile" on public.profiles;
create policy "Users can read own profile"
on public.profiles for select
using (id = auth.uid() or public.is_admin());

drop policy if exists "Users can read own documents" on public.documents;
create policy "Users can read own documents"
on public.documents for select
using (owner_id = auth.uid() or public.is_admin());

drop policy if exists "Users can create own documents" on public.documents;
create policy "Users can create own documents"
on public.documents for insert
with check (owner_id = auth.uid());

insert into storage.buckets (id, name, public)
values ('client-documents', 'client-documents', false)
on conflict (id) do nothing;

drop policy if exists "Users can upload own files" on storage.objects;
create policy "Users can upload own files"
on storage.objects for insert
with check (
  bucket_id = 'client-documents'
  and auth.uid()::text = (storage.foldername(name))[1]
);

drop policy if exists "Users can read own files" on storage.objects;
create policy "Users can read own files"
on storage.objects for select
using (
  bucket_id = 'client-documents'
  and (
    auth.uid()::text = (storage.foldername(name))[1]
    or public.is_admin()
  )
);

-- After Ana Maria has logged in once, make her account admin by replacing the email:
-- update public.profiles set role = 'admin' where email = 'ana@example.com';
