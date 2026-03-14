// app/api/admin/cloudinary-sign/route.ts
// Generates a signed upload signature so browser can upload directly to Cloudinary
import { NextResponse } from "next/server"
import crypto from "crypto"

export async function POST(req: Request) {
  try {
    const { folder } = await req.json()

    const timestamp  = Math.round(Date.now() / 1000)
    const apiSecret  = process.env.CLOUDINARY_API_SECRET!
    const apiKey     = process.env.CLOUDINARY_API_KEY!
    const cloudName  = process.env.CLOUDINARY_CLOUD_NAME!

    if (!apiSecret || !apiKey || !cloudName) {
      return NextResponse.json({ error: "Cloudinary env vars missing" }, { status: 500 })
    }

    // Build signature string
    const params: Record<string, any> = {
      folder:    folder || "emgo-farms/gallery",
      timestamp,
    }

    // Sort params alphabetically and join as key=value pairs
    const signatureString = Object.keys(params)
      .sort()
      .map(k => `${k}=${params[k]}`)
      .join("&") + apiSecret

    const signature = crypto
      .createHash("sha256")
      .update(signatureString)
      .digest("hex")

    return NextResponse.json({
      signature,
      timestamp,
      apiKey,
      cloudName,
      folder: folder || "emgo-farms/gallery",
    })
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}