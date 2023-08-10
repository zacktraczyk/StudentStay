create extension if not exists postgis with schema extensions;

create table public.listings (
  listing_id bigint generated by default as identity not null,
  listing_type text not null check (listing_type in ('RENTAL', 'SUBLEASE')),
  status text not null check (status in ('NOT_LISTED', 'FOR_RENT', 'RENTED')),

  building_name text,
  description text,

  address_full text,
  address_street text,
  address_city text,
  address_state text,
  address_zipcode text, -- is integer best ?
  location geography(POINT),

  square_footage integer, -- is integer best ?
  baths real,
  beds integer,

  preview_img_src text,
  additional_img_srcs text[],

  ranged_price boolean not null, -- is price a range or single value
  price int, -- monthly cost if estimatedPrice is false
  price_estimate_low int, -- monthly cost if estimatedPrice is true
  price_estimate_high int, -- monthly cost if estimatedPrice is true

  -- Should be broken out "lister" or "PropertyOwner" table
  listing_contact_name text,
  listing_contact_email text,
  listing_contact_phone text,

  listing_source text not null, -- where listing was found
  listing_source_id text not null unique, -- id of listing on listingSource
  listing_source_detail_url text, -- find more information on listing

  created_at timestamp with time zone not null default timezone ('utc'::text, now()),
  listed_at timestamp with time zone not null default timezone ('utc'::text, now()),
  listing_start_date timestamp with time zone,
  updated_at timestamp with time zone not null default timezone ('utc'::text, now()),

  constraint listings_pkey primary key (listing_id)
) tablespace pg_default;

-- Set up Row Level Security (RLS)
-- See https://supabase.com/docs/guides/auth/row-level-security for more details.
alter table listings
  enable row level security;

create policy "Public listings are viewable by everyone." on listings
  for select using (true);

-- Grab Listings with GeoJSON
create or replace function listings_with_geojson()
returns JSON
language sql
as $$
  SELECT json_build_object(
	  'type', 'FeatureCollection',
	  'features', json_agg(ST_AsGeoJSON(t.*)::json)
  )
  FROM (SELECT  * FROM public.listings ORDER BY listing_id DESC) as t;
$$;

CREATE INDEX if not exists "listings_geo_index" ON "public"."listings" USING "gist" ("location");