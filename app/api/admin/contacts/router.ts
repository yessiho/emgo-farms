// app/api/admin/contacts/route.ts
import { NextResponse } from "next/server"

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL!
const SERVICE_KEY  = process.env.SUPABASE_SERVICE_ROLE_KEY!

const HEADERS = {
  "Content-Type":  "application/json",
  "apikey":        SERVICE_KEY,
  "Authorization": `Bearer ${SERVICE_KEY}`,
}

export async function GET() {
  try {
    const res  = await fetch(
      `${SUPABASE_URL}/rest/v1/contacts?select=*&order=created_at.desc`,
      { headers: HEADERS, cache: "no-store" }
    )
    const text = await res.text()
    if (!res.ok) return NextResponse.json({ error: text }, { status: res.status })
    return NextResponse.json(JSON.parse(text))
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}

export async function PATCH(req: Request) {
  try {
    const { id, read } = await req.json()
    const res  = await fetch(`${SUPABASE_URL}/rest/v1/contacts?id=eq.${id}`, {
      method:  "PATCH",
      headers: { ...HEADERS, "Prefer": "return=representation" },
      body:    JSON.stringify({ read }),
    })
    const text = await res.text()
    if (!res.ok) return NextResponse.json({ error: text }, { status: res.status })
    return NextResponse.json({ success: true })
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}