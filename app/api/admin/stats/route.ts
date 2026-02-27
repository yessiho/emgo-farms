// app/api/admin/stats/route.ts
// ─────────────────────────────────────────────────────────────
// GET /api/admin/stats
// Returns dashboard counts + recent contacts/products/subscribers
// ─────────────────────────────────────────────────────────────

import { NextResponse } from "next/server"
import clientPromise from "@/lib/mongodb"

export async function GET() {
  try {
    const client = await clientPromise
    const db = client.db("emgo-farms") // your DB name

    // Run counts in parallel for better performance
    const [
      totalContacts,
      totalSubscribers,
      totalProducts,
    ] = await Promise.all([
      db.collection("contacts").countDocuments(),
      db.collection("newsletter").countDocuments(),
      db.collection("products").countDocuments(),
    ])

    // Recent contacts
    const recentContacts = await db
      .collection("contacts")
      .find({})
      .sort({ createdAt: -1 })
      .limit(5)
      .project({
        name: 1,
        email: 1,
        message: 1,
        service: 1,
        createdAt: 1,
      })
      .toArray()

    // Recent newsletter subscribers
    const recentSubscribers = await db
      .collection("newsletter")
      .find({})
      .sort({ createdAt: -1 })
      .limit(5)
      .project({
        email: 1,
        createdAt: 1,
      })
      .toArray()

    // Convert MongoDB ObjectId → string
    const serialize = (docs: any[]) =>
      docs.map((doc) => ({
        ...doc,
        _id: doc._id?.toString(),
      }))

    return NextResponse.json({
      totalPosts: 0, // If posts are in Sanity
      totalContacts,
      totalSubscribers,
      totalProducts,
      recentContacts: serialize(recentContacts),
      recentSubscribers: serialize(recentSubscribers),
      recentPosts: [],
    })

  } catch (error) {
    console.error("MongoDB stats error:", error)
    return NextResponse.json(
      { error: "Failed to fetch stats from database" },
      { status: 500 }
    )
  }
}