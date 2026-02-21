import { NextResponse } from "next/server"
import { sanity } from "@/lib/sanity"

export async function POST(req: Request) {
  try {
    const { email } = await req.json()

    if (!email) {
      return NextResponse.json({ error: "Email required" }, { status: 400 })
    }

    await sanity.create({
      _type: "newsletter",
      email,
      subscribedAt: new Date().toISOString(),
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json({ error: "Failed to subscribe" }, { status: 500 })
  }
}