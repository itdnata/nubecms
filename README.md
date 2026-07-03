# A vuelo de nube — nubecms

Blog personal *"A vuelo de nube"* construido con **Next.js 16** (App Router, TypeScript) y
**Supabase** (Postgres + Storage) como backend. Reproduce con fidelidad el mockup de diseño
original (conservado en el historial de git).

## Stack

- Next.js 16 + React 19 (App Router, Server Components y Server Actions)
- Supabase (Postgres + PostgREST + RLS) para contenido y formularios
- Estilos inline fieles al mockup + `app/globals.css` (fuentes IBM Plex Mono / Georgia)

## Estructura

```
app/                     Rutas (una por vista del mockup)
  page.tsx               Portada
  textos/                Ensayos, reseñas y notas  + [slug] (ensayo)
  laboratorio/           Cursos + [slug] (detalle) + [slug]/inscribirse (form)
  cartas/                Cartas + [id] (lector) + enviar (form)
  actions.ts             Server Actions (inscripción y enviar carta)
  _components/           Highlight, TopBack, SectionLabel, ImagePlaceholder
lib/                     Cliente Supabase, tipos y funciones de datos
supabase/migrations/     Esquema+RLS (0001), seed (0002), media+Storage (0003)
scripts/migrate.mjs      Runner de migraciones (session pooler, IPv4)
scripts/upload-media.mjs Sube portadas a Storage (usa service_role, uso puntual)
```

## Puesta en marcha

1. Copia `.env.example` a `.env.local` y rellena:
   ```
   NEXT_PUBLIC_SUPABASE_URL=https://<ref>.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=<anon o publishable key>
   ```
2. Instala dependencias y arranca:
   ```
   npm install
   npm run dev
   ```
3. (Opcional) Aplicar/actualizar el backend en Supabase:
   ```
   DB_ENV_FILE=ruta/a/db.env node scripts/migrate.mjs
   ```
   donde `db.env` contiene `PGHOST/PGPORT/PGUSER/PGPASSWORD` del *session pooler*.

## Modelo de datos (Supabase)

- `posts` — ensayos/artículos (cuerpo en bloques JSON).
- `reviews` — reseñas · `notes` — notas y curiosidades.
- `courses` — laboratorio (cursos/talleres) con `body`/`temario`/`ficha`.
- `letters` — cartas (sección especial); las enviadas por usuarios entran con `is_new`.
- `course_signups` — inscripciones (solo escritura pública).
- `media` — catálogo de imágenes (bucket público `media` en Supabase Storage). `posts.cover_media_id`
  referencia la portada del artículo. Las lecturas son por URL pública del CDN de Supabase (no gasta
  Vercel); las subidas se hacen server-side con la `service_role` (ver `scripts/upload-media.mjs`).

RLS: lectura pública del contenido; `letters` y `course_signups` aceptan inserción pública;
`course_signups` no tiene lectura pública (datos personales).
