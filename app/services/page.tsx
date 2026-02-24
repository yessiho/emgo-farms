'use client'

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"
import Link from "next/link"

const services = [
  {
    id: 1,
    title: "Oil Palm Farming",
    image: "/image/gallery11.jpg",
    short: "Sustainable plantation management and premium oil palm cultivation.",
    details:
      "Our oil palm farming division operates large-scale plantations using advanced agronomic techniques and environmentally responsible practices. From seed selection and nursery development to harvesting and logistics, we implement precision agriculture methods that maximize yield while preserving soil health and biodiversity. Our farms integrate irrigation systems, pest management strategies, and data-driven crop monitoring to ensure consistent productivity and long-term sustainability.",
    process: [
      "Land preparation and soil analysis",
      "High-quality seedling cultivation",
      "Smart irrigation and nutrient management",
      "Integrated pest and disease control",
      "Sustainable harvesting and supply chain coordination",
    ],
    benefits: [
      "High-yield plantation systems",
      "Environmentally responsible cultivation",
      "Traceable farm-to-mill operations",
      "Consistent raw material supply",
    ],
    icon: "🌴",
    accent: "from-green-800 to-green-700",
  },
  {
    id: 2,
    title: "Palm Oil Production",
    image: "/image/gallery2.jpg",
    short: "Modern extraction and processing for premium-grade palm oil.",
    details:
      "Our palm oil production facilities are equipped with modern extraction and processing technology designed to deliver efficiency, purity, and quality consistency. We apply strict quality assurance protocols at every stage — from sterilization and threshing to pressing and clarification. Our processes meet international food safety standards and are optimized to maintain nutritional value while achieving maximum extraction efficiency.",
    process: [
      "Fresh fruit bunch sterilization",
      "Mechanical threshing and digestion",
      "High-efficiency oil pressing",
      "Clarification and filtration",
      "Quality testing and packaging",
    ],
    benefits: [
      "Premium food-grade oil quality",
      "Industrial-scale production capacity",
      "Compliance with global standards",
      "Reliable bulk supply for manufacturers",
    ],
    icon: "⚗️",
    accent: "from-orange-600 to-orange-500",
  },
  {
    id: 3,
    title: "Palm Kernel Oil Refining",
    image: "/image/gallery8.jpg",
    short: "Refined palm kernel oil for food, cosmetic, and industrial sectors.",
    details:
      "Our palm kernel oil refining process ensures high-purity output suitable for diverse applications including food processing, cosmetics, pharmaceuticals, and biofuel production. Through controlled filtration, deodorization, and fractionation processes, we remove impurities while preserving functional properties. We maintain strict safety standards and laboratory testing to guarantee product integrity and performance reliability.",
    process: [
      "Kernel crushing and oil extraction",
      "Controlled filtration and purification",
      "Deodorization and refining",
      "Fractionation for industry-specific applications",
      "Laboratory quality certification",
    ],
    benefits: [
      "Multi-industry applicability",
      "High-purity refined output",
      "Strict safety compliance",
      "Export-ready quality standards",
    ],
    icon: "🔬",
    accent: "from-green-700 to-teal-600",
  },
]

const trustPoints = [
  { icon: "🏆", label: "Premium Quality", desc: "Every product meets rigorous quality standards before leaving our facility." },
  { icon: "🌱", label: "Eco-Responsible", desc: "Sustainable practices woven into every stage of our operations." },
  { icon: "🔗", label: "Full Traceability", desc: "End-to-end traceability from plantation to finished product." },
  { icon: "🌍", label: "Export Ready", desc: "Products that meet international standards for global markets." },
]

export default function ServicesPage() {
  const [active, setActive] = useState<number | null>(null)

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white font-sans text-gray-800">

      {/* ── HERO ─────────────────────────────────────────────── */}
      <section
        className="relative h-60 sm:h-80 md:h-[400px] lg:h-[450px] bg-cover bg-center flex items-center justify-center"
        style={{ backgroundImage: "url('/image/gallery6.jpg')" }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-green-900/90 via-green-800/70 to-orange-600/60" />

        <div className="relative text-center px-5 sm:px-8 max-w-3xl mx-auto">
          <motion.span
            initial={{ opacity: 0, y: -15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="inline-block bg-orange-500/80 backdrop-blur-sm text-white text-xs font-bold tracking-widest uppercase px-4 py-1.5 rounded-full mb-3 sm:mb-4"
          >
            What We Offer
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.1 }}
            className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-white mb-3 sm:mb-4 leading-tight"
          >
            Our Professional Services
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.4 }}
            className="text-white text-sm sm:text-base lg:text-xl opacity-90 max-w-2xl mx-auto leading-relaxed"
          >
            Delivering excellence across the entire palm oil value chain — from sustainable farming to refined production.
          </motion.p>
        </div>
      </section>


      {/* ── COMPANY WRITE-UP ──────────────────────────────────── */}
      <section className="py-12 sm:py-16 lg:py-20">
        <div className="max-w-4xl mx-auto px-5 sm:px-8 lg:px-10 text-center">

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="mb-5 sm:mb-6"
          >
            <span className="inline-block bg-green-100 text-green-800 text-xs font-bold tracking-widest uppercase px-4 py-1.5 rounded-full mb-3 sm:mb-4">
              About Us
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
              Founded in August 2020, EMGO Farms started with a small 4-acre farm in Ogun State and has expanded
              to 5 hectares in Uyo, Akwa Ibom, aiming to plant 10,000 oil palms by 2030. We are committed to
              sustainable farming, eco-friendly production, and community empowerment.
            </motion.p>
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-gray-700 text-sm sm:text-base lg:text-lg leading-relaxed"
            >
              Our integrated operations — from cultivation to refined oil production — ensure efficiency,
              traceability, and consistent quality. Using modern agronomic techniques, environmentally
              responsible practices, and cutting-edge processing technology, EMGO Farms delivers premium
              palm oil and kernel oil to local and international markets.
            </motion.p>
          </div>

        </div>
      </section>


      {/* ── SERVICES ACCORDION ────────────────────────────────── */}
      <section className="pb-14 sm:pb-18 lg:pb-20">
        <div className="max-w-5xl mx-auto px-5 sm:px-8 lg:px-10 space-y-5 sm:space-y-8 lg:space-y-10">

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-8 sm:mb-10"
          >
            <span className="inline-block bg-orange-100 text-orange-700 text-xs font-bold tracking-widest uppercase px-4 py-1.5 rounded-full mb-3">
              Our Services
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-green-800">
              What We Do Best
            </h2>
            <p className="text-gray-500 text-xs sm:text-sm mt-2">Tap a service to learn more</p>
          </motion.div>

          {services.map((service, idx) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: idx * 0.1 }}
              className="bg-white rounded-2xl sm:rounded-3xl shadow-lg overflow-hidden border border-gray-100 hover:shadow-2xl transition-shadow duration-300"
            >
              {/* ── Card Header (tap/click target) ── */}
              <button
                className="w-full text-left focus:outline-none"
                onClick={() => setActive(active === service.id ? null : service.id)}
                aria-expanded={active === service.id}
              >
                <div className="flex flex-col sm:flex-row">

                  {/* Image — full width on mobile, 1/3 on sm+ */}
                  <div className="relative w-full sm:w-1/3 h-48 sm:h-auto sm:min-h-[200px] lg:min-h-[240px] flex-shrink-0">
                    <Image
                      src={service.image}
                      alt={service.title}
                      fill
                      className="object-cover"
                    />
                    {/* Gradient overlay on mobile bottom */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent sm:hidden" />
                  </div>

                  {/* Text + toggle */}
                  <div className="flex-1 p-5 sm:p-7 lg:p-8 flex items-center justify-between gap-4">
                    <div className="flex items-start gap-4 sm:gap-5">
                      {/* Icon badge */}
                      <div className={`hidden sm:flex w-12 h-12 lg:w-14 lg:h-14 rounded-2xl bg-gradient-to-br ${service.accent} items-center justify-center text-2xl shadow-md flex-shrink-0`}>
                        {service.icon}
                      </div>
                      <div>
                        <div className="flex items-center gap-2 mb-1 sm:mb-2">
                          <span className="text-lg sm:hidden">{service.icon}</span>
                          <h3 className="text-lg sm:text-2xl lg:text-3xl font-bold text-green-800 leading-tight">
                            {service.title}
                          </h3>
                        </div>
                        <p className="text-gray-500 text-sm sm:text-base leading-relaxed">
                          {service.short}
                        </p>
                      </div>
                    </div>

                    {/* Expand/collapse chevron */}
                    <div className={`flex-shrink-0 w-9 h-9 sm:w-10 sm:h-10 rounded-full border-2 flex items-center justify-center transition-all duration-300 ${
                      active === service.id
                        ? "bg-green-800 border-green-800 text-white rotate-180"
                        : "border-gray-200 text-gray-400 hover:border-green-400 hover:text-green-600"
                    }`}>
                      <svg className="w-4 h-4 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
                      </svg>
                    </div>
                  </div>

                </div>
              </button>

              {/* ── Expandable Detail Panel ── */}
              <AnimatePresence>
                {active === service.id && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.45, ease: "easeInOut" }}
                    className="overflow-hidden"
                  >
                    <div className="px-5 sm:px-7 lg:px-10 pb-7 sm:pb-8 lg:pb-10 border-t border-gray-100">

                      {/* Detail text */}
                      <p className="mt-5 sm:mt-6 text-gray-600 leading-relaxed text-sm sm:text-base">
                        {service.details}
                      </p>

                      {/* Process + Benefits — stacked on mobile, side-by-side on md+ */}
                      <div className="mt-7 sm:mt-8 grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">

                        {/* Process */}
                        <div className="bg-green-50 rounded-2xl p-5 sm:p-6">
                          <h4 className="text-base sm:text-lg font-bold text-green-800 mb-4 flex items-center gap-2">
                            <span className="w-7 h-7 bg-green-800 rounded-lg flex items-center justify-center text-white text-xs">→</span>
                            Our Process
                          </h4>
                          <ul className="space-y-2.5">
                            {service.process.map((step, index) => (
                              <li key={index} className="flex items-start gap-2.5 text-gray-600 text-sm sm:text-base">
                                <span className="w-5 h-5 rounded-full bg-green-200 text-green-800 font-bold text-xs flex items-center justify-center flex-shrink-0 mt-0.5">
                                  {index + 1}
                                </span>
                                {step}
                              </li>
                            ))}
                          </ul>
                        </div>

                        {/* Benefits */}
                        <div className="bg-orange-50 rounded-2xl p-5 sm:p-6">
                          <h4 className="text-base sm:text-lg font-bold text-orange-700 mb-4 flex items-center gap-2">
                            <span className="w-7 h-7 bg-orange-500 rounded-lg flex items-center justify-center text-white text-xs">★</span>
                            Key Benefits
                          </h4>
                          <ul className="space-y-2.5">
                            {service.benefits.map((benefit, index) => (
                              <li key={index} className="flex items-start gap-2.5 text-gray-600 text-sm sm:text-base">
                                <span className="text-orange-400 font-bold mt-0.5 flex-shrink-0">✔</span>
                                {benefit}
                              </li>
                            ))}
                          </ul>
                        </div>

                      </div>

                      {/* CTA */}
                      <div className="mt-7 sm:mt-8 flex flex-col sm:flex-row gap-3">
                        <Link
                          href="/contact"
                          className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 sm:px-8 py-3.5 bg-orange-500 text-white rounded-full font-semibold text-sm sm:text-base hover:bg-orange-600 transition-all duration-200 shadow-lg hover:scale-[1.02] active:scale-95"
                        >
                          Request This Service →
                        </Link>
                        <Link
                          href="/about"
                          className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 sm:px-8 py-3.5 border-2 border-green-800 text-green-800 rounded-full font-semibold text-sm sm:text-base hover:bg-green-800 hover:text-white transition-all duration-200"
                        >
                          Learn About Us
                        </Link>
                      </div>

                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

            </motion.div>
          ))}

        </div>
      </section>


      {/* ── TRUST SECTION ─────────────────────────────────────── */}
      <section className="py-12 sm:py-16 lg:py-20 bg-green-100">
        <div className="max-w-6xl mx-auto px-5 sm:px-8 lg:px-10">

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-10 sm:mb-12"
          >
            <span className="inline-block bg-green-200 text-green-800 text-xs font-bold tracking-widest uppercase px-4 py-1.5 rounded-full mb-3 sm:mb-4">
              Our Strengths
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-green-800 mb-3 sm:mb-4">
              Why Choose EMGO Farms?
            </h2>
            <p className="text-gray-700 text-sm sm:text-base lg:text-lg leading-relaxed max-w-3xl mx-auto">
              EMGO Farms combines sustainable agriculture, modern processing technology, strict quality control,
              and a strong logistics network to ensure premium products and dependable service. Our integrated
              approach guarantees traceability, consistency, and long-term partnership value for clients worldwide.
            </p>
          </motion.div>

          {/* 2-col on mobile, 4-col on md+ */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
            {trustPoints.map((point, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
                className="bg-white rounded-2xl p-5 sm:p-7 text-center shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 border border-green-100"
              >
                <div className="text-3xl sm:text-4xl mb-3">{point.icon}</div>
                <h3 className="text-sm sm:text-base font-bold text-green-800 mb-1 sm:mb-2">{point.label}</h3>
                <p className="text-gray-500 text-xs sm:text-sm leading-snug">{point.desc}</p>
              </motion.div>
            ))}
          </div>

        </div>
      </section>


      {/* ── CTA SECTION ───────────────────────────────────────── */}
      <section className="py-14 sm:py-16 lg:py-20 bg-green-900 text-white">
        <div className="max-w-3xl mx-auto px-5 sm:px-8 lg:px-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <span className="inline-block bg-white/10 border border-white/20 text-green-200 text-xs font-bold tracking-widest uppercase px-4 py-1.5 rounded-full mb-4 sm:mb-5">
              Partner With Us
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4 sm:mb-5 leading-tight">
              Let's Build a Sustainable Future Together
            </h2>
            <p className="text-sm sm:text-base lg:text-lg text-green-200 mb-8 sm:mb-10 max-w-xl mx-auto leading-relaxed opacity-90">
              Whether you need raw palm materials, refined oils, or full-scale agricultural partnership,
              EMGO Farms delivers excellence with integrity.
            </p>

            {/* Stacked on mobile, inline on sm+ */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/contact"
                className="w-full sm:w-auto inline-block px-8 sm:px-10 py-3.5 sm:py-4 bg-orange-500 hover:bg-orange-600 text-white rounded-full font-semibold text-sm sm:text-base transition-all duration-200 shadow-xl hover:scale-[1.03] active:scale-95"
              >
                Get In Touch Today →
              </Link>
              <Link
                href="/products"
                className="w-full sm:w-auto inline-block px-8 sm:px-10 py-3.5 sm:py-4 border-2 border-white/50 hover:border-white text-white rounded-full font-semibold text-sm sm:text-base transition-all duration-200 hover:bg-white/10"
              >
                View Our Products
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

    </div>
  )
}