'use client'

import Link from "next/link"
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn, FaYoutube } from "react-icons/fa"

export const Footer = () => {
  return (
    <footer className="bg-green-900 text-white mt-auto flex-shrink-0">
      
      <div className="container mx-auto grid md:grid-cols-4 gap-10 px-6 py-16">

        {/* Company Info */}
        <div>
          <h3 className="text-xl font-bold mb-4">EMGO Farms</h3>
          <p className="text-gray-300">
            Sustainable agriculture, organic produce, and modern farming innovation.
          </p>

          {/* Social Media Icons */}
          <div className="flex mt-4 space-x-4 text-white">
            <Link href="#" className="hover:text-orange-500 transition"><FaFacebookF size={20} /></Link>
            <Link href="#" className="hover:text-orange-500 transition"><FaTwitter size={20} /></Link>
            <Link href="#" className="hover:text-orange-500 transition"><FaInstagram size={20} /></Link>
            <Link href="#" className="hover:text-orange-500 transition"><FaLinkedinIn size={20} /></Link>
            <Link href="#" className="hover:text-orange-500 transition"><FaYoutube size={20} /></Link>
          </div>
        </div>

        {/* Navigation Links */}
        <div>
          <h4 className="font-semibold mb-4">Company</h4>
          <ul className="space-y-2 text-gray-300">
            {["Home","About","Services","Products","Gallery","Blog","Contact"].map((link, i) => (
              <li key={i}>
                <Link href={`/${link.toLowerCase()}`} className="hover:text-orange-500 transition">
                  {link}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h4 className="font-semibold mb-4">Contact</h4>
          <p>Email: <a href="mailto:emgofarms@gmail.com" className="hover:text-orange-500 transition">emgofarms@gmail.com</a></p>
          <p>Phone: <a href="tel:+1234567890" className="hover:text-orange-500 transition">+123 456 7890</a></p>
          <p className="mt-2">Address: 123 Farm Lane, Greenfield, Country</p>
        </div>

        {/* Newsletter Signup */}
        <div>
          <h4 className="font-semibold mb-4">Newsletter</h4>
          <p className="text-gray-300 mb-2">
            Subscribe for updates on farming tips and organic products.
          </p>
          <div className="flex gap-2 flex-wrap">
            <input
              type="email"
              placeholder="Your email"
              className="px-3 py-2 rounded text-black w-full md:w-auto flex-grow"
            />
            <button className="px-4 py-2 bg-orange-500 hover:bg-orange-600 rounded font-semibold transition">
              Subscribe
            </button>
          </div>
        </div>

      </div>

      {/* Bottom Line */}
      <div className="text-center text-gray-400 mt-10 border-t border-green-800 pt-6 text-sm">
        © {new Date().getFullYear()} EMGO Farms. All rights reserved.
      </div>
    </footer>
  )
}
