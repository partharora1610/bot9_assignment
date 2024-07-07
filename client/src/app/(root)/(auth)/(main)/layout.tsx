import Sidebar from "@/components/shared/Sidebar"
import React from "react"

const AppLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="flex">
      <Sidebar />
      <main className="ml-56 w-full">{children}</main>
    </div>
  )
}

export default AppLayout
