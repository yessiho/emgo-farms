// app/api/admin/products/route.ts
import { NextResponse } from "next/server"
import { createClient } from "@supabase/supabase-js"

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

export async function GET() {
  const { data, error } = await supabase
    .from("products")
    .select("*")
    .order("created_at", { ascending: false })
  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json(data)
}

export async function POST(req: Request) {
  const body = await req.json()
  const { name, category, price, unit, description, status, in_stock, image_url } = body
  if (!name || !category)
    return NextResponse.json({ error: "Name and category required" }, { status: 400 })
  const { data, error } = await supabase.from("products").insert({
    name, category,
    price:       price       ?? "",
    unit:        unit        ?? "",
    description: description ?? "",
    status:      status      ?? "active",
    in_stock:    in_stock    ?? true,
    image_url:   image_url   ?? "",
  }).select().single()
  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json({ success: true, data })
}