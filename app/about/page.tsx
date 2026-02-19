'use client'

import Image from "next/image"
import { motion } from "framer-motion"

export default function AboutPage() {
  return (
    <div className="bg-white min-h-screen font-sans text-gray-800">

      {/* HERO SECTION */}
      <section className="relative h-96 bg-[url('/image/picture10.jpg')] bg-cover bg-center flex items-center justify-center">
        <div className="absolute inset-0 bg-black/50"></div>
        <motion.div 
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1 }}
          className="relative text-center text-white px-6"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-4">About EMGO Farms</h1>
          <p className="text-lg md:text-xl">Leading Sustainable Oil Palm Farming & Organic Palm Oil Production</p>
        </motion.div>
      </section>

      {/* OUR STORY */}
      <section className="py-20 bg-green-50">
        <div className="container mx-auto grid md:grid-cols-2 gap-12 items-center px-6">
          
          <motion.div 
            initial={{ x: -50, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
          >
            <h2 className="text-4xl font-bold text-green-800 mb-6">Our Story</h2>
            <p className="text-gray-700 mb-4">
              EMGO Farms started as a small 4-acre farm in Obadeyi Town, Ogun State in August 2020. 
              Today, it has grown to over 5 hectares in Uyo, Akwa Ibom State, with a target of 10,000 oil palm trees by 2030. 
            </p>
            <p className="text-gray-700 mb-4">
              We are a growth-driven palm oil agribusiness dedicated to delivering high-quality products 
              and long-term value across the supply chain. Our operations combine modern farming practices, 
              efficient processing, and market-driven strategies to maximize profitability and scalability.
            </p>
            <p className="text-gray-700">
              Through innovative approaches and sustainable farming, EMGO Farms empowers local communities while 
              ensuring environmentally responsible practices across all stages of production.
            </p>
          </motion.div>

          <motion.div
            initial={{ x: 50, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
          >
            <Image
              src="/image/picture35.jpg"
              alt="Our Story"
              width={600}
              height={400}
              className="rounded-xl shadow-lg object-cover"
            />
          </motion.div>

        </div>
      </section>

      {/* MISSION & VISION */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6 text-center">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="text-4xl font-bold text-green-800 mb-12"
          >
            Mission & Vision
          </motion.h2>

          <div className="grid md:grid-cols-2 gap-8">
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="p-8 border border-green-200 rounded-xl hover:shadow-lg transition"
            >
              <h3 className="text-2xl font-semibold text-green-800 mb-4">Our Mission</h3>
              <p className="text-gray-700">
                To cultivate and supply high-quality oil palm at competitive costs, ensuring consistent returns for stakeholders, 
                while expanding our footprint in local and global markets.
              </p>
            </motion.div>

            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="p-8 border border-green-200 rounded-xl hover:shadow-lg transition"
            >
              <h3 className="text-2xl font-semibold text-green-800 mb-4">Our Vision</h3>
              <p className="text-gray-700">
                To become a leading oil palm producer recognized for innovation, profitability, and sustainability, 
                driving growth across the agribusiness sector.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* OUR SERVICES */}
      <section className="py-20 bg-green-50">
        <div className="container mx-auto px-6">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="text-4xl font-bold text-green-800 mb-12 text-center"
          >
            Our Services
          </motion.h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { title: "Oil Palm Farming", desc: "Sustainable cultivation and harvesting of premium oil palm fruits." },
              { title: "Palm Oil Production", desc: "High-quality palm oil extraction using modern processing technology." },
              { title: "Palm Kernel Oil Refining", desc: "Cold-pressed and refined palm kernel oil for multiple industries." },
              { title: "Ginger Plantation", desc: "Organic cultivation for high-quality ginger supply." },
              { title: "Rubber Plantation", desc: "Sustainable rubber plantations for industrial and commercial use." },
              { title: "Detergent & Liquid Soap Manufacturing", desc: "Premium cleaning products derived from palm oil and other organic sources." },
              { title: "Cream Manufacturing", desc: "High-quality creams and cosmetic products using natural ingredients." },
            ].map((service, idx) => (
              <motion.div 
                key={idx}
                initial={{ scale: 0.9, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: idx * 0.2 }}
                className="p-6 bg-white rounded-xl shadow-lg hover:shadow-xl transition"
              >
                <h3 className="text-xl font-semibold text-green-800 mb-2">{service.title}</h3>
                <p className="text-gray-700">{service.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CORE VALUES */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6 text-center">
          <motion.h2 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="text-4xl font-bold text-green-800 mb-12"
          >
            Our Core Values
          </motion.h2>

          <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-8">
            {[
              "Quality: Deliver excellence in all products.",
              "Affordability: Provide value without compromise.",
              "Integrity: Honesty, transparency, and professionalism.",
              "Customer-Centric: Prioritize client satisfaction.",
              "Innovation: Creativity and continuous improvement.",
              "Community: Support and empower local communities.",
              "ESG: Environmental responsibility and ethical practices."
            ].map((value, idx) => (
              <motion.div 
                key={idx}
                initial={{ y: 20, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: idx * 0.2 }}
                className="p-6 bg-green-50 rounded-xl shadow hover:shadow-lg transition text-left"
              >
                <p className="text-gray-700">{value}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* TEAM */}
      <section className="py-20 bg-green-50">
        <div className="container mx-auto px-6 text-center">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="text-4xl font-bold text-green-800 mb-12"
          >
            Meet Our Team
          </motion.h2>

          <div className="grid md:grid-cols-3 gap-8">
            {[ 
              { name: "John Paul", role: "Founder & CEO", img: "/image/oil-palm7.avif" },
              { name: "Osadiauwa McDonald", role: "Farm Manager", img: "/image/oil-palm7.avif" },
              { name: "Williams Ojigbo", role: "Operations Lead", img: "/image/oil-palm7.avif" }
            ].map((member, idx) => (
              <motion.div 
                key={idx}
                initial={{ y: 50, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: idx * 0.2 }}
                className="p-6 bg-white rounded-xl shadow hover:shadow-lg transition"
              >
                <Image
                  src={member.img}
                  alt={member.name}
                  width={300}
                  height={300}
                  className="rounded-full mx-auto object-cover"
                />
                <h3 className="text-xl font-semibold text-green-800 mt-4">{member.name}</h3>
                <p className="text-gray-600 mt-1">{member.role}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FARM & PRODUCTION GALLERY */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6 text-center">
          <motion.h2 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="text-4xl font-bold text-green-800 mb-12"
          >
            Farm & Production Gallery
          </motion.h2>

          <div className="grid md:grid-cols-4 gap-4">
            {['picture22.jpg','picture23.jpg','picture32.png','picture33.png'].map((img, idx) => (
              <motion.div
                key={idx}
                initial={{ scale: 0.9, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: idx * 0.2 }}
                className="overflow-hidden rounded-xl shadow-lg hover:scale-105 transition-transform"
              >
                <Image
                  src={`/image/${img}`}
                  alt={`Gallery ${idx + 1}`}
                  width={400}
                  height={300}
                  className="object-cover w-full h-64"
                />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

    </div>
  )
}
