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

export default function GalleryPage() {
  const [open, setOpen] = useState(false)
  const [currentIndex, setCurrentIndex] = useState(0)

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
            A visual journey through EMGO Farms’ integrated agro-industrial operations —
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
              onClick={() => { setCurrentIndex(idx); setOpen(true) }}
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

      {/* LIGHTBOX */}
      <Lightbox
        open={open}
        index={currentIndex}
        close={() => setOpen(false)}
        slides={galleryImages.map((img) => ({ src: img.src, alt: img.alt }))}
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
