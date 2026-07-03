import { createClient } from '@supabase/supabase-js'

// Cliente Supabase para lecturas públicas y escrituras bajo RLS con la anon key.
// No persiste sesión: todo el acceso es anónimo (definido por las políticas RLS).
const url = process.env.NEXT_PUBLIC_SUPABASE_URL
const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

export function getSupabase() {
  if (!url || !anonKey) {
    throw new Error(
      'Faltan NEXT_PUBLIC_SUPABASE_URL / NEXT_PUBLIC_SUPABASE_ANON_KEY en el entorno (.env.local)'
    )
  }
  return createClient(url, anonKey, {
    auth: { persistSession: false, autoRefreshToken: false },
  })
}
