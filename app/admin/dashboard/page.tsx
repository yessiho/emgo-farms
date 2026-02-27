'use client'

// app/admin/dashboard/page.tsx
// Place this file at: app/admin/dashboard/page.tsx
// Access at: http://localhost:3000/admin/dashboard

import { useState, useEffect } from "react"
import {
  LayoutDashboard, FileText, Users, Mail,
  TrendingUp, Eye, MessageSquare, Leaf, RefreshCw,
  LogOut, Bell, Search, ChevronRight, MoreHorizontal,
  ArrowUpRight, Package, Settings,
} from "lucide-react"

// ── Types ─────────────────────────────────────────────────────
interface Stats {
  totalPosts:       number
  totalContacts:    number
  totalSubscribers: number
  totalProducts:    number
  recentContacts:   Contact[]
  recentPosts:      Post[]
}

interface Contact {
  _id:       string
  name:      string
  email:     string
  message:   string
  service:   string
  createdAt: string
}

interface Post {
  _id:       string
  title:     string
  category:  string
  createdAt: string
}

// ── Nav items ─────────────────────────────────────────────────
const NAV = [
  { label: "Dashboard",   icon: LayoutDashboard },
  { label: "Blog Posts",  icon: FileText        },
  { label: "Contacts",    icon: Mail            },
  { label: "Subscribers", icon: Users           },
  { label: "Products",    icon: Package         },
  { label: "Settings",    icon: Settings        },
]

// ── Stat card config ──────────────────────────────────────────
const STAT_CARDS = [
  { bg: "from-green-800 to-green-600",     icon: FileText, label: "Blog Posts"   },
  { bg: "from-orange-600 to-orange-400",   icon: Mail,     label: "Inquiries"    },
  { bg: "from-emerald-700 to-emerald-500", icon: Users,    label: "Subscribers"  },
  { bg: "from-green-900 to-green-700",     icon: Package,  label: "Products"     },
]

// ── Category badge colours ────────────────────────────────────
const CAT_COLOR: Record<string, string> = {
  Farming:    "bg-green-100 text-green-700",
  Production: "bg-orange-100 text-orange-700",
  Refining:   "bg-blue-100 text-blue-700",
}

// ── Helper: time ago ──────────────────────────────────────────
function timeAgo(iso: string): string {
  const h = Math.floor((Date.now() - new Date(iso).getTime()) / 3_600_000)
  if (h < 1)  return "Just now"
  if (h < 24) return `${h}h ago`
  return `${Math.floor(h / 24)}d ago`
}

// ── Component ─────────────────────────────────────────────────
export default function DashboardPage() {
  const [stats,   setStats]   = useState<Stats | null>(null)
  const [loading, setLoading] = useState(true)
  const [error,   setError]   = useState<string | null>(null)
  const [active,  setActive]  = useState("Dashboard")
  const [search,  setSearch]  = useState("")

  // Fetch live data from MongoDB API route
  useEffect(() => {
    ;(async () => {
      try {
        setLoading(true)
        const res = await fetch("/api/admin/stats")
        if (!res.ok) throw new Error(`HTTP ${res.status}`)
        const data: Stats = await res.json()
        setStats(data)
        setError(null)
      } catch (err) {
        console.error("Dashboard fetch error:", err)
        setError("Could not reach database — showing sample data.")
        // ── Fallback so UI is never blank ──
        setStats({
          totalPosts: 0, totalContacts: 0, totalSubscribers: 0, totalProducts: 0,
          recentContacts: [], recentPosts: [],
        })
      } finally {
        setLoading(false)
      }
    })()
  }, [])

  const statValues = stats
    ? [stats.totalPosts, stats.totalContacts, stats.totalSubscribers, stats.totalProducts]
    : [0, 0, 0, 0]

  // ── Render ────────────────────────────────────────────────
  return (
    <div className="flex h-screen bg-gray-50 font-sans overflow-hidden">

      {/* ════════════════════════════════
          SIDEBAR
      ════════════════════════════════ */}
      <aside className="hidden md:flex flex-col w-60 lg:w-64 bg-green-900 text-white flex-shrink-0 shadow-2xl">

        {/* Logo */}
        <div className="px-6 py-6 border-b border-green-800/60">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-orange-500 flex items-center justify-center shadow-lg flex-shrink-0">
              <Leaf size={18} />
            </div>
            <div>
              <p className="font-bold text-sm leading-tight">EMGO Farms</p>
              <p className="text-green-400 text-[10px] tracking-wider uppercase">Admin Panel</p>
            </div>
          </div>
        </div>

        {/* Nav links */}
        <nav className="flex-1 px-3 py-5 space-y-0.5 overflow-y-auto">
          {NAV.map(({ label, icon: Icon }) => (
            <button
              key={label}
              onClick={() => setActive(label)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 text-left ${
                active === label
                  ? "bg-orange-500 text-white shadow-lg"
                  : "text-green-200 hover:bg-green-800/60 hover:text-white"
              }`}
            >
              <Icon size={16} className="flex-shrink-0" />
              {label}
              {active === label && <ChevronRight size={14} className="ml-auto opacity-70" />}
            </button>
          ))}
        </nav>

        {/* User strip */}
        <div className="px-4 py-4 border-t border-green-800/60">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-8 h-8 rounded-full bg-orange-500 flex items-center justify-center text-xs font-bold flex-shrink-0">
              EO
            </div>
            <div className="min-w-0">
              <p className="text-xs font-semibold truncate">Emmanuel Obasi</p>
              <p className="text-green-400 text-[10px] truncate">CEO, EMGO Farms</p>
            </div>
          </div>
          <button className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-green-300 hover:text-white hover:bg-green-800/60 text-xs transition">
            <LogOut size={13} /> Sign Out
          </button>
        </div>
      </aside>


      {/* ════════════════════════════════
          MAIN AREA
      ════════════════════════════════ */}
      <main className="flex-1 flex flex-col overflow-hidden">

        {/* Top bar */}
        <header className="bg-white border-b border-gray-100 px-5 sm:px-8 py-4 flex items-center justify-between gap-4 flex-shrink-0 shadow-sm">
          <div>
            <h1 className="text-base sm:text-lg font-bold text-gray-900 leading-tight">{active}</h1>
            <p className="text-gray-400 text-xs">
              {new Date().toLocaleDateString("en-GB", {
                weekday: "long", day: "numeric", month: "long", year: "numeric",
              })}
            </p>
          </div>

          <div className="flex items-center gap-2 sm:gap-3">
            {/* Search */}
            <div className="hidden sm:flex items-center gap-2 bg-gray-50 border border-gray-200 rounded-xl px-3 py-2 w-40 lg:w-56">
              <Search size={13} className="text-gray-400 flex-shrink-0" />
              <input
                value={search}
                onChange={e => setSearch(e.target.value)}
                placeholder="Search…"
                className="bg-transparent text-xs text-gray-700 outline-none w-full placeholder-gray-400"
              />
            </div>

            {/* Refresh */}
            <button
              onClick={() => window.location.reload()}
              title="Refresh data"
              className="p-2 rounded-xl hover:bg-gray-100 text-gray-500 hover:text-green-700 transition"
            >
              <RefreshCw size={15} />
            </button>

            {/* Notification bell */}
            <button className="relative p-2 rounded-xl hover:bg-gray-100 text-gray-500 transition">
              <Bell size={15} />
              {(stats?.totalContacts ?? 0) > 0 && (
                <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-orange-500 rounded-full" />
              )}
            </button>

            {/* Mobile avatar */}
            <div className="w-8 h-8 rounded-full bg-green-800 flex items-center justify-center text-white text-xs font-bold md:hidden flex-shrink-0">
              EO
            </div>
          </div>
        </header>

        {/* Scrollable content */}
        <div className="flex-1 overflow-y-auto px-5 sm:px-8 py-6 space-y-5 sm:space-y-6">

          {/* Error banner */}
          {error && (
            <div className="bg-amber-50 border border-amber-200 text-amber-700 text-xs rounded-xl px-4 py-3 flex items-center gap-2">
              <span className="font-bold">⚠</span> {error}
            </div>
          )}

          {/* ── STAT CARDS ── */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
            {STAT_CARDS.map(({ bg, icon: Icon, label }, i) => (
              <div
                key={label}
                className={`bg-gradient-to-br ${bg} rounded-2xl p-4 sm:p-5 text-white shadow-lg relative overflow-hidden`}
              >
                <div className="absolute -top-4 -right-4 w-16 h-16 rounded-full bg-white/10" />
                <div className="absolute -bottom-3 -right-1 w-10 h-10 rounded-full bg-white/10" />
                <div className="relative">
                  <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-white/20 flex items-center justify-center mb-3 sm:mb-4">
                    <Icon size={16} />
                  </div>
                  {loading ? (
                    <div className="h-7 w-12 bg-white/20 rounded-lg animate-pulse mb-1" />
                  ) : (
                    <p className="text-2xl sm:text-3xl font-bold leading-none mb-1">
                      {statValues[i]}
                    </p>
                  )}
                  <p className="text-white/70 text-[10px] sm:text-xs font-medium uppercase tracking-wider">
                    {label}
                  </p>
                </div>
                <div className="relative mt-3 flex items-center gap-1 text-white/70 text-[10px]">
                  <ArrowUpRight size={11} className="text-green-300" />
                  <span className="text-green-300 font-semibold">Live</span>
                  <span>from MongoDB</span>
                </div>
              </div>
            ))}
          </div>

          {/* ── RECENT INQUIRIES + RIGHT PANEL ── */}
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-4 sm:gap-6">

            {/* Recent Contacts */}
            <div className="lg:col-span-3 bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
              <div className="px-5 py-4 border-b border-gray-50 flex items-center justify-between">
                <div>
                  <h2 className="text-sm font-bold text-gray-800">Recent Inquiries</h2>
                  <p className="text-gray-400 text-xs mt-0.5">Latest contact form submissions</p>
                </div>
                <span className="text-xs bg-orange-50 text-orange-500 font-semibold px-2.5 py-1 rounded-full">
                  {stats?.totalContacts ?? 0} total
                </span>
              </div>

              {loading ? (
                <div className="p-5 space-y-4">
                  {[1, 2, 3].map(i => (
                    <div key={i} className="flex gap-3 animate-pulse">
                      <div className="w-9 h-9 bg-gray-100 rounded-full flex-shrink-0" />
                      <div className="flex-1 space-y-2">
                        <div className="h-3 bg-gray-100 rounded w-2/3" />
                        <div className="h-2.5 bg-gray-100 rounded w-full" />
                      </div>
                    </div>
                  ))}
                </div>
              ) : stats?.recentContacts && stats.recentContacts.length > 0 ? (
                <div className="divide-y divide-gray-50">
                  {stats.recentContacts.map((c) => (
                    <div key={c._id} className="px-5 py-4 hover:bg-gray-50/50 transition-colors group">
                      <div className="flex items-start gap-3">
                        <div className="w-9 h-9 rounded-full bg-gradient-to-br from-green-100 to-green-200 flex items-center justify-center text-green-700 text-xs font-bold flex-shrink-0">
                          {c.name?.charAt(0)?.toUpperCase() ?? "?"}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between gap-2 mb-0.5">
                            <p className="text-sm font-semibold text-gray-800 truncate">{c.name}</p>
                            <span className="text-[10px] text-gray-400 flex-shrink-0">{timeAgo(c.createdAt)}</span>
                          </div>
                          <p className="text-xs text-gray-400 truncate mb-1">{c.email}</p>
                          <p className="text-xs text-gray-600 line-clamp-1">{c.message}</p>
                        </div>
                        <button className="opacity-0 group-hover:opacity-100 transition p-1.5 rounded-lg hover:bg-gray-100 text-gray-400 flex-shrink-0">
                          <MoreHorizontal size={13} />
                        </button>
                      </div>
                      {c.service && (
                        <div className="mt-2 ml-12">
                          <span className="text-[10px] bg-green-50 text-green-700 px-2 py-0.5 rounded-full font-medium border border-green-100">
                            {c.service}
                          </span>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <div className="py-14 text-center text-gray-400 text-sm">
                  <MessageSquare size={28} className="mx-auto mb-2 opacity-40" />
                  No inquiries yet
                </div>
              )}
            </div>

            {/* Right column */}
            <div className="lg:col-span-2 flex flex-col gap-4 sm:gap-5">

              {/* Recent Posts */}
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden flex-1">
                <div className="px-5 py-4 border-b border-gray-50 flex items-center justify-between">
                  <h2 className="text-sm font-bold text-gray-800">Recent Posts</h2>
                  <span className="text-xs bg-green-50 text-green-700 font-semibold px-2.5 py-1 rounded-full">
                    Sanity CMS
                  </span>
                </div>

                {loading ? (
                  <div className="p-5 space-y-4">
                    {[1, 2, 3].map(i => (
                      <div key={i} className="space-y-2 animate-pulse">
                        <div className="h-3 bg-gray-100 rounded w-3/4" />
                        <div className="h-2.5 bg-gray-100 rounded w-1/3" />
                      </div>
                    ))}
                  </div>
                ) : stats?.recentPosts && stats.recentPosts.length > 0 ? (
                  <div className="divide-y divide-gray-50">
                    {stats.recentPosts.map((post) => (
                      <div key={post._id} className="px-5 py-3.5 hover:bg-gray-50/50 transition-colors">
                        <p className="text-xs font-semibold text-gray-800 leading-snug mb-1.5 line-clamp-2">
                          {post.title}
                        </p>
                        <div className="flex items-center justify-between">
                          <span className={`text-[10px] px-2 py-0.5 rounded-full font-medium ${CAT_COLOR[post.category] ?? "bg-gray-100 text-gray-600"}`}>
                            {post.category}
                          </span>
                          <span className="text-[10px] text-gray-400">{timeAgo(post.createdAt)}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="py-10 text-center text-gray-400 text-sm">
                    <FileText size={24} className="mx-auto mb-2 opacity-40" />
                    No posts yet
                  </div>
                )}
              </div>

              {/* Quick Actions */}
              <div className="bg-gradient-to-br from-green-900 to-green-800 rounded-2xl p-5 text-white shadow-lg">
                <p className="text-xs font-bold uppercase tracking-widest text-green-300 mb-4">
                  Quick Actions
                </p>
                <div className="space-y-2">
                  {[
                    { label: "Export Contacts CSV",  icon: Users,    href: "/api/admin/export/contacts" },
                    { label: "View Newsletter List", icon: Mail,     href: "/api/admin/export/newsletter" },
                    { label: "Open Sanity Studio",   icon: FileText, href: "/studio" },
                    { label: "View Live Site",       icon: Eye,      href: "/" },
                  ].map(({ label, icon: Icon, href }) => (
                    <a
                      key={label}
                      href={href}
                      target={href.startsWith("/") && !href.startsWith("/api") ? "_self" : "_blank"}
                      rel="noopener noreferrer"
                      className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-white/80 hover:text-white hover:bg-green-700/60 transition-all duration-200"
                    >
                      <Icon size={14} className="flex-shrink-0 text-green-300" />
                      {label}
                      <ArrowUpRight size={12} className="ml-auto opacity-50" />
                    </a>
                  ))}
                </div>
              </div>

            </div>
          </div>

          {/* ── STATS SUMMARY BAR ── */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm px-5 sm:px-6 py-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl bg-green-50 flex items-center justify-center flex-shrink-0">
                <TrendingUp size={15} className="text-green-700" />
              </div>
              <div>
                <p className="text-xs font-bold text-gray-800">Database Status</p>
                <p className="text-[10px] text-gray-400">
                  Connected to MongoDB · emgo-farms
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2 flex-wrap">
              {[
                { label: "contacts",   count: stats?.totalContacts    ?? 0 },
                { label: "subscribers",count: stats?.totalSubscribers ?? 0 },
                { label: "products",   count: stats?.totalProducts    ?? 0 },
              ].map(({ label, count }) => (
                <span key={label} className="text-[10px] bg-gray-50 border border-gray-100 text-gray-500 px-2.5 py-1 rounded-full font-medium">
                  {count} {label}
                </span>
              ))}
              <span className={`text-[10px] px-2.5 py-1 rounded-full font-semibold ${error ? "bg-red-50 text-red-500" : "bg-green-50 text-green-600"}`}>
                {error ? "● Disconnected" : "● Live"}
              </span>
            </div>
          </div>

        </div>
      </main>
    </div>
  )
}