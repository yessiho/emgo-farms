import { NextResponse } from 'next/server'
import { connectDB } from '../../../lib/db'
import Product from '../../../models/Product'

export async function GET() {
  try {
    await connectDB()

    const services = await Product.find({ type: 'service' })
    return NextResponse.json(services)
  } catch (error) {
    console.error(error)
    return NextResponse.json(
      { message: 'Error fetching services' },
      { status: 500 }
    )
  }
}
