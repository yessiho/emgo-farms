// app/api/test/route.ts
import { NextResponse } from "next/server"
import { supabaseAdmin } from "@/lib/supabase"

export async function GET() {
  try {
    const { data, error } = await supabaseAdmin
      .from("products")
      .select("id", { count: "exact", head: true })

    if (error) throw new Error(error.message)

    return NextResponse.json({
      success: true,
      message: "Supabase Connected Successfully ✅",
      url:     process.env.NEXT_PUBLIC_SUPABASE_URL,
    })
  } catch (err: any) {
    console.error("Supabase Error:", err.message)
    return NextResponse.json({
      success: false,
      message: "Supabase Connection Failed ❌",
      error:   err.message,
    }, { status: 500 })
  }
}