// lib/auth.ts
// ─────────────────────────────────────────────────────────────
// Supabase Auth helpers for EMGO Farms Admin
// Used in: API routes, middleware, server components, pages
// ─────────────────────────────────────────────────────────────

import { supabase, supabaseAdmin } from "@/lib/supabase"
import { createClient } from "@supabase/supabase-js"

// ── Types ─────────────────────────────────────────────────────
export interface AuthUser {
  id:         string
  email:      string
  role:       string
  name?:      string
  avatar_url?: string
  created_at?: string
}

export interface AuthSession {
  user:          AuthUser
  access_token:  string
  refresh_token: string
  expires_at:    number
}

export interface AuthResult {
  success: boolean
  user?:   AuthUser
  error?:  string
}

// ── Sign In ───────────────────────────────────────────────────
export async function signIn(
  email: string,
  password: string
): Promise<AuthResult> {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  })

  if (error) {
    return {
      success: false,
      error:   error.message === "Invalid login credentials"
        ? "Invalid email or password. Please try again."
        : error.message,
    }
  }

  return {
    success: true,
    user: {
      id:    data.user.id,
      email: data.user.email!,
      role:  (data.user.user_metadata?.role as string) ?? "admin",
      name:  (data.user.user_metadata?.name as string) ?? "Admin",
    },
  }
}

// ── Sign Out ──────────────────────────────────────────────────
export async function signOut(): Promise<{ success: boolean; error?: string }> {
  const { error } = await supabase.auth.signOut()
  if (error) return { success: false, error: error.message }
  return { success: true }
}

// ── Get current session (client side) ────────────────────────
export async function getSession(): Promise<AuthSession | null> {
  const { data: { session }, error } = await supabase.auth.getSession()
  if (error || !session) return null

  return {
    user: {
      id:    session.user.id,
      email: session.user.email!,
      role:  (session.user.user_metadata?.role as string) ?? "admin",
      name:  (session.user.user_metadata?.name as string) ?? "Admin",
    },
    access_token:  session.access_token,
    refresh_token: session.refresh_token,
    expires_at:    session.expires_at ?? 0,
  }
}

// ── Get current user (client side) ───────────────────────────
export async function getCurrentUser(): Promise<AuthUser | null> {
  const { data: { user }, error } = await supabase.auth.getUser()
  if (error || !user) return null

  return {
    id:    user.id,
    email: user.email!,
    role:  (user.user_metadata?.role as string) ?? "admin",
    name:  (user.user_metadata?.name as string) ?? "Admin",
  }
}

// ── Check if authenticated (client side) ─────────────────────
export async function isAuthenticated(): Promise<boolean> {
  const session = await getSession()
  return session !== null
}

// ── Check if session is expired ───────────────────────────────
export function isSessionExpired(expiresAt: number): boolean {
  return Date.now() / 1000 > expiresAt
}

// ── Refresh session ───────────────────────────────────────────
export async function refreshSession(): Promise<AuthSession | null> {
  const { data: { session }, error } = await supabase.auth.refreshSession()
  if (error || !session) return null

  return {
    user: {
      id:    session.user.id,
      email: session.user.email!,
      role:  (session.user.user_metadata?.role as string) ?? "admin",
      name:  (session.user.user_metadata?.name as string) ?? "Admin",
    },
    access_token:  session.access_token,
    refresh_token: session.refresh_token,
    expires_at:    session.expires_at ?? 0,
  }
}

// ── Reset password (send email) ───────────────────────────────
export async function resetPassword(
  email: string
): Promise<{ success: boolean; error?: string }> {
  const { error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${process.env.NEXTAUTH_URL}/admin/reset-password`,
  })
  if (error) return { success: false, error: error.message }
  return { success: true }
}

// ── Update password ───────────────────────────────────────────
export async function updatePassword(
  newPassword: string
): Promise<{ success: boolean; error?: string }> {
  const { error } = await supabase.auth.updateUser({ password: newPassword })
  if (error) return { success: false, error: error.message }
  return { success: true }
}

// ── Update user profile ───────────────────────────────────────
export async function updateProfile(
  data: { name?: string; avatar_url?: string }
): Promise<{ success: boolean; error?: string }> {
  const { error } = await supabase.auth.updateUser({
    data: { ...data },
  })
  if (error) return { success: false, error: error.message }
  return { success: true }
}

// ── Admin: Get all auth users (server only) ───────────────────
export async function getAuthUsers(): Promise<AuthUser[]> {
  const { data, error } = await supabaseAdmin.auth.admin.listUsers()
  if (error) { console.error("getAuthUsers error:", error.message); return [] }

  return data.users.map(u => ({
    id:         u.id,
    email:      u.email!,
    role:       (u.user_metadata?.role as string) ?? "user",
    name:       (u.user_metadata?.name as string) ?? "",
    created_at: u.created_at,
  }))
}

// ── Admin: Create new user (server only) ─────────────────────
export async function createAuthUser(
  email: string,
  password: string,
  metadata?: { name?: string; role?: string }
): Promise<AuthResult> {
  const { data, error } = await supabaseAdmin.auth.admin.createUser({
    email,
    password,
    user_metadata: metadata ?? {},
    email_confirm: true,
  })

  if (error) return { success: false, error: error.message }

  return {
    success: true,
    user: {
      id:    data.user.id,
      email: data.user.email!,
      role:  (data.user.user_metadata?.role as string) ?? "user",
      name:  (data.user.user_metadata?.name as string) ?? "",
    },
  }
}

// ── Admin: Delete user (server only) ─────────────────────────
export async function deleteAuthUser(
  userId: string
): Promise<{ success: boolean; error?: string }> {
  const { error } = await supabaseAdmin.auth.admin.deleteUser(userId)
  if (error) return { success: false, error: error.message }
  return { success: true }
}

// ── Verify token from request header (API route guard) ────────
export async function verifyToken(
  authHeader: string | null
): Promise<AuthUser | null> {
  if (!authHeader?.startsWith("Bearer ")) return null

  const token = authHeader.replace("Bearer ", "")

  const { data: { user }, error } = await supabaseAdmin.auth.getUser(token)
  if (error || !user) return null

  return {
    id:    user.id,
    email: user.email!,
    role:  (user.user_metadata?.role as string) ?? "user",
    name:  (user.user_metadata?.name as string) ?? "",
  }
}

// ── Auth state change listener ────────────────────────────────
export function onAuthStateChange(
  callback: (user: AuthUser | null) => void
) {
  return supabase.auth.onAuthStateChange((event, session) => {
    if (session?.user) {
      callback({
        id:    session.user.id,
        email: session.user.email!,
        role:  (session.user.user_metadata?.role as string) ?? "admin",
        name:  (session.user.user_metadata?.name as string) ?? "Admin",
      })
    } else {
      callback(null)
    }
  })
}