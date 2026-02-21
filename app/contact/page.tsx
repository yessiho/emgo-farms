'use client'

import { useState } from "react"
import { motion } from "framer-motion"
import Link from "next/link"
import { Phone, Mail, MapPin, Clock } from "lucide-react"

export default function ContactPage() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    service: "",
    message: "",
  })
  const [submitted, setSubmitted] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)

    setForm({
      name: "",
      email: "",
      phone: "",
      service: "",
      message: "",
    })

    setTimeout(() => setSubmitted(false), 5000)
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
              Let’s discuss how EMGO Farms can support your agricultural and refining needs.
            </p>
          </div>
        </div>
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
              We are committed to delivering excellence across the entire palm oil value chain.
              Contact us for partnerships, bulk supply inquiries, or collaboration opportunities.
            </p>

            <div className="space-y-8 text-gray-700">

              {/* Address */}
              <div className="flex items-start gap-4">
                <div className="bg-green-100 p-3 rounded-xl">
                  <MapPin className="text-green-700" size={22} />
                </div>
                <div>
                  <h4 className="font-semibold text-green-800 mb-1">Registered Office</h4>
                  <p>House D27a, Road 61</p>
                  <p>Victoria Garden City</p>
                  <p>Lagos, Nigeria</p>
                </div>
              </div>

              {/* Phone */}
              <div className="flex items-start gap-4">
                <div className="bg-green-100 p-3 rounded-xl">
                  <Phone className="text-green-700" size={22} />
                </div>
                <div>
                  <h4 className="font-semibold text-green-800 mb-1">Phone</h4>
                  <p>+234 803 339 5971</p>
                  <p>+234 803 396 8137</p>
                </div>
              </div>

              {/* Email */}
              <div className="flex items-start gap-4">
                <div className="bg-green-100 p-3 rounded-xl">
                  <Mail className="text-green-700" size={22} />
                </div>
                <div>
                  <h4 className="font-semibold text-green-800 mb-1">Email</h4>
                  <p>emgo@gmail.com</p>
                </div>
              </div>

              {/* Business Hours */}
              <div className="flex items-start gap-4">
                <div className="bg-green-100 p-3 rounded-xl">
                  <Clock className="text-green-700" size={22} />
                </div>
                <div>
                  <h4 className="font-semibold text-green-800 mb-1">Business Hours</h4>
                  <p>Monday – Friday: 8:00 AM – 5:00 PM</p>
                  <p>Saturday: 9:00 AM – 2:00 PM</p>
                </div>
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

              {submitted && (
                <p className="mt-4 text-green-700 font-semibold">
                  ✅ Thank you for contacting EMGO Farms. We will respond shortly.
                </p>
              )}

            </form>
          </motion.div>

        </div>
      </section>

    </div>
  )
}