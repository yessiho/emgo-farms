'use client'

// app/admin/contacts/page.tsx
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { supabase } from "@/lib/supabase"
import Link from "next/link"
import {
  Mail, Leaf, LayoutDashboard, FileText, Users,
  Package, Settings, ChevronRight, LogOut,
  Search, CheckCircle, Clock, Trash2, Eye,
} from "lucide-react"

interface Contact {
  id: string; name: string; email: string
  phone?: string; service?: string; message: string
  read: boolean; created_at: string
}

const NAV = [
  { label: "Dashboard",   icon: LayoutDashboard, href: "/admin/dashboard" },
  { label: "Blog Posts",  icon: FileText,        href: "/admin/posts"     },
  { label: "Contacts",    icon: Mail,            href: "/admin/contacts", active: true },
  { label: "Subscribers", icon: Users,           href: "/admin/dashboard" },
  { label: "Products",    icon: Package,         href: "/admin/products"  },
  { label: "Settings",    icon: Settings,        href: "/admin/dashboard" },
]

function timeAgo(iso: string) {
  const h = Math.floor((Date.now() - new Date(iso).getTime()) / 3_600_000)
  if (h < 1) return "Just now"
  if (h < 24) return `${h}h ago`
  return `${Math.floor(h / 24)}d ago`
}

export default function ContactsPage() {
  const router = useRouter()
  const [contacts, setContacts] = useState<Contact[]>([])
  const [loading,  setLoading]  = useState(true)
  const [search,   setSearch]   = useState("")
  const [selected, setSelected] = useState<Contact | null>(null)
  const [toast,    setToast]    = useState<string | null>(null)

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (!session) { router.push("/admin/login"); return }
      fetchContacts()
    })
  }, [])

  const fetchContacts = async () => {
    setLoading(true)
    const { data } = await supabase.from("contacts").select("*").order("created_at", { ascending: false })
    setContacts(data ?? [])
    setLoading(false)
  }

  const markRead = async (id: string) => {
    await supabase.from("contacts").update({ read: true }).eq("id", id)
    fetchContacts()
  }

  const deleteContact = async (id: string) => {
    if (!confirm("Delete this contact?")) return
    await supabase.from("contacts").delete().eq("id", id)
    setSelected(null)
    showToast("Contact deleted")
    fetchContacts()
  }

  const showToast = (msg: string) => {
    setToast(msg)
    setTimeout(() => setToast(null), 3000)
  }

  const filtered = contacts.filter(c =>
    c.name.toLowerCase().includes(search.toLowerCase()) ||
    c.email.toLowerCase().includes(search.toLowerCase())
  )

  const handleSignOut = async () => {
    await supabase.auth.signOut()
    router.push("/admin/login")
  }

  return (
    <div className="flex h-screen bg-gray-50 font-sans overflow-hidden">

      {/* Sidebar */}
      <aside className="hidden md:flex flex-col w-60 lg:w-64 bg-green-900 text-white flex-shrink-0 shadow-2xl">
        <div className="px-6 py-6 border-b border-green-800/60">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-orange-500 flex items-center justify-center shadow-lg flex-shrink-0"><Leaf size={18} /></div>
            <div>
              <p className="font-bold text-sm">EMGO Farms</p>
              <p className="text-green-400 text-[10px] tracking-wider uppercase">Admin Panel</p>
            </div>
          </div>
        </div>
        <nav className="flex-1 px-3 py-5 space-y-0.5 overflow-y-auto">
          {NAV.map(({ label, icon: Icon, href, active }) => (
            <Link key={label} href={href}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 ${active ? "bg-orange-500 text-white shadow-lg" : "text-green-200 hover:bg-green-800/60 hover:text-white"}`}>
              <Icon size={16} className="flex-shrink-0" />{label}
              {active && <ChevronRight size={14} className="ml-auto opacity-70" />}
            </Link>
          ))}
        </nav>
        <div className="px-4 py-4 border-t border-green-800/60">
          <button onClick={handleSignOut} className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-green-300 hover:text-white hover:bg-green-800/60 text-xs transition">
            <LogOut size={13} /> Sign Out
          </button>
        </div>
      </aside>

      {/* Main */}
      <main className="flex-1 flex flex-col overflow-hidden">
        <header className="bg-white border-b border-gray-100 px-5 sm:px-8 py-4 flex items-center justify-between gap-4 flex-shrink-0 shadow-sm">
          <div>
            <h1 className="text-base sm:text-lg font-bold text-gray-900">Contacts</h1>
            <p className="text-gray-400 text-xs">{contacts.length} total inquiries</p>
          </div>
          <div className="flex items-center gap-2 bg-gray-50 border border-gray-200 rounded-xl px-3 py-2 w-48">
            <Search size={13} className="text-gray-400" />
            <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search…"
              className="bg-transparent text-xs text-gray-700 outline-none w-full placeholder-gray-400" />
          </div>
        </header>

        <div className="flex-1 overflow-hidden flex gap-0">

          {/* List */}
          <div className="w-full lg:w-96 flex-shrink-0 border-r border-gray-100 overflow-y-auto bg-white">
            {/* Stats */}
            <div className="grid grid-cols-2 gap-3 p-4 border-b border-gray-50">
              {[
                { label: "Total",  value: contacts.length,                   color: "bg-green-800"  },
                { label: "Unread", value: contacts.filter(c => !c.read).length, color: "bg-orange-500" },
              ].map(({ label, value, color }) => (
                <div key={label} className={`${color} rounded-xl p-3 text-white text-center`}>
                  <p className="text-xl font-bold">{value}</p>
                  <p className="text-white/70 text-[10px] uppercase tracking-wider">{label}</p>
                </div>
              ))}
            </div>

            {loading ? (
              <div className="p-4 space-y-3">
                {[1,2,3,4].map(i => (
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
                <p className="text-sm">No contacts yet</p>
              </div>
            ) : (
              <div className="divide-y divide-gray-50">
                {filtered.map(c => (
                  <div key={c.id}
                    onClick={() => { setSelected(c); markRead(c.id) }}
                    className={`px-4 py-3.5 cursor-pointer hover:bg-gray-50 transition-colors ${selected?.id === c.id ? "bg-orange-50 border-l-2 border-orange-500" : ""}`}>
                    <div className="flex items-start gap-3">
                      <div className={`w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 ${c.read ? "bg-gray-100 text-gray-500" : "bg-green-100 text-green-700"}`}>
                        {c.name.charAt(0).toUpperCase()}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between gap-2">
                          <p className={`text-sm truncate ${c.read ? "font-medium text-gray-700" : "font-bold text-gray-900"}`}>{c.name}</p>
                          <span className="text-[10px] text-gray-400 flex-shrink-0">{timeAgo(c.created_at)}</span>
                        </div>
                        <p className="text-xs text-gray-400 truncate">{c.email}</p>
                        <p className="text-xs text-gray-500 truncate mt-0.5">{c.message}</p>
                      </div>
                      {!c.read && <div className="w-2 h-2 bg-orange-500 rounded-full flex-shrink-0 mt-1.5" />}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Detail */}
          <div className="hidden lg:flex flex-1 flex-col overflow-y-auto">
            {selected ? (
              <div className="p-6 max-w-2xl">
                <div className="flex items-start justify-between mb-6">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center text-green-700 text-lg font-bold">
                      {selected.name.charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <h2 className="text-lg font-bold text-gray-900">{selected.name}</h2>
                      <p className="text-sm text-gray-500">{selected.email}</p>
                    </div>
                  </div>
                  <button onClick={() => deleteContact(selected.id)}
                    className="p-2 rounded-xl hover:bg-red-50 text-gray-400 hover:text-red-500 transition">
                    <Trash2 size={16} />
                  </button>
                </div>

                <div className="space-y-4">
                  {selected.phone && (
                    <div className="bg-gray-50 rounded-xl p-4">
                      <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Phone</p>
                      <p className="text-sm text-gray-800">{selected.phone}</p>
                    </div>
                  )}
                  {selected.service && (
                    <div className="bg-gray-50 rounded-xl p-4">
                      <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Service Interest</p>
                      <span className="inline-block text-xs bg-green-100 text-green-700 px-3 py-1 rounded-full font-medium">{selected.service}</span>
                    </div>
                  )}
                  <div className="bg-gray-50 rounded-xl p-4">
                    <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Message</p>
                    <p className="text-sm text-gray-800 leading-relaxed">{selected.message}</p>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-gray-400">
                    <Clock size={12} />
                    {new Date(selected.created_at).toLocaleDateString("en-GB", { weekday: "long", day: "numeric", month: "long", year: "numeric", hour: "2-digit", minute: "2-digit" })}
                    {selected.read
                      ? <span className="ml-2 flex items-center gap-1 text-green-600"><CheckCircle size={11} /> Read</span>
                      : <span className="ml-2 text-orange-500">● Unread</span>
                    }
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex-1 flex items-center justify-center text-gray-400">
                <div className="text-center">
                  <Eye size={32} className="mx-auto mb-3 opacity-30" />
                  <p className="text-sm">Select a contact to view details</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>

      {/* Toast */}
      {toast && (
        <div className="fixed bottom-6 right-6 z-50 px-5 py-3 rounded-2xl shadow-xl bg-green-600 text-white text-sm font-semibold flex items-center gap-2">
          <CheckCircle size={16} /> {toast}
        </div>
      )}
    </div>
  )
}