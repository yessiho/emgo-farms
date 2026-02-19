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
    </div>
  )
}
