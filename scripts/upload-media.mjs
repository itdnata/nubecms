// Sube las portadas a Supabase Storage (bucket 'media') con la anon key y las
// cataloga en public.media vía Postgres. Asigna la portada de nubes al ensayo 01.
//
// Uso:
//   DB_ENV_FILE=... NEXT_PUBLIC_SUPABASE_URL=... NEXT_PUBLIC_SUPABASE_ANON_KEY=... \
//   node scripts/upload-media.mjs
import postgres from 'postgres'
import { createClient } from '@supabase/supabase-js'
import { readFileSync, statSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const root = join(__dirname, '..')

const env = Object.fromEntries(
  readFileSync(process.env.DB_ENV_FILE, 'utf8')
    .split('\n')
    .filter((l) => l.includes('=') && !l.startsWith('#'))
    .map((l) => { const i = l.indexOf('='); return [l.slice(0, i).trim(), l.slice(i + 1).trim()] })
)
const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL
// Subida server-side: requiere la service_role / secret key (omite RLS de Storage).
const SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_SECRET_KEY

// Lee ancho/alto de un PNG desde la cabecera IHDR.
function pngSize(buf) {
  if (buf.length < 24) return { width: null, height: null }
  return { width: buf.readUInt32BE(16), height: buf.readUInt32BE(20) }
}

const FILES = [
  { src: 'archivos/assets/portada-nubes-wide.png', path: 'covers/portada-nubes-wide.png',
    alt: 'Nubes estilo grabado sobre cielo azul claro', caption: 'Cirros sobre la sabana, una tarde cualquiera.',
    kind: 'cover', coverForSlug: 'por-que-no-podemos-dejar-de-mirar-las-nubes' },
  { src: 'archivos/assets/portada-nubes.png', path: 'covers/portada-nubes.png',
    alt: 'Nubes sobre cielo (formato vertical)', caption: null, kind: 'cover', coverForSlug: null },
  { src: 'archivos/assets/portada-verde.png', path: 'covers/portada-verde.png',
    alt: 'Follaje verde a contraluz (komorebi)', caption: null, kind: 'cover', coverForSlug: null },
]

const sql = postgres({
  host: env.PGHOST, port: 5432, database: 'postgres',
  username: env.PGUSER, password: env.PGPASSWORD, ssl: 'require', prepare: false, max: 1,
})
if (!SERVICE_KEY) {
  console.error('Falta SUPABASE_SERVICE_ROLE_KEY (o SUPABASE_SECRET_KEY) en el entorno')
  process.exit(1)
}
const sb = createClient(SUPABASE_URL, SERVICE_KEY, { auth: { persistSession: false } })

try {
  for (const f of FILES) {
    const abs = join(root, f.src)
    const buf = readFileSync(abs)
    const { width, height } = pngSize(buf)
    const size = statSync(abs).size

    const up = await sb.storage.from('media').upload(f.path, buf, {
      contentType: 'image/png', upsert: true,
    })
    if (up.error) throw new Error(`upload ${f.path}: ${up.error.message}`)

    const publicUrl = `${SUPABASE_URL}/storage/v1/object/public/media/${f.path}`
    const filename = f.path.split('/').pop()

    const rows = await sql`
      insert into public.media (bucket, path, filename, public_url, alt, caption, width, height, size_bytes, content_type, kind)
      values ('media', ${f.path}, ${filename}, ${publicUrl}, ${f.alt}, ${f.caption}, ${width}, ${height}, ${size}, 'image/png', ${f.kind})
      on conflict (bucket, path) do update set
        public_url = excluded.public_url, alt = excluded.alt, caption = excluded.caption,
        width = excluded.width, height = excluded.height, size_bytes = excluded.size_bytes,
        content_type = excluded.content_type, kind = excluded.kind
      returning id`
    const mediaId = rows[0].id
    console.log(`✔ ${f.path}  (${width}x${height}, ${(size/1024).toFixed(0)}KB)  media.id=${mediaId}`)

    if (f.coverForSlug) {
      await sql`update public.posts set cover_media_id = ${mediaId} where slug = ${f.coverForSlug}`
      console.log(`  ↳ asignada como cover de "${f.coverForSlug}"`)
    }
  }
  console.log('\n✔ Subida y catálogo completos')
} catch (e) {
  console.error('�’ Error:', e.message)
  process.exitCode = 1
} finally {
  await sql.end()
}
