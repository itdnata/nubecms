-- ============================================================
-- A vuelo de nube — esquema del blog
-- ============================================================

-- Extensión para UUIDs
create extension if not exists "pgcrypto";

-- ---------- posts (ensayos / artículos) ----------
create table if not exists public.posts (
  id            uuid primary key default gen_random_uuid(),
  slug          text unique not null,
  seq           text not null,                    -- '01', '02', ...
  kicker        text not null,                    -- 'Ensayo · Cielo'
  category      text,                             -- 'Cielo'
  title         text not null,
  title_highlight text,                           -- subcadena del título resaltada en verde-lima
  dek           text not null,                    -- bajada en la lista
  subtitle      text,                             -- bajada en itálica del hero del artículo
  reading_time  text not null,                    -- '12 min'
  cover_caption text,                             -- pie de la imagen de portada
  author_name   text default 'Nombre Apellido',
  author_bio    text default 'Escribe sobre lo cotidiano y lo curioso. Vive en Bogotá, entre libros y ventanas.',
  author_location text default 'Bogotá',
  tags          text[] default '{}',
  body          jsonb default '[]'::jsonb,        -- bloques del artículo
  published_at  date,
  sort_order    int not null default 0,
  created_at    timestamptz not null default now()
);

-- ---------- reviews (reseñas) ----------
create table if not exists public.reviews (
  id         uuid primary key default gen_random_uuid(),
  tag        text not null,                        -- 'Cine' | 'Libro' | 'Música'
  title      text not null,
  note       text not null,
  sort_order int not null default 0,
  created_at timestamptz not null default now()
);

-- ---------- notes (notas & curiosidades) ----------
create table if not exists public.notes (
  id         uuid primary key default gen_random_uuid(),
  num        text not null,                        -- '01'
  text       text not null,
  sort_order int not null default 0,
  created_at timestamptz not null default now()
);

-- ---------- courses (laboratorio) ----------
create table if not exists public.courses (
  id         uuid primary key default gen_random_uuid(),
  slug       text unique not null,
  tag        text not null,                        -- 'Club de lectura'
  title      text not null,
  note       text not null,                        -- descripción corta en la tarjeta
  schedule   text not null,                        -- campo "when": 'Mensual · 1er jueves'
  lead       text not null,                        -- bajada del detalle
  body       jsonb default '[]'::jsonb,            -- [{ t }]
  temario    jsonb default '[]'::jsonb,            -- [{ n, t }]
  ficha      jsonb default '[]'::jsonb,            -- [{ k, v }]
  sort_order int not null default 0,
  created_at timestamptz not null default now()
);

-- ---------- letters (cartas — sección especial) ----------
create table if not exists public.letters (
  id           uuid primary key default gen_random_uuid(),
  heteronym    text not null,                      -- 'Heterónimo — M.'
  title        text not null,
  excerpt      text not null,
  file_name    text,                               -- 'tratado-de-los-trichoceros.txt'
  body         jsonb default '[]'::jsonb,          -- líneas { n, b, t, link, href, post }
  is_new       boolean not null default false,     -- marca "Nueva"
  is_published boolean not null default true,
  sort_order   int not null default 0,
  created_at   timestamptz not null default now()
);

-- ---------- course_signups (inscripciones) ----------
create table if not exists public.course_signups (
  id           uuid primary key default gen_random_uuid(),
  course_title text not null,
  name         text not null,
  email        text not null,
  phone        text,
  created_at   timestamptz not null default now()
);

-- ============================================================
-- Row Level Security
-- ============================================================
alter table public.posts          enable row level security;
alter table public.reviews        enable row level security;
alter table public.notes          enable row level security;
alter table public.courses        enable row level security;
alter table public.letters        enable row level security;
alter table public.course_signups enable row level security;

-- Lectura pública del contenido
drop policy if exists "public read posts"   on public.posts;
create policy "public read posts"   on public.posts   for select using (true);

drop policy if exists "public read reviews" on public.reviews;
create policy "public read reviews" on public.reviews for select using (true);

drop policy if exists "public read notes"   on public.notes;
create policy "public read notes"   on public.notes   for select using (true);

drop policy if exists "public read courses" on public.courses;
create policy "public read courses" on public.courses for select using (true);

-- Cartas: lectura pública solo de las publicadas; inserción pública (enviar la tuya)
drop policy if exists "public read letters"   on public.letters;
create policy "public read letters"   on public.letters for select using (is_published = true);

drop policy if exists "public insert letters" on public.letters;
create policy "public insert letters" on public.letters for insert with check (
  is_new = true and is_published = true and file_name is null
);

-- Inscripciones: inserción pública, sin lectura pública (datos personales)
drop policy if exists "public insert signups" on public.course_signups;
create policy "public insert signups" on public.course_signups for insert with check (true);

-- Índices de orden
create index if not exists posts_sort_idx    on public.posts (sort_order);
create index if not exists reviews_sort_idx  on public.reviews (sort_order);
create index if not exists notes_sort_idx    on public.notes (sort_order);
create index if not exists courses_sort_idx  on public.courses (sort_order);
create index if not exists letters_sort_idx  on public.letters (is_new desc, sort_order, created_at desc);
