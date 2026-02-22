import { NextResponse } from "next/server"
import { client } from "@/lib/sanity"

export async function POST(req: Request) {
  try {
    const body = await req.json()

    const result = await client.create({
      _type: "newsletter",
      email: body.email,
    })

    return NextResponse.json({ success: true, result })
  } catch (err) {
    return NextResponse.json({ success: false, error: err }, { status: 500 })
  }
}