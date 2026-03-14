// app/api/admin/gallery-signed/route.ts
// Returns a signed URL so the browser can upload LARGE files (videos)
// directly to Supabase Storage — bypassing Vercel's 4.5MB body limit
import { NextResponse } from "next/server"

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL!
const SERVICE_KEY  = process.env.SUPABASE_SERVICE_ROLE_KEY!

export async function POST(req: Request) {
  try {
    const { filename, contentType } = await req.json()
    if (!filename) return NextResponse.json({ error: "filename required" }, { status: 400 })

    // Ask Supabase to create a signed upload URL
    const res = await fetch(
      `${SUPABASE_URL}/storage/v1/object/upload/sign/emgo-media/${filename}`,
      {
        method: "POST",
        headers: {
          "apikey":        SERVICE_KEY,
          "Authorization": `Bearer ${SERVICE_KEY}`,
          "Content-Type":  "application/json",
        },
        body: JSON.stringify({ expiresIn: 3600 }),
      }
    )

    const text = await res.text()
    if (!res.ok) return NextResponse.json({ error: text }, { status: res.status })

    const json      = JSON.parse(text)
    const signedUrl = json.signedURL ?? json.signedUrl ?? json.url
    const publicUrl = `${SUPABASE_URL}/storage/v1/object/public/emgo-media/${filename}`

    return NextResponse.json({ signedUrl, publicUrl })
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}