'use client'

// app/admin/subscribers/page.tsx
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { supabase } from "@/lib/supabase"
import Link from "next/link"
import {
  Users, Leaf, ChevronRight, LayoutDashboard, FileText,
  Mail, Package, Settings, LogOut, Shield, Search,
  Trash2, Download, CheckCircle, X, Briefcase,
  Image as ImageIcon, RefreshCw, TrendingUp,
} from "lucide-react"

interface Subscriber {
  id:         string
  email:      string
  created_at: string
}

const NAV = [
  { label: "Dashboard",   icon: LayoutDashboard, href: "/admin/dashboard"                  },
  { label: "Blog Posts",  icon: FileText,        href: "/admin/posts"                      },
  { label: "Contacts",    icon: Mail,            href: "/admin/contacts"                   },
  { label: "Subscribers", icon: Users,           href: "/admin/subscribers", active: true  },
  { label: "Products",    icon: Package,         href: "/admin/products"                   },
  { label: "Services",    icon: Briefcase,       href: "/admin/services"                   },
  { label: "Gallery",     icon: ImageIcon,       href: "/admin/gallery"                    },
  { label: "Settings",    icon: Settings,        href: "/admin/settings"                   },
]

function timeAgo(iso: string) {
  const h = Math.floor((Date.now() - new Date(iso).getTime()) / 3_600_000)
  if (h < 1)  return "Just now"
  if (h < 24) return `${h}h ago`
  const d = Math.floor(h / 24)
  if (d < 30) return `${d}d ago`
  return new Date(iso).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" })
}

export default function SubscribersPage() {
  const router = useRouter()

  const [subscribers,  setSubscribers]  = useState<Subscriber[]>([])
  const [loading,      setLoading]      = useState(true)
  const [search,       setSearch]       = useState("")
  const [deleting,     setDeleting]     = useState<string | null>(null)
  const [toast,        setToast]        = useState<{ msg: string; type: "success"|"error" }|null>(null)
  const [user,         setUser]         = useState<any>(null)
  const [signingOut,   setSigningOut]   = useState(false)
  const [selected,     setSelected]     = useState<Set<string>>(new Set())

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (!session) { router.push("/admin/login"); return }
      setUser(session.user)
      fetchSubscribers()
    })
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_, session) => {
      if (!session) router.push("/admin/login")
    })
    return () => subscription.unsubscribe()
  }, [])

  const fetchSubscribers = async () => {
    try {
      setLoading(true)
      const { data, error } = await supabase
        .from("newsletter")
        .select("*")
        .order("created_at", { ascending: false })
      if (error) throw new Error(error.message)
      setSubscribers(data ?? [])
    } catch (err: any) {
      showToast("Failed to load subscribers: " + err.message, "error")
    } finally {
      setLoading(false)
    }
  }

  const showToast = (msg: string, type: "success"|"error") => {
    setToast({ msg, type }); setTimeout(() => setToast(null), 3500)
  }

  const handleDelete = async (id: string) => {
    if (!confirm("Remove this subscriber?")) return
    setDeleting(id)
    try {
      const { error } = await supabase.from("newsletter").delete().eq("id", id)
      if (error) throw new Error(error.message)
      showToast("Subscriber removed", "success")
      fetchSubscribers()
    } catch (err: any) {
      showToast("Failed to delete: " + err.message, "error")
    } finally {
      setDeleting(null) }
  }

  const handleDeleteSelected = async () => {
    if (selected.size === 0) return
    if (!confirm(`Delete ${selected.size} subscriber(s)?`)) return
    try {
      const ids = Array.from(selected)
      const { error } = await supabase.from("newsletter").delete().in("id", ids)
      if (error) throw new Error(error.message)
      showToast(`${ids.length} subscriber(s) removed`, "success")
      setSelected(new Set())
      fetchSubscribers()
    } catch (err: any) {
      showToast("Failed to delete: " + err.message, "error")
    }
  }

  const handleExportCSV = () => {
    const rows = ["Email,Subscribed Date", ...filtered.map(s =>
      `${s.email},${new Date(s.created_at).toLocaleDateString("en-GB")}`
    )]
    const blob = new Blob([rows.join("\n")], { type: "text/csv" })
    const url  = URL.createObjectURL(blob)
    const a    = document.createElement("a")
    a.href = url; a.download = "emgo-subscribers.csv"; a.click()
    URL.revokeObjectURL(url)
    showToast("CSV exported!", "success")
  }

  const toggleSelect = (id: string) => {
    setSelected(prev => {
      const next = new Set(prev)
      next.has(id) ? next.delete(id) : next.add(id)
      return next
    })
  }

  const toggleAll = () => {
    if (selected.size === filtered.length) {
      setSelected(new Set())
    } else {
      setSelected(new Set(filtered.map(s => s.id)))
    }
  }

  const handleSignOut = async () => {
    setSigningOut(true); await supabase.auth.signOut(); router.push("/admin/login")
  }

  const filtered = subscribers.filter(s =>
    s.email.toLowerCase().includes(search.toLowerCase())
  )

  // Group by month for the chart
  const byMonth: Record<string, number> = {}
  subscribers.forEach(s => {
    const key = new Date(s.created_at).toLocaleDateString("en-GB", { month: "short", year: "2-digit" })
    byMonth[key] = (byMonth[key] ?? 0) + 1
  })
  const monthEntries = Object.entries(byMonth).slice(-6)
  const maxCount = Math.max(...monthEntries.map(([, v]) => v), 1)

  return (
    <div className="flex min-h-screen bg-gray-50 font-sans">

      {/* SIDEBAR */}
      <aside className="hidden md:flex flex-col w-64 lg:w-72 bg-green-900 text-white flex-shrink-0 fixed top-0 left-0 h-screen z-40 shadow-2xl">
        <div className="px-6 pt-8 pb-6 border-b border-green-800/60">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-orange-500 flex items-center justify-center shadow-lg flex-shrink-0"><Leaf size={20} /></div>
            <div>
              <p className="font-bold text-base">EMGO Farms</p>
              <p className="text-green-400 text-[10px] tracking-widest uppercase mt-0.5">Admin Panel</p>
            </div>
          </div>
          <div className="mt-4 flex items-center gap-2 bg-green-800/50 rounded-xl px-3 py-2">
            <Shield size={12} className="text-orange-400 flex-shrink-0" />
            <span className="text-[10px] text-green-300 font-semibold tracking-wider uppercase">Secure Admin Access</span>
          </div>
        </div>
        <nav className="flex-1 px-3 py-6 space-y-1 overflow-y-auto">
          <p className="text-[10px] font-bold text-green-500 uppercase tracking-widest px-3 mb-3">Main Menu</p>
          {NAV.map(({ label, icon: Icon, href, active }: any) => (
            <Link key={label} href={href}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 group ${
                active ? "bg-orange-500 text-white shadow-lg shadow-orange-500/30" : "text-green-200 hover:bg-white/10 hover:text-white"
              }`}>
              <Icon size={16} className="flex-shrink-0" />{label}
              <ChevronRight size={14} className={`ml-auto ${active ? "opacity-70" : "opacity-0 group-hover:opacity-40"} transition-opacity`} />
            </Link>
          ))}
        </nav>
        <div className="px-4 py-5 border-t border-green-800/60 space-y-3">
          <div className="flex items-center gap-3 bg-green-800/40 rounded-xl px-3 py-3">
            <div className="w-9 h-9 rounded-full bg-gradient-to-br from-orange-400 to-orange-600 flex items-center justify-center text-sm font-bold flex-shrink-0">
              {user?.email?.charAt(0)?.toUpperCase() ?? "A"}
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-xs font-bold text-white truncate">Emmanuel Obasi</p>
              <p className="text-green-400 text-[10px] truncate">{user?.email ?? "admin"}</p>
            </div>
          </div>
          <button onClick={handleSignOut} disabled={signingOut}
            className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-red-500/20 hover:bg-red-500/30 border border-red-500/30 text-red-300 hover:text-red-200 text-xs font-semibold transition-all disabled:opacity-60">
            {signingOut ? <div className="w-3.5 h-3.5 border-2 border-red-300 border-t-transparent rounded-full animate-spin" /> : <LogOut size={13} />}
            {signingOut ? "Signing out…" : "Sign Out"}
          </button>
        </div>
      </aside>

      {/* MAIN */}
      <main className="flex-1 md:ml-64 lg:ml-72 flex flex-col min-h-screen">
        <header className="sticky top-0 z-30 bg-white/90 backdrop-blur-md border-b border-gray-100 px-5 sm:px-8 py-4 flex items-center justify-between gap-4 shadow-sm">
          <div>
            <h1 className="text-base sm:text-lg font-bold text-gray-900">Subscribers</h1>
            <p className="text-gray-400 text-xs">{subscribers.length} newsletter subscribers</p>
          </div>
          <div className="flex items-center gap-2 sm:gap-3">
            <div className="hidden sm:flex items-center gap-2 bg-gray-50 border border-gray-200 rounded-xl px-3 py-2 w-48">
              <Search size={13} className="text-gray-400" />
              <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search emails…"
                className="bg-transparent text-xs text-gray-700 outline-none w-full placeholder-gray-400" />
            </div>
            <button onClick={fetchSubscribers}
              className="p-2.5 rounded-xl hover:bg-gray-100 text-gray-500 transition" title="Refresh">
              <RefreshCw size={15} />
            </button>
            <button onClick={handleExportCSV}
              className="flex items-center gap-2 px-4 py-2.5 bg-green-800 hover:bg-green-900 text-white rounded-xl text-sm font-semibold transition shadow-sm">
              <Download size={14} /> Export CSV
            </button>
            {selected.size > 0 && (
              <button onClick={handleDeleteSelected}
                className="flex items-center gap-2 px-4 py-2.5 bg-red-500 hover:bg-red-600 text-white rounded-xl text-sm font-semibold transition shadow-sm">
                <Trash2 size={14} /> Delete ({selected.size})
              </button>
            )}
          </div>
        </header>

        <div className="flex-1 px-5 sm:px-8 py-8 space-y-6">

          {/* Stats row */}
          <div className="grid grid-cols-3 gap-3 sm:gap-4">
            {[
              { label: "Total",       value: subscribers.length,                                                       color: "bg-green-800"   },
              { label: "This Month",  value: subscribers.filter(s => new Date(s.created_at).getMonth() === new Date().getMonth()).length, color: "bg-orange-500"  },
              { label: "This Week",   value: subscribers.filter(s => (Date.now() - new Date(s.created_at).getTime()) < 7*24*3600*1000).length, color: "bg-emerald-600" },
            ].map(({ label, value, color }) => (
              <div key={label} className={`${color} rounded-2xl p-4 sm:p-5 text-white text-center shadow-lg`}>
                <p className="text-2xl sm:text-3xl font-bold">{value}</p>
                <p className="text-white/70 text-[10px] uppercase tracking-widest mt-1">{label}</p>
              </div>
            ))}
          </div>

          {/* Growth chart */}
          {monthEntries.length > 0 && (
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
              <div className="flex items-center gap-2 mb-5">
                <TrendingUp size={15} className="text-green-700" />
                <h2 className="text-sm font-bold text-gray-800">Subscriber Growth</h2>
                <span className="ml-auto text-[10px] text-gray-400">Last 6 months</span>
              </div>
              <div className="flex items-end gap-3 h-28">
                {monthEntries.map(([month, count]) => (
                  <div key={month} className="flex-1 flex flex-col items-center gap-1.5">
                    <span className="text-[10px] font-semibold text-gray-600">{count}</span>
                    <div className="w-full rounded-t-lg bg-gradient-to-t from-green-800 to-green-600 transition-all"
                      style={{ height: `${(count / maxCount) * 80}px`, minHeight: "4px" }} />
                    <span className="text-[10px] text-gray-400">{month}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Subscribers table */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-50 flex items-center justify-between">
              <h2 className="text-sm font-bold text-gray-800">All Subscribers</h2>
              {filtered.length > 0 && (
                <button onClick={toggleAll} className="text-xs text-orange-500 hover:text-orange-600 font-semibold">
                  {selected.size === filtered.length ? "Deselect All" : "Select All"}
                </button>
              )}
            </div>

            {loading ? (
              <div className="p-8 space-y-3">
                {[1,2,3,4,5].map(i => (
                  <div key={i} className="flex gap-4 animate-pulse items-center">
                    <div className="w-4 h-4 bg-gray-100 rounded" />
                    <div className="w-9 h-9 bg-gray-100 rounded-full" />
                    <div className="flex-1 h-3 bg-gray-100 rounded w-1/2" />
                    <div className="h-3 bg-gray-100 rounded w-20" />
                  </div>
                ))}
              </div>
            ) : filtered.length === 0 ? (
              <div className="py-20 text-center text-gray-400">
                <Users size={36} className="mx-auto mb-3 opacity-30" />
                <p className="text-sm font-medium">{search ? "No subscribers match your search" : "No subscribers yet"}</p>
                <p className="text-xs mt-1 text-gray-300">Subscribers come from the newsletter form on your website</p>
              </div>
            ) : (
              <div className="divide-y divide-gray-50">
                {filtered.map(sub => (
                  <div key={sub.id} className="px-6 py-3.5 hover:bg-gray-50/50 transition-colors flex items-center gap-4 group">
                    {/* Checkbox */}
                    <input type="checkbox" checked={selected.has(sub.id)} onChange={() => toggleSelect(sub.id)}
                      className="w-4 h-4 accent-orange-500 flex-shrink-0 cursor-pointer" />

                    {/* Avatar */}
                    <div className="w-9 h-9 rounded-full bg-gradient-to-br from-green-100 to-emerald-200 flex items-center justify-center text-green-700 text-xs font-bold flex-shrink-0">
                      {sub.email.charAt(0).toUpperCase()}
                    </div>

                    {/* Email */}
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-800 truncate">{sub.email}</p>
                    </div>

                    {/* Date */}
                    <span className="text-xs text-gray-400 flex-shrink-0 hidden sm:block">
                      {new Date(sub.created_at).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" })}
                    </span>

                    {/* Time ago */}
                    <span className="text-[10px] bg-gray-100 text-gray-500 px-2 py-0.5 rounded-full flex-shrink-0">
                      {timeAgo(sub.created_at)}
                    </span>

                    {/* Delete */}
                    <button onClick={() => handleDelete(sub.id)} disabled={deleting === sub.id}
                      className="p-1.5 rounded-lg hover:bg-red-50 text-gray-300 hover:text-red-500 transition opacity-0 group-hover:opacity-100 flex-shrink-0 disabled:opacity-50">
                      <Trash2 size={13} />
                    </button>
                  </div>
                ))}
              </div>
            )}

            {/* Footer count */}
            {filtered.length > 0 && (
              <div className="px-6 py-3 border-t border-gray-50 flex items-center justify-between">
                <p className="text-xs text-gray-400">Showing {filtered.length} of {subscribers.length} subscribers</p>
                {selected.size > 0 && (
                  <p className="text-xs text-orange-500 font-semibold">{selected.size} selected</p>
                )}
              </div>
            )}
          </div>

        </div>
      </main>

      {toast && (
        <div className={`fixed bottom-6 right-6 z-50 px-5 py-3 rounded-2xl shadow-xl text-white text-sm font-semibold flex items-center gap-2 ${toast.type === "success" ? "bg-green-600" : "bg-red-500"}`}>
          {toast.type === "success" ? <CheckCircle size={16} /> : <X size={16} />}
          {toast.msg}
        </div>
      )}
    </div>
  )
}