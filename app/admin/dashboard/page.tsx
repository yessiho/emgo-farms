'use client'

// app/admin/dashboard/page.tsx
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { supabase } from "@/lib/supabase"
import Link from "next/link"
import {
  LayoutDashboard, FileText, Users, Mail, Package, Settings,
  TrendingUp, Leaf, RefreshCw, LogOut, Bell, Search,
  ChevronRight, ArrowUpRight, MessageSquare, Eye, Plus,
  BarChart3, Shield, Briefcase, Image as ImageIcon,
} from "lucide-react"

interface Stats {
  totalPosts: number; totalContacts: number
  totalSubscribers: number; totalProducts: number
  recentContacts: any[]; recentPosts: any[]
}

const NAV = [
  { label: "Dashboard",   icon: LayoutDashboard, href: "/admin/dashboard", active: true },
  { label: "Blog Posts",  icon: FileText,        href: "/admin/posts"                   },
  { label: "Contacts",    icon: Mail,            href: "/admin/contacts"                },
  { label: "Subscribers", icon: Users, href: "/admin/subscribers"                       },
  { label: "Products",    icon: Package,         href: "/admin/products"                },
  { label: "Services",    icon: Briefcase,       href: "/admin/services"                },
  { label: "Gallery",     icon: ImageIcon,       href: "/admin/gallery"                 },
  { label: "Settings",    icon: Settings,        href: "/admin/settings"                },
]

const STAT_CARDS = [
  { bg: "bg-green-800",   accent: "bg-green-600",   icon: FileText, label: "Blog Posts"  },
  { bg: "bg-orange-500",  accent: "bg-orange-400",  icon: Mail,     label: "Inquiries"   },
  { bg: "bg-emerald-700", accent: "bg-emerald-500", icon: Users,    label: "Subscribers" },
  { bg: "bg-green-900",   accent: "bg-green-700",   icon: Package,  label: "Products"    },
]

const CAT_COLOR: Record<string, string> = {
  Farming:    "bg-green-100 text-green-700",
  Production: "bg-orange-100 text-orange-700",
  Refining:   "bg-blue-100 text-blue-700",
  News:       "bg-purple-100 text-purple-700",
  Community:  "bg-pink-100 text-pink-700",
}

function timeAgo(iso: string) {
  const h = Math.floor((Date.now() - new Date(iso).getTime()) / 3_600_000)
  if (h < 1) return "Just now"
  if (h < 24) return `${h}h ago`
  return `${Math.floor(h / 24)}d ago`
}

export default function DashboardPage() {
  const router  = useRouter()
  const [stats,   setStats]   = useState<Stats | null>(null)
  const [loading, setLoading] = useState(true)
  const [error,   setError]   = useState<string | null>(null)
  const [search,  setSearch]  = useState("")
  const [user,    setUser]    = useState<any>(null)
  const [signingOut, setSigningOut] = useState(false)

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (!session) { router.push("/admin/login"); return }
      setUser(session.user)
      fetchStats()
    })
  }, [])

  const fetchStats = async () => {
    try {
      setLoading(true)
      const res = await fetch("/api/admin/stats")
      if (!res.ok) throw new Error(`HTTP ${res.status}`)
      setStats(await res.json())
      setError(null)
    } catch {
      setError("Could not reach database.")
      setStats({ totalPosts: 0, totalContacts: 0, totalSubscribers: 0, totalProducts: 0, recentContacts: [], recentPosts: [] })
    } finally {
      setLoading(false)
    }
  }

  const handleSignOut = async () => {
    setSigningOut(true)
    await supabase.auth.signOut()
    router.push("/admin/login")
  }

  const statValues = stats
    ? [stats.totalPosts, stats.totalContacts, stats.totalSubscribers, stats.totalProducts]
    : [0, 0, 0, 0]

  if (!user && loading) return (
    <div className="flex items-center justify-center min-h-screen bg-green-950">
      <div className="flex flex-col items-center gap-4">
        <div className="w-12 h-12 border-4 border-orange-500 border-t-transparent rounded-full animate-spin" />
        <p className="text-green-300 text-sm font-semibold">Loading dashboard…</p>
      </div>
    </div>
  )

  return (
    <div className="flex min-h-screen bg-gray-50 font-sans">

      {/* ── SIDEBAR ── */}
      <aside className="hidden md:flex flex-col w-64 lg:w-72 bg-green-900 text-white flex-shrink-0 shadow-2xl fixed top-0 left-0 h-screen z-40">

        {/* Logo */}
        <div className="px-6 pt-8 pb-6 border-b border-green-800/60">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-orange-500 flex items-center justify-center shadow-lg flex-shrink-0">
              <Leaf size={20} />
            </div>
            <div>
              <p className="font-bold text-base leading-tight">EMGO Farms</p>
              <p className="text-green-400 text-[10px] tracking-widest uppercase mt-0.5">Admin Panel</p>
            </div>
          </div>
          {/* Admin badge */}
          <div className="mt-4 flex items-center gap-2 bg-green-800/50 rounded-xl px-3 py-2">
            <Shield size={12} className="text-orange-400 flex-shrink-0" />
            <span className="text-[10px] text-green-300 font-semibold tracking-wider uppercase">Secure Admin Access</span>
          </div>
        </div>

        {/* Nav */}
        <nav className="flex-1 px-3 py-6 space-y-1 overflow-y-auto">
          <p className="text-[10px] font-bold text-green-500 uppercase tracking-widest px-3 mb-3">Main Menu</p>
          {NAV.map(({ label, icon: Icon, href, active }) => (
            <Link key={label} href={href}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 group ${
                active
                  ? "bg-orange-500 text-white shadow-lg shadow-orange-500/30"
                  : "text-green-200 hover:bg-white/10 hover:text-white"
              }`}>
              <Icon size={16} className="flex-shrink-0" />
              {label}
              {active
                ? <ChevronRight size={14} className="ml-auto opacity-70" />
                : <ChevronRight size={14} className="ml-auto opacity-0 group-hover:opacity-40 transition-opacity" />
              }
            </Link>
          ))}
        </nav>

        {/* User + Sign Out */}
        <div className="px-4 py-5 border-t border-green-800/60 space-y-3">
          {/* User info */}
          <div className="flex items-center gap-3 bg-green-800/40 rounded-xl px-3 py-3">
            <div className="w-9 h-9 rounded-full bg-gradient-to-br from-orange-400 to-orange-600 flex items-center justify-center text-sm font-bold flex-shrink-0 shadow-md">
              {user?.email?.charAt(0)?.toUpperCase() ?? "A"}
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-xs font-bold text-white truncate">Emmanuel Obasi</p>
              <p className="text-green-400 text-[10px] truncate">{user?.email ?? "admin"}</p>
            </div>
          </div>

          {/* Sign out button */}
          <button
            onClick={handleSignOut}
            disabled={signingOut}
            className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-red-500/20 hover:bg-red-500/30 border border-red-500/30 text-red-300 hover:text-red-200 text-xs font-semibold transition-all duration-200 disabled:opacity-60"
          >
            {signingOut
              ? <div className="w-3.5 h-3.5 border-2 border-red-300 border-t-transparent rounded-full animate-spin" />
              : <LogOut size={13} />
            }
            {signingOut ? "Signing out…" : "Sign Out"}
          </button>
        </div>
      </aside>

      {/* ── MAIN — offset by sidebar width ── */}
      <main className="flex-1 md:ml-64 lg:ml-72 flex flex-col min-h-screen">

        {/* Top bar */}
        <header className="sticky top-0 z-30 bg-white/90 backdrop-blur-md border-b border-gray-100 px-5 sm:px-8 py-4 flex items-center justify-between gap-4 shadow-sm">
          <div>
            <h1 className="text-base sm:text-lg font-bold text-gray-900 leading-tight">Dashboard</h1>
            <p className="text-gray-400 text-xs">
              {new Date().toLocaleDateString("en-GB", { weekday: "long", day: "numeric", month: "long", year: "numeric" })}
            </p>
          </div>
          <div className="flex items-center gap-2 sm:gap-3">
            <div className="hidden sm:flex items-center gap-2 bg-gray-50 border border-gray-200 rounded-xl px-3 py-2 w-40 lg:w-52">
              <Search size={13} className="text-gray-400 flex-shrink-0" />
              <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search…"
                className="bg-transparent text-xs text-gray-700 outline-none w-full placeholder-gray-400" />
            </div>
            <button onClick={fetchStats} title="Refresh data"
              className="p-2.5 rounded-xl hover:bg-gray-100 text-gray-500 hover:text-green-700 transition">
              <RefreshCw size={15} />
            </button>
            <button className="relative p-2.5 rounded-xl hover:bg-gray-100 text-gray-500 transition">
              <Bell size={15} />
              {(stats?.totalContacts ?? 0) > 0 && (
                <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-orange-500 rounded-full animate-pulse" />
              )}
            </button>
            {/* Mobile sign out */}
            <button onClick={handleSignOut} disabled={signingOut}
              className="md:hidden flex items-center gap-1.5 px-3 py-2 rounded-xl bg-red-50 hover:bg-red-100 text-red-500 text-xs font-semibold transition">
              <LogOut size={13} />
              {signingOut ? "…" : "Out"}
            </button>
          </div>
        </header>

        {/* Page content */}
        <div className="flex-1 px-5 sm:px-8 py-8 space-y-6">

          {/* Error */}
          {error && (
            <div className="bg-amber-50 border border-amber-200 text-amber-700 text-xs rounded-xl px-4 py-3 flex items-center gap-2">
              <span className="font-bold">⚠</span> {error}
            </div>
          )}

          {/* Welcome + quick actions */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h2 className="text-xl font-bold text-gray-900">
                Welcome back, Emmanuel 👋
              </h2>
              <p className="text-gray-500 text-sm mt-0.5">Here's what's happening with EMGO Farms today.</p>
            </div>
            <div className="flex items-center gap-2 flex-wrap">
              <Link href="/admin/posts"
                className="flex items-center gap-2 px-4 py-2.5 bg-orange-500 hover:bg-orange-600 text-white rounded-xl text-xs font-semibold transition shadow-sm shadow-orange-200">
                <Plus size={13} /> New Post
              </Link>
              <Link href="/admin/products"
                className="flex items-center gap-2 px-4 py-2.5 bg-green-800 hover:bg-green-900 text-white rounded-xl text-xs font-semibold transition shadow-sm">
                <Plus size={13} /> New Product
              </Link>
              <Link href="/" target="_blank"
                className="flex items-center gap-2 px-4 py-2.5 bg-white border border-gray-200 hover:bg-gray-50 text-gray-700 rounded-xl text-xs font-semibold transition shadow-sm">
                <Eye size={13} /> View Site
              </Link>
            </div>
          </div>

          {/* Stat cards */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
            {STAT_CARDS.map(({ bg, accent, icon: Icon, label }, i) => (
              <div key={label} className={`${bg} rounded-2xl p-5 text-white shadow-lg relative overflow-hidden`}>
                {/* Decorative circles */}
                <div className={`absolute -top-5 -right-5 w-20 h-20 rounded-full ${accent} opacity-50`} />
                <div className={`absolute -bottom-4 -right-2 w-12 h-12 rounded-full ${accent} opacity-30`} />
                <div className="relative">
                  <div className="w-9 h-9 rounded-xl bg-white/20 flex items-center justify-center mb-4">
                    <Icon size={17} />
                  </div>
                  {loading
                    ? <div className="h-8 w-14 bg-white/20 rounded-lg animate-pulse mb-1.5" />
                    : <p className="text-3xl font-bold leading-none mb-1.5">{statValues[i]}</p>
                  }
                  <p className="text-white/70 text-[10px] font-semibold uppercase tracking-widest">{label}</p>
                </div>
                <div className="relative mt-4 pt-3 border-t border-white/10 flex items-center gap-1 text-[10px] text-white/60">
                  <BarChart3 size={10} className="text-white/40" />
                  <span className="text-green-300 font-semibold">Live</span>
                  <span>· Supabase</span>
                </div>
              </div>
            ))}
          </div>

          {/* Recent contacts + posts */}
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-5">

            {/* Recent Contacts */}
            <div className="lg:col-span-3 bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-50 flex items-center justify-between">
                <div>
                  <h2 className="text-sm font-bold text-gray-800">Recent Inquiries</h2>
                  <p className="text-gray-400 text-xs mt-0.5">Latest contact form submissions</p>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs bg-orange-50 text-orange-500 font-semibold px-2.5 py-1 rounded-full">
                    {stats?.totalContacts ?? 0} total
                  </span>
                  <Link href="/admin/contacts" className="text-xs text-gray-400 hover:text-green-700 transition font-medium">
                    View all →
                  </Link>
                </div>
              </div>

              {loading ? (
                <div className="p-6 space-y-4">
                  {[1,2,3].map(i => (
                    <div key={i} className="flex gap-3 animate-pulse">
                      <div className="w-10 h-10 bg-gray-100 rounded-full flex-shrink-0" />
                      <div className="flex-1 space-y-2 pt-1">
                        <div className="h-3 bg-gray-100 rounded w-2/3" />
                        <div className="h-2.5 bg-gray-100 rounded w-full" />
                      </div>
                    </div>
                  ))}
                </div>
              ) : stats?.recentContacts?.length ? (
                <div className="divide-y divide-gray-50">
                  {stats.recentContacts.map((c: any) => (
                    <div key={c.id} className="px-6 py-4 hover:bg-gray-50/60 transition-colors">
                      <div className="flex items-start gap-3">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-green-100 to-emerald-200 flex items-center justify-center text-green-700 text-sm font-bold flex-shrink-0">
                          {c.name?.charAt(0)?.toUpperCase() ?? "?"}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between gap-2 mb-0.5">
                            <p className="text-sm font-semibold text-gray-800 truncate">{c.name}</p>
                            <span className="text-[10px] text-gray-400 flex-shrink-0">{timeAgo(c.created_at)}</span>
                          </div>
                          <p className="text-xs text-gray-400 truncate mb-1">{c.email}</p>
                          <p className="text-xs text-gray-600 line-clamp-1">{c.message}</p>
                          {c.service && (
                            <span className="inline-block mt-1.5 text-[10px] bg-green-50 text-green-700 px-2 py-0.5 rounded-full font-medium border border-green-100">
                              {c.service}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="py-16 text-center text-gray-400">
                  <MessageSquare size={28} className="mx-auto mb-2 opacity-30" />
                  <p className="text-sm">No inquiries yet</p>
                </div>
              )}
            </div>

            {/* Right column */}
            <div className="lg:col-span-2 flex flex-col gap-5">

              {/* Recent Posts */}
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden flex-1">
                <div className="px-5 py-4 border-b border-gray-50 flex items-center justify-between">
                  <h2 className="text-sm font-bold text-gray-800">Recent Posts</h2>
                  <Link href="/admin/posts"
                    className="text-xs bg-orange-50 text-orange-500 font-semibold px-2.5 py-1 rounded-full hover:bg-orange-100 transition">
                    + New
                  </Link>
                </div>

                {loading ? (
                  <div className="p-5 space-y-4">
                    {[1,2,3].map(i => (
                      <div key={i} className="space-y-2 animate-pulse">
                        <div className="h-3 bg-gray-100 rounded w-3/4" />
                        <div className="h-2.5 bg-gray-100 rounded w-1/3" />
                      </div>
                    ))}
                  </div>
                ) : stats?.recentPosts?.length ? (
                  <div className="divide-y divide-gray-50">
                    {stats.recentPosts.map((post: any) => (
                      <div key={post.id} className="px-5 py-3.5 hover:bg-gray-50/50 transition-colors">
                        <p className="text-xs font-semibold text-gray-800 leading-snug mb-1.5 line-clamp-2">{post.title}</p>
                        <div className="flex items-center justify-between">
                          <span className={`text-[10px] px-2 py-0.5 rounded-full font-medium ${CAT_COLOR[post.category] ?? "bg-gray-100 text-gray-600"}`}>
                            {post.category}
                          </span>
                          <span className="text-[10px] text-gray-400">{timeAgo(post.created_at)}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="py-10 text-center text-gray-400">
                    <FileText size={24} className="mx-auto mb-2 opacity-30" />
                    <p className="text-sm">No posts yet</p>
                  </div>
                )}
              </div>

              {/* Quick Actions */}
              <div className="bg-gradient-to-br from-green-900 to-green-800 rounded-2xl p-5 text-white shadow-lg">
                <p className="text-[10px] font-bold uppercase tracking-widest text-green-400 mb-4">Quick Actions</p>
                <div className="space-y-1.5">
                  {[
                    { label: "Manage Posts",    icon: FileText, href: "/admin/posts"    },
                    { label: "Manage Products", icon: Package,  href: "/admin/products" },
                    { label: "View Contacts",   icon: Mail,     href: "/admin/contacts" },
                    { label: "View Live Site",  icon: Eye,      href: "/"               },
                  ].map(({ label, icon: Icon, href }) => (
                    <Link key={label} href={href}
                      className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-white/80 hover:text-white hover:bg-white/10 transition-all duration-200 group">
                      <Icon size={14} className="flex-shrink-0 text-green-400" />
                      {label}
                      <ArrowUpRight size={12} className="ml-auto opacity-0 group-hover:opacity-60 transition-opacity" />
                    </Link>
                  ))}
                </div>

                {/* Sign out in quick actions too */}
                <div className="mt-4 pt-4 border-t border-white/10">
                  <button onClick={handleSignOut} disabled={signingOut}
                    className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-red-300 hover:text-red-200 hover:bg-red-500/20 transition-all duration-200">
                    <LogOut size={14} className="flex-shrink-0" />
                    {signingOut ? "Signing out…" : "Sign Out"}
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* DB Status bar */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm px-6 py-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-green-50 flex items-center justify-center flex-shrink-0">
                <TrendingUp size={16} className="text-green-700" />
              </div>
              <div>
                <p className="text-xs font-bold text-gray-800">Database Status</p>
                <p className="text-[10px] text-gray-400">Connected to Supabase · emgo-farms</p>
              </div>
            </div>
            <div className="flex items-center gap-2 flex-wrap">
              {[
                { label: "contacts",    count: stats?.totalContacts    ?? 0 },
                { label: "subscribers", count: stats?.totalSubscribers ?? 0 },
                { label: "products",    count: stats?.totalProducts    ?? 0 },
              ].map(({ label, count }) => (
                <span key={label} className="text-[10px] bg-gray-50 border border-gray-100 text-gray-500 px-2.5 py-1 rounded-full font-medium">
                  {count} {label}
                </span>
              ))}
              <span className={`text-[10px] px-2.5 py-1 rounded-full font-semibold flex items-center gap-1 ${error ? "bg-red-50 text-red-500" : "bg-green-50 text-green-600"}`}>
                <span className={`w-1.5 h-1.5 rounded-full ${error ? "bg-red-400" : "bg-green-400 animate-pulse"}`} />
                {error ? "Disconnected" : "Live"}
              </span>
            </div>
          </div>

        </div>
      </main>
    </div>
  )
}