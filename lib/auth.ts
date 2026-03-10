// lib/auth.ts
import { supabase } from "@/lib/supabase"

export interface AuthUser {
  id:          string
  email:       string
  role:        string
  name?:       string
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
export async function signIn(email: string, password: string): Promise<AuthResult> {
  const { data, error } = await supabase.auth.signInWithPassword({ email, password })
  if (error) {
    return {
      success: false,
      error: error.message === "Invalid login credentials"
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

// ── Get session ───────────────────────────────────────────────
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

// ── Get current user ──────────────────────────────────────────
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

export async function isAuthenticated(): Promise<boolean> {
  const session = await getSession()
  return session !== null
}

export function isSessionExpired(expiresAt: number): boolean {
  return Date.now() / 1000 > expiresAt
}

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

export async function resetPassword(email: string): Promise<{ success: boolean; error?: string }> {
  const { error } = await supabase.auth.resetPasswordForEmail(email)
  if (error) return { success: false, error: error.message }
  return { success: true }
}

export async function updatePassword(newPassword: string): Promise<{ success: boolean; error?: string }> {
  const { error } = await supabase.auth.updateUser({ password: newPassword })
  if (error) return { success: false, error: error.message }
  return { success: true }
}

export async function updateProfile(data: { name?: string; avatar_url?: string }): Promise<{ success: boolean; error?: string }> {
  const { error } = await supabase.auth.updateUser({ data })
  if (error) return { success: false, error: error.message }
  return { success: true }
}

export function onAuthStateChange(callback: (user: AuthUser | null) => void) {
  return supabase.auth.onAuthStateChange((_, session) => {
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