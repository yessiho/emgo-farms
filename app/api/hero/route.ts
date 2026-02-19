import { NextResponse } from 'next/server'

export async function GET() {
  return NextResponse.json({
    title: "Welcome to EMGO Farms",
    subtitle: "Sustainable & Organic Farming Solutions",
    ctaText: "Explore Our Farms",
    ctaLink: "#services",
    ctaTitle: "Grow Your Farm with Us",
    ctaSubtitle: "Join EMGO Farms today and experience professional guidance, sustainable solutions, and organic produce like never before."
  })
}
