// lib/mongodb.ts
import { MongoClient } from "mongodb"

const uri = process.env.MONGODB_URI
if (!uri) throw new Error("Please add MONGODB_URI to .env.local or Vercel ENV")

let client: MongoClient
let clientPromise: Promise<MongoClient>

if (!globalThis._mongoClientPromise) {
  client = new MongoClient(uri, {
    serverSelectionTimeoutMS: 10000, // 10s timeout
  })
  globalThis._mongoClientPromise = client.connect()
}
clientPromise = globalThis._mongoClientPromise

export default clientPromise