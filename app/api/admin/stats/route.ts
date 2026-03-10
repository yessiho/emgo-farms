// app/api/admin/stats/route.ts
import { NextResponse } from "next/server"

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL!
const SERVICE_KEY  = process.env.SUPABASE_SERVICE_ROLE_KEY!

const H = {
  "apikey":        SERVICE_KEY,
  "Authorization": `Bearer ${SERVICE_KEY}`,
  "Content-Type":  "application/json",
}

async function count(table: string): Promise<number> {
  const res = await fetch(
    `${SUPABASE_URL}/rest/v1/${table}?select=id`,
    { headers: { ...H, "Prefer": "count=exact" }, cache: "no-store" }
  )
  const raw = res.headers.get("content-range") ?? "0/0"
  return parseInt(raw.split("/")[1] ?? "0", 10)
}

async function recent(table: string, limit = 5): Promise<any[]> {
  const res  = await fetch(
    `${SUPABASE_URL}/rest/v1/${table}?select=*&order=created_at.desc&limit=${limit}`,
    { headers: H, cache: "no-store" }
  )
  const text = await res.text()
  try { return JSON.parse(text) } catch { return [] }
}

export async function GET() {
  try {
    const [
      totalPosts, totalContacts, totalSubscribers, totalProducts,
      recentContacts, recentPosts,
    ] = await Promise.all([
      count("posts"),
      count("contacts"),
      count("newsletter"),
      count("products"),
      recent("contacts"),
      recent("posts"),
    ])

    return NextResponse.json({
      totalPosts,
      totalContacts,
      totalSubscribers,
      totalProducts,
      recentContacts,
      recentPosts,
    })
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}