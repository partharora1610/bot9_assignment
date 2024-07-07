import React from "react"
import { FolderRoot, LayoutTemplate, Settings } from "lucide-react"
import Link from "next/link"

const Sidebar: React.FC = () => {
  return (
    <div className="w-56 h-full bg-darkbg text-white fixed top-0 left-0">
      <div className="py-8 px-4">
        <h1 className="text-xl font-bold mb-6">Dashboard</h1>
        <ul className="space-y-4">
          <Link
            href="/app"
            className="flex items-center gap-4 px-4 py-2 hover:bg-black hover:bg-opa rounded cursor-pointer"
          >
            <FolderRoot size={20} />
            <span className="body-regular">Dashboard</span>
          </Link>

          <Link
            href="/inbox?status=bot"
            className="flex items-center gap-4 px-4 py-2 hover:bg-gray-700 rounded cursor-pointer"
          >
            <LayoutTemplate size={20} />
            <span className="body-regular">Inbox</span>
          </Link>

          <Link
            href="/train"
            className="flex items-center gap-4 px-4 py-2 hover:bg-gray-700 rounded cursor-pointer"
          >
            <LayoutTemplate size={20} />
            <span className="body-regular">Train Bot</span>
          </Link>

          <Link
            href="/instructions"
            className="flex items-center gap-4 px-4 py-2 hover:bg-gray-700 rounded cursor-pointer"
          >
            <LayoutTemplate size={20} />
            <span className="body-regular">Custom Instructions</span>
          </Link>

          <Link
            href="/test"
            className="flex items-center gap-4 px-4 py-2 hover:bg-gray-700 rounded cursor-pointer"
          >
            <LayoutTemplate size={20} />
            <span className="body-regular">Test Bot</span>
          </Link>
        </ul>
      </div>
    </div>
  )
}

export default Sidebar
