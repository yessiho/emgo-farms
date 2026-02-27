import clientPromise from "@/lib/mongodb"
import { NextResponse } from "next/server"

export async function GET() {
  try {
    const client = await clientPromise
    const db = client.db("emgo-farms")
    await db.command({ ping: 1 })

    return NextResponse.json({
      success: true,
      message: "MongoDB Connected Successfully ✅",
    })
  } catch (err) {
    console.error("MongoDB Error:", err)
    return NextResponse.json({
      success: false,
      message: "MongoDB Connection Failed ❌",
    }, { status: 500 })
  }
}