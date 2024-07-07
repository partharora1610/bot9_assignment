"use client"
import { createBot } from "@/lib/actions/bot.action"
import React from "react"

const CompanyForm = () => {
  const [companyName, setCompanyName] = React.useState("")
  const [website, setWebsite] = React.useState("")
  const [name, setName] = React.useState("")
  const [primaryColor, setPrimaryColor] = React.useState("#d6336c")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    await createBot({ companyName, website, name })
  }

  return (
    <div>
      <form className="max-w-md mx-auto mt-32">
        <h2 className="text-2xl font-bold mb-5">Company details</h2>
        <p className="text-gray-600 mb-5">
          Your AI chatbot will be trained with the content from your company's
          website to ensure it gives precise answers.
        </p>
        <label
          htmlFor="companyName"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Company Name
        </label>
        <input
          onChange={(e) => setCompanyName(e.target.value)}
          type="text"
          id="companyName"
          placeholder="Enter company name"
          className="w-full p-2 border border-gray-300 rounded-lg mb-5"
        />
        <label
          htmlFor="companyWebsite"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Company Website URL
        </label>
        <input
          onChange={(e) => setWebsite(e.target.value)}
          type="url"
          id="companyWebsite"
          placeholder="https://"
          className="w-full p-2 border border-gray-300 rounded-lg mb-5"
        />

        <label
          htmlFor="companyWebsite"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Bot Name
        </label>
        <input
          onChange={(e) => setName(e.target.value)}
          type="url"
          id="botName"
          placeholder="Enter Bot Name"
          className="w-full p-2 border border-gray-300 rounded-lg mb-5"
        />

        <div className="mb-16">
          <label
            htmlFor="primaryColor"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Select Bot Primary Color
          </label>
          <div className="flex gap-6">
            <div
              className={`w-10 h-10 bg-[#d6336c]  rounded  cursor-pointer
                ${primaryColor === "#d6336c" && "border-2 border-black"}`}
            ></div>

            <div className="w-10 h-10 bg-[#9c36b5] rounded mr-2 cursor-pointer"></div>
            <div className="w-10 h-10 bg-[#6741d9] rounded mr-2 cursor-pointer"></div>
            <div className="w-10 h-10 bg-[#9c36b5] rounded mr-2 cursor-pointer"></div>
          </div>
        </div>

        <button
          onClick={handleSubmit}
          type="submit"
          className="w-full p-2 bg-primary-600 text-white rounded-lg"
        >
          Continue
        </button>
      </form>
    </div>
  )
}

export default CompanyForm

/**
 *  
 * #d6336c,
            #9c36b5,
            #6741d9,
            #d6336c,
            #9c36b5,
            #6741d9,
 */
