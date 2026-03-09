// app/api/admin/gallery/route.ts
import { NextResponse } from "next/server"

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL!
const SERVICE_KEY  = process.env.SUPABASE_SERVICE_ROLE_KEY!

const DB_HEADERS = {
  "Content-Type":  "application/json",
  "apikey":        SERVICE_KEY,
  "Authorization": `Bearer ${SERVICE_KEY}`,
}

// POST — upload file to storage AND save record to gallery table
export async function POST(req: Request) {
  const contentType = req.headers.get("content-type") ?? ""

  // ── FILE UPLOAD ONLY (no DB save — called from handleUpload step 1) ──
  if (contentType.includes("multipart/form-data")) {
    try {
      const formData = await req.formData()
      const file     = formData.get("file") as File
      const folder   = (formData.get("folder") as string) || "gallery/images"

      if (!file) return NextResponse.json({ error: "No file provided" }, { status: 400 })

      const ext      = file.name.split(".").pop()
      const filename = `${folder}/${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`
      const buffer   = Buffer.from(await file.arrayBuffer())

      const uploadRes = await fetch(
        `${SUPABASE_URL}/storage/v1/object/emgo-media/${filename}`,
        {
          method:  "POST",
          headers: {
            "Authorization": `Bearer ${SERVICE_KEY}`,
            "apikey":        SERVICE_KEY,
            "Content-Type":  file.type,
            "Cache-Control": "3600",
          },
          body: buffer,
        }
      )

      if (!uploadRes.ok) {
        const err = await uploadRes.text()
        return NextResponse.json({ error: err }, { status: uploadRes.status })
      }

      const publicUrl = `${SUPABASE_URL}/storage/v1/object/public/emgo-media/${filename}`
      return NextResponse.json({ url: publicUrl })
    } catch (err: any) {
      return NextResponse.json({ error: err.message }, { status: 500 })
    }
  }

  // ── SAVE GALLERY RECORD TO DB ─────────────────────────────
  try {
    const body = await req.json()
    const { image_url, caption, category, media_type } = body

    if (!image_url) return NextResponse.json({ error: "image_url is required" }, { status: 400 })

    const res = await fetch(`${SUPABASE_URL}/rest/v1/gallery`, {
      method:  "POST",
      headers: { ...DB_HEADERS, "Prefer": "return=representation" },
      body: JSON.stringify({
        image_url,
        caption:    caption    ?? "",
        category:   category   ?? "General",
        media_type: media_type ?? "image",
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