import { MongoClient } from "mongodb"

const uri = process.env.MONGODB_URI

console.log("ENV CHECK:", uri) // 👈 add this

if (!uri) {
  throw new Error("Please add MONGODB_URI to .env.local")
}

const client = new MongoClient(uri)

let clientPromise: Promise<MongoClient>

if (process.env.NODE_ENV === "development") {
  if (!(global as any)._mongoClientPromise) {
    (global as any)._mongoClientPromise = client.connect()
  }
  clientPromise = (global as any)._mongoClientPromise
} else {
  clientPromise = client.connect()
}

export default clientPromise