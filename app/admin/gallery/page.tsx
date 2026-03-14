'use client'

// app/admin/gallery/page.tsx
import { useState, useEffect, useRef } from "react"
import { useRouter } from "next/navigation"
import { supabase } from "@/lib/supabase"
import Link from "next/link"
import {
  Image as ImageIcon, Plus, Trash2, X, Leaf, ChevronRight,
  LayoutDashboard, Mail, Users, FileText, Package, Settings,
  LogOut, Shield, ImagePlus, Loader2, CheckCircle, Briefcase,
  Play, Film,
} from "lucide-react"

interface GalleryItem {
  id:         string
  image_url:  string
  caption:    string
  category:   string
  media_type: string
  created_at: string
}

const CATEGORIES = ["Farm", "Production", "Products", "Team", "Events", "Other"]

const CAT_COLOR: Record<string, string> = {
  Farm:       "bg-green-100 text-green-700",
  Production: "bg-orange-100 text-orange-700",
  Products:   "bg-blue-100 text-blue-700",
  Team:       "bg-purple-100 text-purple-700",
  Events:     "bg-pink-100 text-pink-700",
  Other:      "bg-gray-100 text-gray-600",
}

const NAV = [
  { label: "Dashboard",   icon: LayoutDashboard, href: "/admin/dashboard"             },
  { label: "Blog Posts",  icon: FileText,        href: "/admin/posts"                 },
  { label: "Contacts",    icon: Mail,            href: "/admin/contacts"              },
  { label: "Subscribers", icon: Users,           href: "/admin/subscribers"           },
  { label: "Products",    icon: Package,         href: "/admin/products"              },
  { label: "Services",    icon: Briefcase,       href: "/admin/services"              },
  { label: "Gallery",     icon: ImageIcon,       href: "/admin/gallery", active: true },
  { label: "Settings",    icon: Settings,        href: "/admin/settings"              },
]

export default function AdminGalleryPage() {
  const router  = useRouter()
  const fileRef = useRef<HTMLInputElement>(null)

  const [items,      setItems]      = useState<GalleryItem[]>([])
  const [loading,    setLoading]    = useState(true)
  const [uploading,  setUploading]  = useState(false)
  const [progress,   setProgress]   = useState(0)
  const [modal,      setModal]      = useState(false)
  const [caption,    setCaption]    = useState("")
  const [category,   setCategory]   = useState("Farm")
  const [preview,    setPreview]    = useState("")
  const [mediaType,  setMediaType]  = useState<"image"|"video">("image")
  const [file,       setFile]       = useState<File | null>(null)
  const [toast,      setToast]      = useState<{ msg: string; type: "success"|"error" }|null>(null)
  const [user,       setUser]       = useState<any>(null)
  const [signingOut, setSigningOut] = useState(false)
  const [deleting,   setDeleting]   = useState<string|null>(null)
  const [filterCat,  setFilterCat]  = useState("All")
  const [mediaFilter,setMediaFilter]= useState("All")

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (!session) { router.push("/admin/login"); return }
      setUser(session.user)
      fetchItems()
    })
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_, session) => {
      if (!session) router.push("/admin/login")
    })
    return () => subscription.unsubscribe()
  }, [])

  const showToast = (msg: string, type: "success"|"error") => {
    setToast({ msg, type }); setTimeout(() => setToast(null), 3500)
  }

  const getToken = async () => {
    const { data: { session } } = await supabase.auth.getSession()
    return session?.access_token ?? ""
  }

  // Fetch from gallery DB table
  const fetchItems = async () => {
    setLoading(true)
    try {
      const token = await getToken()
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_SUPABASE_URL}/rest/v1/gallery?select=*&order=created_at.desc`,
        {
          headers: {
            "apikey":        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
            "Authorization": `Bearer ${token}`,
          }
        }
      )
      const data = await res.json()
      setItems(Array.isArray(data) ? data : [])
    } catch {
      showToast("Failed to load gallery", "error")
    } finally {
      setLoading(false)
    }
  }

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0]
    if (!f) return

    const isVideo = f.type.startsWith("video/")
    const isImage = f.type.startsWith("image/")

    if (!isVideo && !isImage) { showToast("Select an image or video file", "error"); return }
    if (isImage && f.size > 10 * 1024 * 1024)  { showToast("Image must be under 10MB",  "error"); return }
    if (isVideo && f.size > 200 * 1024 * 1024) { showToast("Video must be under 200MB", "error"); return }

    setFile(f)
    setMediaType(isVideo ? "video" : "image")
    setPreview(URL.createObjectURL(f))
    setModal(true)
  }

  const handleUpload = async () => {
    if (!file) return
    setUploading(true)
    setProgress(10)

    try {
      let publicUrl = ""

      if (mediaType === "video") {
        // ── VIDEO: Upload directly to Cloudinary (bypasses Vercel 4.5MB limit) ──

        // Step 1: Get signature from our API
        const signRes  = await fetch("/api/admin/cloudinary-sign", {
          method:  "POST",
          headers: { "Content-Type": "application/json" },
          body:    JSON.stringify({ folder: "emgo-farms/gallery" }),
        })
        const signJson = await signRes.json()
        if (!signRes.ok) throw new Error(signJson.error ?? "Failed to get upload signature")
        setProgress(20)

        // Step 2: Upload directly from browser to Cloudinary
        const cloudForm = new FormData()
        cloudForm.append("file",       file)
        cloudForm.append("api_key",    signJson.apiKey)
        cloudForm.append("timestamp",  signJson.timestamp)
        cloudForm.append("signature",  signJson.signature)
        cloudForm.append("folder",     signJson.folder)

        const cloudRes = await fetch(
          `https://api.cloudinary.com/v1_1/${signJson.cloudName}/video/upload`,
          { method: "POST", body: cloudForm }
        )
        const cloudJson = await cloudRes.json()
        if (!cloudRes.ok) throw new Error(cloudJson.error?.message ?? "Cloudinary upload failed")
        setProgress(70)
        publicUrl = cloudJson.secure_url

      } else {
        // ── IMAGE: Upload via server API (images are small, under 4.5MB) ──
        const form = new FormData()
        form.append("file",   file)
        form.append("folder", "gallery/images")
        setProgress(30)
        const uploadRes  = await fetch("/api/admin/gallery", { method: "POST", body: form })
        const uploadJson = await uploadRes.json()
        if (!uploadRes.ok) throw new Error(uploadJson.error ?? "Upload failed")
        setProgress(70)
        publicUrl = uploadJson.url
      }

      // Save record to DB
      const res = await fetch("/api/admin/gallery", {
        method:  "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          image_url:  publicUrl,
          caption:    caption.trim() || "",
          category,
          media_type: mediaType,
        }),
      })
      if (!res.ok) throw new Error(await res.text())

      setProgress(100)
      showToast(`${mediaType === "video" ? "Video" : "Image"} uploaded!`, "success")
      closeModal()
      fetchItems()
    } catch (err: any) {
      showToast("Upload failed: " + err.message, "error")
    } finally {
      setUploading(false)
      setProgress(0)
    }
  }

  const handleDelete = async (item: GalleryItem) => {
    if (!confirm("Delete this item permanently?")) return
    setDeleting(item.id)
    try {
      const token = await getToken()

      // Delete DB record
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_SUPABASE_URL}/rest/v1/gallery?id=eq.${item.id}`,
        {
          method: "DELETE",
          headers: {
            "apikey":        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
            "Authorization": `Bearer ${token}`,
          }
        }
      )
      if (!res.ok) throw new Error("Delete failed")

      // Delete from Storage via direct REST
      const storagePath = item.image_url.split("/emgo-media/")[1]
      if (storagePath) {
        await fetch(
          `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/emgo-media/${storagePath}`,
          {
            method: "DELETE",
            headers: {
              "Authorization": `Bearer ${token}`,
              "apikey":        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
            }
          }
        )
      }

      setItems(prev => prev.filter(i => i.id !== item.id))
      showToast("Deleted!", "success")
    } catch (err: any) {
      showToast("Failed to delete: " + err.message, "error")
    } finally {
      setDeleting(null)
    }
  }

  const closeModal = () => {
    setModal(false); setFile(null); setPreview("")
    setCaption(""); setCategory("Farm")
    if (fileRef.current) fileRef.current.value = ""
  }

  const handleSignOut = async () => {
    setSigningOut(true); await supabase.auth.signOut(); router.push("/admin/login")
  }

  const filtered = items
    .filter(i => filterCat === "All" || i.category === filterCat)
    .filter(i => mediaFilter === "All"
      || (mediaFilter === "Videos" ? i.media_type === "video" : i.media_type !== "video"))

  const imageCount = items.filter(i => i.media_type !== "video").length
  const videoCount = items.filter(i => i.media_type === "video").length

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
            <h1 className="text-base sm:text-lg font-bold text-gray-900">Gallery</h1>
            <p className="text-gray-400 text-xs">{imageCount} images · {videoCount} videos</p>
          </div>
          <button onClick={() => fileRef.current?.click()}
            className="flex items-center gap-2 px-4 py-2.5 bg-orange-500 hover:bg-orange-600 text-white rounded-xl text-sm font-semibold transition shadow-sm">
            <Plus size={15} /> Upload Media
          </button>
          <input ref={fileRef} type="file" accept="image/*,video/*" className="hidden" onChange={handleFileSelect} />
        </header>

        <div className="flex-1 px-5 sm:px-8 py-8 space-y-6">

          {/* Stats */}
          <div className="grid grid-cols-3 gap-3 sm:gap-4">
            {[
              { label: "Total",  value: items.length,  color: "bg-green-800"  },
              { label: "Images", value: imageCount,     color: "bg-orange-500" },
              { label: "Videos", value: videoCount,     color: "bg-purple-600" },
            ].map(({ label, value, color }) => (
              <div key={label} className={`${color} rounded-2xl p-4 sm:p-5 text-white text-center shadow-lg`}>
                <p className="text-2xl sm:text-3xl font-bold">{value}</p>
                <p className="text-white/70 text-[10px] uppercase tracking-widest mt-1">{label}</p>
              </div>
            ))}
          </div>

          {/* Filters */}
          <div className="flex flex-wrap gap-2">
            {/* Media type */}
            {["All", "Images", "Videos"].map(type => (
              <button key={type} onClick={() => setMediaFilter(type)}
                className={`flex-shrink-0 px-4 py-2 rounded-xl text-xs font-semibold transition border ${
                  mediaFilter === type
                    ? type === "Videos" ? "bg-purple-600 text-white border-purple-600"
                      : "bg-green-800 text-white border-green-800"
                    : "bg-white border-gray-200 text-gray-600 hover:bg-gray-50"
                }`}>
                {type === "Videos" ? "🎬 " : type === "Images" ? "🖼 " : ""}{type}
              </button>
            ))}
            <span className="text-gray-300 self-center text-lg">|</span>
            {/* Category */}
            {["All", ...CATEGORIES].map(cat => (
              <button key={cat} onClick={() => setFilterCat(cat)}
                className={`flex-shrink-0 px-4 py-2 rounded-xl text-xs font-semibold transition border ${
                  filterCat === cat ? "bg-orange-500 text-white border-orange-500" : "bg-white border-gray-200 text-gray-600 hover:bg-gray-50"
                }`}>
                {cat}
              </button>
            ))}
          </div>

          {/* Grid */}
          {loading ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
              {[1,2,3,4,5,6].map(i => <div key={i} className="bg-white rounded-2xl h-48 animate-pulse" />)}
            </div>
          ) : filtered.length === 0 ? (
            <div className="py-20 text-center text-gray-400">
              <ImageIcon size={36} className="mx-auto mb-3 opacity-30" />
              <p className="text-sm font-medium">No media yet</p>
              <p className="text-xs mt-1 text-gray-300">Click "Upload Media" to add images or videos</p>
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
              {filtered.map(item => (
                <div key={item.id} className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 group hover:shadow-md transition-all">
                  <div className="relative h-44 bg-gray-100 overflow-hidden">
                    {item.media_type === "video" ? (
                      <>
                        <video src={item.image_url} className="w-full h-full object-cover" muted playsInline
                          onMouseOver={e => (e.target as HTMLVideoElement).play()}
                          onMouseOut={e => { const v = e.target as HTMLVideoElement; v.pause(); v.currentTime = 0 }} />
                        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                          <div className="w-10 h-10 bg-black/50 rounded-full flex items-center justify-center">
                            <Play size={18} className="text-white ml-1" />
                          </div>
                        </div>
                        <span className="absolute top-2 left-2 bg-purple-600 text-white text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1">
                          <Film size={9} /> Video
                        </span>
                      </>
                    ) : (
                      <img src={item.image_url} alt={item.caption}
                        onError={e => { (e.target as HTMLImageElement).style.display = "none" }}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                    )}
                    <button onClick={() => handleDelete(item)} disabled={deleting === item.id}
                      className="absolute top-2 right-2 p-1.5 rounded-lg bg-white/90 hover:bg-red-50 text-gray-500 hover:text-red-500 shadow-sm transition opacity-0 group-hover:opacity-100">
                      {deleting === item.id
                        ? <Loader2 size={13} className="animate-spin" />
                        : <Trash2 size={13} />}
                    </button>
                    <span className={`absolute bottom-2 left-2 text-[10px] px-2 py-0.5 rounded-full font-semibold ${CAT_COLOR[item.category] ?? "bg-gray-100 text-gray-600"}`}>
                      {item.category}
                    </span>
                  </div>
                  <div className="p-3">
                    <p className="text-xs font-medium text-gray-700 truncate">{item.caption || "No caption"}</p>
                    <p className="text-[10px] text-gray-400 mt-0.5">{new Date(item.created_at).toLocaleDateString()}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>

      {/* UPLOAD MODAL */}
      {modal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="bg-white rounded-3xl shadow-2xl w-full max-w-lg overflow-hidden">
            <div className="flex items-center justify-between px-6 py-5 border-b border-gray-100">
              <div>
                <h2 className="text-base font-bold text-gray-900">
                  Upload {mediaType === "video" ? "Video 🎬" : "Image 🖼"}
                </h2>
                <p className="text-xs text-gray-400 mt-0.5">
                  {mediaType === "video" ? "Max 200MB · MP4, MOV, WebM" : "Max 10MB · JPG, PNG, WebP"}
                </p>
              </div>
              <button onClick={closeModal} className="p-2 rounded-xl hover:bg-gray-100 text-gray-400 transition">
                <X size={16} />
              </button>
            </div>

            <div className="px-6 py-5 space-y-4">
              {/* Preview */}
              {preview && (
                <div className="rounded-2xl overflow-hidden border border-gray-200 bg-gray-50">
                  {mediaType === "video"
                    ? <video src={preview} controls className="w-full max-h-52 object-contain" />
                    : <img src={preview} alt="Preview" className="w-full max-h-52 object-cover" />
                  }
                </div>
              )}

              {/* File info */}
              {file && (
                <div className="flex items-center gap-3 bg-gray-50 rounded-xl px-4 py-3">
                  {mediaType === "video" ? <Film size={16} className="text-purple-500" /> : <ImageIcon size={16} className="text-orange-500" />}
                  <div className="min-w-0 flex-1">
                    <p className="text-xs font-semibold text-gray-700 truncate">{file.name}</p>
                    <p className="text-[10px] text-gray-400">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
                  </div>
                </div>
              )}

              {/* Caption */}
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1.5">Caption</label>
                <input value={caption} onChange={e => setCaption(e.target.value)}
                  placeholder="Describe this photo or video…"
                  className="w-full px-4 py-3 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 transition" />
              </div>

              {/* Category */}
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1.5">Category</label>
                <select value={category} onChange={e => setCategory(e.target.value)}
                  className="w-full px-4 py-3 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 bg-white">
                  {CATEGORIES.map(c => <option key={c}>{c}</option>)}
                </select>
              </div>

              {/* Progress */}
              {uploading && (
                <div className="space-y-1.5">
                  <div className="flex justify-between text-xs text-gray-500">
                    <span>Uploading…</span><span>{progress}%</span>
                  </div>
                  <div className="w-full bg-gray-100 rounded-full h-2">
                    <div className="bg-orange-500 h-2 rounded-full transition-all duration-300" style={{ width: `${progress}%` }} />
                  </div>
                </div>
              )}
            </div>

            <div className="flex items-center justify-end gap-3 px-6 py-4 border-t border-gray-100">
              <button onClick={closeModal} className="px-5 py-2.5 text-sm text-gray-600 hover:text-gray-800 font-medium transition">
                Cancel
              </button>
              <button onClick={handleUpload} disabled={uploading || !file}
                className="flex items-center gap-2 px-6 py-2.5 bg-orange-500 hover:bg-orange-600 disabled:opacity-60 text-white rounded-xl text-sm font-semibold transition shadow-sm">
                {uploading ? <Loader2 size={14} className="animate-spin" /> : <ImagePlus size={14} />}
                {uploading ? "Uploading…" : `Upload ${mediaType === "video" ? "Video" : "Image"}`}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* TOAST */}
      {toast && (
        <div className={`fixed bottom-6 right-6 z-50 px-5 py-3 rounded-2xl shadow-xl text-white text-sm font-semibold flex items-center gap-2 ${toast.type === "success" ? "bg-green-600" : "bg-red-500"}`}>
          {toast.type === "success" ? <CheckCircle size={16} /> : <X size={16} />}
          {toast.msg}
        </div>
      )}
    </div>
  )
}