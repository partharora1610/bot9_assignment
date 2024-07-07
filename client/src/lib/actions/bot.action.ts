"use server"

import prisma from "@/db/db"
import { getServerSession } from "next-auth"
import { authOptions } from "../auth"

interface createBot {
  companyName: string
  website: string
  name: string
}

export const createBot = async ({ companyName, website, name }: createBot) => {
  console.log({ companyName, website, name })
  const session = await getServerSession(authOptions)
  const userId = session?.user?.id
  console.log({ userId })

  const user = await prisma.user.findUnique({
    where: {
      sub: userId,
    },
  })

  try {
    const bot = await prisma.bot.create({
      data: {
        companyName,
        website,
        name,
        user: {
          connect: { id: user?.id },
        },
      },
    })
    console.log({ bot })
  } catch (error) {
    console.log({ error })
    return false
  }

  return true
}

interface updateBotStyles {
  botId: number
  styles: any
}

export const updateBotStyles = async ({ botId, styles }: updateBotStyles) => {
  return true
}

export const getBot = async () => {
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

  if (user?.bot) {
    return true
  }

  return false
}
