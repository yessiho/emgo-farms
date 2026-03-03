'use client'

// app/admin/products/page.tsx
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { supabase } from "@/lib/supabase"
import Link from "next/link"
import {
  Package, Plus, Pencil, Trash2, X, Save, Leaf,
  LayoutDashboard, FileText, Mail, Users, Settings,
  ChevronRight, LogOut, Search, CheckCircle,
  ToggleLeft, ToggleRight, Shield,
} from "lucide-react"

type ProductStatus = "active" | "inactive"

interface Product {
  id:          string
  name:        string
  category:    string
  price:       string
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
  { label: "Dashboard",   icon: LayoutDashboard, href: "/admin/dashboard" },
  { label: "Blog Posts",  icon: FileText,        href: "/admin/posts"     },
  { label: "Contacts",    icon: Mail,            href: "/admin/contacts"  },
  { label: "Subscribers", icon: Users,           href: "/admin/dashboard" },
  { label: "Products",    icon: Package,         href: "/admin/products", active: true },
  { label: "Settings",    icon: Settings,        href: "/admin/dashboard" },
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

export default function AdminProductsPage() {
  const router = useRouter()
  const [products,   setProducts]   = useState<Product[]>([])
  const [loading,    setLoading]    = useState(true)
  const [search,     setSearch]     = useState("")
  const [modal,      setModal]      = useState(false)
  const [editing,    setEditing]    = useState<Product | null>(null)
  const [form,       setForm]       = useState<FormState>({ ...EMPTY })
  const [saving,     setSaving]     = useState(false)
  const [deleting,   setDeleting]   = useState<string | null>(null)
  const [toast,      setToast]      = useState<{ msg: string; type: "success" | "error" } | null>(null)
  const [user,       setUser]       = useState<any>(null)
  const [signingOut, setSigningOut] = useState(false)

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (!session) { router.push("/admin/login"); return }
      setUser(session.user)
      fetchProducts()
    })
  }, [])

  const fetchProducts = async () => {
    setLoading(true)
    const res  = await fetch("/api/admin/products")
    const data = await res.json()
    setProducts(Array.isArray(data) ? data : [])
    setLoading(false)
  }

  const showToast = (msg: string, type: "success" | "error") => {
    setToast({ msg, type })
    setTimeout(() => setToast(null), 3000)
  }

  const openCreate = () => { setEditing(null); setForm({ ...EMPTY }); setModal(true) }

  const openEdit = (p: Product) => {
    setEditing(p)
    setForm({
      name:        p.name,
      category:    p.category,
      price:       p.price,
      unit:        p.unit,
      description: p.description,
      status:      p.status as ProductStatus,
      in_stock:    p.in_stock,
      image_url:   p.image_url ?? "",
    })
    setModal(true)
  }

  const handleSave = async () => {
    if (!form.name.trim()) { showToast("Product name is required", "error"); return }
    setSaving(true)
    try {
      const url    = editing ? `/api/admin/products/${editing.id}` : "/api/admin/products"
      const method = editing ? "PUT" : "POST"
      const res    = await fetch(url, { method, headers: { "Content-Type": "application/json" }, body: JSON.stringify(form) })
      if (!res.ok) throw new Error()
      showToast(editing ? "Product updated!" : "Product created!", "success")
      setModal(false)
      fetchProducts()
    } catch {
      showToast("Failed to save product", "error")
    } finally {
      setSaving(false)
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this product?")) return
    setDeleting(id)
    try {
      const res = await fetch(`/api/admin/products/${id}`, { method: "DELETE" })
      if (!res.ok) throw new Error()
      showToast("Product deleted!", "success")
      fetchProducts()
    } catch {
      showToast("Failed to delete", "error")
    } finally {
      setDeleting(null)
    }
  }

  const handleSignOut = async () => {
    setSigningOut(true)
    await supabase.auth.signOut()
    router.push("/admin/login")
  }

  const filtered = products.filter(p =>
    p.name.toLowerCase().includes(search.toLowerCase()) ||
    p.category.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className="flex min-h-screen bg-gray-50 font-sans">

      {/* ── SIDEBAR ── */}
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
          {NAV.map(({ label, icon: Icon, href, active }) => (
            <Link key={label} href={href}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 group ${
                active ? "bg-orange-500 text-white shadow-lg shadow-orange-500/30" : "text-green-200 hover:bg-white/10 hover:text-white"
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

        <div className="px-4 py-5 border-t border-green-800/60 space-y-3">
          <div className="flex items-center gap-3 bg-green-800/40 rounded-xl px-3 py-3">
            <div className="w-9 h-9 rounded-full bg-gradient-to-br from-orange-400 to-orange-600 flex items-center justify-center text-sm font-bold flex-shrink-0 shadow-md">
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

      {/* ── MAIN ── */}
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
              className="flex items-center gap-2 px-4 py-2.5 bg-orange-500 hover:bg-orange-600 text-white rounded-xl text-sm font-semibold transition shadow-sm shadow-orange-200">
              <Plus size={15} /> Add Product
            </button>
            <button onClick={handleSignOut} disabled={signingOut}
              className="md:hidden flex items-center gap-1.5 px-3 py-2 rounded-xl bg-red-50 hover:bg-red-100 text-red-500 text-xs font-semibold transition">
              <LogOut size={13} />{signingOut ? "…" : "Out"}
            </button>
          </div>
        </header>

        <div className="flex-1 px-5 sm:px-8 py-8 space-y-6">

          {/* Stats */}
          <div className="grid grid-cols-3 gap-3 sm:gap-4">
            {[
              { label: "Total",    value: products.length,                                    color: "bg-green-800"   },
              { label: "Active",   value: products.filter(p => p.status === "active").length, color: "bg-orange-500"  },
              { label: "In Stock", value: products.filter(p => p.in_stock).length,            color: "bg-emerald-600" },
            ].map(({ label, value, color }) => (
              <div key={label} className={`${color} rounded-2xl p-4 sm:p-5 text-white text-center shadow-lg`}>
                <p className="text-2xl sm:text-3xl font-bold">{value}</p>
                <p className="text-white/70 text-[10px] uppercase tracking-widest mt-1">{label}</p>
              </div>
            ))}
          </div>

          {/* Grid */}
          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {[1,2,3,4,5,6].map(i => (
                <div key={i} className="bg-white rounded-2xl p-5 animate-pulse space-y-3 border border-gray-100">
                  <div className="h-4 bg-gray-100 rounded w-2/3" />
                  <div className="h-3 bg-gray-100 rounded w-1/3" />
                  <div className="h-3 bg-gray-100 rounded w-full" />
                  <div className="h-3 bg-gray-100 rounded w-3/4" />
                </div>
              ))}
            </div>
          ) : filtered.length === 0 ? (
            <div className="bg-white rounded-2xl border border-gray-100 py-20 text-center text-gray-400 shadow-sm">
              <Package size={36} className="mx-auto mb-3 opacity-20" />
              <p className="text-sm font-semibold">No products yet</p>
              <p className="text-xs mt-1">Click "Add Product" to get started</p>
              <button onClick={openCreate}
                className="mt-4 inline-flex items-center gap-2 px-5 py-2.5 bg-orange-500 hover:bg-orange-600 text-white rounded-xl text-sm font-semibold transition">
                <Plus size={14} /> Add First Product
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {filtered.map((product) => (
                <div key={product.id} className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 hover:shadow-md transition-all duration-200 group">
                  <div className="flex items-start justify-between gap-2 mb-3">
                    <div className="flex-1 min-w-0">
                      <h3 className="text-sm font-bold text-gray-800 truncate">{product.name}</h3>
                      <span className={`inline-block text-[10px] px-2 py-0.5 rounded-full font-medium mt-1.5 ${CAT_COLOR[product.category] ?? "bg-gray-100 text-gray-600"}`}>
                        {product.category}
                      </span>
                    </div>
                    <div className="flex flex-col items-end gap-1 flex-shrink-0">
                      <span className={`text-[10px] px-2 py-0.5 rounded-full font-semibold ${product.status === "active" ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-500"}`}>
                        {product.status}
                      </span>
                      <span className={`text-[10px] px-2 py-0.5 rounded-full font-semibold ${product.in_stock ? "bg-emerald-100 text-emerald-700" : "bg-red-100 text-red-500"}`}>
                        {product.in_stock ? "In Stock" : "Out of Stock"}
                      </span>
                    </div>
                  </div>
                  {product.price && (
                    <p className="text-sm font-bold text-orange-500 mb-2">
                      ₦{product.price} <span className="text-xs text-gray-400 font-normal">{product.unit}</span>
                    </p>
                  )}
                  {product.description && (
                    <p className="text-xs text-gray-500 leading-relaxed line-clamp-2 mb-3">{product.description}</p>
                  )}
                  <div className="flex items-center justify-between pt-3 border-t border-gray-50">
                    <span className="text-[10px] text-gray-400">{timeAgo(product.created_at)}</span>
                    <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button onClick={() => openEdit(product)}
                        className="p-1.5 rounded-lg hover:bg-blue-50 text-gray-400 hover:text-blue-600 transition">
                        <Pencil size={13} />
                      </button>
                      <button onClick={() => handleDelete(product.id)} disabled={deleting === product.id}
                        className="p-1.5 rounded-lg hover:bg-red-50 text-gray-400 hover:text-red-500 transition disabled:opacity-50">
                        <Trash2 size={13} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>

      {/* ── MODAL ── */}
      {modal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="bg-white rounded-3xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between px-6 py-5 border-b border-gray-100">
              <div>
                <h2 className="text-base font-bold text-gray-900">{editing ? "Edit Product" : "Add New Product"}</h2>
                <p className="text-xs text-gray-400 mt-0.5">{editing ? "Update product details" : "Fill in the product information"}</p>
              </div>
              <button onClick={() => setModal(false)} className="p-2 rounded-xl hover:bg-gray-100 text-gray-400 transition">
                <X size={16} />
              </button>
            </div>

            <div className="px-6 py-5 space-y-4">
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1.5">Product Name *</label>
                <input value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                  placeholder="e.g. Crude Palm Oil"
                  className="w-full px-4 py-3 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 transition" />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1.5">Category *</label>
                <select value={form.category} onChange={e => setForm(f => ({ ...f, category: e.target.value }))}
                  className="w-full px-4 py-3 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 transition bg-white">
                  {CATEGORIES.map(c => <option key={c}>{c}</option>)}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1.5">Price (₦)</label>
                  <input value={form.price} onChange={e => setForm(f => ({ ...f, price: e.target.value }))}
                    placeholder="e.g. 1500"
                    className="w-full px-4 py-3 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 transition" />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1.5">Unit</label>
                  <select value={form.unit} onChange={e => setForm(f => ({ ...f, unit: e.target.value }))}
                    className="w-full px-4 py-3 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 transition bg-white">
                    {["per litre", "per kg", "per tonne", "per bag", "per unit"].map(u => <option key={u}>{u}</option>)}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1.5">Status</label>
                  <select value={form.status}
                    onChange={e => setForm(f => ({ ...f, status: e.target.value as ProductStatus }))}
                    className="w-full px-4 py-3 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 transition bg-white">
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1.5">Stock</label>
                  <button onClick={() => setForm(f => ({ ...f, in_stock: !f.in_stock }))}
                    className={`w-full px-4 py-3 text-sm rounded-xl border font-semibold flex items-center justify-center gap-2 transition ${
                      form.in_stock ? "bg-emerald-50 border-emerald-200 text-emerald-700" : "bg-red-50 border-red-200 text-red-500"
                    }`}>
                    {form.in_stock ? <><ToggleRight size={16} /> In Stock</> : <><ToggleLeft size={16} /> Out of Stock</>}
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1.5">Description</label>
                <textarea value={form.description} onChange={e => setForm(f => ({ ...f, description: e.target.value }))}
                  placeholder="Describe the product…" rows={3}
                  className="w-full px-4 py-3 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 transition resize-none" />
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 px-6 py-4 border-t border-gray-100">
              <button onClick={() => setModal(false)} className="px-5 py-2.5 text-sm text-gray-500 hover:text-gray-800 font-medium transition">
                Cancel
              </button>
              <button onClick={handleSave} disabled={saving}
                className="flex items-center gap-2 px-6 py-2.5 bg-orange-500 hover:bg-orange-600 disabled:opacity-60 text-white rounded-xl text-sm font-semibold transition shadow-sm">
                <Save size={14} />
                {saving ? "Saving…" : editing ? "Update Product" : "Add Product"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── TOAST ── */}
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