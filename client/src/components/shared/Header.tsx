"use client"

import { usePathname, useSearchParams } from "next/navigation"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

const Header = () => {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const status = searchParams.get("status")

  return (
    <div className="py-3 px-5 border-b-2 border-gray-100 shadow-sm w-full flex justify-between items-center">
      <div className="paragraph-semibold">
        {pathname == "/app" && "Dashboard"}
        {pathname == "/train" && "Train the Bot"}
        {pathname == "/instructions" && "Custom Instructions"}
        {pathname == "/inbox" &&
          `${
            status == "bot" ? "Bot" : status == "agent" ? "Agent" : "Closed"
          } Conversation`}
      </div>
      <div>
        <AvatarComponent />
      </div>
    </div>
  )
}

const AvatarComponent = () => {
  return (
    <div className="flex gap-2 items-center">
      <Avatar className="w-8 h-8 rounded-xl">
        <AvatarImage className="rounded-xl" src="" />
        <AvatarFallback className="bg-green-800 rounded-xl cursor-pointer text-white font-medium">
          N
        </AvatarFallback>
      </Avatar>
    </div>
  )
}
export default Header
