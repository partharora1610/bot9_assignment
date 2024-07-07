import { SessionStrategy } from "next-auth"
import GoogleProvider from "next-auth/providers/google"
import prisma from "@/db/db"

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID!,
      clientSecret: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_SECRET!,
      allowDangerousEmailAccountLinking: true,
    }),
  ],
  session: { strategy: "jwt" as SessionStrategy },
  pages: {
    signIn: "/auth",
  },

  callbacks: {
    async jwt({ token }: any) {
      return token
    },

    async session({ session, token }: { session: any; token: any }) {
      if (token) {
        session.accessToken = token.accessToken
        session.user.id = token.sub
      }

      const data = await prisma.user.findUnique({
        where: {
          email: session.user.email,
        },
      })

      if (data) {
        session.user = { ...session.user, userId: data.id }
      } else {
        const user = await prisma.user.create({
          data: {
            email: session.user.email,
            name: session.user.name,
            sub: token.sub,
          },
        })
        session.user = { ...session.user, userId: user.id }
      }

      return session
    },
  },
}
