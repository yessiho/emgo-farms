'use client'

import Image from "next/image"
import { motion } from "framer-motion"
import { useState } from "react"
import Lightbox from "yet-another-react-lightbox"
import "yet-another-react-lightbox/styles.css"

const galleryImages = [
  { src: "/image/farm1.jpg", alt: "Farm Field" },
  { src: "/image/farm2.jpg", alt: "Palm Trees" },
  { src: "/image/farm3.jpg", alt: "Harvesting Process" },
  { src: "/image/farm4.jpg", alt: "Palm Oil Production" },
  { src: "/image/farm5.jpg", alt: "Palm Kernel Oil Refining" },
  { src: "/image/oil-palm2.webp", alt: "Oil Palm Fruits" },
  { src: "/image/palm-hero.jpg", alt: "Palm Oil Factory" },
  { src: "/image/palm-oil-production.jpg", alt: "Oil Bottling" },
]

export default function GalleryPage() {
  const [open, setOpen] = useState(false)
  const [currentIndex, setCurrentIndex] = useState(0)

  return (
    <div className="min-h-screen bg-white text-gray-800 font-sans">

      {/* HERO SECTION */}
      <section className="relative h-64 bg-[url('/image/palm-hero.jpg')] bg-cover bg-center flex items-center justify-center">
        <div className="absolute inset-0 bg-black/50"></div>
        <motion.h1
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1 }}
          className="relative text-white text-4xl md:text-5xl font-bold text-center"
        >
          Our Gallery
        </motion.h1>
      </section>

      {/* COMPANY WRITE-UP */}
      <section className="py-16 bg-green-50">
        <div className="container mx-auto px-6 text-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="text-4xl font-bold text-green-800 mb-6"
          >
            About EMGO Farms
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.2 }}
            className="text-gray-700 max-w-3xl mx-auto mb-4"
          >
            EMGO Farms started in August 2020 as a small 4-acre farm in Obadeyi Town, Ogun State. Today, it spans over 5 hectares in Uyo, Akwa Ibom State, with a goal of 10,000 oil palm trees by 2030. We are committed to sustainable farming, modern processing techniques, and delivering high-quality palm products to our clients.
          </motion.p>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.4 }}
            className="text-gray-700 max-w-3xl mx-auto"
          >
            Our mission is to provide premium-quality palm oil and palm kernel oil using eco-friendly practices, while supporting local communities and driving innovation in agribusiness. Integrity, quality, and sustainability guide every step of our operations.
          </motion.p>
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
              className="relative cursor-pointer overflow-hidden rounded-lg shadow-lg group"
              whileHover={{ scale: 1.05 }}
              onClick={() => { setCurrentIndex(idx); setOpen(true) }}
            >
              <Image
                src={img.src}
                alt={img.alt}
                width={500}
                height={500}
                className="object-cover w-full h-60 transition-transform duration-500 group-hover:brightness-90"
              />
              <div className="absolute bottom-2 left-2 text-white bg-black/50 px-2 py-1 rounded text-sm opacity-0 group-hover:opacity-100 transition-opacity">
                {img.alt}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* LIGHTBOX VIEW */}
      <Lightbox
        open={open}
        index={currentIndex}
        close={() => setOpen(false)}
        slides={galleryImages.map((img) => ({ src: img.src, alt: img.alt }))}
      />
      
      {/* CTA SECTION */}
      <section className="py-16 bg-green-800 text-white text-center">
        <motion.h2
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="text-3xl font-bold mb-4"
        >
          Experience EMGO Farms Firsthand
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.2 }}
          className="text-lg mb-6 max-w-2xl mx-auto"
        >
          Explore our farm operations, sustainable practices, and high-quality palm products through our gallery. For inquiries or partnerships, get in touch with us today.
        </motion.p>
        <motion.a
          href="/contact"
          initial={{ scale: 0.9, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="inline-block px-8 py-4 bg-orange-500 rounded-full font-semibold hover:bg-orange-600 transition"
        >
          Contact Us
        </motion.a>
      </section>
    </div>
  )
}
