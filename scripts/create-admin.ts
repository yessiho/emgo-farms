const { MongoClient } = require("mongodb")
const bcrypt = require("bcryptjs")
require("dotenv").config({ path: ".env.local" })

const ADMIN_USERNAME = "yessihopeterongbem53_db_user"
const ADMIN_PASSWORD = "Emgo12345"
const ADMIN_NAME     = "Emmanuel Obasi"

async function createAdmin() {
  const uri = process.env.MONGODB_URI
  if (!uri) { console.log("ERROR: MONGODB_URI not found"); process.exit(1) }

  console.log("Connecting to MongoDB...")
  const client = new MongoClient(uri)

  try {
    await client.connect()
    console.log("Connected!")

    const db = client.db("emgo-farms")
    const existing = await db.collection("admins").findOne({ username: ADMIN_USERNAME })
    if (existing) { console.log("Admin already exists!"); return }

    const hash = await bcrypt.hash(ADMIN_PASSWORD, 12)
    await db.collection("admins").insertOne({
      username:  ADMIN_USERNAME,
      password:  hash,
      name:      ADMIN_NAME,
      role:      "super_admin",
      createdAt: new Date(),
    })

    console.log("SUCCESS! Admin created!")
    console.log("Username: " + ADMIN_USERNAME)
    console.log("Password: " + ADMIN_PASSWORD)

  } catch (err) {
    console.log("ERROR:", err.message)
  } finally {
    await client.close()
  }
}

createAdmin()