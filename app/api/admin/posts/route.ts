// app/api/admin/posts/route.ts
import { NextResponse } from "next/server"

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL!
const SERVICE_KEY  = process.env.SUPABASE_SERVICE_ROLE_KEY!

const HEADERS = {
  "Content-Type":  "application/json",
  "apikey":        SERVICE_KEY,
  "Authorization": `Bearer ${SERVICE_KEY}`,
}

export async function GET() {
  try {
    const res  = await fetch(
      `${SUPABASE_URL}/rest/v1/posts?select=*&order=created_at.desc`,
      { headers: HEADERS, cache: "no-store" }
    )
    const text = await res.text()
    if (!res.ok) return NextResponse.json({ error: text }, { status: res.status })
    return NextResponse.json(JSON.parse(text))
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { title, category, content, excerpt, status, seo_title, seo_description, image_url } = body

    if (!title?.trim() || !category?.trim())
      return NextResponse.json({ error: "Title and category required" }, { status: 400 })

    const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "")

    const res  = await fetch(`${SUPABASE_URL}/rest/v1/posts`, {
      method:  "POST",
      headers: { ...HEADERS, "Prefer": "return=representation" },
      body: JSON.stringify({
        title:           title.trim(),
        category:        category.trim(),
        content:         content         ?? "",
        excerpt:         excerpt         ?? "",
        status:          status          ?? "draft",
        slug,
        seo_title:       seo_title       || title,
        seo_description: seo_description || excerpt || content?.slice(0, 160) || "",
        image_url:       image_url       ?? "",
      }),
    })
    const text = await res.text()
    if (!res.ok) return NextResponse.json({ error: text }, { status: res.status })
    const data = JSON.parse(text)
    return NextResponse.json({ success: true, data: Array.isArray(data) ? data[0] : data })
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}