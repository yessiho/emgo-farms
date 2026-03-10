// app/api/newsletter/route.ts
import { NextResponse } from "next/server"

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL!
const SERVICE_KEY  = process.env.SUPABASE_SERVICE_ROLE_KEY!

export async function POST(req: Request) {
  try {
    const { email } = await req.json()
    if (!email) return NextResponse.json({ error: "Email required" }, { status: 400 })

    const res  = await fetch(`${SUPABASE_URL}/rest/v1/newsletter`, {
      method:  "POST",
      headers: {
        "Content-Type":  "application/json",
        "apikey":        SERVICE_KEY,
        "Authorization": `Bearer ${SERVICE_KEY}`,
        "Prefer":        "return=representation",
      },
      body: JSON.stringify({ email }),
    })

    const text = await res.text()

    // Duplicate email — unique constraint violation
    if (res.status === 409 || text.includes("23505"))
      return NextResponse.json({ error: "Already subscribed" }, { status: 409 })

    if (!res.ok) return NextResponse.json({ error: text }, { status: res.status })
    return NextResponse.json({ success: true })
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}