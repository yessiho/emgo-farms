// scripts/create-admin.ts
import clientPromise from "../lib/mongodb"
import bcrypt from "bcryptjs"

async function createAdmin() {
  const client = await clientPromise
  const db = client.db("emgo-farms")

  const name = "Peter"
  const email = "admin@emgo.com"
  const password = "YourStrongPassword123" // change before deploy

  try {
    const hashedPassword = await bcrypt.hash(password, 10)

    const existing = await db.collection("users").findOne({ email })
    if (existing) {
      console.log("Admin already exists:", email)
      return
    }

    const result = await db.collection("users").insertOne({
      name,
      email,
      password: hashedPassword,
      role: "admin",
      createdAt: new Date(),
    })

    console.log("Admin created successfully ✅", result.insertedId)
  } catch (err: unknown) {
    if (err instanceof Error) {
      console.log("ERROR:", err.message)
    } else {
      console.log("Unknown error:", err)
    }
  } finally {
    await client.close()
  }
}

createAdmin()