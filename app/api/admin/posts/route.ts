import { NextResponse } from "next/server"
import clientPromise from "@/lib/mongodb"

export async function GET() {
  try {
    const client = await clientPromise
    const db = client.db("emgo-farms")
    const posts = await db.collection("posts").find({}).sort({ createdAt: -1 }).toArray()
    const serialised = posts.map((p) => ({ ...p, _id: p._id.toString() }))
    return NextResponse.json(serialised)
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch posts" }, { status: 500 })
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { title, category, content, excerpt, status } = body
    if (!title || !category) {
      return NextResponse.json({ error: "Title and category are required" }, { status: 400 })
    }
    const client = await clientPromise
    const db = client.db("emgo-farms")
    const result = await db.collection("posts").insertOne({
      title,
      category,
      content:   content  ?? "",
      excerpt:   excerpt  ?? "",
      status:    status   ?? "draft",
      createdAt: new Date(),
      updatedAt: new Date(),
    })
    return NextResponse.json({ success: true, _id: result.insertedId.toString() })
  } catch (error) {
    return NextResponse.json({ error: "Failed to create post" }, { status: 500 })
  }
}