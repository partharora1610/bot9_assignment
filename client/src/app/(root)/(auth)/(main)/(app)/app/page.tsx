"use client"
import React from "react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Calendar } from "lucide-react"
import { useSession } from "next-auth/react"

const Page = () => {
  const session = useSession()
  return (
    <div className="w-full max-w-screen-xl mx-auto px-6">
      {JSON.stringify(session)}
      <PerformanceOverview />
      <PerformanceSection />
    </div>
  )
}

const PerformanceOverview = () => {
  return (
    <div className="p-2">
      <div className="flex justify-between items-start">
        <div className="flex flex-col gap-1">
          <h3 className="base-semibold">Performance overview</h3>
          <p className="body-normal text-gray-500">
            Track your chatbot performance across channels at a glance in
            real-time.
          </p>
        </div>

        <div>
          <TimePeriodDropdown />
        </div>
      </div>
    </div>
  )
}

const TimePeriodDropdown = () => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="border body-normal items-center flex gap-1 border-gray-300 shadow-sm  px-3 py-2 rounded">
        <Calendar size={18} />
        <span>Last 7 days</span>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>Profile</DropdownMenuItem>
        <DropdownMenuItem>Billing</DropdownMenuItem>
        <DropdownMenuItem>Team</DropdownMenuItem>
        <DropdownMenuItem>Subscription</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

const PerformanceSection = () => {
  return (
    <div className="mt-4">
      <div className="flex gap-0 justify-between w-full">
        {Array.from({ length: 4 }).map((_, index) => (
          <PerformanceCard
            key={index}
            title="Avg, First Response Time"
            value={"0.98s"}
          />
        ))}
      </div>
    </div>
  )
}

interface PerformanceCardProps {
  title: string
  value: string
}

const PerformanceCard = ({
  title = "Conversations",
  value = "0.98s",
}: PerformanceCardProps) => {
  return (
    <div className="w-full p-4 border rounded">
      <h3 className="text-medium mb-2 text-gray-500">{title}</h3>
      <div className="h2-medium">{value}</div>
    </div>
  )
}

export default Page
