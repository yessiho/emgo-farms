import { NextResponse } from "next/server"
import { createClient } from "@supabase/supabase-js"

export async function GET() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  if (!url || !key) {
    return NextResponse.json({
      status: "failed",
      error:  "Missing NEXT_PUBLIC_SUPABASE_URL or NEXT_PUBLIC_SUPABASE_ANON_KEY in .env.local",
    })
  }

  try {
    const supabase = createClient(url, key)

    const [posts, contacts, newsletter, products] = await Promise.all([
      supabase.from("posts").select("id", { count: "exact", head: true }),
      supabase.from("contacts").select("id", { count: "exact", head: true }),
      supabase.from("newsletter").select("id", { count: "exact", head: true }),
      supabase.from("products").select("id", { count: "exact", head: true }),
    ])

    return NextResponse.json({
      status: "connected",
      url,
      tables: {
        posts:      { count: posts.count      ?? 0, error: posts.error?.message      ?? null },
        contacts:   { count: contacts.count   ?? 0, error: contacts.error?.message   ?? null },
        newsletter: { count: newsletter.count ?? 0, error: newsletter.error?.message ?? null },
        products:   { count: products.count   ?? 0, error: products.error?.message   ?? null },
      },
    })
  } catch (err: any) {
    return NextResponse.json({ status: "failed", error: err.message })
  }
}