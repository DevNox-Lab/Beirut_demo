-- ============================================================================
-- Beirut Dishes — Database Schema (Supabase / PostgreSQL)
-- ============================================================================
-- Apply with either:
--   • Supabase Dashboard → SQL Editor → paste & run, or
--   • psql "$DATABASE_URL" -f supabase/schema.sql
-- ============================================================================

-- Reservation lifecycle states.
do $$
begin
  if not exists (select 1 from pg_type where typname = 'reservation_status') then
    create type reservation_status as enum ('pending', 'confirmed', 'cancelled');
  end if;
end$$;

-- ----------------------------------------------------------------------------
-- reservations
-- ----------------------------------------------------------------------------
create table if not exists public.reservations (
  id            uuid                primary key default gen_random_uuid(),
  customer_name text,
  phone         text,
  email         text,
  date          date                not null,
  time          time                not null,
  guests        integer             not null default 2 check (guests > 0 and guests <= 20),
  table_number  text,
  status        reservation_status  not null default 'pending',
  created_at    timestamptz         not null default now()
);

-- Helpful indexes for the admin dashboard queries.
create index if not exists reservations_date_idx   on public.reservations (date);
create index if not exists reservations_status_idx on public.reservations (status);
create index if not exists reservations_slot_idx   on public.reservations (date, time);

-- ----------------------------------------------------------------------------
-- Row Level Security
-- ----------------------------------------------------------------------------
-- Enable RLS, then define policies that fit your auth model.
alter table public.reservations enable row level security;

-- Allow anonymous guests to create a reservation from the public site.
drop policy if exists "Public can create reservations" on public.reservations;
create policy "Public can create reservations"
  on public.reservations
  for insert
  to anon
  with check (true);

-- Only authenticated staff can read / update / delete.
-- (Reads/writes from the server should use the service-role key, which bypasses RLS.)
drop policy if exists "Staff can manage reservations" on public.reservations;
create policy "Staff can manage reservations"
  on public.reservations
  for all
  to authenticated
  using (true)
  with check (true);

-- ----------------------------------------------------------------------------
-- Seed data (optional — comment out for production)
-- ----------------------------------------------------------------------------
-- insert into public.reservations (customer_name, phone, date, time, guests, table_number, status)
-- values ('Karim Haddad', '+212600000000', current_date, '20:00', 4, 'T2', 'confirmed');
