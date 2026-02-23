'use client'

import { useState } from "react"
import { motion } from "framer-motion"
import Link from "next/link"
import { Phone, Mail, MapPin, Clock } from "lucide-react"
import { FaWhatsapp } from "react-icons/fa"

// ── WhatsApp config ──────────────────────────────────────────
const WHATSAPP_NUMBER  = "2348033395971"
const WHATSAPP_MESSAGE = encodeURIComponent(
  "Hello EMGO Farms! I'd like to get in touch regarding your products and services."
)
const WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMBER}?text=${WHATSAPP_MESSAGE}`

export default function ContactPage() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    service: "",
    message: "",
  })
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      setSubmitted(true)
      setForm({ name: "", email: "", phone: "", service: "", message: "" })
      setTimeout(() => setSubmitted(false), 5000)
    }, 800)
  }

  const inputClass =
    "w-full px-4 py-3 sm:py-3.5 border border-gray-200 rounded-xl text-sm sm:text-base text-gray-800 placeholder-gray-400 focus:ring-2 focus:ring-green-600 focus:border-transparent outline-none transition bg-gray-50 focus:bg-white"

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white font-sans text-gray-800">

      {/* ── HERO ─────────────────────────────────────────────── */}
      <section
        className="relative h-56 sm:h-72 md:h-80 lg:h-[420px] bg-cover bg-center flex items-center justify-center"
        style={{ backgroundImage: "url('/image/products-hero.jpg')" }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-green-900/90 via-green-800/70 to-orange-600/60" />

        <div className="relative text-center px-5 sm:px-8 max-w-3xl mx-auto">
          <motion.span
            initial={{ opacity: 0, y: -15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="inline-block bg-orange-500/80 backdrop-blur-sm text-white text-xs font-bold tracking-widest uppercase px-4 py-1.5 rounded-full mb-3 sm:mb-4"
          >
            Reach Out
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.1 }}
            className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-white mb-3 sm:mb-4 leading-tight"
          >
            Contact EMGO Farms
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.4 }}
            className="text-white text-sm sm:text-base lg:text-xl opacity-90 max-w-2xl mx-auto leading-relaxed"
          >
            Let's discuss how EMGO Farms can support your agricultural and refining needs.
          </motion.p>
        </div>
      </section>


      {/* ── QUICK CONTACT STRIP ───────────────────────────────── */}
      {/* Visible on mobile as quick-tap row before the main section */}
      <div className="bg-white border-b border-gray-100 sm:hidden">
        <div className="flex divide-x divide-gray-100">
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 flex flex-col items-center gap-1 py-4 text-[#25D366] hover:bg-green-50 transition"
          >
            <FaWhatsapp size={22} />
            <span className="text-xs font-semibold">WhatsApp</span>
          </a>
          <a
            href="tel:+2348033395971"
            className="flex-1 flex flex-col items-center gap-1 py-4 text-green-700 hover:bg-green-50 transition"
          >
            <Phone size={20} />
            <span className="text-xs font-semibold">Call</span>
          </a>
          <a
            href="mailto:emgo@gmail.com"
            className="flex-1 flex flex-col items-center gap-1 py-4 text-orange-500 hover:bg-orange-50 transition"
          >
            <Mail size={20} />
            <span className="text-xs font-semibold">Email</span>
          </a>
        </div>
      </div>


      {/* ── MAIN CONTACT SECTION ──────────────────────────────── */}
      <section className="py-12 sm:py-16 lg:py-20">
        <div className="max-w-6xl mx-auto px-5 sm:px-8 lg:px-10">

          {/* Stacked on mobile (info first, form below), side-by-side on md+ */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-16">


            {/* ── LEFT: CONTACT INFO ─────────────────────────── */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <span className="inline-block bg-green-100 text-green-800 text-xs font-bold tracking-widest uppercase px-4 py-1.5 rounded-full mb-4">
                Contact Info
              </span>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-green-800 mb-4 sm:mb-5">
                Get In Touch
              </h2>
              <p className="text-gray-500 text-sm sm:text-base leading-relaxed mb-8 sm:mb-10">
                We are committed to delivering excellence across the entire palm oil value chain.
                Contact us for partnerships, bulk supply inquiries, or collaboration opportunities.
              </p>

              {/* ── WhatsApp CTA (prominent) ── */}
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 mb-8 p-4 sm:p-5 bg-[#25D366]/10 border border-[#25D366]/30 rounded-2xl hover:bg-[#25D366]/20 hover:border-[#25D366]/60 transition-all duration-200 group"
              >
                <div className="w-12 h-12 bg-[#25D366] rounded-xl flex items-center justify-center shadow-md group-hover:scale-110 transition-transform flex-shrink-0">
                  <FaWhatsapp size={22} className="text-white" />
                </div>
                <div>
                  <p className="text-[#128C7E] font-bold text-sm sm:text-base">Chat on WhatsApp</p>
                  <p className="text-gray-500 text-xs sm:text-sm">Tap to message us instantly</p>
                </div>
                <span className="ml-auto text-[#25D366] font-bold text-lg">→</span>
              </a>

              <div className="space-y-5 sm:space-y-7">

                {/* Address */}
                <div className="flex items-start gap-4">
                  <div className="bg-green-100 p-2.5 sm:p-3 rounded-xl flex-shrink-0">
                    <MapPin className="text-green-700" size={20} />
                  </div>
                  <div>
                    <h4 className="font-bold text-green-800 mb-1 text-sm sm:text-base">Registered Office</h4>
                    <p className="text-gray-500 text-sm sm:text-base leading-relaxed">
                      House D27a, Road 61<br />
                      Victoria Garden City<br />
                      Lagos, Nigeria
                    </p>
                  </div>
                </div>

                {/* Phone — taps to WhatsApp */}
                <div className="flex items-start gap-4">
                  <div className="bg-green-100 p-2.5 sm:p-3 rounded-xl flex-shrink-0">
                    <Phone className="text-green-700" size={20} />
                  </div>
                  <div>
                    <h4 className="font-bold text-green-800 mb-1 text-sm sm:text-base">Phone / WhatsApp</h4>
                    <div className="space-y-1.5">
                      {[
                        { display: "+234 803 339 5971", tel: "+2348033395971", wa: `https://wa.me/2348033395971?text=${WHATSAPP_MESSAGE}` },
                        { display: "+234 803 396 8137", tel: "+2348033968137", wa: `https://wa.me/2348033968137?text=${WHATSAPP_MESSAGE}` },
                      ].map((num) => (
                        <a
                          key={num.tel}
                          href={num.wa}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 text-sm sm:text-base text-gray-600 hover:text-[#25D366] transition-colors group/phone"
                        >
                          <FaWhatsapp size={14} className="text-[#25D366] flex-shrink-0" />
                          <span className="group-hover/phone:underline">{num.display}</span>
                          <span className="text-xs text-[#25D366] opacity-0 group-hover/phone:opacity-100 transition-opacity">
                            → Open WhatsApp
                          </span>
                        </a>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Email */}
                <div className="flex items-start gap-4">
                  <div className="bg-green-100 p-2.5 sm:p-3 rounded-xl flex-shrink-0">
                    <Mail className="text-green-700" size={20} />
                  </div>
                  <div>
                    <h4 className="font-bold text-green-800 mb-1 text-sm sm:text-base">Email</h4>
                    <a
                      href="mailto:emgo@gmail.com"
                      className="text-gray-500 text-sm sm:text-base hover:text-orange-500 transition-colors"
                    >
                      emgo@gmail.com
                    </a>
                  </div>
                </div>

                {/* Business Hours */}
                <div className="flex items-start gap-4">
                  <div className="bg-green-100 p-2.5 sm:p-3 rounded-xl flex-shrink-0">
                    <Clock className="text-green-700" size={20} />
                  </div>
                  <div>
                    <h4 className="font-bold text-green-800 mb-1 text-sm sm:text-base">Business Hours</h4>
                    <p className="text-gray-500 text-sm sm:text-base">Monday – Friday: 8:00 AM – 5:00 PM</p>
                    <p className="text-gray-500 text-sm sm:text-base">Saturday: 9:00 AM – 2:00 PM</p>
                  </div>
                </div>

              </div>
            </motion.div>


            {/* ── RIGHT: CONTACT FORM ────────────────────────── */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="bg-white shadow-xl sm:shadow-2xl rounded-2xl sm:rounded-3xl p-6 sm:p-8 lg:p-10 border border-gray-100"
            >
              <h3 className="text-xl sm:text-2xl font-bold text-green-800 mb-1 sm:mb-2">
                Send Us a Message
              </h3>
              <p className="text-gray-400 text-xs sm:text-sm mb-6 sm:mb-7">
                Fill in the form and we'll get back to you within 24 hours.
              </p>

              <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">

                {/* Name + Email — side by side on sm+ */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      name="name"
                      placeholder="John Doe"
                      required
                      value={form.name}
                      onChange={handleChange}
                      className={inputClass}
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      name="email"
                      placeholder="john@example.com"
                      required
                      value={form.email}
                      onChange={handleChange}
                      className={inputClass}
                    />
                  </div>
                </div>

                {/* Phone + Service — side by side on sm+ */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      placeholder="+234 800 000 0000"
                      value={form.phone}
                      onChange={handleChange}
                      className={inputClass}
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5">
                      Service Interested In
                    </label>
                    <select
                      name="service"
                      value={form.service}
                      onChange={handleChange}
                      className={inputClass}
                    >
                      <option value="">Select a Service</option>
                      <option>Oil Palm Farming</option>
                      <option>Palm Oil Production</option>
                      <option>Palm Kernel Oil Refining</option>
                      <option>Partnership / Investment</option>
                      <option>Other Inquiry</option>
                    </select>
                  </div>
                </div>

                {/* Message */}
                <div>
                  <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5">
                    Your Message *
                  </label>
                  <textarea
                    name="message"
                    placeholder="Tell us about your inquiry, requirements, or how we can help…"
                    rows={5}
                    required
                    value={form.message}
                    onChange={handleChange}
                    className={`${inputClass} resize-none`}
                  />
                </div>

                {/* Submit */}
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3.5 sm:py-4 bg-orange-500 hover:bg-orange-600 disabled:opacity-60 text-white rounded-xl font-bold text-sm sm:text-base transition-all duration-200 hover:scale-[1.01] active:scale-95 shadow-md"
                >
                  {loading ? (
                    <span className="flex items-center justify-center gap-2">
                      <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                      </svg>
                      Sending…
                    </span>
                  ) : "Submit Inquiry →"}
                </button>

                {submitted && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex items-start gap-3 bg-green-50 border border-green-200 rounded-xl p-4"
                  >
                    <span className="text-green-600 text-lg flex-shrink-0">✅</span>
                    <p className="text-green-700 font-semibold text-sm sm:text-base">
                      Thank you for contacting EMGO Farms. We will respond within 24 hours.
                    </p>
                  </motion.div>
                )}

                {/* OR WhatsApp row */}
                <div className="flex items-center gap-3">
                  <div className="flex-1 h-px bg-gray-100" />
                  <span className="text-gray-400 text-xs font-medium">or</span>
                  <div className="flex-1 h-px bg-gray-100" />
                </div>

                <a
                  href={WHATSAPP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-center gap-2.5 py-3.5 bg-[#25D366] hover:bg-[#1ebe5d] text-white rounded-xl font-bold text-sm sm:text-base transition-all duration-200 hover:scale-[1.01] active:scale-95 shadow-md"
                >
                  <FaWhatsapp size={18} />
                  Chat Directly on WhatsApp
                </a>

              </form>
            </motion.div>

          </div>
        </div>
      </section>


      {/* ── MAP PLACEHOLDER ───────────────────────────────────── */}
      <section className="pb-12 sm:pb-16 lg:pb-20">
        <div className="max-w-6xl mx-auto px-5 sm:px-8 lg:px-10">
          <div className="rounded-2xl sm:rounded-3xl overflow-hidden shadow-lg border border-gray-100 bg-green-50 h-48 sm:h-64 lg:h-80 flex items-center justify-center">
            <div className="text-center">
              <MapPin size={36} className="text-green-600 mx-auto mb-3" />
              <p className="text-green-800 font-semibold text-sm sm:text-base">Victoria Garden City, Lagos, Nigeria</p>
              <a
                href="https://maps.google.com/?q=Victoria+Garden+City+Lagos+Nigeria"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-3 inline-block text-orange-500 hover:text-orange-600 font-semibold text-xs sm:text-sm underline underline-offset-2"
              >
                Open in Google Maps →
              </a>
            </div>
          </div>
        </div>
      </section>


      {/* ── CTA SECTION ───────────────────────────────────────── */}
      <section className="py-12 sm:py-16 lg:py-20 bg-green-900 text-white">
        <div className="max-w-3xl mx-auto px-5 sm:px-8 lg:px-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <span className="inline-block bg-white/10 border border-white/20 text-green-200 text-xs font-bold tracking-widest uppercase px-4 py-1.5 rounded-full mb-4 sm:mb-5">
              Let's Connect
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4 sm:mb-5 leading-tight">
              Ready to Partner With EMGO Farms?
            </h2>
            <p className="text-sm sm:text-base lg:text-lg text-green-200 mb-8 sm:mb-10 max-w-xl mx-auto leading-relaxed opacity-90">
              Whether you need raw palm materials, refined oils, or a full-scale agro-industrial partnership —
              we are ready to serve you with excellence and integrity.
            </p>

            {/* Stacked on mobile, inline on sm+ */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 sm:px-10 py-3.5 sm:py-4 bg-[#25D366] hover:bg-[#1ebe5d] text-white rounded-full font-bold text-sm sm:text-base transition-all duration-200 shadow-xl hover:scale-[1.03] active:scale-95"
              >
                <FaWhatsapp size={18} />
                WhatsApp Us Now
              </a>
              <Link
                href="/products"
                className="w-full sm:w-auto inline-block px-8 sm:px-10 py-3.5 sm:py-4 border-2 border-white/50 hover:border-white text-white rounded-full font-semibold text-sm sm:text-base transition-all duration-200 hover:bg-white/10 text-center"
              >
                View Our Products
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

    </div>
  )
}