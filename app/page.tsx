'use client'

import { useEffect, useState, useRef } from 'react'
import { Hero } from '../components/Hero'

export default function Home() {
  const [heroData, setHeroData] = useState<any>(null)

  const services = [
    {
      _id: 1,
      title: "Oil Palm Farming",
      description:
        "Large-scale sustainable oil palm cultivation using high-yield seedlings, modern agronomic practices, and environmentally responsible land management.",
      img: "/image/oil-kene1.jpg"
    },
    {
      _id: 2,
      title: "Palm Oil Production",
      description:
        "Efficient palm oil extraction and processing with strict quality control, ensuring premium-grade output for local and international markets.",
      img: "/image/product2.jpg"
    },
    {
      _id: 3,
      title: "Palm Kernel Oil Refining",
      description:
        "Advanced refining systems delivering high-purity palm kernel oil suitable for food, industrial, and cosmetic applications.",
      img: "/image/refin.jpg"
    }
  ]

  useEffect(() => {
    fetch('/api/hero')
      .then(res => res.json())
      .then(data => setHeroData(data))
  }, [])

  if (!heroData) return (
    <div className="flex items-center justify-center h-screen text-green-800 text-xl font-semibold">
      Loading EMGO Farms...
    </div>
  )

  function Counter({ end, duration = 2, suffix = "" }: { end: number, duration?: number, suffix?: string }) {
    const [count, setCount] = useState(0)
    const [hasStarted, setHasStarted] = useState(false)
    const elementRef = useRef(null)

    useEffect(() => {
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setHasStarted(true)
        },
        { threshold: 0.1 }
      )
      if (elementRef.current) observer.observe(elementRef.current)
      return () => observer.disconnect()
    }, [])

    useEffect(() => {
      if (!hasStarted) return
      let startTime: number | null = null
      const animate = (currentTime: number) => {
        if (!startTime) startTime = currentTime
        const progress = Math.min((currentTime - startTime) / (duration * 1000), 1)
        const easedProgress = 1 - Math.pow(1 - progress, 3)
        setCount(Math.floor(easedProgress * end))
        if (progress < 1) requestAnimationFrame(animate)
      }
      requestAnimationFrame(animate)
    }, [hasStarted, end, duration])

    return <span ref={elementRef}>{count.toLocaleString()}{suffix}</span>
  }

  return (
    <div className="bg-white font-sans text-gray-800">

      {/* HERO */}
      <Hero
        title="ROOTED IN PURPOSE. GROWING WITH VISION. CULTIVATING VALUE. REFINING EXCELLENCE."
        subtitle="Building an integrated agro-industrial ecosystem in Nigeria and West Africa through sustainable farming, modern processing, and value-driven innovation."
        ctaText="Explore Our Services"
        ctaLink="/services"
        className="bg-[url('/image/oil-palm1.webp')] bg-fixed bg-cover bg-center h-screen flex items-center justify-center text-white"
      />

      {/* COMPANY WRITE-UP */}
      <section className="py-24 bg-green-50">
        <div className="container mx-auto grid md:grid-cols-2 gap-14 items-center px-6">

          <div>
            <h2 className="text-4xl md:text-5xl font-bold text-green-800 mb-6 leading-tight">
              Building More Than a Farm, Building the Future
            </h2>

            <p className="text-gray-700 mb-5 leading-relaxed text-lg">
              In the fertile soils of Nsit Atai, Akwa Ibom State, a bold vision was born,
              to create not merely a farm, but a fully integrated agro-industrial institution
              capable of delivering sustainable prosperity, food security, and long-term economic value.
            </p>

            <p className="text-gray-700 mb-5 leading-relaxed text-lg">
              EMGO Farms and Integrated Services Limited began with 3 hectares of land,
              but our ambition stretches far beyond boundaries. Our strategic objective
              is to cultivate over 10,000 high-yielding oil palm trees, establish a modern
              palm oil and palm kernel oil refining plant, and build a complete
              end-to-end agricultural value chain.
            </p>

            <p className="text-gray-700 mb-5 leading-relaxed text-lg">
              Beyond oil palm, we are expanding into cassava cultivation for industrial starch production,
              ginger and high-value cash crops, and sustainable animal husbandry —
              ensuring diversified income streams and circular agricultural practices.
            </p>

            <p className="text-green-800 font-semibold text-lg italic mb-8">
              We are not just planting trees — We are planting legacy. <br />
              We are not just refining oil — We are refining standards. <br />
              We are not just building a company — We are building a future.
            </p>

            <a
              href="/about"
              className="px-8 py-4 bg-orange-500 hover:bg-orange-600 text-white rounded-lg font-semibold transition shadow-lg"
            >
              Learn More About Us →
            </a>
          </div>

          <div className="grid grid-cols-2 gap-6">
            <img src="/image/oil-palm10.jpg" alt="Oil Palm Plantation" className="rounded-2xl shadow-xl" />
            <img src="/image/products.jpg" alt="Palm Oil Processing" className="rounded-2xl shadow-xl" />
          </div>

        </div>
      </section>

      {/* SERVICES */}
      <section className="py-24 bg-white">
        <div className="container mx-auto text-center mb-14 px-6">
          <h2 className="text-4xl font-bold text-green-800 mb-4">Our Integrated Services</h2>
          <p className="text-gray-600 max-w-3xl mx-auto text-lg">
            From cultivation to refining, EMGO Farms controls the entire agricultural value chain
            to ensure quality consistency, operational efficiency, and sustainable impact.
          </p>
        </div>

        <div className="container mx-auto grid md:grid-cols-3 gap-10 px-6">
          {services.map(service => (
            <div key={service._id} className="rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition bg-white">
              <img src={service.img} alt={service.title} className="w-full h-56 object-cover" />
              <div className="p-8 text-center">
                <h3 className="text-2xl font-semibold text-green-800 mb-4">{service.title}</h3>
                <p className="text-gray-600">{service.description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* WHY CHOOSE US */}
      <section className="py-24 bg-green-100">
        <div className="container mx-auto text-center px-6">
          <h2 className="text-4xl font-bold text-green-800 mb-14">
            Our Integrated Approach
          </h2>

          <div className="grid md:grid-cols-3 gap-10">
            {[
              "End-to-End Value Chain Control",
              "Sustainable Farming Practices",
              "Modern Processing Technology",
              "Community-Centered Growth",
              "Innovation & Operational Efficiency",
              "Transparent & Reliable Partnerships"
            ].map((item, index) => (
              <div key={index} className="p-8 bg-white rounded-2xl shadow-md hover:shadow-xl transition">
                <h3 className="text-lg font-semibold text-green-800">{item}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* STRATEGIC STATS */}
      <section className="py-24 bg-green-800 text-white text-center">
        <div className="container mx-auto grid md:grid-cols-4 gap-10 px-6">
          {[
            { target: 10000, label: "Target Oil Palm Trees", suffix: "+" },
            { target: 5, label: "Hectares Developed", suffix: "+" },
            { target: 3, label: "Integrated Agro Segments", suffix: "+" },
            { target: 100, label: "Sustainability Commitment", suffix: "%" },
          ].map((stat, index) => (
            <div key={index}>
              <h3 className="text-4xl font-bold text-orange-400">
                <Counter end={stat.target} suffix={stat.suffix} />
              </h3>
              <p className="mt-3">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="py-20 bg-orange-500 text-white text-center">
        <h2 className="text-4xl font-bold mb-6">
          Partner With EMGO Farms
        </h2>
        <p className="mb-8 max-w-2xl mx-auto text-lg">
          Join us in building a sustainable agro-industrial future through innovation,
          integration, and responsible agricultural practices.
        </p>
        <a
          href="/contact"
          className="px-10 py-4 bg-green-900 hover:bg-green-950 rounded-lg font-semibold transition"
        >
          Contact Us Today →
        </a>
      </section>

    </div>
  )
}
