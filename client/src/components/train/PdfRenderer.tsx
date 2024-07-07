"use client"
import React from "react"

import "react-pdf/dist/Page/AnnotationLayer.css"
import "react-pdf/dist/Page/TextLayer.css"
import { Document, Page } from "react-pdf"
import { pdfjs } from "react-pdf"
import { ChevronDown, ChevronUp } from "lucide-react"

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`

interface PdfRendererProps {
  url: string
}

const PdfRenderer = ({ url }: PdfRendererProps) => {
  const [numPages, setNumPages] = React.useState<number>()
  const [currentPage, setCurrentPage] = React.useState<number>(1)

  return (
    <div className="w-full">
      <div className="">
        <div className="flex gap-6">
          <div>
            <ChevronDown
              onClick={() => {
                if (currentPage > 1) {
                  setCurrentPage(currentPage - 1)
                } else {
                  setCurrentPage(numPages!)
                }
              }}
            />
          </div>
          <p>
            Page {currentPage} of {numPages}
          </p>
          <div>
            <ChevronUp
              onClick={() => {
                if (currentPage < numPages!) {
                  setCurrentPage(currentPage + 1)
                } else {
                  setCurrentPage(1)
                }
              }}
            />
          </div>
        </div>
      </div>

      <div>
        <Document
          className=""
          file={url}
          loading={<div>Loading</div>}
          onLoadError={() => {}}
          onLoadSuccess={({ numPages }) => {
            setNumPages(numPages)
          }}
        >
          <Page pageNumber={currentPage} />
        </Document>
      </div>
    </div>
  )
}

export default PdfRenderer
