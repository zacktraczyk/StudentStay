create table public.profile_listing_interests (
  profile_id uuid references profiles(profile_id),
  listing_id bigint references listings(listing_id),

  active boolean not null default true,
  updated_at timestamp with time zone not null default timezone ('utc'::text, now()),

  constraint profile_listing_interests_pkey primary key (profile_id, listing_id)
) tablespace pg_default;