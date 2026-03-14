// app/api/admin/products/route.ts
import { NextResponse } from "next/server"

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL!
const SERVICE_KEY  = process.env.SUPABASE_SERVICE_ROLE_KEY!

const DB_HEADERS = {
  "Content-Type":  "application/json",
  "apikey":        SERVICE_KEY,
  "Authorization": `Bearer ${SERVICE_KEY}`,
}

// GET — list all products
export async function GET() {
  try {
    const res = await fetch(`${SUPABASE_URL}/rest/v1/products?select=*&order=created_at.desc`, {
      headers: DB_HEADERS,
    })
    const text = await res.text()
    if (!res.ok) return NextResponse.json({ error: text }, { status: res.status })
    return NextResponse.json(JSON.parse(text))
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}

// POST — create product OR upload image (multipart)
export async function POST(req: Request) {
  const contentType = req.headers.get("content-type") ?? ""

  // ── IMAGE UPLOAD ──────────────────────────────────────────
  if (contentType.includes("multipart/form-data")) {
    try {
      const formData = await req.formData()
      const file     = formData.get("file") as File
      const folder   = (formData.get("folder") as string) || "products"

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

      const uploadText = await uploadRes.text()
      console.log("[upload] status:", uploadRes.status, "body:", uploadText)
      console.log("[upload] SUPABASE_URL:", SUPABASE_URL ? "SET" : "MISSING")
      console.log("[upload] SERVICE_KEY:", SERVICE_KEY ? "SET (len=" + SERVICE_KEY.length + ")" : "MISSING")

      if (!uploadRes.ok) {
        return NextResponse.json({ error: uploadText }, { status: uploadRes.status })
      }

      const publicUrl = `${SUPABASE_URL}/storage/v1/object/public/emgo-media/${filename}`
      return NextResponse.json({ url: publicUrl })
    } catch (err: any) {
      console.log("[upload] caught error:", err.message)
      return NextResponse.json({ error: err.message }, { status: 500 })
    }
  }

  // ── CREATE PRODUCT ────────────────────────────────────────
  try {
    const body = await req.json()
    const { name, category, price, unit, description, status, in_stock, image_url } = body
    if (!name?.trim()) return NextResponse.json({ error: "Name is required" }, { status: 400 })

    const res = await fetch(`${SUPABASE_URL}/rest/v1/products`, {
      method:  "POST",
      headers: { ...DB_HEADERS, "Prefer": "return=representation" },
      body: JSON.stringify({
        name:        name.trim(),
        category:    category    ?? "Other",
        price:       parseFloat(price) || 0,
        unit:        unit        ?? "per unit",
        description: description ?? "",
        status:      status      ?? "active",
        in_stock:    in_stock    ?? true,
        image_url:   image_url   ?? "",
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