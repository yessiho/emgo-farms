export async function POST(request: Request) {
  const body = await request.json()
  console.log("New post:", body)

  return new Response(
    JSON.stringify({ message: "Post created successfully" }),
    { status: 201 }
  )
}