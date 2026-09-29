-- ODA-AZ-ADÓ leadkezelés – Supabase/Postgres
-- Biztonsági modell:
-- - publikus böngésző nem ír közvetlenül a Supabase-be
-- - minden adatbázis művelet a Next.js szerveroldali API route-jain keresztül történik
-- - public schema tábláin RLS aktív, anon/authenticated hozzáférés visszavonva
-- - a szerver kizárólag SUPABASE_SECRET_KEY / legacy service_role kulcsot használ

create extension if not exists pgcrypto;

create table if not exists public.leads (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  status text not null default 'Új érdeklődő',
  source text not null default 'odaazado.hu',
  name text not null,
  company text not null,
  email text not null,
  phone text not null,
  tax_id text not null,
  monthly_documents text not null,
  bank_accounts text not null,
  employees text not null,
  foreign_transactions text not null,
  reason text not null,
  planned_start text not null,
  message text not null default '',
  privacy_accepted_at timestamptz not null default now(),
  internal_note text not null default '',
  ip_hash text,
  user_agent text,
  notification_status text not null default 'pending',
  notification_sent_at timestamptz,
  notification_error text not null default ''
);

-- Ha egy korábbi verzió már létrehozta a táblát, ezek biztonságosan hozzáadják az új mezőket.
alter table public.leads add column if not exists notification_status text not null default 'pending';
alter table public.leads add column if not exists notification_sent_at timestamptz;
alter table public.leads add column if not exists notification_error text not null default '';

alter table public.leads drop constraint if exists leads_status_check;
alter table public.leads add constraint leads_status_check check (status in (
  'Új érdeklődő',
  'Kapcsolatfelvétel',
  'Egyeztetés alatt',
  'Ajánlat kiküldve',
  'Megnyerte',
  'Nem aktuális',
  'Elutasítva'
));

alter table public.leads drop constraint if exists leads_monthly_documents_check;
alter table public.leads add constraint leads_monthly_documents_check check (
  monthly_documents in ('0–50', '51–100', '101–250', '251–500', '500+')
);

alter table public.leads drop constraint if exists leads_bank_accounts_check;
alter table public.leads add constraint leads_bank_accounts_check check (
  bank_accounts in ('1', '2', '3', '4+')
);

alter table public.leads drop constraint if exists leads_employees_check;
alter table public.leads add constraint leads_employees_check check (
  employees in ('0–3', '4–10', '11–25', '26+')
);

alter table public.leads drop constraint if exists leads_foreign_transactions_check;
alter table public.leads add constraint leads_foreign_transactions_check check (
  foreign_transactions in ('Nincs', 'EU-n belüli ügyletek', 'EU-n kívüli ügyletek', 'Mindkettő')
);

alter table public.leads drop constraint if exists leads_reason_check;
alter table public.leads add constraint leads_reason_check check (
  reason in ('Könyvelőt váltanék', 'Új vállalkozás', 'Meglévő vállalkozás új könyvelőt keres', 'Könyvelési szolgáltatás bővítése', 'Adótanácsadás', 'Egyéb')
);

alter table public.leads drop constraint if exists leads_planned_start_check;
alter table public.leads add constraint leads_planned_start_check check (
  planned_start in ('Azonnal', '1–3 hónapon belül', '2027. január 1-től', 'Később')
);

alter table public.leads drop constraint if exists leads_notification_status_check;
alter table public.leads add constraint leads_notification_status_check check (
  notification_status in ('pending', 'sent', 'failed', 'not_configured')
);

create index if not exists leads_created_at_idx on public.leads (created_at desc);
create index if not exists leads_status_created_at_idx on public.leads (status, created_at desc);
create index if not exists leads_email_idx on public.leads (email);
create index if not exists leads_company_idx on public.leads (company);

create table if not exists public.lead_events (
  id bigint generated always as identity primary key,
  lead_id uuid not null references public.leads(id) on delete cascade,
  created_at timestamptz not null default now(),
  event_type text not null,
  from_status text,
  to_status text,
  details text not null default ''
);

alter table public.lead_events add column if not exists details text not null default '';
alter table public.lead_events drop constraint if exists lead_events_event_type_check;
alter table public.lead_events add constraint lead_events_event_type_check check (event_type in (
  'created',
  'status_changed',
  'note_updated',
  'notification_sent',
  'notification_failed',
  'notification_skipped'
));

create index if not exists lead_events_lead_id_created_at_idx
  on public.lead_events (lead_id, created_at desc);

create table if not exists public.contact_rate_limits (
  ip_hash text primary key,
  window_started_at timestamptz not null default now(),
  request_count integer not null default 0 check (request_count >= 0),
  updated_at timestamptz not null default now()
);

create table if not exists public.admin_login_rate_limits (
  ip_hash text primary key,
  window_started_at timestamptz not null default now(),
  request_count integer not null default 0 check (request_count >= 0),
  updated_at timestamptz not null default now()
);

-- updated_at adatbázis oldali biztosítása.
create or replace function public.set_updated_at()
returns trigger
language plpgsql
set search_path = ''
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

revoke all on function public.set_updated_at() from public;

DROP TRIGGER IF EXISTS leads_set_updated_at ON public.leads;
create trigger leads_set_updated_at
before update on public.leads
for each row execute function public.set_updated_at();

DROP TRIGGER IF EXISTS contact_rate_limits_set_updated_at ON public.contact_rate_limits;
create trigger contact_rate_limits_set_updated_at
before update on public.contact_rate_limits
for each row execute function public.set_updated_at();

DROP TRIGGER IF EXISTS admin_login_rate_limits_set_updated_at ON public.admin_login_rate_limits;
create trigger admin_login_rate_limits_set_updated_at
before update on public.admin_login_rate_limits
for each row execute function public.set_updated_at();

-- RLS minden Data API-n keresztül elérhető public táblán.
alter table public.leads enable row level security;
alter table public.lead_events enable row level security;
alter table public.contact_rate_limits enable row level security;
alter table public.admin_login_rate_limits enable row level security;

-- Nincs publikus kliens-hozzáférés. Az admin és az űrlap is a saját Next.js API-n keresztül működik.
revoke all on table public.leads from anon, authenticated;
revoke all on table public.lead_events from anon, authenticated;
revoke all on table public.contact_rate_limits from anon, authenticated;
revoke all on table public.admin_login_rate_limits from anon, authenticated;

-- Legacy service_role kompatibilitás. Az új sb_secret_* kulcs szerveroldali használatára is alkalmas.
grant all on table public.leads to service_role;
grant all on table public.lead_events to service_role;
grant all on table public.contact_rate_limits to service_role;
grant all on table public.admin_login_rate_limits to service_role;
grant usage, select on sequence public.lead_events_id_seq to service_role;
