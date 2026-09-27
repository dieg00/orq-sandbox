alter table public.notas add column actualizada_en timestamptz not null default now();
