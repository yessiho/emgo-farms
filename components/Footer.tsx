'use client'

import Link from "next/link"
import Image from "next/image"
import { useState } from "react"
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
  FaYoutube,
  FaWhatsapp,
  FaPhoneAlt,
  FaEnvelope,
  FaMapMarkerAlt,
} from "react-icons/fa"

// ── Config ────────────────────────────────────────────────────
const WHATSAPP_NUMBER  = "2348166727320"
const WHATSAPP_MESSAGE = encodeURIComponent(
  "Hello EMGO Farms! I'd like to get in touch regarding your products and services."
)
const WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMBER}?text=${WHATSAPP_MESSAGE}`

// ── Both phone numbers link directly to WhatsApp ──────────────
const PHONE_1 = { display: "08131350333", wa: `https://wa.me/2348131350333?text=${WHATSAPP_MESSAGE}` }
const PHONE_2 = { display: "08166727320", wa: `https://wa.me/2348166727320?text=${WHATSAPP_MESSAGE}` }

const navLinks = [
  { label: "Home",     href: "/" },
  { label: "About",    href: "/about" },
  { label: "Services", href: "/services" },
  { label: "Products", href: "/products" },
  { label: "Gallery",  href: "/gallery" },
  { label: "Blog",     href: "/blog" },
  { label: "Contact",  href: "/contact" },
]

const socialLinks = [
  { Icon: FaFacebookF,  href: "#",          label: "Facebook",  whatsapp: false },
  { Icon: FaTwitter,    href: "#",          label: "Twitter",   whatsapp: false },
  { Icon: FaInstagram,  href: "#",          label: "Instagram", whatsapp: false },
  { Icon: FaLinkedinIn, href: "#",          label: "LinkedIn",  whatsapp: false },
  { Icon: FaYoutube,    href: "#",          label: "YouTube",   whatsapp: false },
  { Icon: FaWhatsapp,   href: WHATSAPP_URL, label: "WhatsApp",  whatsapp: true  },
]

export const Footer = () => {
  const [email,   setEmail]   = useState("")
  const [success, setSuccess] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    const res = await fetch("/api/newsletter", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    })
    if (res.ok) {
      setSuccess(true)
      setEmail("")
      setTimeout(() => setSuccess(false), 4000)
    }
    setLoading(false)
  }

  return (
    <>
      {/* ── Floating WhatsApp bubble ────────────────────────── */}
      <a
        href={WHATSAPP_URL}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat with us on WhatsApp"
        className="fixed bottom-5 right-4 sm:bottom-6 sm:right-5 z-50 flex items-center gap-2.5 bg-[#25D366] hover:bg-[#1ebe5d] text-white pl-3.5 pr-4 sm:pl-4 sm:pr-5 py-3 sm:py-3.5 rounded-full shadow-2xl hover:scale-105 active:scale-95 transition-all duration-200"
      >
        <FaWhatsapp size={20} className="flex-shrink-0 sm:text-[22px]" />
        <span className="text-xs sm:text-sm font-semibold hidden sm:inline whitespace-nowrap">
          Chat with us
        </span>
      </a>

      {/* ── FOOTER ───────────────────────────────────────────── */}
      <footer className="relative bg-gradient-to-br from-green-900 via-green-800 to-green-950 text-white mt-auto overflow-hidden">

        {/* Glass overlay */}
        <div className="absolute inset-0 bg-white/5 backdrop-blur-lg pointer-events-none" />

        {/* ── BRAND STRIP ─────────────────────────────────────── */}
        <div className="relative border-b border-white/10">
          <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-10 py-6 sm:py-8">
            <div className="flex flex-col sm:flex-row items-center sm:justify-between gap-4 sm:gap-6 flex-wrap">

              <div className="flex flex-col sm:flex-row items-center sm:items-start gap-3 sm:gap-4 text-center sm:text-left">
                <div className="relative flex-shrink-0 group">
                  <div className="absolute inset-0 bg-gradient-to-br from-white/40 to-white/10 rounded-2xl blur-md opacity-60 group-hover:opacity-80 transition-all duration-300" />
                  <div className="relative bg-white/90 backdrop-blur-md border border-white/30 rounded-2xl px-4 py-2.5 shadow-xl group-hover:shadow-2xl transition-all duration-300">
                    <Image
                      src="/image/logo02.png"
                      alt="EMGO Farms Logo"
                      width={100}
                      height={36}
                      className="object-contain h-8 sm:h-9 w-auto"
                    />
                  </div>
                </div>
                <div>
                  <h3 className="text-base sm:text-xl font-bold tracking-wide">EMGO Farms</h3>
                  <p className="text-gray-300 text-xs sm:text-sm mt-0.5 max-w-xs">
                    Building Nigeria's agro-industrial future, one harvest at a time.
                  </p>
                </div>
              </div>

              {/* Social icons */}
              <div className="flex items-center gap-2 sm:gap-3 flex-wrap justify-center sm:justify-end">
                {socialLinks.map(({ Icon, href, label, whatsapp }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    className={`p-2 sm:p-2.5 rounded-full transition-all duration-200 hover:scale-110 active:scale-95 ${
                      whatsapp
                        ? "bg-[#25D366] hover:bg-[#1ebe5d] shadow-lg"
                        : "bg-white/10 hover:bg-orange-500"
                    }`}
                  >
                    <Icon size={13} className="sm:text-[15px]" />
                  </a>
                ))}
              </div>

            </div>
          </div>
        </div>

        {/* ── MAIN GRID ────────────────────────────────────────── */}
        <div className="relative max-w-7xl mx-auto px-5 sm:px-8 lg:px-10 py-10 sm:py-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 lg:gap-10">

          {/* ── 1. About ── */}
          <div className="sm:col-span-2 lg:col-span-1">
            <h4 className="text-xs sm:text-sm font-bold mb-4 text-orange-400 uppercase tracking-widest">
              Who We Are
            </h4>
            <p className="text-gray-300 leading-relaxed text-xs sm:text-sm">
              EMGO Farms and Integrated Services Limited is a premium agro-industrial
              enterprise cultivating oil palm, cassava, and other cash crops in Nsit Atai,
              Akwa Ibom State — delivering sustainable value from farm to shelf.
            </p>
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 mt-5 sm:mt-6 px-4 sm:px-5 py-2 sm:py-2.5 bg-[#25D366] hover:bg-[#1ebe5d] text-white text-xs sm:text-sm font-semibold rounded-full shadow-md hover:scale-105 transition-all duration-200"
            >
              <FaWhatsapp size={14} />
              WhatsApp Us
            </a>
          </div>

          {/* ── 2. Navigation ── */}
          <div>
            <h4 className="text-xs sm:text-sm font-bold mb-4 text-orange-400 uppercase tracking-widest">
              Company
            </h4>
            <ul className="grid grid-cols-2 sm:grid-cols-1 gap-x-4 gap-y-2 sm:gap-y-2.5">
              {navLinks.map(({ label, href }) => (
                <li key={label}>
                  <Link
                    href={href}
                    className="text-gray-300 hover:text-orange-400 text-xs sm:text-sm transition-colors duration-200 flex items-center gap-2 group"
                  >
                    <span className="w-0 group-hover:w-3 h-px bg-orange-400 transition-all duration-200 rounded-full flex-shrink-0" />
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* ── 3. Contact ── */}
          <div>
            <h4 className="text-xs sm:text-sm font-bold mb-4 text-orange-400 uppercase tracking-widest">
              Contact
            </h4>

            <div className="space-y-2.5 sm:space-y-3">

              {/* Email */}
              <a href="mailto:emgo@gmail.com" className="flex items-start gap-3 group">
                <span className="mt-0.5 p-1.5 sm:p-2 rounded-lg bg-white/10 group-hover:bg-orange-500 transition flex-shrink-0">
                  <FaEnvelope size={11} className="text-orange-400 group-hover:text-white transition" />
                </span>
                <span className="text-gray-300 group-hover:text-orange-400 text-xs sm:text-sm transition-colors break-all leading-snug mt-0.5">
                  emgo@gmail.com
                </span>
              </a>

              {/* Phone numbers — both link to WhatsApp */}
              <div className="flex items-start gap-3">
                <span className="mt-0.5 p-1.5 sm:p-2 rounded-lg bg-white/10 flex-shrink-0">
                  <FaPhoneAlt size={11} className="text-orange-400" />
                </span>
                <div className="space-y-1.5">
                  <a
                    href={PHONE_1.wa}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 text-gray-300 hover:text-[#25D366] text-xs sm:text-sm transition-colors"
                  >
                    <FaWhatsapp size={11} className="text-[#25D366] flex-shrink-0" />
                    {PHONE_1.display}
                  </a>
                  <a
                    href={PHONE_2.wa}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 text-gray-300 hover:text-[#25D366] text-xs sm:text-sm transition-colors"
                  >
                    <FaWhatsapp size={11} className="text-[#25D366] flex-shrink-0" />
                    {PHONE_2.display}
                  </a>
                </div>
              </div>

              {/* Chat on WhatsApp row */}
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-start gap-3 group"
              >
                <span className="mt-0.5 p-1.5 sm:p-2 rounded-lg bg-[#25D366]/20 group-hover:bg-[#25D366] transition flex-shrink-0">
                  <FaWhatsapp size={11} className="text-[#25D366] group-hover:text-white transition" />
                </span>
                <span className="text-gray-300 group-hover:text-[#25D366] text-xs sm:text-sm transition-colors mt-0.5">
                  Chat on WhatsApp
                </span>
              </a>

              {/* Address */}
              <div className="flex items-start gap-3">
                <span className="mt-0.5 p-1.5 sm:p-2 rounded-lg bg-white/10 flex-shrink-0">
                  <FaMapMarkerAlt size={11} className="text-orange-400" />
                </span>
                <p className="text-gray-300 text-xs sm:text-sm leading-relaxed mt-0.5">
                  House D27a, Road 61<br />
                  Victoria Garden City, Lagos
                </p>
              </div>

            </div>
          </div>

          {/* ── 4. Newsletter ── */}
          <div>
            <h4 className="text-xs sm:text-sm font-bold mb-4 text-orange-400 uppercase tracking-widest">
              Newsletter
            </h4>
            <p className="text-gray-300 text-xs sm:text-sm mb-4 sm:mb-5 leading-relaxed">
              Subscribe for agribusiness insights, palm oil market updates, and farm news.
            </p>

            <form onSubmit={handleSubscribe} className="space-y-2.5 sm:space-y-3">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Your email address"
                className="w-full px-3.5 sm:px-4 py-2.5 sm:py-3 text-xs sm:text-sm rounded-xl bg-white/10 border border-white/20 placeholder-gray-400 text-white focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition"
              />
              <button
                type="submit"
                disabled={loading}
                className="w-full py-2.5 sm:py-3 bg-orange-500 hover:bg-orange-600 disabled:opacity-60 rounded-xl font-semibold text-xs sm:text-sm transition-all duration-200 hover:scale-[1.02] active:scale-95"
              >
                {loading ? "Subscribing…" : "Subscribe →"}
              </button>
              {success && (
                <p className="flex items-center gap-1.5 text-green-400 text-xs sm:text-sm">
                  <span>✓</span> Successfully subscribed!
                </p>
              )}
            </form>

            <div className="mt-5 sm:mt-6 pt-4 sm:pt-5 border-t border-white/10">
              <p className="text-gray-400 text-xs font-semibold uppercase tracking-widest mb-2">
                Business Hours
              </p>
              <p className="text-gray-400 text-xs leading-relaxed">
                Mon – Fri: 8:00 AM – 5:00 PM<br />
                Saturday: 9:00 AM – 2:00 PM
              </p>
            </div>
          </div>

        </div>

        {/* ── BOTTOM BAR ───────────────────────────────────────── */}
        <div className="relative border-t border-white/10">
          <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-10 py-4 sm:py-5">
            <div className="flex flex-col sm:flex-row items-center sm:justify-between gap-2 sm:gap-4 text-center sm:text-left flex-wrap">

              <p className="text-gray-400 text-[10px] sm:text-xs order-2 sm:order-1">
                © {new Date().getFullYear()} EMGO Farms & Integrated Services Limited. All rights reserved.
              </p>

              <div className="flex items-center flex-wrap justify-center sm:justify-end gap-3 sm:gap-4 text-[10px] sm:text-xs text-gray-500 order-1 sm:order-2">
                <Link href="/privacy" className="hover:text-orange-400 transition whitespace-nowrap">
                  Privacy Policy
                </Link>
                <span className="text-gray-600">·</span>
                <Link href="/terms" className="hover:text-orange-400 transition whitespace-nowrap">
                  Terms of Use
                </Link>
                <span className="text-gray-600">·</span>
                <a
                  href={WHATSAPP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 text-[#25D366] hover:text-[#1ebe5d] transition font-semibold whitespace-nowrap"
                >
                  <FaWhatsapp size={11} /> WhatsApp
                </a>
              </div>

            </div>
          </div>
        </div>

      </footer>
    </>
  )
}