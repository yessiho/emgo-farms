// app/api/admin/upload/route.ts
// Server-side upload to Supabase Storage using Service Role key
import { NextResponse } from "next/server"

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL!
const SERVICE_KEY  = process.env.SUPABASE_SERVICE_ROLE_KEY!

export async function POST(req: Request) {
  try {
    const formData = await req.formData()
    const file     = formData.get("file") as File
    const folder   = (formData.get("folder") as string) || "products"

    if (!file) return NextResponse.json({ error: "No file" }, { status: 400 })

    const ext      = file.name.split(".").pop()
    const filename = `${folder}/${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`

    const buffer = Buffer.from(await file.arrayBuffer())

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