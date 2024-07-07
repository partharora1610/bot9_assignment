"use server"
import prisma from "@/db/db"
import { getServerSession } from "next-auth"
import { authOptions } from "../auth"

export const createConversation = async (message: string) => {
  const session = await getServerSession(authOptions)
  const userId = session?.user?.id

  const user = await prisma.user.findUnique({
    where: {
      sub: userId,
    },
    include: {
      bot: true,
    },
  })

  if (!user)
    return {
      id: null,
    }

  if (!user.bot)
    return {
      id: null,
    }

  const conversation = await prisma.converstaion.create({
    data: {
      bot: {
        connect: {
          id: user.bot.id,
        },
      },
    },
  })

  return {
    id: conversation.id,
  }
}

export const getAllConversations = async ({ userId }: { userId: string }) => {
  console.log({ userId })

  const user = await prisma.user.findFirst({
    where: {
      id: userId,
    },
    include: {
      bot: true,
    },
  })
  console.log({ user })

  if (!user?.bot) return []

  const conversations = await prisma.converstaion.findMany({
    where: {
      botId: user.bot.id,
    },
  })

  return conversations
}
