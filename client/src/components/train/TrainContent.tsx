"use client"

import React from "react"
import TrainingDataDialog from "../dialog/TrainingDataDialog"
import { Checkbox } from "../ui/checkbox"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import PdfRenderer from "./PdfRenderer"

export const TrainDataSearch: React.FC = () => {
  return (
    <div className="flex justify-between px-5 py-4 border-b">
      <div>
        <input
          placeholder="Search you tickets"
          className="rounded-lg text-gray-400 px-3 py-1 base-regular border border-gray-400"
        />
      </div>
      <div>
        <TrainingDataDialog />
      </div>
    </div>
  )
}

interface TrainDataContentProps {
  key: string
  url: string
  id: string
  uploadStatus: "PENDING" | "PROCESSING" | "DONE" | "FAILED"
}

export const TrainContent = ({ data }: { data: TrainDataContentProps[] }) => {
  const [selected, setSelected] = React.useState<string[]>([])

  return (
    <div>
      <div className="flex flex-col gap-0">
        {data.map((item, index) => (
          <TrainItem
            key={index}
            selected={selected.includes(index.toString())}
            setSelected={(selected) => {}}
            documentName={`Document Number ${index}`}
            status={item.uploadStatus}
            url={item.url}
          />
        ))}
      </div>
    </div>
  )
}

interface InboxItemProps {
  selected: boolean
  setSelected: (selected: boolean) => void
  documentName: string
  status: "PENDING" | "PROCESSING" | "DONE" | "FAILED"
  url: string
}

export const TrainItem: React.FC<InboxItemProps> = ({
  selected,
  setSelected,
  documentName,
  status,
  url,
}) => {
  return (
    <div className="px-4 py-3 w-full bg-blue-50/55 hover:bg-white hover:cursor-pointer">
      <div className="flex justify-between items-center">
        <div className="flex items-center justify-between gap-8">
          <Checkbox className="border border-gray-300 rounded bg-white" />
          <div>{documentName}</div>
        </div>

        <div className="flex items-center justify-between gap-4">
          <div>{status}</div>
          <PdfDialog url={url} />
        </div>
      </div>
    </div>
  )
}

const PdfDialog = ({ url }: { url: string }) => {
  return (
    <Dialog>
      <DialogTrigger>Open</DialogTrigger>
      <DialogContent className="max-w-3xl bg-white top-[50%]">
        <DialogHeader className="mt-6">
          <DialogTitle className="flex justify-between">
            <p>Document #1</p>
            <p className="body-regular">status</p>
          </DialogTitle>
        </DialogHeader>
        <PdfRenderer url={url} />
      </DialogContent>
    </Dialog>
  )
}
