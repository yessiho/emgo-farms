import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {},
      async authorize(credentials) {
        return { id: "1", name: "Admin" }
      }
    })
  ],
  secret: process.env.NEXTAUTH_SECRET
})

export { handler as GET, handler as POST }