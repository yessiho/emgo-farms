'use client'

import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import { FaWhatsapp } from "react-icons/fa"

const WHATSAPP_URL = `https://wa.me/2348166727320?text=${encodeURIComponent(
  "Hello EMGO Farms! I'd like to get in touch regarding your products and services."
)}`

export default function AboutPage() {
  return (
    <div className="bg-white min-h-screen font-sans text-gray-800">

      {/* ── HERO ─────────────────────────────────────────────────
          Mobile:  h-[55vh]  text-2xl
          Tablet:  h-[62vh]  text-4xl
          Desktop: h-[500px] text-5xl/6xl
      ──────────────────────────────────────────────────────── */}
      <section className="relative h-[55vh] sm:h-[62vh] lg:h-[500px] bg-[url('/image/story2.jpg')] bg-cover bg-center flex items-center justify-center">
        <div className="absolute inset-0 bg-gradient-to-r from-black/75 to-black/45" />
        <motion.div
          initial={{ y: -40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1 }}
          className="relative text-center text-white px-5 sm:px-8 max-w-3xl mx-auto"
        >
          <span className="inline-block bg-orange-500/80 backdrop-blur-sm text-white text-[10px] sm:text-xs font-bold tracking-widest uppercase px-3 sm:px-4 py-1.5 rounded-full mb-3 sm:mb-5">
            About EMGO Farms
          </span>
          <h1 className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-3 sm:mb-5 leading-tight">
            About EMGO Farms &<br className="hidden sm:block" /> Integrated Services Limited
          </h1>
          <p className="text-xs sm:text-base md:text-lg lg:text-xl text-gray-200 leading-relaxed max-w-2xl mx-auto">
            Building a fully integrated agro-industrial ecosystem rooted in sustainability, innovation, and long-term value creation.
          </p>
        </motion.div>
      </section>


      {/* ── COMPANY STORY ────────────────────────────────────────
          Mobile:  single column (text above, image below)
          Desktop: 2-column side by side
      ──────────────────────────────────────────────────────── */}
      <section className="py-14 sm:py-18 lg:py-28 bg-green-50">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-10 grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">

          <motion.div
            initial={{ x: -50, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9 }}
          >
            <span className="inline-block bg-green-100 text-green-800 text-xs font-bold tracking-widest uppercase px-4 py-1.5 rounded-full mb-4 sm:mb-5">
              Who We Are
            </span>
            <h2 className="text-2xl sm:text-4xl lg:text-5xl font-bold text-green-800 mb-5 sm:mb-6 lg:mb-8 leading-tight">
              Our Story
            </h2>
            <div className="space-y-3 sm:space-y-4 text-gray-700 text-sm sm:text-base lg:text-lg leading-relaxed">
              <p>
                In the fertile soils of Nsit Atai, Akwa Ibom State, a bold vision was born — a vision to build more than a farm. A vision to build value, create opportunity, and redefine agricultural excellence in Nigeria and West Africa.
              </p>
              <p>
                EMGO Farms and Integrated Services Limited was founded on a simple but powerful belief: Agriculture should not merely produce crops — it should create prosperity, ensure food security, empower communities, and operate sustainably for generations.
              </p>
              <p>
                We began with 5 hectares of land, but our ambition stretches far beyond boundaries. Our goal is clear: cultivate over 50,000 high-yielding oil palm trees, establish a modern Crude Oil Palm (CPO) and palm kernel oil (PKO) refining plant, and develop a fully integrated agro value chain.
              </p>
              <p>
                We are building an integrated agricultural ecosystem — including cassava cultivation, ginger and other cash crops, and sustainable animal husbandry — ensuring diversified income streams and circular agricultural practices.
              </p>
            </div>

            <div className="mt-5 sm:mt-6">
              <p className="text-gray-700 mb-2 sm:mb-3 font-semibold text-sm sm:text-base">Our approach is deliberate:</p>
              <ul className="space-y-1.5 sm:space-y-2">
                {["End-to-end value chain control", "Quality-driven production", "Modern processing technology", "Sustainable farming practices", "Community-centered growth"].map((item, i) => (
                  <li key={i} className="flex items-center gap-2.5 text-green-800 font-semibold text-xs sm:text-sm lg:text-base">
                    <span className="w-2 h-2 rounded-full bg-orange-500 flex-shrink-0" />{item}
                  </li>
                ))}
              </ul>
            </div>

            <p className="text-gray-700 leading-relaxed text-sm sm:text-base lg:text-lg mt-5 sm:mt-6 italic">
              At EMGO Farms, we are not just planting trees — We are planting legacy.<br />
              We are not just refining oil — We are refining standards.<br />
              We are not just building a company — We are building a future.
            </p>

            {/* CTA buttons — stacked on mobile, inline on sm+ */}
            <div className="mt-6 sm:mt-8 flex flex-col sm:flex-row gap-3">
              <Link
                href="/contact"
                className="w-full sm:w-auto inline-flex items-center justify-center px-6 py-3.5 bg-orange-500 hover:bg-orange-600 text-white rounded-xl font-semibold text-sm sm:text-base transition-all duration-200 shadow-lg hover:scale-[1.02] active:scale-95"
              >
                Partner With Us →
              </Link>
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-[#25D366] hover:bg-[#1ebe5d] text-white rounded-xl font-semibold text-sm sm:text-base transition-all duration-200 shadow-lg hover:scale-[1.02] active:scale-95"
              >
                <FaWhatsapp size={17} />
                Chat on WhatsApp
              </a>
            </div>
          </motion.div>

          {/* Story image — full width on mobile, half on desktop */}
          <motion.div
            initial={{ x: 50, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9 }}
            className="relative w-full h-64 sm:h-96 lg:h-[520px] rounded-3xl overflow-hidden shadow-2xl"
          >
            <Image
              src="/image/story3.jpg"
              alt="EMGO Plantation"
              fill
              priority
              className="object-cover hover:scale-105 transition duration-700"
            />
          </motion.div>

        </div>
      </section>


      {/* ── MISSION & VISION ─────────────────────────────────────
          Mobile:  single column
          Tablet+: 2-column
      ──────────────────────────────────────────────────────── */}
      <section className="py-14 sm:py-18 lg:py-28 bg-white">
        <div className="max-w-6xl mx-auto px-5 sm:px-8 lg:px-10 text-center">

          <motion.div
            initial={{ y: 30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="mb-8 sm:mb-12 lg:mb-16"
          >
            <span className="inline-block bg-orange-100 text-orange-700 text-xs font-bold tracking-widest uppercase px-4 py-1.5 rounded-full mb-3 sm:mb-4">
              Purpose & Direction
            </span>
            <h2 className="text-2xl sm:text-4xl lg:text-5xl font-bold text-green-800">Mission & Vision</h2>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-8 lg:gap-12">
            <motion.div
              initial={{ x: -30, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="p-6 sm:p-8 lg:p-10 bg-green-50 rounded-2xl shadow-lg text-left"
            >
              <div className="text-3xl sm:text-4xl mb-3 sm:mb-4">🎯</div>
              <h3 className="text-lg sm:text-xl lg:text-2xl font-semibold text-green-800 mb-3 sm:mb-5">Our Mission</h3>
              <p className="text-gray-700 leading-relaxed text-sm sm:text-base">
                To cultivate, process, and deliver premium-quality agricultural products through integrated value chains, modern technology, and responsible farming practices — creating sustainable wealth for stakeholders and lasting community impact.
              </p>
            </motion.div>

            <motion.div
              initial={{ x: 30, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="p-6 sm:p-8 lg:p-10 bg-green-800 text-white rounded-2xl shadow-lg text-left"
            >
              <div className="text-3xl sm:text-4xl mb-3 sm:mb-4">🌍</div>
              <h3 className="text-lg sm:text-xl lg:text-2xl font-semibold mb-3 sm:mb-5">Our Vision</h3>
              <p className="leading-relaxed text-sm sm:text-base">
                To become a leading integrated agro-industrial organization in Nigeria and West Africa, recognized for excellence, innovation, reliability, and sustainable agricultural transformation.
              </p>
            </motion.div>
          </div>
        </div>
      </section>


      {/* ── CORE VALUES ──────────────────────────────────────────
          Mobile:  2-column grid
          Tablet+: 3-column grid
      ──────────────────────────────────────────────────────── */}
      <section className="py-14 sm:py-18 lg:py-28 bg-green-50">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-10 text-center">

          <motion.div
            initial={{ y: 30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="mb-8 sm:mb-12 lg:mb-16"
          >
            <span className="inline-block bg-green-100 text-green-800 text-xs font-bold tracking-widest uppercase px-4 py-1.5 rounded-full mb-3 sm:mb-4">
              What Guides Us
            </span>
            <h2 className="text-2xl sm:text-4xl lg:text-5xl font-bold text-green-800">Our Core Values</h2>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-3 sm:gap-5 lg:gap-8">
            {[
              { title: "🌱 Sustainability",          desc: "We farm responsibly — protecting soil, water, and ecosystems to ensure productivity for generations." },
              { title: "⭐ Quality Excellence",      desc: "Strict quality control systems from cultivation to finished products." },
              { title: "🤝 Integrity",               desc: "We operate with transparency, accountability, and ethical conduct." },
              { title: "🔄 Integration & Efficiency",desc: "We control the value chain from cultivation to refining." },
              { title: "📈 Innovation",              desc: "We embrace modern agricultural technology and smart farming practices." },
              { title: "🏘 Community Impact",        desc: "We create jobs and empower local farmers while strengthening regional economies." },
            ].map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ scale: 0.95, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.07 }}
                className="p-4 sm:p-6 lg:p-8 bg-white rounded-2xl shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300 text-left"
              >
                <h3 className="text-xs sm:text-sm lg:text-xl font-semibold text-green-800 mb-1.5 sm:mb-3">{item.title}</h3>
                <p className="text-gray-600 text-[11px] sm:text-xs lg:text-sm leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>

          {/* Reliability — centered solo card */}
          <div className="mt-3 sm:mt-5 flex justify-center">
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="w-full sm:max-w-sm lg:max-w-md p-4 sm:p-6 lg:p-8 bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 text-left"
            >
              <h3 className="text-xs sm:text-sm lg:text-xl font-semibold text-green-800 mb-1.5 sm:mb-3">🛡 Reliability</h3>
              <p className="text-gray-600 text-[11px] sm:text-xs lg:text-sm leading-relaxed">
                We are dependable partners — delivering consistent quality and honoring our commitments.
              </p>
            </motion.div>
          </div>
        </div>
      </section>


      {/* ── ESG SECTION ──────────────────────────────────────────
          Mobile:  1-column
          Tablet:  2-column (Governance spans 2 cols)
          Desktop: 3-column
      ──────────────────────────────────────────────────────── */}
      <section className="py-14 sm:py-18 lg:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-10">

          <motion.div
            initial={{ y: 30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-10 sm:mb-14 lg:mb-20"
          >
            <span className="inline-block bg-green-100 text-green-800 text-xs font-bold tracking-widest uppercase px-4 py-1.5 rounded-full mb-3 sm:mb-4">
              Our Commitments
            </span>
            <h2 className="text-2xl sm:text-4xl lg:text-5xl font-bold text-green-800">ESG / Sustainability</h2>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 sm:gap-8 lg:gap-10">
            {[
              {
                icon: "🌿", title: "Environmental", dark: false,
                items: ["Sustainable land use planning", "No deforestation policy", "Soil regeneration practices", "Organic waste composting", "Biomass energy use from palm residues", "Water management systems"],
              },
              {
                icon: "🤝", title: "Social", dark: true,
                items: ["Local employment creation", "Smallholder farmer inclusion program", "Youth agricultural training initiatives", "Fair labour standards", "Community infrastructure support"],
              },
              {
                icon: "🏛", title: "Governance", dark: false,
                items: ["Transparent reporting", "Independent board structure", "Ethical procurement policies", "Health, Safety & Environmental compliance", "Anti-corruption policy"],
                span: "sm:col-span-2 md:col-span-1",
              },
            ].map((col, i) => (
              <motion.div
                key={i}
                initial={{ y: 30, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: i * 0.1 }}
                className={`${col.dark ? "bg-green-800 text-white" : "bg-green-50 text-gray-700"} p-6 sm:p-8 lg:p-10 rounded-3xl shadow-lg hover:shadow-2xl transition ${col.span ?? ""}`}
              >
                <div className="text-3xl sm:text-4xl mb-3 sm:mb-4">{col.icon}</div>
                <h3 className={`text-xl sm:text-2xl font-bold mb-4 sm:mb-5 ${col.dark ? "text-white" : "text-green-800"}`}>{col.title}</h3>
                <ul className="space-y-2 sm:space-y-2.5 text-xs sm:text-sm lg:text-base">
                  {col.items.map((item, k) => (
                    <li key={k} className="flex items-start gap-2">
                      <span className={`font-bold mt-0.5 flex-shrink-0 ${col.dark ? "text-green-400" : "text-green-600"}`}>•</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>


      {/* ── SDG SECTION ──────────────────────────────────────────
          Mobile:  single column stacked
          Tablet:  3-col SDG grid
          Desktop: 4-col SDG grid + image card side by side
      ──────────────────────────────────────────────────────── */}
      <section className="py-14 sm:py-18 lg:py-28 bg-green-900 overflow-hidden relative">

        {/* Background decorative circles */}
        <div className="absolute top-0 left-0 w-64 h-64 bg-green-800 rounded-full -translate-x-1/2 -translate-y-1/2 opacity-40 pointer-events-none" />
        <div className="absolute bottom-0 right-0 w-80 h-80 bg-green-800 rounded-full translate-x-1/3 translate-y-1/3 opacity-40 pointer-events-none" />

        <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-10 relative z-10">

          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-10 sm:mb-14 lg:mb-20"
          >
            <span className="inline-block bg-white/10 border border-white/20 text-green-300 text-xs font-bold tracking-widest uppercase px-4 py-1.5 rounded-full mb-3 sm:mb-4">
              Global Commitment
            </span>
            <h2 className="text-2xl sm:text-4xl lg:text-5xl font-bold text-white mb-4 sm:mb-6 leading-tight">
              The 17 Sustainable Development Goals
            </h2>
            <p className="text-green-200 max-w-3xl mx-auto text-sm sm:text-base lg:text-lg leading-relaxed">
              At EMGO Farms, we promote and integrate all 17 United Nations Sustainable Development Goals
              into our operations — ensuring every action we take contributes to a better world for people,
              planet, and prosperity.
            </p>
          </motion.div>

          {/* SDG image + description two-column */}
          <div className="flex flex-col lg:flex-row gap-8 lg:gap-14 items-center mb-12 sm:mb-16 lg:mb-20">

            {/* SDG Image card */}
            <motion.div
              initial={{ x: -50, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.9 }}
              className="w-full lg:w-1/2 flex-shrink-0"
            >
              {/* ── Place your SDG image here ──
                  Replace /image/YOUR_SDG_IMAGE.jpg with your actual path
                  e.g. /image/sdg-goals.jpg
              ── */}
              <div className="relative w-full rounded-3xl overflow-hidden shadow-2xl border-2 border-white/20 aspect-square sm:aspect-[4/3] lg:aspect-square">
                <Image
                  src="/image/goals.jpeg"
                  alt="UN Sustainable Development Goals — EMGO Farms"
                  fill
                  className="object-cover object-center"
                />
                {/* Overlay label */}
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent px-5 py-4">
                  <p className="text-white font-bold text-sm sm:text-base">🌍 UN SDGs — Our Global Framework</p>
                  <p className="text-green-300 text-xs mt-0.5">Integrated into every EMGO operation</p>
                </div>
              </div>
            </motion.div>

            {/* Right text */}
            <motion.div
              initial={{ x: 50, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.9 }}
              className="w-full lg:w-1/2 text-white"
            >
              <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold mb-4 sm:mb-5 leading-tight">
                Building a Sustainable Future,<br />
                <span className="text-orange-400">One Goal at a Time</span>
              </h3>
              <div className="space-y-3 sm:space-y-4 text-green-100 text-sm sm:text-base leading-relaxed">
                <p>
                  The United Nations' 17 Sustainable Development Goals provide the global blueprint
                  for a more equitable, sustainable, and prosperous world by 2030. At EMGO Farms,
                  these goals are not aspirational posters on a wall — they are embedded in our
                  daily operations, investment decisions, and community programs.
                </p>
                <p>
                  From <span className="text-orange-300 font-semibold">Zero Hunger (SDG 2)</span> through
                  our food security programs, to <span className="text-orange-300 font-semibold">Decent Work (SDG 8)</span> through
                  local employment, to <span className="text-orange-300 font-semibold">Climate Action (SDG 13)</span> through
                  our no-deforestation and biomass energy policies — every EMGO initiative maps
                  to measurable SDG outcomes.
                </p>
                <p>
                  We track our SDG performance annually and report transparently to investors,
                  partners, and the communities we serve.
                </p>
              </div>

              {/* SDG highlights strip */}
              <div className="mt-6 sm:mt-8 grid grid-cols-2 sm:grid-cols-3 gap-2 sm:gap-3">
                {[
                  { num: "SDG 1",  label: "No Poverty",          color: "bg-red-600"     },
                  { num: "SDG 2",  label: "Zero Hunger",         color: "bg-yellow-500"  },
                  { num: "SDG 5",  label: "Gender Equality",     color: "bg-orange-500"  },
                  { num: "SDG 8",  label: "Decent Work",         color: "bg-red-700"     },
                  { num: "SDG 13", label: "Climate Action",      color: "bg-green-600"   },
                  { num: "SDG 15", label: "Life on Land",        color: "bg-green-700"   },
                ].map((sdg, i) => (
                  <div key={i} className={`${sdg.color} rounded-xl px-3 py-2.5 text-white text-center`}>
                    <p className="text-[10px] sm:text-xs font-bold opacity-80">{sdg.num}</p>
                    <p className="text-[10px] sm:text-xs font-semibold leading-tight mt-0.5">{sdg.label}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* All 17 SDGs grid */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="mb-10 sm:mb-12"
          >
            <p className="text-center text-green-300 text-xs sm:text-sm font-semibold uppercase tracking-widest mb-6 sm:mb-8">
              All 17 SDGs — How EMGO Contributes
            </p>
            <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-6 gap-2 sm:gap-3">
              {[
                { num: 1,  label: "No Poverty",                    color: "bg-red-600",      icon: "🏠" },
                { num: 2,  label: "Zero Hunger",                   color: "bg-yellow-500",   icon: "🌾" },
                { num: 3,  label: "Good Health",                   color: "bg-green-500",    icon: "❤️" },
                { num: 4,  label: "Quality Education",             color: "bg-red-500",      icon: "📚" },
                { num: 5,  label: "Gender Equality",               color: "bg-orange-500",   icon: "⚖️" },
                { num: 6,  label: "Clean Water",                   color: "bg-blue-500",     icon: "💧" },
                { num: 7,  label: "Clean Energy",                  color: "bg-yellow-400",   icon: "☀️" },
                { num: 8,  label: "Decent Work",                   color: "bg-red-700",      icon: "📈" },
                { num: 9,  label: "Innovation",                    color: "bg-orange-600",   icon: "🏭" },
                { num: 10, label: "Reduced Inequalities",          color: "bg-pink-600",     icon: "🤝" },
                { num: 11, label: "Sustainable Cities",            color: "bg-orange-400",   icon: "🏙️" },
                { num: 12, label: "Responsible Consumption",       color: "bg-yellow-600",   icon: "♻️" },
                { num: 13, label: "Climate Action",                color: "bg-green-700",    icon: "🌍" },
                { num: 14, label: "Life Below Water",              color: "bg-blue-600",     icon: "🐟" },
                { num: 15, label: "Life on Land",                  color: "bg-green-600",    icon: "🌿" },
                { num: 16, label: "Peace & Justice",               color: "bg-blue-700",     icon: "🕊️" },
                { num: 17, label: "Partnerships",                  color: "bg-blue-800",     icon: "🌐" },
              ].map((sdg, idx) => (
                <motion.div
                  key={sdg.num}
                  initial={{ scale: 0.85, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: idx * 0.04 }}
                  className={`${sdg.color} rounded-xl p-2.5 sm:p-3 lg:p-4 text-white text-center hover:scale-105 hover:shadow-xl transition-all duration-200 cursor-default`}
                >
                  <p className="text-lg sm:text-2xl mb-1">{sdg.icon}</p>
                  <p className="text-[9px] sm:text-[10px] font-bold opacity-80 mb-0.5">SDG {sdg.num}</p>
                  <p className="text-[9px] sm:text-[10px] font-semibold leading-tight">{sdg.label}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Bottom SDG commitment statement */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-3xl px-6 sm:px-10 py-6 sm:py-8 text-center"
          >
            <p className="text-white font-bold text-sm sm:text-lg lg:text-xl mb-2">
              🌱 EMGO Farms is proud to be an SDG-aligned agro-industrial enterprise.
            </p>
            <p className="text-green-200 text-xs sm:text-sm lg:text-base max-w-3xl mx-auto leading-relaxed">
              We measure our success not only in financial returns but in our positive contribution
              to people, planet, and prosperity — the three pillars of the 2030 Agenda for Sustainable Development.
            </p>
          </motion.div>

        </div>
      </section>


      {/* ── FOUNDERS SECTION ─────────────────────────────────────
          Mobile:  1-column cards
          Tablet+: 2-column cards
      ──────────────────────────────────────────────────────── */}
      <section className="py-14 sm:py-18 lg:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-10">

          <motion.div
            initial={{ y: 30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-10 sm:mb-14 lg:mb-20"
          >
            <span className="inline-block bg-orange-100 text-orange-700 text-xs font-bold tracking-widest uppercase px-4 py-1.5 rounded-full mb-3 sm:mb-4">
              The Visionaries
            </span>
            <h2 className="text-2xl sm:text-4xl lg:text-5xl font-bold text-green-800 mb-5 sm:mb-6">Our Co-Founders</h2>

            <div className="max-w-4xl mx-auto mt-6 sm:mt-10 px-5 sm:px-8 py-6 sm:py-8 bg-green-50 rounded-3xl shadow-lg text-gray-800 text-sm sm:text-base lg:text-lg leading-relaxed space-y-3 sm:space-y-4 text-left sm:text-center">
              <p className="font-semibold text-green-800 text-sm sm:text-lg lg:text-xl">
                EMGO Farms was founded by visionary entrepreneurs committed to building a sustainable agro-industrial institution in Nigeria.
              </p>
              <p className="text-xs sm:text-base">With professional experience in strategic management, environmental stewardship, and operational excellence, the founders bring a disciplined, systems-driven approach to agriculture.</p>
              <p className="text-xs sm:text-base">Their vision is to transform agricultural potential into structured, scalable, and sustainable value chains that create jobs, strengthen communities, and elevate Nigeria's agro-industrial competitiveness.</p>
              <p className="italic text-gray-600 text-xs sm:text-base">They believe agriculture is not merely cultivation — it is nation-building.</p>
            </div>
          </motion.div>

          {/* 1-col mobile → 2-col sm+
              ── Each founder has their OWN image ──
              Replace each src with the correct photo path:
                emmanuel → /image/emmanuel.jpg  (or .png / .webp)
                godwin   → /image/godwin.jpg
                ifeoma   → /image/ifeoma.jpg
                mercy    → /image/mercy.jpg
          */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 lg:gap-12git">
            {[
              {
                name:        "Emmanuel F Obasi",
                credentials: "M.Eng, B.Eng, FNES",
                image:       "/image/Team2.jpeg",   // ← replace with real photo
              },
              {
                name:        "Godwin Udott",
                credentials: "HND, PMP",
                image:       "/image/team3.jpeg",     // ← replace with real photo
              },
              {
                name:        "Ifeoma Emma-Obasi",
                credentials: "M.Sc, HND",
                image:       "/image/team5.jpeg",     // ← replace with real photo
              },
              {
                name:        "Mercy Godwin Udott",
                credentials: "B.Sc",
                image:       "/image/team4.jpeg",      // ← replace with real photo
              },
            ].map((founder, index) => (
              <motion.div
                key={index}
                initial={{ y: 40, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: index * 0.1 }}
                className="bg-green-50 rounded-3xl shadow-lg overflow-hidden hover:shadow-2xl hover:-translate-y-1 transition-all duration-300"
              >
                <div className="relative h-72 sm:h-80 lg:h-96 w-full">
                  <Image
                    src={founder.image}
                    alt={founder.name}
                    fill
                    className="object-cover object-top"
                  />
                </div>
                <div className="p-5 sm:p-7 lg:p-10">
                  <h3 className="text-base sm:text-xl lg:text-2xl font-bold text-green-800 mb-0.5">
                    {founder.name}
                  </h3>
                  <p className="text-gray-400 text-xs sm:text-sm mb-1">{founder.credentials}</p>
                  <p className="text-orange-600 font-semibold text-xs sm:text-sm lg:text-base">Co-Founder</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>


      {/* ── MANAGEMENT TEAM ──────────────────────────────────────
          CEO/COO: 1-col mobile → 2-col md+
          Directors: 1-col mobile → 2-col sm → 3-col md+
      ──────────────────────────────────────────────────────── */}
      <section className="py-14 sm:py-18 lg:py-28 bg-green-50">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-10">

          <motion.div
            initial={{ y: 40, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-10 sm:mb-14 lg:mb-20"
          >
            <span className="inline-block bg-green-100 text-green-800 text-xs font-bold tracking-widest uppercase px-4 py-1.5 rounded-full mb-3 sm:mb-4">
              Leadership
            </span>
            <h2 className="text-2xl sm:text-4xl lg:text-5xl font-bold text-green-800 mb-3 sm:mb-5">Management Team</h2>
            <p className="text-gray-600 max-w-2xl mx-auto text-xs sm:text-base lg:text-lg leading-relaxed">
              Our management team combines deep agricultural expertise with operational excellence, driving EMGO Farms towards sustainable growth and lasting impact.
            </p>
          </motion.div>

          {/* CEO & COO */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-7 lg:gap-12 mb-5 sm:mb-8 lg:mb-12">
            {[
              { name: "Emmanuel F. Obasi", credentials: "M.Eng, B.Eng, FNES", role: "Chief Executive Officer", bio: "A Fellow of the Nigerian Environmental Society with extensive experience in agro-industrial project development and strategic leadership. Emmanuel sets EMGO's long-term vision and oversees all corporate operations.", icon: "🌿", accent: "bg-green-800 text-white", tagAccent: "bg-green-600" },
              { name: "Godwin Udott", credentials: "HND, PMP", role: "Chief Operations Officer", bio: "A certified Project Management Professional with a track record of executing large-scale agro-industrial projects. Godwin ensures operational efficiency, resource optimization, and project delivery across all divisions.", icon: "⚙️", accent: "bg-orange-600 text-white", tagAccent: "bg-orange-500" },
            ].map((member, idx) => (
              <motion.div
                key={idx}
                initial={{ y: 40, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: idx * 0.15 }}
                className={`rounded-3xl shadow-xl hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 ${member.accent}`}
              >
                <div className="p-6 sm:p-8 lg:p-10">
                  <div className="text-3xl sm:text-4xl lg:text-5xl mb-3 sm:mb-5">{member.icon}</div>
                  <span className={`inline-block text-[10px] sm:text-xs font-bold tracking-widest uppercase px-3 py-1 rounded-full mb-3 ${member.tagAccent} bg-opacity-30 text-white border border-white/30`}>
                    {member.role}
                  </span>
                  <h3 className="text-lg sm:text-xl lg:text-2xl font-bold mt-1 mb-0.5">{member.name}</h3>
                  <p className="text-[11px] sm:text-sm opacity-70 font-medium mb-3 sm:mb-4">{member.credentials}</p>
                  <div className="w-10 h-0.5 sm:w-12 sm:h-1 bg-white/40 rounded-full mb-3 sm:mb-4" />
                  <p className="leading-relaxed opacity-90 text-xs sm:text-sm lg:text-base">{member.bio}</p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Directors */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
            {[
              { name: "Ifeoma Emma-Obasi", credentials: "M.Sc, HND", role: "Director, Sustainability & Compliance", bio: "Oversees EMGO's environmental stewardship programs, ESG reporting frameworks, and regulatory compliance.", icon: "🌍" },
              { name: "Mercy Godwin Udott", credentials: "B.Sc", role: "Director, Finance & Administration", bio: "Manages EMGO's financial planning, investor relations, and administrative operations.", icon: "📊" },
              { name: "TBD", credentials: "", role: "Director, Agronomy & Production", bio: "Leads plantation management, crop science, and production optimization across all cultivation zones.", icon: "🌾" },
            ].map((member, idx) => (
              <motion.div
                key={idx}
                initial={{ y: 40, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: idx * 0.12 }}
                className="bg-white rounded-3xl shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300 p-5 sm:p-7 lg:p-8 border border-green-100"
              >
                <div className="text-3xl sm:text-4xl mb-3 sm:mb-4">{member.icon}</div>
                <span className="inline-block bg-green-100 text-green-800 text-[10px] sm:text-xs font-bold tracking-wide uppercase px-3 py-1 rounded-full mb-2 sm:mb-3 leading-snug">
                  {member.role}
                </span>
                <h3 className="text-base sm:text-lg lg:text-xl font-bold text-green-800 mb-0.5 sm:mb-1">{member.name}</h3>
                {member.credentials && (
                  <p className="text-[11px] sm:text-xs lg:text-sm text-gray-400 font-medium mb-2 sm:mb-3">{member.credentials}</p>
                )}
                <div className="w-7 h-0.5 bg-green-300 rounded-full mb-2 sm:mb-3" />
                <p className="text-gray-600 leading-relaxed text-[11px] sm:text-xs lg:text-sm">{member.bio}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>


      {/* ── PARTNERS & AFFILIATES ────────────────────────────────
          Govt:      1-col → 2-col sm → 3-col md
          Financial: 1-col → 2-col sm
          Technical: 2-col → 4-col md (descriptions hidden on mobile)
      ──────────────────────────────────────────────────────── */}
      <section className="py-14 sm:py-18 lg:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-10">

          <motion.div
            initial={{ y: 40, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-10 sm:mb-14 lg:mb-20"
          >
            <span className="inline-block bg-orange-100 text-orange-700 text-xs font-bold tracking-widest uppercase px-4 py-1.5 rounded-full mb-3 sm:mb-4">
              Collaborations
            </span>
            <h2 className="text-2xl sm:text-4xl lg:text-5xl font-bold text-green-800 mb-3 sm:mb-5">Our Partners & Affiliates</h2>
            <p className="text-gray-600 max-w-2xl mx-auto text-xs sm:text-base lg:text-lg leading-relaxed">
              EMGO Farms collaborates with world-class institutions, government bodies, and industry leaders to build a robust agro-industrial ecosystem.
            </p>
          </motion.div>

          {/* Government */}
          <div className="mb-10 sm:mb-14 lg:mb-16">
            <div className="flex items-center gap-2 sm:gap-3 mb-5 sm:mb-8">
              <div className="h-px flex-1 bg-green-100" />
              <h3 className="text-[10px] sm:text-xs font-bold text-green-700 tracking-widest uppercase whitespace-nowrap px-2">🏛 Government & Regulatory</h3>
              <div className="h-px flex-1 bg-green-100" />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-5 lg:gap-6">
              {[
                { name: "Akwa Ibom State Government", desc: "State-level agricultural development support, land allocation, and rural infrastructure initiatives.", type: "Government Body" },
                { name: "Nigerian Export Promotion Council (NEPC)", desc: "Facilitating export market development for EMGO's premium agro-products to global markets.", type: "Federal Agency" },
                { name: "Federal Ministry of Agriculture & Food Security", desc: "Policy alignment, extension services, and participation in national agro-development programs.", type: "Federal Agency" },
              ].map((partner, idx) => (
                <motion.div
                  key={idx}
                  initial={{ scale: 0.97, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                  className="bg-green-50 rounded-2xl p-4 sm:p-6 lg:p-7 border border-green-100 hover:border-green-300 hover:shadow-lg transition-all duration-300"
                >
                  <div className="flex items-start justify-between mb-3 sm:mb-4">
                    <div className="w-9 h-9 sm:w-11 sm:h-11 bg-green-800 rounded-xl flex items-center justify-center text-white font-bold shadow-md flex-shrink-0 text-sm sm:text-base">
                      {partner.name.charAt(0)}
                    </div>
                    <span className="text-[10px] sm:text-xs font-semibold text-green-700 bg-green-100 px-2 py-1 rounded-full ml-2 text-right leading-snug">{partner.type}</span>
                  </div>
                  <h4 className="text-xs sm:text-sm lg:text-base font-bold text-green-800 mb-1.5 sm:mb-2">{partner.name}</h4>
                  <p className="text-gray-500 text-[11px] sm:text-xs lg:text-sm leading-relaxed">{partner.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Financial */}
          <div className="mb-10 sm:mb-14 lg:mb-16">
            <div className="flex items-center gap-2 sm:gap-3 mb-5 sm:mb-8">
              <div className="h-px flex-1 bg-orange-100" />
              <h3 className="text-[10px] sm:text-xs font-bold text-orange-600 tracking-widest uppercase whitespace-nowrap px-2">💰 Financial & Investment Partners</h3>
              <div className="h-px flex-1 bg-orange-100" />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 lg:gap-8">
              {[
                { name: "Bank of Agriculture (BOA)", desc: "Agricultural financing and credit facilities to support farm expansion, equipment acquisition, and working capital.", type: "Development Finance", highlight: true },
                { name: "Development Bank of Nigeria (DBN)", desc: "Long-term development financing for EMGO's agro-processing infrastructure and value chain investments.", type: "Development Finance", highlight: true },
                { name: "Private Equity Investors", desc: "Strategic capital partners providing growth equity to accelerate plantation development and processing plant construction.", type: "Private Capital", highlight: false },
                { name: "Agri-Impact Fund (AIF)", desc: "Impact investment fund aligned with EMGO's ESG objectives and sustainable agriculture mission across West Africa.", type: "Impact Investment", highlight: false },
                { name: "Bank of Industry (BOI)", desc: "Industrial development financing to support EMGO's agro-processing plant, machinery acquisition, and value-addition infrastructure.", type: "Development Finance", highlight: true },
                { name: "Agence Française de Développement (AFD)", desc: "French development agency partnership providing concessional financing and technical support for sustainable agro-industrial projects in West Africa.", type: "International Finance", highlight: false },
              ].map((partner, idx) => (
                <motion.div
                  key={idx}
                  initial={{ x: idx % 2 === 0 ? -30 : 30, opacity: 0 }}
                  whileInView={{ x: 0, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: idx * 0.1 }}
                  className="flex gap-3 sm:gap-5 items-start bg-white rounded-2xl p-4 sm:p-6 lg:p-7 border border-gray-100 hover:border-orange-200 hover:shadow-lg transition-all duration-300"
                >
                  <div className={`min-w-[44px] h-11 sm:min-w-14 sm:h-14 rounded-xl flex items-center justify-center text-white font-bold shadow-md flex-shrink-0 text-sm sm:text-base ${partner.highlight ? "bg-orange-600" : "bg-orange-400"}`}>
                    {partner.name.charAt(0)}
                  </div>
                  <div className="min-w-0">
                    <div className="flex flex-wrap items-start gap-1.5 sm:gap-2 mb-1 sm:mb-1.5">
                      <h4 className="text-xs sm:text-sm lg:text-base font-bold text-gray-800">{partner.name}</h4>
                      <span className="text-[10px] sm:text-xs font-semibold text-orange-600 bg-orange-50 px-2 py-0.5 rounded-full">{partner.type}</span>
                    </div>
                    <p className="text-gray-500 text-[11px] sm:text-xs lg:text-sm leading-relaxed">{partner.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Technical */}
          <div className="mb-10 sm:mb-14 lg:mb-16">
            <div className="flex items-center gap-2 sm:gap-3 mb-5 sm:mb-8">
              <div className="h-px flex-1 bg-green-100" />
              <h3 className="text-[10px] sm:text-xs font-bold text-green-700 tracking-widest uppercase whitespace-nowrap px-2">🔬 Technical & Research Partners</h3>
              <div className="h-px flex-1 bg-green-100" />
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-5 lg:gap-6">
              {[
                { name: "Nigerian Institute for Oil Palm Research (NIFOR)", desc: "Seed variety selection, agronomic best practices, and technical research support.", icon: "🌴" },
                { name: "International Institute of Tropical Agriculture (IITA)", desc: "Cassava research partnership, disease-resistant varieties, and soil improvement science.", icon: "🧪" },
                { name: "University of Uyo", desc: "Academic collaboration for agronomy research, internship programs, and data analysis.", icon: "🎓" },
                { name: "FUTO — Federal University of Technology Owerri", desc: "Engineering and food science partnerships for processing plant development.", icon: "⚗️" },
              ].map((partner, idx) => (
                <motion.div
                  key={idx}
                  initial={{ y: 30, opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                  className="bg-green-50 rounded-2xl p-3 sm:p-5 lg:p-6 text-center hover:bg-green-800 hover:text-white group transition-all duration-300 cursor-default border border-green-100 hover:border-green-800 hover:shadow-xl"
                >
                  <div className="text-2xl sm:text-3xl lg:text-4xl mb-2 sm:mb-3">{partner.icon}</div>
                  <h4 className="text-[10px] sm:text-xs lg:text-sm font-bold text-green-800 group-hover:text-white mb-1.5 leading-snug transition-colors">{partner.name}</h4>
                  {/* description hidden on mobile to keep cards compact */}
                  <p className="text-gray-500 group-hover:text-green-100 text-xs leading-relaxed transition-colors hidden sm:block">{partner.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Partnership CTA Banner */}
          <motion.div
            initial={{ y: 40, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative rounded-3xl overflow-hidden bg-green-800 text-white px-6 sm:px-10 py-10 sm:py-14 lg:py-16 text-center shadow-2xl"
          >
            <div className="absolute top-0 left-0 w-40 sm:w-64 h-40 sm:h-64 bg-green-700 rounded-full -translate-x-1/2 -translate-y-1/2 opacity-50 pointer-events-none" />
            <div className="absolute bottom-0 right-0 w-48 sm:w-72 h-48 sm:h-72 bg-green-900 rounded-full translate-x-1/3 translate-y-1/3 opacity-50 pointer-events-none" />
            <div className="relative z-10">
              <span className="inline-block bg-orange-500 text-white text-[10px] sm:text-xs font-bold tracking-widest uppercase px-3 sm:px-4 py-1.5 sm:py-2 rounded-full mb-4 sm:mb-5">
                Partnership Opportunities
              </span>
              <h3 className="text-xl sm:text-3xl lg:text-4xl font-bold mb-3 sm:mb-5 leading-tight">
                Interested in Partnering with EMGO Farms?
              </h3>
              <p className="text-green-200 max-w-2xl mx-auto text-xs sm:text-base lg:text-lg mb-7 sm:mb-10 leading-relaxed">
                We are open to strategic partnerships in agronomy research, processing technology, distribution, off-take agreements, and impact investment.
              </p>
              {/* Stacked on mobile, inline on sm+ */}
              <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
                <Link
                  href="/contact"
                  className="w-full sm:w-auto inline-flex items-center justify-center bg-white text-green-800 font-bold text-sm sm:text-base px-7 sm:px-10 py-3 sm:py-4 rounded-2xl hover:bg-orange-500 hover:text-white transition-all duration-300 shadow-lg hover:shadow-xl"
                >
                  Get In Touch →
                </Link>
                <a
                  href={WHATSAPP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#1ebe5d] text-white font-bold text-sm sm:text-base px-7 sm:px-10 py-3 sm:py-4 rounded-2xl transition-all duration-300 shadow-lg"
                >
                  <FaWhatsapp size={17} /> WhatsApp Us
                </a>
              </div>
            </div>
          </motion.div>

        </div>
      </section>


      {/* QUOTE IMAGE SECTION */}
      <section className="py-12 sm:py-16 lg:py-20 bg-green-50">
        <div className="max-w-4xl mx-auto px-5 sm:px-8 lg:px-10 flex justify-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9 }}
            className="rounded-3xl overflow-hidden shadow-2xl border border-green-100"
          >
            <Image
              src="/image/think.jpeg"
              alt="EMGO Farms Quote"
              width={500}
              height={500}
              className="object-cover object-center"
            />
          </motion.div>
        </div>
      </section>


      {/* ── WOMEN & CHILDREN COMMUNITY SUPPORT ──────────────────
          Mobile:  single column, stacked
          Tablet:  2-column grid for initiative cards
          Desktop: image left + text right, 4-col initiative grid
      ──────────────────────────────────────────────────────── */}
      <section className="py-14 sm:py-18 lg:py-28 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-10">

          {/* ── Section header ── */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-10 sm:mb-14 lg:mb-20"
          >
            <span className="inline-block bg-pink-100 text-pink-700 text-xs font-bold tracking-widest uppercase px-4 py-1.5 rounded-full mb-3 sm:mb-4">
              Community Impact
            </span>
            <h2 className="text-2xl sm:text-4xl lg:text-5xl font-bold text-green-800 mb-3 sm:mb-5 leading-tight">
              Supporting Women &amp; Children<br className="hidden sm:block" />
              <span className="text-orange-500"> in Our Host Community</span>
            </h2>
            <p className="text-gray-600 max-w-3xl mx-auto text-sm sm:text-base lg:text-lg leading-relaxed">
              At EMGO Farms, we believe that true agricultural success is measured not only in harvest, but in the lives we uplift.  We are deeply committed to the welfare of women, men and children in Nsit Atai and across all our hosts communities in Akwa Ibom State and beyond.
            </p>
          </motion.div>

          {/* ── Hero image + intro text side by side (lg+), stacked (mobile) ── */}
          <div className="flex flex-col lg:flex-row gap-10 lg:gap-16 items-center mb-14 sm:mb-16 lg:mb-20">

            {/* Image card */}
            <motion.div
              initial={{ x: -50, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.9 }}
              className="w-full lg:w-1/2 relative rounded-3xl overflow-hidden shadow-2xl aspect-[4/3] sm:aspect-[16/10] lg:aspect-[4/3] flex-shrink-0"
            >
              <Image
                src="/image/story3.jpg"
                alt="EMGO Farms Community Support — Women and Children"
                fill
                className="object-cover hover:scale-105 transition-transform duration-700"
              />
              {/* Overlay badge */}
              <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm rounded-2xl px-4 py-3 shadow-lg">
                <p className="text-green-800 font-bold text-sm leading-snug">💗 Community First</p>
                <p className="text-gray-500 text-xs mt-0.5">Nsit Atai, Akwa Ibom State</p>
              </div>
            </motion.div>

            {/* Text block */}
            <motion.div
              initial={{ x: 50, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.9 }}
              className="w-full lg:w-1/2"
            >
              <div className="space-y-4 sm:space-y-5 text-gray-700 text-sm sm:text-base lg:text-lg leading-relaxed">
                <p>
                  Our host communities are the heartbeat of everything we do. From the very beginning,
                  EMGO Farms has placed community wellbeing at the core of our agricultural mission —
                  because we know that no enterprise can truly thrive while those around it struggle.
                </p>
                <p>
                  We champion programs that place women at the forefront of agricultural value chains,
                  providing skills training, economic inclusion, and leadership opportunities.
                  Men and Women in our communities are not just beneficiaries — they are active partners in
                  building EMGO's agro-industrial future.
                </p>
                <p>
                  For our children, we invest in education, nutrition, and safe development environments —
                  because the children of today's host community are the agro-industrial leaders of tomorrow.
                </p>
              </div>

              {/* Stats row */}
              <div className="mt-7 sm:mt-8 grid grid-cols-3 gap-3 sm:gap-5">
                {[
                  { value: "100+", label: "Young & Elderly men empowered" },
                  { value: "500+", label: "Children Supported" },
                  { value: "5+",   label: "Community Programs" },
                ].map((stat, i) => (
                  <div key={i} className="text-center bg-pink-50 rounded-2xl p-3 sm:p-4 border border-pink-100">
                    <p className="text-xl sm:text-2xl lg:text-3xl font-bold text-orange-500">{stat.value}</p>
                    <p className="text-[10px] sm:text-xs text-gray-500 mt-0.5 leading-snug">{stat.label}</p>
                  </div>
                ))}
              </div>
            </motion.div>

          </div>

          {/* ── Initiative cards grid ──
              Mobile:  1-column
              Tablet:  2-column
              Desktop: 4-column
          ── */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-7">
            {[
              {
                icon: "👩‍🌾",
                title: "Women in Agribusiness",
                color: "bg-green-50 border-green-100",
                accent: "text-green-800",
                desc: "Training programs equipping women with modern farming techniques, cooperative management, and agro-processing skills to build independent livelihoods.",
              },
              {
                icon: "📚",
                title: "Children's Education Fund",
                color: "bg-orange-50 border-orange-100",
                accent: "text-orange-700",
                desc: "Scholarship support, school supply drives, and infrastructure contributions to keep children in school and open pathways to academic excellence.",
              },
              {
                icon: "🍽️",
                title: "Nutrition & Food Security",
                color: "bg-pink-50 border-pink-100",
                accent: "text-pink-700",
                desc: "Community feeding initiatives and farm-fresh food access programs targeting mothers and young children in underserved households.",
              },
              {
                icon: "🏥",
                title: "Health & Wellbeing",
                color: "bg-blue-50 border-blue-100",
                accent: "text-blue-700",
                desc: "Periodic health outreach, maternal health awareness campaigns, and partnerships with local health centers to improve community wellness outcomes.",
              },
            ].map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
                className={`rounded-2xl border p-5 sm:p-6 lg:p-7 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 ${item.color}`}
              >
                <div className="text-3xl sm:text-4xl mb-3 sm:mb-4">{item.icon}</div>
                <h3 className={`text-sm sm:text-base lg:text-lg font-bold mb-2 sm:mb-3 ${item.accent}`}>
                  {item.title}
                </h3>
                <p className="text-gray-600 text-xs sm:text-sm leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>

          {/* ── Bottom CTA strip ── */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="mt-12 sm:mt-14 lg:mt-16 bg-gradient-to-r from-green-800 to-green-900 rounded-3xl px-6 sm:px-10 py-8 sm:py-10 text-white text-center shadow-xl"
          >
            <p className="text-base sm:text-xl lg:text-2xl font-bold mb-2 sm:mb-3 leading-snug">
              💗 Together, we grow stronger communities.
            </p>
            <p className="text-green-200 text-xs sm:text-sm lg:text-base max-w-2xl mx-auto mb-6 sm:mb-7 leading-relaxed">
              EMGO Farms invites partners, NGOs, and government agencies to collaborate on expanding
              our community support programs for women and children across Akwa Ibom State and beyond.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
              <Link
                href="/contact"
                className="w-full sm:w-auto inline-flex items-center justify-center px-7 sm:px-9 py-3 sm:py-3.5 bg-orange-500 hover:bg-orange-600 text-white rounded-full font-bold text-sm sm:text-base transition-all duration-200 shadow-lg hover:scale-[1.03] active:scale-95"
              >
                Partner With Us →
              </Link>
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 sm:px-9 py-3 sm:py-3.5 border-2 border-white/50 hover:border-white text-white rounded-full font-semibold text-sm sm:text-base transition-all duration-200 hover:bg-white/10"
              >
                <FaWhatsapp size={16} /> Chat on WhatsApp
              </a>
            </div>
          </motion.div>

        </div>
      </section>

    </div>
  )
}