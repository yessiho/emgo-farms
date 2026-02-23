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

// ── WhatsApp config ──────────────────────────────────────────
const WHATSAPP_NUMBER = "2348033395971" // no + or spaces
const WHATSAPP_MESSAGE = encodeURIComponent(
  "Hello EMGO Farms! I'd like to get in touch regarding your products and services."
)
const WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMBER}?text=${WHATSAPP_MESSAGE}`

export const Footer = () => {
  const [email, setEmail] = useState("")
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

  const navLinks = [
    { label: "Home", href: "/" },
    { label: "About", href: "/about" },
    { label: "Services", href: "/services" },
    { label: "Products", href: "/products" },
    { label: "Gallery", href: "/gallery" },
    { label: "Blog", href: "/blog" },
  ]

  const socialLinks = [
    { Icon: FaFacebookF,  href: "#",            label: "Facebook" },
    { Icon: FaTwitter,    href: "#",            label: "Twitter" },
    { Icon: FaInstagram,  href: "#",            label: "Instagram" },
    { Icon: FaLinkedinIn, href: "#",            label: "LinkedIn" },
    { Icon: FaYoutube,    href: "#",            label: "YouTube" },
    { Icon: FaWhatsapp,   href: WHATSAPP_URL,   label: "WhatsApp" },
  ]

  return (
    <>
      {/* ── Floating WhatsApp Button ──────────────────────────── */}
      <a
        href={WHATSAPP_URL}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat with us on WhatsApp"
        className="fixed bottom-6 right-5 z-50 flex items-center gap-2.5 bg-[#25D366] text-white pl-4 pr-5 py-3.5 rounded-full shadow-2xl hover:bg-[#1ebe5d] hover:scale-105 active:scale-95 transition-all duration-200 group"
      >
        <FaWhatsapp size={22} className="flex-shrink-0" />
        <span className="text-sm font-semibold hidden sm:inline whitespace-nowrap">
          Chat with us
        </span>
      </a>

      {/* ── FOOTER ───────────────────────────────────────────── */}
      <footer className="relative bg-gradient-to-br from-green-900 via-green-800 to-green-950 text-white mt-auto overflow-hidden">

        {/* Subtle glass overlay */}
        <div className="absolute inset-0 bg-white/5 backdrop-blur-lg pointer-events-none" />

        {/* ── TOP BRAND STRIP ── */}
        <div className="relative border-b border-white/10">
          <div className="max-w-7xl mx-auto px-5 sm:px-8 py-8 flex flex-col sm:flex-row items-center justify-between gap-6">

            {/* Logo + tagline */}
            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 text-center sm:text-left">
              <div className="bg-white rounded-2xl px-3 py-2 shadow-md flex-shrink-0">
                <Image
                  src="/image/logo2.jpeg"
                  alt="EMGO Farms Logo"
                  width={100}
                  height={36}
                  className="object-contain h-9 w-auto"
                />
              </div>
              <div>
                <h3 className="text-xl font-bold tracking-wide">EMGO Farms</h3>
                <p className="text-gray-300 text-sm mt-0.5">
                  Building Nigeria's agro-industrial future, one harvest at a time.
                </p>
              </div>
            </div>

            {/* Social icons row */}
            <div className="flex items-center gap-3 flex-wrap justify-center">
              {socialLinks.map(({ Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className={`p-2.5 rounded-full transition-all duration-200 hover:scale-110 active:scale-95 ${
                    label === "WhatsApp"
                      ? "bg-[#25D366] hover:bg-[#1ebe5d] shadow-lg"
                      : "bg-white/10 hover:bg-orange-500"
                  }`}
                >
                  <Icon size={15} />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* ── MAIN GRID ── */}
        <div className="relative max-w-7xl mx-auto px-5 sm:px-8 py-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12">

          {/* 1 — About blurb */}
          <div className="sm:col-span-2 lg:col-span-1">
            <h4 className="text-base font-semibold mb-4 text-orange-400 uppercase tracking-widest">
              Who We Are
            </h4>
            <p className="text-gray-300 leading-relaxed text-sm">
              EMGO Farms and Integrated Services Limited is a premium agro-industrial
              enterprise cultivating oil palm, cassava, and other cash crops in Nsit Atai,
              Akwa Ibom State — delivering sustainable value from farm to shelf.
            </p>

            {/* WhatsApp CTA inline */}
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 mt-6 px-5 py-2.5 bg-[#25D366] hover:bg-[#1ebe5d] text-white text-sm font-semibold rounded-full shadow-md hover:scale-105 transition-all duration-200"
            >
              <FaWhatsapp size={16} />
              WhatsApp Us
            </a>
          </div>

          {/* 2 — Navigation */}
          <div>
            <h4 className="text-base font-semibold mb-4 text-orange-400 uppercase tracking-widest">
              Company
            </h4>
            <ul className="space-y-2.5">
              {navLinks.map(({ label, href }) => (
                <li key={label}>
                  <Link
                    href={href}
                    className="text-gray-300 hover:text-orange-400 text-sm transition-colors duration-200 flex items-center gap-2 group"
                  >
                    <span className="w-0 group-hover:w-3 h-px bg-orange-400 transition-all duration-200 rounded-full" />
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* 3 — Contact */}
          <div>
            <h4 className="text-base font-semibold mb-4 text-orange-400 uppercase tracking-widest">
              Contact
            </h4>

            <div className="space-y-4">

              {/* Email */}
              <a
                href="mailto:emgo@gmail.com"
                className="flex items-start gap-3 group"
              >
                <span className="mt-0.5 p-2 rounded-lg bg-white/10 group-hover:bg-orange-500 transition">
                  <FaEnvelope size={12} className="text-orange-400 group-hover:text-white transition" />
                </span>
                <span className="text-gray-300 group-hover:text-orange-400 text-sm transition-colors break-all">
                  emgo@gmail.com
                </span>
              </a>

              {/* Phone — tap-to-call on mobile */}
              <div className="flex items-start gap-3 group">
                <span className="mt-0.5 p-2 rounded-lg bg-white/10 group-hover:bg-orange-500 transition">
                  <FaPhoneAlt size={12} className="text-orange-400 group-hover:text-white transition" />
                </span>
                <div className="space-y-1">
                  <a
                    href="tel:+2348033395971"
                    className="block text-gray-300 hover:text-orange-400 text-sm transition-colors"
                  >
                    +234 803 339 5971
                  </a>
                  <a
                    href="tel:+2348033968137"
                    className="block text-gray-300 hover:text-orange-400 text-sm transition-colors"
                  >
                    +234 803 396 8137
                  </a>
                </div>
              </div>

              {/* WhatsApp contact row */}
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-start gap-3 group"
              >
                <span className="mt-0.5 p-2 rounded-lg bg-[#25D366]/20 group-hover:bg-[#25D366] transition">
                  <FaWhatsapp size={12} className="text-[#25D366] group-hover:text-white transition" />
                </span>
                <span className="text-gray-300 group-hover:text-[#25D366] text-sm transition-colors">
                  Chat on WhatsApp
                </span>
              </a>

              {/* Address */}
              <div className="flex items-start gap-3">
                <span className="mt-0.5 p-2 rounded-lg bg-white/10">
                  <FaMapMarkerAlt size={12} className="text-orange-400" />
                </span>
                <p className="text-gray-300 text-sm leading-relaxed">
                  House D27a, Road 61 <br />
                  Victoria Garden City, Lagos
                </p>
              </div>

            </div>
          </div>

          {/* 4 — Newsletter */}
          <div>
            <h4 className="text-base font-semibold mb-4 text-orange-400 uppercase tracking-widest">
              Newsletter
            </h4>
            <p className="text-gray-300 text-sm mb-5 leading-relaxed">
              Subscribe for agribusiness insights, palm oil market updates, and farm news.
            </p>

            <form onSubmit={handleSubscribe} className="space-y-3">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Your email address"
                className="w-full px-4 py-3 text-sm rounded-xl bg-white/10 border border-white/20 placeholder-gray-400 text-white focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition"
              />
              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 bg-orange-500 hover:bg-orange-600 disabled:opacity-60 rounded-xl font-semibold text-sm transition-all duration-200 hover:scale-[1.02] active:scale-95"
              >
                {loading ? "Subscribing…" : "Subscribe"}
              </button>

              {success && (
                <p className="flex items-center gap-1.5 text-green-400 text-sm">
                  <span>✓</span> Successfully subscribed!
                </p>
              )}
            </form>
          </div>

        </div>

        {/* ── BOTTOM BAR ── */}
        <div className="relative border-t border-white/10">
          <div className="max-w-7xl mx-auto px-5 sm:px-8 py-5 flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left">
            <p className="text-gray-400 text-xs">
              © {new Date().getFullYear()} EMGO Farms & Integrated Services Limited. All rights reserved.
            </p>
            <div className="flex items-center gap-4 text-xs text-gray-500">
              <Link href="/privacy" className="hover:text-orange-400 transition">Privacy Policy</Link>
              <span>·</span>
              <Link href="/terms" className="hover:text-orange-400 transition">Terms of Use</Link>
              <span>·</span>
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 text-[#25D366] hover:text-[#1ebe5d] transition font-medium"
              >
                <FaWhatsapp size={12} /> WhatsApp
              </a>
            </div>
          </div>
        </div>

      </footer>
    </>
  )
}