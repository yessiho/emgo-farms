'use client'

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import { Menu, X } from "lucide-react"
import { usePathname } from "next/navigation"

export const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [visible, setVisible] = useState(true)
  const pathname = usePathname()

  // Hide on scroll down, show on scroll up
  useEffect(() => {
    let lastScroll = 0
    const handleScroll = () => {
      const currentScroll = window.scrollY
      setVisible(currentScroll < lastScroll || currentScroll < 100)
      lastScroll = currentScroll
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
    { name: "Products", path: "/products" },
    { name: "Gallery", path: "/gallery" },
    { name: "Blog", path: "/blog" },
    { name: "Services", path: "/services" },
  ]

  return (
    <AnimatePresence>
      {visible && (
        <motion.nav
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -100, opacity: 0 }}
          transition={{ duration: 0.4 }}
          className="fixed top-0 bg-white/70 backdrop-blur-md w-full z-50 shadow-md py-4"
        >
          <div className="w-full mx-auto flex justify-between items-center px-6">

            {/* LOGO */}
            <Link href="/" className="flex items-center group">
              <div className="relative p-1 rounded-3xl bg-gradient-to-r from-green-700 via-green-600 to-orange-500 shadow-lg">
                <div className="bg-white/90 backdrop-blur-sm rounded-3xl p-3 shadow-md group-hover:shadow-xl transition-all duration-300 hover:scale-105">
                  <Image
                    src="/image/logo2.jpeg"
                    alt="EMGO Farms Logo"
                    width={160}  // larger width
                    height={60}  // larger height
                    priority
                    className="object-contain"
                  />
                </div>
              </div>
            </Link>

            {/* DESKTOP MENU */}
            <ul className="hidden md:flex space-x-10 font-medium items-center">
              {navLinks.map((link) => (
                <li key={link.name} className="relative group">
                  <Link
                    href={link.path}
                    className={`transition ${
                      pathname === link.path
                        ? "text-orange-500"
                        : "text-gray-800 hover:text-orange-500"
                    }`}
                  >
                    {link.name}
                  </Link>
                  <span
                    className={`absolute left-0 -bottom-1 h-[2px] bg-orange-500 transition-all duration-300 ${
                      pathname === link.path ? "w-full" : "w-0 group-hover:w-full"
                    }`}
                  ></span>
                </li>
              ))}

              {/* CTA BUTTON */}
              <li>
                <Link
                  href="/contact"
                  className="ml-4 px-7 py-3 rounded-full bg-gradient-to-r from-orange-500 to-orange-600 text-white font-semibold shadow-md hover:scale-105 hover:shadow-lg transition"
                >
                  Contact
                </Link>
              </li>
            </ul>

            {/* MOBILE BUTTON */}
            <button
              className="md:hidden text-gray-800"
              onClick={() => setMobileOpen(!mobileOpen)}
            >
              {mobileOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>

          {/* MOBILE MENU */}
          <AnimatePresence>
            {mobileOpen && (
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="md:hidden bg-white/90 backdrop-blur-md shadow-lg border-t border-gray-200"
              >
                <ul className="flex flex-col space-y-6 p-6 text-gray-800">
                  {navLinks.map((link) => (
                    <li key={link.name}>
                      <Link
                        href={link.path}
                        onClick={() => setMobileOpen(false)}
                        className="block hover:text-orange-500 transition"
                      >
                        {link.name}
                      </Link>
                    </li>
                  ))}
                  <li>
                    <Link
                      href="/contact"
                      onClick={() => setMobileOpen(false)}
                      className="block text-center px-6 py-3 rounded-full bg-orange-500 text-white font-semibold hover:bg-orange-600 transition"
                    >
                      Request Quote
                    </Link>
                  </li>
                </ul>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.nav>
      )}
    </AnimatePresence>
  )
}