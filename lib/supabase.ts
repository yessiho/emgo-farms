// lib/supabase.ts
import { createClient } from "@supabase/supabase-js"

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL!
const ANON_KEY     = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
const SERVICE_KEY  = process.env.SUPABASE_SERVICE_ROLE_KEY!

// Client-side client (anon key) — used for auth in browser
export const supabase = createClient(SUPABASE_URL, ANON_KEY)

// Server-side admin client (service role key) — used in API routes only
// Falls back to anon key if service key not available (prevents build errors)
export const supabaseAdmin = createClient(
  SUPABASE_URL,
  SERVICE_KEY || ANON_KEY
)