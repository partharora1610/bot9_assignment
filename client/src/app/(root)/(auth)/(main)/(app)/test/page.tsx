"use client"

import { createConversation } from "@/lib/actions/conversation.action"
import chatStore from "@/store/ChatStore"
import React from "react"

const Page = () => {
  return (
    <div className="min-h-screen flex justify-center bg-gray-100">
      <ChatBot />
    </div>
  )
}

const ChatBot: React.FC = () => {
  const { messages, sendMessage, sending, loading, addUserMessage } =
    chatStore()
  const [conversationId, setConversationId] = React.useState<string | null>(
    null
  )
  const [message, setMessage] = React.useState("")

  const handleSendMessage = async () => {
    if (!message) return

    addUserMessage(message)

    if (conversationId !== null) {
      await sendMessage(message, conversationId)
      setMessage("")
      return
    }

    const { id } = await createConversation(message)

    if (!id) return console.error("Failed to create conversation")

    await sendMessage(message, id)
    setConversationId(id)

    setMessage("")
  }

  return (
    <div className="flex justify-center mt-28">
      {conversationId}
      <div className="w-[500px] h-[800px] bg-white shadow-lg rounded-lg flex flex-col">
        <div className="bg-blue-500 text-white p-4 rounded-t-lg">
          <h1 className="text-lg">parthAI</h1>
          <p className="text-sm">replies instantly...</p>
        </div>
        <div className="flex-1 p-4 overflow-y-auto">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`${
                message.sender === "user"
                  ? "bg-blue-500/30 text-black self-end"
                  : "bg-gray-200 text-gray-800"
              } p-2 rounded-lg max-w-[80%] mb-2`}
            >
              <p>{message.content}</p>
              <span className="text-xs text-gray-500">
                {JSON.stringify(message.timestamp)}
              </span>
            </div>
          ))}
        </div>
        <div className="p-4 border-t">
          <input
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") handleSendMessage()
            }}
            type="text"
            className="w-full p-2 border rounded"
            placeholder="Start a new conversation here..."
          />
        </div>
      </div>
    </div>
  )
}

export default Page
