'use client'

import Link from "next/link"
import { motion } from "framer-motion"

const blogPosts = [
  {
    id: 1,
    title: "Sustainable Oil Palm Farming Techniques",
    category: "Farming",
    date: "Feb 10, 2026",
    author: "EMGO Team",
    excerpt:
      "Learn how sustainable farming practices improve yield, conserve nature, and boost efficiency in oil palm farming.",
    image: "/image/blog1.jpg",
    slug: "sustainable-oil-palm-farming",
  },
  {
    id: 2,
    title: "Modern Palm Oil Production Methods",
    category: "Production",
    date: "Jan 25, 2026",
    author: "EMGO Team",
    excerpt:
      "Explore modern techniques for high-quality palm oil production and efficiency using advanced machinery and best practices.",
    image: "/image/blog2.jpg",
    slug: "modern-palm-oil-production",
  },
  {
    id: 3,
    title: "Palm Kernel Oil Refining Explained",
    category: "Refining",
    date: "Jan 10, 2026",
    author: "EMGO Team",
    excerpt:
      "A detailed guide on refining palm kernel oil, the processes involved, and its wide range of industrial and culinary uses.",
    image: "/image/blog3.jpg",
    slug: "palm-kernel-oil-refining",
  },
]

export default function BlogPage() {
  return (
    <div className="min-h-screen bg-green-50">

      {/* HERO SECTION */}
      <section className="relative h-72 md:h-96 bg-cover bg-center" style={{ backgroundImage: "url('/image/products-hero.jpg')" }}>
        <div className="absolute inset-0 bg-gradient-to-r from-green-900/80 via-green-900/50 to-orange-500/50 flex items-center justify-center">
          <h1 className="text-4xl md:text-6xl font-extrabold text-white text-center shadow-lg">
            EMGO Farms Blog
          </h1>
        </div>
      </section>

      {/* BLOG GRID */}
      <section className="container mx-auto px-6 py-16">
        <div className="grid md:grid-cols-3 gap-10">

          {blogPosts.map((post) => (
            <motion.div
              key={post.id}
              whileHover={{ scale: 1.03 }}
              className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100 hover:shadow-2xl transition"
            >
              {/* Image */}
              <Link href={`/blog/${post.slug}`}>
                <div className="relative h-52 overflow-hidden">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                  />
                  {/* Category Badge */}
                  <span className="absolute top-3 left-3 bg-orange-500 text-white px-3 py-1 rounded-full text-xs font-semibold shadow">
                    {post.category}
                  </span>
                </div>
              </Link>

              {/* Content */}
              <div className="p-6 flex flex-col justify-between h-full">
                <h2 className="text-xl font-bold text-gray-800 hover:text-orange-500 transition">
                  <Link href={`/blog/${post.slug}`}>{post.title}</Link>
                </h2>
                <p className="text-gray-600 mt-2 line-clamp-3">{post.excerpt}</p>

                {/* Author + Date */}
                <div className="mt-4 flex justify-between items-center text-gray-500 text-sm">
                  <span>By {post.author}</span>
                  <span>{post.date}</span>
                </div>

                {/* Read More */}
                <Link
                  href={`/blog/${post.slug}`}
                  className="mt-4 inline-block text-orange-500 font-semibold hover:underline"
                >
                  Read More →
                </Link>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Pagination */}
        <div className="flex justify-center mt-12 gap-3">
          <button className="px-4 py-2 rounded border border-gray-300 hover:bg-gray-100 transition">Previous</button>
          <button className="px-4 py-2 rounded border border-gray-300 hover:bg-gray-100 transition">1</button>
          <button className="px-4 py-2 rounded border border-gray-300 hover:bg-gray-100 transition">2</button>
          <button className="px-4 py-2 rounded border border-gray-300 hover:bg-gray-100 transition">Next</button>
        </div>
      </section>
    </div>
  )
}
