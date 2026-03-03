// app/api/admin/posts/route.ts
import { NextResponse } from "next/server"
import { createClient } from "@supabase/supabase-js"

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

export async function GET() {
  const { data, error } = await supabase
    .from("posts")
    .select("*")
    .order("created_at", { ascending: false })
  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json(data)
}

export async function POST(req: Request) {
  const body = await req.json()
  const { title, category, content, excerpt, status, seo_title, seo_description, image_url } = body
  if (!title || !category)
    return NextResponse.json({ error: "Title and category required" }, { status: 400 })

  // Auto-generate SEO if not provided
  const autoSeoTitle = seo_title || title
  const autoSeoDesc  = seo_description || excerpt || content?.slice(0, 160) || ""
  const slug         = title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "")

  const { data, error } = await supabase.from("posts").insert({
    title, category,
    content:         content         ?? "",
    excerpt:         excerpt         ?? "",
    status:          status          ?? "draft",
    slug,
    seo_title:       autoSeoTitle,
    seo_description: autoSeoDesc,
    image_url:       image_url       ?? "",
  }).select().single()

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json({ success: true, data })
}