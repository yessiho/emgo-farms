'use client'

// app/admin/products/page.tsx
import { useState, useEffect, useRef } from "react"
import { useRouter } from "next/navigation"
import { supabase } from "@/lib/supabase"
import Link from "next/link"
import {
  Package, Plus, Pencil, Trash2, X, Save, Leaf,
  LayoutDashboard, FileText, Mail, Users, Settings,
  ChevronRight, LogOut, Search, CheckCircle, Shield,
  ImagePlus, Upload, Loader2, Briefcase, Image as ImageIcon,
} from "lucide-react"

type ProductStatus = "active" | "inactive"

interface Product {
  id:          string
  name:        string
  category:    string
  price:       number
  unit:        string
  description: string
  status:      ProductStatus
  in_stock:    boolean
  image_url:   string
  created_at:  string
}

interface FormState {
  name:        string
  category:    string
  price:       string
  unit:        string
  description: string
  status:      ProductStatus
  in_stock:    boolean
  image_url:   string
}

const CATEGORIES = [
  "Crude Palm Oil (CPO)",
  "Palm Kernel Oil (PKO)",
  "Palm Kernel Shell",
  "Palm Kernel Cake",
  "Fresh Fruit Bunches (FFB)",
  "Cassava",
  "Ginger",
  "Other",
]

const NAV = [
  { label: "Dashboard",   icon: LayoutDashboard, href: "/admin/dashboard"                  },
  { label: "Blog Posts",  icon: FileText,        href: "/admin/posts"                      },
  { label: "Contacts",    icon: Mail,            href: "/admin/contacts"                   },
  { label: "Subscribers", icon: Users,           href: "/admin/subscribers"                },
  { label: "Products",    icon: Package,         href: "/admin/products", active: true     },
  { label: "Services",    icon: Briefcase,       href: "/admin/services"                   },
  { label: "Gallery",     icon: ImageIcon,       href: "/admin/gallery"                    },
  { label: "Settings",    icon: Settings,        href: "/admin/settings"                   },
]

const CAT_COLOR: Record<string, string> = {
  "Crude Palm Oil (CPO)":      "bg-orange-100 text-orange-700",
  "Palm Kernel Oil (PKO)":     "bg-yellow-100 text-yellow-700",
  "Palm Kernel Shell":         "bg-amber-100 text-amber-700",
  "Palm Kernel Cake":          "bg-lime-100 text-lime-700",
  "Fresh Fruit Bunches (FFB)": "bg-green-100 text-green-700",
  "Cassava":                   "bg-blue-100 text-blue-700",
  "Ginger":                    "bg-purple-100 text-purple-700",
  "Other":                     "bg-gray-100 text-gray-600",
}

const EMPTY: FormState = {
  name: "", category: CATEGORIES[0], price: "", unit: "per litre",
  description: "", status: "active", in_stock: true, image_url: "",
}

function timeAgo(iso: string) {
  const h = Math.floor((Date.now() - new Date(iso).getTime()) / 3_600_000)
  if (h < 1) return "Just now"
  if (h < 24) return `${h}h ago`
  return `${Math.floor(h / 24)}d ago`
}

export default function ProductsPage() {
  const router  = useRouter()
  const fileRef = useRef<HTMLInputElement>(null)

  const [products,     setProducts]     = useState<Product[]>([])
  const [loading,      setLoading]      = useState(true)
  const [search,       setSearch]       = useState("")
  const [modal,        setModal]        = useState(false)
  const [editing,      setEditing]      = useState<Product | null>(null)
  const [form,         setForm]         = useState<FormState>({ ...EMPTY })
  const [saving,       setSaving]       = useState(false)
  const [deleting,     setDeleting]     = useState<string | null>(null)
  const [toast,        setToast]        = useState<{ msg: string; type: "success"|"error" }|null>(null)
  const [user,         setUser]         = useState<any>(null)
  const [signingOut,   setSigningOut]   = useState(false)
  const [uploading,    setUploading]    = useState(false)
  const [imagePreview, setImagePreview] = useState("")

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (!session) { router.push("/admin/login"); return }
      setUser(session.user)
      fetchProducts()
    })
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_, session) => {
      if (!session) router.push("/admin/login")
    })
    return () => subscription.unsubscribe()
  }, [])

  const fetchProducts = async () => {
    try {
      setLoading(true)
      const res  = await fetch("/api/admin/products")
      if (!res.ok) throw new Error(`HTTP ${res.status}`)
      const data = await res.json()
      if (data?.error) throw new Error(data.error)
      console.log("[products page] fetched:", data?.length, "products")
      setProducts(Array.isArray(data) ? data : [])
    } catch (err: any) {
      showToast("Failed to load products: " + err.message, "error")
    } finally {
      setLoading(false)
    }
  }

  const showToast = (msg: string, type: "success"|"error") => {
    setToast({ msg, type }); setTimeout(() => setToast(null), 3500)
  }

  const openCreate = () => {
    setEditing(null); setForm({ ...EMPTY }); setImagePreview(""); setModal(true)
  }

  const openEdit = (p: Product) => {
    setEditing(p)
    setForm({
      name:        p.name,
      category:    p.category,
      price:       String(p.price ?? ""),
      unit:        p.unit        ?? "per litre",
      description: p.description ?? "",
      status:      p.status      as ProductStatus,
      in_stock:    p.in_stock    ?? true,
      image_url:   p.image_url   ?? "",
    })
    setImagePreview(p.image_url ?? "")
    setModal(true)
  }

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    if (!file.type.startsWith("image/")) { showToast("Select an image file", "error"); return }
    if (file.size > 10 * 1024 * 1024)   { showToast("Image must be under 10MB", "error"); return }
    setUploading(true)
    try {
      // Upload via products API route (server-side, uses Service Role key)
      const formData = new FormData()
      formData.append("file",   file)
      formData.append("folder", "products")

      const res = await fetch("/api/admin/products", {
        method: "POST",
        body:   formData,
      })
      const json = await res.json()
      console.log("Upload response:", json)
      if (!res.ok) throw new Error(json.error ?? "Upload failed")
      if (!json.url) throw new Error("No URL returned from upload")

      setForm(f => ({ ...f, image_url: json.url }))
      setImagePreview(json.url)
      showToast("Image uploaded! URL: " + json.url.slice(-30), "success")
    } catch (err: any) {
      showToast("Upload failed: " + err.message, "error")
    } finally { setUploading(false) }
  }

  const removeImage = () => {
    setForm(f => ({ ...f, image_url: "" })); setImagePreview("")
    if (fileRef.current) fileRef.current.value = ""
  }

  const handleSave = async () => {
    if (!form.name.trim()) { showToast("Name is required", "error"); return }
    setSaving(true)
    try {
      const url    = editing ? `/api/admin/products/${editing.id}` : "/api/admin/products"
      const method = editing ? "PUT" : "POST"
      const res    = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, price: parseFloat(form.price) || 0 }),
      })
      const json = await res.json()
      if (!res.ok) throw new Error(json.error ?? "Failed to save")
      showToast(editing ? "Product updated!" : "Product created!", "success")
      setModal(false)
      fetchProducts()
    } catch (err: any) {
      showToast(err.message, "error")
    } finally { setSaving(false) }
  }

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this product?")) return
    setDeleting(id)
    try {
      const res = await fetch(`/api/admin/products/${id}`, { method: "DELETE" })
      if (!res.ok) throw new Error()
      showToast("Product deleted!", "success"); fetchProducts()
    } catch { showToast("Failed to delete", "error") }
    finally  { setDeleting(null) }
  }

  const handleSignOut = async () => {
    setSigningOut(true); await supabase.auth.signOut(); router.push("/admin/login")
  }

  const filtered = products.filter(p =>
    p.name?.toLowerCase().includes(search.toLowerCase()) ||
    p.category?.toLowerCase().includes(search.toLowerCase())
  )

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
            <h1 className="text-base sm:text-lg font-bold text-gray-900">Products</h1>
            <p className="text-gray-400 text-xs">{products.length} total products</p>
          </div>
          <div className="flex items-center gap-2 sm:gap-3">
            <div className="hidden sm:flex items-center gap-2 bg-gray-50 border border-gray-200 rounded-xl px-3 py-2 w-48">
              <Search size={13} className="text-gray-400" />
              <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search products…"
                className="bg-transparent text-xs text-gray-700 outline-none w-full placeholder-gray-400" />
            </div>
            <button onClick={openCreate}
              className="flex items-center gap-2 px-4 py-2.5 bg-orange-500 hover:bg-orange-600 text-white rounded-xl text-sm font-semibold transition shadow-sm">
              <Plus size={15} /> New Product
            </button>
          </div>
        </header>

        <div className="flex-1 px-5 sm:px-8 py-8 space-y-6">

          {/* Stats */}
          <div className="grid grid-cols-3 gap-3 sm:gap-4">
            {[
              { label: "Total",    value: products.length,                                     color: "bg-green-800"   },
              { label: "Active",   value: products.filter(p => p.status === "active").length,  color: "bg-orange-500"  },
              { label: "In Stock", value: products.filter(p => p.in_stock).length,             color: "bg-emerald-600" },
            ].map(({ label, value, color }) => (
              <div key={label} className={`${color} rounded-2xl p-4 sm:p-5 text-white text-center shadow-lg`}>
                <p className="text-2xl sm:text-3xl font-bold">{value}</p>
                <p className="text-white/70 text-[10px] uppercase tracking-widest mt-1">{label}</p>
              </div>
            ))}
          </div>

          {/* Product grid */}
          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {[1,2,3].map(i => <div key={i} className="bg-white rounded-2xl h-64 animate-pulse" />)}
            </div>
          ) : filtered.length === 0 ? (
            <div className="py-20 text-center text-gray-400">
              <Package size={36} className="mx-auto mb-3 opacity-30" />
              <p className="text-sm font-medium">{search ? "No products match your search" : "No products yet"}</p>
              <button onClick={openCreate}
                className="mt-4 inline-flex items-center gap-2 px-5 py-2.5 bg-orange-500 hover:bg-orange-600 text-white rounded-xl text-sm font-semibold transition">
                <Plus size={14} /> Add First Product
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {filtered.map(product => (
                <div key={product.id} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-all group">
                  {/* Image */}
                  <div className="relative h-44 bg-gray-100 overflow-hidden">
                    {product.image_url
                      ? <img src={product.image_url} alt={product.name}
                          onError={e => { (e.target as HTMLImageElement).style.display = "none" }}
                          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105" />
                      : <div className="w-full h-full flex items-center justify-center"><Package size={32} className="text-gray-200" /></div>
                    }
                    {/* Hover actions */}
                    <div className="absolute top-2 right-2 flex gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button onClick={() => openEdit(product)}
                        className="p-1.5 rounded-lg bg-white/90 hover:bg-blue-50 text-gray-500 hover:text-blue-600 shadow-sm transition">
                        <Pencil size={13} />
                      </button>
                      <button onClick={() => handleDelete(product.id)} disabled={deleting === product.id}
                        className="p-1.5 rounded-lg bg-white/90 hover:bg-red-50 text-gray-500 hover:text-red-500 shadow-sm transition disabled:opacity-50">
                        <Trash2 size={13} />
                      </button>
                    </div>
                    <span className={`absolute top-2 left-2 text-[10px] px-2 py-0.5 rounded-full font-semibold ${CAT_COLOR[product.category] ?? "bg-gray-100 text-gray-600"}`}>
                      {product.category}
                    </span>
                  </div>
                  <div className="p-4">
                    <p className="text-sm font-bold text-gray-800 truncate">{product.name}</p>
                    <p className="text-xs text-gray-400 mt-0.5 line-clamp-2">{product.description}</p>
                    <div className="flex items-center justify-between mt-3">
                      <p className="text-base font-bold text-green-700">
                        ₦{Number(product.price).toLocaleString()}
                        <span className="text-xs font-normal text-gray-400 ml-1">{product.unit}</span>
                      </p>
                      <div className="flex items-center gap-1.5">
                        <span className={`text-[10px] px-2 py-0.5 rounded-full font-semibold ${product.status === "active" ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-500"}`}>
                          {product.status}
                        </span>
                        <span className={`text-[10px] px-2 py-0.5 rounded-full font-semibold ${product.in_stock ? "bg-emerald-100 text-emerald-700" : "bg-red-100 text-red-600"}`}>
                          {product.in_stock ? "In Stock" : "Out"}
                        </span>
                      </div>
                    </div>
                    <p className="text-[10px] text-gray-300 mt-2">{timeAgo(product.created_at)}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>

      {/* MODAL */}
      {modal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="bg-white rounded-3xl shadow-2xl w-full max-w-2xl max-h-[92vh] overflow-y-auto">
            <div className="flex items-center justify-between px-6 py-5 border-b border-gray-100 sticky top-0 bg-white z-10 rounded-t-3xl">
              <div>
                <h2 className="text-base font-bold text-gray-900">{editing ? "Edit Product" : "New Product"}</h2>
                <p className="text-xs text-gray-400 mt-0.5">{editing ? "Update product details" : "Add a new product"}</p>
              </div>
              <button onClick={() => setModal(false)} className="p-2 rounded-xl hover:bg-gray-100 text-gray-400 transition"><X size={16} /></button>
            </div>

            <div className="px-6 py-5 space-y-5">
              {/* Image Upload */}
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-2">Product Image</label>
                {imagePreview ? (
                  <div className="relative rounded-2xl overflow-hidden border border-gray-200">
                    <img src={imagePreview} alt="Preview" className="w-full h-48 object-cover" />
                    <div className="absolute inset-0 bg-black/30 opacity-0 hover:opacity-100 transition-all flex items-center justify-center gap-3">
                      <button onClick={() => fileRef.current?.click()} disabled={uploading}
                        className="flex items-center gap-1.5 px-3 py-2 bg-white text-gray-700 rounded-xl text-xs font-semibold hover:bg-gray-50 transition">
                        <Upload size={13} /> Replace
                      </button>
                      <button onClick={removeImage}
                        className="flex items-center gap-1.5 px-3 py-2 bg-red-500 text-white rounded-xl text-xs font-semibold hover:bg-red-600 transition">
                        <Trash2 size={13} /> Remove
                      </button>
                    </div>
                    {uploading && (
                      <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                        <div className="flex items-center gap-2 text-white text-sm font-semibold"><Loader2 size={18} className="animate-spin" /> Uploading…</div>
                      </div>
                    )}
                  </div>
                ) : (
                  <button onClick={() => fileRef.current?.click()} disabled={uploading}
                    className="w-full border-2 border-dashed border-gray-200 hover:border-orange-400 rounded-2xl p-8 flex flex-col items-center gap-3 transition-all group bg-gray-50 hover:bg-orange-50/30 disabled:opacity-60">
                    {uploading
                      ? <><Loader2 size={28} className="text-orange-400 animate-spin" /><p className="text-sm text-gray-500">Uploading…</p></>
                      : <><div className="w-12 h-12 rounded-2xl bg-orange-100 group-hover:bg-orange-200 flex items-center justify-center transition-colors">
                          <ImagePlus size={22} className="text-orange-500" />
                        </div>
                        <div className="text-center">
                          <p className="text-sm font-semibold text-gray-700">Click to upload image</p>
                          <p className="text-xs text-gray-400 mt-0.5">PNG, JPG, WEBP up to 5MB</p>
                        </div></>
                    }
                  </button>
                )}
                <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={handleImageUpload} />
                <div className="mt-2 flex items-center gap-2">
                  <div className="flex-1 h-px bg-gray-100" /><span className="text-[10px] text-gray-400">or paste URL</span><div className="flex-1 h-px bg-gray-100" />
                </div>
                {form.image_url && (
                  <div className="mb-2 px-3 py-2 bg-green-50 border border-green-200 rounded-lg">
                    <p className="text-[10px] text-green-700 font-semibold mb-0.5">✅ Image URL saved:</p>
                    <p className="text-[10px] text-green-600 break-all">{form.image_url}</p>
                  </div>
                )}
                <input value={form.image_url} onChange={e => { setForm(f => ({ ...f, image_url: e.target.value })); setImagePreview(e.target.value) }}
                  placeholder="https://example.com/image.jpg"
                  className="mt-2 w-full px-4 py-2.5 text-xs border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 transition" />
              </div>

              {/* Name */}
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1.5">Product Name *</label>
                <input value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} placeholder="e.g. Premium Crude Palm Oil"
                  className="w-full px-4 py-3 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 transition" />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1.5">Category</label>
                  <select value={form.category} onChange={e => setForm(f => ({ ...f, category: e.target.value }))}
                    className="w-full px-4 py-3 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 bg-white">
                    {CATEGORIES.map(c => <option key={c}>{c}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1.5">Status</label>
                  <select value={form.status} onChange={e => setForm(f => ({ ...f, status: e.target.value as ProductStatus }))}
                    className="w-full px-4 py-3 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 bg-white">
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1.5">Price (₦)</label>
                  <input value={form.price} onChange={e => setForm(f => ({ ...f, price: e.target.value }))} type="number" placeholder="0.00"
                    className="w-full px-4 py-3 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 transition" />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1.5">Unit</label>
                  <input value={form.unit} onChange={e => setForm(f => ({ ...f, unit: e.target.value }))} placeholder="per litre"
                    className="w-full px-4 py-3 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 transition" />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1.5">Description</label>
                <textarea value={form.description} onChange={e => setForm(f => ({ ...f, description: e.target.value }))} rows={3} placeholder="Describe this product…"
                  className="w-full px-4 py-3 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 transition resize-none" />
              </div>

              <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl">
                <input type="checkbox" id="in_stock" checked={form.in_stock} onChange={e => setForm(f => ({ ...f, in_stock: e.target.checked }))}
                  className="w-4 h-4 accent-orange-500" />
                <label htmlFor="in_stock" className="text-sm font-medium text-gray-700">Currently in stock / available</label>
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 px-6 py-4 border-t border-gray-100 sticky bottom-0 bg-white rounded-b-3xl">
              <button onClick={() => setModal(false)} className="px-5 py-2.5 text-sm text-gray-600 hover:text-gray-800 font-medium transition">Cancel</button>
              <button onClick={handleSave} disabled={saving || uploading}
                className="flex items-center gap-2 px-6 py-2.5 bg-orange-500 hover:bg-orange-600 disabled:opacity-60 text-white rounded-xl text-sm font-semibold transition shadow-sm">
                {saving ? <Loader2 size={14} className="animate-spin" /> : <Save size={14} />}
                {saving ? "Saving…" : editing ? "Update Product" : "Create Product"}
              </button>
            </div>
          </div>
        </div>
      )}

      {toast && (
        <div className={`fixed bottom-6 right-6 z-50 px-5 py-3 rounded-2xl shadow-xl text-white text-sm font-semibold flex items-center gap-2 ${toast.type === "success" ? "bg-green-600" : "bg-red-500"}`}>
          {toast.type === "success" ? <CheckCircle size={16} /> : <X size={16} />}
          {toast.msg}
        </div>
      )}
    </div>
  )
}