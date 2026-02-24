'use client'

import { useEffect, useState, useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Hero } from '../components/Hero'
import { FaWhatsapp } from 'react-icons/fa'

// ── WhatsApp config ───────────────────────────────────────────
const WHATSAPP_URL = `https://wa.me/2348033395971?text=${encodeURIComponent(
  "Hello EMGO Farms! I'd like to get in touch regarding your products and services."
)}`

// ── Animated counter ─────────────────────────────────────────
function Counter({
  end,
  duration = 2,
  suffix = "",
}: {
  end: number
  duration?: number
  suffix?: string
}) {
  const [count, setCount] = useState(0)
  const [hasStarted, setHasStarted] = useState(false)
  const ref = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setHasStarted(true) },
      { threshold: 0.1 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (!hasStarted) return
    let startTime: number | null = null
    const animate = (now: number) => {
      if (!startTime) startTime = now
      const progress = Math.min((now - startTime) / (duration * 1000), 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      setCount(Math.floor(eased * end))
      if (progress < 1) requestAnimationFrame(animate)
    }
    requestAnimationFrame(animate)
  }, [hasStarted, end, duration])

  return <span ref={ref}>{count.toLocaleString()}{suffix}</span>
}

// ── Data ──────────────────────────────────────────────────────
const services = [
  {
    _id: 1,
    title: "Oil Palm Farming",
    description:
      "Large-scale sustainable oil palm cultivation using high-yield seedlings, modern agronomic practices, and environmentally responsible land management.",
    img: "/image/oil-kene1.jpg",
  },
  {
    _id: 2,
    title: "Palm Oil Production",
    description:
      "Efficient palm oil extraction and processing with strict quality control, ensuring premium-grade output for local and international markets.",
    img: "/image/product2.jpg",
  },
  {
    _id: 3,
    title: "Palm Kernel Oil Refining",
    description:
      "Advanced refining systems delivering high-purity palm kernel oil suitable for food, industrial, and cosmetic applications.",
    img: "/image/refin.jpg",
  },
]

const whyUsItems = [
  { icon: "🔗", label: "End-to-End Value Chain Control" },
  { icon: "🌱", label: "Sustainable Farming Practices" },
  { icon: "⚙️", label: "Modern Processing Technology" },
  { icon: "🏘️", label: "Community-Centered Growth" },
  { icon: "💡", label: "Innovation & Operational Efficiency" },
  { icon: "🤝", label: "Transparent & Reliable Partnerships" },
]

const stats = [
  { target: 10000, label: "Target Oil Palm Trees",    suffix: "+" },
  { target: 5,     label: "Hectares Developed",       suffix: "+" },
  { target: 3,     label: "Integrated Agro Segments", suffix: "+" },
  { target: 100,   label: "Sustainability Commitment",suffix: "%" },
]

const trustBadges = [
  "NIFOR Certified",
  "Bank of Agriculture Partner",
  "NEPC Affiliate",
  "Nigerian Environmental Society Member",
  "ISO-aligned Practices",
]

// ── Page component ────────────────────────────────────────────
export default function Home() {
  const [heroData, setHeroData] = useState<any>(null)

  useEffect(() => {
    fetch('/api/hero')
      .then(res => res.json())
      .then(data => setHeroData(data))
  }, [])

  if (!heroData) return (
    <div className="flex items-center justify-center min-h-screen bg-white">
      <div className="flex flex-col items-center gap-4">
        <div className="w-12 h-12 border-4 border-green-800 border-t-transparent rounded-full animate-spin" />
        <p className="text-green-800 text-base font-semibold">Loading EMGO Farms…</p>
      </div>
    </div>
  )

  return (
    <div className="bg-white font-sans text-gray-800">

      {/* ── HERO ────────────────────────────────────────────── */}
      <Hero
        title="ROOTED IN PURPOSE. GROWING WITH VISION. CULTIVATING VALUE. REFINING EXCELLENCE."
        subtitle="Building an integrated agro-industrial ecosystem in Nigeria and West Africa through sustainable farming, modern processing, and value-driven innovation."
        ctaText="Explore Our Services"
        ctaLink="/services"
        className="bg-[url('/image/oil-palm1.webp')] bg-fixed bg-cover bg-center h-screen flex items-center justify-center text-white"
      />


      {/* ── OUR STORY ────────────────────────────────────────── */}
      <section className="py-14 sm:py-18 lg:py-24 bg-green-50">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-10">

          {/* Mobile / Tablet: stack text then image
              Desktop (lg+): side by side */}
          <div className="flex flex-col lg:flex-row gap-10 lg:gap-16 items-center">

            {/* ── Text ── */}
            <motion.div
              initial={{ x: -40, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.9 }}
              className="w-full lg:w-1/2"
            >
              <span className="inline-block bg-green-100 text-green-800 text-xs font-bold tracking-widest uppercase px-4 py-1.5 rounded-full mb-5">
                Our Story
              </span>
              <h2 className="text-2xl sm:text-3xl lg:text-5xl font-bold text-green-800 mb-5 sm:mb-6 leading-tight">
                Building More Than a Farm,{" "}
                <span className="text-orange-500">Building the Future</span>
              </h2>

              <div className="space-y-3 sm:space-y-4 text-gray-700 text-sm sm:text-base lg:text-lg leading-relaxed">
                <p>
                  In the fertile soils of Nsit Atai, Akwa Ibom State, a bold vision was born —
                  to create not merely a farm, but a fully integrated agro-industrial institution
                  capable of delivering sustainable prosperity, food security, and long-term economic value.
                </p>
                <p>
                  EMGO Farms began with 5 hectares of land, but our ambition stretches far beyond
                  boundaries — cultivating over 50,000 high-yielding oil palm trees, establishing a modern Oil Palm refining plant, and building a complete end-to-end agricultural value chain.
                </p>
                <p>
                  We are also expanding into cassava cultivation for industrial starch, ginger,
                  high-value cash crops, and sustainable animal husbandry.
                </p>
              </div>

              <p className="text-green-800 font-semibold text-sm sm:text-base lg:text-lg italic mt-5 sm:mt-6 leading-relaxed">
                We are not just planting trees — We are planting legacy.<br />
                We are not just refining oil — We are refining standards.<br />
                We are not just building a company — We are building a future.
              </p>

              <div className="mt-6 sm:mt-8 flex flex-col sm:flex-row gap-3">
                <Link
                  href="/about"
                  className="w-full sm:w-auto inline-flex items-center justify-center px-6 py-3.5 bg-orange-500 hover:bg-orange-600 text-white rounded-xl font-semibold transition-all duration-200 shadow-lg hover:scale-[1.02] active:scale-95 text-sm sm:text-base"
                >
                  Learn More About Us →
                </Link>
                <a
                  href={WHATSAPP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-[#25D366] hover:bg-[#1ebe5d] text-white rounded-xl font-semibold transition-all duration-200 shadow-lg hover:scale-[1.02] active:scale-95 text-sm sm:text-base"
                >
                  <FaWhatsapp size={18} />
                  Chat With Us
                </a>
              </div>
            </motion.div>

            {/* ── Image grid ──
                Mobile: single column images (no offset, no overlap)
                Tablet: side-by-side equal height
                Desktop: offset card layout (second image drops down)
            ── */}
            <motion.div
              initial={{ x: 40, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.9 }}
              className="w-full lg:w-1/2"
            >

              {/* ── Mobile: single stacked image ── */}
              <div className="block sm:hidden rounded-2xl overflow-hidden shadow-xl w-full aspect-[16/10] relative">
                <Image
                  src="/image/oil-palm10.jpg"
                  alt="Oil Palm Plantation"
                  fill
                  className="object-cover"
                />
              </div>

              {/* ── Tablet (sm–lg): 2 equal images side-by-side, no offset ── */}
              <div className="hidden sm:grid lg:hidden grid-cols-2 gap-4">
                <div className="relative rounded-2xl overflow-hidden shadow-xl aspect-[3/4]">
                  <Image
                    src="/image/oil-palm10.jpg"
                    alt="Oil Palm Plantation"
                    fill
                    className="object-cover hover:scale-105 transition-transform duration-700"
                  />
                </div>
                <div className="relative rounded-2xl overflow-hidden shadow-xl aspect-[3/4]">
                  <Image
                    src="/image/products.jpg"
                    alt="Palm Oil Processing"
                    fill
                    className="object-cover hover:scale-105 transition-transform duration-700"
                  />
                </div>
              </div>

              {/* ── Desktop (lg+): offset / staggered card layout ── */}
              <div className="hidden lg:flex gap-5 items-start">
                {/* Left card — taller, anchored to top */}
                <div className="flex-1 relative rounded-2xl overflow-hidden shadow-xl"
                  style={{ height: "420px" }}>
                  <Image
                    src="/image/oil-palm10.jpg"
                    alt="Oil Palm Plantation"
                    fill
                    className="object-cover hover:scale-105 transition-transform duration-700"
                  />
                  {/* Label badge */}
                  <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm rounded-xl px-3 py-2 shadow-lg">
                    <p className="text-green-800 font-bold text-xs leading-snug">🌴 Oil Palm</p>
                    <p className="text-gray-500 text-[10px]">Nsit Atai, Akwa Ibom</p>
                  </div>
                </div>

                {/* Right card — same height, offset downward */}
                <div className="flex-1 relative rounded-2xl overflow-hidden shadow-xl mt-10"
                  style={{ height: "420px" }}>
                  <Image
                    src="/image/products.jpg"
                    alt="Palm Oil Processing"
                    fill
                    className="object-cover hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm rounded-xl px-3 py-2 shadow-lg">
                    <p className="text-green-800 font-bold text-xs leading-snug">⚗️ Processing</p>
                    <p className="text-gray-500 text-[10px]">Modern Refinery</p>
                  </div>
                </div>
              </div>

            </motion.div>
          </div>
        </div>
      </section>


      {/* ── SERVICES ─────────────────────────────────────────── */}
      <section className="py-14 sm:py-18 lg:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-10">

          <motion.div
            initial={{ y: 30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-10 sm:mb-12 lg:mb-16"
          >
            <span className="inline-block bg-orange-100 text-orange-700 text-xs font-bold tracking-widest uppercase px-4 py-1.5 rounded-full mb-4">
              What We Do
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-green-800 mb-3 sm:mb-4">
              Our Integrated Services
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto text-sm sm:text-base lg:text-lg">
              From cultivation to refining, EMGO Farms controls the entire agricultural
              value chain to ensure quality consistency and sustainable impact.
            </p>
          </motion.div>

          {/* 1-col mobile → 2-col sm → 3-col lg */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-7">
            {services.map((service, idx) => (
              <motion.div
                key={service._id}
                initial={{ y: 40, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: idx * 0.12 }}
                className="rounded-2xl overflow-hidden shadow-md hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 bg-white border border-gray-100 group"
              >
                <div className="relative w-full h-44 sm:h-52 lg:h-56">
                  <Image
                    src={service.img}
                    alt={service.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-5 sm:p-7 lg:p-8">
                  <h3 className="text-lg sm:text-xl font-bold text-green-800 mb-2 sm:mb-3">
                    {service.title}
                  </h3>
                  <p className="text-gray-600 text-xs sm:text-sm leading-relaxed">
                    {service.description}
                  </p>
                  <Link
                    href="/services"
                    className="mt-4 inline-flex items-center gap-1 text-orange-500 font-semibold text-xs sm:text-sm hover:gap-2 transition-all duration-200"
                  >
                    Learn More →
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-8 sm:mt-10">
            <Link
              href="/services"
              className="inline-block px-7 sm:px-8 py-3 sm:py-3.5 border-2 border-green-800 text-green-800 hover:bg-green-800 hover:text-white rounded-xl font-semibold text-sm transition-all duration-200"
            >
              View All Services →
            </Link>
          </div>

        </div>
      </section>


      {/* ── WHY CHOOSE US ────────────────────────────────────── */}
      <section className="py-14 sm:py-18 lg:py-24 bg-green-50">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-10">

          <motion.div
            initial={{ y: 30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-10 sm:mb-12"
          >
            <span className="inline-block bg-green-100 text-green-800 text-xs font-bold tracking-widest uppercase px-4 py-1.5 rounded-full mb-4">
              Our Strengths
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-green-800">
              Our Integrated Approach
            </h2>
          </motion.div>

          {/* 2-col mobile, 3-col md+ */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3 sm:gap-5 lg:gap-6">
            {whyUsItems.map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ scale: 0.95, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.08 }}
                className="p-4 sm:p-6 lg:p-7 bg-white rounded-2xl shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 text-center border border-green-100"
              >
                <div className="text-2xl sm:text-3xl mb-2 sm:mb-3">{item.icon}</div>
                <h3 className="text-xs sm:text-sm lg:text-base font-semibold text-green-800 leading-snug">
                  {item.label}
                </h3>
              </motion.div>
            ))}
          </div>

        </div>
      </section>


      {/* ── STATS ─────────────────────────────────────────────── */}
      <section className="py-14 sm:py-18 lg:py-20 bg-green-800 text-white">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-10">

          {/* 2×2 mobile → 4-col md+ */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-10 text-center">
            {stats.map((stat, idx) => (
              <motion.div
                key={idx}
                initial={{ y: 30, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: idx * 0.1 }}
                className="flex flex-col items-center"
              >
                <h3 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-orange-400">
                  <Counter end={stat.target} suffix={stat.suffix} />
                </h3>
                <div className="w-8 h-0.5 bg-orange-400/50 rounded-full my-2 sm:my-3" />
                <p className="text-gray-300 text-xs sm:text-sm leading-snug">{stat.label}</p>
              </motion.div>
            ))}
          </div>

        </div>
      </section>


      {/* ── TRUST STRIP ───────────────────────────────────────── */}
      <section className="py-10 sm:py-12 lg:py-14 bg-white border-y border-gray-100">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-10 text-center">
          <p className="text-xs sm:text-sm font-semibold text-gray-400 uppercase tracking-widest mb-5 sm:mb-7">
            Trusted by communities across Akwa Ibom State & beyond
          </p>
          {/* Wraps cleanly on all screen sizes */}
          <div className="flex flex-wrap justify-center gap-x-6 sm:gap-x-10 gap-y-3 sm:gap-y-4">
            {trustBadges.map((badge, i) => (
              <span key={i} className="flex items-center gap-2 text-gray-500 text-xs sm:text-sm font-medium">
                <span className="w-2 h-2 rounded-full bg-green-400 inline-block flex-shrink-0" />
                {badge}
              </span>
            ))}
          </div>
        </div>
      </section>


      {/* ── FINAL CTA ─────────────────────────────────────────── */}
      <section className="py-14 sm:py-18 lg:py-24 bg-gradient-to-br from-orange-500 to-orange-600 text-white">
        <div className="max-w-4xl mx-auto px-5 sm:px-8 text-center">
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <span className="inline-block bg-white/15 border border-white/30 text-white text-xs font-bold tracking-widest uppercase px-4 py-1.5 rounded-full mb-4 sm:mb-5">
              Get Started
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-5xl font-bold mb-4 sm:mb-5 leading-tight">
              Partner With EMGO Farms
            </h2>
            <p className="text-orange-100 mb-8 sm:mb-10 text-sm sm:text-base lg:text-lg leading-relaxed max-w-2xl mx-auto">
              Join us in building a sustainable agro-industrial future through innovation,
              integration, and responsible agricultural practices across Nigeria and West Africa.
            </p>

            {/* Stacked on mobile, inline on sm+ */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
              <Link
                href="/contact"
                className="w-full sm:w-auto inline-flex items-center justify-center px-7 sm:px-8 py-3.5 sm:py-4 bg-green-900 hover:bg-green-950 text-white rounded-xl font-semibold text-sm sm:text-base transition-all duration-200 shadow-xl hover:scale-[1.03] active:scale-95"
              >
                Contact Us Today →
              </Link>
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 sm:px-8 py-3.5 sm:py-4 bg-[#25D366] hover:bg-[#1ebe5d] text-white rounded-xl font-semibold text-sm sm:text-base transition-all duration-200 shadow-xl hover:scale-[1.03] active:scale-95"
              >
                <FaWhatsapp size={18} />
                WhatsApp Us
              </a>
              <Link
                href="/about"
                className="w-full sm:w-auto inline-flex items-center justify-center px-7 sm:px-8 py-3.5 sm:py-4 border-2 border-white/60 hover:border-white text-white rounded-xl font-semibold text-sm sm:text-base transition-all duration-200 hover:bg-white/10"
              >
                Learn More
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

    </div>
  )
}