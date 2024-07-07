import React from "react"

type Props = {
  params: {
    id: string
  }
}

const Page = async ({ params }: Props) => {
  const id = params.id as string
  return (
    <div className="flex flex-col h-screen">
      <div className="flex-grow bg-[#f7f9fc]">
        <ChatContainer chatId={id} />
      </div>
    </div>
  )
}

const messgaes = [
  {
    id: "1",
    message: "Hello",
    sender: "user",
  },
  {
    id: "2",
    message: "Hi",
    sender: "bot",
  },
  {
    id: "3",
    message: "How are you?",
    sender: "user",
  },
  {
    id: "4",
    message: "I'm good",
    sender: "bot",
  },
  {
    id: "5",
    message: "What's up?",
    sender: "user",
  },
  {
    id: "6",
    message: "Nothing much",
    sender: "bot",
  },
]

const ChatContainer = async ({ chatId }: { chatId: string }) => {
  return (
    <div>
      <div className="flex flex-col gap-6">
        {messgaes.map((message) => (
          <ChatItem
            key={message.id}
            message={message.message}
            sender={message.sender}
          />
        ))}
      </div>
    </div>
  )
}

const ChatItem = ({ message, sender }: { message: string; sender: string }) => {
  return (
    <div
      className={`
        
        ${
          sender === "bot"
            ? "bg-primary-600 text-white self-end"
            : "bg-primary-600 text-white self-start"
        }
        p-2 rounded-lg shadow-sm

    `}
    >
      <p>{message}</p>
    </div>
  )
}

export default Page
