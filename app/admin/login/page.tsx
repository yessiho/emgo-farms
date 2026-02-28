'use client'

// app/admin/login/page.tsx
// Place at: app/admin/login/page.tsx
// Access at: http://localhost:3000/admin/login

import { useState } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { Leaf, Eye, EyeOff, Lock, User, AlertCircle } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

export default function AdminLoginPage() {
  const router   = useRouter()
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [showPw,   setShowPw]   = useState(false)
  const [loading,  setLoading]  = useState(false)
  const [error,    setError]    = useState<string | null>(null)

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      })

      const data = await res.json()

      if (!res.ok) {
        setError(data.error ?? "Invalid credentials. Please try again.")
        return
      }

      // Success — redirect to dashboard
      router.push("/admin/dashboard")

    } catch {
      setError("Unable to connect. Please check your connection and try again.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-green-950 flex items-center justify-center relative overflow-hidden font-sans">

      {/* ── Decorative background circles ── */}
      <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-green-800/30 rounded-full -translate-x-1/2 -translate-y-1/2 blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-orange-900/20 rounded-full translate-x-1/3 translate-y-1/3 blur-3xl pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-green-900/40 rounded-full blur-3xl pointer-events-none" />

      {/* ── Dot grid overlay ── */}
      <div
        className="absolute inset-0 pointer-events-none opacity-10"
        style={{
          backgroundImage: "radial-gradient(circle, #86efac 1px, transparent 1px)",
          backgroundSize: "32px 32px",
        }}
      />

      {/* ── Login card ── */}
      <motion.div
        initial={{ opacity: 0, y: 40, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="relative z-10 w-full max-w-md mx-4"
      >
        <div className="bg-white/5 backdrop-blur-2xl border border-white/10 rounded-3xl shadow-2xl overflow-hidden">

          {/* ── Top brand bar ── */}
          <div className="bg-gradient-to-r from-green-800 to-green-700 px-8 py-7 text-center relative overflow-hidden">
            {/* Shimmer line */}
            <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent" />

            {/* Logo */}
            <div className="flex justify-center mb-4">
              <div className="w-14 h-14 bg-white/10 border border-white/20 rounded-2xl flex items-center justify-center shadow-xl">
                <Leaf size={28} className="text-orange-400" />
              </div>
            </div>

            <h1 className="text-white font-bold text-xl tracking-wide">EMGO Farms</h1>
            <p className="text-green-300 text-xs mt-1 tracking-widest uppercase font-semibold">
              Admin Portal
            </p>
          </div>

          {/* ── Form area ── */}
          <div className="px-8 py-8">

            <div className="mb-7 text-center">
              <h2 className="text-white text-lg font-bold">Welcome back</h2>
              <p className="text-green-400 text-xs mt-1">Sign in to access your dashboard</p>
            </div>

            <form onSubmit={handleLogin} className="space-y-4">

              {/* Username */}
              <div className="space-y-1.5">
                <label className="text-green-300 text-xs font-semibold uppercase tracking-wider">
                  Username
                </label>
                <div className="relative">
                  <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-green-500 pointer-events-none">
                    <User size={15} />
                  </div>
                  <input
                    type="text"
                    value={username}
                    onChange={e => setUsername(e.target.value)}
                    required
                    autoComplete="username"
                    placeholder="Enter your username"
                    className="w-full bg-white/8 border border-white/15 rounded-xl pl-10 pr-4 py-3 text-white text-sm placeholder-green-700 focus:outline-none focus:ring-2 focus:ring-orange-500/60 focus:border-orange-500/50 transition-all duration-200"
                    style={{ background: "rgba(255,255,255,0.06)" }}
                  />
                </div>
              </div>

              {/* Password */}
              <div className="space-y-1.5">
                <label className="text-green-300 text-xs font-semibold uppercase tracking-wider">
                  Password
                </label>
                <div className="relative">
                  <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-green-500 pointer-events-none">
                    <Lock size={15} />
                  </div>
                  <input
                    type={showPw ? "text" : "password"}
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    required
                    autoComplete="current-password"
                    placeholder="Enter your password"
                    className="w-full bg-white/8 border border-white/15 rounded-xl pl-10 pr-11 py-3 text-white text-sm placeholder-green-700 focus:outline-none focus:ring-2 focus:ring-orange-500/60 focus:border-orange-500/50 transition-all duration-200"
                    style={{ background: "rgba(255,255,255,0.06)" }}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPw(v => !v)}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-green-500 hover:text-green-300 transition-colors"
                    tabIndex={-1}
                  >
                    {showPw ? <EyeOff size={15} /> : <Eye size={15} />}
                  </button>
                </div>
              </div>

              {/* Error message */}
              <AnimatePresence>
                {error && (
                  <motion.div
                    initial={{ opacity: 0, y: -8, height: 0 }}
                    animate={{ opacity: 1, y: 0, height: "auto" }}
                    exit={{ opacity: 0, y: -8, height: 0 }}
                    transition={{ duration: 0.2 }}
                    className="flex items-start gap-2.5 bg-red-500/10 border border-red-500/20 rounded-xl px-4 py-3"
                  >
                    <AlertCircle size={14} className="text-red-400 flex-shrink-0 mt-0.5" />
                    <p className="text-red-300 text-xs leading-relaxed">{error}</p>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Submit button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full mt-2 py-3.5 bg-orange-500 hover:bg-orange-400 disabled:opacity-60 disabled:cursor-not-allowed text-white font-bold text-sm rounded-xl shadow-lg shadow-orange-900/30 hover:shadow-orange-900/50 hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 flex items-center justify-center gap-2"
              >
                {loading ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Signing in…
                  </>
                ) : (
                  "Sign In to Dashboard"
                )}
              </button>

            </form>

            {/* Divider */}
            <div className="my-6 flex items-center gap-3">
              <div className="flex-1 h-px bg-white/10" />
              <span className="text-green-600 text-[10px] font-semibold uppercase tracking-widest">Secured</span>
              <div className="flex-1 h-px bg-white/10" />
            </div>

            {/* Security note */}
            <div className="flex items-center justify-center gap-2 text-green-600 text-[11px]">
              <Lock size={10} />
              <span>Protected by MongoDB authentication</span>
            </div>

          </div>

          {/* ── Bottom bar ── */}
          <div className="border-t border-white/8 px-8 py-4 flex items-center justify-between">
            <span className="text-green-700 text-[10px]">EMGO Farms Admin v1.0</span>
            <a href="/" className="text-green-500 hover:text-orange-400 text-[10px] transition-colors">
              ← Back to site
            </a>
          </div>

        </div>

        {/* Card glow */}
        <div className="absolute inset-0 rounded-3xl bg-gradient-to-b from-green-400/5 to-orange-400/5 -z-10 blur-xl scale-105 pointer-events-none" />
      </motion.div>

    </div>
  )
}