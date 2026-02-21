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

            {/* INSERTED NOTE ONLY */}
            <div className="max-w-4xl mx-auto mt-12 px-6 py-8 bg-green-50 rounded-3xl shadow-lg text-gray-800 text-lg leading-relaxed space-y-4">
              <p className="font-semibold text-green-800 text-xl">
                EMGO Farms and Integrated Services Limited was founded by visionary entrepreneurs committed to building a sustainable agro-industrial institution in Nigeria.
              </p>

              <p>
                With professional experience in strategic management, environmental stewardship, and operational excellence, the founders bring a disciplined, systems-driven approach to agriculture.
              </p>

              <p>
                Their vision is to transform agricultural potential into structured, scalable, and sustainable value chains that create jobs, strengthen communities, and elevate Nigeria’s agro-industrial competitiveness.
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

    </div>
  )
}