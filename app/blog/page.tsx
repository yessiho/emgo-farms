'use client'

import Image from "next/image"
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
    readTime: "5 min read",
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
    readTime: "6 min read",
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
    readTime: "7 min read",
  },
]

const categoryColors: Record<string, string> = {
  Farming:    "bg-green-500",
  Production: "bg-orange-500",
  Refining:   "bg-blue-500",
}

export default function BlogPage() {
  return (
    <div className="min-h-screen bg-green-50 font-sans text-gray-800">

      {/* ── HERO ─────────────────────────────────────────────── */}
      <section
        className="relative h-56 sm:h-72 md:h-80 lg:h-96 bg-cover bg-center flex items-center justify-center"
        style={{ backgroundImage: "url('/image/products-hero.jpg')" }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-green-900/85 via-green-900/60 to-orange-600/50" />

        <div className="relative text-center px-5 sm:px-8 max-w-4xl mx-auto">
          <motion.span
            initial={{ opacity: 0, y: -15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="inline-block bg-orange-500/80 backdrop-blur-sm text-white text-xs font-bold tracking-widest uppercase px-4 py-1.5 rounded-full mb-3 sm:mb-4"
          >
            Insights & Updates
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.1 }}
            className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-white leading-tight mb-3 sm:mb-4"
          >
            EMGO Farms Blog
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.4 }}
            className="text-gray-200 text-sm sm:text-base lg:text-lg max-w-2xl mx-auto"
          >
            Sustainable farming insights, agribusiness innovation, and agro-industrial intelligence from the heart of Akwa Ibom.
          </motion.p>
        </div>
      </section>


      {/* ── COMPANY WRITE-UP ──────────────────────────────────── */}
      <section className="py-12 sm:py-16 lg:py-20 bg-green-100">
        <div className="max-w-4xl mx-auto px-5 sm:px-8 lg:px-10 text-center">

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="mb-5 sm:mb-6"
          >
            <span className="inline-block bg-green-200 text-green-800 text-xs font-bold tracking-widest uppercase px-4 py-1.5 rounded-full mb-3 sm:mb-4">
              Our Story
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-green-800">
              About EMGO Farms
            </h2>
          </motion.div>

          <div className="space-y-3 sm:space-y-4">
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="text-gray-700 text-sm sm:text-base lg:text-lg leading-relaxed"
            >
              EMGO Farms started in August 2020 with a small 4-acre farm in Obadeyi Town, Ogun State.
              Today, it spans over 5 hectares in Uyo, Akwa Ibom State, with plans to plant 10,000 oil palm
              trees by 2030. Our mission is to deliver high-quality, sustainable palm oil and kernel oil
              products while empowering local communities.
            </motion.p>
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-gray-700 text-sm sm:text-base lg:text-lg leading-relaxed"
            >
              With modern farming techniques, eco-friendly practices, and commitment to quality,
              EMGO Farms ensures that every product contributes positively to the environment
              and the lives of our partners.
            </motion.p>
          </div>

        </div>
      </section>


      {/* ── BLOG GRID ─────────────────────────────────────────── */}
      <section className="py-12 sm:py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-10">

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-8 sm:mb-12 lg:mb-14"
          >
            <span className="inline-block bg-orange-100 text-orange-700 text-xs font-bold tracking-widest uppercase px-4 py-1.5 rounded-full mb-3">
              Latest Articles
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-green-800">
              Farm & Industry Insights
            </h2>
          </motion.div>

          {/* 1-col mobile → 2-col sm → 3-col lg */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 lg:gap-10">
            {blogPosts.map((post, idx) => (
              <motion.div
                key={post.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: idx * 0.12 }}
                className="bg-white rounded-2xl shadow-md overflow-hidden border border-gray-100 hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 flex flex-col"
              >
                {/* Image */}
                <Link href={`/blog/${post.slug}`} className="block">
                  <div className="relative h-44 sm:h-52 lg:h-56 overflow-hidden">
                    <Image
                      src={post.image}
                      alt={post.title}
                      fill
                      className="object-cover transition-transform duration-500 hover:scale-105"
                    />
                    {/* Category badge */}
                    <span className={`absolute top-3 left-3 text-white px-3 py-1 rounded-full text-xs font-bold shadow-md ${categoryColors[post.category] ?? "bg-green-600"}`}>
                      {post.category}
                    </span>
                    {/* Read time */}
                    <span className="absolute top-3 right-3 bg-black/50 backdrop-blur-sm text-white text-xs px-2.5 py-1 rounded-full">
                      {post.readTime}
                    </span>
                  </div>
                </Link>

                {/* Content */}
                <div className="p-5 sm:p-6 flex flex-col flex-1">
                  <h2 className="text-base sm:text-lg lg:text-xl font-bold text-gray-800 hover:text-orange-500 transition-colors leading-snug mb-2">
                    <Link href={`/blog/${post.slug}`}>{post.title}</Link>
                  </h2>

                  <p className="text-gray-500 text-sm leading-relaxed line-clamp-3 flex-1">
                    {post.excerpt}
                  </p>

                  {/* Divider */}
                  <div className="w-full h-px bg-gray-100 my-4" />

                  {/* Author + Date row */}
                  <div className="flex items-center justify-between text-gray-400 text-xs sm:text-sm">
                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 rounded-full bg-green-100 flex items-center justify-center text-green-700 text-xs font-bold flex-shrink-0">
                        E
                      </div>
                      <span className="font-medium text-gray-600 truncate max-w-[80px] sm:max-w-none">{post.author}</span>
                    </div>
                    <span>{post.date}</span>
                  </div>

                  {/* Read More */}
                  <Link
                    href={`/blog/${post.slug}`}
                    className="mt-4 inline-flex items-center gap-1.5 text-orange-500 font-semibold text-sm hover:gap-3 transition-all duration-200 group"
                  >
                    Read More
                    <span className="group-hover:translate-x-1 transition-transform">→</span>
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>


          {/* ── PAGINATION ──────────────────────────────────── */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex justify-center mt-10 sm:mt-14 gap-2 flex-wrap"
          >
            {["Previous", "1", "2", "Next"].map((label) => (
              <button
                key={label}
                className={`px-3.5 sm:px-5 py-2 sm:py-2.5 rounded-xl text-sm font-medium transition-all duration-200 border ${
                  label === "1"
                    ? "bg-green-800 text-white border-green-800 shadow-md"
                    : "bg-white text-gray-600 border-gray-200 hover:bg-green-50 hover:border-green-300 hover:text-green-800"
                }`}
              >
                {label}
              </button>
            ))}
          </motion.div>

        </div>
      </section>


      {/* ── NEWSLETTER STRIP ──────────────────────────────────── */}
      <section className="py-10 sm:py-12 bg-white border-y border-gray-100">
        <div className="max-w-4xl mx-auto px-5 sm:px-8 lg:px-10">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-6 text-center sm:text-left">

            <div>
              <h3 className="text-lg sm:text-xl font-bold text-green-800 mb-1">
                📩 Never miss an article
              </h3>
              <p className="text-gray-500 text-sm">
                Get the latest farm insights delivered straight to your inbox.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
              <input
                type="email"
                placeholder="Your email address"
                className="w-full sm:w-64 px-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
              <button className="px-6 py-3 bg-green-800 hover:bg-green-900 text-white rounded-xl font-semibold text-sm transition-all duration-200 whitespace-nowrap shadow-md hover:scale-[1.02] active:scale-95">
                Subscribe
              </button>
            </div>

          </div>
        </div>
      </section>


      {/* ── CTA SECTION ───────────────────────────────────────── */}
      <section className="py-14 sm:py-16 lg:py-20 bg-green-800 text-white">
        <div className="max-w-3xl mx-auto px-5 sm:px-8 lg:px-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <span className="inline-block bg-white/10 border border-white/20 text-green-200 text-xs font-bold tracking-widest uppercase px-4 py-1.5 rounded-full mb-4 sm:mb-5">
              Connect With Us
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4 sm:mb-5 leading-tight">
              Stay Connected With EMGO Farms
            </h2>
            <p className="text-sm sm:text-base lg:text-lg text-green-200 mb-8 sm:mb-10 max-w-xl mx-auto leading-relaxed">
              Follow our blog to learn about sustainable farming, modern palm oil production,
              and innovations in eco-friendly agricultural practices.
            </p>

            {/* Stacked on mobile, inline on sm+ */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/contact"
                className="w-full sm:w-auto inline-block px-8 sm:px-10 py-3.5 sm:py-4 bg-orange-500 hover:bg-orange-600 text-white rounded-full font-semibold text-sm sm:text-base transition-all duration-200 shadow-xl hover:scale-[1.03] active:scale-95"
              >
                Contact Us →
              </Link>
              <Link
                href="/about"
                className="w-full sm:w-auto inline-block px-8 sm:px-10 py-3.5 sm:py-4 border-2 border-white/50 hover:border-white text-white rounded-full font-semibold text-sm sm:text-base transition-all duration-200 hover:bg-white/10"
              >
                About EMGO Farms
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

    </div>
  )
}