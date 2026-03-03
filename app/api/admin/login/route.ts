// app/api/admin/login/route.ts
import { NextResponse } from "next/server"
import { supabaseAdmin } from "@/lib/supabase"

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json()

    if (!email || !password)
      return NextResponse.json({ error: "Email and password required" }, { status: 400 })

    const { data, error } = await supabaseAdmin.auth.signInWithPassword({ email, password })

    if (error)
      return NextResponse.json({ error: "Invalid email or password" }, { status: 401 })

    return NextResponse.json({ success: true, user: data.user })
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}