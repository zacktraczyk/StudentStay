
create table public.housing_preferences (
  profile_id uuid not null primary key references profiles(profile_id) on delete cascade,
  private_preferences boolean default false, -- keep preferences private from other users

  -- property
  budget_min int,
  budget_max int,

  -- roomates
  prefered_gender text default 'any' check (prefered_gender in ('any', 'male', 'female', 'nonbinary', 'transgender')),

  age_min int,
  age_max int,

  -- NOTE: should be scale maybe ? (e.g. 8pm - 5am usual bedtime, 1-10 messy to clean)
  sleeping_habits int default 3 check (sleeping_habits between 1 and 5),
  noise_sensitivity int default 3 check (noise_sensitivity between 1 and 5),

  personal_cleanliness int default 3 check (personal_cleanliness between 1 and 5),
  cleanliness_preference int default 3 check (cleanliness_preference between 1 and 5),

  home_social_inclination int default 3 check (home_social_inclination between 1 and 5),
  social_battery int default 3 check (social_battery between 1 and 5),

  alcohol_preference int default 3 check (alcohol_preference between 1 and 5),
  smoking_preference int default 3 check (smoking_preference between 1 and 5),
  dog_preference int default 3 check (dog_preference between 1 and 5),
  cat_preference int default 3 check (cat_preference between 1 and 5),

  updated_at timestamp with time zone not null default now()
);

-- Set up Row Level Security (RLS)
-- See https://supabase.com/docs/guides/auth/row-level-security for more details.
alter table housing_preferences
  enable row level security;

create policy "Public housing preferences are viewable by everyone." on housing_preferences
  for select using (private_preferences = false);

create policy "Users can insert their own housing preferences." on housing_preferences
  for insert with check (auth.uid() = profile_id);

create policy "Users can update own housing preferences." on profiles
  for update using (auth.uid() = profile_id);

-- This trigger automatically creates a profile entry when a new user signs up via Supabase Auth.
-- See https://supabase.com/docs/guides/auth/managing-user-data#using-triggers for more details.
create function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (profile_id, full_name, avatar_url)
  values (new.id, new.raw_user_meta_data->>'full_name', new.raw_user_meta_data->>'avatar_url');
  insert into public.housing_preferences (profile_id)
  values (new.id);
  return new;
end;
$$ language plpgsql security definer;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- This trigger automatically updates the updated_at column when the row is updated.
create trigger on_housing_preferences_updated
  before update on public.housing_preferences
  for each row
  execute procedure public.update_timestamp();