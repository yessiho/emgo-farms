// app/models/post.ts
// Post model — Supabase CRUD
// Table: posts (blog posts with auto SEO)

import { supabaseAdmin } from "@/lib/supabase"

export interface Post {
  id?:              string
  title:            string
  category:         string
  content?:         string
  excerpt?:         string
  status?:          "draft" | "published"
  slug?:            string
  seo_title?:       string
  seo_description?: string
  image_url?:       string
  created_at?:      string
  updated_at?:      string
}

// ── Auto-generate slug from title ────────────────────────────
function toSlug(title: string): string {
  return title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "")
}

// ── Get all posts ─────────────────────────────────────────────
export async function getPosts(status?: "draft" | "published"): Promise<Post[]> {
  let query = supabaseAdmin.from("posts").select("*").order("created_at", { ascending: false })
  if (status) query = query.eq("status", status)

  const { data, error } = await query
  if (error) { console.error("getPosts error:", error.message); return [] }
  return data ?? []
}

// ── Get single post by ID ─────────────────────────────────────
export async function getPost(id: string): Promise<Post | null> {
  const { data, error } = await supabaseAdmin
    .from("posts")
    .select("*")
    .eq("id", id)
    .single()

  if (error) { console.error("getPost error:", error.message); return null }
  return data
}

// ── Get post by slug ──────────────────────────────────────────
export async function getPostBySlug(slug: string): Promise<Post | null> {
  const { data, error } = await supabaseAdmin
    .from("posts")
    .select("*")
    .eq("slug", slug)
    .single()

  if (error) { console.error("getPostBySlug error:", error.message); return null }
  return data
}

// ── Create post ───────────────────────────────────────────────
export async function createPost(payload: Omit<Post, "id" | "created_at" | "updated_at">): Promise<Post | null> {
  const slug            = payload.slug    || toSlug(payload.title)
  const seo_title       = payload.seo_title       || payload.title
  const seo_description = payload.seo_description || payload.excerpt || payload.content?.slice(0, 160) || ""

  const { data, error } = await supabaseAdmin
    .from("posts")
    .insert({ ...payload, slug, seo_title, seo_description, status: payload.status ?? "draft" })
    .select()
    .single()

  if (error) { console.error("createPost error:", error.message); return null }
  return data
}

// ── Update post ───────────────────────────────────────────────
export async function updatePost(id: string, payload: Partial<Post>): Promise<Post | null> {
  const slug            = payload.title ? toSlug(payload.title) : undefined
  const seo_title       = payload.seo_title       || payload.title
  const seo_description = payload.seo_description || payload.excerpt || ""

  const { data, error } = await supabaseAdmin
    .from("posts")
    .update({ ...payload, ...(slug && { slug }), seo_title, seo_description, updated_at: new Date().toISOString() })
    .eq("id", id)
    .select()
    .single()

  if (error) { console.error("updatePost error:", error.message); return null }
  return data
}

// ── Delete post ───────────────────────────────────────────────
export async function deletePost(id: string): Promise<boolean> {
  const { error } = await supabaseAdmin.from("posts").delete().eq("id", id)
  if (error) { console.error("deletePost error:", error.message); return false }
  return true
}

// ── Publish / unpublish ───────────────────────────────────────
export async function setPostStatus(id: string, status: "draft" | "published"): Promise<boolean> {
  const { error } = await supabaseAdmin
    .from("posts")
    .update({ status, updated_at: new Date().toISOString() })
    .eq("id", id)
  if (error) { console.error("setPostStatus error:", error.message); return false }
  return true
}