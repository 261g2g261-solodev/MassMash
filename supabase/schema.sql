-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- PROFILES
-- Stores basic user info, synced with auth.users
create table profiles (
  id uuid references auth.users on delete cascade primary key,
  email text unique not null,
  first_name text,
  last_name text,
  avatar_url text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- SELLER PROFILES
-- Created only when a user's verification is approved
create table seller_profiles (
  id uuid references profiles(id) on delete cascade primary key,
  legal_name text not null,
  phone text not null,
  city text not null,
  postal_code text not null,
  description text,
  rating numeric(3,2) default 0,
  review_count integer default 0,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- VERIFICATION REQUESTS
-- Seller application tracking
create type verification_status as enum ('pending', 'approved', 'rejected');

create table verification_requests (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references profiles(id) on delete cascade not null,
  legal_name text not null,
  phone text not null,
  city text not null,
  postal_code text not null,
  id_document_url text, -- Storage bucket reference
  status verification_status default 'pending' not null,
  rejection_reason text,
  submitted_at timestamp with time zone default timezone('utc'::text, now()) not null,
  reviewed_at timestamp with time zone,
  reviewed_by uuid references profiles(id) -- Admin user ID
);

-- CATEGORIES
-- Product categories
create table categories (
  id uuid default uuid_generate_v4() primary key,
  slug text unique not null,
  name_en text not null,
  name_ar text not null,
  icon_name text,
  parent_id uuid references categories(id) on delete set null,
  sort_order integer default 0
);

-- LISTINGS
-- Products/services for sale
create type listing_status as enum ('active', 'sold', 'hidden', 'deleted', 'moderation_pending');

create table listings (
  id uuid default uuid_generate_v4() primary key,
  seller_id uuid references seller_profiles(id) on delete cascade not null,
  category_id uuid references categories(id) on delete restrict not null,
  title text not null,
  description text not null,
  price numeric(10,2) not null,
  currency text default 'USD' not null,
  city text not null,
  postal_code text,
  status listing_status default 'active' not null,
  view_count integer default 0,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- LISTING IMAGES
create table listing_images (
  id uuid default uuid_generate_v4() primary key,
  listing_id uuid references listings(id) on delete cascade not null,
  image_url text not null,
  sort_order integer default 0,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- FAVORITES
-- User bookmarked listings
create table favorites (
  user_id uuid references profiles(id) on delete cascade not null,
  listing_id uuid references listings(id) on delete cascade not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  primary key (user_id, listing_id)
);

-- CONVERSATIONS
create table conversations (
  id uuid default uuid_generate_v4() primary key,
  listing_id uuid references listings(id) on delete cascade not null,
  buyer_id uuid references profiles(id) on delete cascade not null,
  seller_id uuid references seller_profiles(id) on delete cascade not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null,
  unique(listing_id, buyer_id)
);

-- MESSAGES
create table messages (
  id uuid default uuid_generate_v4() primary key,
  conversation_id uuid references conversations(id) on delete cascade not null,
  sender_id uuid references profiles(id) on delete cascade not null,
  content text not null,
  is_read boolean default false not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- REPORTS
-- Moderation feature
create type report_status as enum ('pending', 'reviewed', 'action_taken', 'dismissed');
create type report_reason as enum ('spam', 'inappropriate', 'fraud', 'other');

create table reports (
  id uuid default uuid_generate_v4() primary key,
  reporter_id uuid references profiles(id) on delete set null not null,
  reported_user_id uuid references profiles(id) on delete cascade,
  reported_listing_id uuid references listings(id) on delete cascade,
  reason report_reason not null,
  description text,
  status report_status default 'pending' not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  resolved_at timestamp with time zone,
  resolved_by uuid references profiles(id) -- Admin
);
-- Ensure either a user or listing is reported, but not both or neither
alter table reports add constraint check_report_target
check ((reported_user_id is not null and reported_listing_id is null) or (reported_user_id is null and reported_listing_id is not null));

-- BLOCKED USERS
create table blocked_users (
  blocker_id uuid references profiles(id) on delete cascade not null,
  blocked_id uuid references profiles(id) on delete cascade not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  primary key (blocker_id, blocked_id)
);

-- LOCATIONS
-- Reference table for filtering, though listings currently just store text
create table locations (
  id uuid default uuid_generate_v4() primary key,
  country_code text not null,
  city_name_en text not null,
  city_name_ar text not null,
  postal_code text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- RLS (Row Level Security) - Basic setup examples
alter table profiles enable row level security;
alter table seller_profiles enable row level security;
alter table verification_requests enable row level security;
alter table listings enable row level security;
alter table messages enable row level security;
alter table conversations enable row level security;

-- Policies (Simplified for MVP, would need more granularity in prod)
create policy "Public profiles are viewable by everyone." on profiles for select using (true);
create policy "Users can insert their own profile." on profiles for insert with check (auth.uid() = id);
create policy "Users can update own profile." on profiles for update using (auth.uid() = id);

create policy "Seller profiles are viewable by everyone." on seller_profiles for select using (true);

create policy "Active listings are viewable by everyone." on listings for select using (status = 'active');
create policy "Sellers can manage their listings." on listings for all using (auth.uid() = seller_id);

create policy "Users can view their conversations." on conversations for select using (auth.uid() = buyer_id or auth.uid() = seller_id);
create policy "Users can insert conversations." on conversations for insert with check (auth.uid() = buyer_id);

create policy "Users can view their messages." on messages for select using (
  exists (select 1 from conversations c where c.id = conversation_id and (c.buyer_id = auth.uid() or c.seller_id = auth.uid()))
);
create policy "Users can insert messages." on messages for insert with check (auth.uid() = sender_id);
