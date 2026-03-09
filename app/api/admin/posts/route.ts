// app/api/admin/posts/route.ts
import { NextResponse } from "next/server"
import { supabaseAdmin } from "@/lib/supabase"

export async function GET() {
  const { data, error } = await supabaseAdmin
    .from("posts")
    .select("*")
    .order("created_at", { ascending: false })
  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json(data)
}

export async function POST(req: Request) {
  try {
    const body = await req.json()
    console.log("POST /api/admin/posts body:", body)

    const { title, category, content, excerpt, status, seo_title, seo_description, image_url } = body

    if (!title || !category)
      return NextResponse.json({ error: "Title and category required" }, { status: 400 })

    const slug         = title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "")
    const autoSeoTitle = seo_title || title
    const autoSeoDesc  = seo_description || excerpt || content?.slice(0, 160) || ""

    const payload = {
      title,
      category,
      content:         content         ?? "",
      excerpt:         excerpt         ?? "",
      status:          status          ?? "draft",
      slug,
      seo_title:       autoSeoTitle,
      seo_description: autoSeoDesc,
      image_url:       image_url       ?? "",
    }

    console.log("Inserting payload:", payload)

    const { data, error } = await supabaseAdmin
      .from("posts")
      .insert(payload)
      .select()
      .single()

    if (error) {
      console.error("Supabase insert error:", error)
      return NextResponse.json({ error: error.message, details: error }, { status: 500 })
    }

    return NextResponse.json({ success: true, data })
  } catch (err: any) {
    console.error("POST /api/admin/posts caught error:", err)
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}