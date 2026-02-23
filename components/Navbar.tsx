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
  const [scrolled, setScrolled] = useState(false)
  const pathname = usePathname()

  // Hide on scroll down, show on scroll up
  useEffect(() => {
    let lastScroll = 0
    const handleScroll = () => {
      const currentScroll = window.scrollY
      setVisible(currentScroll < lastScroll || currentScroll < 100)
      setScrolled(currentScroll > 20)
      lastScroll = currentScroll
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Close mobile menu on route change
  useEffect(() => {
    setMobileOpen(false)
  }, [pathname])

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = ""
    }
    return () => { document.body.style.overflow = "" }
  }, [mobileOpen])

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
          className={`fixed top-0 w-full z-50 transition-all duration-300 ${
            scrolled
              ? "bg-white/95 backdrop-blur-md shadow-lg py-2"
              : "bg-white/70 backdrop-blur-md shadow-md py-3"
          }`}
        >
          <div className="max-w-7xl mx-auto flex justify-between items-center px-4 sm:px-6 lg:px-10">

            {/* ── LOGO ── */}
            <Link href="/" className="flex items-center group flex-shrink-0">
              <div className="relative p-[2px] rounded-2xl bg-gradient-to-r from-green-700 via-green-600 to-orange-500 shadow-md">
                <div className="bg-white/90 backdrop-blur-sm rounded-2xl px-2 py-1.5 group-hover:shadow-lg transition-all duration-300">
                  <Image
                    src="/image/logo2.jpeg"
                    alt="EMGO Farms Logo"
                    width={120}
                    height={44}
                    priority
                    className="object-contain h-9 w-auto sm:h-11 lg:h-12"
                  />
                </div>
              </div>
            </Link>

            {/* ── DESKTOP MENU (lg+) ── */}
            <ul className="hidden lg:flex items-center space-x-8 font-medium">
              {navLinks.map((link) => (
                <li key={link.name} className="relative group">
                  <Link
                    href={link.path}
                    className={`text-sm tracking-wide transition-colors duration-200 ${
                      pathname === link.path
                        ? "text-orange-500"
                        : "text-gray-700 hover:text-orange-500"
                    }`}
                  >
                    {link.name}
                  </Link>
                  <span
                    className={`absolute left-0 -bottom-1 h-[2px] bg-orange-500 rounded-full transition-all duration-300 ${
                      pathname === link.path ? "w-full" : "w-0 group-hover:w-full"
                    }`}
                  />
                </li>
              ))}
              <li>
                <Link
                  href="/contact"
                  className="ml-2 px-6 py-2.5 rounded-full bg-gradient-to-r from-orange-500 to-orange-600 text-white text-sm font-semibold shadow-md hover:scale-105 hover:shadow-lg transition-all duration-200"
                >
                  Contact Us
                </Link>
              </li>
            </ul>

            {/* ── TABLET MENU (md–lg): condensed inline links ── */}
            <ul className="hidden md:flex lg:hidden items-center space-x-5 font-medium">
              {navLinks.slice(0, 4).map((link) => (
                <li key={link.name} className="relative group">
                  <Link
                    href={link.path}
                    className={`text-xs tracking-wide transition-colors duration-200 ${
                      pathname === link.path
                        ? "text-orange-500"
                        : "text-gray-700 hover:text-orange-500"
                    }`}
                  >
                    {link.name}
                  </Link>
                  <span
                    className={`absolute left-0 -bottom-1 h-[2px] bg-orange-500 rounded-full transition-all duration-300 ${
                      pathname === link.path ? "w-full" : "w-0 group-hover:w-full"
                    }`}
                  />
                </li>
              ))}
              <li>
                <Link
                  href="/contact"
                  className="px-4 py-2 rounded-full bg-gradient-to-r from-orange-500 to-orange-600 text-white text-xs font-semibold shadow hover:scale-105 transition-all duration-200"
                >
                  Contact
                </Link>
              </li>
              {/* Hamburger for remaining links on tablet */}
              <li>
                <button
                  aria-label="Open menu"
                  className="p-1.5 rounded-lg text-gray-700 hover:bg-green-50 hover:text-green-800 transition"
                  onClick={() => setMobileOpen(!mobileOpen)}
                >
                  {mobileOpen ? <X size={22} /> : <Menu size={22} />}
                </button>
              </li>
            </ul>

            {/* ── MOBILE HAMBURGER (< md) ── */}
            <button
              aria-label="Open menu"
              className="md:hidden p-2 rounded-xl text-gray-700 hover:bg-green-50 hover:text-green-800 transition"
              onClick={() => setMobileOpen(!mobileOpen)}
            >
              {mobileOpen ? <X size={26} /> : <Menu size={26} />}
            </button>
          </div>

          {/* ── MOBILE / TABLET DRAWER ── */}
          <AnimatePresence>
            {mobileOpen && (
              <>
                {/* Backdrop */}
                <motion.div
                  key="backdrop"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="fixed inset-0 top-[64px] bg-black/30 backdrop-blur-sm z-40 md:hidden"
                  onClick={() => setMobileOpen(false)}
                />

                {/* Drawer panel */}
                <motion.div
                  key="drawer"
                  initial={{ x: "100%" }}
                  animate={{ x: 0 }}
                  exit={{ x: "100%" }}
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  className="fixed top-0 right-0 h-full w-[80%] max-w-[320px] bg-white shadow-2xl z-50 flex flex-col md:hidden"
                >
                  {/* Drawer Header */}
                  <div className="flex items-center justify-between px-6 py-5 border-b border-gray-100">
                    <Link href="/" onClick={() => setMobileOpen(false)}>
                      <Image
                        src="/image/logo2.jpeg"
                        alt="EMGO Farms Logo"
                        width={100}
                        height={36}
                        className="object-contain h-9 w-auto"
                      />
                    </Link>
                    <button
                      aria-label="Close menu"
                      onClick={() => setMobileOpen(false)}
                      className="p-2 rounded-xl text-gray-500 hover:bg-gray-100 transition"
                    >
                      <X size={22} />
                    </button>
                  </div>

                  {/* Nav Links */}
                  <nav className="flex-1 overflow-y-auto px-6 py-8">
                    <ul className="space-y-1">
                      {navLinks.map((link, idx) => (
                        <motion.li
                          key={link.name}
                          initial={{ opacity: 0, x: 30 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: idx * 0.06, duration: 0.3 }}
                        >
                          <Link
                            href={link.path}
                            onClick={() => setMobileOpen(false)}
                            className={`flex items-center justify-between w-full px-4 py-3.5 rounded-xl text-base font-medium transition-all duration-200 ${
                              pathname === link.path
                                ? "bg-orange-50 text-orange-500 border border-orange-100"
                                : "text-gray-700 hover:bg-green-50 hover:text-green-800"
                            }`}
                          >
                            <span>{link.name}</span>
                            {pathname === link.path && (
                              <span className="w-2 h-2 rounded-full bg-orange-500 inline-block" />
                            )}
                          </Link>
                        </motion.li>
                      ))}
                    </ul>
                  </nav>

                  {/* Drawer Footer CTA */}
                  <div className="px-6 py-6 border-t border-gray-100 space-y-3">
                    <Link
                      href="/contact"
                      onClick={() => setMobileOpen(false)}
                      className="flex items-center justify-center w-full px-6 py-3.5 rounded-full bg-gradient-to-r from-orange-500 to-orange-600 text-white font-semibold text-sm shadow-md hover:shadow-lg hover:scale-[1.02] transition-all duration-200"
                    >
                      Contact Us
                    </Link>
                    <Link
                      href="/contact"
                      onClick={() => setMobileOpen(false)}
                      className="flex items-center justify-center w-full px-6 py-3 rounded-full border-2 border-green-700 text-green-800 font-semibold text-sm hover:bg-green-50 transition-all duration-200"
                    >
                      Request a Quote
                    </Link>
                  </div>
                </motion.div>

                {/* Tablet dropdown (md–lg) — compact overlay */}
                <motion.div
                  key="tablet-dropdown"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.25 }}
                  className="hidden md:block lg:hidden absolute top-full right-4 mt-2 w-56 bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden z-50"
                >
                  <ul className="py-2">
                    {navLinks.slice(4).map((link) => (
                      <li key={link.name}>
                        <Link
                          href={link.path}
                          onClick={() => setMobileOpen(false)}
                          className={`flex items-center px-5 py-3 text-sm font-medium transition-colors ${
                            pathname === link.path
                              ? "text-orange-500 bg-orange-50"
                              : "text-gray-700 hover:bg-green-50 hover:text-green-800"
                          }`}
                        >
                          {link.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              </>
            )}
          </AnimatePresence>
        </motion.nav>
      )}
    </AnimatePresence>
  )
}