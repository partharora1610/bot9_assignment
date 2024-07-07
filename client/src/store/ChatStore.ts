import { getAIResponse } from "@/lib/actions/chat.action"
import { create } from "zustand"

type Message = {
  id: string
  content: String
  sender: "user" | "model"
  timestamp: Date
}

type Store = {
  messages: Message[]
  loading: boolean
  sending: boolean
  sendMessage: (message: string, conversationId: string) => Promise<void>
  fetchAllMessages: () => Promise<void>
  addUserMessage: (message: string) => void
}

const chatStore = create<Store>((set) => ({
  messages: [],
  loading: false,
  sending: false,
  sendMessage: async (message, id) => {
    set({ sending: true })
    try {
      const newMessage = await getAIResponse({
        message,
        conversationId: id,
      })

      console.log({ newMessage })

      set((state) => ({
        messages: [
          ...state.messages,
          {
            content: newMessage.message,
            id: Math.random().toString(),
            sender: "model",
            timestamp: new Date(),
          },
        ],
        sending: false,
      }))
    } catch (error) {
      console.error("Failed to send message", error)
      set({ sending: false })
    }
  },
  addUserMessage: (message) => {
    set((state) => ({
      messages: [
        ...state.messages,
        { content: message, id: "3", sender: "user", timestamp: new Date() },
      ],
    }))
  },
  fetchAllMessages: async () => {
    set({ loading: true })
    try {
    } catch (error) {
      set({ loading: false })
    }
  },
}))

export default chatStore
