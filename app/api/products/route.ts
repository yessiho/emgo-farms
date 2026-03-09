// app/api/products/route.ts
import { NextResponse } from "next/server"

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL!
const SERVICE_KEY  = process.env.SUPABASE_SERVICE_ROLE_KEY!

export async function GET() {
  try {
    const res = await fetch(
      `${SUPABASE_URL}/rest/v1/products?select=*&status=eq.active&order=created_at.desc`,
      {
        headers: {
          "apikey":        SERVICE_KEY,
          "Authorization": `Bearer ${SERVICE_KEY}`,
        },
        cache: "no-store",
      }
    )
    const text = await res.text()
    if (!res.ok) return NextResponse.json({ error: text }, { status: res.status })
    return NextResponse.json(JSON.parse(text))
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}