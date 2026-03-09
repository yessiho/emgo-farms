// app/api/contact/route.ts
import { NextResponse } from "next/server"

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL!
const SERVICE_KEY  = process.env.SUPABASE_SERVICE_ROLE_KEY!

export async function POST(req: Request) {
  try {
    const { name, email, phone, service, message } = await req.json()

    if (!name?.trim() || !email?.trim() || !message?.trim())
      return NextResponse.json({ error: "Name, email and message are required" }, { status: 400 })

    // Use native fetch directly to Supabase REST API
    const res = await fetch(`${SUPABASE_URL}/rest/v1/contacts`, {
      method: "POST",
      headers: {
        "Content-Type":  "application/json",
        "apikey":        SERVICE_KEY,
        "Authorization": `Bearer ${SERVICE_KEY}`,
        "Prefer":        "return=representation",
      },
      body: JSON.stringify({
        name:    name.trim(),
        email:   email.trim(),
        phone:   phone   || "",
        service: service || "",
        message: message.trim(),
        read:    false,
      }),
    })

    const text = await res.text()
    console.log("[contact POST] status:", res.status, "body:", text)

    if (!res.ok) {
      return NextResponse.json({ error: text }, { status: res.status })
    }

    return NextResponse.json({ success: true })
  } catch (err: any) {
    console.error("[contact POST] error:", err.message)
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}