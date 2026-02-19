'use client'

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"
import Link from "next/link"

const services = [
  {
    id: 1,
    title: "Oil Palm Farming",
    image: "/image/service1.jpg",
    short:
      "Sustainable plantation management and premium oil palm cultivation.",
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
  },
  {
    id: 2,
    title: "Palm Oil Production",
    image: "/image/service2.jpg",
    short:
      "Modern extraction and processing for premium-grade palm oil.",
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
  },
  {
    id: 3,
    title: "Palm Kernel Oil Refining",
    image: "/image/service3.jpg",
    short:
      "Refined palm kernel oil for food, cosmetic, and industrial sectors.",
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
  },
]

export default function ServicesPage() {
  const [active, setActive] = useState<number | null>(null)

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white">

      {/* HERO SECTION */}
      <section
        className="relative h-80 md:h-[450px] bg-cover bg-center"
        style={{ backgroundImage: "url('/image/products-hero.jpg')" }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-green-900/90 via-green-800/70 to-orange-600/60 flex items-center justify-center px-6">
          <div className="text-center max-w-3xl">
            <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-4">
              Our Professional Services
            </h1>
            <p className="text-white text-lg md:text-xl opacity-90">
              Delivering excellence across the entire palm oil value chain — from sustainable farming to refined production.
            </p>
          </div>
        </div>
      </section>

      {/* COMPANY WRITE-UP */}
      <section className="container mx-auto px-6 py-16 text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-green-800 mb-6">
          About EMGO Farms
        </h2>
        <p className="max-w-4xl mx-auto text-gray-700 leading-relaxed text-lg mb-4">
          Founded in August 2020, EMGO Farms started with a small 4-acre farm in Ogun State and has expanded to 5 hectares in Uyo, Akwa Ibom, aiming to plant 10,000 oil palms by 2030. We are committed to sustainable farming, eco-friendly production, and community empowerment.
        </p>
        <p className="max-w-4xl mx-auto text-gray-700 leading-relaxed text-lg">
          Our integrated operations—from cultivation to refined oil production—ensure efficiency, traceability, and consistent quality. Using modern agronomic techniques, environmentally responsible practices, and cutting-edge processing technology, EMGO Farms delivers premium palm oil and kernel oil to local and international markets.
        </p>
      </section>

      {/* SERVICES SECTION */}
      <section className="container mx-auto px-6 pb-20 space-y-10">
        {services.map((service) => (
          <div
            key={service.id}
            className="bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100 transition hover:shadow-2xl"
          >
            {/* Header */}
            <div
              className="flex flex-col md:flex-row cursor-pointer"
              onClick={() => setActive(active === service.id ? null : service.id)}
            >
              <div className="relative md:w-1/3 h-64">
                <Image
                  src={service.image}
                  alt={service.title}
                  fill
                  className="object-cover"
                />
              </div>

              <div className="p-8 md:w-2/3 flex flex-col justify-center">
                <h3 className="text-3xl font-bold text-green-800">
                  {service.title}
                </h3>
                <p className="text-gray-600 mt-4 text-lg">
                  {service.short}
                </p>
              </div>
            </div>

            {/* Expandable Content */}
            <AnimatePresence>
              {active === service.id && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.5 }}
                  className="px-8 pb-8 text-gray-700"
                >
                  <p className="mt-6 border-t pt-6 leading-relaxed">
                    {service.details}
                  </p>

                  {/* Process */}
                  <div className="mt-8">
                    <h4 className="text-xl font-semibold text-green-700 mb-3">
                      Our Process
                    </h4>
                    <ul className="grid md:grid-cols-2 gap-3 list-disc list-inside text-gray-600">
                      {service.process.map((step, index) => (
                        <li key={index}>{step}</li>
                      ))}
                    </ul>
                  </div>

                  {/* Benefits */}
                  <div className="mt-8">
                    <h4 className="text-xl font-semibold text-green-700 mb-3">
                      Key Benefits
                    </h4>
                    <ul className="grid md:grid-cols-2 gap-3 list-disc list-inside text-gray-600">
                      {service.benefits.map((benefit, index) => (
                        <li key={index}>{benefit}</li>
                      ))}
                    </ul>
                  </div>

                  <div className="mt-10">
                    <Link
                      href="/contact"
                      className="inline-block px-8 py-4 bg-orange-500 text-white rounded-full font-semibold hover:bg-orange-600 transition"
                    >
                      Request This Service →
                    </Link>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </section>

      {/* TRUST SECTION */}
      <section className="bg-green-100 py-16">
        <div className="container mx-auto px-6 text-center max-w-4xl">
          <h2 className="text-3xl font-bold text-green-800 mb-6">
            Why Choose EMGO Farms?
          </h2>
          <p className="text-gray-700 text-lg leading-relaxed">
            EMGO Farms combines sustainable agriculture, modern processing technology, strict quality control, and a strong logistics network to ensure premium products and dependable service. Our integrated approach guarantees traceability, consistency, and long-term partnership value for clients worldwide.
          </p>
        </div>
      </section>

      {/* CTA SECTION */}
      <section className="bg-green-900 text-white py-20 text-center">
        <h2 className="text-4xl font-bold mb-6">
          Let’s Build a Sustainable Future Together
        </h2>
        <p className="mb-8 text-lg max-w-2xl mx-auto opacity-90">
          Whether you need raw palm materials, refined oils, or full-scale agricultural partnership, EMGO Farms delivers excellence with integrity.
        </p>
        <Link
          href="/contact"
          className="px-10 py-4 bg-orange-500 rounded-full font-semibold hover:bg-orange-600 transition"
        >
          Get In Touch Today
        </Link>
      </section>

    </div>
  )
}
