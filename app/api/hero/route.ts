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
export async function POST(request: Request) {
  const body = await request.json()
  console.log("New post data:", body)

  return new Response(
    JSON.stringify({ message: "Post created successfully" }),
    { status: 201 }
  )
}