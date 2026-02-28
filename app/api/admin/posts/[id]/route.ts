// app/api/admin/posts/[id]/route.ts
import { NextRequest, NextResponse } from "next/server"
import clientPromise from "@/lib/mongodb"

export async function PUT(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params
  const client = await clientPromise
  const db = client.db("emgo-farms")

  try {
    const body = await request.json()
    await db.collection("posts").updateOne(
      { _id: new ObjectId(id) },
      { $set: body }
    )
    return NextResponse.json({ success: true })
  } catch (err: unknown) {
    if (err instanceof Error) {
      return NextResponse.json({ error: err.message }, { status: 500 })
    }
    return NextResponse.json({ error: "Unknown error" }, { status: 500 })
  }
}