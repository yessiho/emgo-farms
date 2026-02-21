'use client'

import Link from "next/link"
import { useState } from "react"
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
  FaYoutube,
  FaPhoneAlt,
  FaEnvelope,
  FaMapMarkerAlt,
} from "react-icons/fa"

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

  return (
    <footer className="relative bg-gradient-to-br from-green-900 via-green-800 to-green-950 text-white mt-auto overflow-hidden">

      {/* Glass Overlay */}
      <div className="absolute inset-0 bg-white/5 backdrop-blur-lg"></div>

      <div className="relative container mx-auto grid md:grid-cols-4 gap-12 px-6 py-20">

        {/* Company Info */}
        <div>
          <h3 className="text-2xl font-bold mb-4 tracking-wide">
            EMGO Farms
          </h3>
          <p className="text-gray-300 leading-relaxed">
            Sustainable agriculture, premium palm oil production, and modern farming innovation across Nigeria.
          </p>

          {/* Social Media */}
          <div className="flex mt-6 space-x-4">
            {[FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn, FaYoutube].map((Icon, i) => (
              <div key={i} className="p-3 bg-white/10 rounded-full hover:bg-orange-500 transition cursor-pointer">
                <Icon size={16} />
              </div>
            ))}
          </div>
        </div>

        {/* Navigation */}
        <div>
          <h4 className="font-semibold mb-6 text-lg">Company</h4>
          <ul className="space-y-3 text-gray-300">
            {["Home","About","Services","Products","Gallery","Blog","Contact"].map((link, i) => (
              <li key={i}>
                <Link href={`/${link.toLowerCase()}`} className="hover:text-orange-400 transition">
                  {link}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact Section with Icons */}
        <div>
          <h4 className="font-semibold mb-6 text-lg">Contact</h4>

          <div className="space-y-4 text-gray-300">

            <div className="flex items-start gap-3">
              <FaEnvelope className="text-orange-400 mt-1" />
              <a href="mailto:emgo@gmail.com" className="hover:text-orange-400 transition">
                emgo@gmail.com
              </a>
            </div>

            <div className="flex items-start gap-3">
              <FaPhoneAlt className="text-orange-400 mt-1" />
              <div>
                <a href="tel:+2348033395971" className="block hover:text-orange-400 transition">
                  +234 803 339 5971
                </a>
                <a href="tel:+2348033968137" className="block hover:text-orange-400 transition">
                  +234 803 396 8137
                </a>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <FaMapMarkerAlt className="text-orange-400 mt-1" />
              <p>
                House D27a, Road 61 <br />
                Victoria Garden City, Lagos
              </p>
            </div>

          </div>
        </div>

        {/* Newsletter */}
        <div>
          <h4 className="font-semibold mb-6 text-lg">Newsletter</h4>
          <p className="text-gray-300 mb-4">
            Subscribe for updates on palm oil production and agribusiness insights.
          </p>

          <form onSubmit={handleSubscribe} className="space-y-3">
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Your email address"
              className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-orange-500 hover:bg-orange-600 rounded-xl font-semibold transition"
            >
              {loading ? "Subscribing..." : "Subscribe"}
            </button>

            {success && (
              <p className="text-green-400 text-sm">
                ✓ Successfully subscribed!
              </p>
            )}
          </form>
        </div>

      </div>

      {/* Bottom Bar */}
      <div className="relative border-t border-white/10 text-center py-6 text-gray-400 text-sm">
        © {new Date().getFullYear()} EMGO Farms. All rights reserved.
      </div>

    </footer>
  )
}