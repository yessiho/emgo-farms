'use client'

// app/admin/contacts/page.tsx
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { supabase } from "@/lib/supabase"
import Link from "next/link"
import {
  Mail, Leaf, LayoutDashboard, FileText, Users,
  Package, Settings, ChevronRight, LogOut, Shield,
  Search, CheckCircle, Clock, Trash2, Eye,
  Briefcase, Image as ImageIcon, RefreshCw, X,
} from "lucide-react"

interface Contact {
  id:         string
  name:       string
  email:      string
  phone?:     string
  service?:   string
  message:    string
  read:       boolean
  created_at: string
}

const NAV = [
  { label: "Dashboard",   icon: LayoutDashboard, href: "/admin/dashboard"              },
  { label: "Blog Posts",  icon: FileText,        href: "/admin/posts"                  },
  { label: "Contacts",    icon: Mail,            href: "/admin/contacts", active: true },
  { label: "Subscribers", icon: Users,           href: "/admin/subscribers"            },
  { label: "Products",    icon: Package,         href: "/admin/products"               },
  { label: "Services",    icon: Briefcase,       href: "/admin/services"               },
  { label: "Gallery",     icon: ImageIcon,       href: "/admin/gallery"                },
  { label: "Settings",    icon: Settings,        href: "/admin/settings"               },
]

function timeAgo(iso: string) {
  const h = Math.floor((Date.now() - new Date(iso).getTime()) / 3_600_000)
  if (h < 1)  return "Just now"
  if (h < 24) return `${h}h ago`
  return `${Math.floor(h / 24)}d ago`
}

export default function ContactsPage() {
  const router = useRouter()

  const [contacts,   setContacts]   = useState<Contact[]>([])
  const [loading,    setLoading]    = useState(true)
  const [search,     setSearch]     = useState("")
  const [selected,   setSelected]   = useState<Contact | null>(null)
  const [toast,      setToast]      = useState<{ msg: string; type: "success"|"error" }|null>(null)
  const [user,       setUser]       = useState<any>(null)
  const [signingOut, setSigningOut] = useState(false)
  const [filter,     setFilter]     = useState<"all"|"unread"|"read">("all")
  const [error,      setError]      = useState<string|null>(null)

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (!session) { router.push("/admin/login"); return }
      setUser(session.user)
      fetchContacts()
    })
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_, session) => {
      if (!session) router.push("/admin/login")
    })
    return () => subscription.unsubscribe()
  }, [])

 const fetchContacts = async () => {
  setLoading(true)
    setError(null)
    try {
      const { data: { session } } = await supabase.auth.getSession()
      
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_SUPABASE_URL}/rest/v1/contacts?select=*&order=created_at.desc`,
        {
          headers: {
            "apikey":        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
            "Authorization": `Bearer ${session?.access_token}`,
          }
        }
      )
      const data = await res.json()
      setContacts(Array.isArray(data) ? data : [])
    } catch (err: any) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  const markRead = async (id: string) => {
    await supabase.from("contacts").update({ read: true }).eq("id", id)
    setContacts(prev => prev.map(c => c.id === id ? { ...c, read: true } : c))
    if (selected?.id === id) setSelected(s => s ? { ...s, read: true } : s)
  }

  const deleteContact = async (id: string) => {
    if (!confirm("Delete this contact?")) return
    try {
      const { error } = await supabase.from("contacts").delete().eq("id", id)
      if (error) throw new Error(error.message)
      setContacts(prev => prev.filter(c => c.id !== id))
      if (selected?.id === id) setSelected(null)
      showToast("Contact deleted", "success")
    } catch (err: any) {
      showToast("Failed: " + err.message, "error")
    }
  }

  const markAllRead = async () => {
    const unread = contacts.filter(c => !c.read).map(c => c.id)
    if (unread.length === 0) return
    await supabase.from("contacts").update({ read: true }).in("id", unread)
    setContacts(prev => prev.map(c => ({ ...c, read: true })))
    showToast("All marked as read", "success")
  }

  const showToast = (msg: string, type: "success"|"error") => {
    setToast({ msg, type }); setTimeout(() => setToast(null), 3500)
  }

  const handleSignOut = async () => {
    setSigningOut(true); await supabase.auth.signOut(); router.push("/admin/login")
  }

  const unreadCount = contacts.filter(c => !c.read).length

  const filtered = contacts.filter(c => {
    const matchSearch =
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.email.toLowerCase().includes(search.toLowerCase()) ||
      c.message.toLowerCase().includes(search.toLowerCase())
    const matchFilter = filter === "all" ? true : filter === "unread" ? !c.read : c.read
    return matchSearch && matchFilter
  })

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
              {label === "Contacts" && unreadCount > 0 && !active && (
                <span className="ml-auto bg-orange-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full">{unreadCount}</span>
              )}
              {active && <ChevronRight size={14} className="ml-auto opacity-70" />}
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
            <h1 className="text-base sm:text-lg font-bold text-gray-900">Contacts</h1>
            <p className="text-gray-400 text-xs">{contacts.length} total · {unreadCount} unread</p>
          </div>
          <div className="flex items-center gap-2">
            <div className="hidden sm:flex items-center gap-2 bg-gray-50 border border-gray-200 rounded-xl px-3 py-2 w-44">
              <Search size={13} className="text-gray-400" />
              <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search…"
                className="bg-transparent text-xs text-gray-700 outline-none w-full placeholder-gray-400" />
            </div>
            <button onClick={() => fetchContacts()} className="p-2.5 rounded-xl hover:bg-gray-100 text-gray-500 transition"><RefreshCw size={15} /></button>
            {unreadCount > 0 && (
              <button onClick={markAllRead} className="flex items-center gap-1.5 px-3 py-2 bg-green-800 hover:bg-green-900 text-white rounded-xl text-xs font-semibold transition">
                <CheckCircle size={13} /> Mark all read
              </button>
            )}
          </div>
        </header>

        {/* Error banner */}
        {error && (
          <div className="mx-5 sm:mx-8 mt-4 bg-red-50 border border-red-200 text-red-700 text-xs rounded-xl px-4 py-3">
            <strong>Error loading contacts:</strong> {error}
            <br />
            <span className="text-red-500">→ Go to Supabase → Authentication → Policies → contacts table → add SELECT policy for authenticated users</span>
          </div>
        )}

        <div className="flex-1 flex overflow-hidden" style={{ height: "calc(100vh - 73px)" }}>
          {/* LEFT LIST */}
          <div className="w-full lg:w-96 flex-shrink-0 flex flex-col border-r border-gray-100 bg-white overflow-hidden">
            <div className="p-4 border-b border-gray-50 space-y-3">
              <div className="grid grid-cols-3 gap-2">
                {[
                  { label: "Total",  value: contacts.length,              color: "bg-green-800"  },
                  { label: "Unread", value: unreadCount,                  color: "bg-orange-500" },
                  { label: "Read",   value: contacts.length - unreadCount, color: "bg-gray-400"  },
                ].map(({ label, value, color }) => (
                  <div key={label} className={`${color} rounded-xl p-2.5 text-white text-center`}>
                    <p className="text-lg font-bold">{value}</p>
                    <p className="text-white/70 text-[10px] uppercase tracking-wider">{label}</p>
                  </div>
                ))}
              </div>
              <div className="flex gap-1 bg-gray-100 rounded-xl p-1">
                {(["all","unread","read"] as const).map(f => (
                  <button key={f} onClick={() => setFilter(f)}
                    className={`flex-1 py-1.5 text-xs font-semibold rounded-lg transition capitalize ${filter === f ? "bg-white text-gray-800 shadow-sm" : "text-gray-500 hover:text-gray-700"}`}>
                    {f}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex-1 overflow-y-auto">
              {loading ? (
                <div className="p-4 space-y-3">
                  {[1,2,3].map(i => (
                    <div key={i} className="flex gap-3 animate-pulse p-3">
                      <div className="w-9 h-9 bg-gray-100 rounded-full flex-shrink-0" />
                      <div className="flex-1 space-y-2">
                        <div className="h-3 bg-gray-100 rounded w-2/3" />
                        <div className="h-2.5 bg-gray-100 rounded w-full" />
                      </div>
                    </div>
                  ))}
                </div>
              ) : filtered.length === 0 ? (
                <div className="py-16 text-center text-gray-400">
                  <Mail size={28} className="mx-auto mb-2 opacity-30" />
                  <p className="text-sm font-medium">{search ? "No results" : "No contacts yet"}</p>
                  <p className="text-xs mt-1 text-gray-300">Form submissions appear here</p>
                </div>
              ) : (
                <div className="divide-y divide-gray-50">
                  {filtered.map(c => (
                    <div key={c.id} onClick={() => { setSelected(c); if (!c.read) markRead(c.id) }}
                      className={`px-4 py-3.5 cursor-pointer transition-colors ${selected?.id === c.id ? "bg-orange-50 border-l-2 border-orange-500" : "hover:bg-gray-50 border-l-2 border-transparent"}`}>
                      <div className="flex items-start gap-3">
                        <div className={`w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 ${!c.read ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-500"}`}>
                          {c.name.charAt(0).toUpperCase()}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between gap-2">
                            <p className={`text-sm truncate ${!c.read ? "font-bold text-gray-900" : "font-medium text-gray-700"}`}>{c.name}</p>
                            <span className="text-[10px] text-gray-400 flex-shrink-0">{timeAgo(c.created_at)}</span>
                          </div>
                          <p className="text-xs text-gray-400 truncate">{c.email}</p>
                          <p className="text-xs text-gray-500 truncate mt-0.5">{c.message}</p>
                          {c.service && <span className="inline-block mt-1 text-[10px] bg-green-50 text-green-700 px-2 py-0.5 rounded-full border border-green-100">{c.service}</span>}
                        </div>
                        {!c.read && <div className="w-2 h-2 bg-orange-500 rounded-full flex-shrink-0 mt-2" />}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* RIGHT DETAIL */}
          <div className="hidden lg:flex flex-1 flex-col overflow-y-auto bg-gray-50/50">
            {selected ? (
              <div className="p-8 max-w-2xl">
                <div className="flex items-start justify-between mb-6">
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-green-100 to-emerald-200 flex items-center justify-center text-green-700 text-xl font-bold shadow-sm">
                      {selected.name.charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <h2 className="text-lg font-bold text-gray-900">{selected.name}</h2>
                      <p className="text-sm text-gray-500">{selected.email}</p>
                      <div className="flex items-center gap-2 mt-1">
                        {selected.read
                          ? <span className="text-[10px] flex items-center gap-1 text-green-600 bg-green-50 px-2 py-0.5 rounded-full"><CheckCircle size={10} /> Read</span>
                          : <span className="text-[10px] text-orange-600 bg-orange-50 px-2 py-0.5 rounded-full font-semibold">● Unread</span>
                        }
                        <span className="text-[10px] text-gray-400">{timeAgo(selected.created_at)}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {!selected.read && (
                      <button onClick={() => markRead(selected.id)}
                        className="flex items-center gap-1.5 px-3 py-2 bg-green-800 hover:bg-green-900 text-white rounded-xl text-xs font-semibold transition">
                        <CheckCircle size={13} /> Mark Read
                      </button>
                    )}
                    <button onClick={() => deleteContact(selected.id)}
                      className="p-2 rounded-xl hover:bg-red-50 text-gray-400 hover:text-red-500 transition border border-gray-200">
                      <Trash2 size={15} />
                    </button>
                  </div>
                </div>

                <div className="space-y-3">
                  {selected.phone && (
                    <div className="bg-white rounded-2xl p-4 border border-gray-100 shadow-sm">
                      <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">Phone</p>
                      <p className="text-sm font-semibold text-gray-800">{selected.phone}</p>
                    </div>
                  )}
                  {selected.service && (
                    <div className="bg-white rounded-2xl p-4 border border-gray-100 shadow-sm">
                      <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-2">Service Interest</p>
                      <span className="inline-block text-xs bg-green-100 text-green-700 px-3 py-1.5 rounded-full font-semibold border border-green-200">{selected.service}</span>
                    </div>
                  )}
                  <div className="bg-white rounded-2xl p-4 border border-gray-100 shadow-sm">
                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-2">Message</p>
                    <p className="text-sm text-gray-800 leading-relaxed whitespace-pre-wrap">{selected.message}</p>
                  </div>
                  <div className="bg-white rounded-2xl p-4 border border-gray-100 shadow-sm">
                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">Received</p>
                    <p className="text-sm text-gray-600 flex items-center gap-2">
                      <Clock size={13} className="text-gray-400" />
                      {new Date(selected.created_at).toLocaleDateString("en-GB", { weekday:"long", day:"numeric", month:"long", year:"numeric", hour:"2-digit", minute:"2-digit" })}
                    </p>
                  </div>
                  {selected.phone && (
                    <a href={`https://wa.me/${selected.phone.replace(/\D/g,"")}?text=Hello ${encodeURIComponent(selected.name)}, thank you for contacting EMGO Farms.`}
                      target="_blank" rel="noopener noreferrer"
                      className="flex items-center justify-center gap-2 w-full py-3 bg-green-500 hover:bg-green-600 text-white rounded-2xl text-sm font-semibold transition shadow-sm">
                      💬 Reply via WhatsApp
                    </a>
                  )}
                  <a href={`mailto:${selected.email}?subject=Re: Your enquiry to EMGO Farms`}
                    className="flex items-center justify-center gap-2 w-full py-3 bg-white hover:bg-gray-50 text-gray-700 border border-gray-200 rounded-2xl text-sm font-semibold transition shadow-sm">
                    <Mail size={14} /> Reply via Email
                  </a>
                </div>
              </div>
            ) : (
              <div className="flex-1 flex items-center justify-center text-gray-400 h-full">
                <div className="text-center">
                  <Eye size={36} className="mx-auto mb-3 opacity-20" />
                  <p className="text-sm font-medium">Select a contact to view details</p>
                  <p className="text-xs mt-1 text-gray-300">Click any message on the left</p>
                </div>
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