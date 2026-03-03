import { createClient } from "@supabase/supabase-js"

const supabaseUrl     = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnon    = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
const supabaseService = process.env.SUPABASE_SERVICE_ROLE_KEY ?? supabaseAnon

// Client-side — uses anon key (browser safe)
export const supabase = createClient(supabaseUrl, supabaseAnon)

// Server-side — uses service role key (bypasses RLS, API routes only)
export const supabaseAdmin = createClient(supabaseUrl, supabaseService)