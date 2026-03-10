// app/api/admin/posts/[id]/route.ts
import { NextResponse } from "next/server"

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL!
const SERVICE_KEY  = process.env.SUPABASE_SERVICE_ROLE_KEY!

const HEADERS = {
  "Content-Type":  "application/json",
  "apikey":        SERVICE_KEY,
  "Authorization": `Bearer ${SERVICE_KEY}`,
}

export async function PUT(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const body   = await req.json()
    const { title, category, content, excerpt, status, seo_title, seo_description, image_url } = body

    const slug = title?.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "")

    const res  = await fetch(`${SUPABASE_URL}/rest/v1/posts?id=eq.${id}`, {
      method:  "PATCH",
      headers: { ...HEADERS, "Prefer": "return=representation" },
      body: JSON.stringify({
        title,
        category,
        content:         content         ?? "",
        excerpt:         excerpt         ?? "",
        status:          status          ?? "draft",
        slug,
        seo_title:       seo_title       || title,
        seo_description: seo_description || excerpt || "",
        image_url:       image_url       ?? "",
        updated_at:      new Date().toISOString(),
      }),
    })
    const text = await res.text()
    if (!res.ok) return NextResponse.json({ error: text }, { status: res.status })
    return NextResponse.json({ success: true })
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}

export async function DELETE(
  _req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const res    = await fetch(`${SUPABASE_URL}/rest/v1/posts?id=eq.${id}`, {
      method:  "DELETE",
      headers: HEADERS,
    })
    if (!res.ok) {
      const text = await res.text()
      return NextResponse.json({ error: text }, { status: res.status })
    }
    return NextResponse.json({ success: true })
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}