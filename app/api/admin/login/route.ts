// app/api/admin/login/route.ts
// POST /api/admin/login
// Validates username + password against MongoDB "admins" collection.
// Uses bcrypt for password comparison.
// Sets a simple session cookie on success.

import { NextResponse } from "next/server"
import clientPromise from "@/lib/mongodb"
import bcrypt from "bcryptjs"
import { cookies } from "next/headers"

export async function POST(req: Request) {
  try {
    const { username, password } = await req.json()

    if (!username || !password) {
      return NextResponse.json(
        { error: "Username and password are required." },
        { status: 400 }
      )
    }

    const client = await clientPromise
    const db     = client.db("emgo-farms")

    // Find admin user in MongoDB
    const admin = await db.collection("admins").findOne({ username })

    if (!admin) {
      return NextResponse.json(
        { error: "Invalid username or password." },
        { status: 401 }
      )
    }

    // Compare password with hashed password in DB
    const passwordMatch = await bcrypt.compare(password, admin.password)

    if (!passwordMatch) {
      return NextResponse.json(
        { error: "Invalid username or password." },
        { status: 401 }
      )
    }

    // Set a simple session cookie (HttpOnly, 8 hours)
    const cookieStore = await cookies()
    cookieStore.set("admin_session", admin._id.toString(), {
      httpOnly: true,
      secure:   process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge:   60 * 60 * 8, // 8 hours
      path:     "/",
    })

    return NextResponse.json({ success: true })

  } catch (error) {
    console.error("Login error:", error)
    return NextResponse.json(
      { error: "Server error. Please try again." },
      { status: 500 }
    )
  }
}

export async function DELETE() {
  // Logout — clear the session cookie
  const cookieStore = await cookies()
  cookieStore.delete("admin_session")
  return NextResponse.json({ success: true })
}