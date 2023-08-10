create table public.profile_listing_interests (
  profile_id uuid references profiles(profile_id),
  listing_id bigint references listings(listing_id),

  active boolean not null default true,
  updated_at timestamp with time zone not null default timezone ('utc'::text, now()),

  constraint profile_listing_interests_pkey primary key (profile_id, listing_id)
) tablespace pg_default;

-- This trigger automatically updates the updated_at column when the row is updated.
create trigger on_profile_listing_interests_updated
  before update on public.profile_listing_interests
  for each row
  execute procedure public.update_timestamp();

-- Profiles that favorited a listing
create or replace
  function public.listing_favorited_by(
    current_profile_id uuid default null,
    selected_listing_id bigint default null
  )
returns Table (profile_id uuid, full_name text, avatar_url text)
  language plpgsql
  as $$
begin
  return query
    select p.profile_id, p.full_name, p.avatar_url
    from public.profiles p
    join public.profile_listing_interests pli on pli.profile_id = p.profile_id
    where pli.listing_id = selected_listing_id
      and (current_profile_id IS NULL OR p.profile_id != current_profile_id)
      and pli.active = true;
end;
$$;