import { NextResponse } from "next/server"
import clientPromise from "@/lib/mongodb"
import { ObjectId } from "mongodb"

export async function PUT(req: Request, { params }: { params: { id: string } }) {
  try {
    const body = await req.json()
    const { title, category, content, excerpt, status } = body
    const client = await clientPromise
    const db = client.db("emgo-farms")
    await db.collection("posts").updateOne(
      { _id: new ObjectId(params.id) },
      {
        $set: {
          title,
          category,
          content:   content  ?? "",
          excerpt:   excerpt  ?? "",
          status:    status   ?? "draft",
          updatedAt: new Date(),
        },
      }
    )
    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json({ error: "Failed to update post" }, { status: 500 })
  }
}

export async function DELETE(req: Request, { params }: { params: { id: string } }) {
  try {
    const client = await clientPromise
    const db = client.db("emgo-farms")
    await db.collection("posts").deleteOne({ _id: new ObjectId(params.id) })
    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json({ error: "Failed to delete post" }, { status: 500 })
  }
}