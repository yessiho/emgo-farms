'use client'

import { useEffect, useState, useRef } from 'react'
import { Hero } from '../components/Hero'
import { ServiceCard } from '../components/ServiceCard'

export default function Home() {
  const [heroData, setHeroData] = useState<any>(null)
  const [services, setServices] = useState<any[]>([
    {
      _id: 1,
      title: "Oil Palm Farming",
      description: "Sustainable oil palm plantations with skilled workforce and eco-friendly methods.",
      icon: "",
      img: "/image/oil-palm.webp"
    },
    {
      _id: 2,
      title: "Palm Oil Production",
      description: "High-quality palm oil produced with modern machinery and safety standards.",
      icon: "",
      img: "/image/oil-palm3.webp"
    },
    {
      _id: 3,
      title: "Palm Kernel Oil Refining",
      description: "Advanced refining techniques to deliver premium palm kernel oil products.",
      icon: "",
      img: "/image/oil-palm8.avif"
    }
  ])

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

  // Reusable Counter Component
function Counter({ end, duration = 2, suffix = "" }: { end: number, duration?: number, suffix?: string }) {
  const [count, setCount] = useState(0);
  const [hasStarted, setHasStarted] = useState(false);
  const elementRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setHasStarted(true);
      },
      { threshold: 0.1 }
    );

    if (elementRef.current) observer.observe(elementRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!hasStarted) return;

    let startTime: number | null = null;
    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime;
      const progress = Math.min((currentTime - startTime) / (duration * 1000), 1);
      const easedProgress = 1 - Math.pow(1 - progress, 3); // Cubic ease-out
      
      setCount(Math.floor(easedProgress * end));

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  }, [hasStarted, end, duration]);

  return <span ref={elementRef}>{count.toLocaleString()}{suffix}</span>;
}

  return (
    <div className="bg-white font-sans text-gray-800">

      {/* HERO */}
      <Hero 
        title={heroData.title}
        subtitle={heroData.subtitle}
        ctaText={heroData.ctaText}
        ctaLink={heroData.ctaLink}
        className="bg-[url('/image/oil-palm.webp')] bg-fixed bg-cover bg-center h-screen flex items-center justify-center text-white"
      />

      {/* SERVICES */}
      <section id="services" className="py-20 bg-white">
        <div className="container mx-auto text-center mb-12 px-4">
          <h2 className="text-4xl font-bold text-green-800 mb-4">
            Our Services
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            EMGO Farms specializes in oil palm farming, palm oil production, and palm kernel oil refining.
          </p>
        </div>

        <div className="container mx-auto grid md:grid-cols-3 gap-8 px-6">
          {services.map(service => (
            <div key={service._id} className="rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition">
              <img src={service.img} alt={service.title} className="w-full h-48 object-cover"/>
              <div className="p-6 text-center">
                <h3 className="text-2xl font-semibold text-green-800 mb-2">{service.title}</h3>
                <p className="text-gray-700 mb-4">{service.description}</p>
                <span className="text-4xl">{service.icon}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Service Gallery */}
        <div className="container mx-auto mt-16 grid grid-cols-2 md:grid-cols-4 gap-4 px-6">
          {['oil-palm.webp', 'oil-palm1.webp', 'oil-palm2.webp', 'oil-palm6.webp'].map((img, idx) => (
            <img
              key={idx}
              src={`image/${img}`}
              alt={`Farm ${idx + 1}`}
              className="rounded-lg shadow-lg object-cover h-48 w-full hover:scale-105 transition-transform"
            />
          ))}
        </div>
      </section>

      {/* ABOUT EMGO FARMS */}
      <section className="py-20 bg-green-50">
        <div className="container mx-auto grid md:grid-cols-2 gap-12 items-center px-6">
          <div>
            <h2 className="text-4xl font-bold text-green-800 mb-6">
              About EMGO Farms
            </h2>
            <p className="text-gray-700 mb-6">
              EMGO Farms is committed to sustainable oil palm farming, high-quality palm oil production,
              and modern palm kernel oil refining. We empower communities while ensuring eco-friendly practices.
            </p>
            <a
              href="/about"
              className="px-6 py-3 bg-orange-500 hover:bg-orange-600 text-white rounded-lg font-semibold transition"
            >
              Learn More
            </a>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <img src="/image/oil-palm2.webp" alt="Oil Palm Farm" className="rounded-xl shadow-lg" />
            <img src="/image/oil-palm.webp" alt="Palm Oil Production" className="rounded-xl shadow-lg" />
          </div>
        </div>
      </section>

      {/* WHY CHOOSE US */}
      <section className="py-20 bg-white">
        <div className="container mx-auto text-center px-6">
          <h2 className="text-4xl font-bold text-green-800 mb-12">
            Why Choose Us
          </h2>
          <div className="grid md:grid-cols-4 gap-8">
            {["100% Organic", "Sustainable Practices", "Modern Technology", "Trusted Expertise"].map((item, index) => (
              <div key={index} className="p-6 border border-green-200 rounded-xl hover:shadow-lg transition">
                <h3 className="text-lg font-semibold text-green-800">{item}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* STATS */}
<section className="py-20 bg-green-800 text-white text-center">
  <div className="container mx-auto grid md:grid-cols-4 gap-8 px-6">
    {[
      { target: 10, label: "Years Experience", suffix: "+" },
      { target: 500, label: "Happy Clients", suffix: "+" },
      { target: 1000, label: "Acres Managed", suffix: "+" },
      { target: 100, label: "Organic Commitment", suffix: "%" },
    ].map((stat, index) => (
      <div key={index}>
        <h3 className="text-4xl font-bold text-orange-400">
          <Counter end={stat.target} suffix={stat.suffix} />
        </h3>
        <p className="mt-2">{stat.label}</p>
      </div>
    ))}
  </div>
</section>

      {/* TESTIMONIALS */}
      <section className="py-20 bg-white">
        <div className="container mx-auto text-center px-6">
          <h2 className="text-4xl font-bold text-green-800 mb-12">
            What Our Clients Say
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              "EMGO Farms transformed our agricultural output!",
              "Reliable and professional palm oil consultants.",
              "High-quality organic palm products every time."
            ].map((testimonial, index) => (
              <div key={index} className="p-6 bg-green-50 rounded-xl shadow">
                <p className="italic text-gray-700">"{testimonial}"</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* NEWSLETTER */}
      <section className="py-16 bg-orange-500 text-white text-center">
        <h2 className="text-3xl font-bold mb-4">Subscribe to Our Newsletter</h2>
        <p className="mb-6">Stay updated with the latest oil palm farming insights and palm oil products.</p>
        <div className="flex justify-center gap-4 flex-wrap">
          <input type="email" placeholder="Enter your email" className="px-4 py-3 rounded-lg text-black w-72" />
          <button className="px-6 py-3 bg-green-800 hover:bg-green-900 rounded-lg font-semibold transition">
            Subscribe
          </button>
        </div>
      </section>

    </div>
  )
}
