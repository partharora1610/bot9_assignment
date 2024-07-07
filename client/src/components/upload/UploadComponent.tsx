"use client"

import { UploadButton } from "@/utils/uploadthing"
import { File } from "lucide-react"

export default function UploadComponent() {
  return (
    <div className="text-black w-[600px] border border-gray bg-gray-50 rounded-lg px-3 py-4">
      <File size={24} className="text-semibold mb-4" />
      <h2 className="base-medium mb-2">Import from PDF</h2>
      <p className="body-regular text-gray-600">
        Upload your help document in pdf or csv and we'll create help article
        from the uploaded file and your bot will use its content to answer
        questions.
      </p>
      <UploadButton
        className=" text-black"
        endpoint="pdfUploader"
        onClientUploadComplete={(res) => {
          console.log("Files: ", res)
          alert("Upload Completed")
        }}
        onUploadError={(error: Error) => {
          alert(`ERROR! ${error.message}`)
        }}
      />
    </div>
  )
}
