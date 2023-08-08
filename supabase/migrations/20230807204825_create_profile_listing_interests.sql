create table public.profile_listing_interests (
  profile_id uuid references profiles(profile_id),
  listing_id bigint references listings(listing_id),

  active boolean not null default true,
  updated_at timestamp with time zone not null default timezone ('utc'::text, now()),

  constraint profile_listing_interests_pkey primary key (profile_id, listing_id)
) tablespace pg_default;

-- This trigger automatically updates the updated_at column when the row is updated.
create function public.profile_listing_interests_updated_at() RETURNS trigger
  language plpgsql
  as $$
begin
  new.updated_at = now();
  return new;
end;
$$;
create trigger profile_listing_interests_updated_at
  before update on public.profile_listing_interests
  for each row
  execute procedure public.profile_listing_interests_updated_at();
