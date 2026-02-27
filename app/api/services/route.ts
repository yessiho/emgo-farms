import clientPromise from '../../../lib/mongodb'
import Product from '../../../models/Product'
import { NextResponse } from 'next/server'

export async function GET() {
  try {
    const client = await clientPromise
    const db = client.db("emgo-farms")

    const products = await db.collection("products").find({}).toArray()

    return NextResponse.json(products)
  } catch (err) {
    console.error("MongoDB Error:", err)
    return NextResponse.json({ error: "Failed to fetch products" }, { status: 500 })
  }
}