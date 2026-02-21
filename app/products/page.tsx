'use client'

import Image from "next/image"
import { motion } from "framer-motion"

const productsData = [
  {
    title: "Premium Palm Oil",
    description:
      "Refined, pure, and sustainably produced palm oil processed through modern extraction systems for industrial and household applications.",
    image: "/image/oil-palm10.jpg",
  },
  {
    title: "Organic Palm Kernel Oil",
    description:
      "Cold-pressed and carefully refined palm kernel oil suitable for food production, cosmetics, soap manufacturing, and industrial use.",
    image: "/image/products.jpg",
  },
  {
    title: "Fresh Oil Palm Fruits",
    description:
      "High-yield oil palm fruits harvested directly from our plantations for local processing and bulk supply.",
    image: "/image/oil-kene1.jpg",
  },
  {
    title: "Palm Oil By-Products",
    description:
      "Sustainably managed palm residues utilized for animal feed, biomass energy, and agricultural enhancement.",
    image: "/image/oil-palm9.jpg",
  },
]

export default function ProductsPage() {
  return (
    <div className="bg-white min-h-screen text-gray-800 font-sans">

      {/* HERO SECTION */}
      <section className="relative h-105 bg-[url('/image/produt4.jpg')] bg-cover bg-center flex items-center justify-center">
        <div className="absolute inset-0 bg-linear-to-r from-black/70 to-black/40"></div>

        <motion.div
          initial={{ y: -40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1 }}
          className="relative text-center text-white px-6 max-w-3xl"
        >
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Our Products
          </h1>
          <p className="text-lg md:text-xl text-gray-200">
            Integrated Agricultural Production. Refined Quality. Sustainable Impact.
          </p>
        </motion.div>
      </section>

      {/* COMPANY OVERVIEW */}
      <section className="py-24 bg-green-50">
        <div className="container mx-auto px-6 text-center max-w-5xl">

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="text-4xl md:text-5xl font-bold text-green-800 mb-10"
          >
            About EMGO Farms & Integrated Services Limited
          </motion.h2>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="text-gray-700 text-lg leading-relaxed mb-6"
          >
            EMGO Farms is a growth-driven agro-industrial enterprise strategically positioned
            in Nsit Atai, Akwa Ibom State. What began as a modest agricultural initiative
            has evolved into an integrated ecosystem with a clear ambition — to cultivate
            over 10,000 high-yield oil palm trees and establish modern refining facilities
            that control the entire value chain.
          </motion.p>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.2 }}
            className="text-gray-700 text-lg leading-relaxed mb-6"
          >
            Our operations extend beyond cultivation into palm oil processing,
            palm kernel oil refining, cassava starch production, ginger farming,
            and rubber plantation development — creating a diversified,
            scalable, and sustainable agricultural portfolio.
          </motion.p>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.4 }}
            className="text-green-800 font-semibold italic text-lg"
          >
            From soil to refined product, we deliver excellence through
            innovation, operational discipline, and environmental responsibility.
          </motion.p>

        </div>
      </section>

      {/* FEATURED PRODUCTS */}
      <section className="py-28 bg-white">
        <div className="container mx-auto px-6">

          <motion.h2
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="text-4xl md:text-5xl font-bold text-green-800 text-center mb-16"
          >
            Featured Products
          </motion.h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-10">
            {productsData.map((product, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: idx * 0.2 }}
                className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition group"
              >
                <div className="relative w-full h-64">
                  <Image
                    src={product.image}
                    alt={product.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>

                <div className="p-8">
                  <h3 className="text-xl font-semibold text-green-800 mb-3">
                    {product.title}
                  </h3>
                  <p className="text-gray-600">
                    {product.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* PRODUCT CATEGORIES */}
      <section className="py-28 bg-green-50">
        <div className="container mx-auto px-6">

          <motion.h2
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="text-4xl md:text-5xl font-bold text-green-800 text-center mb-16"
          >
            Product Categories
          </motion.h2>

          <div className="grid md:grid-cols-3 gap-10">

            <div className="bg-white rounded-2xl p-10 shadow-md hover:shadow-xl transition text-center">
              <h3 className="text-2xl font-semibold text-green-900 mb-4">
                Raw Palm Oil
              </h3>
              <p className="text-gray-700">
                Freshly extracted palm oil processed directly from harvested fruits,
                suitable for bulk industrial and commercial applications.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-10 shadow-md hover:shadow-xl transition text-center">
              <h3 className="text-2xl font-semibold text-green-900 mb-4">
                Refined Palm Oil
              </h3>
              <p className="text-gray-700">
                Filtered and purified palm oil manufactured under strict quality
                control standards for food and commercial use.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-10 shadow-md hover:shadow-xl transition text-center">
              <h3 className="text-2xl font-semibold text-green-900 mb-4">
                Palm Kernel Oil
              </h3>
              <p className="text-gray-700">
                High-grade palm kernel oil ideal for cooking, cosmetic production,
                soap manufacturing, and bio-industrial applications.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-28 bg-green-800 text-white text-center">
        <motion.h2
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="text-4xl md:text-5xl font-bold mb-8"
        >
          Partner With EMGO Farms
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.2 }}
          className="text-lg max-w-3xl mx-auto mb-10"
        >
          We deliver premium agricultural products backed by integrated
          production systems, modern processing infrastructure, and
          sustainable operational practices.
        </motion.p>

        <motion.a
          href="/contact"
          initial={{ scale: 0.9, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="inline-block px-10 py-4 bg-orange-500 rounded-full font-semibold hover:bg-orange-600 transition"
        >
          Contact Us
        </motion.a>
      </section>

    </div>
  )
}