// app/api/test-keys/route.ts
// ⚠️ DELETE THIS FILE AFTER FIXING — only for debugging
import { NextResponse } from "next/server"

export async function GET() {
  const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL
  const ANON_KEY     = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  const SERVICE_KEY  = process.env.SUPABASE_SERVICE_ROLE_KEY

  // Test anon key against DB
  let anonDB = "untested"
  try {
    const r = await fetch(`${SUPABASE_URL}/rest/v1/products?select=id&limit=1`, {
      headers: { "apikey": ANON_KEY!, "Authorization": `Bearer ${ANON_KEY!}` }
    })
    anonDB = r.ok ? "✅ WORKS" : `❌ ${await r.text()}`
  } catch (e: any) { anonDB = `❌ ${e.message}` }

  // Test service key against DB
  let serviceDB = "untested"
  try {
    const r = await fetch(`${SUPABASE_URL}/rest/v1/products?select=id&limit=1`, {
      headers: { "apikey": SERVICE_KEY!, "Authorization": `Bearer ${SERVICE_KEY!}` }
    })
    serviceDB = r.ok ? "✅ WORKS" : `❌ ${await r.text()}`
  } catch (e: any) { serviceDB = `❌ ${e.message}` }

  // Test service key against Storage
  let serviceStorage = "untested"
  try {
    const r = await fetch(`${SUPABASE_URL}/storage/v1/bucket`, {
      headers: { "apikey": SERVICE_KEY!, "Authorization": `Bearer ${SERVICE_KEY!}` }
    })
    serviceStorage = r.ok ? "✅ WORKS" : `❌ ${await r.text()}`
  } catch (e: any) { serviceStorage = `❌ ${e.message}` }

  return NextResponse.json({
    env_vars: {
      url_set:         !!SUPABASE_URL,
      anon_key_set:    !!ANON_KEY,
      service_key_set: !!SERVICE_KEY,
      url:             SUPABASE_URL,
      anon_key_length:    ANON_KEY?.length ?? 0,
      service_key_length: SERVICE_KEY?.length ?? 0,
    },
    tests: {
      anon_key_db:      anonDB,
      service_key_db:   serviceDB,
      service_storage:  serviceStorage,
    }
  }, { status: 200 })
}