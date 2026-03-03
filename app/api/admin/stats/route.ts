// app/api/admin/stats/route.ts
import { NextResponse } from "next/server"
import { createClient } from "@supabase/supabase-js"

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

export async function GET() {
  try {
    const [posts, contacts, newsletter, products, recentContacts, recentPosts] =
      await Promise.all([
        supabase.from("posts").select("id", { count: "exact" }),
        supabase.from("contacts").select("id", { count: "exact" }),
        supabase.from("newsletter").select("id", { count: "exact" }),
        supabase.from("products").select("id", { count: "exact" }),
        supabase.from("contacts").select("*").order("created_at", { ascending: false }).limit(5),
        supabase.from("posts").select("*").order("created_at", { ascending: false }).limit(5),
      ])

    return NextResponse.json({
      totalPosts:       posts.count       ?? 0,
      totalContacts:    contacts.count    ?? 0,
      totalSubscribers: newsletter.count  ?? 0,
      totalProducts:    products.count    ?? 0,
      recentContacts:   recentContacts.data ?? [],
      recentPosts:      recentPosts.data    ?? [],
    })
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch stats" }, { status: 500 })
  }
}