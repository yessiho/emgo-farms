'use client'

import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"

export default function AboutPage() {
  return (
    <div className="bg-white min-h-screen font-sans text-gray-800">

      {/* ── HERO ─────────────────────────────────────────────── */}
      <section className="relative h-[60vh] sm:h-[65vh] lg:h-[500px] bg-[url('/image/story2.jpg')] bg-cover bg-center flex items-center justify-center">
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/40" />
        <motion.div
          initial={{ y: -40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1 }}
          className="relative text-center text-white px-5 sm:px-8 max-w-3xl mx-auto"
        >
          <h1 className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6 leading-tight">
            About EMGO Farms & Integrated Services Limited
          </h1>
          <p className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-200 leading-relaxed">
            Building a fully integrated agro-industrial ecosystem rooted in sustainability, innovation, and long-term value creation.
          </p>
        </motion.div>
      </section>


      {/* ── COMPANY STORY ─────────────────────────────────────── */}
      <section className="py-16 sm:py-20 lg:py-28 bg-green-50">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-10 grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">

          <motion.div
            initial={{ x: -60, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
          >
            <span className="inline-block bg-green-100 text-green-800 text-xs font-bold tracking-widest uppercase px-4 py-1.5 rounded-full mb-5">
              Who We Are
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-green-800 mb-6 lg:mb-8 leading-tight">
              Our Story
            </h2>
            <div className="space-y-4 text-gray-700 text-base sm:text-lg leading-relaxed">
              <p>
                In the fertile soils of Nsit Atai, Akwa Ibom State, a bold vision was born — a vision to build more than a farm. A vision to build value, create opportunity, and redefine agricultural excellence in Nigeria and West Africa.
              </p>
              <p>
                EMGO Farms and Integrated Services Limited was founded on a simple but powerful belief: Agriculture should not merely produce crops — it should create prosperity, ensure food security, empower communities, and operate sustainably for generations.
              </p>
              <p>
                We began with 3 hectares of land, but our ambition stretches far beyond boundaries. Our goal is clear: cultivate over 10,000 high-yielding oil palm trees, establish a modern palm oil and palm kernel oil refining plant, and develop a fully integrated agro value chain.
              </p>
              <p>
                We are building an integrated agricultural ecosystem — including cassava cultivation, ginger and other cash crops, and sustainable animal husbandry — ensuring diversified income streams and circular agricultural practices.
              </p>
            </div>

            <div className="mt-6">
              <p className="text-gray-700 mb-3 font-medium text-base sm:text-lg">Our approach is deliberate:</p>
              <ul className="space-y-2">
                {["End-to-end value chain control", "Quality-driven production", "Modern processing technology", "Sustainable farming practices", "Community-centered growth"].map((item, i) => (
                  <li key={i} className="flex items-center gap-2.5 text-green-800 font-semibold text-sm sm:text-base">
                    <span className="w-2 h-2 rounded-full bg-orange-500 flex-shrink-0" />{item}
                  </li>
                ))}
              </ul>
            </div>

            <p className="text-gray-700 leading-relaxed text-base sm:text-lg mt-6 italic">
              At EMGO Farms, we are not just planting trees — We are planting legacy.<br />
              We are not just refining oil — We are refining standards.<br />
              We are not just building a company — We are building a future.
            </p>
          </motion.div>

          <motion.div
            initial={{ x: 60, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="relative w-full h-72 sm:h-96 lg:h-[520px] rounded-3xl overflow-hidden shadow-2xl"
          >
            <Image src="/image/story3.jpg" alt="EMGO Plantation" fill priority className="object-cover hover:scale-105 transition duration-700" />
          </motion.div>

        </div>
      </section>


      {/* ── MISSION & VISION ──────────────────────────────────── */}
      <section className="py-16 sm:py-20 lg:py-28 bg-white">
        <div className="max-w-6xl mx-auto px-5 sm:px-8 lg:px-10 text-center">

          <motion.div
            initial={{ y: 30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="mb-10 lg:mb-16"
          >
            <span className="inline-block bg-orange-100 text-orange-700 text-xs font-bold tracking-widest uppercase px-4 py-1.5 rounded-full mb-4">
              Purpose & Direction
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-green-800">Mission & Vision</h2>
          </motion.div>

          <div className="grid sm:grid-cols-2 gap-6 sm:gap-8 lg:gap-12">
            <motion.div
              initial={{ x: -30, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="p-7 sm:p-10 bg-green-50 rounded-2xl shadow-lg text-left"
            >
              <div className="text-3xl mb-4">🎯</div>
              <h3 className="text-xl sm:text-2xl font-semibold text-green-800 mb-4 sm:mb-6">Our Mission</h3>
              <p className="text-gray-700 leading-relaxed text-sm sm:text-base">
                To cultivate, process, and deliver premium-quality agricultural products through integrated value chains, modern technology, and responsible farming practices — creating sustainable wealth for stakeholders and lasting community impact.
              </p>
            </motion.div>

            <motion.div
              initial={{ x: 30, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="p-7 sm:p-10 bg-green-800 text-white rounded-2xl shadow-lg text-left"
            >
              <div className="text-3xl mb-4">🌍</div>
              <h3 className="text-xl sm:text-2xl font-semibold mb-4 sm:mb-6">Our Vision</h3>
              <p className="leading-relaxed text-sm sm:text-base">
                To become a leading integrated agro-industrial organization in Nigeria and West Africa, recognized for excellence, innovation, reliability, and sustainable agricultural transformation.
              </p>
            </motion.div>
          </div>
        </div>
      </section>


      {/* ── CORE VALUES ───────────────────────────────────────── */}
      <section className="py-16 sm:py-20 lg:py-28 bg-green-50">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-10 text-center">

          <motion.div
            initial={{ y: 30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="mb-10 lg:mb-16"
          >
            <span className="inline-block bg-green-100 text-green-800 text-xs font-bold tracking-widest uppercase px-4 py-1.5 rounded-full mb-4">
              What Guides Us
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-green-800">Our Core Values</h2>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
            {[
              { title: "🌱 Sustainability", desc: "We farm responsibly — protecting soil, water, and ecosystems to ensure productivity for generations." },
              { title: "⭐ Quality Excellence", desc: "Strict quality control systems from cultivation to finished products." },
              { title: "🤝 Integrity", desc: "We operate with transparency, accountability, and ethical conduct." },
              { title: "🔄 Integration & Efficiency", desc: "We control the value chain from cultivation to refining." },
              { title: "📈 Innovation", desc: "We embrace modern agricultural technology and smart farming practices." },
              { title: "🏘 Community Impact", desc: "We create jobs and empower local farmers while strengthening regional economies." },
            ].map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ scale: 0.95, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.07 }}
                className="p-5 sm:p-7 lg:p-8 bg-white rounded-2xl shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300 text-left"
              >
                <h3 className="text-sm sm:text-base lg:text-xl font-semibold text-green-800 mb-2 sm:mb-4">{item.title}</h3>
                <p className="text-gray-600 text-xs sm:text-sm leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>

          <div className="mt-4 sm:mt-6 flex justify-center">
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="w-full sm:max-w-md p-5 sm:p-8 bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 text-left"
            >
              <h3 className="text-sm sm:text-base lg:text-xl font-semibold text-green-800 mb-2 sm:mb-4">🛡 Reliability</h3>
              <p className="text-gray-600 text-xs sm:text-sm leading-relaxed">We are dependable partners — delivering consistent quality and honoring our commitments.</p>
            </motion.div>
          </div>
        </div>
      </section>


      {/* ── ESG SECTION ───────────────────────────────────────── */}
      <section className="py-16 sm:py-20 lg:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-10">

          <motion.div
            initial={{ y: 30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12 lg:mb-20"
          >
            <span className="inline-block bg-green-100 text-green-800 text-xs font-bold tracking-widest uppercase px-4 py-1.5 rounded-full mb-4">
              Our Commitments
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-green-800">ESG / Sustainability</h2>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8 lg:gap-10">
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
                className={`${col.dark ? "bg-green-800 text-white" : "bg-green-50 text-gray-700"} p-7 sm:p-10 rounded-3xl shadow-lg hover:shadow-2xl transition ${col.span ?? ""}`}
              >
                <div className="text-3xl mb-4">{col.icon}</div>
                <h3 className={`text-xl sm:text-2xl font-bold mb-5 ${col.dark ? "text-white" : "text-green-800"}`}>{col.title}</h3>
                <ul className="space-y-2.5 text-sm sm:text-base">
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


      {/* ── FOUNDERS SECTION ──────────────────────────────────── */}
      <section className="py-16 sm:py-20 lg:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-10">

          <motion.div
            initial={{ y: 30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-10 lg:mb-20"
          >
            <span className="inline-block bg-orange-100 text-orange-700 text-xs font-bold tracking-widest uppercase px-4 py-1.5 rounded-full mb-4">
              The Visionaries
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-green-800 mb-6">Our Co-Founders</h2>

            <div className="max-w-4xl mx-auto mt-8 sm:mt-12 px-5 sm:px-8 py-7 sm:py-8 bg-green-50 rounded-3xl shadow-lg text-gray-800 text-sm sm:text-base lg:text-lg leading-relaxed space-y-3 sm:space-y-4 text-left sm:text-center">
              <p className="font-semibold text-green-800 text-base sm:text-lg lg:text-xl">
                EMGO Farms was founded by visionary entrepreneurs committed to building a sustainable agro-industrial institution in Nigeria.
              </p>
              <p>With professional experience in strategic management, environmental stewardship, and operational excellence, the founders bring a disciplined, systems-driven approach to agriculture.</p>
              <p>Their vision is to transform agricultural potential into structured, scalable, and sustainable value chains that create jobs, strengthen communities, and elevate Nigeria's agro-industrial competitiveness.</p>
              <p className="italic text-gray-600">They believe agriculture is not merely cultivation — it is nation-building.</p>
            </div>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-7 lg:gap-14">
            {[
              "Emmanuel F Obasi (M.Eng, B.Eng, FNES)",
              "Godwin Udott (HND, PMP)",
              "Ifeoma Emma-Obasi (M.Sc, HND)",
              "Mercy Godwin Udott (B.Sc)",
            ].map((name, index) => (
              <motion.div
                key={index}
                initial={{ y: 40, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: index * 0.1 }}
                className="bg-green-50 rounded-3xl shadow-lg overflow-hidden hover:shadow-2xl hover:-translate-y-1 transition-all duration-300"
              >
                <div className="relative h-60 sm:h-72 lg:h-80 w-full">
                  <Image src="/image/oil-palm7.avif" alt={name} fill className="object-cover" />
                </div>
                <div className="p-6 sm:p-8 lg:p-10">
                  <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-green-800 mb-1">{name}</h3>
                  <p className="text-orange-600 font-semibold text-sm sm:text-base">Co-Founder</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>


      {/* ── MANAGEMENT TEAM ───────────────────────────────────── */}
      <section className="py-16 sm:py-20 lg:py-28 bg-green-50">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-10">

          <motion.div
            initial={{ y: 40, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-10 lg:mb-20"
          >
            <span className="inline-block bg-green-100 text-green-800 text-xs font-bold tracking-widest uppercase px-4 py-1.5 rounded-full mb-4">
              Leadership
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-green-800 mb-4 sm:mb-6">Management Team</h2>
            <p className="text-gray-600 max-w-2xl mx-auto text-sm sm:text-base lg:text-lg leading-relaxed">
              Our management team combines deep agricultural expertise with operational excellence, driving EMGO Farms towards sustainable growth and lasting impact.
            </p>
          </motion.div>

          {/* CEO & COO */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 lg:gap-12 mb-6 sm:mb-8 lg:mb-12">
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
                className={`rounded-3xl shadow-xl overflow-hidden hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 ${member.accent}`}
              >
                <div className="p-7 sm:p-8 lg:p-10">
                  <div className="text-4xl sm:text-5xl mb-4 sm:mb-6">{member.icon}</div>
                  <span className={`inline-block text-xs font-bold tracking-widest uppercase px-3 py-1 rounded-full mb-3 sm:mb-4 ${member.tagAccent} bg-opacity-30 text-white border border-white/30`}>
                    {member.role}
                  </span>
                  <h3 className="text-xl sm:text-2xl font-bold mb-1">{member.name}</h3>
                  <p className="text-xs sm:text-sm opacity-70 font-medium mb-4 sm:mb-5">{member.credentials}</p>
                  <div className="w-12 h-1 bg-white/40 rounded-full mb-4 sm:mb-5" />
                  <p className="leading-relaxed opacity-90 text-sm sm:text-base">{member.bio}</p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Directors */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 sm:gap-6 lg:gap-8">
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
                className="bg-white rounded-3xl shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300 p-6 sm:p-8 border border-green-100"
              >
                <div className="text-3xl sm:text-4xl mb-4 sm:mb-5">{member.icon}</div>
                <span className="inline-block bg-green-100 text-green-800 text-xs font-bold tracking-wide uppercase px-3 py-1 rounded-full mb-3 sm:mb-4 leading-snug">
                  {member.role}
                </span>
                <h3 className="text-lg sm:text-xl font-bold text-green-800 mb-1">{member.name}</h3>
                {member.credentials && <p className="text-xs sm:text-sm text-gray-400 font-medium mb-3 sm:mb-4">{member.credentials}</p>}
                <div className="w-8 h-0.5 bg-green-300 rounded-full mb-3 sm:mb-4" />
                <p className="text-gray-600 leading-relaxed text-xs sm:text-sm">{member.bio}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>


      {/* ── PARTNERS & AFFILIATES ─────────────────────────────── */}
      <section className="py-16 sm:py-20 lg:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-10">

          <motion.div
            initial={{ y: 40, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12 lg:mb-20"
          >
            <span className="inline-block bg-orange-100 text-orange-700 text-xs font-bold tracking-widest uppercase px-4 py-1.5 rounded-full mb-4">
              Collaborations
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-green-800 mb-4 sm:mb-6">Our Partners & Affiliates</h2>
            <p className="text-gray-600 max-w-2xl mx-auto text-sm sm:text-base lg:text-lg leading-relaxed">
              EMGO Farms collaborates with world-class institutions, government bodies, and industry leaders to build a robust agro-industrial ecosystem.
            </p>
          </motion.div>

          {/* Government */}
          <div className="mb-12 lg:mb-16">
            <div className="flex items-center gap-3 mb-6 sm:mb-8">
              <div className="h-px flex-1 bg-green-100" />
              <h3 className="text-xs sm:text-sm font-bold text-green-700 tracking-widest uppercase whitespace-nowrap px-2">🏛 Government & Regulatory</h3>
              <div className="h-px flex-1 bg-green-100" />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 sm:gap-6">
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
                  className="bg-green-50 rounded-2xl p-5 sm:p-7 border border-green-100 hover:border-green-300 hover:shadow-lg transition-all duration-300"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 bg-green-800 rounded-xl flex items-center justify-center text-white font-bold shadow-md flex-shrink-0">
                      {partner.name.charAt(0)}
                    </div>
                    <span className="text-xs font-semibold text-green-700 bg-green-100 px-2 py-1 rounded-full ml-2 text-right leading-snug">{partner.type}</span>
                  </div>
                  <h4 className="text-sm sm:text-base font-bold text-green-800 mb-2">{partner.name}</h4>
                  <p className="text-gray-500 text-xs sm:text-sm leading-relaxed">{partner.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Financial */}
          <div className="mb-12 lg:mb-16">
            <div className="flex items-center gap-3 mb-6 sm:mb-8">
              <div className="h-px flex-1 bg-orange-100" />
              <h3 className="text-xs sm:text-sm font-bold text-orange-600 tracking-widest uppercase whitespace-nowrap px-2">💰 Financial & Investment Partners</h3>
              <div className="h-px flex-1 bg-orange-100" />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-8">
              {[
                { name: "Bank of Agriculture (BOA)", desc: "Agricultural financing and credit facilities to support farm expansion, equipment acquisition, and working capital.", type: "Development Finance", highlight: true },
                { name: "Development Bank of Nigeria (DBN)", desc: "Long-term development financing for EMGO's agro-processing infrastructure and value chain investments.", type: "Development Finance", highlight: true },
                { name: "Private Equity Investors", desc: "Strategic capital partners providing growth equity to accelerate plantation development and processing plant construction.", type: "Private Capital", highlight: false },
                { name: "Agri-Impact Fund (AIF)", desc: "Impact investment fund aligned with EMGO's ESG objectives and sustainable agriculture mission across West Africa.", type: "Impact Investment", highlight: false },
              ].map((partner, idx) => (
                <motion.div
                  key={idx}
                  initial={{ x: idx % 2 === 0 ? -30 : 30, opacity: 0 }}
                  whileInView={{ x: 0, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: idx * 0.1 }}
                  className="flex gap-4 sm:gap-5 items-start bg-white rounded-2xl p-5 sm:p-7 border border-gray-100 hover:border-orange-200 hover:shadow-lg transition-all duration-300"
                >
                  <div className={`min-w-12 h-12 sm:min-w-14 sm:h-14 rounded-xl flex items-center justify-center text-white font-bold shadow-md flex-shrink-0 ${partner.highlight ? "bg-orange-600" : "bg-orange-400"}`}>
                    {partner.name.charAt(0)}
                  </div>
                  <div className="min-w-0">
                    <div className="flex flex-wrap items-start gap-2 mb-1.5">
                      <h4 className="text-sm sm:text-base font-bold text-gray-800">{partner.name}</h4>
                      <span className="text-xs font-semibold text-orange-600 bg-orange-50 px-2 py-0.5 rounded-full">{partner.type}</span>
                    </div>
                    <p className="text-gray-500 text-xs sm:text-sm leading-relaxed">{partner.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Technical */}
          <div className="mb-12 lg:mb-16">
            <div className="flex items-center gap-3 mb-6 sm:mb-8">
              <div className="h-px flex-1 bg-green-100" />
              <h3 className="text-xs sm:text-sm font-bold text-green-700 tracking-widest uppercase whitespace-nowrap px-2">🔬 Technical & Research Partners</h3>
              <div className="h-px flex-1 bg-green-100" />
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
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
                  className="bg-green-50 rounded-2xl p-4 sm:p-6 text-center hover:bg-green-800 hover:text-white group transition-all duration-300 cursor-default border border-green-100 hover:border-green-800 hover:shadow-xl"
                >
                  <div className="text-3xl sm:text-4xl mb-3 sm:mb-4">{partner.icon}</div>
                  <h4 className="text-xs sm:text-sm font-bold text-green-800 group-hover:text-white mb-2 leading-snug transition-colors">{partner.name}</h4>
                  <p className="text-gray-500 group-hover:text-green-100 text-xs leading-relaxed transition-colors hidden sm:block">{partner.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>

          {/* CTA Banner */}
          <motion.div
            initial={{ y: 40, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative rounded-3xl overflow-hidden bg-green-800 text-white px-6 sm:px-10 py-12 sm:py-16 text-center shadow-2xl"
          >
            <div className="absolute top-0 left-0 w-48 sm:w-64 h-48 sm:h-64 bg-green-700 rounded-full -translate-x-1/2 -translate-y-1/2 opacity-50 pointer-events-none" />
            <div className="absolute bottom-0 right-0 w-56 sm:w-72 h-56 sm:h-72 bg-green-900 rounded-full translate-x-1/3 translate-y-1/3 opacity-50 pointer-events-none" />
            <div className="relative z-10">
              <span className="inline-block bg-orange-500 text-white text-xs font-bold tracking-widest uppercase px-4 py-2 rounded-full mb-5">
                Partnership Opportunities
              </span>
              <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4 sm:mb-5 leading-tight">
                Interested in Partnering with EMGO Farms?
              </h3>
              <p className="text-green-200 max-w-2xl mx-auto text-sm sm:text-base lg:text-lg mb-8 sm:mb-10 leading-relaxed">
                We are open to strategic partnerships in agronomy research, processing technology, distribution, off-take agreements, and impact investment.
              </p>
              <Link
                href="/contact"
                className="inline-block bg-white text-green-800 font-bold text-base sm:text-lg px-8 sm:px-10 py-3.5 sm:py-4 rounded-2xl hover:bg-orange-500 hover:text-white transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                Get In Touch →
              </Link>
            </div>
          </motion.div>

        </div>
      </section>

    </div>
  )
}