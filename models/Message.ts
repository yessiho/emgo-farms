// app/models/message.ts
// Message model — Supabase CRUD
// Table: messages (contact form submissions)

import { supabaseAdmin } from "@/lib/supabase"

export interface Message {
  id?:         string
  name:        string
  email:       string
  phone?:      string
  subject?:    string
  message:     string
  read?:       boolean
  created_at?: string
}

// ── Get all messages ──────────────────────────────────────────
export async function getMessages(): Promise<Message[]> {
  const { data, error } = await supabaseAdmin
    .from("messages")
    .select("*")
    .order("created_at", { ascending: false })

  if (error) { console.error("getMessages error:", error.message); return [] }
  return data ?? []
}

// ── Get single message ────────────────────────────────────────
export async function getMessage(id: string): Promise<Message | null> {
  const { data, error } = await supabaseAdmin
    .from("messages")
    .select("*")
    .eq("id", id)
    .single()

  if (error) { console.error("getMessage error:", error.message); return null }
  return data
}

// ── Create message ────────────────────────────────────────────
export async function createMessage(payload: Omit<Message, "id" | "created_at">): Promise<Message | null> {
  const { data, error } = await supabaseAdmin
    .from("messages")
    .insert({ ...payload, read: false })
    .select()
    .single()

  if (error) { console.error("createMessage error:", error.message); return null }
  return data
}

// ── Mark as read ──────────────────────────────────────────────
export async function markMessageRead(id: string): Promise<boolean> {
  const { error } = await supabaseAdmin
    .from("messages")
    .update({ read: true })
    .eq("id", id)

  if (error) { console.error("markMessageRead error:", error.message); return false }
  return true
}

// ── Delete message ────────────────────────────────────────────
export async function deleteMessage(id: string): Promise<boolean> {
  const { error } = await supabaseAdmin
    .from("messages")
    .delete()
    .eq("id", id)

  if (error) { console.error("deleteMessage error:", error.message); return false }
  return true
}

// ── Get unread count ──────────────────────────────────────────
export async function getUnreadCount(): Promise<number> {
  const { count, error } = await supabaseAdmin
    .from("messages")
    .select("id", { count: "exact", head: true })
    .eq("read", false)

  if (error) { console.error("getUnreadCount error:", error.message); return 0 }
  return count ?? 0
}