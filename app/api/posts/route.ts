import { NextResponse } from "next/server"
import { supabaseAdmin } from "@/lib/supabase"

export async function GET() {
  try {
    const { data, error } = await supabaseAdmin
      .from("posts")
      .select("*")
      .order("created_at", { ascending: false })

    if (error) {
      console.error("Supabase GET Error:", error)
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json(data)
  } catch (err) {
    console.error("Server GET Error:", err)
    return NextResponse.json({ error: "Failed to fetch posts" }, { status: 500 })
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const {
      title,
      category,
      content,
      excerpt,
      status,
      seo_title,
      seo_description,
      image_url
    } = body

    // Validate required fields
    if (!title || !category) {
      return NextResponse.json(
        { error: "Title and category are required" },
        { status: 400 }
      )
    }

    // Auto-generate slug and SEO fields if missing
    const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "")
    const autoSeoTitle = seo_title || title
    const autoSeoDesc = seo_description || excerpt || content?.slice(0, 160) || ""

    // Insert into Supabase
    const { data, error } = await supabaseAdmin
      .from("posts")
      .insert([{
        title,
        category,
        content: content ?? "",
        excerpt: excerpt ?? "",
        status: status ?? "draft",
        slug,
        seo_title: autoSeoTitle,
        seo_description: autoSeoDesc,
        image_url: image_url ?? "",
      }])
      .select()
      .single()

    if (error) {
      console.error("Supabase Insert Error:", error)
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json({ success: true, data })

  } catch (err) {
    console.error("Server POST Error:", err)
    return NextResponse.json({ error: "Failed to create post" }, { status: 500 })
  }
}