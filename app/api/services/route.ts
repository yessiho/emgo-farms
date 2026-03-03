// app/api/services/route.ts
import { NextResponse } from "next/server"
import { supabaseAdmin } from "@/lib/supabase"

export async function GET() {
  try {
    const { data, error } = await supabaseAdmin
      .from("products")
      .select("*")
      .eq("status", "active")
      .order("created_at", { ascending: false })

    if (error) throw new Error(error.message)

    return NextResponse.json(data)
  } catch (err: any) {
    console.error("Supabase Error:", err.message)
    return NextResponse.json({ error: "Failed to fetch products" }, { status: 500 })
  }
}