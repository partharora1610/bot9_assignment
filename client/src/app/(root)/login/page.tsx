"use client"

import React from "react"
import Link from "next/link"
import { signIn, signOut, useSession } from "next-auth/react"
import { useRouter } from "next/navigation"

const Page = () => {
  const session = useSession()
  const router = useRouter()
  const { status } = session

  if (status === "loading") return <div>Loading...</div>

  if (status === "authenticated") {
    router.push("/onboarding")
  }

  return (
    <div className="flex h-screen items-center justify-center bg-gray-900">
      <div className="w-full max-w-md p-8 space-y-8 bg-gray-800 rounded-lg shadow-md">
        <div className="text-white">
          {status === "authenticated" ? "Authenticated" : "Not authenticated"}
        </div>
        <div className="text-center">
          <h2 className="mt-6 text-3xl font-bold text-white">Welcome back</h2>
        </div>
        <button
          className="w-full py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-black font-medium hover:bg-gray-100"
          onClick={() => signOut()}
        >
          <img
            src="/google-logo.png"
            alt="Google"
            className="inline h-5 w-5 mr-2"
          />
          Logout
        </button>
        <div>
          <button
            className="w-full py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-black font-medium hover:bg-gray-100"
            onClick={() => signIn("google")}
          >
            <img
              src="/google-logo.png"
              alt="Google"
              className="inline h-5 w-5 mr-2"
            />
            Login with Google
          </button>
        </div>
        <div className="text-center text-gray-500">Or</div>
        <form className="mt-8 space-y-6">
          <div className="rounded-md shadow-sm">
            <div>
              <label htmlFor="email" className="sr-only">
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-purple-500 focus:border-purple-500 focus:z-10 sm:text-sm"
                placeholder="Add email address here"
              />
            </div>
            <div className="mt-2">
              <label htmlFor="password" className="sr-only">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-purple-500 focus:border-purple-500 focus:z-10 sm:text-sm"
                placeholder="Add password here"
              />
            </div>
          </div>
          <div className="text-right">
            <a
              href="#"
              className="text-sm text-purple-600 hover:text-purple-500"
            >
              Forgot Password?
            </a>
          </div>
          <div>
            <button
              type="submit"
              className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
            >
              Login
            </button>
          </div>
        </form>
        <div className="text-center text-gray-500">
          Do not have an account?{" "}
          <Link
            href="/signup"
            className="text-purple-600 hover:text-purple-500"
          >
            Sign up
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Page
