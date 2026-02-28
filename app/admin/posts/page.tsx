'use client'

// app/admin/posts/page.tsx
// Full CRUD posts manager — Create, Edit, Delete

import { useState, useEffect } from "react"
import {
  FileText, Plus, Pencil, Trash2, X, Save,
  Leaf, ChevronRight, LayoutDashboard, Mail,
  Users, Package, Settings, LogOut, Search,
  Eye, CheckCircle, Clock,
} from "lucide-react"
import Link from "next/link"

// ── Types ─────────────────────────────────────────────────────
interface Post {
  _id:       string
  title:     string
  category:  string
  content:   string
  excerpt:   string
  status:    "published" | "draft"
  createdAt: string
  updatedAt: string
}

// ── Config ────────────────────────────────────────────────────
const CATEGORIES = ["Farming", "Production", "Refining", "News", "Community"]

const NAV = [
  { label: "Dashboard", icon: LayoutDashboard, href: "/admin/dashboard" },
  { label: "Blog Posts", icon: FileText,        href: "/admin/posts",     active: true },
  { label: "Contacts",   icon: Mail,            href: "/admin/contacts"  },
  { label: "Subscribers",icon: Users,           href: "/admin/dashboard" },
  { label: "Products",   icon: Package,         href: "/admin/dashboard" },
  { label: "Settings",   icon: Settings,        href: "/admin/dashboard" },
]

const CAT_COLOR: Record<string, string> = {
  Farming:    "bg-green-100 text-green-700",
  Production: "bg-orange-100 text-orange-700",
  Refining:   "bg-blue-100 text-blue-700",
  News:       "bg-purple-100 text-purple-700",
  Community:  "bg-pink-100 text-pink-700",
}

const EMPTY: Omit<Post, "_id" | "createdAt" | "updatedAt"> = {
  title: "", category: "Farming", content: "", excerpt: "", status: "draft",
}

// ── Component ─────────────────────────────────────────────────
export default function PostsPage() {
  const [posts,   setPosts]   = useState<Post[]>([])
  const [loading, setLoading] = useState(true)
  const [search,  setSearch]  = useState("")
  const [modal,   setModal]   = useState(false)
  const [editing, setEditing] = useState<Post | null>(null)
  const [form,    setForm]    = useState({ ...EMPTY })
  const [saving,  setSaving]  = useState(false)
  const [deleting,setDeleting]= useState<string | null>(null)
  const [toast,   setToast]   = useState<{ msg: string; type: "success" | "error" } | null>(null)

  // ── Fetch posts ───────────────────────────────────────────
  const fetchPosts = async () => {
    try {
      setLoading(true)
      const res = await fetch("/api/admin/posts")
      const data = await res.json()
      setPosts(Array.isArray(data) ? data : [])
    } catch {
      showToast("Failed to load posts", "error")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { fetchPosts() }, [])

  // ── Toast helper ─────────────────────────────────────────
  const showToast = (msg: string, type: "success" | "error") => {
    setToast({ msg, type })
    setTimeout(() => setToast(null), 3000)
  }

  // ── Open modal ───────────────────────────────────────────
  const openCreate = () => {
    setEditing(null)
    setForm({ ...EMPTY })
    setModal(true)
  }

  const openEdit = (post: Post) => {
    setEditing(post)
    setForm({
      title:    post.title,
      category: post.category,
      content:  post.content,
      excerpt:  post.excerpt,
      status:   post.status,
    })
    setModal(true)
  }

  // ── Save (create or update) ──────────────────────────────
  const handleSave = async () => {
    if (!form.title.trim()) { showToast("Title is required", "error"); return }
    setSaving(true)
    try {
      const url    = editing ? `/api/admin/posts/${editing._id}` : "/api/admin/posts"
      const method = editing ? "PUT" : "POST"
      const res    = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      })
      if (!res.ok) throw new Error()
      showToast(editing ? "Post updated!" : "Post created!", "success")
      setModal(false)
      fetchPosts()
    } catch {
      showToast("Failed to save post", "error")
    } finally {
      setSaving(false)
    }
  }

  // ── Delete ───────────────────────────────────────────────
  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this post?")) return
    setDeleting(id)
    try {
      const res = await fetch(`/api/admin/posts/${id}`, { method: "DELETE" })
      if (!res.ok) throw new Error()
      showToast("Post deleted!", "success")
      fetchPosts()
    } catch {
      showToast("Failed to delete post", "error")
    } finally {
      setDeleting(null)
    }
  }

  // ── Filter ───────────────────────────────────────────────
  const filtered = posts.filter(p =>
    p.title.toLowerCase().includes(search.toLowerCase()) ||
    p.category.toLowerCase().includes(search.toLowerCase())
  )

  function timeAgo(iso: string) {
    const h = Math.floor((Date.now() - new Date(iso).getTime()) / 3_600_000)
    if (h < 1)  return "Just now"
    if (h < 24) return `${h}h ago`
    return `${Math.floor(h / 24)}d ago`
  }

  // ── Render ───────────────────────────────────────────────
  return (
    <div className="flex h-screen bg-gray-50 font-sans overflow-hidden">

      {/* ── SIDEBAR ── */}
      <aside className="hidden md:flex flex-col w-60 lg:w-64 bg-green-900 text-white flex-shrink-0 shadow-2xl">
        <div className="px-6 py-6 border-b border-green-800/60">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-orange-500 flex items-center justify-center shadow-lg flex-shrink-0">
              <Leaf size={18} />
            </div>
            <div>
              <p className="font-bold text-sm">EMGO Farms</p>
              <p className="text-green-400 text-[10px] tracking-wider uppercase">Admin Panel</p>
            </div>
          </div>
        </div>

        <nav className="flex-1 px-3 py-5 space-y-0.5 overflow-y-auto">
          {NAV.map(({ label, icon: Icon, href, active }) => (
            <Link
              key={label}
              href={href}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 ${
                active
                  ? "bg-orange-500 text-white shadow-lg"
                  : "text-green-200 hover:bg-green-800/60 hover:text-white"
              }`}
            >
              <Icon size={16} className="flex-shrink-0" />
              {label}
              {active && <ChevronRight size={14} className="ml-auto opacity-70" />}
            </Link>
          ))}
        </nav>

        <div className="px-4 py-4 border-t border-green-800/60">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-8 h-8 rounded-full bg-orange-500 flex items-center justify-center text-xs font-bold">EO</div>
            <div className="min-w-0">
              <p className="text-xs font-semibold truncate">Emmanuel Obasi</p>
              <p className="text-green-400 text-[10px]">CEO, EMGO Farms</p>
            </div>
          </div>
          <Link href="/admin/dashboard" className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-green-300 hover:text-white hover:bg-green-800/60 text-xs transition">
            <LogOut size={13} /> Back to Dashboard
          </Link>
        </div>
      </aside>

      {/* ── MAIN ── */}
      <main className="flex-1 flex flex-col overflow-hidden">

        {/* Top bar */}
        <header className="bg-white border-b border-gray-100 px-5 sm:px-8 py-4 flex items-center justify-between gap-4 flex-shrink-0 shadow-sm">
          <div>
            <h1 className="text-base sm:text-lg font-bold text-gray-900">Blog Posts</h1>
            <p className="text-gray-400 text-xs">{posts.length} total posts</p>
          </div>
          <div className="flex items-center gap-2 sm:gap-3">
            <div className="hidden sm:flex items-center gap-2 bg-gray-50 border border-gray-200 rounded-xl px-3 py-2 w-48">
              <Search size={13} className="text-gray-400" />
              <input
                value={search}
                onChange={e => setSearch(e.target.value)}
                placeholder="Search posts…"
                className="bg-transparent text-xs text-gray-700 outline-none w-full placeholder-gray-400"
              />
            </div>
            <button
              onClick={openCreate}
              className="flex items-center gap-2 px-4 py-2.5 bg-orange-500 hover:bg-orange-600 text-white rounded-xl text-sm font-semibold transition shadow-sm"
            >
              <Plus size={15} /> New Post
            </button>
          </div>
        </header>

        {/* Content */}
        <div className="flex-1 overflow-y-auto px-5 sm:px-8 py-6">

          {/* Stats row */}
          <div className="grid grid-cols-3 gap-3 sm:gap-4 mb-6">
            {[
              { label: "Total",     value: posts.length,                                  color: "bg-green-800"  },
              { label: "Published", value: posts.filter(p => p.status === "published").length, color: "bg-orange-500" },
              { label: "Drafts",    value: posts.filter(p => p.status === "draft").length,     color: "bg-gray-500"   },
            ].map(({ label, value, color }) => (
              <div key={label} className={`${color} rounded-2xl p-4 text-white text-center shadow-lg`}>
                <p className="text-2xl sm:text-3xl font-bold">{value}</p>
                <p className="text-white/70 text-xs uppercase tracking-wider mt-1">{label}</p>
              </div>
            ))}
          </div>

          {/* Posts table */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="px-5 py-4 border-b border-gray-50">
              <h2 className="text-sm font-bold text-gray-800">All Posts</h2>
            </div>

            {loading ? (
              <div className="p-8 space-y-4">
                {[1,2,3].map(i => (
                  <div key={i} className="flex gap-4 animate-pulse">
                    <div className="h-4 bg-gray-100 rounded w-1/2" />
                    <div className="h-4 bg-gray-100 rounded w-1/6" />
                    <div className="h-4 bg-gray-100 rounded w-1/6" />
                  </div>
                ))}
              </div>
            ) : filtered.length === 0 ? (
              <div className="py-16 text-center text-gray-400">
                <FileText size={32} className="mx-auto mb-3 opacity-30" />
                <p className="text-sm font-medium">No posts yet</p>
                <p className="text-xs mt-1">Click "New Post" to create your first post</p>
              </div>
            ) : (
              <div className="divide-y divide-gray-50">
                {filtered.map((post) => (
                  <div key={post._id} className="px-5 py-4 hover:bg-gray-50/50 transition-colors flex items-center gap-4">

                    {/* Status dot */}
                    <div className={`w-2 h-2 rounded-full flex-shrink-0 ${post.status === "published" ? "bg-green-400" : "bg-gray-300"}`} />

                    {/* Title + meta */}
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold text-gray-800 truncate">{post.title}</p>
                      <div className="flex items-center gap-2 mt-1">
                        <span className={`text-[10px] px-2 py-0.5 rounded-full font-medium ${CAT_COLOR[post.category] ?? "bg-gray-100 text-gray-600"}`}>
                          {post.category}
                        </span>
                        <span className="text-[10px] text-gray-400">{timeAgo(post.createdAt)}</span>
                        {post.status === "published"
                          ? <span className="text-[10px] text-green-600 flex items-center gap-0.5"><CheckCircle size={10} /> Published</span>
                          : <span className="text-[10px] text-gray-400 flex items-center gap-0.5"><Clock size={10} /> Draft</span>
                        }
                      </div>
                    </div>

                    {/* Excerpt preview */}
                    {post.excerpt && (
                      <p className="hidden lg:block text-xs text-gray-400 truncate max-w-xs">{post.excerpt}</p>
                    )}

                    {/* Actions */}
                    <div className="flex items-center gap-1.5 flex-shrink-0">
                      <button
                        onClick={() => openEdit(post)}
                        className="p-2 rounded-lg hover:bg-blue-50 text-gray-400 hover:text-blue-600 transition"
                        title="Edit"
                      >
                        <Pencil size={14} />
                      </button>
                      <button
                        onClick={() => handleDelete(post._id)}
                        disabled={deleting === post._id}
                        className="p-2 rounded-lg hover:bg-red-50 text-gray-400 hover:text-red-500 transition disabled:opacity-50"
                        title="Delete"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>

                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </main>

      {/* ── CREATE / EDIT MODAL ── */}
      {modal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="bg-white rounded-3xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">

            {/* Modal header */}
            <div className="flex items-center justify-between px-6 py-5 border-b border-gray-100">
              <h2 className="text-base font-bold text-gray-900">
                {editing ? "Edit Post" : "Create New Post"}
              </h2>
              <button onClick={() => setModal(false)} className="p-2 rounded-xl hover:bg-gray-100 text-gray-400 transition">
                <X size={16} />
              </button>
            </div>

            {/* Modal body */}
            <div className="px-6 py-5 space-y-4">

              {/* Title */}
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1.5">Title *</label>
                <input
                  value={form.title}
                  onChange={e => setForm(f => ({ ...f, title: e.target.value }))}
                  placeholder="Enter post title…"
                  className="w-full px-4 py-3 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition"
                />
              </div>

              {/* Category + Status row */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1.5">Category *</label>
                  <select
                    value={form.category}
                    onChange={e => setForm(f => ({ ...f, category: e.target.value }))}
                    className="w-full px-4 py-3 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 transition bg-white"
                  >
                    {CATEGORIES.map(c => <option key={c}>{c}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1.5">Status</label>
                  <select
                    value={form.status}
                    onChange={e => setForm(f => ({ ...f, status: e.target.value as "draft" | "published" }))}
                    className="w-full px-4 py-3 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 transition bg-white"
                  >
                    <option value="draft">Draft</option>
                    <option value="published">Published</option>
                  </select>
                </div>
              </div>

              {/* Excerpt */}
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1.5">Excerpt</label>
                <textarea
                  value={form.excerpt}
                  onChange={e => setForm(f => ({ ...f, excerpt: e.target.value }))}
                  placeholder="Short summary of the post…"
                  rows={2}
                  className="w-full px-4 py-3 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 transition resize-none"
                />
              </div>

              {/* Content */}
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1.5">Content</label>
                <textarea
                  value={form.content}
                  onChange={e => setForm(f => ({ ...f, content: e.target.value }))}
                  placeholder="Write your post content here…"
                  rows={8}
                  className="w-full px-4 py-3 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 transition resize-none"
                />
              </div>

            </div>

            {/* Modal footer */}
            <div className="flex items-center justify-end gap-3 px-6 py-4 border-t border-gray-100">
              <button
                onClick={() => setModal(false)}
                className="px-5 py-2.5 text-sm text-gray-600 hover:text-gray-800 font-medium transition"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                disabled={saving}
                className="flex items-center gap-2 px-6 py-2.5 bg-orange-500 hover:bg-orange-600 disabled:opacity-60 text-white rounded-xl text-sm font-semibold transition shadow-sm"
              >
                <Save size={14} />
                {saving ? "Saving…" : editing ? "Update Post" : "Create Post"}
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