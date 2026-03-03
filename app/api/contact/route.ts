// app/api/contact/route.ts
import { NextResponse } from "next/server"
import { createClient } from "@supabase/supabase-js"

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

export async function POST(req: Request) {
  const body = await req.json()
  const { name, email, phone, service, message } = body
  if (!name || !email || !message)
    return NextResponse.json({ error: "Name, email and message are required" }, { status: 400 })
  const { error } = await supabase.from("contacts").insert({ name, email, phone, service, message, read: false })
  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json({ success: true })
}