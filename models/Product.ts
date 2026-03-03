// app/models/products.ts
// Products model — Supabase CRUD
// Table: products

import { supabaseAdmin } from "@/lib/supabase"

export interface Product {
  id?:          string
  name:         string
  category:     string
  price?:       string
  unit?:        string
  description?: string
  status?:      "active" | "inactive"
  in_stock?:    boolean
  image_url?:   string
  created_at?:  string
  updated_at?:  string
}

// ── Get all products ──────────────────────────────────────────
export async function getProducts(status?: "active" | "inactive"): Promise<Product[]> {
  let query = supabaseAdmin.from("products").select("*").order("created_at", { ascending: false })
  if (status) query = query.eq("status", status)

  const { data, error } = await query
  if (error) { console.error("getProducts error:", error.message); return [] }
  return data ?? []
}

// ── Get single product ────────────────────────────────────────
export async function getProduct(id: string): Promise<Product | null> {
  const { data, error } = await supabaseAdmin
    .from("products")
    .select("*")
    .eq("id", id)
    .single()

  if (error) { console.error("getProduct error:", error.message); return null }
  return data
}

// ── Get products by category ──────────────────────────────────
export async function getProductsByCategory(category: string): Promise<Product[]> {
  const { data, error } = await supabaseAdmin
    .from("products")
    .select("*")
    .eq("category", category)
    .eq("status", "active")
    .order("created_at", { ascending: false })

  if (error) { console.error("getProductsByCategory error:", error.message); return [] }
  return data ?? []
}

// ── Create product ────────────────────────────────────────────
export async function createProduct(payload: Omit<Product, "id" | "created_at" | "updated_at">): Promise<Product | null> {
  const { data, error } = await supabaseAdmin
    .from("products")
    .insert({ ...payload, status: payload.status ?? "active", in_stock: payload.in_stock ?? true })
    .select()
    .single()

  if (error) { console.error("createProduct error:", error.message); return null }
  return data
}

// ── Update product ────────────────────────────────────────────
export async function updateProduct(id: string, payload: Partial<Product>): Promise<Product | null> {
  const { data, error } = await supabaseAdmin
    .from("products")
    .update({ ...payload, updated_at: new Date().toISOString() })
    .eq("id", id)
    .select()
    .single()

  if (error) { console.error("updateProduct error:", error.message); return null }
  return data
}

// ── Delete product ────────────────────────────────────────────
export async function deleteProduct(id: string): Promise<boolean> {
  const { error } = await supabaseAdmin.from("products").delete().eq("id", id)
  if (error) { console.error("deleteProduct error:", error.message); return false }
  return true
}

// ── Toggle stock ──────────────────────────────────────────────
export async function toggleStock(id: string, in_stock: boolean): Promise<boolean> {
  const { error } = await supabaseAdmin
    .from("products")
    .update({ in_stock, updated_at: new Date().toISOString() })
    .eq("id", id)
  if (error) { console.error("toggleStock error:", error.message); return false }
  return true
}