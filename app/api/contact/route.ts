// app/api/contact/route.ts
// ─────────────────────────────────────────────────────────────
// POST /api/contact
// Saves contact form submissions to MongoDB "contacts" collection.
// ─────────────────────────────────────────────────────────────

import { NextResponse } from "next/server"
import clientPromise from "@/lib/mongodb"

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { name, email, phone, service, message } = body

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Name, email, and message are required." },
        { status: 400 }
      )
    }

    const client = await clientPromise
    const db = client.db("emgo-farms")

    await db.collection("contacts").insertOne({
      name,
      email,
      phone:     phone   ?? "",
      service:   service ?? "",
      message,
      createdAt: new Date(),
      read:      false,   // track whether admin has seen it
    })

    return NextResponse.json({ success: true })

  } catch (error) {
    console.error("Contact form error:", error)
    return NextResponse.json(
      { error: "Failed to save message. Please try again." },
      { status: 500 }
    )
  }
}