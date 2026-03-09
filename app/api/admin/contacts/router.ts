// app/api/admin/contacts/route.ts
import { NextResponse } from "next/server"
import { createClient } from "@supabase/supabase-js"

function getClient() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!  // ← bypass RLS
  )
}

export async function GET() {
  try {
    const { data, error } = await getClient()
      .from("contacts")
      .select("*")
      .order("created_at", { ascending: false })

    if (error) {
      console.error("[admin/contacts GET]", error.message)
      return NextResponse.json({ error: error.message }, { status: 500 })
    }
    return NextResponse.json(data)
  } catch (err: any) {
    console.error("[admin/contacts GET] unexpected:", err.message)
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}