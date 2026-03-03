// app/models/user.ts
// User model — Supabase Auth + users table CRUD
// Table: users (mirrors Supabase Auth users)

import { supabaseAdmin } from "@/lib/supabase"

export interface User {
  id?:          string
  email:        string
  name?:        string
  role?:        "admin" | "user"
  avatar_url?:  string
  created_at?:  string
}

// ── Get all users ─────────────────────────────────────────────
export async function getUsers(): Promise<User[]> {
  const { data, error } = await supabaseAdmin
    .from("users")
    .select("*")
    .order("created_at", { ascending: false })

  if (error) { console.error("getUsers error:", error.message); return [] }
  return data ?? []
}

// ── Get single user by ID ─────────────────────────────────────
export async function getUser(id: string): Promise<User | null> {
  const { data, error } = await supabaseAdmin
    .from("users")
    .select("*")
    .eq("id", id)
    .single()

  if (error) { console.error("getUser error:", error.message); return null }
  return data
}

// ── Get user by email ─────────────────────────────────────────
export async function getUserByEmail(email: string): Promise<User | null> {
  const { data, error } = await supabaseAdmin
    .from("users")
    .select("*")
    .eq("email", email)
    .single()

  if (error) { console.error("getUserByEmail error:", error.message); return null }
  return data
}

// ── Create user ───────────────────────────────────────────────
export async function createUser(payload: Omit<User, "id" | "created_at">): Promise<User | null> {
  const { data, error } = await supabaseAdmin
    .from("users")
    .insert({ ...payload, role: payload.role ?? "user" })
    .select()
    .single()

  if (error) { console.error("createUser error:", error.message); return null }
  return data
}

// ── Update user ───────────────────────────────────────────────
export async function updateUser(id: string, payload: Partial<User>): Promise<User | null> {
  const { data, error } = await supabaseAdmin
    .from("users")
    .update(payload)
    .eq("id", id)
    .select()
    .single()

  if (error) { console.error("updateUser error:", error.message); return null }
  return data
}

// ── Delete user ───────────────────────────────────────────────
export async function deleteUser(id: string): Promise<boolean> {
  const { error } = await supabaseAdmin.from("users").delete().eq("id", id)
  if (error) { console.error("deleteUser error:", error.message); return false }
  return true
}

// ── Get current session user ──────────────────────────────────
export async function getCurrentUser() {
  const { data: { session } } = await supabaseAdmin.auth.getSession()
  if (!session) return null
  return session.user
}

// ── Check if admin ────────────────────────────────────────────
export async function isAdmin(id: string): Promise<boolean> {
  const user = await getUser(id)
  return user?.role === "admin"
}