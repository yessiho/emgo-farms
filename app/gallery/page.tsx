'use client'

import Image from "next/image"
import { motion } from "framer-motion"
import { useState } from "react"
import Lightbox from "yet-another-react-lightbox"
import "yet-another-react-lightbox/styles.css"

const galleryImages = [
  { src: "/image/oil-palm9.jpg", alt: "Oil Palm Plantation - Nsit Atai" },
  { src: "/image/farm2.jpg", alt: "High-Yield Oil Palm Trees" },
  { src: "/image/farm3.jpg", alt: "Fresh Fruit Bunch Harvesting" },
  { src: "/image/farm4.jpg", alt: "Palm Oil Processing Unit" },
  { src: "/image/farm5.jpg", alt: "Palm Kernel Oil Refining Process" },
  { src: "/image/oil-palm2.webp", alt: "Premium Oil Palm Fruits" },
  { src: "/image/palm-hero.jpg", alt: "Integrated Farm Landscape" },
  { src: "/image/palm-oil-production.jpg", alt: "Refined Palm Oil Packaging" },
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
  { value: "2", label: "Nursery Stages (Pre & Main)" },
  { value: "6–9", label: "Months to Transplant Readiness" },
  { value: "100%", label: "Certified High-Yield Varieties" },
]

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

      {/* HERO SECTION */}
      <section className="relative h-[70vh] bg-[url('/image/product1.jpg')] bg-cover bg-center flex items-center justify-center">
        <div className="absolute inset-0 bg-black/60"></div>
        <div className="relative text-center px-6">
          <motion.h1
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1 }}
            className="text-white text-4xl md:text-6xl font-bold leading-tight"
          >
            Rooted in Purpose. <br />
            Growing with Vision.
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="text-gray-200 mt-6 max-w-3xl mx-auto text-lg"
          >
            A visual journey through EMGO Farms' integrated agro-industrial operations —
            from cultivation to refining excellence.
          </motion.p>
        </div>
      </section>

      {/* COMPANY OVERVIEW */}
      <section className="py-20 bg-green-50">
        <div className="container mx-auto px-6 text-center max-w-5xl">

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="text-4xl font-bold text-green-800 mb-8"
          >
            Our Integrated Agricultural Ecosystem
          </motion.h2>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.2 }}
            className="text-gray-700 text-lg leading-relaxed mb-6"
          >
            EMGO Farms and Integrated Services Limited operates from the fertile soils of
            Nsit Atai, Akwa Ibom State, Nigeria — building a scalable, technology-driven,
            and sustainability-focused agro-industrial enterprise.
          </motion.p>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.4 }}
            className="text-gray-700 text-lg leading-relaxed mb-6"
          >
            Our long-term objective includes cultivating over 10,000 high-yield oil palm trees,
            establishing a modern palm oil and palm kernel oil refining plant,
            and developing a fully integrated value chain that transforms raw agricultural produce
            into premium finished products for local and international markets.
          </motion.p>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.6 }}
            className="text-gray-700 text-lg leading-relaxed"
          >
            Beyond oil palm, our diversified ecosystem includes cassava cultivation
            for starch production, ginger and other cash crops, and sustainable animal husbandry —
            ensuring circular agriculture, resource efficiency, and long-term value creation.
          </motion.p>
        </div>
      </section>

      {/* VALUE HIGHLIGHTS */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-6 grid md:grid-cols-3 gap-10 text-center">

          {[
            { title: "Sustainable Cultivation", desc: "Responsible land use, soil regeneration, and zero-deforestation policy." },
            { title: "Modern Processing", desc: "Technology-driven refining systems ensuring premium quality output." },
            { title: "Integrated Value Chain", desc: "From plantation to refining — full operational control and efficiency." },
          ].map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: i * 0.2 }}
              className="p-8 bg-green-50 rounded-xl shadow-md hover:shadow-xl transition"
            >
              <h3 className="text-xl font-semibold text-green-800 mb-4">
                {item.title}
              </h3>
              <p className="text-gray-600">{item.desc}</p>
            </motion.div>
          ))}

        </div>
      </section>

      {/* GALLERY GRID */}
      <section className="py-20 container mx-auto px-6">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
        >
          {galleryImages.map((img, idx) => (
            <motion.div
              key={idx}
              className="relative cursor-pointer overflow-hidden rounded-xl shadow-lg group"
              whileHover={{ scale: 1.05 }}
              onClick={() => openGallery(galleryImages, idx)}
            >
              <Image
                src={img.src}
                alt={img.alt}
                width={500}
                height={500}
                className="object-cover w-full h-64 transition-transform duration-500 group-hover:brightness-75"
              />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition flex items-end p-4">
                <p className="text-white text-sm font-medium">
                  {img.alt}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </section>


      {/* ── FARM NURSERY SECTION ── */}
      <section className="py-28 bg-green-50">
        <div className="container mx-auto px-6">

          {/* Section Header */}
          <motion.div
            initial={{ y: 40, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-20"
          >
            <span className="inline-block bg-green-100 text-green-700 text-sm font-semibold tracking-widest uppercase px-5 py-2 rounded-full mb-6">
              Where It All Begins
            </span>
            <h2 className="text-4xl md:text-5xl font-bold text-green-800 mb-6">
              Farm Nursery
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto text-lg leading-relaxed">
              Every great plantation begins in the nursery. At EMGO Farms, we maintain 
              a carefully managed nursery system using certified high-yield oil palm and cassava 
              varieties — giving every seedling the best possible start before transplanting to the field.
            </p>
          </motion.div>

          {/* Nursery Stats Row */}
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-20"
          >
            {nurseryStat.map((stat, idx) => (
              <div
                key={idx}
                className="bg-white rounded-2xl p-8 text-center shadow-md border border-green-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
              >
                <p className="text-4xl font-bold text-green-800 mb-2">{stat.value}</p>
                <p className="text-gray-500 text-sm leading-snug">{stat.label}</p>
              </div>
            ))}
          </motion.div>

          {/* Nursery Two-Stage Explanation */}
          <div className="grid md:grid-cols-2 gap-10 mb-20">

            <motion.div
              initial={{ x: -40, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="bg-white rounded-3xl p-10 shadow-lg border border-green-100 hover:shadow-2xl transition-all duration-300"
            >
              <div className="text-5xl mb-5">🌱</div>
              <h3 className="text-2xl font-bold text-green-800 mb-4">Stage 1 — Pre-Nursery</h3>
              <div className="w-10 h-1 bg-green-400 rounded-full mb-5"></div>
              <p className="text-gray-600 leading-relaxed mb-4">
                Germinated seeds are individually placed in small polybags and maintained under shade 
                structures for <strong className="text-green-800">3 months</strong>. During this stage, 
                careful watering schedules and pest monitoring ensure healthy root development.
              </p>
              <ul className="space-y-2 text-gray-600 text-sm">
                <li className="flex items-start gap-2"><span className="text-green-600 font-bold mt-0.5">✔</span> Certified NIFOR-sourced seed varieties</li>
                <li className="flex items-start gap-2"><span className="text-green-600 font-bold mt-0.5">✔</span> Shaded polybag germination beds</li>
                <li className="flex items-start gap-2"><span className="text-green-600 font-bold mt-0.5">✔</span> Daily irrigation & nutrient monitoring</li>
                <li className="flex items-start gap-2"><span className="text-green-600 font-bold mt-0.5">✔</span> Disease and pest screening at this stage</li>
              </ul>
            </motion.div>

            <motion.div
              initial={{ x: 40, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="bg-green-800 text-white rounded-3xl p-10 shadow-lg hover:shadow-2xl transition-all duration-300"
            >
              <div className="text-5xl mb-5">🌿</div>
              <h3 className="text-2xl font-bold mb-4">Stage 2 — Main Nursery</h3>
              <div className="w-10 h-1 bg-green-400 rounded-full mb-5"></div>
              <p className="text-green-100 leading-relaxed mb-4">
                Pre-nursery seedlings are transferred to larger polybags in the main nursery and 
                grown for a further <strong className="text-white">6 months</strong> under open sunlight, 
                with controlled fertilisation and structured weeding cycles.
              </p>
              <ul className="space-y-2 text-green-200 text-sm">
                <li className="flex items-start gap-2"><span className="text-green-400 font-bold mt-0.5">✔</span> Larger polybag transplants with rich soil mix</li>
                <li className="flex items-start gap-2"><span className="text-green-400 font-bold mt-0.5">✔</span> Open-field sun acclimatisation</li>
                <li className="flex items-start gap-2"><span className="text-green-400 font-bold mt-0.5">✔</span> Fertiliser application schedule</li>
                <li className="flex items-start gap-2"><span className="text-green-400 font-bold mt-0.5">✔</span> Selection of only vigorous, uniform seedlings for planting</li>
              </ul>
            </motion.div>

          </div>

          {/* Nursery Gallery Grid */}
          <motion.div
            initial={{ y: 40, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="mb-6"
          >
            <h3 className="text-2xl font-bold text-green-800 mb-2 text-center">Nursery Gallery</h3>
            <p className="text-gray-500 text-center mb-10 text-sm">Click any image to view full-size</p>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-5">
              {nurseryImages.map((img, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, scale: 0.96 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.08 }}
                  className="relative cursor-pointer overflow-hidden rounded-2xl shadow-md group"
                  onClick={() => openGallery(nurseryImages, idx)}
                >
                  <Image
                    src={img.src}
                    alt={img.alt}
                    width={600}
                    height={400}
                    className="object-cover w-full h-60 transition-transform duration-500 group-hover:scale-110 group-hover:brightness-75"
                  />
                  {/* Hover overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-green-900/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-400 flex items-end p-5">
                    <div>
                      <span className="text-xs font-semibold text-green-300 uppercase tracking-widest block mb-1">
                        Farm Nursery
                      </span>
                      <p className="text-white text-sm font-medium leading-snug">
                        {img.alt}
                      </p>
                    </div>
                  </div>
                  {/* Expand icon */}
                  <div className="absolute top-3 right-3 bg-white/20 backdrop-blur-sm rounded-full p-2 opacity-0 group-hover:opacity-100 transition-all duration-300">
                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
                    </svg>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Nursery Process Banner */}
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="mt-16 bg-white rounded-3xl border border-green-100 shadow-lg px-8 py-10"
          >
            <h4 className="text-center text-lg font-bold text-green-800 mb-10 tracking-wide uppercase">
              Seedling Journey — From Seed to Field
            </h4>
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              {[
                { step: "01", label: "Seed Sourcing", desc: "NIFOR-certified high-yield seeds procured", icon: "🌰" },
                { step: "02", label: "Pre-Nursery", desc: "3 months in shaded polybag beds", icon: "🌱" },
                { step: "03", label: "Main Nursery", desc: "6 months in open-sun main nursery", icon: "🌿" },
                { step: "04", label: "Vigour Selection", desc: "Only healthy uniform seedlings selected", icon: "✅" },
                { step: "05", label: "Field Transplant", desc: "Seedlings planted into prepared plantation rows", icon: "🌴" },
              ].map((item, idx, arr) => (
                <div key={idx} className="flex items-center gap-4 md:gap-3 flex-1">
                  <div className="flex flex-col items-center text-center min-w-0 flex-1">
                    <div className="w-14 h-14 bg-green-50 border-2 border-green-200 rounded-full flex items-center justify-center text-2xl mb-3 shadow-sm">
                      {item.icon}
                    </div>
                    <span className="text-xs font-bold text-green-600 tracking-widest uppercase mb-1">
                      Step {item.step}
                    </span>
                    <p className="text-sm font-bold text-green-800 mb-1">{item.label}</p>
                    <p className="text-xs text-gray-400 leading-snug">{item.desc}</p>
                  </div>
                  {idx < arr.length - 1 && (
                    <div className="hidden md:block text-green-300 text-xl flex-shrink-0">→</div>
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

      {/* ESG SECTION */}
      <section className="py-20 bg-green-800 text-white text-center px-6">
        <motion.h2
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="text-3xl md:text-4xl font-bold mb-6"
        >
          Sustainability in Action
        </motion.h2>

        <p className="max-w-4xl mx-auto text-lg text-gray-200 leading-relaxed">
          Our Environmental, Social, and Governance (ESG) framework ensures that
          every stage of our operations protects ecosystems, empowers communities,
          and upholds ethical governance standards — reinforcing our commitment to
          long-term agricultural transformation in Nigeria and West Africa.
        </p>
      </section>

      {/* CTA SECTION */}
      <section className="py-16 bg-white text-center">
        <motion.h2
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="text-3xl font-bold text-green-800 mb-4"
        >
          Partner With EMGO Farms
        </motion.h2>

        <p className="text-gray-600 max-w-2xl mx-auto mb-8">
          Whether you are an investor, distributor, institutional buyer,
          or strategic partner — we welcome collaborations that align
          with sustainable growth and premium agro-industrial excellence.
        </p>

        <a
          href="/contact"
          className="inline-block px-10 py-4 bg-orange-500 text-white rounded-full font-semibold hover:bg-orange-600 transition shadow-lg"
        >
          Contact Us
        </a>
      </section>

    </div>
  )
}