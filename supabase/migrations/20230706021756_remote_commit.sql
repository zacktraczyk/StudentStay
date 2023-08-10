-- Create a table for public profiles
create table profiles (
  profile_id uuid references auth.users on delete cascade not null primary key,
  full_name text,
  avatar_url text,

  instagram_profile text,
  twitter_profile text,
  tictok_profile text,

  updated_at timestamp with time zone
);
-- Set up Row Level Security (RLS)
-- See https://supabase.com/docs/guides/auth/row-level-security for more details.
alter table profiles
  enable row level security;

create policy "Public profiles are viewable by everyone." on profiles
  for select using (true);

create policy "Users can insert their own profile." on profiles
  for insert with check (auth.uid() = profile_id);

create policy "Users can update own profile." on profiles
  for update using (auth.uid() = profile_id);

-- This trigger automatically updates the updated_at column when the row is updated.
create function public.update_timestamp()
returns trigger
  language plpgsql
  as $$
begin
  new.updated_at = now();
  return new;
end;
$$;
create trigger on_profile_updated
  before update on public.profiles
  for each row
  execute procedure public.update_timestamp();

-- Set up Storage!
insert into storage.buckets (id, name)
  values ('avatars', 'avatars');

-- Set up access controls for storage.
-- See https://supabase.com/docs/guides/storage#policy-examples for more details.
create policy "Avatar images are publicly accessible." on storage.objects
  for select using (bucket_id = 'avatars');

create policy "Anyone can upload an avatar." on storage.objects
  for insert with check (bucket_id = 'avatars');