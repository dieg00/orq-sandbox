create table public.notas (
  id bigint generated always as identity primary key,
  titulo text not null check (char_length(titulo) between 1 and 200),
  creada_en timestamptz not null default now()
);

alter table public.notas enable row level security;

create policy "notas visibles para todos"
  on public.notas for select
  using (true);
