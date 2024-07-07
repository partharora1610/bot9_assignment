"use client"

import CompanyForm from "@/components/forms/CompanyForm"
import { getBot } from "@/lib/actions/bot.action"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import React, { useEffect } from "react"

const Page = () => {
  const session = useSession()
  const router = useRouter()
  const [loading, setLoading] = React.useState(true)
  const [error, setError] = React.useState(false)
  const [bot, setBot] = React.useState(false)

  useEffect(() => {
    const fetchBot = async () => {
      const bot = await getBot()
      console.log(bot)
      if (bot) {
        setBot(true)
      } else {
        setBot(false)
      }
      setLoading(false)
    }

    fetchBot()
  }, [])

  if (loading) return <div>Loading...</div>

  if (bot) {
    router.push("/app")
  }

  return (
    <div className="flex h-screen">
      <div className="flex-1 p-10 bg-gray-100">
        <CompanyForm />
      </div>
      <div className="flex-1 p-10 bg-white flex justify-center items-center">
        <Chat />
      </div>
    </div>
  )
}

const Chat = () => {
  return (
    <div className="border border-gray-300 p-4 rounded-lg">
      <div className="mb-4">
        <strong>George Harper</strong>
        <span className="text-gray-500 ml-2">online</span>
      </div>
      <div className="mb-4">
        <div className="bg-gray-200 p-4 rounded-lg">
          Hi there! How can I help you? 😊
        </div>
        <small className="text-gray-500">02:52 PM</small>
      </div>
      <div className="mb-4">
        <div className="bg-black text-white p-4 rounded-lg">
          Hi there! I'm wondering about your refund policy for online orders.
          Can you help me?
        </div>
        <small className="text-gray-500">02:52 PM</small>
      </div>
      <div className="mb-4">
        <div className="bg-gray-200 p-4 rounded-lg">
          Our refund policy allows returns within 30 days of purchase. Now, are
          you interested in ordering a shoe from our website?
        </div>
        <small className="text-gray-500">02:52 PM</small>
      </div>
      <div className="mb-4">
        <div className="bg-black text-white p-4 rounded-lg">
          Yes, I am. I'd like the "UltraFit Pro-Run X" model. Are they
          available?
        </div>
        <small className="text-gray-500">02:52 PM</small>
      </div>
      <div className="mb-4">
        <div className="bg-gray-200 p-4 rounded-lg">
          Yes, "UltraFit Pro-Run X" shoes are in stock. Here is the product{" "}
          <a href="#">link</a>.
        </div>
        <small className="text-gray-500">02:52 PM</small>
      </div>
      <div className="mb-4">
        <div className="bg-black text-white p-4 rounded-lg">Thanks!🙏</div>
        <small className="text-gray-500">02:52 PM</small>
      </div>
    </div>
  )
}

export default Page
