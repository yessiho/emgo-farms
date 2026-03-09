'use client'

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowLeft, Clock, Calendar, Tag } from "lucide-react"

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

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" })
}

function readTime(content: string) {
  const words = content?.trim().split(/\s+/).length ?? 0
  return `${Math.max(1, Math.ceil(words / 200))} min read`
}

export default function BlogPostPage() {
  const { slug }            = useParams<{ slug: string }>()
  const router              = useRouter()
  const [post,    setPost]  = useState<Post | null>(null)
  const [loading, setLoading] = useState(true)
  const [related, setRelated] = useState<Post[]>([])

  useEffect(() => {
    if (!slug) return
    fetchPost()
  }, [slug])

  const fetchPost = async () => {
    try {
      setLoading(true)
      const res  = await fetch("/api/admin/posts")
      const data = await res.json()
      const all  = Array.isArray(data) ? data.filter((p: Post) => p.status === "published") : []
      const found = all.find((p: Post) => p.slug === slug)
      if (!found) { router.push("/blog"); return }
      setPost(found)
      setRelated(all.filter((p: Post) => p.id !== found.id && p.category === found.category).slice(0, 3))
    } catch {
      router.push("/blog")
    } finally {
      setLoading(false)
    }
  }

  if (loading) return (
    <div className="min-h-screen bg-green-50 flex items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <div className="w-10 h-10 border-4 border-orange-500 border-t-transparent rounded-full animate-spin" />
        <p className="text-green-700 text-sm font-semibold">Loading post…</p>
      </div>
    </div>
  )

  if (!post) return null

  return (
    <div className="min-h-screen bg-green-50 font-sans">

      {/* Hero image */}
      <div className="relative h-64 sm:h-80 md:h-96 lg:h-[480px] bg-gray-200 overflow-hidden">
        {post.image_url ? (
          <img src={post.image_url} alt={post.title} className="w-full h-full object-cover" />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-green-800 to-green-600" />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />

        {/* Back button */}
        <div className="absolute top-6 left-5 sm:left-8">
          <Link href="/blog"
            className="flex items-center gap-2 bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white px-4 py-2 rounded-xl text-sm font-semibold transition">
            <ArrowLeft size={15} /> Back to Blog
          </Link>
        </div>

        {/* Title overlay */}
        <div className="absolute bottom-0 left-0 right-0 px-5 sm:px-8 lg:px-16 pb-8 sm:pb-10 max-w-4xl mx-auto">
          <span className={`inline-block text-white px-3 py-1 rounded-full text-xs font-bold shadow-md mb-3 ${categoryColors[post.category] ?? "bg-green-600"}`}>
            {post.category}
          </span>
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}
            className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold text-white leading-tight">
            {post.title}
          </motion.h1>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-5 sm:px-8 lg:px-10 py-10 sm:py-14">

        {/* Meta row */}
        <div className="flex items-center gap-4 flex-wrap mb-8 pb-8 border-b border-gray-200">
          <div className="flex items-center gap-2 text-gray-500 text-sm">
            <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center text-green-700 text-xs font-bold">E</div>
            <span className="font-medium text-gray-700">EMGO Team</span>
          </div>
          <div className="flex items-center gap-1.5 text-gray-400 text-sm">
            <Calendar size={14} />
            <span>{formatDate(post.created_at)}</span>
          </div>
          <div className="flex items-center gap-1.5 text-gray-400 text-sm">
            <Clock size={14} />
            <span>{readTime(post.content)}</span>
          </div>
          <div className="flex items-center gap-1.5 text-gray-400 text-sm">
            <Tag size={14} />
            <span>{post.category}</span>
          </div>
        </div>

        {/* Excerpt */}
        {post.excerpt && (
          <p className="text-lg sm:text-xl text-gray-600 font-medium leading-relaxed mb-8 italic border-l-4 border-orange-400 pl-5">
            {post.excerpt}
          </p>
        )}

        {/* Body content */}
        <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed whitespace-pre-wrap">
          {post.content || <p className="text-gray-400 italic">No content available.</p>}
        </div>

        {/* Share / back */}
        <div className="mt-12 pt-8 border-t border-gray-200 flex items-center justify-between flex-wrap gap-4">
          <Link href="/blog"
            className="flex items-center gap-2 text-green-700 hover:text-green-900 font-semibold text-sm transition">
            <ArrowLeft size={15} /> All Articles
          </Link>
          <Link href="/contact"
            className="px-6 py-2.5 bg-orange-500 hover:bg-orange-600 text-white rounded-xl text-sm font-semibold transition shadow-sm">
            Contact Us →
          </Link>
        </div>

        {/* Related posts */}
        {related.length > 0 && (
          <div className="mt-14">
            <h2 className="text-xl font-bold text-green-800 mb-6">Related Articles</h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
              {related.map(r => (
                <Link key={r.id} href={`/blog/${r.slug}`}
                  className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-md hover:-translate-y-0.5 transition-all">
                  <div className="h-36 bg-gray-100 overflow-hidden">
                    {r.image_url
                      ? <img src={r.image_url} alt={r.title} className="w-full h-full object-cover" />
                      : <div className="w-full h-full bg-gradient-to-br from-green-100 to-green-200" />
                    }
                  </div>
                  <div className="p-4">
                    <span className={`text-[10px] text-white px-2 py-0.5 rounded-full font-bold ${categoryColors[r.category] ?? "bg-green-600"}`}>
                      {r.category}
                    </span>
                    <p className="text-sm font-semibold text-gray-800 mt-2 line-clamp-2">{r.title}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  )
}