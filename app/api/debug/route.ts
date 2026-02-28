import { NextResponse } from "next/server"
import { MongoClient } from "mongodb"

export async function GET() {
  const uri = process.env.MONGODB_URI
  if (!uri) return NextResponse.json({ error: "No MONGODB_URI found" })

  try {
    const client = new MongoClient(uri, { serverSelectionTimeoutMS: 8000 })
    await client.connect()
    const db = client.db("emgo-farms")
    const collections = await db.listCollections().toArray()
    await client.close()
    return NextResponse.json({ status: "connected", collections: collections.map(c => c.name) })
  } catch (err: any) {
    return NextResponse.json({ status: "failed", error: err.message })
  }
}