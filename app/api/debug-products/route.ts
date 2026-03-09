// app/api/debug-products/route.ts
// DELETE THIS FILE after debugging
import { NextResponse } from "next/server"
import { createClient } from "@supabase/supabase-js"

export async function GET() {
  const url  = process.env.NEXT_PUBLIC_SUPABASE_URL
  const skey = process.env.SUPABASE_SERVICE_ROLE_KEY
  const akey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  const checks: Record<string, any> = {
    env: {
      SUPABASE_URL:         url        ? url.slice(0, 40)      : "❌ MISSING",
      SERVICE_ROLE_KEY:     skey       ? "✅ present"          : "❌ MISSING",
      ANON_KEY:             akey       ? "✅ present"          : "❌ MISSING",
    }
  }

  if (!url || !skey) {
    return NextResponse.json({ ...checks, error: "Missing env vars — check .env.local" }, { status: 500 })
  }

  try {
    const supabase = createClient(url, skey)

    // 1. Try listing tables
    const { data: products, error: fetchError } = await supabase
      .from("products")
      .select("*")
      .limit(5)

    checks.fetch = {
      error:      fetchError?.message ?? null,
      rowCount:   products?.length    ?? 0,
      sample:     products?.[0]       ?? null,
    }

    // 2. Try a test insert then delete
    const { data: inserted, error: insertError } = await supabase
      .from("products")
      .insert({
        name:        "__debug_test__",
        category:    "Other",
        price:       0,
        unit:        "test",
        description: "debug",
        status:      "inactive",
        in_stock:    false,
        image_url:   "",
      })
      .select()
      .single()

    checks.insert = {
      error:    insertError?.message ?? null,
      inserted: inserted?.id         ?? null,
    }

    if (inserted?.id) {
      const { error: delError } = await supabase
        .from("products")
        .delete()
        .eq("id", inserted.id)
      checks.cleanup = { error: delError?.message ?? null }
    }

  } catch (err: any) {
    checks.exception = err.message
  }

  return NextResponse.json(checks, { status: 200 })
}