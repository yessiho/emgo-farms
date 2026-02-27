// app/api/newsletter/route.ts
// ─────────────────────────────────────────────────────────────
// POST /api/newsletter
// Saves newsletter subscriptions to MongoDB "newsletter" collection.
// Prevents duplicate emails.
// ─────────────────────────────────────────────────────────────

import { NextResponse } from "next/server"
import clientPromise from "@/lib/mongodb"

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { email } = body

    if (!email || !email.includes("@")) {
      return NextResponse.json(
        { error: "A valid email address is required." },
        { status: 400 }
      )
    }

    const client = await clientPromise
    const db = client.db("emgo-farms")

    // Check for duplicate
    const existing = await db.collection("newsletter").findOne({ email })
    if (existing) {
      return NextResponse.json(
        { error: "This email is already subscribed." },
        { status: 409 }
      )
    }

    await db.collection("newsletter").insertOne({
      email,
      createdAt: new Date(),
    })

    return NextResponse.json({ success: true })

  } catch (error) {
    console.error("Newsletter error:", error)
    return NextResponse.json(
      { error: "Failed to subscribe. Please try again." },
      { status: 500 }
    )
  }
}