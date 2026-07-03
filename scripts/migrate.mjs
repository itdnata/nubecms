// Ejecuta las migraciones SQL contra Supabase usando el session pooler (IPv4).
// Uso: node scripts/migrate.mjs               -> corre todas las migraciones
//      node scripts/migrate.mjs <archivo.sql> -> corre solo ese archivo
import postgres from 'postgres'
import { readFileSync, readdirSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'

const __dirname = dirname(fileURLToPath(import.meta.url))
const migrationsDir = join(__dirname, '..', 'supabase', 'migrations')

// Carga un archivo tipo dotenv sin depender del shell (la contraseña puede
// contener caracteres especiales como '(' ).
function loadEnvFile(path) {
  const out = {}
  try {
    for (const line of readFileSync(path, 'utf8').split('\n')) {
      const s = line.trim()
      if (!s || s.startsWith('#')) continue
      const i = s.indexOf('=')
      if (i === -1) continue
      out[s.slice(0, i).trim()] = s.slice(i + 1).trim()
    }
  } catch {}
  return out
}
const envFile = process.env.DB_ENV_FILE ? loadEnvFile(process.env.DB_ENV_FILE) : {}
const {
  PGHOST = envFile.PGHOST, PGPORT = envFile.PGPORT || '5432',
  PGDATABASE = envFile.PGDATABASE || 'postgres',
  PGUSER = envFile.PGUSER, PGPASSWORD = envFile.PGPASSWORD,
} = process.env
if (!PGHOST || !PGUSER || !PGPASSWORD) {
  console.error('Faltan variables de entorno PGHOST/PGUSER/PGPASSWORD')
  process.exit(1)
}

const sql = postgres({
  host: PGHOST, port: Number(PGPORT), database: PGDATABASE,
  username: PGUSER, password: PGPASSWORD,
  ssl: 'require', prepare: false, max: 1, connect_timeout: 20,
})

const only = process.argv[2]
const files = only
  ? [only]
  : readdirSync(migrationsDir).filter(f => f.endsWith('.sql')).sort()

try {
  for (const f of files) {
    const path = join(migrationsDir, f)
    const text = readFileSync(path, 'utf8')
    process.stdout.write(`→ ${f} ... `)
    await sql.unsafe(text)
    console.log('ok')
  }
  console.log('\n✔ Migraciones aplicadas')
} catch (e) {
  console.error('\n�’ Error:', e.message)
  process.exitCode = 1
} finally {
  await sql.end()
}
