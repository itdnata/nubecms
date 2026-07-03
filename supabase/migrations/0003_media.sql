-- ============================================================
-- Sistema de media: catálogo + Storage
-- ============================================================

-- ---------- tabla media (catálogo de assets) ----------
create table if not exists public.media (
  id           uuid primary key default gen_random_uuid(),
  bucket       text not null default 'media',
  path         text not null,                    -- ruta dentro del bucket
  filename     text not null,
  public_url   text not null,
  alt          text,                             -- texto alternativo
  caption      text,                             -- pie de imagen
  width        int,
  height       int,
  size_bytes   int,
  content_type text,
  kind         text default 'image',             -- 'cover' | 'illustration' | 'image'
  created_at   timestamptz not null default now(),
  unique (bucket, path)
);

alter table public.media enable row level security;
drop policy if exists "public read media" on public.media;
create policy "public read media" on public.media for select using (true);

-- ---------- posts: imagen de portada opcional ----------
alter table public.posts
  add column if not exists cover_media_id uuid references public.media(id) on delete set null;

-- ============================================================
-- Storage: bucket público "media"
-- ============================================================
insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values ('media', 'media', true, 10485760, array['image/png','image/jpeg','image/webp','image/avif','image/gif'])
on conflict (id) do update
  set public = excluded.public,
      file_size_limit = excluded.file_size_limit,
      allowed_mime_types = excluded.allowed_mime_types;

-- Las subidas al bucket se hacen desde el servidor con la service_role key
-- (omite RLS). El bucket es público, así que la LECTURA de los archivos es
-- pública por URL sin necesidad de políticas adicionales sobre storage.objects.
