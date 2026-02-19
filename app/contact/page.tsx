'use client'

import { useState } from "react"
import { motion } from "framer-motion"
import Link from "next/link"

export default function ContactPage() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    service: "",
    message: "",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    alert("Thank you for contacting EMGO Farms. We will respond shortly.")
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white">

      {/* HERO SECTION */}
      <section
        className="relative h-72 md:h-[420px] bg-cover bg-center"
        style={{ backgroundImage: "url('/image/products-hero.jpg')" }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-green-900/90 via-green-800/70 to-orange-600/60 flex items-center justify-center px-6">
          <div className="text-center max-w-3xl">
            <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-4">
              Contact EMGO Farms
            </h1>
            <p className="text-white text-lg md:text-xl opacity-90">
              Let’s discuss how EMGO Farms can support your agricultural, production, and refining needs.
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
          Founded in August 2020, EMGO Farms began with a small 4-acre farm in Ogun State and expanded to 5 hectares in Uyo, Akwa Ibom. With a vision to plant 10,000 oil palms by 2030, we are committed to sustainable farming, eco-friendly production, and community empowerment.
        </p>
        <p className="max-w-4xl mx-auto text-gray-700 leading-relaxed text-lg">
          Our integrated operations—from cultivation to refined oil production—ensure traceable, high-quality palm oil and kernel oil. By combining agricultural expertise, modern technology, and sustainable practices, EMGO Farms delivers premium products to both local and international markets.
        </p>
      </section>

      {/* CONTACT SECTION */}
      <section className="container mx-auto px-6 py-20">
        <div className="grid md:grid-cols-2 gap-16">

          {/* LEFT: CONTACT INFO */}
          <div>
            <h2 className="text-3xl font-bold text-green-800 mb-6">
              Get In Touch
            </h2>

            <p className="text-gray-600 mb-8 leading-relaxed">
              We are committed to delivering excellence across the entire palm oil value chain. Contact us for partnerships, bulk supply inquiries, or collaboration opportunities.
            </p>

            <div className="space-y-6 text-gray-700">

              <div>
                <h4 className="font-semibold text-green-700">📍 Office Address</h4>
                <p>EMGO Farms Headquarters</p>
                <p>123 Palm Estate Road</p>
                <p>Agro Industrial Zone</p>
              </div>

              <div>
                <h4 className="font-semibold text-green-700">📞 Phone</h4>
                <p>+123 456 7890</p>
              </div>

              <div>
                <h4 className="font-semibold text-green-700">✉ Email</h4>
                <p>info@emgofarms.com</p>
              </div>

              <div>
                <h4 className="font-semibold text-green-700">⏰ Business Hours</h4>
                <p>Monday – Friday: 8:00 AM – 5:00 PM</p>
                <p>Saturday: 9:00 AM – 2:00 PM</p>
              </div>

            </div>
          </div>

          {/* RIGHT: CONTACT FORM */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="bg-white shadow-2xl rounded-3xl p-10 border border-gray-100"
          >
            <h3 className="text-2xl font-bold text-green-800 mb-6">
              Send Us a Message
            </h3>

            <form onSubmit={handleSubmit} className="space-y-6">

              <input
                type="text"
                name="name"
                placeholder="Full Name"
                required
                value={form.name}
                onChange={handleChange}
                className="w-full p-4 border rounded-xl focus:ring-2 focus:ring-green-600 outline-none"
              />

              <input
                type="email"
                name="email"
                placeholder="Email Address"
                required
                value={form.email}
                onChange={handleChange}
                className="w-full p-4 border rounded-xl focus:ring-2 focus:ring-green-600 outline-none"
              />

              <input
                type="tel"
                name="phone"
                placeholder="Phone Number"
                value={form.phone}
                onChange={handleChange}
                className="w-full p-4 border rounded-xl focus:ring-2 focus:ring-green-600 outline-none"
              />

              <select
                name="service"
                value={form.service}
                onChange={handleChange}
                className="w-full p-4 border rounded-xl focus:ring-2 focus:ring-green-600 outline-none"
              >
                <option value="">Select Service</option>
                <option>Oil Palm Farming</option>
                <option>Palm Oil Production</option>
                <option>Palm Kernel Oil Refining</option>
              </select>

              <textarea
                name="message"
                placeholder="Your Message"
                rows={5}
                required
                value={form.message}
                onChange={handleChange}
                className="w-full p-4 border rounded-xl focus:ring-2 focus:ring-green-600 outline-none"
              />

              <button
                type="submit"
                className="w-full py-4 bg-orange-500 text-white rounded-xl font-semibold hover:bg-orange-600 transition"
              >
                Submit Inquiry →
              </button>

            </form>
          </motion.div>

        </div>
      </section>

      {/* MAP SECTION */}
      <section className="px-6 pb-20">
        <div className="container mx-auto">
          <div className="rounded-3xl overflow-hidden shadow-lg">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18..."
              width="100%"
              height="400"
              loading="lazy"
              className="border-0"
            ></iframe>
          </div>
        </div>
      </section>

      {/* CTA SECTION */}
      <section className="bg-green-900 text-white py-20 text-center">
        <h2 className="text-4xl font-bold mb-6">
          Partner With EMGO Farms
        </h2>
        <p className="mb-8 text-lg max-w-2xl mx-auto opacity-90">
          Delivering excellence in sustainable farming, modern production, and premium refining solutions.
        </p>
        <Link
          href="/services"
          className="px-10 py-4 bg-orange-500 rounded-full font-semibold hover:bg-orange-600 transition"
        >
          Explore Our Services
        </Link>
      </section>

    </div>
  )
}
