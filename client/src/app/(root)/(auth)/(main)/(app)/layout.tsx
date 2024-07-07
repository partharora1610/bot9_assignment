import Header from "@/components/shared/Header"
import React from "react"

const MainLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="">
      <Header />
      <main className="">{children}</main>
    </div>
  )
}

export default MainLayout
