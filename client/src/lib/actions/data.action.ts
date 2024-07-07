"use server"

import { getServerSession } from "next-auth"
import { authOptions } from "../auth"
import prisma from "@/db/db"

interface updateTrainingData {
  botId: number
  trainingData: string
}

export const updateTrainingData = async ({
  botId,
  trainingData,
}: updateTrainingData) => {
  return true
}

export const getTraingData = async () => {
  const session = await getServerSession(authOptions)
  const userId = session?.user?.id
  console.log({ userId })

  const user = await prisma.user.findUnique({
    where: {
      sub: userId,
    },
    include: {
      bot: {
        include: {
          trainingData: {
            select: {
              id: true,
              key: true,
              url: true,
              uploadStatus: true,
            },
          },
        },
      },
    },
  })

  console.log({ user })

  if (!user) return []
  if (!user.bot) return []

  return user && user.bot ? user.bot.trainingData : []
}
