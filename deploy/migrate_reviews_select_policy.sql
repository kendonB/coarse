-- Migration: tighten reviews SELECT policy to require x-review-id header
-- Run this in the Supabase SQL editor on existing deployments.

alter table reviews enable row level security;

-- Remove legacy permissive policy and any prior named variants.
drop policy if exists "Anyone can view reviews" on reviews;
drop policy if exists "Anyone can view reviews by id" on reviews;

create policy "Anyone can view reviews by id"
  on reviews
  for select
  using (
    id = case
      when coalesce(current_setting('request.headers', true)::json ->> 'x-review-id', '')
        ~* '^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$'
      then ((current_setting('request.headers', true)::json ->> 'x-review-id')::uuid)
      else null
    end
  );
