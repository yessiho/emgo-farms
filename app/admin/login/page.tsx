'use client'

// app/admin/login/page.tsx
import { useState } from "react"
import { useRouter } from "next/navigation"
import { supabase } from "@/lib/supabase"
import { Leaf, Eye, EyeOff, LogIn } from "lucide-react"

export default function AdminLoginPage() {
  const router = useRouter()
  const [email,    setEmail]    = useState("")
  const [password, setPassword] = useState("")
  const [showPass, setShowPass] = useState(false)
  const [loading,  setLoading]  = useState(false)
  const [error,    setError]    = useState("")

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError("")
    const { error } = await supabase.auth.signInWithPassword({ email, password })
    if (error) {
      setError("Invalid email or password. Please try again.")
      setLoading(false)
      return
    }
    router.push("/admin/dashboard")
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-950 via-green-900 to-green-800 flex items-center justify-center p-4">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-32 -left-32 w-96 h-96 rounded-full bg-orange-500/10 blur-3xl" />
        <div className="absolute -bottom-32 -right-32 w-96 h-96 rounded-full bg-green-400/10 blur-3xl" />
      </div>
      <div className="relative w-full max-w-md">
        <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-8 shadow-2xl">
          <div className="text-center mb-8">
            <div className="w-14 h-14 rounded-2xl bg-orange-500 flex items-center justify-center mx-auto mb-4 shadow-xl">
              <Leaf size={26} className="text-white" />
            </div>
            <h1 className="text-2xl font-bold text-white">EMGO Farms</h1>
            <p className="text-green-300 text-sm mt-1">Admin Dashboard</p>
          </div>
          <form onSubmit={handleLogin} className="space-y-4">
            {error && (
              <div className="bg-red-500/20 border border-red-400/30 text-red-200 text-sm rounded-xl px-4 py-3">{error}</div>
            )}
            <div>
              <label className="block text-xs font-semibold text-green-200 mb-1.5 uppercase tracking-wider">Email</label>
              <input type="email" required value={email} onChange={e => setEmail(e.target.value)} placeholder="admin@emgofarms.com"
                className="w-full px-4 py-3 text-sm bg-white/10 border border-white/20 rounded-xl text-white placeholder-green-300/50 focus:outline-none focus:ring-2 focus:ring-orange-500 transition" />
            </div>
            <div>
              <label className="block text-xs font-semibold text-green-200 mb-1.5 uppercase tracking-wider">Password</label>
              <div className="relative">
                <input type={showPass ? "text" : "password"} required value={password} onChange={e => setPassword(e.target.value)} placeholder="••••••••"
                  className="w-full px-4 py-3 pr-11 text-sm bg-white/10 border border-white/20 rounded-xl text-white placeholder-green-300/50 focus:outline-none focus:ring-2 focus:ring-orange-500 transition" />
                <button type="button" onClick={() => setShowPass(s => !s)} className="absolute right-3 top-1/2 -translate-y-1/2 text-green-300 hover:text-white transition">
                  {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>
            <button type="submit" disabled={loading}
              className="w-full flex items-center justify-center gap-2 py-3.5 bg-orange-500 hover:bg-orange-600 disabled:opacity-60 text-white rounded-xl font-semibold text-sm transition shadow-lg mt-2">
              {loading ? <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" /> : <LogIn size={16} />}
              {loading ? "Signing in…" : "Sign In"}
            </button>
          </form>
          <p className="text-center text-green-400/60 text-xs mt-6">Protected area · EMGO Farms Admin</p>
        </div>
      </div>
    </div>
  )
}