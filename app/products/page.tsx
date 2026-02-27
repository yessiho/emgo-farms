'use client'

import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"

const productsData = [
  {
    title: "Premium Palm Oil",
    description:
      "Refined, pure, and sustainably produced palm oil processed through modern extraction systems for industrial and household applications.",
    image: "/image/oil-palm10.jpg",
    badge: "Best Seller",
  },
  {
    title: "Organic Palm Kernel Oil",
    description:
      "Cold-pressed and carefully refined palm kernel oil suitable for food production, cosmetics, soap manufacturing, and industrial use.",
    image: "/image/products.jpg",
    badge: "Premium",
  },
  {
    title: "Fresh Oil Palm Fruits",
    description:
      "High-yield oil palm fruits harvested directly from our plantations for local processing and bulk supply.",
    image: "/image/oil-kene1.jpg",
    badge: "Farm Fresh",
  },
  {
    title: "Palm Oil By-Products",
    description:
      "Sustainably managed palm residues utilized for animal feed, biomass energy, and agricultural enhancement.",
    image: "/image/oil-palm9.jpg",
    badge: "Sustainable",
  },
]

const categories = [
  {
    icon: "🌿",
    title: "Raw Palm Oil",
    desc: "Freshly extracted palm oil processed directly from harvested fruits, suitable for bulk industrial and commercial applications.",
  },
  {
    icon: "✨",
    title: "Refined Palm Oil",
    desc: "Filtered and purified palm oil manufactured under strict quality control standards for food and commercial use.",
  },
  {
    icon: "💧",
    title: "Palm Kernel Oil",
    desc: "High-grade palm kernel oil ideal for cooking, cosmetic production, soap manufacturing, and bio-industrial applications.",
  },
]

const qualities = [
  { icon: "🏆", label: "Premium Grade Quality" },
  { icon: "🌱", label: "Sustainably Sourced" },
  { icon: "🔬", label: "Lab Tested & Certified" },
  { icon: "📦", label: "Bulk & Retail Supply" },
  { icon: "🤝", label: "Reliable Partnership" },
  { icon: "🚚", label: "Nationwide Delivery" },
]

export default function ProductsPage() {
  return (
    <div className="bg-white min-h-screen text-gray-800 font-sans">

      {/* ── HERO ─────────────────────────────────────────────── */}
      <section className="relative h-[60vh] sm:h-[65vh] lg:h-[500px] bg-[url('/image/produt4.jpg')] bg-cover bg-center flex items-center justify-center">
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/40" />

        <motion.div
          initial={{ y: -40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1 }}
          className="relative text-center text-white px-5 sm:px-8 max-w-3xl mx-auto"
        >
          <span className="inline-block bg-orange-500/80 backdrop-blur-sm text-white text-xs font-bold tracking-widest uppercase px-4 py-1.5 rounded-full mb-4 sm:mb-5">
            Our Products
          </span>
          <h1 className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6 leading-tight">
            From Farm to Shelf. <br className="hidden sm:block" />
            <span className="text-orange-400">Quality You Can Trust.</span>
          </h1>
          <p className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-200 leading-relaxed">
            Integrated Agricultural Production. Refined Quality. Sustainable Impact.
          </p>
        </motion.div>
      </section>


      {/* ── COMPANY OVERVIEW ──────────────────────────────────── */}
      <section className="py-16 sm:py-20 lg:py-24 bg-green-50">
        <div className="max-w-5xl mx-auto px-5 sm:px-8 lg:px-10 text-center">

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="mb-8 sm:mb-10"
          >
            <span className="inline-block bg-green-100 text-green-800 text-xs font-bold tracking-widest uppercase px-4 py-1.5 rounded-full mb-4">
              Who We Are
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-green-800">
              About EMGO Farms & Integrated Services
            </h2>
          </motion.div>

          <div className="space-y-4 sm:space-y-5">
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="text-gray-700 text-base sm:text-lg leading-relaxed"
            >
              EMGO Farms is a growth-driven agro-industrial enterprise strategically positioned
              in Nsit Atai, Akwa Ibom State. What began as a modest agricultural initiative
              has evolved into an integrated ecosystem with a clear ambition — to cultivate
              over 50,000 high-yield oil palm trees and establish modern refining facilities
              that control the entire value chain.
            </motion.p>

            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-gray-700 text-base sm:text-lg leading-relaxed"
            >
              Our operations extend beyond cultivation into palm oil processing,
              palm kernel oil refining, cassava starch production, ginger farming,
              and rubber plantation development — creating a diversified, scalable,
              and sustainable agricultural portfolio.
            </motion.p>

            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="text-green-800 font-semibold italic text-base sm:text-lg"
            >
              From soil to refined product, we deliver excellence through
              innovation, operational discipline, and environmental responsibility.
            </motion.p>
          </div>

          {/* Quality badges — wraps cleanly on all screens */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mt-10 sm:mt-12 flex flex-wrap justify-center gap-3 sm:gap-4"
          >
            {qualities.map((q, i) => (
              <span
                key={i}
                className="inline-flex items-center gap-2 bg-white border border-green-100 text-green-800 text-xs sm:text-sm font-semibold px-3 sm:px-4 py-2 rounded-full shadow-sm hover:shadow-md hover:border-green-300 transition"
              >
                <span>{q.icon}</span>{q.label}
              </span>
            ))}
          </motion.div>

        </div>
      </section>


      {/* ── FEATURED PRODUCTS ─────────────────────────────────── */}
      <section className="py-16 sm:py-20 lg:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-10">

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-10 sm:mb-14 lg:mb-16"
          >
            <span className="inline-block bg-orange-100 text-orange-700 text-xs font-bold tracking-widest uppercase px-4 py-1.5 rounded-full mb-4">
              What We Produce
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-green-800">
              Featured Products
            </h2>
          </motion.div>

          {/* 1-col on mobile, 2-col on sm, 4-col on lg */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 lg:gap-10">
            {productsData.map((product, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: idx * 0.12 }}
                className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 group border border-gray-50"
              >
                <div className="relative w-full h-52 sm:h-60 lg:h-64">
                  <Image
                    src={product.image}
                    alt={product.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  {/* Badge */}
                  <span className="absolute top-3 left-3 bg-orange-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-md">
                    {product.badge}
                  </span>
                </div>

                <div className="p-6 sm:p-7 lg:p-8">
                  <h3 className="text-lg sm:text-xl font-semibold text-green-800 mb-2 sm:mb-3">
                    {product.title}
                  </h3>
                  <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
                    {product.description}
                  </p>
                  <div className="mt-5">
                    <Link
                      href="/contact"
                      className="inline-flex items-center gap-1.5 text-green-800 font-semibold text-sm hover:text-orange-500 transition-colors group/link"
                    >
                      Enquire Now
                      <span className="group-hover/link:translate-x-1 transition-transform">→</span>
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>


      {/* ── PRODUCT CATEGORIES ────────────────────────────────── */}
      <section className="py-16 sm:py-20 lg:py-28 bg-green-50">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-10">

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-10 sm:mb-14 lg:mb-16"
          >
            <span className="inline-block bg-green-100 text-green-800 text-xs font-bold tracking-widest uppercase px-4 py-1.5 rounded-full mb-4">
              Product Range
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-green-800">
              Product Categories
            </h2>
          </motion.div>

          {/* 1-col on mobile, 3-col on md+ */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8 lg:gap-10">
            {categories.map((cat, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: idx * 0.12 }}
                className="bg-white rounded-2xl p-7 sm:p-10 shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300 text-center group"
              >
                <div className="text-4xl sm:text-5xl mb-4 sm:mb-5">{cat.icon}</div>
                <div className="w-10 h-1 bg-orange-400 rounded-full mx-auto mb-4 sm:mb-5 group-hover:w-16 transition-all duration-300" />
                <h3 className="text-xl sm:text-2xl font-semibold text-green-900 mb-3 sm:mb-4">
                  {cat.title}
                </h3>
                <p className="text-gray-700 text-sm sm:text-base leading-relaxed">
                  {cat.desc}
                </p>
              </motion.div>
            ))}
          </div>

        </div>
      </section>


      {/* ── VALUE PROPOSITION STRIP ───────────────────────────── */}
      <section className="py-12 sm:py-14 bg-white border-y border-gray-100">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-10">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-5 sm:gap-6 text-center">
            {[
              { icon: "🌱", label: "Farm-to-Shelf Control" },
              { icon: "🏭", label: "Modern Processing Plant" },
              { icon: "📋", label: "Quality Certified" },
              { icon: "🌍", label: "Export Ready" },
              { icon: "♻️", label: "Zero Waste Approach" },
              { icon: "📞", label: "Dedicated Support" },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.07 }}
                className="flex flex-col items-center gap-2"
              >
                <div className="w-12 h-12 sm:w-14 sm:h-14 bg-green-50 rounded-2xl flex items-center justify-center text-2xl sm:text-3xl shadow-sm">
                  {item.icon}
                </div>
                <p className="text-xs sm:text-sm font-semibold text-green-800 leading-snug">{item.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>


      {/* ── CTA ───────────────────────────────────────────────── */}
      <section className="py-16 sm:py-20 lg:py-28 bg-green-800 text-white">
        <div className="max-w-4xl mx-auto px-5 sm:px-8 lg:px-10 text-center">

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <span className="inline-block bg-orange-500/20 border border-orange-400/30 text-orange-300 text-xs font-bold tracking-widest uppercase px-4 py-1.5 rounded-full mb-5">
              Work With Us
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-5 sm:mb-6 leading-tight">
              Partner With EMGO Farms
            </h2>

            <p className="text-sm sm:text-base lg:text-lg text-green-200 max-w-2xl mx-auto mb-8 sm:mb-10 leading-relaxed">
              We deliver premium agricultural products backed by integrated
              production systems, modern processing infrastructure, and
              sustainable operational practices across Nigeria and West Africa.
            </p>

            {/* Two CTA buttons — stacked on mobile, inline on sm+ */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/contact"
                className="w-full sm:w-auto inline-block px-8 sm:px-10 py-3.5 sm:py-4 bg-orange-500 hover:bg-orange-600 text-white rounded-full font-semibold text-sm sm:text-base transition-all duration-200 shadow-xl hover:scale-[1.03] active:scale-95"
              >
                Contact Us →
              </Link>
              <Link
                href="/about"
                className="w-full sm:w-auto inline-block px-8 sm:px-10 py-3.5 sm:py-4 border-2 border-white/40 hover:border-white text-white rounded-full font-semibold text-sm sm:text-base transition-all duration-200 hover:bg-white/10"
              >
                Learn About Us
              </Link>
            </div>
          </motion.div>

        </div>
      </section>

    </div>
  )
}