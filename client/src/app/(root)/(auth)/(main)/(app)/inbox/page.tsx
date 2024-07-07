"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Calendar } from "lucide-react"
import React, { useEffect } from "react"
import { Checkbox } from "@/components/ui/checkbox"
import { getAllConversations } from "@/lib/actions/conversation.action"
import { useSession } from "next-auth/react"

const Page: React.FC = () => {
  const session = useSession()

  if (!session.data) return <div>Loading...</div>

  return (
    <div className="relative flex min-h-screen">
      <InboxNav />
      <main className="flex-1 ml-72 overflow-y-auto">
        <InboxSearch />
        <InboxContent userId={session.data.user.userId} />
      </main>
    </div>
  )
}

const InboxSearch: React.FC = () => {
  return (
    <div className="flex justify-between px-5 py-4 border-b">
      <div>
        <Input
          placeholder="Search you tickets"
          className="rounded-lg text-gray-400 px-3 base-regular border border-gray-400"
        />
      </div>
      <div>
        <Button className="border body-normal items-center flex gap-1 border-gray-300 shadow-sm  px-3 py-2 rounded">
          <Calendar size={18} />
          <span>Last 7 days</span>
        </Button>
      </div>
    </div>
  )
}

const InboxContent = ({ userId }: { userId: string }) => {
  const [selected, setSelected] = React.useState<string[]>([])
  const [loading, setLoading] = React.useState(false)
  const [conversations, setConversations] = React.useState<any[]>([])

  useEffect(() => {
    setLoading(true)
    const fetchConversations = async () => {
      const conversations = await getAllConversations({
        userId,
      })

      setConversations(conversations)
      console.log(conversations)
      setLoading(false)
    }

    fetchConversations()
  }, [])

  if (loading) return <div>Loading...</div>

  return (
    <div>
      {conversations.length === 0 && (
        <div className="text-center">No conversations found</div>
      )}

      <div className="flex flex-col gap-0">
        {conversations.map((conversation, index) => (
          <InboxItem
            key={index}
            selected={selected.includes(index.toString())}
            setSelected={(selected) => {}}
            clientName="John Doe"
            converstationTitle="Product Availability"
            date="2 days ago"
            status="urgent"
          />
        ))}
      </div>
    </div>
  )
}

interface InboxItemProps {
  selected: boolean
  setSelected: (selected: boolean) => void
  clientName: string
  converstationTitle: string
  date: string
  status: "urgent" | "moderate" | "low"
}

const InboxItem: React.FC<InboxItemProps> = ({
  selected,
  setSelected,
  clientName,
  converstationTitle,
  date,
  status,
}) => {
  return (
    <div className="px-4 py-3 w-full bg-blue-50/55 hover:bg-white hover:cursor-pointer">
      <div className="flex justify-between items-center">
        <div className="flex items-center justify-between gap-8">
          <Checkbox className="border border-gray-300 rounded bg-white" />
          <div>{clientName}</div>
          <div>{converstationTitle}</div>
        </div>

        <div className="flex items-center justify-between gap-4">
          <div>{status}</div>
          <div>{date}</div>
        </div>
      </div>
    </div>
  )
}

const InboxNav: React.FC = () => {
  return (
    <div className="w-72 h-full border px-4 py-6  absolute top-0 left-0">
      <div className="flex flex-col gap-6">
        <PrioritySelection />
        <TagSelection />
      </div>
    </div>
  )
}

const TagSelection: React.FC = () => {
  return (
    <div>
      <div className="body-medium mb-2">Tags</div>
      <div className="flex flex-col gap-3">
        {Array.from({ length: 4 }).map((_, index) => (
          <div
            key={index}
            className="flex justify-between text-black hover:text-primary-600 cursor-pointer body-regular"
          >
            <p>Product Availability</p>
            <p className="bg-gray-200 p-1 px-1.5 small-medium rounded">{7}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

interface PriorityButtonProps {
  variant: "urgent" | "moderate" | "low"
  setSelectedPriority: (priority: "urgent" | "moderate" | "low" | null) => void
}

const PriorityButton: React.FC<PriorityButtonProps> = ({
  variant,
  setSelectedPriority,
}) => {
  let backgroundColor = ""
  let textColor = ""

  switch (variant) {
    case "urgent":
      backgroundColor = "bg-[#ffe3e3]"
      textColor = "text-[#e03131]"
      break
    case "moderate":
      backgroundColor = "bg-[#fff9db]"
      textColor = "text-[#f08c00]"
      break
    case "low":
      backgroundColor = "bg-gray-100"
      textColor = "text-black"
      break
    default:
      backgroundColor = "bg-gray-200"
      textColor = "text-black"
      break
  }

  return (
    <div
      onClick={() => setSelectedPriority(variant)}
      className={`rounded-full cursor-pointer body-regular px-2.5 py-0.5 ${backgroundColor} ${textColor}`}
    >
      {variant}
    </div>
  )
}

const PrioritySelection: React.FC = () => {
  const [selectedPriority, setSelectedPriority] = React.useState<
    "urgent" | "moderate" | "low" | null
  >(null)

  return (
    <div>
      <div className="body-medium mb-2">Priority</div>
      <div className="flex justify-between">
        <PriorityButton
          setSelectedPriority={setSelectedPriority}
          variant="urgent"
        />

        <PriorityButton
          setSelectedPriority={setSelectedPriority}
          variant="moderate"
        />
        <PriorityButton
          setSelectedPriority={setSelectedPriority}
          variant="low"
        />
      </div>
    </div>
  )
}
export default Page
