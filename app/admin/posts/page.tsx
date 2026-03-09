'use client'

// app/admin/posts/page.tsx
import { useState, useEffect, useRef } from "react"
import { useRouter } from "next/navigation"
import { supabase } from "@/lib/supabase"
import Link from "next/link"
import {
  FileText, Plus, Pencil, Trash2, X, Save, Leaf,
  ChevronRight, LayoutDashboard, Mail, Users, Package,
  Settings, LogOut, Search, CheckCircle, Clock, Shield,
  ImagePlus, Upload, Loader2,
} from "lucide-react"

type PostStatus = "published" | "draft"

interface Post {
  id:         string
  title:      string
  category:   string
  content:    string
  excerpt:    string
  status:     PostStatus
  image_url:  string
  created_at: string
  updated_at: string
}

interface FormState {
  title:     string
  category:  string
  content:   string
  excerpt:   string
  status:    PostStatus
  image_url: string
}

const CATEGORIES = ["Farming", "Production", "Refining", "News", "Community"]

const NAV = [
  { label: "Dashboard",   icon: LayoutDashboard, href: "/admin/dashboard"             },
  { label: "Blog Posts",  icon: FileText,        href: "/admin/posts", active: true   },
  { label: "Contacts",    icon: Mail,            href: "/admin/contacts"              },
  { label: "Subscribers", icon: Users,           href: "/admin/dashboard"             },
  { label: "Products",    icon: Package,         href: "/admin/products"              },
  { label: "Settings",    icon: Settings,        href: "/admin/dashboard"             },
]

const CAT_COLOR: Record<string, string> = {
  Farming:    "bg-green-100 text-green-700",
  Production: "bg-orange-100 text-orange-700",
  Refining:   "bg-blue-100 text-blue-700",
  News:       "bg-purple-100 text-purple-700",
  Community:  "bg-pink-100 text-pink-700",
}

const EMPTY: FormState = {
  title: "", category: "Farming", content: "", excerpt: "", status: "draft", image_url: "",
}

function timeAgo(iso: string) {
  const h = Math.floor((Date.now() - new Date(iso).getTime()) / 3_600_000)
  if (h < 1)  return "Just now"
  if (h < 24) return `${h}h ago`
  return `${Math.floor(h / 24)}d ago`
}

export default function PostsPage() {
  const router = useRouter()
  const fileRef = useRef<HTMLInputElement>(null)

  const [posts,       setPosts]       = useState<Post[]>([])
  const [loading,     setLoading]     = useState(true)
  const [search,      setSearch]      = useState("")
  const [modal,       setModal]       = useState(false)
  const [editing,     setEditing]     = useState<Post | null>(null)
  const [form,        setForm]        = useState<FormState>({ ...EMPTY })
  const [saving,      setSaving]      = useState(false)
  const [deleting,    setDeleting]    = useState<string | null>(null)
  const [toast,       setToast]       = useState<{ msg: string; type: "success" | "error" } | null>(null)
  const [user,        setUser]        = useState<any>(null)
  const [signingOut,  setSigningOut]  = useState(false)
  const [uploading,   setUploading]   = useState(false)
  const [imagePreview,setImagePreview]= useState<string>("")

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (!session) { router.push("/admin/login"); return }
      setUser(session.user)
      fetchPosts()
    })
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === "SIGNED_OUT" || !session) router.push("/admin/login")
    })
    return () => subscription.unsubscribe()
  }, [])

  const fetchPosts = async () => {
    try {
      setLoading(true)
      const res  = await fetch("/api/admin/posts")
      const data = await res.json()
      setPosts(Array.isArray(data) ? data : [])
    } catch {
      showToast("Failed to load posts", "error")
    } finally {
      setLoading(false)
    }
  }

  const showToast = (msg: string, type: "success" | "error") => {
    setToast({ msg, type })
    setTimeout(() => setToast(null), 3500)
  }

  const openCreate = () => {
    setEditing(null)
    setForm({ ...EMPTY })
    setImagePreview("")
    setModal(true)
  }

  const openEdit = (post: Post) => {
    setEditing(post)
    setForm({
      title:     post.title,
      category:  post.category,
      content:   post.content  ?? "",
      excerpt:   post.excerpt  ?? "",
      status:    post.status   as PostStatus,
      image_url: post.image_url ?? "",
    })
    setImagePreview(post.image_url ?? "")
    setModal(true)
  }

  // ── Image upload to Supabase Storage ─────────────────────
  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    // Validate file type and size
    if (!file.type.startsWith("image/")) {
      showToast("Please select an image file", "error"); return
    }
    if (file.size > 5 * 1024 * 1024) {
      showToast("Image must be under 5MB", "error"); return
    }

    setUploading(true)
    try {
      const ext      = file.name.split(".").pop()
      const filename = `posts/${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`

      const { data, error } = await supabase.storage
        .from("emgo-media")
        .upload(filename, file, { cacheControl: "3600", upsert: false })

      if (error) throw new Error(error.message)

      const { data: { publicUrl } } = supabase.storage
        .from("emgo-media")
        .getPublicUrl(filename)

      setForm(f => ({ ...f, image_url: publicUrl }))
      setImagePreview(publicUrl)
      showToast("Image uploaded!", "success")
    } catch (err: any) {
      showToast("Upload failed: " + err.message, "error")
    } finally {
      setUploading(false)
    }
  }

  const removeImage = () => {
    setForm(f => ({ ...f, image_url: "" }))
    setImagePreview("")
    if (fileRef.current) fileRef.current.value = ""
  }

  const handleSave = async () => {
    if (!form.title.trim()) { showToast("Title is required", "error"); return }
    setSaving(true)
    try {
      const url    = editing ? `/api/admin/posts/${editing.id}` : "/api/admin/posts"
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

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this post?")) return
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

  const handleSignOut = async () => {
    setSigningOut(true)
    await supabase.auth.signOut()
    router.push("/admin/login")
  }

  const filtered = posts.filter(p =>
    p.title.toLowerCase().includes(search.toLowerCase()) ||
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
            <h1 className="text-base sm:text-lg font-bold text-gray-900">Blog Posts</h1>
            <p className="text-gray-400 text-xs">{posts.length} total posts</p>
          </div>
          <div className="flex items-center gap-2 sm:gap-3">
            <div className="hidden sm:flex items-center gap-2 bg-gray-50 border border-gray-200 rounded-xl px-3 py-2 w-48">
              <Search size={13} className="text-gray-400" />
              <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search posts…"
                className="bg-transparent text-xs text-gray-700 outline-none w-full placeholder-gray-400" />
            </div>
            <button onClick={openCreate}
              className="flex items-center gap-2 px-4 py-2.5 bg-orange-500 hover:bg-orange-600 text-white rounded-xl text-sm font-semibold transition shadow-sm shadow-orange-200">
              <Plus size={15} /> New Post
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
              { label: "Total",     value: posts.length,                                       color: "bg-green-800"  },
              { label: "Published", value: posts.filter(p => p.status === "published").length, color: "bg-orange-500" },
              { label: "Drafts",    value: posts.filter(p => p.status === "draft").length,     color: "bg-gray-500"   },
            ].map(({ label, value, color }) => (
              <div key={label} className={`${color} rounded-2xl p-4 sm:p-5 text-white text-center shadow-lg`}>
                <p className="text-2xl sm:text-3xl font-bold">{value}</p>
                <p className="text-white/70 text-[10px] uppercase tracking-widest mt-1">{label}</p>
              </div>
            ))}
          </div>

          {/* Posts list */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-50">
              <h2 className="text-sm font-bold text-gray-800">All Posts</h2>
            </div>

            {loading ? (
              <div className="p-8 space-y-4">
                {[1,2,3].map(i => (
                  <div key={i} className="flex gap-4 animate-pulse">
                    <div className="w-12 h-12 bg-gray-100 rounded-xl flex-shrink-0" />
                    <div className="flex-1 space-y-2 pt-1">
                      <div className="h-3 bg-gray-100 rounded w-1/2" />
                      <div className="h-2.5 bg-gray-100 rounded w-1/3" />
                    </div>
                  </div>
                ))}
              </div>
            ) : filtered.length === 0 ? (
              <div className="py-16 text-center text-gray-400">
                <FileText size={32} className="mx-auto mb-3 opacity-30" />
                <p className="text-sm font-medium">No posts yet</p>
                <p className="text-xs mt-1">Click "New Post" to create your first post</p>
                <button onClick={openCreate}
                  className="mt-4 inline-flex items-center gap-2 px-5 py-2.5 bg-orange-500 hover:bg-orange-600 text-white rounded-xl text-sm font-semibold transition">
                  <Plus size={14} /> Create First Post
                </button>
              </div>
            ) : (
              <div className="divide-y divide-gray-50">
                {filtered.map((post) => (
                  <div key={post.id} className="px-6 py-4 hover:bg-gray-50/50 transition-colors flex items-center gap-4 group">

                    {/* Thumbnail */}
                    <div className="w-12 h-12 rounded-xl overflow-hidden flex-shrink-0 bg-gray-100">
                      {post.image_url
                        ? <img src={post.image_url} alt={post.title} className="w-full h-full object-cover" />
                        : <div className="w-full h-full flex items-center justify-center"><FileText size={16} className="text-gray-300" /></div>
                      }
                    </div>

                    {/* Status dot */}
                    <div className={`w-2 h-2 rounded-full flex-shrink-0 ${post.status === "published" ? "bg-green-400" : "bg-gray-300"}`} />

                    {/* Title + meta */}
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold text-gray-800 truncate">{post.title}</p>
                      <div className="flex items-center gap-2 mt-1 flex-wrap">
                        <span className={`text-[10px] px-2 py-0.5 rounded-full font-medium ${CAT_COLOR[post.category] ?? "bg-gray-100 text-gray-600"}`}>
                          {post.category}
                        </span>
                        <span className="text-[10px] text-gray-400">{timeAgo(post.created_at)}</span>
                        {post.status === "published"
                          ? <span className="text-[10px] text-green-600 flex items-center gap-0.5"><CheckCircle size={10} /> Published</span>
                          : <span className="text-[10px] text-gray-400 flex items-center gap-0.5"><Clock size={10} /> Draft</span>
                        }
                      </div>
                    </div>

                    {post.excerpt && (
                      <p className="hidden lg:block text-xs text-gray-400 truncate max-w-xs">{post.excerpt}</p>
                    )}

                    <div className="flex items-center gap-1.5 flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button onClick={() => openEdit(post)}
                        className="p-2 rounded-lg hover:bg-blue-50 text-gray-400 hover:text-blue-600 transition">
                        <Pencil size={14} />
                      </button>
                      <button onClick={() => handleDelete(post.id)} disabled={deleting === post.id}
                        className="p-2 rounded-lg hover:bg-red-50 text-gray-400 hover:text-red-500 transition disabled:opacity-50">
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

      {/* ── MODAL ── */}
      {modal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="bg-white rounded-3xl shadow-2xl w-full max-w-2xl max-h-[92vh] overflow-y-auto">

            <div className="flex items-center justify-between px-6 py-5 border-b border-gray-100 sticky top-0 bg-white z-10 rounded-t-3xl">
              <div>
                <h2 className="text-base font-bold text-gray-900">{editing ? "Edit Post" : "Create New Post"}</h2>
                <p className="text-xs text-gray-400 mt-0.5">{editing ? "Update post details" : "Fill in the post information"}</p>
              </div>
              <button onClick={() => setModal(false)} className="p-2 rounded-xl hover:bg-gray-100 text-gray-400 transition">
                <X size={16} />
              </button>
            </div>

            <div className="px-6 py-5 space-y-5">

              {/* ── IMAGE UPLOAD ── */}
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-2">
                  Featured Image
                </label>

                {imagePreview ? (
                  // Preview
                  <div className="relative rounded-2xl overflow-hidden border border-gray-200 bg-gray-50">
                    <img src={imagePreview} alt="Preview" className="w-full h-48 object-cover" />
                    <div className="absolute inset-0 bg-black/30 opacity-0 hover:opacity-100 transition-all flex items-center justify-center gap-3">
                      <button
                        onClick={() => fileRef.current?.click()}
                        disabled={uploading}
                        className="flex items-center gap-1.5 px-3 py-2 bg-white text-gray-700 rounded-xl text-xs font-semibold hover:bg-gray-50 transition"
                      >
                        <Upload size={13} /> Replace
                      </button>
                      <button
                        onClick={removeImage}
                        className="flex items-center gap-1.5 px-3 py-2 bg-red-500 text-white rounded-xl text-xs font-semibold hover:bg-red-600 transition"
                      >
                        <Trash2 size={13} /> Remove
                      </button>
                    </div>
                    {uploading && (
                      <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                        <div className="flex items-center gap-2 text-white text-sm font-semibold">
                          <Loader2 size={18} className="animate-spin" /> Uploading…
                        </div>
                      </div>
                    )}
                  </div>
                ) : (
                  // Upload zone
                  <button
                    onClick={() => fileRef.current?.click()}
                    disabled={uploading}
                    className="w-full border-2 border-dashed border-gray-200 hover:border-orange-400 rounded-2xl p-8 flex flex-col items-center justify-center gap-3 transition-all duration-200 group bg-gray-50 hover:bg-orange-50/30 disabled:opacity-60"
                  >
                    {uploading ? (
                      <><Loader2 size={28} className="text-orange-400 animate-spin" />
                      <p className="text-sm text-gray-500 font-medium">Uploading image…</p></>
                    ) : (
                      <><div className="w-12 h-12 rounded-2xl bg-orange-100 group-hover:bg-orange-200 flex items-center justify-center transition-colors">
                        <ImagePlus size={22} className="text-orange-500" />
                      </div>
                      <div className="text-center">
                        <p className="text-sm font-semibold text-gray-700">Click to upload image</p>
                        <p className="text-xs text-gray-400 mt-0.5">PNG, JPG, WEBP up to 5MB</p>
                      </div></>
                    )}
                  </button>
                )}

                <input
                  ref={fileRef}
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleImageUpload}
                />

                {/* OR paste URL */}
                <div className="mt-2 flex items-center gap-2">
                  <div className="flex-1 h-px bg-gray-100" />
                  <span className="text-[10px] text-gray-400 font-medium">or paste URL</span>
                  <div className="flex-1 h-px bg-gray-100" />
                </div>
                <input
                  value={form.image_url}
                  onChange={e => { setForm(f => ({ ...f, image_url: e.target.value })); setImagePreview(e.target.value) }}
                  placeholder="https://example.com/image.jpg"
                  className="mt-2 w-full px-4 py-2.5 text-xs border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 transition text-gray-600"
                />
              </div>

              {/* Title */}
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1.5">Title *</label>
                <input value={form.title} onChange={e => setForm(f => ({ ...f, title: e.target.value }))}
                  placeholder="Enter post title…"
                  className="w-full px-4 py-3 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 transition" />
              </div>

              {/* Category + Status */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1.5">Category *</label>
                  <select value={form.category} onChange={e => setForm(f => ({ ...f, category: e.target.value }))}
                    className="w-full px-4 py-3 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 transition bg-white">
                    {CATEGORIES.map(c => <option key={c}>{c}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1.5">Status</label>
                  <select value={form.status} onChange={e => setForm(f => ({ ...f, status: e.target.value as PostStatus }))}
                    className="w-full px-4 py-3 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 transition bg-white">
                    <option value="draft">Draft</option>
                    <option value="published">Published</option>
                  </select>
                </div>
              </div>

              {/* Excerpt */}
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1.5">Excerpt</label>
                <textarea value={form.excerpt} onChange={e => setForm(f => ({ ...f, excerpt: e.target.value }))}
                  placeholder="Short summary of the post…" rows={2}
                  className="w-full px-4 py-3 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 transition resize-none" />
              </div>

              {/* Content */}
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1.5">Content</label>
                <textarea value={form.content} onChange={e => setForm(f => ({ ...f, content: e.target.value }))}
                  placeholder="Write your post content here…" rows={8}
                  className="w-full px-4 py-3 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 transition resize-none" />
              </div>

            </div>

            <div className="flex items-center justify-end gap-3 px-6 py-4 border-t border-gray-100 sticky bottom-0 bg-white rounded-b-3xl">
              <button onClick={() => setModal(false)} className="px-5 py-2.5 text-sm text-gray-600 hover:text-gray-800 font-medium transition">
                Cancel
              </button>
              <button onClick={handleSave} disabled={saving || uploading}
                className="flex items-center gap-2 px-6 py-2.5 bg-orange-500 hover:bg-orange-600 disabled:opacity-60 text-white rounded-xl text-sm font-semibold transition shadow-sm">
                {saving ? <Loader2 size={14} className="animate-spin" /> : <Save size={14} />}
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