@AGENTS.md

# A vuelo de nube — nubecms

Blog personal en **Next.js 16** (App Router, TypeScript, React 19) con **Supabase**
(Postgres + Storage) como backend. Portado con fidelidad desde un mockup de diseño
(formato `.dc.html` / DCLogic). Repo sincronizado con `github.com/itdnata/nubecms` (rama `main`).

## Comandos

```bash
npm run dev        # desarrollo (localhost:3000)
npm run build      # build de producción (prerenderiza las páginas ISR → requiere Supabase)
npm run start      # servir el build
npm run lint       # eslint

# Migraciones (usa el SESSION POOLER IPv4, ver gotcha abajo)
DB_ENV_FILE=<ruta/db.env> node scripts/migrate.mjs              # todas
DB_ENV_FILE=<ruta/db.env> node scripts/migrate.mjs 0003_media.sql   # una

# Subir imágenes a Storage (uso puntual, requiere service_role)
DB_ENV_FILE=<ruta/db.env> NEXT_PUBLIC_SUPABASE_URL=... \
  SUPABASE_SERVICE_ROLE_KEY=... node scripts/upload-media.mjs
```

Node se instaló en `~/.local/node` (esta máquina no traía Node; ya está en `~/.zshrc`).
No hay Homebrew, `psql`, `supabase` CLI ni `gh`: las migraciones corren con el paquete npm
`postgres` desde Node, no con `psql`.

## Arquitectura

- **Rutas** (`app/`, una por vista del mockup): `page.tsx` (Portada), `textos/` +
  `textos/[slug]` (ensayo), `laboratorio/` + `[slug]` + `[slug]/inscribirse`,
  `cartas/` + `[id]` (lector) + `enviar`. Todas son **Server Components async**.
- **Datos**: `lib/data.ts` expone `getPosts/getPost/getReviews/getNotes/getCourses/
  getCourse/getLetters/getLetter/getMediaByPath`. Todo se lee vía el cliente Supabase
  (`lib/supabase.ts`, `getSupabase()`) con la **anon key** bajo RLS. Tipos en `lib/types.ts`.
- **Formularios**: `app/actions.ts` (Server Actions `submitRegistro`, `submitCarta`).
  Los componentes cliente `RegistroForm.tsx` / `EnviarForm.tsx` usan `useActionState`.
  `submitCarta` llama `revalidatePath('/cartas')` para reflejar la carta nueva al instante.
- **Componentes UI** (`app/_components/`): `Highlight` (resaltado verde-lima con
  `box-decoration-break`), `TopBack`, `SectionLabel`, `ImagePlaceholder`.
- **Media/Storage**: bucket público `media` (imágenes en `covers/`). Tabla `media` cataloga
  cada asset; `posts.cover_media_id` referencia la portada, embebida en las queries como
  `cover:media(*)`. El masthead, el hero del ensayo y las tarjetas de `/textos` usan las
  imágenes vía **CSS `background-image`** (no `next/image`, así no hace falta `remotePatterns`).

## Convenciones

- **Fidelidad al mockup con estilos inline** (`style={{...}}`): colores `#FBF7F3` (fondo),
  `#2C303A` (tinta), `#CC313D` (rojo), `#D6ED17` (lima), `#7B9ACC` (azul). Fuentes: Georgia
  (serif, sistema) e IBM Plex Mono (Google Fonts vía `<link>` en `app/layout.tsx`). Los
  `style-hover`/`style-focus` del mockup se recrean con clases en `app/globals.css`
  (`.avn-nav-link`, `.avn-lime-btn`, `.avn-input`, etc.).
- Secciones full-bleed: `width: 100vw; margin-left: calc(50% - 50vw)`.
- **Caché/ISR**: las páginas exportan `export const revalidate = 300` (estáticas servidas
  por el CDN de Vercel; se revalidan cada 5 min o on-demand con `revalidatePath`). NO usar
  `force-dynamic` salvo que una vista deba ser siempre fresca.
- **Estrategia por tipo de ruta** (decidido para contenido que CRECE por Supabase, sin redeploy):
  - Rutas sin parámetros (`/`, `/textos`, `/laboratorio`, `/cartas`, `/cartas/enviar`) se
    prerenderizan estáticas en build (`○`) y revalidan cada 5 min.
  - Rutas con parámetro (`textos/[slug]`, `cartas/[id]`, `laboratorio/[slug]`) se dejan en
    **ISR on-demand** (`ƒ`): el primer visitante las renderiza y quedan cacheadas 5 min.
  - **NO usar `generateStaticParams`** aquí: prerenderizaría solo los slugs existentes al
    hacer build y acoplaría el build a la BD; como los posts/cartas nuevos llegan por Supabase
    sin redeploy, el on-demand ISR ya los sirve rápido sin rebuild. Solo tendría sentido si el
    contenido viviera en el repo (MDX) y los cambios requirieran deploy.
  - **Frescura tras editar en Supabase**: los cambios se ven en ≤5 min (el TTL). Si se quiere
    reflejo inmediato, opción futura: un *Database Webhook* de Supabase → una route handler
    `/api/revalidate` que llame `revalidatePath`/`revalidateTag` (requiere un secreto compartido).
    Subir/bajar el TTL es el otro dial: menor = más fresco y más regeneraciones; mayor = menos.
- La barra superior "editor" (los 3 círculos + cursor parpadeante) vive en `app/layout.tsx`
  y aparece en todas las pantallas — es parte del diseño, no quitarla.

## Supabase

- **Proyecto**: ref `nwzhlzpirwrljedsuook`, URL `https://nwzhlzpirwrljedsuook.supabase.co`.
- **Migraciones** en `supabase/migrations/`: `0001` esquema+RLS, `0002` seed del contenido,
  `0003` media+Storage. Idempotentes; el seed hace `truncate` del contenido curado (no borra
  cartas de usuarios ni inscripciones).
- **Tablas**: `posts`, `reviews`, `notes`, `courses`, `letters`, `course_signups`, `media`.
- **RLS**: lectura pública del contenido; `letters` y `course_signups` aceptan `INSERT`
  público (bajo condiciones); `course_signups` **sin** `SELECT` público (datos personales).
- **GOTCHA de conexión**: el host directo `db.<ref>.supabase.co` es **solo IPv6** y muchas
  redes no tienen salida IPv6. Usar el **session pooler IPv4**:
  `aws-0-us-east-1.pooler.supabase.com:5432`, usuario `postgres.<ref>`. La contraseña puede
  contener `(` — no cargar el `db.env` con `source` del shell; `scripts/migrate.mjs` lo parsea.
- **Storage**: subir archivos requiere la **service_role** (el rol `postgres` del pooler NO es
  dueño de `storage.objects`, así que subir con anon key falla por RLS). La lectura es pública
  por URL del CDN.

## Seguridad / despliegue

- **Vercel env vars**: SOLO `NEXT_PUBLIC_SUPABASE_URL` y `NEXT_PUBLIC_SUPABASE_ANON_KEY`.
  **Nunca** poner la `service_role` ni la contraseña de Postgres en Vercel ni en el cliente.
- Secretos solo en `.env.local` (ignorado). `.env.example` es la plantilla versionada.
- Nunca commitear keys ni la contraseña de la BD; el push por HTTPS usa un PAT que no se
  persiste en `.git/config`.
