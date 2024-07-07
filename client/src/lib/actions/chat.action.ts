"use server"

import client from "@/openai/openai"
import { getBotTools } from "./tools.action"
import { ChatCompletionMessageParam } from "openai/resources/index.mjs"
import prisma from "@/db/db"
import axios from "axios"

interface GetAIResponseProps {
  message: string
  conversationId: string
}

export const getAIResponse = async ({
  message,
  conversationId,
}: GetAIResponseProps) => {
  const tools: any[] = await getBotTools()

  await prisma.message.create({
    data: {
      text: message,
      role: "USER",
      conversation: {
        connect: {
          id: conversationId,
        },
      },
    },
  })

  const assistantPrompts: ChatCompletionMessageParam[] = [
    {
      role: "system",
      content:
        "you are an intelligent assistant, please respond in the same tone of the user and act like a human",
    },
    {
      role: "system",
      content: "Dont call any external APIs directly, use the tools provided",
    },
    {
      role: "system",
      content:
        "dont use any tools provided with incomplete arguments, make sure to provide all the required arguments for the tools if not prompt the user again for the missing arguments",
    },
  ]

  const prevMessages = await prisma.message.findMany({
    where: {
      conversationId: conversationId,
    },
  })

  const transformedPreviousMessages: ChatCompletionMessageParam[] =
    prevMessages.map((message) => {
      return {
        role: message.role == "USER" ? "user" : "assistant",
        content: message.text,
      } as unknown as ChatCompletionMessageParam
    })

  const response = await client.chat.completions.create({
    model: "gpt-4",
    messages: [
      ...assistantPrompts,
      ...transformedPreviousMessages,
      { role: "user", content: message },
    ],
    tools: tools,
    tool_choice: "auto",
  })

  const aiResponse = response.choices[0]

  let data = {}

  if (aiResponse.finish_reason === "tool_calls") {
    for (const toolCall of aiResponse.message.tool_calls!) {
      if (toolCall.function.name === "fetchRooms") {
        const rooms = await fetchRooms()
        console.log({ rooms })
        data = { rooms }

        const newResponse = await client.chat.completions.create({
          model: "gpt-4",
          messages: [
            ...assistantPrompts,
            ...transformedPreviousMessages,
            { role: "user", content: message },
            { role: "assistant", content: JSON.stringify(data) },
          ],
          tools: tools,
          tool_choice: "none",
        })

        const newAiResponse = newResponse.choices[0]

        return { message: newAiResponse.message.content as string, data: data }
      }

      if (toolCall.function.name === "bookRoom") {
        const bookArguments = JSON.parse(
          toolCall.function.arguments
        ) as unknown as BookArguments
        console.log({ bookArguments })

        const bookingResponse = await bookRoom(bookArguments)

        data = { bookingResponse }

        const newResponse = await client.chat.completions.create({
          model: "gpt-4",
          messages: [
            ...assistantPrompts,
            ...transformedPreviousMessages,
            { role: "user", content: message },
            { role: "assistant", content: JSON.stringify(data) },
          ],
          tools: tools,
          tool_choice: "none",
        })

        const newAiResponse = newResponse.choices[0]
        return { message: newAiResponse.message.content as string, data: data }
      }
    }
  }

  return { message: aiResponse.message.content as string, data: data }
}

type Room = {
  id: number
  name: string
  description: string
  price: number
}

const fetchRooms = () =>
  axios
    .get<Room[]>("https://bot9assignement.deno.dev/rooms")
    .then((response) => response.data)

type BookingResponse = {
  bookingId: string
  message: string
  roomName: string
  fullName: string
  email: string
  nights: number
  totalPrice: number
}

type BookArguments = {
  roomId: number
  fullName: string
  email: string
  nights: number
}

const bookRoom = (bookArguments: BookArguments) =>
  axios
    .post<BookingResponse>("https://bot9assignement.deno.dev/book", {
      ...bookArguments,
    })
    .then((response) => response.data)
