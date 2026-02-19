'use client'

import Image from "next/image"
import { motion } from "framer-motion"

export default function AboutPage() {
  return (
    <div className="bg-white min-h-screen font-sans text-gray-800">

      {/* HERO SECTION */}
      <section className="relative h-96 bg-[url('/image/oil-plam5.avif')] bg-cover bg-center flex items-center justify-center">
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
              EMGO Farms began with a vision to revolutionize the palm oil industry by focusing on sustainable farming, high-quality production, and community empowerment. 
              Our journey started with a small farm and today we manage extensive plantations producing premium palm oil and kernel oil.
            </p>
            <p className="text-gray-700">
              With modern technology and environmentally conscious practices, we ensure our farms are both productive and eco-friendly, making a real difference in the lives of local farmers.
            </p>
          </motion.div>

          <motion.div
            initial={{ x: 50, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
          >
            <Image
              src="/image/oil-palm13.avif"
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
                To produce premium-quality palm oil and kernel oil using sustainable farming practices, 
                cutting-edge technology, and responsible environmental stewardship while empowering local communities.
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
                To be recognized globally as a leader in sustainable palm oil production, 
                delivering innovative solutions, premium products, and making a positive impact on communities and the environment.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* OUR TEAM */}
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
            {['oil-palm9.jpg','oil-palm13.avif','oil-palm11.avif','oil-palm10.jpg'].map((img, idx) => (
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
