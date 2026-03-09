'use client'

// app/admin/services/page.tsx
import { useState, useEffect, useRef } from "react"
import { useRouter } from "next/navigation"
import { supabase } from "@/lib/supabase"
import Link from "next/link"
import {
  Briefcase, Plus, Trash2, X, Leaf, ChevronRight, Pencil,
  LayoutDashboard, Mail, Users, FileText, Package, Settings,
  LogOut, Shield, Loader2, CheckCircle, Image as ImageIcon,
  ChevronDown, ChevronUp,
} from "lucide-react"

interface Service {
  id:         string
  title:      string
  icon:       string
  short:      string
  details:    string
  process:    string[]
  benefits:   string[]
  image_url:  string
  status:     string
  created_at: string
}

const EMPTY = {
  title:     "",
  icon:      "🌿",
  short:     "",
  details:   "",
  process:   [""],
  benefits:  [""],
  image_url: "",
  status:    "active",
}

const ICON_OPTIONS = ["🌴","⚗️","🔬","🌿","🏭","🚜","💧","✨","🌱","🔗","📦","🤝"]

const NAV = [
  { label: "Dashboard",   icon: LayoutDashboard, href: "/admin/dashboard"              },
  { label: "Blog Posts",  icon: FileText,        href: "/admin/posts"                  },
  { label: "Contacts",    icon: Mail,            href: "/admin/contacts"               },
  { label: "Subscribers", icon: Users,           href: "/admin/subscribers"            },
  { label: "Products",    icon: Package,         href: "/admin/products"               },
  { label: "Services",    icon: Briefcase,       href: "/admin/services", active: true },
  { label: "Gallery",     icon: ImageIcon,       href: "/admin/gallery"                },
  { label: "Settings",    icon: Settings,        href: "/admin/settings"               },
]

export default function AdminServicesPage() {
  const router  = useRouter()
  const fileRef = useRef<HTMLInputElement>(null)

  const [services,     setServices]     = useState<Service[]>([])
  const [loading,      setLoading]      = useState(true)
  const [modal,        setModal]        = useState(false)
  const [editing,      setEditing]      = useState<Service | null>(null)
  const [form,         setForm]         = useState({ ...EMPTY })
  const [saving,       setSaving]       = useState(false)
  const [uploading,    setUploading]    = useState(false)
  const [deleting,     setDeleting]     = useState<string | null>(null)
  const [toast,        setToast]        = useState<{ msg: string; type: "success"|"error" }|null>(null)
  const [user,         setUser]         = useState<any>(null)
  const [signingOut,   setSigningOut]   = useState(false)
  const [expanded,     setExpanded]     = useState<string | null>(null)
  const [imagePreview, setImagePreview] = useState("")

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (!session) { router.push("/admin/login"); return }
      setUser(session.user)
      fetchServices()
    })
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_, session) => {
      if (!session) router.push("/admin/login")
    })
    return () => subscription.unsubscribe()
  }, [])

  const showToast = (msg: string, type: "success"|"error") => {
    setToast({ msg, type }); setTimeout(() => setToast(null), 3500)
  }

  const getToken = async () =>
    (await supabase.auth.getSession()).data.session?.access_token ?? ""

  const fetchServices = async () => {
    setLoading(true)
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_SUPABASE_URL}/rest/v1/services?select=*&order=created_at.asc`,
        {
          headers: {
            "apikey":        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
            "Authorization": `Bearer ${await getToken()}`,
          }
        }
      )
      const data = await res.json()
      setServices(Array.isArray(data) ? data : [])
    } catch {
      showToast("Failed to load services", "error")
    } finally {
      setLoading(false)
    }
  }

  const openCreate = () => {
    setEditing(null); setForm({ ...EMPTY }); setImagePreview(""); setModal(true)
  }

  const openEdit = (s: Service) => {
    setEditing(s)
    setForm({
      title:     s.title,
      icon:      s.icon      || "🌿",
      short:     s.short     || "",
      details:   s.details   || "",
      process:   Array.isArray(s.process)  && s.process.length  ? s.process  : [""],
      benefits:  Array.isArray(s.benefits) && s.benefits.length ? s.benefits : [""],
      image_url: s.image_url || "",
      status:    s.status    || "active",
    })
    setImagePreview(s.image_url || "")
    setModal(true)
  }

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    if (!file.type.startsWith("image/")) { showToast("Select an image file", "error"); return }
    if (file.size > 10 * 1024 * 1024)   { showToast("Image must be under 10MB", "error"); return }
    setUploading(true)
    try {
      const fd = new FormData()
      fd.append("file",   file)
      fd.append("folder", "services")
      const res  = await fetch("/api/admin/products", { method: "POST", body: fd })
      const json = await res.json()
      if (!res.ok) throw new Error(json.error ?? "Upload failed")
      setForm(f => ({ ...f, image_url: json.url }))
      setImagePreview(json.url)
      showToast("Image uploaded!", "success")
    } catch (err: any) {
      showToast("Upload failed: " + err.message, "error")
    } finally { setUploading(false) }
  }

  const handleSave = async () => {
    if (!form.title.trim()) { showToast("Title is required", "error"); return }
    if (!form.short.trim()) { showToast("Short description is required", "error"); return }
    setSaving(true)
    try {
      const token   = await getToken()
      const payload = {
        ...form,
        process:  form.process.filter(p => p.trim()),
        benefits: form.benefits.filter(b => b.trim()),
      }
      const url    = editing
        ? `${process.env.NEXT_PUBLIC_SUPABASE_URL}/rest/v1/services?id=eq.${editing.id}`
        : `${process.env.NEXT_PUBLIC_SUPABASE_URL}/rest/v1/services`
      const method = editing ? "PATCH" : "POST"

      const res = await fetch(url, {
        method,
        headers: {
          "Content-Type":  "application/json",
          "apikey":        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
          "Authorization": `Bearer ${token}`,
          "Prefer":        "return=representation",
        },
        body: JSON.stringify(payload),
      })
      if (!res.ok) throw new Error(await res.text())
      showToast(editing ? "Service updated!" : "Service created!", "success")
      setModal(false)
      fetchServices()
    } catch (err: any) {
      showToast(err.message, "error")
    } finally { setSaving(false) }
  }

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this service?")) return
    setDeleting(id)
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_SUPABASE_URL}/rest/v1/services?id=eq.${id}`,
        {
          method:  "DELETE",
          headers: {
            "apikey":        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
            "Authorization": `Bearer ${await getToken()}`,
          }
        }
      )
      if (!res.ok) throw new Error()
      setServices(prev => prev.filter(s => s.id !== id))
      showToast("Deleted!", "success")
    } catch { showToast("Failed to delete", "error") }
    finally  { setDeleting(null) }
  }

  const handleSignOut = async () => {
    setSigningOut(true); await supabase.auth.signOut(); router.push("/admin/login")
  }

  const updateListItem = (field: "process"|"benefits", idx: number, val: string) =>
    setForm(f => { const a = [...f[field]]; a[idx] = val; return { ...f, [field]: a } })
  const addListItem    = (field: "process"|"benefits") =>
    setForm(f => ({ ...f, [field]: [...f[field], ""] }))
  const removeListItem = (field: "process"|"benefits", idx: number) =>
    setForm(f => ({ ...f, [field]: f[field].filter((_, i) => i !== idx) }))

  const activeCount   = services.filter(s => s.status === "active").length
  const inactiveCount = services.filter(s => s.status !== "active").length

  return (
    <div className="flex min-h-screen bg-gray-50 font-sans">

      {/* SIDEBAR */}
      <aside className="hidden md:flex flex-col w-64 lg:w-72 bg-green-900 text-white flex-shrink-0 fixed top-0 left-0 h-screen z-40 shadow-2xl">
        <div className="px-6 pt-8 pb-6 border-b border-green-800/60">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-orange-500 flex items-center justify-center shadow-lg flex-shrink-0">
              <Leaf size={20} />
            </div>
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
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 ${
                active ? "bg-orange-500 text-white shadow-lg" : "text-green-200 hover:bg-white/10 hover:text-white"
              }`}>
              <Icon size={16} className="flex-shrink-0" />{label}
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
            className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-red-500/20 hover:bg-red-500/30 border border-red-500/30 text-red-300 text-xs font-semibold transition-all disabled:opacity-60">
            {signingOut ? <div className="w-3.5 h-3.5 border-2 border-red-300 border-t-transparent rounded-full animate-spin" /> : <LogOut size={13} />}
            {signingOut ? "Signing out…" : "Sign Out"}
          </button>
        </div>
      </aside>

      {/* MAIN */}
      <main className="flex-1 md:ml-64 lg:ml-72 flex flex-col min-h-screen">
        <header className="sticky top-0 z-30 bg-white/90 backdrop-blur-md border-b border-gray-100 px-5 sm:px-8 py-4 flex items-center justify-between shadow-sm">
          <div>
            <h1 className="text-base sm:text-lg font-bold text-gray-900">Services</h1>
            <p className="text-gray-400 text-xs">{activeCount} active · {inactiveCount} inactive</p>
          </div>
          <button onClick={openCreate}
            className="flex items-center gap-2 px-4 py-2.5 bg-orange-500 hover:bg-orange-600 text-white rounded-xl text-sm font-semibold transition shadow-sm">
            <Plus size={15} /> Add Service
          </button>
        </header>

        <div className="flex-1 px-5 sm:px-8 py-8 space-y-4">

          {/* Stats */}
          <div className="grid grid-cols-3 gap-3">
            {[
              { label: "Total",    value: services.length, color: "bg-green-800"  },
              { label: "Active",   value: activeCount,     color: "bg-orange-500" },
              { label: "Inactive", value: inactiveCount,   color: "bg-gray-400"   },
            ].map(({ label, value, color }) => (
              <div key={label} className={`${color} rounded-2xl p-4 text-white text-center shadow`}>
                <p className="text-2xl font-bold">{value}</p>
                <p className="text-white/70 text-[10px] uppercase tracking-widest mt-1">{label}</p>
              </div>
            ))}
          </div>

          {/* List */}
          {loading ? (
            <div className="space-y-3">
              {[1,2,3].map(i => <div key={i} className="bg-white rounded-2xl h-20 animate-pulse" />)}
            </div>
          ) : services.length === 0 ? (
            <div className="py-20 text-center text-gray-400">
              <Briefcase size={36} className="mx-auto mb-3 opacity-30" />
              <p className="text-sm font-medium">No services yet</p>
              <p className="text-xs mt-1 text-gray-300">Click "Add Service" to get started</p>
            </div>
          ) : (
            <div className="space-y-3">
              {services.map(service => (
                <div key={service.id} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                  <div className="flex items-center gap-4 p-4 sm:p-5">
                    {/* Thumb */}
                    <div className="w-14 h-14 rounded-xl overflow-hidden bg-green-50 flex items-center justify-center flex-shrink-0 border border-gray-100">
                      {service.image_url
                        ? <img src={service.image_url} alt={service.title} className="w-full h-full object-cover" />
                        : <span className="text-2xl">{service.icon || "🌿"}</span>
                      }
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <h3 className="text-sm font-bold text-gray-900">{service.title}</h3>
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                          service.status === "active" ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-500"
                        }`}>{service.status}</span>
                      </div>
                      <p className="text-xs text-gray-400 mt-0.5 line-clamp-1">{service.short}</p>
                      <div className="flex gap-3 mt-1 text-[10px] text-gray-400">
                        <span>📋 {Array.isArray(service.process)  ? service.process.filter(Boolean).length  : 0} steps</span>
                        <span>✅ {Array.isArray(service.benefits) ? service.benefits.filter(Boolean).length : 0} benefits</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-1.5 flex-shrink-0">
                      <button onClick={() => setExpanded(expanded === service.id ? null : service.id)}
                        className="p-2 rounded-lg hover:bg-gray-100 text-gray-400 transition" title="View details">
                        {expanded === service.id ? <ChevronUp size={15} /> : <ChevronDown size={15} />}
                      </button>
                      <button onClick={() => openEdit(service)}
                        className="p-2 rounded-lg hover:bg-orange-50 text-gray-400 hover:text-orange-500 transition" title="Edit">
                        <Pencil size={15} />
                      </button>
                      <button onClick={() => handleDelete(service.id)} disabled={deleting === service.id}
                        className="p-2 rounded-lg hover:bg-red-50 text-gray-400 hover:text-red-500 transition" title="Delete">
                        {deleting === service.id ? <Loader2 size={15} className="animate-spin" /> : <Trash2 size={15} />}
                      </button>
                    </div>
                  </div>

                  {/* Expanded details */}
                  {expanded === service.id && (
                    <div className="px-5 pb-5 border-t border-gray-100 pt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="bg-green-50 rounded-xl p-4">
                        <p className="text-xs font-bold text-green-800 mb-2">Process Steps</p>
                        {Array.isArray(service.process) && service.process.filter(Boolean).length > 0
                          ? service.process.filter(Boolean).map((step, i) => (
                            <p key={i} className="text-xs text-gray-600 flex gap-2 mb-1.5">
                              <span className="text-green-500 font-bold shrink-0">{i + 1}.</span>{step}
                            </p>
                          ))
                          : <p className="text-xs text-gray-400 italic">No steps added</p>
                        }
                      </div>
                      <div className="bg-orange-50 rounded-xl p-4">
                        <p className="text-xs font-bold text-orange-700 mb-2">Key Benefits</p>
                        {Array.isArray(service.benefits) && service.benefits.filter(Boolean).length > 0
                          ? service.benefits.filter(Boolean).map((b, i) => (
                            <p key={i} className="text-xs text-gray-600 flex gap-2 mb-1.5">
                              <span className="text-orange-400 shrink-0">✔</span>{b}
                            </p>
                          ))
                          : <p className="text-xs text-gray-400 italic">No benefits added</p>
                        }
                      </div>
                      {service.details && (
                        <div className="sm:col-span-2 bg-gray-50 rounded-xl p-4">
                          <p className="text-xs font-bold text-gray-700 mb-1.5">Full Description</p>
                          <p className="text-xs text-gray-500 leading-relaxed">{service.details}</p>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </main>

      {/* MODAL */}
      {modal && (
        <div className="fixed inset-0 z-50 flex items-start justify-center p-4 bg-black/50 backdrop-blur-sm overflow-y-auto">
          <div className="bg-white rounded-3xl shadow-2xl w-full max-w-2xl my-4">
            <div className="flex items-center justify-between px-6 py-5 border-b border-gray-100">
              <div>
                <h2 className="text-base font-bold text-gray-900">{editing ? "Edit Service" : "Add New Service"}</h2>
                <p className="text-xs text-gray-400 mt-0.5">Fill in the service details</p>
              </div>
              <button onClick={() => setModal(false)} className="p-2 rounded-xl hover:bg-gray-100 text-gray-400"><X size={16} /></button>
            </div>

            <div className="px-6 py-5 space-y-5 max-h-[75vh] overflow-y-auto">

              {/* Image */}
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-2">Service Image</label>
                <div className="relative w-full h-40 bg-gray-50 rounded-2xl overflow-hidden border-2 border-dashed border-gray-200 hover:border-orange-400 transition cursor-pointer"
                  onClick={() => fileRef.current?.click()}>
                  {imagePreview
                    ? <img src={imagePreview} alt="Preview" className="w-full h-full object-cover" />
                    : <div className="w-full h-full flex flex-col items-center justify-center gap-2 text-gray-400">
                        <ImageIcon size={24} />
                        <p className="text-xs font-medium">Click to upload image</p>
                      </div>
                  }
                  {uploading && (
                    <div className="absolute inset-0 bg-white/80 flex items-center justify-center">
                      <Loader2 size={20} className="animate-spin text-orange-500" />
                    </div>
                  )}
                </div>
                <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={handleImageUpload} />
              </div>

              {/* Icon picker */}
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-2">Icon</label>
                <div className="flex flex-wrap gap-2">
                  {ICON_OPTIONS.map(icon => (
                    <button key={icon} type="button" onClick={() => setForm(f => ({ ...f, icon }))}
                      className={`w-10 h-10 rounded-xl text-xl flex items-center justify-center transition border-2 ${
                        form.icon === icon ? "border-orange-500 bg-orange-50" : "border-gray-200 hover:border-gray-300"
                      }`}>{icon}</button>
                  ))}
                </div>
              </div>

              {/* Title + Status */}
              <div className="grid grid-cols-3 gap-3">
                <div className="col-span-2">
                  <label className="block text-xs font-semibold text-gray-700 mb-1.5">Title *</label>
                  <input value={form.title} onChange={e => setForm(f => ({ ...f, title: e.target.value }))}
                    placeholder="e.g. Oil Palm Farming"
                    className="w-full px-4 py-3 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500" />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1.5">Status</label>
                  <select value={form.status} onChange={e => setForm(f => ({ ...f, status: e.target.value }))}
                    className="w-full px-3 py-3 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 bg-white">
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                  </select>
                </div>
              </div>

              {/* Short */}
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1.5">Short Description *</label>
                <input value={form.short} onChange={e => setForm(f => ({ ...f, short: e.target.value }))}
                  placeholder="One-line summary shown on service cards"
                  className="w-full px-4 py-3 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500" />
              </div>

              {/* Details */}
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1.5">Full Description</label>
                <textarea value={form.details} onChange={e => setForm(f => ({ ...f, details: e.target.value }))}
                  rows={4} placeholder="Detailed description shown when expanded…"
                  className="w-full px-4 py-3 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 resize-none" />
              </div>

              {/* Process steps */}
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-2">Process Steps</label>
                <div className="space-y-2">
                  {form.process.map((step, i) => (
                    <div key={i} className="flex gap-2 items-center">
                      <span className="w-6 h-6 rounded-full bg-green-100 text-green-800 text-[10px] font-bold flex items-center justify-center shrink-0">{i + 1}</span>
                      <input value={step} onChange={e => updateListItem("process", i, e.target.value)}
                        placeholder={`Step ${i + 1}…`}
                        className="flex-1 px-3 py-2 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500" />
                      {form.process.length > 1 && (
                        <button onClick={() => removeListItem("process", i)} className="p-1.5 rounded-lg hover:bg-red-50 text-gray-400 hover:text-red-500">
                          <X size={13} />
                        </button>
                      )}
                    </div>
                  ))}
                </div>
                <button onClick={() => addListItem("process")} className="mt-2 text-xs text-orange-500 hover:text-orange-600 font-semibold flex items-center gap-1">
                  <Plus size={12} /> Add Step
                </button>
              </div>

              {/* Benefits */}
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-2">Key Benefits</label>
                <div className="space-y-2">
                  {form.benefits.map((benefit, i) => (
                    <div key={i} className="flex gap-2 items-center">
                      <span className="text-orange-400 font-bold text-sm shrink-0">✔</span>
                      <input value={benefit} onChange={e => updateListItem("benefits", i, e.target.value)}
                        placeholder={`Benefit ${i + 1}…`}
                        className="flex-1 px-3 py-2 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500" />
                      {form.benefits.length > 1 && (
                        <button onClick={() => removeListItem("benefits", i)} className="p-1.5 rounded-lg hover:bg-red-50 text-gray-400 hover:text-red-500">
                          <X size={13} />
                        </button>
                      )}
                    </div>
                  ))}
                </div>
                <button onClick={() => addListItem("benefits")} className="mt-2 text-xs text-orange-500 hover:text-orange-600 font-semibold flex items-center gap-1">
                  <Plus size={12} /> Add Benefit
                </button>
              </div>

            </div>

            <div className="flex items-center justify-end gap-3 px-6 py-4 border-t border-gray-100">
              <button onClick={() => setModal(false)} className="px-5 py-2.5 text-sm text-gray-600 font-medium hover:text-gray-800">Cancel</button>
              <button onClick={handleSave} disabled={saving || uploading}
                className="flex items-center gap-2 px-6 py-2.5 bg-orange-500 hover:bg-orange-600 disabled:opacity-60 text-white rounded-xl text-sm font-semibold transition shadow-sm">
                {saving ? <Loader2 size={14} className="animate-spin" /> : <CheckCircle size={14} />}
                {saving ? "Saving…" : editing ? "Update Service" : "Create Service"}
              </button>
            </div>
          </div>
        </div>
      )}

      {toast && (
        <div className={`fixed bottom-6 right-6 z-50 px-5 py-3 rounded-2xl shadow-xl text-white text-sm font-semibold flex items-center gap-2 ${
          toast.type === "success" ? "bg-green-600" : "bg-red-500"
        }`}>
          {toast.type === "success" ? <CheckCircle size={16} /> : <X size={16} />}
          {toast.msg}
        </div>
      )}
    </div>
  )
}