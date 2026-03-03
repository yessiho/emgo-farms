// app/models/hero.ts
// Hero model — Supabase CRUD
// Table: hero (single row — always update, never insert multiple)

import { supabaseAdmin } from "@/lib/supabase"

export interface Hero {
  id?:          string
  title:        string
  subtitle:     string
  cta_text:     string
  cta_link:     string
  cta_title:    string
  cta_subtitle: string
  updated_at?:  string
}

// ── Get hero content (single row) ────────────────────────────
export async function getHero(): Promise<Hero | null> {
  const { data, error } = await supabaseAdmin
    .from("hero")
    .select("*")
    .order("updated_at", { ascending: false })
    .limit(1)
    .single()

  if (error) { console.error("getHero error:", error.message); return null }
  return data
}

// ── Update hero content ───────────────────────────────────────
export async function updateHero(payload: Partial<Hero>): Promise<Hero | null> {
  // Get existing row id first
  const existing = await getHero()

  if (existing?.id) {
    const { data, error } = await supabaseAdmin
      .from("hero")
      .update({ ...payload, updated_at: new Date().toISOString() })
      .eq("id", existing.id)
      .select()
      .single()
    if (error) { console.error("updateHero error:", error.message); return null }
    return data
  }

  // No row exists — create one
  const { data, error } = await supabaseAdmin
    .from("hero")
    .insert({ ...payload, updated_at: new Date().toISOString() })
    .select()
    .single()
  if (error) { console.error("createHero error:", error.message); return null }
  return data
}