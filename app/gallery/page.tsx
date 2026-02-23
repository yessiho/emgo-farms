'use client'

import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import { useState } from "react"
import Lightbox from "yet-another-react-lightbox"
import "yet-another-react-lightbox/styles.css"

const galleryImages = [
  { src: "/image/oil-palm9.jpg",          alt: "Oil Palm Plantation - Nsit Atai" },
  { src: "/image/farm2.jpg",              alt: "High-Yield Oil Palm Trees" },
  { src: "/image/farm3.jpg",              alt: "Fresh Fruit Bunch Harvesting" },
  { src: "/image/farm4.jpg",              alt: "Palm Oil Processing Unit" },
  { src: "/image/farm5.jpg",              alt: "Palm Kernel Oil Refining Process" },
  { src: "/image/oil-palm2.webp",         alt: "Premium Oil Palm Fruits" },
  { src: "/image/palm-hero.jpg",          alt: "Integrated Farm Landscape" },
  { src: "/image/palm-oil-production.jpg",alt: "Refined Palm Oil Packaging" },
]

const nurseryImages = [
  { src: "/image/nursery1.jpg", alt: "Oil Palm Seedlings — Early Stage Germination" },
  { src: "/image/nursery2.jpg", alt: "Pre-Nursery Polybag Seedling Beds" },
  { src: "/image/nursery3.jpg", alt: "Main Nursery Oil Palm Transplants" },
  { src: "/image/nursery4.jpg", alt: "Irrigation System in Nursery" },
  { src: "/image/nursery5.jpg", alt: "Healthy Seedling Quality Check" },
  { src: "/image/nursery6.jpg", alt: "Cassava Stem Nursery Preparation" },
]

const nurseryStat = [
  { value: "10,000+", label: "Seedlings Raised Annually" },
  { value: "2",       label: "Nursery Stages (Pre & Main)" },
  { value: "6–9",     label: "Months to Transplant Readiness" },
  { value: "100%",    label: "Certified High-Yield Varieties" },
]

const valueHighlights = [
  { icon: "🌱", title: "Sustainable Cultivation", desc: "Responsible land use, soil regeneration, and zero-deforestation policy." },
  { icon: "⚙️", title: "Modern Processing",       desc: "Technology-driven refining systems ensuring premium quality output." },
  { icon: "🔗", title: "Integrated Value Chain",  desc: "From plantation to refining — full operational control and efficiency." },
]

const nurserySteps = [
  { step: "01", label: "Seed Sourcing",    desc: "NIFOR-certified high-yield seeds procured",       icon: "🌰" },
  { step: "02", label: "Pre-Nursery",      desc: "3 months in shaded polybag beds",                 icon: "🌱" },
  { step: "03", label: "Main Nursery",     desc: "6 months in open-sun main nursery",               icon: "🌿" },
  { step: "04", label: "Vigour Selection", desc: "Only healthy uniform seedlings selected",         icon: "✅" },
  { step: "05", label: "Field Transplant", desc: "Seedlings planted into prepared plantation rows", icon: "🌴" },
]

const ExpandIcon = () => (
  <svg className="w-3 h-3 sm:w-4 sm:h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
      d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
  </svg>
)

export default function GalleryPage() {
  const [open, setOpen] = useState(false)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [lightboxImages, setLightboxImages] = useState(galleryImages)

  const openGallery = (images: typeof galleryImages, idx: number) => {
    setLightboxImages(images)
    setCurrentIndex(idx)
    setOpen(true)
  }

  return (
    <div className="min-h-screen bg-white text-gray-800 font-sans">

      {/* ── HERO ─────────────────────────────────────────────── */}
      <section className="relative h-[60vh] sm:h-[65vh] lg:h-[70vh] bg-[url('/image/product1.jpg')] bg-cover bg-center flex items-center justify-center">
        <div className="absolute inset-0 bg-black/60" />
        <div className="relative text-center px-5 sm:px-8 max-w-4xl mx-auto">
          <motion.span
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="inline-block bg-orange-500/80 backdrop-blur-sm text-white text-xs font-bold tracking-widest uppercase px-4 py-1.5 rounded-full mb-4 sm:mb-5"
          >
            Gallery & Nursery
          </motion.span>

          <motion.h1
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1, delay: 0.1 }}
            className="text-white text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-4 sm:mb-6"
          >
            Rooted in Purpose. <br className="hidden sm:block" />
            <span className="text-orange-400">Growing with Vision.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="text-gray-200 max-w-2xl mx-auto text-sm sm:text-base lg:text-lg leading-relaxed"
          >
            A visual journey through EMGO Farms' integrated agro-industrial operations —
            from cultivation to refining excellence.
          </motion.p>
        </div>
      </section>


      {/* ── COMPANY OVERVIEW ──────────────────────────────────── */}
      <section className="py-14 sm:py-16 lg:py-20 bg-green-50">
        <div className="max-w-5xl mx-auto px-5 sm:px-8 lg:px-10 text-center">

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="mb-6 sm:mb-8"
          >
            <span className="inline-block bg-green-100 text-green-800 text-xs font-bold tracking-widest uppercase px-4 py-1.5 rounded-full mb-4">
              Our Ecosystem
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-green-800">
              Our Integrated Agricultural Ecosystem
            </h2>
          </motion.div>

          <div className="space-y-4 sm:space-y-5 text-left sm:text-center">
            {[
              "EMGO Farms and Integrated Services Limited operates from the fertile soils of Nsit Atai, Akwa Ibom State, Nigeria — building a scalable, technology-driven, and sustainability-focused agro-industrial enterprise.",
              "Our long-term objective includes cultivating over 10,000 high-yield oil palm trees, establishing a modern palm oil and palm kernel oil refining plant, and developing a fully integrated value chain.",
              "Beyond oil palm, our diversified ecosystem includes cassava cultivation for starch production, ginger and other cash crops, and sustainable animal husbandry — ensuring circular agriculture and long-term value creation.",
            ].map((text, i) => (
              <motion.p
                key={i}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: i * 0.12 }}
                className="text-gray-700 text-sm sm:text-base lg:text-lg leading-relaxed"
              >
                {text}
              </motion.p>
            ))}
          </div>
        </div>
      </section>


      {/* ── VALUE HIGHLIGHTS ──────────────────────────────────── */}
      <section className="py-10 sm:py-14 lg:py-16 bg-white">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-10">
          {/* Row on mobile (icon + text inline), column-card on sm+ */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-8 lg:gap-10">
            {valueHighlights.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: i * 0.13 }}
                className="flex sm:flex-col items-start sm:items-center gap-4 sm:gap-0 p-5 sm:p-8 bg-green-50 rounded-2xl shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300 sm:text-center"
              >
                <div className="text-3xl sm:text-4xl sm:mb-4 flex-shrink-0">{item.icon}</div>
                <div>
                  <h3 className="text-base sm:text-xl font-semibold text-green-800 mb-1 sm:mb-3">{item.title}</h3>
                  <p className="text-gray-600 text-sm sm:text-base leading-relaxed">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>


      {/* ── MAIN GALLERY GRID ─────────────────────────────────── */}
      <section className="py-12 sm:py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-10">

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-7 sm:mb-10 lg:mb-12"
          >
            <span className="inline-block bg-orange-100 text-orange-700 text-xs font-bold tracking-widest uppercase px-4 py-1.5 rounded-full mb-3">
              Photo Gallery
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-green-800">Farm Operations</h2>
          </motion.div>

          {/* 2-col mobile → 3-col md → 4-col lg */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2.5 sm:gap-4 lg:gap-6">
            {galleryImages.map((img, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.06 }}
                className="relative cursor-pointer overflow-hidden rounded-xl sm:rounded-2xl shadow-md sm:shadow-lg group"
                onClick={() => openGallery(galleryImages, idx)}
              >
                <Image
                  src={img.src}
                  alt={img.alt}
                  width={500}
                  height={500}
                  className="object-cover w-full h-32 sm:h-52 lg:h-60 transition-transform duration-500 group-hover:scale-110 group-hover:brightness-75"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-end p-2.5 sm:p-4">
                  <p className="text-white text-xs sm:text-sm font-medium leading-snug">{img.alt}</p>
                </div>
                <div className="absolute top-2 right-2 sm:top-3 sm:right-3 bg-white/20 backdrop-blur-sm rounded-full p-1.5 sm:p-2 opacity-0 group-hover:opacity-100 transition-all duration-300">
                  <ExpandIcon />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>


      {/* ── FARM NURSERY ──────────────────────────────────────── */}
      <section className="py-14 sm:py-20 lg:py-28 bg-green-50">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-10">

          {/* Header */}
          <motion.div
            initial={{ y: 40, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-10 sm:mb-14 lg:mb-20"
          >
            <span className="inline-block bg-green-100 text-green-700 text-xs sm:text-sm font-semibold tracking-widest uppercase px-4 sm:px-5 py-1.5 sm:py-2 rounded-full mb-4 sm:mb-6">
              Where It All Begins
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-green-800 mb-4 sm:mb-6">
              Farm Nursery
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto text-sm sm:text-base lg:text-lg leading-relaxed">
              Every great plantation begins in the nursery. At EMGO Farms, we maintain
              a carefully managed nursery system using certified high-yield oil palm and cassava
              varieties — giving every seedling the best possible start before transplanting to the field.
            </p>
          </motion.div>

          {/* Stats — 2-col mobile, 4-col md+ */}
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-6 mb-10 sm:mb-14 lg:mb-20"
          >
            {nurseryStat.map((stat, idx) => (
              <div
                key={idx}
                className="bg-white rounded-2xl p-5 sm:p-7 lg:p-8 text-center shadow-md border border-green-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
              >
                <p className="text-2xl sm:text-3xl lg:text-4xl font-bold text-green-800 mb-1 sm:mb-2">{stat.value}</p>
                <p className="text-gray-500 text-xs sm:text-sm leading-snug">{stat.label}</p>
              </div>
            ))}
          </motion.div>

          {/* Two-Stage — 1-col mobile, 2-col md+ */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-8 lg:gap-10 mb-10 sm:mb-14 lg:mb-20">

            <motion.div
              initial={{ x: -40, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="bg-white rounded-3xl p-6 sm:p-10 shadow-lg border border-green-100 hover:shadow-2xl transition-all duration-300"
            >
              <div className="text-4xl sm:text-5xl mb-4 sm:mb-5">🌱</div>
              <h3 className="text-xl sm:text-2xl font-bold text-green-800 mb-3 sm:mb-4">Stage 1 — Pre-Nursery</h3>
              <div className="w-10 h-1 bg-green-400 rounded-full mb-4 sm:mb-5" />
              <p className="text-gray-600 leading-relaxed mb-4 text-sm sm:text-base">
                Germinated seeds are placed in small polybags under shade structures for{" "}
                <strong className="text-green-800">3 months</strong>. Careful watering schedules and pest monitoring ensure healthy root development.
              </p>
              <ul className="space-y-2 text-gray-600 text-xs sm:text-sm">
                {["Certified NIFOR-sourced seed varieties", "Shaded polybag germination beds", "Daily irrigation & nutrient monitoring", "Disease and pest screening"].map((item, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="text-green-600 font-bold mt-0.5 flex-shrink-0">✔</span>{item}
                  </li>
                ))}
              </ul>
            </motion.div>

            <motion.div
              initial={{ x: 40, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="bg-green-800 text-white rounded-3xl p-6 sm:p-10 shadow-lg hover:shadow-2xl transition-all duration-300"
            >
              <div className="text-4xl sm:text-5xl mb-4 sm:mb-5">🌿</div>
              <h3 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4">Stage 2 — Main Nursery</h3>
              <div className="w-10 h-1 bg-green-400 rounded-full mb-4 sm:mb-5" />
              <p className="text-green-100 leading-relaxed mb-4 text-sm sm:text-base">
                Pre-nursery seedlings are transferred to larger polybags and grown for a further{" "}
                <strong className="text-white">6 months</strong> under open sunlight, with controlled fertilisation and structured weeding.
              </p>
              <ul className="space-y-2 text-green-200 text-xs sm:text-sm">
                {["Larger polybag transplants with rich soil mix", "Open-field sun acclimatisation", "Fertiliser application schedule", "Selection of only vigorous, uniform seedlings"].map((item, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="text-green-400 font-bold mt-0.5 flex-shrink-0">✔</span>{item}
                  </li>
                ))}
              </ul>
            </motion.div>

          </div>

          {/* Nursery Gallery */}
          <motion.div
            initial={{ y: 40, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="mb-10 sm:mb-14 lg:mb-16"
          >
            <div className="text-center mb-5 sm:mb-8 lg:mb-10">
              <h3 className="text-xl sm:text-2xl font-bold text-green-800 mb-1 sm:mb-2">Nursery Gallery</h3>
            </div>

            {/* 2-col mobile, 3-col md+ */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-2.5 sm:gap-5">
              {nurseryImages.map((img, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, scale: 0.96 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.08 }}
                  className="relative cursor-pointer overflow-hidden rounded-xl sm:rounded-2xl shadow-md group"
                  onClick={() => openGallery(nurseryImages, idx)}
                >
                  <Image
                    src={img.src}
                    alt={img.alt}
                    width={600}
                    height={400}
                    className="object-cover w-full h-32 sm:h-52 lg:h-60 transition-transform duration-500 group-hover:scale-110 group-hover:brightness-75"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-green-900/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-end p-2.5 sm:p-5">
                    <div>
                      <span className="text-xs font-semibold text-green-300 uppercase tracking-widest block mb-0.5 sm:mb-1 hidden sm:block">Farm Nursery</span>
                      <p className="text-white text-xs sm:text-sm font-medium leading-snug">{img.alt}</p>
                    </div>
                  </div>
                  <div className="absolute top-2 right-2 sm:top-3 sm:right-3 bg-white/20 backdrop-blur-sm rounded-full p-1.5 sm:p-2 opacity-0 group-hover:opacity-100 transition-all duration-300">
                    <ExpandIcon />
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Seedling Journey — vertical stepper mobile, horizontal row md+ */}
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="bg-white rounded-3xl border border-green-100 shadow-lg px-5 sm:px-8 lg:px-10 py-7 sm:py-10"
          >
            <h4 className="text-center text-xs sm:text-sm lg:text-base font-bold text-green-800 mb-7 sm:mb-10 tracking-wide uppercase">
              Seedling Journey — From Seed to Field
            </h4>

            {/* Mobile vertical stepper */}
            <div className="flex flex-col gap-0 md:hidden">
              {nurserySteps.map((item, idx, arr) => (
                <div key={idx} className="flex items-start gap-4">
                  <div className="flex flex-col items-center flex-shrink-0">
                    <div className="w-11 h-11 bg-green-50 border-2 border-green-200 rounded-full flex items-center justify-center text-xl shadow-sm">
                      {item.icon}
                    </div>
                    {idx < arr.length - 1 && (
                      <div className="w-0.5 h-8 bg-green-200 my-1" />
                    )}
                  </div>
                  <div className="pb-6">
                    <span className="text-xs font-bold text-green-600 tracking-widest uppercase block">Step {item.step}</span>
                    <p className="text-sm font-bold text-green-800 mt-0.5">{item.label}</p>
                    <p className="text-xs text-gray-400 leading-snug mt-0.5">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Desktop horizontal row */}
            <div className="hidden md:flex items-start justify-between gap-3">
              {nurserySteps.map((item, idx, arr) => (
                <div key={idx} className="flex items-start gap-3 flex-1">
                  <div className="flex flex-col items-center text-center flex-1">
                    <div className="w-14 h-14 bg-green-50 border-2 border-green-200 rounded-full flex items-center justify-center text-2xl mb-3 shadow-sm">
                      {item.icon}
                    </div>
                    <span className="text-xs font-bold text-green-600 tracking-widest uppercase mb-1">Step {item.step}</span>
                    <p className="text-sm font-bold text-green-800 mb-1">{item.label}</p>
                    <p className="text-xs text-gray-400 leading-snug">{item.desc}</p>
                  </div>
                  {idx < arr.length - 1 && (
                    <div className="text-green-300 text-xl flex-shrink-0 pt-4">→</div>
                  )}
                </div>
              ))}
            </div>
          </motion.div>

        </div>
      </section>


      {/* LIGHTBOX */}
      <Lightbox
        open={open}
        index={currentIndex}
        close={() => setOpen(false)}
        slides={lightboxImages.map((img) => ({ src: img.src, alt: img.alt }))}
      />


      {/* ── ESG SECTION ───────────────────────────────────────── */}
      <section className="py-14 sm:py-16 lg:py-20 bg-green-800 text-white">
        <div className="max-w-4xl mx-auto px-5 sm:px-8 lg:px-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <span className="inline-block bg-white/10 border border-white/20 text-green-200 text-xs font-bold tracking-widest uppercase px-4 py-1.5 rounded-full mb-4 sm:mb-5">
              Our Commitment
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4 sm:mb-5">
              Sustainability in Action
            </h2>
            <p className="text-sm sm:text-base lg:text-lg text-gray-200 leading-relaxed">
              Our Environmental, Social, and Governance (ESG) framework ensures that
              every stage of our operations protects ecosystems, empowers communities,
              and upholds ethical governance standards — reinforcing our commitment to
              long-term agricultural transformation in Nigeria and West Africa.
            </p>
          </motion.div>
        </div>
      </section>


      {/* ── CTA SECTION ───────────────────────────────────────── */}
      <section className="py-14 sm:py-16 lg:py-20 bg-white">
        <div className="max-w-3xl mx-auto px-5 sm:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-green-800 mb-3 sm:mb-4">
              Partner With EMGO Farms
            </h2>
            <p className="text-gray-600 text-sm sm:text-base max-w-xl mx-auto mb-7 sm:mb-8 leading-relaxed">
              Whether you are an investor, distributor, institutional buyer, or strategic partner —
              we welcome collaborations that align with sustainable growth and premium agro-industrial excellence.
            </p>

            {/* Stacked on mobile, inline on sm+ */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/contact"
                className="w-full sm:w-auto inline-block px-8 sm:px-10 py-3.5 sm:py-4 bg-orange-500 text-white rounded-full font-semibold text-sm sm:text-base hover:bg-orange-600 transition-all duration-200 shadow-lg hover:scale-[1.03] active:scale-95"
              >
                Contact Us →
              </Link>
              <Link
                href="/about"
                className="w-full sm:w-auto inline-block px-8 sm:px-10 py-3.5 sm:py-4 border-2 border-green-800 text-green-800 rounded-full font-semibold text-sm sm:text-base hover:bg-green-800 hover:text-white transition-all duration-200"
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