'use client'

import Image from "next/image"
import { motion } from "framer-motion"

export default function AboutPage() {
  return (
    <div className="bg-white min-h-screen font-sans text-gray-800">

      {/* HERO SECTION */}
      <section className="relative h-[500px] bg-[url('/image/story2.jpg')] bg-cover bg-center flex items-center justify-center">
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/40"></div>

        <motion.div 
          initial={{ y: -40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1 }}
          className="relative text-center text-white px-6 max-w-3xl"
        >
          <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
            About EMGO Farms & Integrated Services Limited
          </h1>
          <p className="text-lg md:text-xl text-gray-200">
            Building a fully integrated agro-industrial ecosystem rooted in sustainability, innovation, and long-term value creation.
          </p>
        </motion.div>
      </section>


      {/* COMPANY STORY */}
      <section className="py-28 bg-green-50">
        <div className="container mx-auto grid md:grid-cols-2 gap-16 items-center px-6">

          <motion.div 
            initial={{ x: -60, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-green-800 mb-8 leading-tight">
              Our Story
            </h2>

            <p className="text-gray-700 mb-6 leading-relaxed text-lg">
              In the fertile soils of Nsit Atai, Akwa Ibom State, a bold vision was born — a vision to build more than a farm. A vision to build value, create opportunity, and redefine agricultural excellence in Nigeria and West Africa.
            </p>

            <p className="text-gray-700 mb-6 leading-relaxed text-lg">
              EMGO Farms and Integrated Services Limited was founded on a simple but powerful belief:
              Agriculture should not merely produce crops — it should create prosperity, ensure food security, empower communities, and operate sustainably for generations.
            </p>

            <p className="text-gray-700 mb-6 leading-relaxed text-lg">
              We began with 3 hectares of land, but our ambition stretches far beyond boundaries. Our goal is clear: cultivate over 10,000 high-yielding oil palm trees, establish a modern palm oil and palm kernel oil refining plant, and develop a fully integrated agro value chain that transforms raw produce into premium finished products for local and international markets.
            </p>

            <p className="text-gray-700 mb-6 leading-relaxed text-lg">
              But we are not stopping at oil palm.
            </p>

            <p className="text-gray-700 mb-6 leading-relaxed text-lg">
              We are building an integrated agricultural ecosystem — including cassava cultivation for high-quality starch production, ginger and other cash crops, and sustainable animal husbandry — ensuring diversified income streams, reduced waste, and circular agricultural practices.
            </p>

            <p className="text-gray-700 mb-4 leading-relaxed text-lg">
              Our approach is deliberate:
            </p>

            <ul className="list-disc list-inside text-green-800 font-semibold text-lg mb-6 space-y-2">
              <li>End-to-end value chain control</li>
              <li>Quality-driven production</li>
              <li>Modern processing technology</li>
              <li>Sustainable farming practices</li>
              <li>Community-centered growth</li>
            </ul>

            <p className="text-gray-700 leading-relaxed text-lg">
              At EMGO Farms, we are not just planting trees - We are planting legacy.
              We are not just refining oil – We are refining standards.
              We are not just building a company – We are building a future.
            </p>

          </motion.div>

          <motion.div
            initial={{ x: 60, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="relative w-full h-[520px] rounded-3xl overflow-hidden shadow-2xl"
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


      {/* MISSION & VISION */}
      <section className="py-28 bg-white">
        <div className="container mx-auto px-6 text-center max-w-6xl">

          <h2 className="text-4xl md:text-5xl font-bold text-green-800 mb-16">
            Mission & Vision
          </h2>

          <div className="grid md:grid-cols-2 gap-12">

            <div className="p-10 bg-green-50 rounded-2xl shadow-lg text-left">
              <h3 className="text-2xl font-semibold text-green-800 mb-6">
                Our Mission
              </h3>
              <p className="text-gray-700 leading-relaxed">
                To cultivate, process, and deliver premium-quality agricultural products 
                through integrated value chains, modern technology, and responsible farming practices — 
                creating sustainable wealth for stakeholders and lasting community impact.
              </p>
            </div>

            <div className="p-10 bg-green-800 text-white rounded-2xl shadow-lg text-left">
              <h3 className="text-2xl font-semibold mb-6">
                Our Vision
              </h3>
              <p className="leading-relaxed">
                To become a leading integrated agro-industrial organization in Nigeria and West Africa, 
                recognized for excellence, innovation, reliability, and sustainable agricultural transformation.
              </p>
            </div>

          </div>
        </div>
      </section>


      {/* CORE VALUES */}
      <section className="py-28 bg-green-50">
        <div className="container mx-auto px-6 text-center">

          <h2 className="text-4xl md:text-5xl font-bold text-green-800 mb-16">
            Our Core Values
          </h2>

          <div className="grid md:grid-cols-3 gap-8">

            {[
              { title: "🌱 Sustainability", desc: "We farm responsibly — protecting soil, water, and ecosystems to ensure productivity for generations." },
              { title: "⭐ Quality Excellence", desc: "Strict quality control systems from cultivation to finished products." },
              { title: "🤝 Integrity", desc: "We operate with transparency, accountability, and ethical conduct." },
              { title: "🔄 Integration & Efficiency", desc: "We control the value chain from cultivation to refining." },
              { title: "📈 Innovation", desc: "We embrace modern agricultural technology and smart farming practices." },
              { title: "🏘 Community Impact", desc: "We create jobs and empower local farmers while strengthening regional economies." },
            ].map((item, idx) => (
              <div 
                key={idx}
                className="p-8 bg-white rounded-2xl shadow-md hover:shadow-xl transition text-left"
              >
                <h3 className="text-xl font-semibold text-green-800 mb-4">
                  {item.title}
                </h3>
                <p className="text-gray-600">
                  {item.desc}
                </p>
              </div>
            ))}

            <div className="md:col-span-3 flex justify-center">
              <div className="max-w-md p-8 bg-white rounded-2xl shadow-md hover:shadow-xl transition text-left">
                <h3 className="text-xl font-semibold text-green-800 mb-4">
                  🛡 Reliability
                </h3>
                <p className="text-gray-600">
                  We are dependable partners — delivering consistent quality and honoring our commitments.
                </p>
              </div>
            </div>

          </div>
        </div>
      </section>


      {/* ESG SECTION */}
      <section className="py-28 bg-white">
        <div className="container mx-auto px-6">

          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-bold text-green-800 mb-6">
              ESG / Sustainability
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-10">

            <div className="bg-green-50 p-10 rounded-3xl shadow-lg hover:shadow-2xl transition">
              <h3 className="text-2xl font-bold text-green-800 mb-6">Environmental</h3>
              <ul className="space-y-3 text-gray-700">
                <li>• Sustainable land use planning</li>
                <li>• No deforestation policy</li>
                <li>• Soil regeneration practices</li>
                <li>• Organic waste composting</li>
                <li>• Biomass energy use from palm residues</li>
                <li>• Water management systems</li>
              </ul>
            </div>

            <div className="bg-green-800 text-white p-10 rounded-3xl shadow-lg hover:shadow-2xl transition">
              <h3 className="text-2xl font-bold mb-6">Social</h3>
              <ul className="space-y-3">
                <li>• Local employment creation</li>
                <li>• Smallholder farmer inclusion program</li>
                <li>• Youth agricultural training initiatives</li>
                <li>• Fair labour standards</li>
                <li>• Community infrastructure support</li>
              </ul>
            </div>

            <div className="bg-green-50 p-10 rounded-3xl shadow-lg hover:shadow-2xl transition">
              <h3 className="text-2xl font-bold text-green-800 mb-6">Governance</h3>
              <ul className="space-y-3 text-gray-700">
                <li>• Transparent reporting</li>
                <li>• Independent board structure</li>
                <li>• Ethical procurement policies</li>
                <li>• Health, Safety & Environmental compliance</li>
                <li>• Anti-corruption policy</li>
              </ul>
            </div>

          </div>
        </div>
      </section>


      {/* FOUNDERS SECTION */}
      <section className="py-28 bg-white">
        <div className="container mx-auto px-6">

          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-bold text-green-800 mb-6">
              Our Co-Founders
            </h2>

            <div className="max-w-4xl mx-auto mt-12 px-6 py-8 bg-green-50 rounded-3xl shadow-lg text-gray-800 text-lg leading-relaxed space-y-4">
              <p className="font-semibold text-green-800 text-xl">
                EMGO Farms and Integrated Services Limited was founded by visionary entrepreneurs committed to building a sustainable agro-industrial institution in Nigeria.
              </p>

              <p>
                With professional experience in strategic management, environmental stewardship, and operational excellence, the founders bring a disciplined, systems-driven approach to agriculture.
              </p>

              <p>
                Their vision is to transform agricultural potential into structured, scalable, and sustainable value chains that create jobs, strengthen communities, and elevate Nigeria's agro-industrial competitiveness.
              </p>

              <p className="italic">
                They believe agriculture is not merely cultivation — it is nation-building.
              </p>
            </div>
            
          </div>
          
          <div className="grid md:grid-cols-2 gap-14">

            {[
              "Emmanuel F Obasi (M.Eng, B.Eng, FNES)",
              "Godwin Udott (HND, PMP)",
              "Ifeoma Emma-Obasi (M.Sc, HND)",
              "Mercy Godwin Udott (B.Sc)"
            ].map((name, index) => (
              <div key={index} className="bg-green-50 rounded-3xl shadow-lg overflow-hidden hover:shadow-2xl transition">

                <div className="relative h-80 w-full">
                  <Image
                    src="/image/oil-palm7.avif"
                    alt={name}
                    fill
                    className="object-cover"
                  />
                </div>

                <div className="p-10">
                  <h3 className="text-2xl font-bold text-green-800 mb-2">
                    {name}
                  </h3>
                  <p className="text-orange-600 font-semibold">
                    Co-Founder
                  </p>
                </div>

              </div>
            ))}

          </div>

        </div>
      </section>


      {/* ── MANAGEMENT TEAM SECTION ── */}
      <section className="py-28 bg-green-50">
        <div className="container mx-auto px-6">

          {/* Section Header */}
          <motion.div
            initial={{ y: 40, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-20"
          >
            <span className="inline-block bg-green-100 text-green-800 text-sm font-semibold tracking-widest uppercase px-5 py-2 rounded-full mb-6">
              Leadership
            </span>
            <h2 className="text-4xl md:text-5xl font-bold text-green-800 mb-6">
              Management Team
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto text-lg leading-relaxed">
              Our management team combines deep agricultural expertise with operational excellence, 
              driving EMGO Farms towards sustainable growth and lasting impact.
            </p>
          </motion.div>

          {/* Top Row — CEO & COO highlighted */}
          <div className="grid md:grid-cols-2 gap-12 mb-12">
            {[
              {
                name: "Emmanuel F. Obasi",
                credentials: "M.Eng, B.Eng, FNES",
                role: "Chief Executive Officer",
                bio: "A Fellow of the Nigerian Environmental Society with extensive experience in agro-industrial project development and strategic leadership. Emmanuel sets EMGO's long-term vision and oversees all corporate operations.",
                icon: "🌿",
                accent: "bg-green-800 text-white",
                tagAccent: "bg-green-600",
              },
              {
                name: "Godwin Udott",
                credentials: "HND, PMP",
                role: "Chief Operations Officer",
                bio: "A certified Project Management Professional with a track record of executing large-scale agro-industrial projects. Godwin ensures operational efficiency, resource optimization, and project delivery across all divisions.",
                icon: "⚙️",
                accent: "bg-orange-600 text-white",
                tagAccent: "bg-orange-500",
              },
            ].map((member, idx) => (
              <motion.div
                key={idx}
                initial={{ y: 40, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: idx * 0.15 }}
                className={`rounded-3xl shadow-xl overflow-hidden hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 ${member.accent}`}
              >
                <div className="p-10">
                  <div className="text-5xl mb-6">{member.icon}</div>
                  <span className={`inline-block text-xs font-bold tracking-widest uppercase px-3 py-1 rounded-full mb-4 ${member.tagAccent} bg-opacity-30 text-white border border-white/30`}>
                    {member.role}
                  </span>
                  <h3 className="text-2xl font-bold mb-1">{member.name}</h3>
                  <p className="text-sm opacity-70 font-medium mb-5">{member.credentials}</p>
                  <div className="w-12 h-1 bg-white/40 rounded-full mb-5"></div>
                  <p className="leading-relaxed opacity-90 text-base">{member.bio}</p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Bottom Row — Remaining Directors */}
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                name: "Ifeoma Emma-Obasi",
                credentials: "M.Sc, HND",
                role: "Director, Sustainability & Compliance",
                bio: "Oversees EMGO's environmental stewardship programs, ESG reporting frameworks, and regulatory compliance. Ifeoma ensures that growth is always responsible growth.",
                icon: "🌍",
              },
              {
                name: "Mercy Godwin Udott",
                credentials: "B.Sc",
                role: "Director, Finance & Administration",
                bio: "Manages EMGO's financial planning, investor relations, and administrative operations. Mercy brings rigorous financial discipline to every aspect of the business.",
                icon: "📊",
              },
              {
                name: "TBD",
                credentials: "",
                role: "Director, Agronomy & Production",
                bio: "Leads plantation management, crop science, and production optimization across all cultivation zones. Ensures the highest agronomic standards are consistently maintained.",
                icon: "🌾",
              },
            ].map((member, idx) => (
              <motion.div
                key={idx}
                initial={{ y: 40, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: idx * 0.12 }}
                className="bg-white rounded-3xl shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300 p-8 border border-green-100"
              >
                <div className="text-4xl mb-5">{member.icon}</div>
                <span className="inline-block bg-green-100 text-green-800 text-xs font-bold tracking-wide uppercase px-3 py-1 rounded-full mb-4">
                  {member.role}
                </span>
                <h3 className="text-xl font-bold text-green-800 mb-1">{member.name}</h3>
                {member.credentials && (
                  <p className="text-sm text-gray-400 font-medium mb-4">{member.credentials}</p>
                )}
                <div className="w-8 h-0.5 bg-green-300 rounded-full mb-4"></div>
                <p className="text-gray-600 leading-relaxed text-sm">{member.bio}</p>
              </motion.div>
            ))}
          </div>

        </div>
      </section>


      {/* ── PARTNERS & AFFILIATES SECTION ── */}
      <section className="py-28 bg-white">
        <div className="container mx-auto px-6">

          {/* Section Header */}
          <motion.div
            initial={{ y: 40, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-20"
          >
            <span className="inline-block bg-orange-100 text-orange-700 text-sm font-semibold tracking-widest uppercase px-5 py-2 rounded-full mb-6">
              Collaborations
            </span>
            <h2 className="text-4xl md:text-5xl font-bold text-green-800 mb-6">
              Our Partners & Affiliates
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto text-lg leading-relaxed">
              EMGO Farms collaborates with world-class institutions, government bodies, and industry 
              leaders to build a robust agro-industrial ecosystem rooted in shared success.
            </p>
          </motion.div>

          {/* Partner Category: Government & Regulatory */}
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="mb-16"
          >
            <div className="flex items-center gap-4 mb-8">
              <div className="h-px flex-1 bg-green-100"></div>
              <h3 className="text-lg font-bold text-green-700 tracking-widest uppercase whitespace-nowrap">
                🏛 Government & Regulatory
              </h3>
              <div className="h-px flex-1 bg-green-100"></div>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              {[
                {
                  name: "Akwa Ibom State Government",
                  desc: "State-level agricultural development support, land allocation, and rural infrastructure initiatives.",
                  type: "Government Body",
                },
                {
                  name: "Nigerian Export Promotion Council (NEPC)",
                  desc: "Facilitating export market development for EMGO's premium agro-products to global markets.",
                  type: "Federal Agency",
                },
                {
                  name: "Federal Ministry of Agriculture & Food Security",
                  desc: "Policy alignment, extension services, and participation in national agro-development programs.",
                  type: "Federal Agency",
                },
              ].map((partner, idx) => (
                <motion.div
                  key={idx}
                  initial={{ scale: 0.97, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                  className="group bg-green-50 rounded-2xl p-7 border border-green-100 hover:border-green-300 hover:shadow-lg transition-all duration-300"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="w-12 h-12 bg-green-800 rounded-xl flex items-center justify-center text-white text-xl font-bold shadow-md">
                      {partner.name.charAt(0)}
                    </div>
                    <span className="text-xs font-semibold text-green-700 bg-green-100 px-3 py-1 rounded-full">
                      {partner.type}
                    </span>
                  </div>
                  <h4 className="text-base font-bold text-green-800 mb-3 leading-snug">
                    {partner.name}
                  </h4>
                  <p className="text-gray-500 text-sm leading-relaxed">{partner.desc}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Partner Category: Financial & Investment */}
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="mb-16"
          >
            <div className="flex items-center gap-4 mb-8">
              <div className="h-px flex-1 bg-orange-100"></div>
              <h3 className="text-lg font-bold text-orange-600 tracking-widest uppercase whitespace-nowrap">
                💰 Financial & Investment Partners
              </h3>
              <div className="h-px flex-1 bg-orange-100"></div>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {[
                {
                  name: "Bank of Agriculture (BOA)",
                  desc: "Agricultural financing and credit facilities to support farm expansion, equipment acquisition, and working capital.",
                  type: "Development Finance",
                  highlight: true,
                },
                {
                  name: "Development Bank of Nigeria (DBN)",
                  desc: "Long-term development financing for EMGO's agro-processing infrastructure and value chain investments.",
                  type: "Development Finance",
                  highlight: true,
                },
                {
                  name: "Private Equity Investors",
                  desc: "Strategic capital partners providing growth equity to accelerate plantation development and processing plant construction.",
                  type: "Private Capital",
                  highlight: false,
                },
                {
                  name: "Agri-Impact Fund (AIF)",
                  desc: "Impact investment fund aligned with EMGO's ESG objectives and sustainable agriculture mission across West Africa.",
                  type: "Impact Investment",
                  highlight: false,
                },
              ].map((partner, idx) => (
                <motion.div
                  key={idx}
                  initial={{ x: idx % 2 === 0 ? -30 : 30, opacity: 0 }}
                  whileInView={{ x: 0, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: idx * 0.1 }}
                  className="flex gap-5 items-start bg-white rounded-2xl p-7 border border-gray-100 hover:border-orange-200 hover:shadow-lg transition-all duration-300"
                >
                  <div className={`min-w-14 h-14 rounded-xl flex items-center justify-center text-white text-xl font-bold shadow-md flex-shrink-0 ${partner.highlight ? 'bg-orange-600' : 'bg-orange-400'}`}>
                    {partner.name.charAt(0)}
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-2 flex-wrap">
                      <h4 className="text-base font-bold text-gray-800 leading-snug">{partner.name}</h4>
                      <span className="text-xs font-semibold text-orange-600 bg-orange-50 px-2 py-0.5 rounded-full">
                        {partner.type}
                      </span>
                    </div>
                    <p className="text-gray-500 text-sm leading-relaxed">{partner.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Partner Category: Technical & Research */}
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="mb-16"
          >
            <div className="flex items-center gap-4 mb-8">
              <div className="h-px flex-1 bg-green-100"></div>
              <h3 className="text-lg font-bold text-green-700 tracking-widest uppercase whitespace-nowrap">
                🔬 Technical & Research Partners
              </h3>
              <div className="h-px flex-1 bg-green-100"></div>
            </div>

            <div className="grid md:grid-cols-4 gap-6">
              {[
                {
                  name: "Nigerian Institute for Oil Palm Research (NIFOR)",
                  desc: "Seed variety selection, agronomic best practices, and technical research support.",
                  icon: "🌴",
                },
                {
                  name: "International Institute of Tropical Agriculture (IITA)",
                  desc: "Cassava research partnership, disease-resistant varieties, and soil improvement science.",
                  icon: "🧪",
                },
                {
                  name: "University of Uyo",
                  desc: "Academic collaboration for agronomy research, internship programs, and data analysis.",
                  icon: "🎓",
                },
                {
                  name: "FUTO — Federal University of Technology Owerri",
                  desc: "Engineering and food science partnerships for processing plant development and quality assurance.",
                  icon: "⚗️",
                },
              ].map((partner, idx) => (
                <motion.div
                  key={idx}
                  initial={{ y: 30, opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                  className="bg-green-50 rounded-2xl p-6 text-center hover:bg-green-800 hover:text-white group transition-all duration-300 cursor-default border border-green-100 hover:border-green-800 hover:shadow-xl"
                >
                  <div className="text-4xl mb-4">{partner.icon}</div>
                  <h4 className="text-sm font-bold text-green-800 group-hover:text-white mb-3 leading-snug transition-colors">
                    {partner.name}
                  </h4>
                  <p className="text-gray-500 group-hover:text-green-100 text-xs leading-relaxed transition-colors">
                    {partner.desc}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Partner CTA Banner */}
          <motion.div
            initial={{ y: 40, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative rounded-3xl overflow-hidden bg-green-800 text-white px-10 py-16 text-center shadow-2xl"
          >
            {/* Decorative blobs */}
            <div className="absolute top-0 left-0 w-64 h-64 bg-green-700 rounded-full -translate-x-1/2 -translate-y-1/2 opacity-50"></div>
            <div className="absolute bottom-0 right-0 w-72 h-72 bg-green-900 rounded-full translate-x-1/3 translate-y-1/3 opacity-50"></div>

            <div className="relative z-10">
              <span className="inline-block bg-orange-500 text-white text-xs font-bold tracking-widest uppercase px-4 py-2 rounded-full mb-6">
                Partnership Opportunities
              </span>
              <h3 className="text-3xl md:text-4xl font-bold mb-5 leading-tight">
                Interested in Partnering with EMGO Farms?
              </h3>
              <p className="text-green-200 max-w-2xl mx-auto text-lg mb-10 leading-relaxed">
                We are open to strategic partnerships in agronomy research, processing technology, 
                distribution, off-take agreements, and impact investment. Let's build Africa's 
                agricultural future together.
              </p>
              <a
                href="/contact"
                className="inline-block bg-white text-green-800 font-bold text-lg px-10 py-4 rounded-2xl hover:bg-orange-500 hover:text-white transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                Get In Touch →
              </a>
            </div>
          </motion.div>

        </div>
      </section>

    </div>
  )
}