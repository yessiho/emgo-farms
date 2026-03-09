// app/api/admin/products/[id]/route.ts
import { NextResponse } from "next/server"

const URL = process.env.NEXT_PUBLIC_SUPABASE_URL!
const KEY = process.env.SUPABASE_SERVICE_ROLE_KEY!

const headers = {
  "Content-Type":  "application/json",
  "apikey":        KEY,
  "Authorization": `Bearer ${KEY}`,
}

export async function PUT(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params
    const body = await req.json()
    const { name, category, price, unit, description, status, in_stock, image_url } = body

    const res = await fetch(`${URL}/rest/v1/products?id=eq.${id}`, {
      method: "PATCH",
      headers: { ...headers, "Prefer": "return=representation" },
      body: JSON.stringify({
        name:        name?.trim(),
        category,
        price:       parseFloat(price) || 0,
        unit,
        description,
        status,
        in_stock,
        image_url,
        updated_at:  new Date().toISOString(),
      }),
    })
    const text = await res.text()
    if (!res.ok) return NextResponse.json({ error: text }, { status: res.status })
    return NextResponse.json({ success: true })
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}

export async function DELETE(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params
    const res = await fetch(`${URL}/rest/v1/products?id=eq.${id}`, {
      method: "DELETE",
      headers,
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