'use client'

import Image from "next/image"
import { motion } from "framer-motion"

const productsData = [
  {
    title: "Premium Palm Oil",
    description: "Refined, pure, and sustainably produced palm oil, perfect for industrial and household use.",
    image: "/image/oil-palm10.jpg",
    link: "/products#palm-oil",
  },
  {
    title: "Organic Palm Kernel Oil",
    description: "Cold-pressed, high-quality palm kernel oil for cooking, skincare, and cosmetics.",
    image: "/image/oil-palm13.avif",
    link: "/products#palm-kernel",
  },
  {
    title: "Fresh Oil Palm Fruits",
    description: "Harvested from our farms, ideal for local production and processing.",
    image: "/image/oil-palm14.webp",
    link: "/products#palm-fruits",
  },
  {
    title: "Palm Oil By-Products",
    description: "Eco-friendly palm oil residues for animal feed, biofuel, and agricultural use.",
    image: "/image/oil-palm9.jpg",
    link: "/products#byproducts",
  },
]

export default function ProductsPage() {
  return (
    <div className="bg-white min-h-screen text-gray-800 font-sans">

      {/* HERO SECTION */}
      <section className="relative h-80 bg-[url('/image/oil-palm15.avif')] bg-cover bg-center flex items-center justify-center">
        <div className="absolute inset-0 bg-black/50"></div>
        <motion.div 
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1 }}
          className="relative text-center text-white px-6"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-2">Our Products</h1>
          <p className="text-lg md:text-xl">Sustainably Farmed & Premium Quality Palm Products</p>
        </motion.div>
      </section>

      {/* COMPANY OVERVIEW */}
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
            EMGO Farms began as a small 4-acre farm in Obadeyi Town, Ogun State in 2020. Today, it has grown to over 5 hectares in Uyo, Akwa Ibom State, with a target of 10,000 oil palm trees by 2030.
          </motion.p>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.4 }}
            className="text-gray-700 max-w-3xl mx-auto"
          >
            We are dedicated to sustainable oil palm farming, high-quality palm oil production, and modern palm kernel oil refining. Our operations combine modern farming practices, efficient processes, and market-driven strategies to maximize profitability and scalability.
          </motion.p>
        </div>
      </section>

      {/* FEATURED PRODUCTS GRID */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="text-4xl font-bold text-green-800 text-center mb-12"
          >
            Featured Products
          </motion.h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {productsData.map((product, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: idx * 0.2 }}
                className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-shadow group"
              >
                <div className="relative w-full h-64">
                  <Image
                    src={product.image}
                    alt={product.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-green-800 mb-2">{product.title}</h3>
                  <p className="text-gray-600 mb-4">{product.description}</p>
                  <a
                    href={product.link}
                    className="inline-block px-5 py-2 bg-orange-500 text-white rounded-full font-semibold hover:bg-orange-600 transition"
                  >
                    Learn More
                  </a>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* PRODUCT CATEGORIES */}
      <section className="py-20 bg-green-50">
        <div className="container mx-auto px-6">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="text-4xl font-bold text-green-800 text-center mb-12"
          >
            Product Categories
          </motion.h2>

          <div className="grid md:grid-cols-3 gap-8">
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="bg-green-100 rounded-xl p-8 text-center hover:shadow-lg transition"
            >
              <h3 className="text-2xl font-semibold text-green-900 mb-4">Raw Palm Oil</h3>
              <p className="text-gray-700">Freshly produced raw palm oil for household and industrial use.</p>
            </motion.div>

            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-green-100 rounded-xl p-8 text-center hover:shadow-lg transition"
            >
              <h3 className="text-2xl font-semibold text-green-900 mb-4">Refined Palm Oil</h3>
              <p className="text-gray-700">Pure and filtered palm oil, perfect for cooking and commercial applications.</p>
            </motion.div>

            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="bg-green-100 rounded-xl p-8 text-center hover:shadow-lg transition"
            >
              <h3 className="text-2xl font-semibold text-green-900 mb-4">Palm Kernel Oil</h3>
              <p className="text-gray-700">Cold-pressed, high-quality palm kernel oil for cooking, cosmetics, and biofuel.</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA SECTION */}
      <section className="py-20 bg-green-800 text-white text-center">
        <motion.h2
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="text-4xl font-bold mb-6"
        >
          Ready to Partner With Us?
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.2 }}
          className="text-lg mb-8 max-w-2xl mx-auto"
        >
          EMGO Farms produces high-quality palm oil, palm kernel oil, and related products using sustainable farming practices. Partner with us for premium, eco-friendly products delivered directly from our farms.
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
