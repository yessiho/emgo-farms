'use client'

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import { FileText, Clock, Search, RefreshCw } from "lucide-react"

interface Post {
  id:         string
  title:      string
  category:   string
  excerpt:    string
  content:    string
  status:     string
  slug:       string
  image_url:  string
  created_at: string
}

const categoryColors: Record<string, string> = {
  Farming:    "bg-green-500",
  Production: "bg-orange-500",
  Refining:   "bg-blue-500",
  News:       "bg-purple-500",
  Community:  "bg-pink-500",
}

const categoryFilters = ["All", "Farming", "Production", "Refining", "News", "Community"]

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" })
}

function readTime(content: string) {
  const words = content?.trim().split(/\s+/).length ?? 0
  return `${Math.max(1, Math.ceil(words / 200))} min read`
}

const FALLBACK = "/image/gallery5.jpg"

export default function BlogPage() {
  const [posts,    setPosts]    = useState<Post[]>([])
  const [loading,  setLoading]  = useState(true)
  const [error,    setError]    = useState<string | null>(null)
  const [search,   setSearch]   = useState("")
  const [category, setCategory] = useState("All")
  const [email,    setEmail]    = useState("")
  const [subMsg,   setSubMsg]   = useState("")
  const [subbing,  setSubbing]  = useState(false)

  useEffect(() => { fetchPosts() }, [])

  const fetchPosts = async () => {
    try {
      setLoading(true); setError(null)
      const res  = await fetch("/api/posts")
      const data = await res.json()
      setPosts(Array.isArray(data) ? data.filter((p: Post) => p.status === "published") : [])
    } catch {
      setError("Failed to load posts. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  const handleSubscribe = async () => {
    if (!email.trim()) { setSubMsg("Please enter your email."); return }
    setSubbing(true)
    try {
      const res = await fetch("/api/newsletter", {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      })
      if (res.status === 409) { setSubMsg("You're already subscribed!"); return }
      if (!res.ok) throw new Error()
      setSubMsg("🎉 Subscribed successfully!"); setEmail("")
    } catch {
      setSubMsg("Something went wrong. Try again.")
    } finally {
      setSubbing(false); setTimeout(() => setSubMsg(""), 4000)
    }
  }

  const filtered = posts.filter(p => {
    const matchCat    = category === "All" || p.category === category
    const matchSearch = p.title.toLowerCase().includes(search.toLowerCase()) ||
                        p.excerpt?.toLowerCase().includes(search.toLowerCase())
    return matchCat && matchSearch
  })

  return (
    <div className="min-h-screen bg-green-50 font-sans text-gray-800">

      {/* HERO */}
      <section className="relative h-56 sm:h-72 md:h-80 lg:h-96 bg-cover bg-center flex items-center justify-center"
        style={{ backgroundImage: "url('/image/gallery9.jpg')" }}>
        <div className="absolute inset-0 bg-gradient-to-r from-green-900/85 via-green-900/60 to-orange-600/50" />
        <div className="relative text-center px-5 sm:px-8 max-w-4xl mx-auto">
          <motion.span initial={{ opacity: 0, y: -15 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}
            className="inline-block bg-orange-500/80 backdrop-blur-sm text-white text-xs font-bold tracking-widest uppercase px-4 py-1.5 rounded-full mb-3 sm:mb-4">
            Insights & Updates
          </motion.span>
          <motion.h1 initial={{ opacity: 0, y: -30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: 0.1 }}
            className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-white leading-tight mb-3 sm:mb-4">
            EMGO Farms Blog
          </motion.h1>
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1, delay: 0.4 }}
            className="text-gray-200 text-sm sm:text-base lg:text-lg max-w-2xl mx-auto">
            Sustainable farming insights, agribusiness innovation, and agro-industrial intelligence from the heart of Akwa Ibom.
          </motion.p>
        </div>
      </section>

      {/* ABOUT */}
      <section className="py-12 sm:py-16 lg:py-20 bg-green-100">
        <div className="max-w-4xl mx-auto px-5 sm:px-8 lg:px-10 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }} className="mb-5 sm:mb-6">
            <span className="inline-block bg-green-200 text-green-800 text-xs font-bold tracking-widest uppercase px-4 py-1.5 rounded-full mb-3 sm:mb-4">Our Story</span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-green-800">About EMGO Farms</h2>
          </motion.div>
          <div className="space-y-3 sm:space-y-4">
            <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.8, delay: 0.1 }}
              className="text-gray-700 text-sm sm:text-base lg:text-lg leading-relaxed">
              EMGO Farms started in August 2020 with a small 4-acre farm in Obadeyi Town, Ogun State. Today, it spans over 5 hectares in Uyo, Akwa Ibom State, with plans to plant 10,000 oil palm trees by 2030. Our mission is to deliver high-quality, sustainable palm oil and kernel oil products while empowering local communities.
            </motion.p>
            <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.8, delay: 0.2 }}
              className="text-gray-700 text-sm sm:text-base lg:text-lg leading-relaxed">
              With modern farming techniques, eco-friendly practices, and commitment to quality, EMGO Farms ensures that every product contributes positively to the environment and the lives of our partners.
            </motion.p>
          </div>
        </div>
      </section>

      {/* BLOG GRID */}
      <section className="py-12 sm:py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-10">

          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }}
            className="text-center mb-8 sm:mb-10">
            <span className="inline-block bg-orange-100 text-orange-700 text-xs font-bold tracking-widest uppercase px-4 py-1.5 rounded-full mb-3">Latest Articles</span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-green-800">Farm & Industry Insights</h2>
          </motion.div>

          {/* Search + Filter */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 mb-8 flex-wrap">
            <div className="flex items-center gap-2 bg-white border border-gray-200 rounded-xl px-4 py-2.5 w-full sm:w-64 shadow-sm">
              <Search size={14} className="text-gray-400 flex-shrink-0" />
              <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search posts…"
                className="bg-transparent text-sm text-gray-700 outline-none w-full placeholder-gray-400" />
            </div>
            <div className="flex items-center gap-2 flex-wrap">
              {categoryFilters.map(cat => (
                <button key={cat} onClick={() => setCategory(cat)}
                  className={`px-3.5 py-2 rounded-xl text-xs font-semibold transition-all border ${
                    category === cat ? "bg-green-800 text-white border-green-800 shadow-md" : "bg-white text-gray-600 border-gray-200 hover:border-green-300 hover:text-green-700"
                  }`}>
                  {cat}
                </button>
              ))}
            </div>
            <button onClick={fetchPosts} title="Refresh"
              className="p-2.5 rounded-xl bg-white border border-gray-200 hover:bg-gray-50 text-gray-500 transition shadow-sm sm:ml-auto">
              <RefreshCw size={14} />
            </button>
          </div>

          {/* Loading */}
          {loading && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {[1,2,3].map(i => (
                <div key={i} className="bg-white rounded-2xl overflow-hidden shadow-md animate-pulse">
                  <div className="h-52 bg-gray-100" />
                  <div className="p-5 space-y-3">
                    <div className="h-4 bg-gray-100 rounded w-3/4" />
                    <div className="h-3 bg-gray-100 rounded w-full" />
                    <div className="h-3 bg-gray-100 rounded w-2/3" />
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Error */}
          {error && !loading && (
            <div className="py-16 text-center">
              <p className="text-red-500 text-sm font-medium mb-3">{error}</p>
              <button onClick={fetchPosts} className="px-5 py-2.5 bg-green-800 text-white rounded-xl text-sm font-semibold hover:bg-green-900 transition">Try Again</button>
            </div>
          )}

          {/* Empty */}
          {!loading && !error && filtered.length === 0 && (
            <div className="py-20 text-center text-gray-400">
              <FileText size={40} className="mx-auto mb-3 opacity-30" />
              <p className="text-base font-semibold">No posts found</p>
              <p className="text-sm mt-1">{search || category !== "All" ? "Try a different search or category" : "Check back soon for new articles!"}</p>
            </div>
          )}

          {/* Grid */}
          {!loading && !error && filtered.length > 0 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 lg:gap-10">
              {filtered.map((post, idx) => (
                <motion.div key={post.id} initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }} transition={{ duration: 0.7, delay: idx * 0.1 }}
                  className="bg-white rounded-2xl shadow-md overflow-hidden border border-gray-100 hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 flex flex-col">

                  <Link href={`/blog/${post.slug}`} className="block">
                    <div className="relative h-44 sm:h-52 lg:h-56 overflow-hidden bg-gray-100">
                      {post.image_url ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img src={post.image_url} alt={post.title}
                          className="w-full h-full object-cover transition-transform duration-500 hover:scale-105" />
                      ) : (
                        <Image src={FALLBACK} alt={post.title} fill className="object-cover transition-transform duration-500 hover:scale-105" />
                      )}
                      <span className={`absolute top-3 left-3 text-white px-3 py-1 rounded-full text-xs font-bold shadow-md ${categoryColors[post.category] ?? "bg-green-600"}`}>
                        {post.category}
                      </span>
                      <span className="absolute top-3 right-3 bg-black/50 backdrop-blur-sm text-white text-xs px-2.5 py-1 rounded-full flex items-center gap-1">
                        <Clock size={10} /> {readTime(post.content)}
                      </span>
                    </div>
                  </Link>

                  <div className="p-5 sm:p-6 flex flex-col flex-1">
                    <h2 className="text-base sm:text-lg font-bold text-gray-800 hover:text-orange-500 transition-colors leading-snug mb-2">
                      <Link href={`/blog/${post.slug}`}>{post.title}</Link>
                    </h2>
                    <p className="text-gray-500 text-sm leading-relaxed line-clamp-3 flex-1">
                      {post.excerpt || post.content?.slice(0, 150) + "…"}
                    </p>
                    <div className="w-full h-px bg-gray-100 my-4" />
                    <div className="flex items-center justify-between text-gray-400 text-xs sm:text-sm">
                      <div className="flex items-center gap-2">
                        <div className="w-7 h-7 rounded-full bg-green-100 flex items-center justify-center text-green-700 text-xs font-bold flex-shrink-0">E</div>
                        <span className="font-medium text-gray-600">EMGO Team</span>
                      </div>
                      <span>{formatDate(post.created_at)}</span>
                    </div>
                    <Link href={`/blog/${post.slug}`}
                      className="mt-4 inline-flex items-center gap-1.5 text-orange-500 font-semibold text-sm hover:gap-3 transition-all duration-200 group">
                      Read More <span className="group-hover:translate-x-1 transition-transform">→</span>
                    </Link>
                  </div>
                </motion.div>
              ))}
            </div>
          )}

        </div>
      </section>

      {/* NEWSLETTER */}
      <section className="py-10 sm:py-12 bg-white border-y border-gray-100">
        <div className="max-w-4xl mx-auto px-5 sm:px-8 lg:px-10">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-6 text-center sm:text-left">
            <div>
              <h3 className="text-lg sm:text-xl font-bold text-green-800 mb-1">📩 Never miss an article</h3>
              <p className="text-gray-500 text-sm">Get the latest farm insights delivered straight to your inbox.</p>
            </div>
            <div className="flex flex-col gap-2 w-full sm:w-auto">
              <div className="flex flex-col sm:flex-row gap-3">
                <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="Your email address"
                  className="w-full sm:w-64 px-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent" />
                <button onClick={handleSubscribe} disabled={subbing}
                  className="px-6 py-3 bg-green-800 hover:bg-green-900 disabled:opacity-60 text-white rounded-xl font-semibold text-sm transition-all whitespace-nowrap shadow-md">
                  {subbing ? "Subscribing…" : "Subscribe"}
                </button>
              </div>
              {subMsg && <p className="text-xs font-medium text-green-700">{subMsg}</p>}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-14 sm:py-16 lg:py-20 bg-green-800 text-white">
        <div className="max-w-3xl mx-auto px-5 sm:px-8 lg:px-10 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }}>
            <span className="inline-block bg-white/10 border border-white/20 text-green-200 text-xs font-bold tracking-widest uppercase px-4 py-1.5 rounded-full mb-4 sm:mb-5">Connect With Us</span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4 sm:mb-5 leading-tight">Stay Connected With EMGO Farms</h2>
            <p className="text-sm sm:text-base lg:text-lg text-green-200 mb-8 sm:mb-10 max-w-xl mx-auto leading-relaxed">
              Follow our blog to learn about sustainable farming, modern palm oil production, and innovations in eco-friendly agricultural practices.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/contact" className="w-full sm:w-auto px-8 sm:px-10 py-3.5 sm:py-4 bg-orange-500 hover:bg-orange-600 text-white rounded-full font-semibold text-sm sm:text-base transition-all shadow-xl hover:scale-[1.03] active:scale-95">
                Contact Us →
              </Link>
              <Link href="/about" className="w-full sm:w-auto px-8 sm:px-10 py-3.5 sm:py-4 border-2 border-white/50 hover:border-white text-white rounded-full font-semibold text-sm sm:text-base transition-all hover:bg-white/10">
                About EMGO Farms
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

    </div>
  )
}