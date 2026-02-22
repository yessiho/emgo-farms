export async function POST(request: Request) {
  const body = await request.json()

  console.log("Contact form data:", body)

  return new Response(
    JSON.stringify({ message: "Message received successfully" }),
    { status: 200 }
  )
}