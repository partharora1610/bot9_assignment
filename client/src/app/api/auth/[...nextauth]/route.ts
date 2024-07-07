import { authOptions } from "@/lib/auth"
import NextAuth from "next-auth/next"

declare module "next-auth" {
  interface Session {
    user: {
      name: string
      email: string
      id: string
      userId: string
    }
  }
}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }
