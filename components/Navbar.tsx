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
          initial={{ y: -100 }}
          animate={{ y: 0 }}
          exit={{ y: -100 }}
          transition={{ duration: 0.4 }}
          className="fixed top-0 w-full z-50 backdrop-blur-xl bg-white/90 border-b border-white/20 shadow-lg"
        >
          <div className="w-full max-w-7xl mx-auto flex justify-between items-center px-5 sm:px-8 lg:px-10 py-4 sm:py-5">

            {/* LOGO */}
            <Link href="/" className="flex items-center flex-shrink-0">
              <Image
                src="/image/logo02.png"
                alt="Emgo Farms Logo"
                width={180}          // Increased width
                height={70}          // Increased height
                priority
                className="object-contain h-10 sm:h-12 md:h-14 lg:h-16" // responsive heights
              />
            </Link>


            {/* DESKTOP MENU */}
            <ul className="hidden md:flex space-x-6 lg:space-x-12 font-medium items-center text-[14px] sm:text-[15px] tracking-wide">
              {navLinks.map((link) => (
                <li key={link.name} className="relative group">
                  <Link
                    href={link.path}
                    className={`transition duration-300 ${
                      pathname === link.path
                        ? "text-orange-500"
                        : "text-gray-800 hover:text-orange-500"
                    }`}
                  >
                    {link.name}
                  </Link>
                  <span
                    className={`absolute left-0 -bottom-1 h-[2px] bg-orange-500 transition-all duration-300 ${
                      pathname === link.path
                        ? "w-full"
                        : "w-0 group-hover:w-full"
                    }`}
                  ></span>
                </li>
              ))}

              {/* CTA BUTTON */}
              <li>
                <Link
                  href="/contact"
                  className="ml-4 sm:ml-6 px-5 sm:px-6 py-2 sm:py-3 rounded-full bg-gradient-to-r from-green-700 to-orange-500 text-white font-semibold shadow-md hover:shadow-xl hover:scale-105 transition-all duration-300 text-[13px] sm:text-sm"
                >
                  Contact Us
                </Link>
              </li>
            </ul>

            {/* MOBILE BUTTON */}
            <button
              className="md:hidden text-gray-800 focus:outline-none"
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
                className="md:hidden bg-white/95 backdrop-blur-xl border-t shadow-xl"
              >
                <ul className="flex flex-col gap-5 p-6 text-gray-800 font-medium text-base sm:text-[15px]">
                  {navLinks.map((link) => (
                    <li key={link.name}>
                      <Link
                        href={link.path}
                        onClick={() => setMobileOpen(false)}
                        className="block hover:text-orange-500 transition-colors"
                      >
                        {link.name}
                      </Link>
                    </li>
                  ))}

                  <Link
                    href="/contact"
                    onClick={() => setMobileOpen(false)}
                    className="mt-3 sm:mt-4 text-center px-6 py-3 rounded-full bg-gradient-to-r from-green-700 to-orange-500 text-white font-semibold shadow-md hover:shadow-lg hover:scale-105 transition-all duration-300 text-sm"
                  >
                    Contact Us
                  </Link>
                </ul>
              </motion.div>
            )}
          </AnimatePresence>

        </motion.nav>
      )}
    </AnimatePresence>
  )
}
