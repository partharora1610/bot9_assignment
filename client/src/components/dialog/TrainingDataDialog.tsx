"use client"

import React from "react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Plus } from "lucide-react"
import UploadComponent from "../upload/UploadComponent"

const TrainingDataDialog = () => {
  return (
    <Dialog>
      <DialogTrigger className="body-normal items-center flex gap-1 text-white bg-primary-600 shadow-sm  px-3 py-2 rounded-lg ">
        <Plus size={18} />
        <span>Add Training Data</span>
      </DialogTrigger>
      <DialogContent className="bg-gray-100 max-w-[1780px] ">
        <DialogHeader className="border-b border-b-gray-200">
          <DialogTitle className=" p-2 rounded">Add Training Data</DialogTitle>
        </DialogHeader>

        <div className="max-w-6xl w-full m-auto ">
          <UploadComponent />
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default TrainingDataDialog
