-- Nala distribution hardening and browse-first interest capture.
-- Public users may browse and submit consented interest. Private marketplace
-- lifecycle operations remain protected by RLS and authenticated ownership.

create table if not exists public.worker_interest_requests (
  id uuid primary key default gen_random_uuid(),
  display_name text not null check (length(trim(display_name)) >= 2),
  contact_phone text,
  contact_email text,
  geography text not null,
  interested_categories text[] not null default '{}',
  preferred_market_cell_slug text,
  consent_to_contact boolean not null default false,
  status text not null default 'new' check (status in ('new','reviewed','waitlisted','invited','closed')),
  source text not null default 'web' check (source in ('web','whatsapp','partner','operator')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint worker_interest_contact_required check (
    nullif(trim(coalesce(contact_phone,'')),'') is not null
    or nullif(trim(coalesce(contact_email,'')),'') is not null
  )
);

alter table public.worker_interest_requests enable row level security;

create policy "public can submit consented worker interest"
on public.worker_interest_requests
for insert to anon, authenticated
with check (
  consent_to_contact = true
  and length(trim(display_name)) >= 2
  and length(trim(geography)) >= 2
  and cardinality(interested_categories) between 1 and 5
);

grant insert on public.worker_interest_requests to anon, authenticated;

-- Trust and safety data is never publicly readable. Service-role access bypasses
-- RLS; authenticated users may submit a case only for a profile they own.
create policy "participants can submit trust safety cases"
on public.trust_safety_cases
for insert to authenticated
with check (
  (worker_profile_id is not null and exists (
    select 1 from public.worker_profiles wp
    where wp.id = worker_profile_id and wp.owner_user_id = (select auth.uid())
  ))
  or
  (business_profile_id is not null and exists (
    select 1 from public.business_profiles bp
    where bp.id = business_profile_id and bp.owner_user_id = (select auth.uid())
  ))
);

grant insert on public.trust_safety_cases to authenticated;

create or replace function public.touch_updated_at()
returns trigger
language plpgsql
set search_path = public, pg_temp
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create trigger worker_interest_requests_touch
before update on public.worker_interest_requests
for each row execute function public.touch_updated_at();

-- Cover foreign keys used by ownership checks, dashboards and operator queues.
create index if not exists analytics_events_actor_user_id_idx on public.analytics_events(actor_user_id);
create index if not exists analytics_events_market_cell_id_idx on public.analytics_events(market_cell_id);
create index if not exists business_profiles_owner_user_id_idx on public.business_profiles(owner_user_id);
create index if not exists business_profiles_market_cell_id_idx on public.business_profiles(market_cell_id);
create index if not exists worker_profiles_owner_user_id_idx on public.worker_profiles(owner_user_id);
create index if not exists worker_profiles_market_cell_id_idx on public.worker_profiles(market_cell_id);
create index if not exists task_requests_business_profile_id_idx on public.task_requests(business_profile_id);
create index if not exists task_requests_task_product_id_idx on public.task_requests(task_product_id);
create index if not exists recurring_task_plans_business_profile_id_idx on public.recurring_task_plans(business_profile_id);
create index if not exists recurring_task_plans_task_product_id_idx on public.recurring_task_plans(task_product_id);
create index if not exists recurring_task_plans_market_cell_id_idx on public.recurring_task_plans(market_cell_id);
create index if not exists recurring_task_plans_preferred_worker_profile_id_idx on public.recurring_task_plans(preferred_worker_profile_id);
create index if not exists preferred_worker_relationships_worker_profile_id_idx on public.preferred_worker_relationships(worker_profile_id);
create index if not exists preferred_worker_relationships_task_product_id_idx on public.preferred_worker_relationships(task_product_id);
create index if not exists trust_safety_cases_business_profile_id_idx on public.trust_safety_cases(business_profile_id);
create index if not exists trust_safety_cases_worker_profile_id_idx on public.trust_safety_cases(worker_profile_id);
create index if not exists trust_safety_cases_task_request_id_idx on public.trust_safety_cases(task_request_id);
create index if not exists worker_interest_requests_status_created_idx on public.worker_interest_requests(status,created_at desc);

-- Optimise ownership policies by evaluating auth.uid() once per statement.
drop policy if exists "users manage own worker profile" on public.worker_profiles;
create policy "users manage own worker profile" on public.worker_profiles
for all to authenticated
using (owner_user_id = (select auth.uid()))
with check (owner_user_id = (select auth.uid()));

drop policy if exists "users manage own business profile" on public.business_profiles;
create policy "users manage own business profile" on public.business_profiles
for all to authenticated
using (owner_user_id = (select auth.uid()))
with check (owner_user_id = (select auth.uid()));

drop policy if exists "workers manage own waitlist entries" on public.waitlist_entries;
create policy "workers manage own waitlist entries" on public.waitlist_entries
for all to authenticated
using (exists (
  select 1 from public.worker_profiles wp
  where wp.id = worker_profile_id and wp.owner_user_id = (select auth.uid())
))
with check (exists (
  select 1 from public.worker_profiles wp
  where wp.id = worker_profile_id and wp.owner_user_id = (select auth.uid())
));

drop policy if exists "businesses manage own task requests" on public.task_requests;
create policy "businesses manage own task requests" on public.task_requests
for all to authenticated
using (exists (
  select 1 from public.business_profiles bp
  where bp.id = business_profile_id and bp.owner_user_id = (select auth.uid())
))
with check (exists (
  select 1 from public.business_profiles bp
  where bp.id = business_profile_id and bp.owner_user_id = (select auth.uid())
));

drop policy if exists "businesses manage own recurring plans" on public.recurring_task_plans;
create policy "businesses manage own recurring plans" on public.recurring_task_plans
for all to authenticated
using (exists (
  select 1 from public.business_profiles bp
  where bp.id = business_profile_id and bp.owner_user_id = (select auth.uid())
))
with check (exists (
  select 1 from public.business_profiles bp
  where bp.id = business_profile_id and bp.owner_user_id = (select auth.uid())
));

drop policy if exists "participants read preferred relationships" on public.preferred_worker_relationships;
create policy "participants read preferred relationships" on public.preferred_worker_relationships
for select to authenticated
using (
  exists (select 1 from public.business_profiles bp where bp.id=business_profile_id and bp.owner_user_id=(select auth.uid()))
  or exists (select 1 from public.worker_profiles wp where wp.id=worker_profile_id and wp.owner_user_id=(select auth.uid()))
);

drop policy if exists "authenticated users insert own analytics" on public.analytics_events;
create policy "authenticated users insert own analytics" on public.analytics_events
for insert to authenticated
with check (actor_user_id = (select auth.uid()));

-- Additional adjacent pilot categories. These are catalogue pathways, not claims
-- of live task supply.
insert into public.task_products(
 slug,title,category,verticals,status,outcome,source_inputs,completion_checklist,
 evidence_requirements,prohibited_information,review_rubric,
 readiness_simulation_id,expected_active_minutes,expected_revision_minutes,
 minimum_worker_pay_cents,revision_limit,remote_capable
) values
(
 'ecommerce-catalogue-cleanup','Clean an online product catalogue','E-commerce catalogue support',
 array['independent_retail','salons_and_beauty'],'pilot',
 'Product titles, prices, categories and approved descriptions are standardised and exceptions are returned for owner approval.',
 array['approved product list','current prices','category rules'],
 array['check every supplied product','standardise approved fields','flag missing information','produce a change summary'],
 array['cleaned catalogue','exception register','change summary'],
 array['payment credentials','unapproved price changes','fabricated product claims'],
 jsonb_build_object('accuracy',45,'completeness',25,'claims',20,'documentation',10),
 'data-admin-basics',75,15,15000,1,true
),
(
 'basic-tech-setup-guide','Prepare a basic device or software setup guide','Basic technology support',
 array['professional_services','independent_retail','trades_and_repairs'],'pilot',
 'A clear, tested setup guide is prepared from approved product documentation without accessing private accounts or credentials.',
 array['approved product or software documentation','target device details','allowed setup scope'],
 array['confirm supported setup','prepare numbered steps','identify escalation points','quality check'],
 array['setup guide','tested checklist','escalation notes'],
 array['passwords','remote-control access','security bypasses','unlicensed software'],
 jsonb_build_object('accuracy',35,'clarity',30,'safety',25,'testing',10),
 'basic-tech-support',80,20,17000,1,true
),
(
 'stock-count-capture','Capture and reconcile a stock count','Retail and stock operations',
 array['independent_retail','salons_and_beauty'],'pilot',
 'The supplied stock count is captured accurately, variances are flagged and no stock or cash decision is made by the worker.',
 array['approved stock sheet','count source','product identifiers'],
 array['capture each count','check totals','flag variances','produce a summary'],
 array['completed stock sheet','variance list','quality-check result'],
 array['cash handling','inventory write-offs','supplier banking information'],
 jsonb_build_object('accuracy',50,'completeness',25,'variance_flags',15,'documentation',10),
 'retail-stock-basics',70,15,14000,1,false
)
on conflict (slug) do update set
 title=excluded.title,
 category=excluded.category,
 verticals=excluded.verticals,
 status=excluded.status,
 outcome=excluded.outcome,
 source_inputs=excluded.source_inputs,
 completion_checklist=excluded.completion_checklist,
 evidence_requirements=excluded.evidence_requirements,
 prohibited_information=excluded.prohibited_information,
 review_rubric=excluded.review_rubric,
 readiness_simulation_id=excluded.readiness_simulation_id,
 expected_active_minutes=excluded.expected_active_minutes,
 expected_revision_minutes=excluded.expected_revision_minutes,
 minimum_worker_pay_cents=excluded.minimum_worker_pay_cents,
 revision_limit=excluded.revision_limit,
 remote_capable=excluded.remote_capable,
 updated_at=now();
