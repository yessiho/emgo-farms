// app/api/admin/test/route.ts
import clientPromise from "@/lib/mongodb"

export async function GET() {
  try {
    const client = await clientPromise
    const db = client.db("emgo-farms")

    await db.command({ ping: 1 })

    return new Response(JSON.stringify({
      success: true,
      message: "MongoDB Connected Successfully ✅"
    }), { status: 200, headers: { "Content-Type": "application/json" } })
    
  } catch (err) {
    console.error("MongoDB Test Error:", err)
    return new Response(JSON.stringify({
      success: false,
      message: "MongoDB Connection Failed ❌"
    }), { status: 500, headers: { "Content-Type": "application/json" } })
  }
}