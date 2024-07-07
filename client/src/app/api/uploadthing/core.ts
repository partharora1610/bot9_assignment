import { createUploadthing, type FileRouter } from "uploadthing/next"
import { UploadThingError } from "uploadthing/server"
import { PDFLoader } from "langchain/document_loaders/fs/pdf"
import { pinecone } from "@/lib/pinecone"
import { OpenAIEmbeddings } from "@langchain/openai"
import { PineconeStore } from "@langchain/pinecone"
import prisma from "@/db/db"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"

const f = createUploadthing()

export const ourFileRouter = {
  pdfUploader: f({ pdf: { maxFileSize: "1GB" } })
    .middleware(async ({ req }) => {
      try {
        const session = await getServerSession(authOptions)
        console.log("session", session)
        console.log(session.user.userId)

        if (!session) throw new UploadThingError("Unauthorized")

        const userId = session.user.userId

        const user = await prisma.user.findUnique({
          where: { id: userId },
          include: { bot: true },
        })

        if (!user) throw new Error("User not found")

        const bot = user.bot

        if (!bot) throw new Error("Bot not found")

        return { botId: bot.id }
      } catch (error) {
        throw new UploadThingError("Unauthorized")
      }
    })
    .onUploadComplete(async ({ metadata, file }) => {
      const { botId } = metadata

      if (!botId) throw new UploadThingError("Unauthorized")

      const dbFile = await prisma.trainingData.create({
        data: {
          key: file.key,
          botId,
          url: file.url,
          uploadStatus: "PROCESSING",
        },
      })

      try {
        const response = await fetch(file.url)

        const blob = await response.blob()

        const loader = new PDFLoader(blob)

        const docs = await loader.load()

        const pagesAmount = docs.length

        const pineconeIndex = pinecone.Index("bot9")

        const openaiEmbeddings = new OpenAIEmbeddings({
          openAIApiKey: process.env.OPENAI_API_KEY!,
        })

        // Creating documents in Pinecone Vector Store
        await PineconeStore.fromDocuments(docs, openaiEmbeddings, {
          pineconeIndex,
          namespace: dbFile.id,
        })

        await prisma.trainingData.update({
          where: {
            id: dbFile.id,
          },
          data: {
            uploadStatus: "DONE",
          },
        })
      } catch (error) {
        await prisma.trainingData.update({
          where: {
            id: dbFile.id,
          },
          data: {
            uploadStatus: "FAILED",
          },
        })

        console.error("Error indexing the file", error)
      }
    }),
} satisfies FileRouter

export type OurFileRouter = typeof ourFileRouter
